import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync('dist/index.html','utf8');
const code=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).find(s=>s.includes('data-hero-carousel'));
assert.ok(code);
function element(){return {listeners:{},attrs:{},classList:{toggle(){}},setAttribute(k,v){this.attrs[k]=v},addEventListener(k,fn){this.listeners[k]=fn}}}
function setup(reduced=false){
 const slides=[element(),element(),element()],tabs=[element(),element(),element()];
 const pause=element(),prev=element(),next=element(),root=element(),motion={matches:reduced,addEventListener(){}};
 root.querySelectorAll=s=>s==='[data-slide]'?slides:tabs;
 root.querySelector=s=>s==='[data-hero-pause]'?pause:s==='[data-hero-prev]'?prev:next;root.contains=()=>false;
 const document={hidden:false,activeElement:null,querySelector:()=>root,addEventListener(){}};
 let tick=null;
 vm.runInNewContext(code,{document,window:{matchMedia:()=>motion},setInterval(fn,ms){assert.equal(ms,6000);tick=fn;return 1},clearInterval(){tick=null},queueMicrotask:fn=>fn()});
 return {slides,tabs,pause,prev,next,root,get tick(){return tick}};
}
const a=setup();assert.ok(a.tick);a.next.listeners.click();assert.equal(a.slides[1].attrs['aria-hidden'],'false');assert.equal(a.slides[0].inert,true);a.prev.listeners.click();assert.equal(a.tabs[0].attrs['aria-pressed'],'true');a.tabs[2].listeners.click();assert.equal(a.slides[2].inert,false);a.pause.listeners.click();assert.equal(a.tick,null);a.pause.listeners.click();assert.ok(a.tick);a.root.listeners.mouseenter();assert.equal(a.tick,null);a.root.listeners.mouseleave();assert.ok(a.tick);a.tick();assert.equal(a.tabs[0].attrs['aria-pressed'],'true');assert.equal(setup(true).tick,null);
console.log('Passed: next/previous, tabs, wraparound, pause/resume, hover pause, reduced motion and inactive slide focus protection.');
