import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync('dist/index.html','utf8');
const code=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).find(s=>s.includes('data-hero-carousel'));
assert.ok(code);
function element(){return {listeners:{},attrs:{},classList:{toggle(){}},setAttribute(k,v){this.attrs[k]=v},addEventListener(k,fn){this.listeners[k]=fn}}}
function setup(reduced=false){
 const slides=[element(),element(),element(),element()],tabs=[element(),element(),element(),element()];
 const pause=element(),prev=element(),next=element(),root=element(),motion={matches:reduced,addEventListener(){}};
 root.dataset={pauseLabel:'暂停自动切换',resumeLabel:'继续自动切换'};
 root.querySelectorAll=s=>s==='[data-slide]'?slides:tabs;
 root.querySelector=s=>s==='[data-hero-pause]'?pause:s==='[data-hero-prev]'?prev:next;root.contains=()=>false;
 const document={hidden:false,activeElement:null,querySelector:()=>root,addEventListener(){}};
 let tick=null;
 vm.runInNewContext(code,{document,window:{matchMedia:()=>motion},setInterval(fn,ms){assert.equal(ms,5000);tick=fn;return 1},clearInterval(){tick=null},queueMicrotask:fn=>fn()});
 return {slides,tabs,pause,prev,next,root,get tick(){return tick}};
}
const a=setup();assert.ok(a.tick);a.next.listeners.click();assert.equal(a.slides[1].attrs['aria-hidden'],'false');assert.equal(a.slides[0].inert,true);a.prev.listeners.click();assert.equal(a.tabs[0].attrs['aria-pressed'],'true');a.tabs[2].listeners.click();assert.equal(a.slides[2].inert,false);a.pause.listeners.click();assert.equal(a.tick,null);a.pause.listeners.click();assert.ok(a.tick);a.tick();assert.equal(a.tabs[3].attrs['aria-pressed'],'true');a.tick();assert.equal(a.tabs[0].attrs['aria-pressed'],'true');assert.ok(setup(true).tick);
assert.ok(!html.includes('播放轮播'));

console.log('Passed: next/previous, tabs, wraparound, pause/resume, default autoplay, no playback text and inactive slide focus protection.');

const heroImages=[...html.matchAll(/<img\b[^>]*class="hero-slide-image[^>]*>/g)].map(m=>m[0]);
assert.equal(heroImages.length,4);
assert(heroImages.every(tag=>tag.includes('loading="eager"')),'all carousel images must start loading before their first transition');
assert(heroImages[0].includes('fetchpriority="high"'));
assert(heroImages.slice(1).every(tag=>tag.includes('fetchpriority="low"')),'later slides must not compete with the first image');
console.log('PASS carousel imagery: four eager images, first high priority and three low priority.');
