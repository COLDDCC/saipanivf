import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';import {parse} from 'parse5';
const nodes=n=>[n,...(n.childNodes||[]).flatMap(nodes)],attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
for(const [prefix,lang] of [['','zh-CN'],['zh-hant/','zh-TW'],['en/','en'],['ja/','ja'],['ko/','ko'],['es/','es'],['de/','de'],['fr/','fr']]){
 const all=nodes(parse(fs.readFileSync('dist/'+prefix+'contact/index.html','utf8'))),rootNode=all.find(n=>attr(n,'data-consult')!==undefined);const config=attr(rootNode,'data-config');
 assert.equal(all.filter(n=>attr(n,'required')!==undefined).length,1,'Exactly one required contact field');
 // The form script may be inlined or emitted as a module file once it passes Vite's inline limit.
 const sources=all.filter(n=>n.tagName==='script').map(n=>attr(n,'src')?.startsWith('/_astro/')?fs.readFileSync('dist'+attr(n,'src'),'utf8'):n.childNodes?.[0]?.value||'');
 const script=sources.find(x=>x.includes('contactMethod')&&x.includes('reportValidity'));assert.ok(script,'consultation script present');
 const el=()=>({value:'',textContent:'',style:{},hidden:false,attrs:{},listeners:{},addEventListener(k,f){(this.listeners[k]??=[]).push(f)},setAttribute(k,v){this.attrs[k]=v},focus(){},scrollIntoView(){}});
 const topic={...el(),options:[{value:'',dataset:{}},{value:'Egg freezing',dataset:{slug:'egg-freezing'}}],get selectedOptions(){return this.options.filter(o=>o.value===this.value)}};
 const message=el(),method={...el(),value:'email',selectedIndex:0},value={...el(),value:'test@example.com',validity:'',setCustomValidity(s){this.validity=s}};
 const fields={name:el(),contact:el(),topic,message,contactMethod:method,contactValue:value},options={open:false};
 const form={...el(),querySelector(s){return s==='.consult-options'?options:fields[s.match(/name=(\w+)/)[1]]},reportValidity(){return Boolean(value.value)&&!value.validity&&(method.value!=='email'||/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.value))}};
 const ids={'consult-form':form,'form-success':el(),'email-summary':el(),'copy-summary':el(),'question-template':el(),'mail-fallback':{...el(),hidden:true},'mail-trouble':{...el(),hidden:true},'in-app-note':{...el(),hidden:true},'copy-fallback':el(),'copy-address':el(),'gmail-draft':el(),'outlook-draft':el()};
 const root={dataset:{config},querySelector:s=>ids[s.slice(1)]};let copied='';const data=class{constructor(f){this.f=f}get(k){return fields[k]?.value}};
 // Controllable timers and window/document focus events for the mail-app watchdog.
 const timers=[],winEvents={},docEvents={};const on=(bag)=>(k,f)=>{(bag[k]??=new Set()).add(f)},off=(bag)=>(k,f)=>{bag[k]?.delete(f)},fire=(bag,k)=>{for(const f of [...(bag[k]||[])]){bag[k].delete(f);f()}};
 const doc={documentElement:{lang},visibilityState:'visible',querySelector:()=>root,addEventListener:on(docEvents),removeEventListener:off(docEvents),dispatchEvent(){}};
 const context=(userAgent)=>({document:doc,location:{search:'?topic=egg-freezing',pathname:'/'+prefix+'contact/'},URLSearchParams,FormData:data,CustomEvent:class{constructor(t,o){this.type=t;this.detail=o?.detail}},matchMedia:()=>({matches:true}),navigator:{userAgent,clipboard:{writeText:async s=>{copied=s}}},addEventListener:on(winEvents),removeEventListener:off(winEvents),setTimeout:(f)=>{timers.push(f);return timers.length},clearTimeout:(n)=>{timers[n-1]=null}});
 vm.runInNewContext(script,context('Mozilla/5.0 (iPhone) Safari/604.1'));
 assert.equal(topic.value,'Egg freezing');assert.equal(options.open,true);
 topic.value='';const submit=()=>form.listeners.submit[0]({preventDefault(){}});submit();
 assert.equal(ids['email-summary'].hidden,false);const mail=new URL(ids['email-summary'].href);assert.equal(mail.pathname,'info@saipan-ivf.com');assert(mail.searchParams.get('body').includes('test@example.com'));assert(mail.searchParams.get('body').includes(JSON.parse(config).f.unsent));
 await ids['copy-summary'].listeners.click[0]();assert(copied.includes('test@example.com'));
 // Fallback: offered (not forced) after a draft, with webmail drafts carrying the same text.
 const fb=ids['mail-fallback'],tr=ids['mail-trouble'];assert.equal(tr.hidden,false,'trouble link appears with the draft');assert.equal(fb.hidden,true,'fallback stays closed in a normal browser');assert.equal(ids['in-app-note'].hidden,true);
 const gmail=new URL(ids['gmail-draft'].href),outlook=new URL(ids['outlook-draft'].href);assert.equal(gmail.hostname,'mail.google.com');assert.equal(gmail.searchParams.get('to'),'info@saipan-ivf.com');assert(gmail.searchParams.get('body').includes('test@example.com'));assert.equal(outlook.hostname,'outlook.live.com');assert.equal(outlook.searchParams.get('to'),'info@saipan-ivf.com');assert.equal(outlook.searchParams.get('body'),gmail.searchParams.get('body'));
 // Mail app opened → page blurred → no fallback.
 ids['email-summary'].listeners.click[0]();fire(winEvents,'blur');timers.at(-1)();assert.equal(fb.hidden,true,'no fallback when a mail app took the link');
 // Nothing happened → fallback opens by itself.
 ids['email-summary'].listeners.click[0]();timers.at(-1)();assert.equal(fb.hidden,false,'fallback opens when the page never lost focus');assert.equal(tr.attrs['aria-expanded'],'true');
 await ids['copy-address'].listeners.click[0]();assert.equal(copied,'info@saipan-ivf.com');await ids['copy-fallback'].listeners.click[0]();assert(copied.includes('test@example.com'));
 tr.listeners.click[0]();assert.equal(fb.hidden,true,'trouble link toggles the panel');tr.listeners.click[0]();assert.equal(fb.hidden,false);
 form.listeners.input[0]();assert(ids['email-summary'].hidden);assert(ids['copy-summary'].hidden);assert.equal(ids['email-summary'].href,'mailto:info@saipan-ivf.com');assert(fb.hidden&&tr.hidden,'editing closes the fallback with the stale draft');
 method.value='phone';method.selectedIndex=2;method.listeners.change[0]();assert.equal(value.inputMode,'tel');value.value='abc';submit();assert(value.validity);assert(ids['email-summary'].hidden);form.listeners.input[0]();value.value='+81 90 1234 5678';submit();assert.equal(ids['email-summary'].hidden,false);
 form.listeners.input[0]();method.value='wechat';method.selectedIndex=1;method.listeners.change[0]();value.value='   ';submit();assert(ids['email-summary'].hidden);
 // In-app browser: fallback and its note open with the draft.
 for(const id of ['mail-fallback','mail-trouble','in-app-note'])ids[id].hidden=true;
 vm.runInNewContext(script,context('Mozilla/5.0 (iPhone) AppleWebKit Mobile MicroMessenger/8.0.50'));method.value='email';method.selectedIndex=0;value.value='test@example.com';form.listeners.submit.at(-1)({preventDefault(){}});
 assert.equal(fb.hidden,false,'in-app browsers get the fallback at once');assert.equal(ids['in-app-note'].hidden,false);
 const m=JSON.parse(config).m;for(const k of ['trouble','title','intro','copyStep','address','copyAddress','addressCopied','webmail','gmail','outlook','webmailNote','inApp'])assert.ok(m?.[k],lang+' mail fallback copy '+k);
 assert.equal(all.filter(n=>attr(n,'id')==='mail-fallback').length,1);
 console.log('PASS consultation:',lang,'one required contact, optional topic, project prefill, mail recipient, copy, stale-draft invalidation, contact validation, mail-app fallback (watchdog, in-app browsers, webmail drafts, copy address)');
}
