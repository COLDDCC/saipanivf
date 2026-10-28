# Guide acceptance review: embryo-transfer-aftercare

Golden reference: /guides/egg-freezing-cost/
Primary question: 胚胎移植后需要卧床吗？从离院到验孕怎样安排？
First-screen answer: 胚胎移植后，不推荐把持续卧床作为提高成功率的常规措施。按自己的处方用药、按指定日期验孕，并提前确认异常时联系谁。
Sources: ASRM 2017 embryo transfer guideline; CUH 2026 aftercare; NHS IVF; Guy’s and St Thomas’ pregnancy test results. All retrieved 2026-10-28; URLs and limitations below.
Comparison: Current source and locally rendered guide compared with CURRENT egg-freezing-cost source and locally rendered desktop/mobile pages at base cab065d52a137383cc9f9f0459cb1c007e663e5f.
Score: 88/100
Blockers: none
Mobile review: passed
Localization: passed
Reviewer: Codex agent; source and actual screenshot inspection, not independent clinician review.
Reviewed date: 2026-10-28

New route: /guides/embryo-transfer-aftercare/
Traditional route: /zh-hant/guides/embryo-transfer-aftercare/
Reference: /guides/egg-freezing-cost/

## Intent and scope
Chinese-speaking patients preparing for or recovering from embryo transfer, including cross-border patients. Primary keyword: 胚胎移植后要卧床吗. Secondary intents: activity, prescription adherence, test timing, concerning symptoms, follow-up handoff. Existing IVF stages and frozen-transfer treatment pages cover the procedure; this page covers the waiting period and links back rather than repeating them. Additional utility compared with the budget reference: a six-part departure/follow-up checklist that can be copied into a note and completed with the care team.

| Dimension | Result | Evidence and topic-specific rationale |
|---|---|---|
| Five-second answer | Equal | Reference leads with a scoped budget; this guide leads with a visible no-routine-bed-rest answer and individualized activity boundary in the first screen. |
| Information density | Equal | Reference separates fee categories; this guide separates activity, medications, testing and escalation without unrelated procedure detail. |
| Visual clarity | Equal | Both have restrained light panels and legible headings at 390 and 1440 px. A locally optimized licensed notebook image supports organizing follow-up, with attribution in the site image inventory linked by the footer. |
| Structured usefulness | Equal | Reference has budget comparisons; this guide has a five-scenario decision table, result branches and a six-item checklist suited to aftercare. No irrelevant calculator added. |
| Specificity | Equal | The reference quantifies costs; this topic instead scopes Grade A bed-rest evidence and explicitly leaves prescriptions, test dates and flight clearance to the treating team. No invented universal day counts. |
| Trust | Equal | Both show editorial identity, checked date and source links. This guide links claims inline and distinguishes UK institutional instructions from Saipan clinic policies. |
| User journey | Equal | Reference supports budget confirmation; this guide directs readers to establish follow-up responsibility and links IVF stages, travel preparation and frozen transfer. |
| Accessibility and responsive behavior | Equal | Both inspected at desktop/mobile. One H1, no document overflow, images load, focusable scroll region, native details, visible navigation and table headers. |
| Technical SEO | Equal | Canonical and alternate links verified in rendered CN/TW HTML, one H1, indexable routes and sitemap entries. Shared WebPage/Breadcrumb schema matches page identity. |
| Localization | Equal | CN/TW pages inspected; targeted terminology includes 醫師、看診、資訊、新鮮胚胎、冷凍胚胎、追蹤 and 回程. No unprovided English/Japanese etc. alternates advertised. |

Internal rubric: answer/intent 23/25; evidence 23/25; visual/mobile 17/20; practical utility 12/15; SEO/localization 13/15. Heuristic, not a clinical endorsement or ranking forecast.

## Evidence ledger
All checked 2026-10-28. No prices, success rates, drug doses, provider promises or universal post-transfer timelines introduced.

