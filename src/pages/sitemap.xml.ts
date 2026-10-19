export const GET = () => {
 const routes=['','about','service-scope','treatments/ivf','treatments/icsi','treatments/egg-freezing','treatments/frozen-embryo-transfer','birth-planning','treatments','team','process','fees','guides','faq','contact','guides/first-visit','guides/ivf-steps','guides/quotation','guides/egg-freezing','guides/travel-checklist','guides/family-planning'];
 return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+routes.map(p=>`<url><loc>https://saipanivf.pages.dev/${p?p+'/':''}</loc></url>`).join('')+'</urlset>',{headers:{'Content-Type':'application/xml'}});
};
