import { consultation as spanish } from '../i18n/es-extra';
export const consultationCopy = {
 es:spanish,
  ko: {
    title:'생식 계획, 첫 상담부터', intro:'연락 수단은 하나면 됩니다. 이름·관심 치료·질문은 선택입니다. 치료 방향을 정하지 않았어도 문의할 수 있습니다.',
    channel:'연락 방법', value:'연락처', required:'필수', optional:'선택', name:'이름 또는 호칭',
    channels:['이메일','WeChat','전화','WhatsApp','LINE','Telegram'], placeholder:'이메일 주소',
    placeholders:['이메일 주소','WeChat ID','국가번호를 포함한 전화번호','국가번호를 포함한 전화번호','LINE ID','Telegram 사용자명'],
    more:'상담 정보 추가 (선택)', privacy:'연락처는 이번 상담에 회신할 수 있도록 이메일 본문에 포함됩니다.',
    direct:'직접 이메일로 문의하기', next:'상담 후 진행 과정',
    steps:['이메일 앱에서 내용을 확인하고 전송','첫 상담 방식·필요 자료·상담료 확인','예약이 확정된 후 검사와 출국 준비'],
    invalidEmail:'유효한 이메일 주소를 입력해 주세요.', invalidPhone:'국가번호를 포함한 유효한 전화번호를 입력해 주세요.',
    guide:'첫 상담 준비 목록', policy:'개인정보 및 정보 이용 안내',
  },
  'zh-CN': {
    title:'先聊聊你的生育计划', intro:'留下一种方便联系你的方式。项目和问题可以选填，还没确定方向也可以先咨询。',
    channel:'联系方式', value:'联系账号', required:'必填', optional:'选填', name:'怎么称呼你',
    channels:['邮箱','微信','手机号','WhatsApp','LINE','Telegram'], placeholder:'填写你的邮箱地址',
    placeholders:['填写你的邮箱地址','填写微信号','填写含国家或地区区号的手机号','填写含国家或地区区号的号码','填写 LINE ID','填写 Telegram 用户名'],
    more:'补充咨询信息（选填）', privacy:'联系方式会写入咨询邮件，用于回复本次咨询。',
    direct:'也可以直接发邮件', next:'咨询之后，下一步是什么？',
    steps:['在邮箱中确认并发送咨询内容','与接诊方确认初诊方式、所需资料和咨询费用','收到明确预约回复后，再安排检查与出行'],
    invalidEmail:'请填写有效的邮箱地址。', invalidPhone:'请填写含国家或地区区号的有效号码。',
    guide:'查看初诊准备清单', policy:'隐私与信息使用说明',
  },
  en: {
    title:'Tell us how to reach you', intro:'One contact method is enough. Your name, treatment interests and questions are optional; you can ask before choosing a treatment.',
    channel:'Contact method', value:'Contact details', required:'Required', optional:'Optional', name:'Preferred name',
    channels:['Email','WeChat','Phone','WhatsApp','LINE','Telegram'], placeholder:'Your email address',
    placeholders:['Your email address','Your WeChat ID','Phone number with country code','Number with country code','Your LINE ID','Your Telegram username'],
    more:'Add consultation details (optional)', privacy:'Your contact details will be included in the email so the recipient can reply to this consultation.',
    direct:'Prefer to email directly?', next:'What happens next?',
    steps:['Review and send the consultation in your email app','Confirm the first consultation, required information and any consultation fee','Arrange tests and travel after the appointment is confirmed'],
    invalidEmail:'Enter a valid email address.', invalidPhone:'Enter a valid number including the country code.',
    guide:'First-consultation checklist', policy:'Privacy and information use',
  },
  ja: {
    title:'連絡しやすい方法で、まずは相談', intro:'連絡先は1つで構いません。お名前・治療のご希望・ご質問は任意です。治療方針が決まっていなくても相談できます。',
    channel:'連絡方法', value:'連絡先', required:'必須', optional:'任意', name:'お呼びするお名前',
    channels:['メール','WeChat','電話','WhatsApp','LINE','Telegram'], placeholder:'メールアドレス',
    placeholders:['メールアドレス','WeChat ID','国番号を含む電話番号','国番号を含む電話番号','LINE ID','Telegram ユーザー名'],
    more:'相談内容を追加する（任意）', privacy:'連絡先は、今回のご相談への返信用としてメール本文に記載されます。',
    direct:'直接メールする場合', next:'相談後の流れ',
    steps:['メールアプリで内容を確認して送信','初回相談の方法・必要資料・相談料を確認','予約の確定後に検査や渡航を準備'],
    invalidEmail:'有効なメールアドレスを入力してください。', invalidPhone:'国番号を含む有効な電話番号を入力してください。',
    guide:'初回相談の準備リスト', policy:'プライバシーと情報の取扱い',
  }
};
export const chineseForm = {
  title:'初步生育咨询', intro:'填写后先生成邮件草稿，再在邮箱中确认发送。', subject:'咨询主题', timing:'预计就诊时间', topic:'关注方向', message:'想了解的问题', choose:'暂时不确定', unknown:'暂时不确定',
  times:['尚未确定','1–3 个月内','3–6 个月内','半年以后'], template:'填入初诊提问模板', generate:'生成咨询邮件', open:'打开邮件应用发送', copy:'复制咨询内容', copied:'已复制咨询内容', failed:'请选中文本手动复制', changed:'内容已修改，请重新生成咨询邮件。', unsent:'尚未发送：请在邮件应用中确认发送，或复制内容后发邮件。', note:'首次咨询无需完整病历。请勿填写证件号码；检查报告的接收方式请先与接诊方确认。',
  templateText:'您好，我想了解初诊能否线上进行、需要哪些资料、咨询费用，以及治疗日程和书面报价。'
};
