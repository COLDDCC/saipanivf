// Relevant primary authorities for the Spanish audience; language does not imply citizenship.
export const spanishSources={
 vwp:'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visa-waiver-program.html',
 visitor:'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html',
 nationality:'https://www.mjusticia.gob.es/es/ciudadania/nacionalidad/que-es-nacionalidad/como-adquiere-nacionalidad/espanoles-origen'
};
export function spanishFaqSource(index:number,fallback:string){return index===3?spanishSources.vwp:fallback;}
export const spanishPageSources:Record<string,{label:string,url:string}[]>={
 'guides/travel-checklist':[{label:'Departamento de Estado: VWP y ESTA',url:spanishSources.vwp},{label:'Departamento de Estado: visita y tratamiento médico',url:spanishSources.visitor}],
 'birth-planning':[{label:'Ministerio de Justicia: conservación y pérdida de nacionalidad',url:'https://www.mjusticia.gob.es/en/ciudadania/nacionalidad/que-es-nacionalidad/como-pierde-nacionalidad'},{label:'Ministerio de Justicia: nacionalidad española de origen',url:spanishSources.nationality},{label:'Departamento de Estado: propósito de la visita',url:spanishSources.visitor}]
};
