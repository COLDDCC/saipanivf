import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {parse} from 'parse5';
const origin='https://saipanivf.pages.dev';
function nodes(tree){return [tree,...(tree.childNodes||[]).flatMap(nodes)]}
function attr(node,name){return node.attrs?.find(a=>a.name===name)?.value}
const base=[];function find(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){if(entry.isDirectory()&&!['en','ja','ko','es','zh-hant','images','_astro'].includes(entry.name))find(path.join(dir,entry.name));if(entry.isFile()&&entry.name==='index.html')base.push(path.relative('dist',path.join(dir,entry.name)))}}find('dist');assert.equal(base.length,23);
const languages=[['','zh-CN'],['zh-hant','zh-TW'],['en','en'],['ja','ja'],['ko','ko'],['es','es']];
for(const [prefix,lang] of languages)for(const relative of base){const file=path.join('dist',prefix,relative);assert(fs.existsSync(file),file);const html=fs.readFileSync(file,'utf8'),tree=parse(html),all=nodes(tree);assert.equal(attr(all.find(n=>n.tagName==='html'),'lang'),lang,file);assert(!all.some(n=>n.tagName==='meta'&&attr(n,'name')==='robots'&&attr(n,'content')?.includes('noindex')),file);const alts=all.filter(n=>n.tagName==='link'&&attr(n,'rel')==='alternate');assert.equal(alts.length,7,file);const mainRoute='/'+relative.replace(/index.html$/,'');for(const [code,p] of [['zh-CN',''],['zh-TW','/zh-hant'],['en','/en'],['ja','/ja'],['ko','/ko'],['es','/es'],['x-default','']])assert(alts.some(n=>attr(n,'hreflang')===code&&attr(n,'href')===origin+p+mainRoute),file+' '+code);const selected=all.find(n=>n.tagName==='a'&&attr(n,'hreflang')===lang);assert.equal(attr(selected,'aria-current'),'page',file);assert.equal(attr(selected,'href'),(prefix?'/'+prefix:'')+mainRoute,file);if(prefix==='en'||prefix==='es'){function text(n){if(['script','style'].includes(n.tagName)||attr(n,'class')?.includes('language-switcher'))return '';return n.nodeName==='#text'?n.value:(n.childNodes||[]).map(text).join(' ')}assert(!/[\u3400-\u9fff]/.test(text(tree)),file+' untranslated Chinese text')} }
for(const locale of ['en','ja','ko','es']){
 const html=fs.readFileSync(`dist/${locale}/fees/index.html`,'utf8'),all=nodes(parse(html));const config=attr(all.find(n=>attr(n,'data-budget')!==undefined),'data-config');const script=all.find(n=>n.tagName==='script'&&n.childNodes?.some(t=>t.value?.includes('[data-budget]')))?.childNodes[0].value;assert(script);
 const el=()=>({textContent:'',listeners:{},addEventListener(k,f){this.listeners[k]=f}});
 const ids=Object.fromEntries(['budget-path','budget-total','budget-description','budget-status','budget-copy'].map(x=>[x,el()]));ids['budget-path'].value='ivf';const inputs=['medication','anesthesia','icsi','freeze','fet','pgt','storage'].map((value,i)=>({...el(),value,checked:i<5,label:{hidden:false},closest(){return this.label}}));const root={dataset:{config},querySelector:s=>ids[s.slice(1)],querySelectorAll:()=>inputs};vm.runInNewContext(script,{document:{querySelector:()=>root},navigator:{clipboard:{writeText:async()=>{}}}});
 assert.equal(ids['budget-total'].textContent,'$26,100–31,100');inputs[5].checked=true;inputs[5].listeners.change();assert.equal(ids['budget-total'].textContent,'$29,100–37,100');ids['budget-path'].value='egg';ids['budget-path'].listeners.change();assert.equal(ids['budget-total'].textContent,'$12,800–17,800');ids['budget-path'].value='fet';ids['budget-path'].listeners.change();assert.equal(ids['budget-total'].textContent,'$4,500');await ids['budget-copy'].listeners.click();assert.equal(ids['budget-status'].textContent,JSON.parse(config).b.copied);
 const faq=fs.readFileSync(`dist/${locale}/faq/index.html`,'utf8');assert.equal(nodes(parse(faq)).filter(n=>n.tagName==='details'&&attr(n,'id')).length,12);
 const contact=fs.readFileSync(`dist/${locale}/contact/index.html`,'utf8');assert(contact.includes('data-consult'));assert(contact.includes('mailto:info@saipan-ivf.com'));assert(!contact.includes('class="floating"'));
}
console.log('PASS i18n: 138 complete language routes, active language, matching hreflang, English text coverage, 12 FAQ answers per locale, localized budget calculations and copy feedback.');

for(const relative of base){
 const images=prefix=>nodes(parse(fs.readFileSync(path.join('dist',prefix,relative),'utf8'))).filter(n=>n.tagName==='img').map(n=>attr(n,'data-src')||attr(n,'src'));
 const expected=images('');for(const prefix of ['zh-hant','en','ja','ko','es'])assert.deepEqual(images(prefix),expected,prefix+'/'+relative+' image parity');
}
for(const prefix of ['en','ja','ko','es']){const home=fs.readFileSync('dist/'+prefix+'/index.html','utf8');for(const cls of ['photo-cards','home-center','people-grid','home-budget','journey-panel','guide-grid','home-birth-link'])assert(home.includes(cls),prefix+' missing shared home layout '+cls);}
console.log('PASS visual parity: image sources and order match Simplified Chinese on all 115 translated routes; shared home layouts.');

for(const relative of base){
 const all=nodes(parse(fs.readFileSync(path.join('dist','zh-hant',relative),'utf8')));
 const switcher=all.find(n=>n.tagName==='details'&&attr(n,'class')?.split(' ').includes('language-switcher'));
 const summary=switcher?.childNodes.find(n=>n.tagName==='summary');
 assert.equal(summary?.childNodes.map(n=>n.value||'').join(''),'繁體中文 ▾',relative+' visible language label');
}
console.log('PASS Traditional Chinese visible language label on all 23 routes.');