| Claim | Primary source | Applicability / limits |
|---|---|---|
| Routine bed rest not recommended; immediate ambulation supported; Grade A | https://www.asrm.org/practice-guidance/practice-committee-documents/performing-the-embryo-transfer-a-guideline-2017/ | ASRM practice guideline, 2017; recommendation about routine bed rest, not all sports or travel or individual medical contraindications. |
| Continue prescribed treatment pending team discussion, even with bleeding; report results and concerning bleeding, fever or persistent pain | https://www.cuh.nhs.uk/patient-information/patient-information-after-embryo-transfer/ | CUH institutional patient instructions approved 2026-02-19. General care principles paraphrased; institution-specific doses and stopping weeks deliberately not generalized. |
| Test on clinic-designated date; positive result followed by clinical follow-up/scan | https://www.nhs.uk/tests-and-treatments/ivf/ | NHS patient guidance. The article omits its example day count to avoid implying universal timing. |
| Positive test with abdominal/shoulder pain, bleeding or faintness needs assessment | https://www.guysandstthomas.nhs.uk/health-information/ivf-treatment/results-your-pregnancy-test | Institutional primary patient guidance, last reviewed July 2023; still publicly available, scheduled review July 2026. Used with current CUH escalation advice; no percentages or individual drug instructions copied. |
| Work, exercise, flight timing and local test acceptance | Editorial question prompts, not a verified provider policy | Explicitly require confirmation; no fixed permission, restriction, test acceptance or return date asserted. |

SERP/reference reviewed: https://www.sivf-asia.com/education/how-to-prepare-for-embryo-transfer (retrieved 2026-10-28), a broad transfer-day article. Used only to check topic overlap; medical claims use primary sources above. This article focuses on aftercare and handoff, not bladder preparation or the procedure.

Cover: existing /images/stock/legacy-planner-green.webp, Pexels photo 5554664, https://www.pexels.com/photo/5554664/, Pexels License https://www.pexels.com/license/. Existing retrieval 2026-10-19 recorded in docs/stock-images.json. Generic stationery, no representation of real treatment/patients. Local responsive variants already supplied.

## Visual proof
Actual Chromium render screenshots in [evidence folder](embryo-transfer-aftercare-evidence/): cn-390.jpg, cn-1440.jpg, tw-390.jpg, tw-1440.jpg, golden-390.jpg, golden-1440.jpg. Browser measurements in visual-results.json. Inspected CN desktop/mobile, TW mobile and reference desktop/mobile. All six browser runs show one H1, no whole-page horizontal overflow and all images loaded. Cover changed from shared hub image to unique existing licensed notebook photo after the image-uniqueness check caught duplication; final captures include the corrected cover.

## Tests and release
- npm ci: passed.
- npm run build: passed.
- npm run check: passed after declaring the new Chinese-only route in localization/loading inventories and assigning a unique cover.
- npm run verify: final run recorded in PR description.
- Code committed / CI passed / deployment observed: tracked separately in PR; local checks are not CI or production deployment.
- Changed implementation: article, guide hub link, shared header image mapping, Traditional terminology and sitemap locale set, loading/i18n route inventories. Review and six screenshots accompany the change.

## Follow-up acceptance — 2026-10-28
- GitHub verify check passed on b480048d2500eddf20c085c40bb6132a1947fb55. The screenshot workflow also passed, but its configured target is the citizenship guide; it is not counted as new-guide visual proof. New-guide proof is the actual local Chromium captures and browser assertions.
- Corrected visual-results.json from console text to valid JSON and rechecked both locales at 320, 390, 768 and 1440 pixels: no document overflow, one H1, all images loaded, FAQ opens, two language choices.
- Added explicit new-guide locale existence and alternate-count checks, including rejection of undeclared translations.
- Cloudflare preview build was still in progress when inspected; production deployment not observed. PR remains unmerged.
