import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';

const baseDir='src/pages/guides';
const slugs=fs.readdirSync(baseDir).filter(name=>name.endsWith('.astro')).map(name=>name.slice(0,-6));
const routes=new Map(slugs.map(slug=>[slug,`${baseDir}/${slug}.astro`]));
const nonblocking=process.argv.includes('--all') ? slugs : null;
function diffFiles() {
 if(nonblocking) return [];
 const target=process.env.GITHUB_BASE_REF ? `origin/${process.env.GITHUB_BASE_REF}...HEAD` : 'HEAD^ HEAD';
 try {return execFileSync('git',['diff','--name-only',...target.split(' ')],{encoding:'utf8'}).trim().split('\n').filter(Boolean);}
 catch (e) {throw new Error(`Cannot determine changed files (${target}); fail closed instead of silently skipping reviews: ${e.message}`);}
}
const changes=diffFiles();
const affected=new Set(nonblocking||[]);
for (const file of changes) {
 const match=file.match(/^src\/pages\/guides\/([^/]+)\.astro$/);
 if(match && routes.has(match[1])) affected.add(match[1]);
 if(file.startsWith('src/components/') && file.endsWith('.astro')) {
  const basename=path.basename(file);
  for(const [slug,page] of routes) {
   const source=fs.readFileSync(page,'utf8');
   if(source.includes(basename)) affected.add(slug);
  }
 }
}
const dimensions=['Five-second answer','Information density','Visual clarity','Structured usefulness','Specificity','Trust','User journey','Accessibility and responsive behavior','Technical SEO','Localization'];
for(const slug of affected) {
 const reviewPath=`docs/guide-reviews/${slug}.md`;
 assert(fs.existsSync(reviewPath),`${slug}: required signed review missing at ${reviewPath}`);
 const body=fs.readFileSync(reviewPath,'utf8');
 const get=label=>body.match(new RegExp('^'+label.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+':\\s*(.*?)\\s*$','mi'))?.[1]?.trim()||'';
 for(const key of ['Golden reference','Primary question','First-screen answer','Sources','Comparison','Score','Blockers','Mobile review','Localization','Reviewer']) assert(get(key),`${reviewPath}: missing ${key} value`);
 assert.equal(get('Golden reference'),'/guides/egg-freezing-cost/',`${reviewPath}: wrong golden reference`);
 assert(/^(none|无)$/i.test(get('Blockers')),`${reviewPath}: unresolved blockers`);
 const score=get('Score').match(/^(\d+)\s*\/\s*100$/);
 assert(score && +score[1]>=85 && +score[1]<=100,`${reviewPath}: score must be >=85/100`);
 assert(/^(passed|通过)$/i.test(get('Mobile review')),`${reviewPath}: mobile visual review needs explicit passed signoff`);
 assert(/^(passed|通过)$/i.test(get('Localization')),`${reviewPath}: localization review needs explicit passed signoff`);
 for(const dimension of dimensions) {
  const line=body.split('\n').find(line=>line.startsWith('|')&&line.split('|')[1]?.trim()===dimension);
  assert(line,`${reviewPath}: missing comparison row: ${dimension}`);
  const cells=line.split('|').slice(1,-1).map(x=>x.trim());
  assert(/^(Better|Equal|Not applicable)$/i.test(cells[1]||''),`${reviewPath}: ${dimension} must be Better, Equal or Not applicable (no Worse or Not verified)`);
  assert(cells[2] && cells[2].length>=12,`${reviewPath}: ${dimension} needs evidence and justification`);
 }
 const reviewInDiff=changes.includes(reviewPath);
 if(!nonblocking) assert(reviewInDiff,`${slug}: update ${reviewPath} in the SAME PR/commit as article changes (a stale signoff does not count)`);
 console.log(`PASS editorial review: ${slug} (${score[1]}/100)`);
}
console.log(`PASS editorial gate: ${affected.size} changed guide(s) checked from ${changes.length} changed file(s)`);
