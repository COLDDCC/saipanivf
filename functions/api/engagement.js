const EVENTS=new Set(['treatment_view','contact_open','budget_use','consult_start','consult_draft','email_open','consult_copy']);
const LANGUAGES=new Set(['zh-CN','zh-TW','en','ja','ko','es','de','fr']);
const reply=(body,status=200,cache='no-store')=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json','Cache-Control':cache,'X-Robots-Tag':'noindex','X-Content-Type-Options':'nosniff'}});
export async function onRequest({request,env}) {
 const url=new URL(request.url);
 if(url.search)return reply({error:'invalid_request'},400);
 if(request.method==='GET') {
  if(!env.ENGAGEMENT_DB)return reply({configured:false});
  // The status probe runs on page load; let each browser reuse it for an hour
  // instead of invoking the Function (and D1) on every page view.
  try{await env.ENGAGEMENT_DB.prepare('SELECT day FROM engagement_daily LIMIT 1').first();return reply({configured:true},200,'private, max-age=3600');}
  catch{return reply({configured:false});}
 }
 if(request.method!=='POST')return reply({error:'method_not_allowed'},405);
 if(request.headers.get('Origin')!==url.origin||request.headers.get('Sec-Fetch-Site')==='cross-site')return reply({error:'origin_not_allowed'},403);
 if(!request.headers.get('Content-Type')?.startsWith('application/json'))return reply({error:'invalid_content_type'},415);
 // Read a bounded body; never accept contact fields, page URLs or free text.
 const reader=request.body?.getReader();if(!reader)return reply({error:'invalid_event'},400);
 let bytes=0,chunks=[];
 while(true){const {done,value}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>256){await reader.cancel();return reply({error:'payload_too_large'},413);}chunks.push(value);}
 const body=new Uint8Array(bytes);let offset=0;for(const chunk of chunks){body.set(chunk,offset);offset+=chunk.length;}
 let payload;try{payload=JSON.parse(new TextDecoder().decode(body));}catch{return reply({error:'invalid_json'},400);}
 if(!payload||Array.isArray(payload)||Object.keys(payload).sort().join(',')!=='event,language'||!EVENTS.has(payload.event)||!LANGUAGES.has(payload.language))return reply({error:'invalid_event'},400);
 if(!env.ENGAGEMENT_DB)return reply({error:'not_configured'},503);
 // Optional Cloudflare Rate Limiting binding. Configure ENGAGEMENT_RATE_LIMITER
 // in the Pages project before treating this endpoint as rate limited.
 if(env.ENGAGEMENT_RATE_LIMITER){
  try{
   const key=request.headers.get('CF-Connecting-IP');
   if(!key)return reply({error:'temporarily_unavailable'},503);
   const result=await env.ENGAGEMENT_RATE_LIMITER.limit({key});
   if(!result.success)return reply({error:'rate_limited'},429);
  }catch{return reply({error:'temporarily_unavailable'},503);}
 }
 const day=new Date().toISOString().slice(0,10);
 try{
  await env.ENGAGEMENT_DB.prepare('INSERT INTO engagement_daily (day, event, language, count) VALUES (?, ?, ?, 1) ON CONFLICT(day,event,language) DO UPDATE SET count=count+1').bind(day,payload.event,payload.language).run();
  return reply({recorded:true});
 }catch{return reply({error:'temporarily_unavailable'},503);}
}
