// Roles and education summarized from the institution’s public team page.
// Checked 2026-10-20; this is not independent license verification.
export const teamSource = '/team/';
export const team = [
 {id:'gary-ramsey',name:'Gary G. Ramsey, M.D.',role:'医疗主任',image:'gary',summary:'院方公开介绍的医疗主任，具有UCLA医学教育背景。',background:'院方介绍列明其医学学位来自加州大学洛杉矶分校（UCLA）。',question:'初诊由哪位医生接诊？如何讨论治疗选择、个人风险和复诊安排？'},
 {id:'irena-lalic',name:'Irena Lalic',role:'胚胎学专家',image:'irena',summary:'具有生物学与临床胚胎学背景，参与IVF实验室相关工作。',background:'院方介绍列明其生物学硕士来自萨格勒布大学，临床胚胎学硕士来自英国利兹大学。',question:'受精、培养与冷冻报告何时提供？报告由谁解释，样本由谁保存？'},
 {id:'rose-wang',name:'Rose Wang',role:'护理负责人',image:'rose',summary:'院方公开介绍的护理负责人，参与护理管理与就诊服务。',background:'院方团队页列为护理负责人（Head Nurse）。',question:'用药说明、到院准备与复查提醒如何沟通？临时调整时联系谁？'}
] as const;

