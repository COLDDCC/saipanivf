import { site } from './site';
// The organization behind the site, as shown in every page footer. Nested
// inside WebSite (not a separate graph node) so the Traditional Chinese
// post-build pass keeps its @id unchanged on /zh-hant/ pages.
const organization={
 '@type':'Organization',
 '@id':site.origin+'/#organization',
 name:'Saipan IVF',
 alternateName:'塞班生殖中心',
 url:site.origin+'/',
 logo:{'@type':'ImageObject',url:site.origin+'/apple-touch-icon.png',width:180,height:180},
 email:'info@saipan-ivf.com',
 address:{'@type':'PostalAddress',streetAddress:'3rd Floor, Bank of Guam',addressLocality:'Garapan',addressRegion:'MP',postalCode:'96950',addressCountry:'US'}
};
// One multilingual website, shared by all language directories.
export const websiteSchema={
 '@type':'WebSite',
 '@id':site.origin+'/#website',
 url:site.origin+'/',
 name:'Saipan IVF',
 alternateName:'塞班生殖中心',
 inLanguage:['zh-CN','zh-TW','en','ja','ko','es','de','fr'],
 publisher:organization
};
export const shareLocales=['zh_CN','zh_TW','en_US','ja_JP','ko_KR','es_ES','de_DE','fr_FR'];

// FAQPage node for the FAQ route of any language. Answers join the short
// answer and its explanation exactly as the page shows them.
export function faqPageSchema(pageUrl:string,language:string,items:{question:string,answer:string}[]){
 return {
  '@type':'FAQPage',
  '@id':pageUrl+'#faq',
  url:pageUrl,
  inLanguage:language,
  isPartOf:{'@id':site.origin+'/#website'},
  mainEntity:items.map(item=>({'@type':'Question',name:item.question,acceptedAnswer:{'@type':'Answer',text:item.answer}}))
 };
}
