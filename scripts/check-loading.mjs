import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const fonts=JSON.parse(fs.readFileSync('public/fonts/manifest.json','utf8'));
for(const [name,font] of Object.entries(fonts)){const bytes=fs.readFileSync('dist/fonts/'+name+'.woff2');assert.equal(bytes.length,font.bytes);assert.equal(createHash('sha256').update(bytes).digest('hex'),font.sha256);}
const text=n=>n.nodeName==='#text'?n.value:(n.childNodes||[]).map(text).join('');
import {parse} from 'parse5';
const nodes=n=>[n,...(n.childNodes||[]).flatMap(nodes)];
const attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
const locales=['','zh-hant/','en/','ja/','ko/','es/','de/','fr/'];
// CJK heading faces are unicode-range slices of the subsets above (scripts/slice-fonts.py).
const slices=JSON.parse(fs.readFileSync('public/fonts/cjk/manifest.json','utf8'));
for(const [k,entry] of Object.entries(slices)){
 assert.equal(createHash('sha256').update(fs.readFileSync('public/fonts/'+entry.source)).digest('hex'),entry.sourceSha256,k+' slices are stale: the heading subset changed — run npm run fonts:slice');
 const union=new Set(entry.slices.flatMap(x=>x.codepoints));
 assert.deepEqual([...union].sort((a,b)=>a-b),[...fonts['noto-serif-'+k].codepoints].sort((a,b)=>a-b),k+' slices must cover exactly the heading subset');
 assert.equal(union.size,entry.slices.reduce((n,x)=>n+x.codepoints.length,0),k+' slices must not overlap');
 for(const x of entry.slices){const bytes=fs.readFileSync('dist/fonts/cjk/'+x.file);assert.equal(bytes.length,x.bytes);assert.equal(createHash('sha256').update(bytes).digest('hex'),x.sha256,x.file+' integrity')}
}
const parseRanges=css=>new Map([...css.matchAll(/url\('\/fonts\/cjk\/([^']+)'\)[^}]*unicode-range:([^}]+)\}/g)].map(([,file,list])=>[file,list.split(',').flatMap(r=>{const [a,b]=r.replace('U+','').split('-').map(h=>parseInt(h,16));return Array.from({length:(b??a)-a+1},(_,i)=>a+i)})]));
const cjkBytes={};
const routes=[];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(e.isDirectory()&&!['zh-hant','en','ja','ko','es','de','fr','images','_astro'].includes(e.name))walk(dir+'/'+e.name);else if(e.isFile()&&e.name==='index.html')routes.push(dir.slice(5)+(dir==='dist'?'':'/')+'index.html')}}
walk('dist');assert.equal(routes.length,23);
for(const prefix of locales)for(const route of routes){
 const all=nodes(parse(fs.readFileSync('dist/'+prefix+route,'utf8'))),home=route==='index.html';
 const styles=all.filter(n=>n.tagName==='link'&&attr(n,'rel')==='stylesheet');
 const homeStyles=styles.filter(n=>/^\/_astro\/home\./.test(attr(n,'href')));
 assert.equal(homeStyles.length,home?1:0,prefix+route+' homepage CSS is route-specific');
 for(const link of styles.filter(n=>attr(n,'href').startsWith('/')))assert.ok(fs.existsSync('dist'+attr(link,'href')));
 assert.ok(!styles.some(n=>attr(n,'href').includes('fonts.googleapis.com')),prefix+route+' fonts are self-hosted');
 const face={'':'sc','zh-hant/':'tc','ja/':'ja','ko/':'ko'}[prefix];
 const faceStyles=all.filter(n=>n.tagName==='style'&&attr(n,'data-cjk-fonts')!==undefined);
 if(!face)assert.equal(faceStyles.length,0,prefix+route+' Latin-script pages carry no CJK faces');
 else{
  assert.equal(faceStyles.length,1,prefix+route+' one inline CJK face block');assert.equal(attr(faceStyles[0],'data-cjk-fonts'),face,prefix+route+' faces match the page language');
  const css=text(faceStyles[0]),declared=parseRanges(css);
  assert.deepEqual([...declared.keys()].sort(),slices[face].slices.map(x=>x.file).sort(),prefix+route+' every slice declared once');
  for(const x of slices[face].slices)assert.deepEqual(declared.get(x.file),x.codepoints,x.file+' unicode-range matches its glyphs');
  assert.ok(!/SIVF Serif (SC|TC|JP|KR)'/.test(css.replace(new RegExp("SIVF Serif "+{sc:'SC',tc:'TC',ja:'JP',ko:'KR'}[face]+"'",'g'),'')),prefix+route+' no other language faces');
  const used=new Set(all.filter(n=>['h1','h2'].includes(n.tagName)).flatMap(h=>[...text(h)].map(c=>c.codePointAt(0))).filter(c=>!fonts.lora.codepoints.includes(c)));
  const bytes=slices[face].slices.filter(x=>x.codepoints.some(c=>used.has(c))).reduce((n,x)=>n+x.bytes,0);
  (cjkBytes[face]??=[]).push(bytes);
  assert.ok(bytes<=fonts['noto-serif-'+face].bytes*0.6,prefix+route+' downloads '+bytes+' B of CJK heading slices; headings drifted from the slicing — run npm run fonts:slice');
 }
 const coverage=new Set([...fonts.lora.codepoints,...(face?fonts['noto-serif-'+face].codepoints:[])]);
 for(const heading of all.filter(n=>['h1','h2'].includes(n.tagName)))for(const char of text(heading))if(!/\s/u.test(char))assert.ok(coverage.has(char.codePointAt(0)),prefix+route+' missing heading glyph '+char+' — regenerate subsets with: npm run fonts:regen');
 const preloads=all.filter(n=>n.tagName==='link'&&attr(n,'rel')==='preload'&&attr(n,'as')==='image');
 assert.equal(preloads.length,home?1:0,prefix+route+' image preload only for home');
 if(home){const hero=all.find(n=>n.tagName==='img'&&attr(n,'class')?.split(' ').includes('hero-slide-image'));const preload=preloads[0];
  for(const [hint,img] of [['href','src'],['imagesrcset','srcset'],['imagesizes','sizes']])assert.equal(attr(preload,hint),attr(hero,img),prefix+' matching responsive preload prevents duplicate downloads');
  assert.equal(attr(preload,'fetchpriority'),'high');
 }
 for(const image of all.filter(n=>n.tagName==='img'&&!attr(n,'class')?.includes('brand-symbol'))){assert.ok(attr(image,'width')&&attr(image,'height'),prefix+route+' image reserves intrinsic size');assert.equal(attr(image,'decoding'),'async');}
}
for(const [k,list] of Object.entries(cjkBytes)){list.sort((a,b)=>a-b);console.log('  CJK heading slices',k+':',fonts['noto-serif-'+k].bytes,'B whole subset → per page median',list[list.length>>1],'B, max',list.at(-1),'B')}
console.log('PASS loading: 184 pages; homepage-only CSS/preload, matching responsive image hints, self-hosted font integrity and heading glyph coverage across eight languages, CJK unicode-range slices (integrity, exact coverage, per-language inlining, per-page budget), local styles exist and images reserve dimensions/decode asynchronously.');
