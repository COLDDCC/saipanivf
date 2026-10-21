import fs from 'node:fs';import assert from 'node:assert/strict';import vm from 'node:vm';import {parse} from 'parse5';
const nodes=n=>[n,...(n.childNodes||[]).flatMap(nodes)],attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
for(const prefix of ['','zh-hant/','en/','ja/','ko/']){
 const html=fs.readFileSync('dist/'+prefix+'process/index.html','utf8'),all=nodes(parse(html));
 const source=all.find(n=>n.tagName==='script'&&n.childNodes?.some(t=>t.value?.includes('[data-care-journey]'))).childNodes[0].value;
 const el=()=>({hidden:true,listeners:{},addEventListener(k,f){this.listeners[k]=f}});
 const inputs=Array.from({length:6},()=>({...el(),checked:false}));
 const output=all.find(n=>attr(n,'data-ready-status')!==undefined);const status={...el(),textContent:output.childNodes.map(n=>n.value||'').join('')},reset=el(),print=el();let prints=0,bodyClass='';
 const root={querySelectorAll:()=>inputs,querySelector:s=>s.includes('status')?status:s.includes('reset')?reset:print};
 vm.runInNewContext(source,{document:{querySelector:()=>root,body:{classList:{add:k=>bodyClass=k}}},window:{print:()=>prints++}});
 assert.equal(bodyClass,'care-journey-page');assert.equal(print.hidden,false);assert.equal(prints,0,'Loading the page must not open print');assert(status.textContent.endsWith('0 / 6'));
 inputs[0].checked=true;inputs[0].listeners.change();inputs[5].checked=true;inputs[5].listeners.change();assert(status.textContent.endsWith('2 / 6'));
 print.listeners.click();assert.equal(prints,1);assert.equal(inputs[0].checked,true,'Printing must preserve ticks');
 reset.listeners.click();assert(inputs.every(i=>!i.checked));assert(status.textContent.endsWith('0 / 6'));
 assert(!/localStorage|sessionStorage|fetch\(/.test(source),'Preparation ticks must remain on page');
 assert(all.some(n=>attr(n,'id')==='follow-up'));assert.equal(all.filter(n=>n.tagName==='article'&&attr(n,'class')==='care-stage').length,6);
 const css=all.filter(n=>n.tagName==='link'&&attr(n,'rel')==='stylesheet').map(n=>fs.readFileSync('dist'+attr(n,'href'),'utf8')).join('');assert(css.includes('@media print')&&css.includes('break-before:page'));
 console.log('PASS journey:',prefix||'zh-CN','stage links, checkbox progress, reset, print action and no storage/network');
}
