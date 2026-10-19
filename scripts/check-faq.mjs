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
assert.match(html,/<details class="faq-directory">/,'The question directory must start collapsed');
const contact=fs.readFileSync('dist/contact/index.html','utf8');
assert.match(contact,/<noscript><style>#consult-form\{display:none\}<\/style>/,'Without JS, the form must not fall back to GET submission');
assert.ok(!contact.includes('class="floating"'),'The contact form should not have a redundant floating contact button');
console.log('PASS FAQ: incoming links, hash navigation, same-link reopening, unknown fragments, compact directory; contact no-JS and overlay checks.');
