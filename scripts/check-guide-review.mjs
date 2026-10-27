import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

// Existing pages are grandfathered; new editorial routes require a signed-off review.
const existing = new Set(['egg-freezing-cost','egg-freezing','family-planning','first-visit','ivf-cost','ivf-steps','quotation','travel-checklist']);
const dir='src/pages/guides';
const pages=fs.readdirSync(dir).filter(x=>x.endsWith('.astro')).map(x=>path.basename(x,'.astro'));
const required=['Golden reference:','Primary question:','First-screen answer:','Sources:','Comparison:','Score:','Blockers:','Mobile review:','Localization:','Reviewer:'];
for(const slug of pages) {
 if(existing.has(slug)) continue;
 const p=`docs/guide-reviews/${slug}.md`;
 assert.ok(fs.existsSync(p),`New guide ${slug} needs ${p} comparing against egg-freezing-cost`);
 const review=fs.readFileSync(p,'utf8');
 for(const label of required) assert.ok(review.includes(label),`${p} missing ${label}`);
 const score=Number(review.match(/^Score:\s*(\d+)\s*\/\s*100\s*$/m)?.[1]);
 assert.ok(score>=85&&score<=100,`${p}: score must be 85–100`);
 assert.match(review,/^Golden reference:\s*\/guides\/egg-freezing-cost\//m,`${p}: wrong reference`);
 assert.match(review,/^Blockers:\s*none\s*$/im,`${p}: unresolved blockers`);
 assert.ok(!/\b(?:Worse|Not verified)\b/i.test(review.split('Comparison:')[1]?.split('Score:')[0]||''),`${p}: unresolved comparison`);
}
console.log(`PASS guide review gate: ${pages.length} existing/new guide routes inspected; new routes require a golden-reference review.`);
