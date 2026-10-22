import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync('dist/faq/index.html','utf8');
const script=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).find(s=>s.includes('.faq-index a'));
assert.ok(script,'FAQ answer navigation must be present in the built page');
class Question {
 open=false;scrolls=0;
 scrollIntoView(){this.scrolls++}
}
const questions={'ivf-budget':new Question(),'ivf-duration':new Question()};
const links=Object.keys(questions).map(id=>({hash:'#'+id,listeners:{},addEventListener(type,fn){this.listeners[type]=fn}}));
const events={};
const window={location:{hash:'#ivf-budget'},addEventListener(type,fn){events[type]=fn}};
const document={getElementById:id=>questions[id]??null,querySelectorAll:()=>links};
vm.runInNewContext(script,{document,window,HTMLDetailsElement:Question,requestAnimationFrame:fn=>fn()});
assert.equal(questions['ivf-budget'].open,true,'An incoming answer link must expand its answer');
assert.equal(questions['ivf-budget'].scrolls,1);
window.location.hash='#ivf-duration';events.hashchange();
assert.equal(questions['ivf-duration'].open,true,'Back/forward hash changes must reveal the matching answer');
questions['ivf-duration'].open=false;links[1].listeners.click();
assert.equal(questions['ivf-duration'].open,true,'Clicking the same hash again must reopen a closed answer');
window.location.hash='#unknown-question';assert.doesNotThrow(()=>events.hashchange());
const directory=html.match(/<details\b[^>]*class="faq-directory"[^>]*>/)?.[0];
assert.ok(directory,'The question directory must exist');
assert.ok(!/\sopen(?:[\s=>])/.test(directory),'The question directory must start collapsed');
const contact=fs.readFileSync('dist/contact/index.html','utf8');
assert.match(contact,/<noscript><style>#consult-form\{display:none\}<\/style>/,'Without JS, the form must not fall back to GET submission');
assert.ok(!contact.includes('class="floating"'),'The contact form should not have a redundant floating contact button');
console.log('PASS FAQ: incoming links, hash navigation, same-link reopening, unknown fragments, compact directory; contact no-JS and overlay checks.');
// Regression: ESTA is US-wide; CNMI EVS-TAP has a separate geographic limit.
for(const locale of ['en','ja','ko']) {
 const d=JSON.parse(fs.readFileSync(`src/i18n/${locale}.json`,'utf8'));
 assert.ok(d.faq[3][1].includes('90')&&d.faq[3][1].includes('14'),`${locale}: distinguish the two stay limits`);
 const page=fs.readFileSync(`dist/${locale}/faq/index.html`,'utf8');
 assert.ok(page.includes('visa-waiver-program.html')&&page.includes('visitor.html'),`${locale}: link the applicable US travel rules`);
}
const tw=fs.readFileSync('dist/zh-hant/faq/index.html','utf8');
assert.ok(tw.includes('VWP允許符合資格與入境條件者進行醫療訪問'),'Traditional Chinese must allow eligible VWP medical visits');
for(const wrong of ['ESTA or EVS-TAP authorisation is limited to the Northern Mariana Islands','ESTAやEVS-TAPは北マリアナ諸島のみ','ESTA나 EVS-TAP은 북마리아나제도에만']) {
 for(const locale of ['en','ja','ko','es','de']) assert.ok(!fs.readFileSync(`dist/${locale}/faq/index.html`,'utf8').includes(wrong),'Do not limit ESTA to CNMI');
}
console.log('PASS travel FAQ: distinct programmes, stay limits, medical purpose and official references.');

assert.ok(tw.includes('符合資格的台灣護照持有人，取得ESTA承認'),'Traditional Chinese must use the Taiwan VWP answer, not the PRC EVS-TAP answer');
assert.ok(!tw.includes('EVS-TAP條件並獲旅行授權的台灣公民'),'Do not apply PRC-only eligibility to Taiwan passport holders');

const birthTw=fs.readFileSync('dist/zh-hant/birth-planning/index.html','utf8');
assert.ok(birthTw.includes('https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=H0110001'),'Taiwan education source must link the actual law database');
assert.ok(birthTw.includes('https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0030001'),'Taiwan nationality statement must link the nationality law');
assert.ok(birthTw.includes('出生時父或母為中華民國國民者'),'Nationality and household registration must be distinguished');
assert.ok(birthTw.includes('僑生另有招生規定'),'Overseas Chinese and international-student admission are separate routes');
for(const page of [birthTw,tw]) assert.ok(!page.includes('免籤')&&!page.includes('工籤'),'Use the visa character 簽, not 籤');
console.log('PASS Taiwan content: nationality/admission rules, official law URLs and visa wording.');

const es=JSON.parse(fs.readFileSync('src/i18n/es.json','utf8'));
const esFaq=fs.readFileSync('dist/es/faq/index.html','utf8');
assert.ok(es.faq[3][1].includes('español')&&es.faq[3][1].includes('90'));
assert.ok(esFaq.includes('visa-waiver-program.html')&&!esFaq.includes('g-cnmi-eta.cbp.dhs.gov'),'Spanish travel references must match Spanish-passport eligibility');
const esBirth=fs.readFileSync('dist/es/birth-planning/index.html','utf8');
assert.ok(esBirth.includes('mjusticia.gob.es')&&esBirth.includes('Registro Civil'),'Spanish nationality text must point to its own competent authority');
assert.ok(es.pages['guides/travel-checklist'].sections.some(s=>s[1].includes('la residencia española por sí sola no')),'Residence in Spain is not Spanish citizenship');
assert.ok(es.form.templateText.includes('idioma'),'Do not imply Spanish-speaking clinical services without confirmation');
console.log('PASS Spanish adaptation: nationality versus residence, US-status distinction, matching primary sources and consultation language.');

const de=JSON.parse(fs.readFileSync('src/i18n/de.json','utf8'));
const deFaq=fs.readFileSync('dist/de/faq/index.html','utf8');
assert.ok(de.faq[3][1].includes('deutschem Reisepass')&&de.faq[3][1].includes('90'));
assert.ok(deFaq.includes('visa-waiver-program.html')&&!deFaq.includes('g-cnmi-eta.cbp.dhs.gov'),'German travel sources must not use the PRC-only programme');
const deBirth=fs.readFileSync('dist/de/birth-planning/index.html','utf8');
assert.ok(deBirth.includes('nichterwerb-1216794')&&deBirth.includes('Generationenschnitt')&&deBirth.includes('innerhalb eines Jahres'),'German overseas-birth exception and authority must be present');
const deFamily=fs.readFileSync('dist/de/guides/family-planning/index.html','utf8');
assert.ok(deFamily.includes('06-leihmutterschaft-606160')&&deFamily.includes('nicht automatisch rechtliche Elternschaft'),'Do not promise German recognition of third-party arrangements');
assert.ok(de.form.templateText.includes('Sprache')&&de.pages['editorial-policy'].sections[4][1].includes('keine deutschsprachige medizinische Betreuung'));
assert.ok(de.pages.fees.sections[2][1].includes('schriftlich')&&de.pages.fees.sections[2][1].includes('Krankenversicherung'));
console.log('PASS German adaptation: passport versus residence, insurance, overseas-birth exception, parentage sources and consultation language.');
