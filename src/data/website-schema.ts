import { site } from './site';
// One multilingual website, shared by all language directories.
export const websiteSchema={
 '@type':'WebSite',
 '@id':site.origin+'/#website',
 url:site.origin+'/',
 name:'Saipan IVF',
 alternateName:'塞班生殖中心',
 inLanguage:['zh-CN','zh-TW','en','ja','ko','es']
};
export const shareLocales=['zh_CN','zh_TW','en_US','ja_JP','ko_KR','es_ES'];
