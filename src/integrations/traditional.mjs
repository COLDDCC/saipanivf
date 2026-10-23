import { siteOrigin } from '../data/origin.mjs';
import {readFileSync,writeFileSync,readdirSync,mkdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join,relative,dirname} from 'node:path';
import * as OpenCC from 'opencc-js';
import {parse,serialize} from 'parse5';
const convert=OpenCC.Converter({from:'cn',to:'tw'});
function tw(s){
 if(typeof s!=='string')return s;
 s=s.replaceAll('免籤','免簽').replaceAll('工籤','工簽');
 const reps=[
  ['身份與回國','身份與返台'],
  ['中國國籍、旅行證和戶口分別確認','台灣國籍、護照與戶籍分別確認'],
  ['中國不承認雙重國籍。境外出生子女的中國國籍認定與父母國籍、定居情況等有關；旅行證、戶籍辦理應向主管機關核實，並不存在統一的“18歲任選中美國籍”規則。','依《國籍法》第2條，出生時父或母為中華民國國民者，屬中華民國國籍。境外出生不等於已完成台灣戶籍登記；國籍、護照及戶籍應分別確認。並不存在“18歲任選台美國籍”的統一規則。'],
  ['中國就學','返台就學'],
  ['回中國接受義務教育需要核實當地入學條件。申請中國高校國際學生項目另有國籍、護照持有時間、境外居住經歷及學校考核要求，持外國護照不等於可免試進入清華、北大。','持美國護照不等於自動符合外國學生或僑生招生資格。外國學生資格依國籍、曾否具有中華民國國籍、戶籍及海外居留等條件認定；僑生另有招生規定。應先確認適用入學管道，再核對學校要求，不能承諾免試進入頂尖大學。'],
  ['回國證件','返台證件'],
  ['中國護照可以免簽去塞班嗎？','台灣護照去塞班需要簽證嗎？'],
  ['符合CNMI EVS-TAP條件並獲旅行授權的中國公民，可以免簽赴北馬里亞納群島，通常最長14天。','符合資格的台灣護照持有人，取得ESTA承認並滿足美國免簽證計畫（VWP）條件後，可赴美短期訪問，一般最長90天。'],
  ['美國海關與邊境保護局的CNMI EVS-TAP要求符合條件的旅客提前取得電子旅行授權；該安排僅限北馬里亞納群島，不等於獲得前往關島或美國本土的許可。治療或分娩所需停留可能超過14天，不能直接套用短期商旅安排，應按真實出行目的確認適用路徑。授權也不保證獲准入境。','VWP允許符合資格與入境條件者進行醫療訪問；ESTA並非僅適用於北馬里亞納群島。應確認治療日程可在獲准停留期限內完成，授權也不保證入境。以取得子女美國籍為主要目的的生產旅行，不屬於訪客簽證允許的目的。出發前請向美國在台協會（AIT）確認適用規定。']
 ];
 for(const [f,r] of reps) s=s.replaceAll(f,r);
 return s;
}
const origin=siteOrigin;
function local(value){
 if(!value.startsWith('/')||value.startsWith('//')||/^\/(images|_astro|favicon|en|ja|ko|es|de|fr|zh-hant)(\/|\.|$)/.test(value))return value;
 const url=new URL(value,origin);for(const [key,value] of [...url.searchParams])url.searchParams.set(key,convert(value));return '/zh-hant'+url.pathname+url.search+url.hash;
}
function graph(value,key=''){
 if(value===origin+'/#website')return value;
 if(value&&typeof value==='object'&&!Array.isArray(value)&&value['@type']==='WebSite')return value;
 if(typeof value==='string'){if(['url','item','@id'].includes(key)&&value.startsWith(origin)&&!value.startsWith(origin+'/images/'))return origin+'/zh-hant'+value.slice(origin.length);return value==='zh-CN'?'zh-TW':tw(convert(value))}
 if(Array.isArray(value))return value.map(v=>graph(v));if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,graph(v,k)]));return value;
}
export default function traditional(){return {name:'complete-traditional-chinese',hooks:{'astro:build:done':({dir})=>{
 const root=fileURLToPath(dir);const pages=[];
 function find(folder){for(const entry of readdirSync(folder,{withFileTypes:true})){if(entry.isDirectory()&&!['en','ja','ko','es','de','fr','zh-hant','images','_astro'].includes(entry.name))find(join(folder,entry.name));if(entry.isFile()&&entry.name==='index.html')pages.push(join(folder,entry.name))}}
 find(root);
 for(const path of pages){const tree=parse(readFileSync(path,'utf8'));function visit(node){const attrs=node.attrs||[];const get=name=>attrs.find(a=>a.name===name)?.value;const isAlt=node.tagName==='link'&&get('rel')==='alternate';if(node.tagName==='a'&&get('hreflang')){node.attrs=node.attrs.filter(a=>a.name!=='aria-current');if(get('hreflang')==='zh-TW')node.attrs.push({name:'aria-current',value:'page'})}if(node.tagName==='script'){
   for(const text of node.childNodes||[])if(text.nodeName==='#text'){text.value=get('type')==='application/ld+json'?JSON.stringify(graph(JSON.parse(text.value))):tw(convert(text.value))}return;
  }
  if(node.nodeName==='#text')node.value=tw(convert(node.value));
  for(const a of attrs){if(a.name==='lang'&&node.tagName==='html'){a.value='zh-TW';continue}if(isAlt)continue;if((a.name==='href'||a.name==='value')&&!get('hreflang')){a.value=local(a.value);if(a.value.startsWith(origin)&&node.tagName==='link'&&get('rel')==='canonical')a.value=origin+'/zh-hant'+a.value.slice(origin.length)}if(a.name==='content'&&get('property')==='og:url')a.value=origin+'/zh-hant'+a.value.slice(origin.length);if(a.name==='content'&&get('property')==='og:locale')a.value='zh_TW';if(a.name==='content'&&get('property')==='og:locale:alternate'&&a.value==='zh_TW')a.value='zh_CN';if(!['src','srcset','href','style','class','id'].includes(a.name))a.value=tw(convert(a.value))}
  for(const child of node.childNodes||[])visit(child);if(node.content)visit(node.content);
  if(node.tagName==='details'&&get('class')?.split(' ').includes('language-switcher')){const summary=node.childNodes?.find(child=>child.tagName==='summary');if(summary)summary.childNodes=[{nodeName:'#text',value:'繁體中文 ▾',parentNode:summary}]}
 }
 visit(tree);let html=serialize(tree);
 html=html
  .replaceAll('https://g-cnmi-eta.cbp.dhs.gov/','https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visa-waiver-program.html')
  .replaceAll('CBP官方旅行授權系統','美國國務院：VWP與ESTA')
  .replaceAll('<a href="https://www.nia.gov.cn/n741440/n741547/c1013967/content.html" target="_blank" rel="noopener">國家移民管理局：《中華人民共和國國籍法》</a>','<a href="https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0030001" target="_blank" rel="noopener">全國法規資料庫：《國籍法》</a>')
  .replaceAll('<a href="https://www.moe.gov.cn/srcsite/A20/moe_850/202006/t20200609_464159.html" target="_blank" rel="noopener">教育部：規範高等學校接受國際學生有關工作的通知</a>','<a href="https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=H0110001" target="_blank" rel="noopener">教育部：外國學生來台就學相關規定</a>');
 const out=join(root,'zh-hant',relative(root,path));mkdirSync(dirname(out),{recursive:true});writeFileSync(out,html);}
 const paths=pages.map(p=>'/'+relative(root,dirname(p)).split('\\').join('/')+'/').map(p=>p==='//'?'/':p);
 const locales=[['zh-CN',''],['zh-TW','/zh-hant'],['en','/en'],['ja','/ja'],['ko','/ko'],['es','/es'],['de','/de'],['fr','/fr']];
 const xml='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'+paths.flatMap(path=>locales.map(([,prefix])=>'<url><loc>'+origin+prefix+path+'</loc>'+[...locales,['x-default','']].map(([lang,p])=>'<xhtml:link rel="alternate" hreflang="'+lang+'" href="'+origin+p+path+'"/>').join('')+'</url>')).join('')+'</urlset>';
 writeFileSync(join(root,'sitemap.xml'),xml);
}}}}
