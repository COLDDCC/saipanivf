// Patient education summaries of the linked HFEA pages, source-checked 2026-10-19.
// These are not clinic protocols or a record of physician review.
export const decisions = {
 ivf: {
  suitable:'输卵管阻塞或损伤、其他治疗未成功的不明原因不孕、部分排卵障碍或精子问题，都可能进入IVF评估。是否直接做IVF，需要先比较其他治疗选择。',
  alternative:'部分排卵问题可以先讨论药物治疗；IVF中的常规受精与ICSI也需要分别评估。附加项目应说明采用理由，而不是按套餐全部加入。',
  risks:['促排可能发生卵巢过度刺激综合征（OHSS）。','多胎妊娠与宫外孕是需要事先了解的风险。','取消周期、未取到可用卵子或没有可移植胚胎，都可能使治疗无法进入下一步。'],
  results:'成功机会受年龄、不孕原因及个人情况影响。比较数据时，要区分每次启动周期、每次取卵或每次移植的活产率，不能把验孕阳性率当作活产率。',
  related:[['/guides/ivf-steps/','按阶段准备就诊资料'],['/treatments/icsi/','常规受精与ICSI有什么不同']]
 },
 icsi: {
  suitable:'精子数量、活动能力或形态存在明显问题，或既往IVF出现受精失败、受精率很低时，医生可能讨论ICSI。',
  alternative:'ICSI处理的是受精环节，并不是所有IVF患者都需要。没有相关指征时，应询问常规受精是否适合自己，以及增加操作的预期收益。',
  risks:['显微操作过程中卵子可能受损。','成功注射不代表一定受精、形成胚胎或获得活产。','ICSI属于IVF流程的一部分，仍需了解促排、取卵和移植相关风险。'],
  results:'查看受精率时先确认分母是否为接受注射的成熟卵子；受精率不能替代活产率。不要仅凭一项实验室指标判断整个治疗结果。',
  related:[['/treatments/ivf/','了解完整IVF流程'],['/faq/','查看ICSI与治疗结果的常见问题']]
 },
 'egg-freezing': {
  suitable:'计划推迟生育，或面临可能影响生育力的治疗时，可以讨论冻卵。涉及肿瘤等治疗，应让相关专科与生殖医生共同安排时间。',
  alternative:'根据个人情况，可以比较现在尝试怀孕、冻卵或其他生育力保存方式。冻卵保存的是卵子，不等于保存一个确定的未来妊娠结果。',
  risks:['促排和取卵有相应风险，包括OHSS和麻醉相关事项。','部分卵子可能不耐受解冻，后续也可能未受精或未形成可用胚胎。','将来妊娠时的年龄和健康状况仍需要评估。'],
  results:'取卵年龄与未来成功机会相关；卵子数量、解冻存活、受精、培养和移植是不同环节。咨询时索取同年龄组的数据，不要只看冷冻数量。',
  related:[['/guides/egg-freezing/','冻卵前的资料与保存清单'],['/fees/','分开计算取卵、保存与未来使用']]
 },
 'frozen-embryo-transfer': {
  suitable:'已经保存胚胎、准备下一次移植时，可讨论FET。先核对胚胎报告、保存主体和使用授权，再由医生评估移植准备。',
  alternative:'可以按个人治疗与家庭计划讨论移植时间或继续保存。跨机构运输不等于接收已获批准，需要先取得保存方与接收方的确认。',
  risks:['并非所有胚胎都能耐受冷冻与解冻。','移植后仍可能没有妊娠或发生流产；胚胎解冻存活不等于治疗成功。','移植胚胎数量关系到多胎风险，应讨论单胚胎移植是否适用。'],
  results:'询问同年龄组及相近胚胎条件的活产率，并确认年龄按取卵还是移植时计算。解冻存活率、临床妊娠率和活产率应分别解释。',
  related:[['/process/','查看移植与返程复查安排'],['/guides/quotation/','核对解冻、移植与取消费用']]
 }
} satisfies Record<string,{suitable:string;alternative:string;risks:string[];results:string;related:string[][]}>;
