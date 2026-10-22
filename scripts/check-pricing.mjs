import fs from 'node:fs';
import assert from 'node:assert/strict';
import {execSync} from 'node:child_process';
// Pull the single source of truth straight out of src/data/pricing.ts.
const ts=fs.readFileSync('src/data/pricing.ts','utf8');
const items=[...ts.matchAll(/"id":\s*"([^"]+)"[\s\S]*?"min":\s*(\d+),\s*"max":\s*(\d+)/g)].map(m=>({id:m[1],min:+m[2],max:+m[3]}));
assert.ok(items.length>=10,'parsed '+items.length+' pricing items from src/data/pricing.ts');

// Mirrors usd()/usdRange() in src/i18n/money.ts.
const money=(v,loc)=>loc==='fr'?v.toLocaleString('fr-FR')+' USD':(loc==='de'||loc==='es')?v.toLocaleString('de-DE')+' USD':'$'+v.toLocaleString('en-US');
const range=(min,max,loc)=>{const first=money(min,loc);if(min===max)return first;return ['es','de','fr'].includes(loc)?first.replace(/ USD$/,'')+'–'+money(max,loc):first+'–'+money(max,loc).replace(/^\$/,'');};

const pages=[];
for(const [prefix,loc] of [['',''],['en/','en'],['ja/','ja'],['ko/','ko'],['es/','es'],['de/','de'],['fr/','fr'],['zh-hant/','zh-hant']]){
 const text=['fees','index','faq'].map(route=>{const p='dist/'+prefix+route+'/index.html';return fs.existsSync(p)?fs.readFileSync(p,'utf8'):''}).join('\n');
 assert.ok(text.length>1000,prefix+' localized pages missing from dist (run npm run build first)');
 pages.push({prefix,loc,text});
}
let checked=0;
for(const page of pages){
 const rendered=new Set();
 for(const item of items){
  if(item.min===item.max){
   const single=money(item.min,page.loc);
   assert.ok(page.text.includes(single),page.prefix+' missing localized '+item.id+' amount '+single);
   rendered.add(single);
   continue;
  }
  const lo=money(item.min,page.loc),hi=money(item.max,page.loc);
  // Static copy keeps both currency markers ("$3,000–$8,000" / "3.000–8.000 USD");
  // the client-side calculator drops the second one ("$26,100–31,100").
  const candidates=[lo+'–'+hi.replace(/^\$/,''),lo+'–'+hi,lo.replace(/ USD$/,'')+'–'+hi];
  assert.ok(candidates.some(c=>page.text.includes(c)),page.prefix+' missing localized '+item.id+' range '+lo+'–'+hi);
  rendered.add(lo+'–'+hi);
 }
 checked+=rendered.size;
}
console.log('PASS pricing: '+items.length+' items × 8 locales ('+checked+' rendered amounts/ranges) all match src/data/pricing.ts');
