// Search snippets describe existing content; page headings remain concise.
const metadata: Record<string, Record<string, [string, string]>> = {
 de:{
  'guides/quotation':['IVF-Kostenvoranschlag prüfen: Umfang, Zahlung und Absage','Vergleichen Sie IVF-Angebote nach Leistungsumfang und Abrechnungseinheit. Prüfen Sie Medikamente, Labor, Lagerung, Transfer und Stornobedingungen.'],
  fees:['IVF-Kosten auf Saipan: Behandlung, Medikamente und Transfer','Erkunden Sie Orientierungsbudgets in USD für IVF, Medikamente, ICSI, Einfrieren und Transfer. Nutzen Sie den Rechner und prüfen Sie Zusatzkosten.'],
  'treatments/ivf':['IVF auf Saipan: Ablauf, Kosten und Erstgespräch','Von Beurteilung und Stimulation über Eizellentnahme und Kultur bis zum Transfer: IVF auf Saipan verstehen, Kosten prüfen und das Gespräch vorbereiten.'],
  'treatments/icsi':['ICSI auf Saipan: Indikationen, Ablauf und Kosten','Wie unterscheidet sich ICSI von konventioneller IVF? Informieren Sie sich über Indikationen, Risiken, Laborgebühren und Fragen für die Beratung.'],
  'treatments/egg-freezing':['Eizellen einfrieren auf Saipan: Ablauf, Kosten und Lagerung','Verstehen Sie Beurteilung, Stimulation, Entnahme und Einfrieren. Planen Sie Zykluskosten, jährliche Lagerung und eine mögliche spätere Nutzung getrennt.'],
  'treatments/frozen-embryo-transfer':['Kryotransfer auf Saipan: Ablauf, Kosten und Vorbereitung','Bereits eingefrorene Embryonen? Informieren Sie sich über Vorbereitung, Auftauen, Transfer, Kostenpositionen und Nachsorge auf Saipan.']
 },
 es:{
  'guides/quotation':['Presupuesto de FIV: qué incluye, pagos y cancelaciones','Compara presupuestos de FIV por alcance y unidad de cobro. Revisa medicación, laboratorio, conservación, transferencia, extras y cancelaciones.'],
  fees:['Precios de FIV en Saipán: medicación y transferencia','Consulta los costes orientativos en USD de punción, medicación, ICSI, congelación y transferencia. Calcula tu presupuesto y revisa los gastos adicionales.'],
  'treatments/ivf':['FIV en Saipán: proceso, precios y primera consulta','Conoce las etapas de fecundación in vitro en Saipán, desde la valoración hasta la transferencia. Consulta riesgos, costes y preparación para tu cita.'],
  'treatments/icsi':['ICSI en Saipán: indicaciones, proceso y precios','Compara ICSI y FIV convencional. Consulta sus indicaciones, riesgos y costes de laboratorio, y prepara las preguntas para la primera consulta.'],
  'treatments/egg-freezing':['Congelación de óvulos en Saipán: proceso y precios','Conoce la valoración, estimulación, punción y congelación. Separa los costes del ciclo, la conservación anual y el posible uso futuro.'],
  'treatments/frozen-embryo-transfer':['Transferencia de embriones congelados en Saipán: FET','Consulta la valoración, preparación, descongelación y transferencia de embriones congelados en Saipán. Revisa los costes y el seguimiento.']
 },
 'zh-CN': {
  'guides/quotation':['IVF报价怎么看：计费单位、额外费用与退费核对表','比较试管婴儿报价，先核对药物、取卵培养、ICSI、冷冻保存和移植的计费单位，再确认付款节点、取消周期与额外支出。附可逐项使用的报价核对表。'],
  fees:['塞班试管婴儿费用：IVF、药物与移植预算','查看塞班IVF费用构成，区分取卵培养、促排药物、ICSI、冷冻保存与胚胎移植。使用预算工具组合项目，核对另计费用和书面报价。'],
  'treatments/ivf':['塞班试管婴儿 IVF：治疗流程、费用与初诊准备','了解塞班IVF从初诊评估、促排监测、取卵受精到胚胎培养与移植的主要环节，查看适用情况、风险、费用范围及就诊准备。'],
  'treatments/icsi':['塞班 ICSI 单精子注射：适用情况与费用','了解ICSI与常规IVF受精方式的区别、适用情况及治疗风险，核对单精子注射的费用范围、另计项目和初诊咨询问题。'],
  'treatments/egg-freezing':['塞班冻卵：取卵流程、费用与保存安排','了解塞班冻卵的初诊评估、促排监测、取卵冷冻和后续保存安排，区分周期费用、保存续费与未来使用费用，准备首次咨询。'],
  'treatments/frozen-embryo-transfer':['塞班冻胚移植 FET：流程、费用与移植前准备','已有冷冻胚胎？了解塞班FET移植前评估、内膜准备、胚胎解冻与移植环节，查看费用范围、另计项目及复查安排。']
 },
 en:{
  'guides/quotation':['IVF Quote Checklist: Fees, Payment & Cancellation','Compare IVF quotations by scope and charging unit. Check medication, laboratory work, storage, transfer, payment stages, cancellation terms and travel costs.'],
  fees:['IVF Costs in Saipan: Treatment, Medication & Transfer','Explore IVF budget components in Saipan, including retrieval, medication, ICSI, freezing and transfer. Use the planner to compare scope and extra costs.'],
  'treatments/ivf':['IVF in Saipan: Process, Costs & First Consultation','Explore IVF in Saipan, from assessment and stimulation to retrieval, embryo culture and transfer. Review treatment options, risks, costs and preparation.'],
  'treatments/icsi':['ICSI in Saipan: Treatment Options, Process & Costs','Understand how ICSI differs from conventional IVF fertilisation. Explore when to discuss it, treatment risks, budget components and consultation questions.'],
  'treatments/egg-freezing':['Egg Freezing in Saipan: Process, Costs & Storage','Explore assessment, stimulation, egg retrieval and freezing in Saipan. Review cycle costs, ongoing storage and future use before your first consultation.'],
  'treatments/frozen-embryo-transfer':['Frozen Embryo Transfer in Saipan: FET Process & Costs','Have frozen embryos? Explore FET assessment, endometrial preparation, thawing and transfer in Saipan, with budget components and follow-up questions.']
 },
 ja:{
  'guides/quotation':['IVF見積りの確認表｜追加費用・支払い・中止時の精算','IVF見積りの課金単位と含まれる範囲を確認。薬剤、採卵・培養、ICSI、保存、移植、支払い時期、中止時の精算、渡航費を項目別に整理できます。'],
  fees:['サイパンの体外受精費用｜IVF・薬剤・胚移植の予算','サイパンのIVF費用を採卵・培養、薬剤、顕微授精、凍結保存、胚移植に分けて確認。予算ツールで項目を組み合わせ、追加費用と書面見積りの確認点を整理できます。'],
  'treatments/ivf':['サイパンの体外受精（IVF）｜流れ・費用・初診準備','初診評価、卵巣刺激とモニタリング、採卵・受精、胚培養・移植まで、サイパンでのIVFの流れを紹介。適応、リスク、費用範囲、初診の準備事項を確認できます。'],
  'treatments/icsi':['サイパンの顕微授精（ICSI）｜適応・流れ・費用','顕微授精と通常の体外受精の違い、医師に相談したい適応やリスクを確認。ICSIの費用範囲、別途費用と初診で尋ねる事項を整理できます。'],
  'treatments/egg-freezing':['サイパンの卵子凍結｜採卵の流れ・費用・保存','初診評価から卵巣刺激、採卵・凍結、保存まで、サイパンの卵子凍結の準備を紹介。治療周期、保存更新、将来の使用にかかる費用を分けて確認できます。'],
  'treatments/frozen-embryo-transfer':['サイパンの凍結胚移植（FET）｜流れ・費用・準備','凍結胚がある方へ。サイパンでの移植前評価、子宮内膜の準備、胚の融解と移植の流れ、費用範囲、別途費用、再診の確認事項を紹介します。']
 },
 ko:{
  'guides/quotation':['IVF 견적 확인표｜추가 비용·결제·취소 정산','IVF 견적의 과금 단위와 포함 범위를 비교하세요. 약제, 채취·배양, ICSI, 보관, 이식, 결제 시점, 취소 정산과 여행 비용을 항목별로 확인할 수 있습니다.'],
  fees:['사이판 시험관 시술 비용｜IVF·약제·배아 이식 예산','사이판 IVF의 난자 채취·배양, 약제, ICSI, 동결 보관과 배아 이식 비용을 구분하세요. 예산 도구로 항목을 조합하고 추가 비용과 서면 견적 확인 사항을 정리할 수 있습니다.'],
  'treatments/ivf':['사이판 시험관 시술 IVF｜과정·비용·첫 진료 준비','첫 평가부터 난소 자극과 모니터링, 난자 채취·수정, 배아 배양과 이식까지 사이판 IVF 과정을 알아보세요. 적용 대상, 위험, 비용 범위와 첫 진료 준비 사항을 안내합니다.'],
  'treatments/icsi':['사이판 미세수정 ICSI｜적용 대상·과정·비용','ICSI와 일반 IVF 수정 방식의 차이, 의사와 논의할 적용 대상과 위험을 알아보세요. 미세수정의 비용 범위, 추가 항목과 첫 상담 질문을 확인할 수 있습니다.'],
  'treatments/egg-freezing':['사이판 난자 동결｜채취 과정·비용·보관 안내','사이판 난자 동결의 첫 평가, 난소 자극, 난자 채취와 동결·보관 과정을 알아보세요. 치료 주기, 보관 갱신과 향후 사용 비용을 구분해 첫 상담을 준비할 수 있습니다.'],
  'treatments/frozen-embryo-transfer':['사이판 동결 배아 이식 FET｜과정·비용·준비','동결 배아가 있으신가요? 사이판 FET의 이식 전 평가, 자궁내막 준비, 배아 해동과 이식 과정을 살펴보고 비용 범위, 추가 항목과 재진 준비 사항을 확인하세요.']
 }
};
export const searchMetadata=(locale:string,key:string)=>metadata[locale]?.[key];
