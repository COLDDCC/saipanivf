# Customer-facing copy cleanup — 2026-10-28

Owner request: remove stock-photo attribution/licensing and production/process notes from customer pages. This is a presentation-only cleanup; medical/legal claims, sources, prices and budget uncertainty remain.

Removed captions:
- egg-freezing-cost (zh-CN / zh-Hant): 封面：Ahmed / Pexels · 情境示意. Photo 19905182, https://www.pexels.com/photo/woman-writing-in-notebook-on-desk-19905182/ .
- family-planning (zh-CN / generated zh-TW): 医疗咨询场景示意 · MART PRODUCTION / Pexels. Photo 7088834, https://www.pexels.com/photo/hands-doctor-health-anonymous-7088834/ . Alt now describes the visible hands and form.
- saipan-baby-us-citizenship (en / zh-CN / zh-Hant): Photo by Prabin Basnet: Pexels · Commercial-use license. Photo 14937147, https://www.pexels.com/photo/hand-holding-baby-s-feet-in-close-up-photography-14937147/ .
- birth-planning (zh-CN / generated zh-TW): 配图：Pexels (photo 16362344) and 封面图片：Pexels · 图片许可 (photo 4409000). Sources: https://www.pexels.com/photo/16362344/ and https://www.pexels.com/photo/4409000/ .
- All above license reference: https://www.pexels.com/license/ ; original manifest and image files retained.

Also removed customer-visible src/data/pricing.ts references, 内部定价模型 / 内部规划假设 terminology, the unused editorial-policy stock-photo sentence, and the privacy-page implementation detail 提交接口. Budget estimates remain clearly distinguished from actual clinic quotations; send-email and privacy behavior remain accurately described. AMH alt text is now only a plain visual description.

The family-planning secondary remote photo failed in actual Chromium rendering. Removed that redundant stock-photo figure together with its caption; its original provenance remains above. The shared page-header image remains.
