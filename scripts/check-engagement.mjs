import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
import {onRequest} from '../functions/api/engagement.js';
const request=(payload,origin='https://example.com')=>new Request('https://example.com/api/engagement',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify(payload)});
const valid={event:'consult_draft',language:'ko'};
let bound;
const db={prepare(sql){return {first:async()=>null,bind(...args){bound={sql,args};return {run:async()=>{}}}}}};
assert.equal((await onRequest({request:request(valid),env:{}})).status,503);
assert.equal((await onRequest({request:request(valid,'https://other.com'),env:{ENGAGEMENT_DB:db}})).status,403);
for(const payload of [{...valid,email:'private@example.com'},{...valid,event:'sent'},{...valid,language:'xx'},null])assert.equal((await onRequest({request:request(payload),env:{ENGAGEMENT_DB:db}})).status,400);
assert.equal((await onRequest({request:request({...valid,message:'x'.repeat(300)}),env:{ENGAGEMENT_DB:db}})).status,413);
assert.equal((await onRequest({request:request(valid),env:{ENGAGEMENT_DB:db}})).status,200);
assert.deepEqual(bound.args.slice(1),['consult_draft','ko']);assert.match(bound.args[0],/^\d{4}-\d{2}-\d{2}$/);assert.match(bound.sql,/ON CONFLICT/);
assert.deepEqual(await(await onRequest({request:new Request('https://example.com/api/engagement'),env:{}})).json(),{configured:false});
// Rate limiter is opt-in until ENGAGEMENT_RATE_LIMITER is bound in Cloudflare Pages.
const limitedRequest=()=>new Request('https://example.com/api/engagement',{method:'POST',headers:{Origin:'https://example.com','Content-Type':'application/json','CF-Connecting-IP':'192.0.2.1'},body:JSON.stringify(valid)});
assert.equal((await onRequest({request:limitedRequest(),env:{ENGAGEMENT_DB:db,ENGAGEMENT_RATE_LIMITER:{limit:async()=>({success:false})}}})).status,429);
assert.equal((await onRequest({request:limitedRequest(),env:{ENGAGEMENT_DB:db,ENGAGEMENT_RATE_LIMITER:{limit:async()=>{throw Error('down')}}}})).status,503);
assert.equal((await onRequest({request:limitedRequest(),env:{ENGAGEMENT_DB:db,ENGAGEMENT_RATE_LIMITER:{limit:async()=>({success:true})}}})).status,200);
const code=fs.readFileSync('public/engagement.js','utf8');
async function client(configured,privacy={}){
 const calls=[],handlers={};const context={navigator:privacy,window:{},document:{documentElement:{lang:'en'},addEventListener:(key,fn)=>handlers[key]=fn,getElementById:()=>({hidden:false,getAttribute:()=> 'mailto:test?subject=draft'})},location:{origin:'https://example.com',pathname:'/en/treatments/ivf/'},URL,fetch:async(url,options)=>{calls.push(options);return {ok:true,json:async()=>({configured})}}};
 vm.runInNewContext(code,context);await new Promise(r=>setImmediate(r));return {calls,handlers};
}
for(const privacy of [{doNotTrack:'1'},{globalPrivacyControl:true},{webdriver:true}])assert.equal((await client(true,privacy)).calls.length,0);
const disabled=await client(false);disabled.handlers.focusin({target:{closest:()=>true}});assert.equal(disabled.calls.length,1);
const active=await client(true);for(let i=0;i<2;i++)active.handlers.focusin({target:{closest:()=>true}});
active.handlers.submit({target:{id:'consult-form',checkValidity:()=>true}});
active.handlers['sivf:metric']({detail:'consult_copy'});
active.handlers.click({target:{closest:()=>({getAttribute:()=> 'mailto:private@example.com?body=private'})}});
const payloads=active.calls.filter(x=>x.method==='POST').map(x=>JSON.parse(x.body));
assert.deepEqual(payloads.map(x=>x.event),['treatment_view','consult_start','consult_draft','consult_copy','email_open']);
for(const p of payloads)assert.deepEqual(Object.keys(p).sort(),['event','language']);
console.log('PASS engagement: strict payload, origin, bounded body, atomic aggregate, disabled mode, privacy opt-outs, event semantics and no contact data');
