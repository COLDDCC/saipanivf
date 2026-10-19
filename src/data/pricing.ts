// Planning assumptions only. Not SIVF fees. Update here after clinical and financial review.
export const pricing = [
  {
    "id": "consult",
    "label": "医生首次咨询",
    "min": 250,
    "max": 250,
    "note": "病史及已有报告评估；新增检查另计。"
  },
  {
    "id": "assessment",
    "label": "基础生育评估",
    "min": 800,
    "max": 1500,
    "note": "检查清单与初诊收费重叠情况需确认。"
  },
  {
    "id": "ivf",
    "label": "IVF取卵与胚胎培养",
    "min": 15000,
    "max": 15000,
    "note": "常规监测、一次取卵、常规受精和培养；不含药物、麻醉、ICSI、冷冻、PGT及移植。"
  },
  {
    "id": "medication",
    "label": "促排药物",
    "min": 3000,
    "max": 8000,
    "note": "按处方与实际用量核算。"
  },
  {
    "id": "anesthesia",
    "label": "取卵麻醉",
    "min": 800,
    "max": 800,
    "note": "一次常规取卵麻醉预算。"
  },
  {
    "id": "icsi",
    "label": "ICSI单精子注射",
    "min": 1800,
    "max": 1800,
    "note": "仅在医生判断适用时采用。"
  },
  {
    "id": "freeze",
    "label": "胚胎冷冻操作",
    "min": 1000,
    "max": 1000,
    "note": "不含年度保存。"
  },
  {
    "id": "fet",
    "label": "冻胚移植FET",
    "min": 4500,
    "max": 4500,
    "note": "常规监测、解冻与一次移植；移植药物另计。"
  },
  {
    "id": "pgt",
    "label": "PGT-A预算",
    "min": 3000,
    "max": 6000,
    "note": "需确认活检、检测枚数、运输和检测是否均包含。"
  },
  {
    "id": "egg",
    "label": "冻卵周期",
    "min": 9000,
    "max": 9000,
    "note": "常规监测、一次取卵和冷冻；药物、麻醉及保存另计。"
  },
  {
    "id": "storage",
    "label": "年度冷冻保存",
    "min": 800,
    "max": 800,
    "note": "暂按一位患者一类保存项目／年预算。"
  }
] as const;
