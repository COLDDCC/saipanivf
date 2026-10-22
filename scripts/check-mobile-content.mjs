import fs from 'node:fs';
import assert from 'node:assert/strict';
import {parse} from 'parse5';
const locales=['','zh-hant/','en/','ja/','ko/','es/','de/','fr/'];
const attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
const nodes=n=>[n,...(n.childNodes||[]).flatMap(nodes)];
const text=n=>n.nodeName==='#text'?n.value:(n.childNodes||[]).map(text).join('');
const hasClass=(n,c)=>attr(n,'class')?.split(' ').includes(c);
for(const prefix of locales){
 const fees=nodes(parse(fs.readFileSync(`dist/${prefix}fees/index.html`,'utf8')));
 const itemized=fees.find(n=>attr(n,'data-budget-items')!==undefined);assert.ok(itemized,prefix+' itemized component');
 const all=nodes(itemized),table=all.find(n=>n.tagName==='table'),body=nodes(table).find(n=>n.tagName==='tbody');
 const rows=body.childNodes.filter(n=>n.tagName==='tr').map(n=>n.childNodes.filter(n=>['th','td'].includes(n.tagName)).map(text));
 const mobile=all.find(n=>hasClass(n,'budget-items-mobile'));
 const list=nodes(mobile).find(n=>n.tagName==='dl');
 const cards=list.childNodes.filter(n=>n.tagName==='div').map(n=>{
  const children=nodes(n),term=children.find(n=>n.tagName==='dt'),amount=children.find(n=>n.tagName==='strong'),note=children.find(n=>n.tagName==='p');
  return [text(term),text(amount),...(note?[text(note)]:[])];
 });
 assert.equal(rows.length,11,prefix+' all 11 cost items retained');
 assert.deepEqual(cards,rows,prefix+' mobile costs, ranges and scope must match desktop');
 const contact=nodes(parse(fs.readFileSync(`dist/${prefix}contact/index.html`,'utf8')));
 const layout=contact.find(n=>hasClass(n,'contact-layout'));
 const children=layout.childNodes.filter(n=>n.tagName==='div');
 assert.ok(hasClass(children[0],'form-card'),prefix+' form first in reading and mobile layout order');
 assert.ok(hasClass(children[1],'consult-intro'),prefix+' explanatory content retained');
 assert.equal(nodes(layout).filter(n=>attr(n,'required')!==undefined).length,1,prefix+' one required field');
 assert.ok(contact.some(n=>n.tagName==='meta'&&attr(n,'name')==='viewport'&&!/maximum-scale|user-scalable=no/.test(attr(n,'content'))),prefix+' zoom allowed');
 console.log('PASS responsive content: '+(prefix||'zh-CN/')+' all 11 mobile costs match desktop; form first, guidance retained and zoom allowed');
}
