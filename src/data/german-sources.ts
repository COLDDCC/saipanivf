// Match German-language content to the relevant authorities; residence is not citizenship.
export const germanSources={
 vwp:'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visa-waiver-program.html',
 visitor:'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html',
 travel:'https://www.auswaertiges-amt.de/de/reiseundsicherheit/usavereinigtestaatensicherheit-201382',
 nationality:'https://www.germany.info/us-de/service/staatsangehoerigkeit/erwerb-1216790',
 generation:'https://www.germany.info/us-de/service/staatsangehoerigkeit/nichterwerb-1216794',
 birth:'https://www.germany.info/us-de/service/familienangelegenheiten/geburt-1216872',
 parentage:'https://www.auswaertiges-amt.de/de/service/fragenkatalog-node/06-leihmutterschaft-606160?isLocal=false&isPreview=false',
 abroad:'https://www.informationsportal-kinderwunsch.de/kiwu/kinderwunschzeit/behandlung/behandlungsplanung/behandlungen-im-ausland-251710'
};
export function germanFaqSource(index:number,fallback:string){return index===3?germanSources.vwp:fallback;}
export const germanPageSources:Record<string,{label:string,url:string}[]>={
 'guides/travel-checklist':[{label:'Auswärtiges Amt: USA-Reisehinweise',url:germanSources.travel},{label:'US-Außenministerium: VWP, ESTA und medizinische Besuche',url:germanSources.vwp}],
 'birth-planning':[{label:'Auswärtiges Amt: Staatsangehörigkeit durch Abstammung',url:germanSources.nationality},{label:'Auswärtiges Amt: Generationenschnitt bei Auslandsgeburt',url:germanSources.generation},{label:'Auswärtiges Amt: Beurkundung einer Auslandsgeburt',url:germanSources.birth},{label:'US-Außenministerium: zulässiger Besuchszweck',url:germanSources.visitor}],
 'guides/family-planning':[{label:'Auswärtiges Amt: rechtliche Elternschaft bei Leihmutterschaft',url:germanSources.parentage},{label:'Informationsportal Kinderwunsch: Behandlungen im Ausland',url:germanSources.abroad}],
 fees:[{label:'Informationsportal Kinderwunsch: Kosten und Behandlung im Ausland',url:germanSources.abroad}]
};
