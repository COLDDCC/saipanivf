import {readFileSync,writeFileSync,readdirSync,mkdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join,relative,dirname} from 'node:path';
import * as OpenCC from 'opencc-js';
import {parse,serialize} from 'parse5';
const convert=OpenCC.Converter({from:'cn',to:'tw'});
const origin='https://saipanivf.pages.dev';
function local(value){
 if(!value.startsWith('/')||value.startsWith('//')||/^\/(images|_astro|favicon|en|ja|zh-hant)(\/|\.|$)/.test(value))return value;
 const url=new URL(value,origin);for(const [key,value] of [...url.searchParams])url.searchParams.set(key,convert(value));return '/zh-hant'+url.pathname+url.search+url.hash;
}
function graph(value,key=''){
 if(typeof value==='string'){if(['url','item','@id'].includes(key)&&value.startsWith(origin)&&!value.startsWith(origin+'/images/'))return origin+'/zh-hant'+value.slice(origin.length);return value==='zh-CN'?'zh-TW':convert(value)}
 if(Array.isArray(value))return value.map(v=>graph(v));if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,graph(v,k)]));return value;
}
export default function traditional(){return {name:'complete-traditional-chinese',hooks:{'astro:build:done':({dir})=>{
 const root=fileURLToPath(dir);const pages=[];
 function find(folder){for(const entry of readdirSync(folder,{withFileTypes:true})){if(entry.isDirectory()&&!['en','ja','zh-hant','images','_astro'].includes(entry.name))find(join(folder,entry.name));if(entry.isFile()&&entry.name==='index.html')pages.push(join(folder,entry.name))}}
 find(root);
 for(const path of pages){const tree=parse(readFileSync(path,'utf8'));function visit(node){const attrs=node.attrs||[];const get=name=>attrs.find(a=>a.name===name)?.value;const isAlt=node.tagName==='link'&&get('rel')==='alternate';if(node.tagName==='a'&&get('hreflang')){node.attrs=node.attrs.filter(a=>a.name!=='aria-current');if(get('hreflang')==='zh-TW')node.attrs.push({name:'aria-current',value:'page'})}if(node.tagName==='script'){
   for(const text of node.childNodes||[])if(text.nodeName==='#text'){text.value=get('type')==='application/ld+json'?JSON.stringify(graph(JSON.parse(text.value))):convert(text.value)}return;
  }
  if(node.nodeName==='#text')node.value=convert(node.value);
  for(const a of attrs){if(a.name==='lang'&&node.tagName==='html'){a.value='zh-TW';continue}if(isAlt)continue;if((a.name==='href'||a.name==='value')&&!get('hreflang')){a.value=local(a.value);if(a.value.startsWith(origin)&&node.tagName==='link'&&get('rel')==='canonical')a.value=origin+'/zh-hant'+a.value.slice(origin.length)}if(a.name==='content'&&get('property')==='og:url')a.value=origin+'/zh-hant'+a.value.slice(origin.length);if(a.name==='content'&&get('property')==='og:locale')a.value='zh_TW';if(!['src','srcset','href','style','class','id'].includes(a.name))a.value=convert(a.value)}
  for(const child of node.childNodes||[])visit(child);if(node.content)visit(node.content);
 }
 visit(tree);const out=join(root,'zh-hant',relative(root,path));mkdirSync(dirname(out),{recursive:true});writeFileSync(out,serialize(tree));}
 const paths=pages.map(p=>'/'+relative(root,dirname(p)).split('\\').join('/')+'/').map(p=>p==='//'?'/':p);
 const locales=[['zh-CN',''],['zh-TW','/zh-hant'],['en','/en'],['ja','/ja']];
 const xml='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'+paths.flatMap(path=>locales.map(([,prefix])=>'<url><loc>'+origin+prefix+path+'</loc>'+[...locales,['x-default','']].map(([lang,p])=>'<xhtml:link rel="alternate" hreflang="'+lang+'" href="'+origin+p+path+'"/>').join('')+'</url>')).join('')+'</urlset>';
 writeFileSync(join(root,'sitemap.xml'),xml);
}}}}
