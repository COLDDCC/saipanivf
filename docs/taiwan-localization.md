# Taiwan localization policy (zh-TW /zh-hant/)

This policy implements a project-specific variant of the [localize-anything](https://github.com/xueyang-dev/localize-anything) glossary/review workflow and [internationalization](https://github.com/rampstackco/claude-skills/tree/main/skills/internationalization) guidance.

## Content ownership
- Shared UI translations may be generated from common content.
- Taiwan-only immigration, nationality, identity, education, payments and care coordination facts must come from Taiwan-specific, source-backed content.
- The canonical Taiwan entry overview is `src/data/taiwan-region.mjs`. Treat `traditional.mjs` post-build replacement as a **temporary migration mechanism**, not the factual source of truth.
- Existing routes, canonical URLs, hreflang and sitemap must remain stable when refactoring.

## Locked concepts / preferred wording
| Concept | Preferred Taiwanese Chinese | Do not imply |
| --- | --- | --- |
| Audience | 台灣旅客 | 中國大陸護照持有人 |
| Site display language | 繁體中文網站資訊 | that the consultation is necessarily in Chinese |
| Coordination language | 諮詢協調語言須事先確認 | confirmed Chinese-language staff |
| Medical consultation language | 醫療問診語言須由接診醫療團隊確認 | confirmed Mandarin-speaking clinicians |
| Entry route | G-CNMI VWP／G-CNMI ETA or 美國 VWP／ESTA, specified separately | CNMI EVS-TAP as Taiwan's route |
| Payment | 美元書面報價，付款方式與匯率須確認 | guaranteed TWD payment or card acceptance |
| Nationality | 中華民國國籍、護照及戶籍分別確認 | blanket dual citizenship/education guarantees |

## Official references to recheck for changes
- CBP Guam–CNMI Visa Waiver Program: https://www.cbp.gov/travel/international-visitors/visa-waiver-program/guam-cnmi-visa-waiver-program
- G-CNMI ETA portal: https://g-cnmi-eta.cbp.dhs.gov/
- Taiwan BOCA: https://www.boca.gov.tw/
- ROC Nationality Act: https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0030001
- AIT: https://www.ait.org.tw/

Official references are *review starting points*, not proof that every claim remains current. Verify them at each material update.

## Review checklist
- [ ] Identify route and region scope and update the shared region data rather than duplicating text.
- [ ] Check immigration rules and exact qualifications against current official sources.
- [ ] Check medical, payment, treatment and language statements against the actual service provider.
- [ ] Run `npm run verify`; inspect generated `dist/zh-hant/` pages for leakage.
- [ ] Confirm self canonical, reciprocal hreflang and locale switcher.
- [ ] Compare affected pages visually in desktop/mobile; check form, fee calculator and links.
- [ ] Record unresolved high-risk claims for human signoff. A passing automated test is not semantic/legal approval.