// Detail-page content for /team/<id>/. Layout follows a common doctor-profile pattern
// (hero, highlights, background, scope, questions, institution card, other members).
// Facts are limited to the provider's public team page (checked 2026-10-20). Years of
// practice, licences, languages and board certifications are NOT published there and are
// listed as items to confirm rather than invented.
export const teamProfiles: Record<string,{
 title:string;description:string;initials:string;tags:string[];
 highlights:[string,string][];bio:string[];education:[string,string][];
 scope:[string,string][];fit:string[];questions:string[];
}> = {
 'gary-ramsey':{
  title:'Gary G. Ramsey, M.D. · 医疗主任',
  description:'塞班接诊机构医疗主任 Gary G. Ramsey 医生的公开背景、负责范围，以及初诊时可以向医生确认的问题。',
  initials:'GR',tags:['医疗主任','生殖医学','IVF / ICSI','冻卵与冻胚移植'],
  highlights:[['医疗主任','院方团队页列为接诊机构医疗主任（Medical Director）。'],['UCLA 医学教育','院方介绍列明其医学学位来自加州大学洛杉矶分校（UCLA）。'],['美国规范下执业','接诊机构位于美国北马里亚纳群岛，执业信息可在预约时请院方提供。']],
  bio:['Gary G. Ramsey 医生是院方公开介绍的医疗主任。医疗主任通常负责诊疗方案的医学把关，包括评估检查结果、讨论治疗选择与风险，以及审核治疗安排。','实际由哪位医生负责你的初诊、促排监测、取卵与移植，以预约确认为准；如需了解医生的执业年限、执照与专科认证，可在预约时请院方书面提供。'],
  education:[['医学学位','加州大学洛杉矶分校（UCLA），据院方团队介绍'],['执照与专科认证','院方公开页面未列明，预约时可请院方提供'],['可用语言','院方公开页面未列明，可确认是否需要翻译协助']],
  scope:[['初诊评估','结合病史与已有检查，讨论适合的治疗方向。'],['治疗方案','IVF、ICSI、冻卵、冻胚移植等方案的适用条件与选择。'],['风险与结果','讨论个人风险、成功率的统计口径与复诊安排。']],
  fit:['准备第一次做 IVF，希望先确认方案是否适合','已有检查报告，想请医生判断还缺哪些检查','考虑冻卵或冻胚，想了解年龄与结果的关系','既往治疗未成功，希望重新评估方案'],
  questions:['初诊由哪位医生接诊？后续监测和取卵是否由同一位医生负责？','根据我的检查，建议哪种方案？还有哪些其他选择？','你们提供的成功率数据是按什么年龄组、什么结局统计的？','治疗期间出现不适，夜间或周末联系谁？']
 },
 'irena-lalic':{
  title:'Irena Lalic · 胚胎学专家',
  description:'塞班接诊机构胚胎学专家 Irena Lalic 的公开教育背景、实验室工作范围，以及可以询问的胚胎培养与冷冻问题。',
  initials:'IL',tags:['胚胎学','IVF 实验室','ICSI','玻璃化冷冻'],
  highlights:[['胚胎学专家','院方团队页列为胚胎学专家（Embryologist），参与 IVF 实验室相关工作。'],['临床胚胎学硕士','院方介绍列明其临床胚胎学硕士来自英国利兹大学。'],['生物学硕士','院方介绍列明其生物学硕士来自克罗地亚萨格勒布大学。']],
  bio:['Irena Lalic 是院方公开介绍的胚胎学专家，具有生物学与临床胚胎学背景。胚胎学团队通常负责取卵后的卵子处理、受精（含 ICSI）、胚胎培养与评估，以及卵子和胚胎的冷冻保存。','实验室报告由谁出具、由谁向你解释，以及冷冻样本的保存主体，建议在治疗前确认。'],
  education:[['临床胚胎学硕士','英国利兹大学（University of Leeds），据院方团队介绍'],['生物学硕士','克罗地亚萨格勒布大学（University of Zagreb），据院方团队介绍'],['从业年限与认证','院方公开页面未列明，预约时可请院方提供']],
  scope:[['受精与 ICSI','常规受精或单精子注射，适用条件在评估时确认。'],['胚胎培养与评估','培养天数、观察方式与报告内容。'],['卵子与胚胎冷冻','玻璃化冷冻、保存记录与日后解冻安排。']],
  fit:['想了解自己的胚胎培养报告','在比较是否做 ICSI 或 PGT 检测','计划冻卵或冻胚，关心冷冻与保存流程','希望了解实验室如何标识和保管样本'],
  questions:['受精、培养与冷冻报告何时提供？报告由谁解释？','胚胎培养到第几天？评估标准是什么？','冷冻样本由谁保存？如何核对身份与数量？','如果以后要转运样本到其他机构，手续是什么？']
 },
 'rose-wang':{
  title:'Rose Wang · 护理负责人',
  description:'塞班接诊机构护理负责人 Rose Wang 的公开职务，以及用药说明、到院准备和复查提醒可以向护理团队确认的事项。',
  initials:'RW',tags:['护理负责人','用药指导','到院准备','治疗随访'],
  highlights:[['护理负责人','院方团队页列为护理负责人（Head Nurse）。'],['护理管理与就诊服务','院方介绍其参与护理管理与就诊服务。'],['治疗期间的联络点','用药、到院与复查提醒通常由护理团队协调，具体分工预约时确认。']],
  bio:['Rose Wang 是院方公开介绍的护理负责人，参与护理管理与就诊服务。在 IVF 治疗中，护理团队通常负责用药说明、注射指导、到院准备和治疗后的随访提醒。','治疗期间临时调整日程或出现不适时联系谁、用什么方式联系，建议在开始用药前确认。'],
  education:[['职务','护理负责人（Head Nurse），据院方团队介绍'],['执照与可用语言','院方公开页面未列明，预约时可请院方提供']],
  scope:[['用药与注射指导','促排药物的使用方法、时间与保存方式。'],['到院准备','检查前注意事项、取卵与移植当天的安排。'],['随访与提醒','复查、验孕时间与返程后的联络方式。']],
  fit:['第一次自己打促排针，需要详细指导','需要提前安排行程与到院时间','返程后需要跨时区联系护理团队'],
  questions:['用药说明、到院准备与复查提醒如何沟通？','临时调整日程时联系谁？','返程后出现不适，如何联系护理团队并就近就医？']
 }
};
