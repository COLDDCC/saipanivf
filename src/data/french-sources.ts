// Francophone visitors have different entry, insurance and civil-status rules.
export const frenchSources={
 vwp:'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visa-waiver-program.html',
 visitor:'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html',
 canada:'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/citizens-of-canada-and-bermuda.html',
 canadaEsta:'https://www.help.cbp.gov/s/article/Article-1441?language=en_US',
 travel:'https://www.service-public.gouv.fr/particuliers/vosdroits/F14079',
 nationality:'https://www.service-public.gouv.fr/particuliers/vosdroits/F3068',
 birth:'https://www.diplomatie.gouv.fr/fr/services-aux-francaises-et-aux-francais/vie-administrative-et-elections/etat-civil-et-nationalite-francaise/declarer-la-naissance-ou-la-reconnaissance-d-un-enfant-a-l-etranger',
 parentage:'https://www.service-public.gouv.fr/particuliers/actualites/A18994',
 abroad:'https://www.ameli.fr/assure/droits-demarches/europe-international/protection-sociale-etranger/amp-etranger-demarches',
 quebec:'https://www.quebec.ca/famille-et-soutien-aux-personnes/grossesse-parentalite/procreation-assistee/programme-procreation-medicalement-assistee',
 citizenship:'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/citoyennete-canadienne/devenir-citoyen-canadien/admissibilite/deja-citoyen.html'
};
export function frenchFaqSource(index:number,fallback:string){return index===3?frenchSources.vwp:fallback;}
export const frenchTravelReferences=[{label:'Département d’État : visiteurs canadiens',url:frenchSources.canada},{label:'CBP : passeport canadien et ESTA',url:frenchSources.canadaEsta},{label:'Département d’État : visa de visiteur',url:frenchSources.visitor}];
export const frenchPageSources:Record<string,{label:string,url:string}[]>={
 'guides/travel-checklist':[{label:'Service Public : formalités pour les États-Unis',url:frenchSources.travel},{label:'Département d’État : VWP et séjours médicaux',url:frenchSources.vwp},{label:'Département d’État : citoyens canadiens',url:frenchSources.canada},{label:'CBP : les citoyens canadiens et ESTA',url:frenchSources.canadaEsta}],
 'birth-planning':[{label:'Service Public : nationalité française par filiation',url:frenchSources.nationality},{label:'France Diplomatie : déclaration et transcription de naissance',url:frenchSources.birth},{label:'IRCC : vérifier la citoyenneté canadienne',url:frenchSources.citizenship},{label:'Département d’État : motifs de visite',url:frenchSources.visitor}],
 'guides/family-planning':[{label:'Service Public : filiation après GPA à l’étranger',url:frenchSources.parentage},{label:'France Diplomatie : état civil à l’étranger',url:frenchSources.birth}],
 fees:[{label:'Assurance Maladie : AMP à l’étranger et démarches préalables',url:frenchSources.abroad},{label:'Québec : programme de procréation médicalement assistée',url:frenchSources.quebec}]
};
