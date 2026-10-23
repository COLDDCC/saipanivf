(()=>{
 'use strict';
 if(navigator.doNotTrack==='1'||window.doNotTrack==='1'||navigator.globalPrivacyControl===true||navigator.webdriver)return;
 const endpoint='/api/engagement';
 const languages=new Set(['zh-CN','zh-TW','en','ja','ko','es','de','fr']);
 const language=languages.has(document.documentElement.lang)?document.documentElement.lang:'zh-CN';
 const allowed=new Set(['treatment_view','contact_open','budget_use','consult_start','consult_draft','email_open','consult_copy']);
 const once=new Set();let enabled=false,waiting=true,pending=[];
 function post(event){fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({event,language}),credentials:'omit',referrerPolicy:'no-referrer',keepalive:true}).catch(()=>{});}
 function track(event,single=false){if(!allowed.has(event)||single&&once.has(event))return;if(single)once.add(event);if(waiting){if(pending.length<20)pending.push(event);}else if(enabled)post(event);}
 // Only an operation name and language leave the page. Never read form values or URL queries.
 document.addEventListener('sivf:metric',e=>{if(e.detail==='consult_copy')track(e.detail);});
 document.addEventListener('focusin',e=>{if(e.target.closest?.('#consult-form input,#consult-form select,#consult-form textarea'))track('consult_start',true);});
 document.addEventListener('change',e=>{if(e.target.closest?.('#budget-path,.budget-options input'))track('budget_use',true);});
 document.addEventListener('submit',e=>{
  if(e.target.id==='consult-form'&&e.target.checkValidity()){
   const draft=document.getElementById('email-summary');
   if(draft&&!draft.hidden&&draft.getAttribute('href')?.includes('?subject='))track('consult_draft');
  }
 });
 document.addEventListener('click',e=>{
  const a=e.target.closest?.('a');if(!a)return;
  const href=a.getAttribute('href')||'';
  if(href.startsWith('mailto:')){track('email_open');return;}
  try{const target=new URL(href,location.origin);if(target.origin===location.origin&&/^\/(?:en\/|ja\/|ko\/|es\/|de\/|fr\/|zh-hant\/)?contact\/$/.test(target.pathname))track('contact_open');}catch{}
 });
 if(/^\/(?:en\/|ja\/|ko\/|es\/|de\/|fr\/|zh-hant\/)?treatments\/(?:ivf|icsi|egg-freezing|frozen-embryo-transfer)\/$/.test(location.pathname))track('treatment_view',true);
 fetch(endpoint,{credentials:'omit',referrerPolicy:'no-referrer'}).then(r=>r.ok?r.json():null).then(status=>{enabled=status?.configured===true;waiting=false;if(enabled)pending.forEach(post);pending=[];}).catch(()=>{waiting=false;pending=[];});
})();
