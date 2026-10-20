export function hero(locale:string){
 const ja=locale==='ja',prefix='/'+locale;
 const text=ja?[
 ['サイパンの体外受精','治療・費用・受診の流れを確認','IVF · ICSI · 胚移植','初診の評価から治療まで。資料、費用範囲、受診日程を段階的に準備します。','初回相談を準備','費用を確認'],
 ['卵子・精子の凍結','将来の選択肢を考える','評価 · 凍結 · 保存','治療周期、凍結操作、年間保存、将来使用する際の手続きを分けて確認します。','治療を比較','卵子凍結ガイド'],
 ['医療チームを知る','予約前に受診先を確認','医師 · ラボ · 看護','院方が公開する情報を確認し、担当医、治療場所、サービス範囲を予約時に確かめます。','チーム紹介','施設について'],
 ['IVFの受診準備','治療日程に合わせて手配','資料 · 予約 · 治療 · 再診','既存の検査結果を整理し、個別日程を受け取ってから交通・宿泊を準備します。','IVFの流れ','受診ガイド']
 ]:[
 ['IVF in Saipan','Understand treatment, fees and next steps','IVF · ICSI · embryo transfer','From your first assessment to treatment: prepare your reports, budget and appointment schedule.','Plan a consultation','Explore fees'],
 ['Egg and sperm freezing','Explore fertility preservation','Assessment · freezing · storage','Plan the cycle, freezing procedure, annual storage and possible future use as separate decisions.','Compare treatments','Egg-freezing guide'],
 ['Meet the medical team','Know your care provider','Physicians · embryology · nursing','Review the institution’s public information and confirm your clinician, care location and service scope.','Meet the team','About the centre'],
 ['Your IVF journey','Prepare around your care schedule','Reports · appointments · treatment · follow-up','Organise existing reports, obtain your personal dates, then arrange transport and accommodation.','View the IVF journey','Patient guides']
 ];
 const images=['/images/saipan-lagoon-aerial.webp','/images/stock/leaves-soft.webp','/images/stock/ultrasound-scanner.webp','/images/stock/wing-sky.webp'];
 const links=[['/contact/','/fees/'],['/treatments/','/guides/egg-freezing/'],['/team/','/about/'],['/process/','/guides/']];
 return {slides:text.map((s,i)=>({title:s[0],accent:s[1],subtitle:s[2],text:s[3],primary:s[4],secondary:s[5],image:images[i],href:prefix+links[i][0],secondaryHref:prefix+links[i][1]})),labels:ja?{region:'サイパンの生殖医療',carousel:'カルーセル',slide:'スライド',tabs:'表示内容を選択',show:'表示',prev:'前へ',next:'次へ',pause:'自動切替を停止',resume:'自動切替を再開',names:['体外受精','妊孕性温存','医療チーム','IVFの流れ']}:{region:'Fertility care in Saipan',carousel:'carousel',slide:'slide',tabs:'Choose a topic',show:'Show slide',prev:'Previous slide',next:'Next slide',pause:'Pause automatic slides',resume:'Resume automatic slides',names:['IVF','Preservation','Medical team','IVF journey']}};
}
