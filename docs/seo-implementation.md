# SEO 审核落实记录 · 2026-10-19

## 本次已完成

- 23个拟索引中文页面统一 canonical、Open Graph、Twitter Card、WebSite/WebPage JSON-LD；内页增加与可见导航一致的 BreadcrumbList。
- sitemap从实际Astro静态路由和治疗数据生成，自动纳入新增来源说明及隐私页面；三个过时翻译归档并设置noindex,follow，保留历史地址和最新中文站入口。
- 原首屏航拍图已原样本地化为WebP，首张保持eager/high，其余轮播lazy。原图640×358，没有通过放大伪造高分辨率。
- 本地图片提供400/800/1200宽度的适用版本（不放大源图），页面使用srcset/sizes。沿用已有照片与布局，没有新增重复展示图。
- 四个治疗详情补充适用情况、其他选择、风险与结果口径。IVF及冻卵指南改为就诊准备清单，建立治疗、流程、费用、FAQ之间的上下文链接。
- 新增内容来源说明及隐私/使用说明，医疗资料显示HFEA入口和资料核对日期；未虚构作者或医学审阅人。
- 保留预算计算器，移除将假设组合金额表述成实际治疗结论的句子，相关基础金额改为演算口径；没有恢复此前要求删除的免责声明模块。
- 关于页和咨询入口明确公开邮箱及实际接诊方，删去未经核验的合作关系表述；咨询表单关联信息处理说明。
- 无JavaScript时提供移动导航入口。

## 验证

`npm run verify`：构建、预算组合、轮播交互、页面链接/锚点/H1、图片去重与本地存在检查全部通过。
新增`check:seo`验证拟索引页面与sitemap完全对应、归档noindex、canonical、JSON-LD、分享图、所有响应式候选文件存在及轮播加载优先级。

没有取得线上浏览器、GSC、CrUX数据；不将本地检查当作Google已收录或CWV通过。

## 仍需要真实资料的项目

- 院方认可的价目表、有效日期、包含及另计项目。
- 本站实际运营主体、协调服务方及与接诊机构关系的可核验文件。
- 实际医学作者和审阅人的授权、资质及逐页审阅记录。

在取得资料前使用来源透明、职责明确的表达，不添加MedicalClinic、Offer、评分或虚构作者schema。原审核结论保留为改动前基线，不代表上述事项已经获得业务确认。

医学来源：
https://www.hfea.gov.uk/treatments/explore-all-treatments/in-vitro-fertilisation-ivf/
https://www.hfea.gov.uk/treatments/explore-all-treatments/intracytoplasmic-sperm-injection-icsi/
https://www.hfea.gov.uk/treatments/fertility-preservation/egg-freezing/
https://www.hfea.gov.uk/treatments/fertility-preservation/embryo-freezing/

图片来源：原首页航拍 https://raw.githubusercontent.com/jiusongvip/saipan/main/public/images/saipan-lagoon-aerial.jpg；其他图片沿用docs/stock-images.json及院方来源记录。响应式文件仅为这些源图的缩小版本。
