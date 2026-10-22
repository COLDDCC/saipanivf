// Keep USD as the quoted currency; localize its number formatting without converting rates.
export function usd(value:number,locale:string){
 return locale==='fr'?value.toLocaleString('fr-FR')+' USD':locale==='de'?value.toLocaleString('de-DE')+' USD':'$'+value.toLocaleString('en-US');
}
