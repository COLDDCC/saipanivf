export function hero(locale:string){
 const ja=locale==='ja',prefix='/'+locale;
 const text=locale==='ko'?[
 ['사이판 IVF · 체외수정','치료·비용·진료 과정을 확인하세요','IVF · ICSI · 배아 이식','첫 평가부터 치료까지, 기존 검사 자료와 예산·진료 일정을 단계별로 준비하세요.','첫 상담 준비','비용 확인'],
 ['난자·정자 동결','미래의 선택지를 준비하세요','평가 · 동결 · 보관','치료 주기, 동결, 연간 보관과 향후 사용을 구분해 확인하세요.','치료 비교','난자 동결 가이드'],
 ['의료진 알아보기','예약 전에 진료기관을 확인하세요','의사 · 배아 연구실 · 간호','기관의 공개 자료를 확인하고 실제 담당 의사·진료 장소·서비스 범위를 예약 시 확인하세요.','의료진 소개','센터 소개'],
 ['IVF 진료 준비','의료 일정에 맞춰 준비하세요','자료 · 예약 · 치료 · 추적 관리','기존 자료를 정리하고 개인 일정을 받은 뒤 교통과 숙박을 준비하세요.','IVF 과정','진료 가이드']
 ]:ja?[
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
 return {slides:text.map((s,i)=>({title:s[0],accent:s[1],subtitle:s[2],text:s[3],primary:s[4],secondary:s[5],image:images[i],href:prefix+links[i][0],secondaryHref:prefix+links[i][1]})),labels:locale==='ko'?{region:'사이판 생식의료 안내',carousel:'슬라이드',slide:'슬라이드',tabs:'관심 주제 선택',show:'표시',prev:'이전 슬라이드',next:'다음 슬라이드',pause:'자동 전환 일시정지',resume:'자동 전환 재개',names:['체외수정','생식력 보존','의료진','IVF 과정']}:ja?{region:'サイパンの生殖医療',carousel:'カルーセル',slide:'スライド',tabs:'表示内容を選択',show:'表示',prev:'前へ',next:'次へ',pause:'自動切替を停止',resume:'自動切替を再開',names:['体外受精','妊孕性温存','医療チーム','IVFの流れ']}:{region:'Fertility care in Saipan',carousel:'carousel',slide:'slide',tabs:'Choose a topic',show:'Show slide',prev:'Previous slide',next:'Next slide',pause:'Pause automatic slides',resume:'Resume automatic slides',names:['IVF','Preservation','Medical team','IVF journey']}};
}
