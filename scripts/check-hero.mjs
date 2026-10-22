import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const html=fs.readFileSync('dist/index.html','utf8');
const code=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).find(s=>s.includes('data-hero-carousel'));
assert.ok(code);
function element(){return {listeners:{},attrs:{},classList:{toggle(){}},setAttribute(k,v){this.attrs[k]=v},addEventListener(k,fn){this.listeners[k]=fn}}}
const flush=()=>new Promise(r=>setImmediate(r));
function setup(){
 const images=Array.from({length:4},(_,i)=>({...element(),dataset:i?{src:'/slide'+i+'.webp',srcset:'/slide'+i+'.webp 800w'}:{},complete:i===0,naturalWidth:i===0?800:0}));
 const slides=images.map(img=>({...element(),querySelector:()=>img})),tabs=images.map(element);
 const pause=element(),prev=element(),next=element(),root=element();root.dataset={pauseLabel:'暂停自动切换',resumeLabel:'继续自动切换'};
 root.querySelectorAll=s=>s==='[data-slide]'?slides:tabs;root.querySelector=s=>s==='[data-hero-pause]'?pause:s==='[data-hero-prev]'?prev:next;root.contains=()=>false;
 const document={hidden:false,activeElement:null,querySelector:()=>root,addEventListener(){}};let tick=null;
 vm.runInNewContext(code,{document,Map,Promise,setInterval(fn,ms){assert.equal(ms,5000);tick=fn;return 1},clearInterval(){tick=null},queueMicrotask:fn=>fn()});
 return {images,slides,tabs,pause,prev,next,get tick(){return tick},loaded(i){images[i].naturalWidth=800;images[i].complete=true;images[i].listeners.load?.();}};
}
const a=setup();await flush();assert(a.tick);assert.equal(a.images[1].src,'/slide1.webp');assert.equal(a.images[2].src,undefined);assert.equal(a.images[3].src,undefined);
a.next.listeners.click();await flush();assert.notEqual(a.slides[1].attrs['aria-hidden'],'false','Keep current slide until target image is ready');a.loaded(1);await flush();assert.equal(a.slides[1].attrs['aria-hidden'],'false');assert.equal(a.slides[0].inert,true);assert.equal(a.images[2].src,'/slide2.webp');
a.tabs[3].listeners.click();a.prev.listeners.click();await flush();assert.equal(a.tabs[0].attrs['aria-pressed'],'true');a.loaded(3);await flush();assert.equal(a.tabs[0].attrs['aria-pressed'],'true','Late image must not override latest navigation');
a.tabs[2].listeners.click();a.images[2].listeners.error();await flush();assert.equal(a.tabs[0].attrs['aria-pressed'],'true','Failed image must not replace current slide');
a.pause.listeners.click();assert.equal(a.tick,null);a.pause.listeners.click();assert(a.tick);a.tick();await flush();assert.equal(a.tabs[1].attrs['aria-pressed'],'true');
a.prev.listeners.click();await flush();a.prev.listeners.click();await flush();assert.equal(a.tabs[3].attrs['aria-pressed'],'true','Previous wraps to last loaded slide');
const heroImages=[...html.matchAll(/<img\b[^>]*class="hero-slide-image[^>]*>/g)].map(m=>m[0]);assert.equal(heroImages.length,4);assert(heroImages[0].includes(' src="/images/')&&heroImages[0].includes('fetchpriority="high"')&&heroImages[0].includes('loading="eager"'));assert(heroImages.slice(1).every(tag=>tag.includes('data-src="/images/')&&!/\ssrc=/.test(tag)&&tag.includes('data-srcset=')));assert(!html.includes('播放轮播'));
console.log('PASS carousel: first image in HTML, one-slide prefetch, loaded-image-only transitions, stale request protection, failed-image fallback, autoplay, pause/resume and wraparound.');
