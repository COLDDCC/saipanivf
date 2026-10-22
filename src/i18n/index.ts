import en from './en.json';
import fr from './fr.json';
import de from './de.json';
import es from './es.json';
import ja from './ja.json';
import ko from './ko.json';
export const dictionaries={en,ja,ko,es,de,fr};
export type Locale=keyof typeof dictionaries;
export const treatmentSlugs=['ivf','icsi','egg-freezing','frozen-embryo-transfer'];
export const routeKeys=[...Object.keys(en.pages),...treatmentSlugs.map(s=>'treatments/'+s)];
export const pageHref=(locale:string,key='')=>'/'+locale+'/'+(key?key+'/':'');
export function pageInfo(locale:Locale,key:string){
 const d=dictionaries[locale];
 const i=treatmentSlugs.indexOf(key.replace('treatments/',''));
 if(key.startsWith('treatments/')&&i>=0)return {title:d.treatments[i].title,description:d.treatments[i].summary,sections:[]};
 return d.pages[key as keyof typeof d.pages];
}
