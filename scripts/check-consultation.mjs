import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';import {parse} from 'parse5';
const nodes=n=>[n,...(n.childNodes||[]).flatMap(nodes)],attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
for(const [prefix,lang] of [['','zh-CN'],['zh-hant/','zh-TW'],['en/','en'],['ja/','ja'],['ko/','ko']]){
 const all=nodes(parse(fs.readFileSync('dist/'+prefix+'contact/index.html','utf8'))),rootNode=all.find(n=>attr(n,'data-consult')!==undefined);const config=attr(rootNode,'data-config');
 assert.equal(all.filter(n=>attr(n,'required')!==undefined).length,1,'Exactly one required contact field');
 const script=all.find(n=>n.tagName==='script'&&n.childNodes?.some(x=>x.value?.includes('contactMethod')&&x.value?.includes('reportValidity'))).childNodes[0].value;
 const el=()=>({value:'',textContent:'',style:{},hidden:false,listeners:{},addEventListener(k,f){(this.listeners[k]??=[]).push(f)},focus(){},scrollIntoView(){}});
 const topic={...el(),options:[{value:'',dataset:{}},{value:'Egg freezing',dataset:{slug:'egg-freezing'}}],get selectedOptions(){return this.options.filter(o=>o.value===this.value)}};
 const message=el(),method={...el(),value:'email',selectedIndex:0},value={...el(),value:'test@example.com',validity:'',setCustomValidity(s){this.validity=s}};
 const fields={name:el(),contact:el(),topic,message,contactMethod:method,contactValue:value},options={open:false};
 const form={...el(),querySelector(s){return s==='.consult-options'?options:fields[s.match(/name=(\w+)/)[1]]},reportValidity(){return Boolean(value.value)&&!value.validity&&(method.value!=='email'||/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.value))}};
 const ids={'consult-form':form,'form-success':el(),'email-summary':el(),'copy-summary':el(),'question-template':el()};
 const root={dataset:{config},querySelector:s=>ids[s.slice(1)]};let copied='';const data=class{constructor(f){this.f=f}get(k){return fields[k]?.value}};
 vm.runInNewContext(script,{document:{documentElement:{lang},querySelector:()=>root},location:{search:'?topic=egg-freezing',pathname:'/'+prefix+'contact/'},URLSearchParams,FormData:data,matchMedia:()=>({matches:true}),navigator:{clipboard:{writeText:async s=>{copied=s}}}});
 assert.equal(topic.value,'Egg freezing');assert.equal(options.open,true);
 topic.value='';const submit=()=>form.listeners.submit[0]({preventDefault(){}});submit();
 assert.equal(ids['email-summary'].hidden,false);const mail=new URL(ids['email-summary'].href);assert.equal(mail.pathname,'info@saipan-ivf.com');assert(mail.searchParams.get('body').includes('test@example.com'));assert(mail.searchParams.get('body').includes(JSON.parse(config).f.unsent));
 await ids['copy-summary'].listeners.click[0]();assert(copied.includes('test@example.com'));
 form.listeners.input[0]();assert(ids['email-summary'].hidden);assert(ids['copy-summary'].hidden);assert.equal(ids['email-summary'].href,'mailto:info@saipan-ivf.com');
 method.value='phone';method.selectedIndex=2;method.listeners.change[0]();assert.equal(value.inputMode,'tel');value.value='abc';submit();assert(value.validity);assert(ids['email-summary'].hidden);form.listeners.input[0]();value.value='+81 90 1234 5678';submit();assert.equal(ids['email-summary'].hidden,false);
 form.listeners.input[0]();method.value='wechat';method.selectedIndex=1;method.listeners.change[0]();value.value='   ';submit();assert(ids['email-summary'].hidden);
 console.log('PASS consultation:',lang,'one required contact, optional topic, project prefill, mail recipient, copy, stale-draft invalidation, contact validation');
}
