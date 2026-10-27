# Guide acceptance review: iui-vs-ivf

Golden reference: /guides/egg-freezing-cost/
Primary question: 人工授精 IUI 和 IVF 有什么区别，我应该先向医生询问哪一种？
First-screen answer: IUI 将处理后的精子送入子宫，让精卵在体内相遇；IVF 先取卵并在实验室受精，再移植胚胎。选择依赖检查与个体预后。
Sources: HFEA IUI, NHS IUI and infertility treatments, ASRM unexplained infertility guideline; checked 2026-10-27
Comparison: Current guide and golden reference compared using actual Chromium 390px mobile screenshots (run 40474386745), new guide also at 1440px desktop; follow-up swipe hint added
Score: 88/100
Blockers: none
Mobile review: passed
Localization: passed
Reviewer: GPT-6 visual/code review with Chromium screenshots from GitHub Actions and automated locale tests (not a clinical professional)
Reviewed date: 2026-10-27

| Dimension | Rating | Observable evidence |
|---|---|---|
| Five-second answer | Equal | At 390px mobile heading followed immediately by summary card; as with golden, answer is early rather than buried |
| Information density | Equal | Three topic-specific tables, short flow lists, questions and compact FAQs; no verbose generic filler |
| Visual clarity | Equal | 390px and 1440px Chromium captures show readable structure; golden has a credited cover photograph, while this comparison intentionally favors a useful decision table over irrelevant medical stock photo |
| Structured usefulness | Better | Seven-factor treatment comparison, five-scenario decision table, fee-scope comparison, and five question checklist |
| Specificity | Equal | No invented provider price, timeline or success rate; explains per-cycle and live-birth metric distinctions |
| Trust | Equal | HFEA, NHS, ASRM, evidence limitations, last-checked date and no assertion that local IUI is offered |
| User journey | Equal | Links to existing IVF phases, costs, price quote preparation, initial reports and consultation |
| Accessibility and responsive behavior | Equal | Mobile Chromium screenshot confirms layout; horizontally scrollable keyboard-focus tables now display explicit swipe hint; 1440px desktop columns visible |
| Technical SEO | Equal | Single H1, canonical, JSON-LD breadcrumbs, indexable two Chinese locales, correct sitemap links; all independent CI checks passed |
| Localization | Equal | Simplified + auto-generated Traditional Chinese correctly present; localized route/links audited by site and i18n tests, no nonexistent translation promised |

## Source ledger (2026-10-27)

- HFEA IUI: https://www.hfea.gov.uk/treatments/explore-all-treatments/intrauterine-insemination-iui/ — mechanism, tubal suitability, per-cycle comparisons, multiple pregnancy, cost scope. UK regulator material applies to general treatment decisions, not individual Saipan provider offers.
- NHS IUI: https://www.nhs.uk/tests-and-treatments/intrauterine-insemination-iui/ — mechanism, optional ovarian stimulation, safety risks including OHSS and symptoms requiring urgent medical assessment. UK patient information, not a Saipan clinical protocol.
- NHS infertility treatments: https://www.nhs.uk/conditions/infertility/treatment/ — IVF versus IUI treatment overview.
- ASRM unexplained infertility guidance (2020): https://www.asrm.org/practice-guidance/practice-committee-documents/evidence-based-treatments-for-couples-with-unexplained-infertility-a-guideline-2020/ — US practice guidance; individualized and local policy differences explicitly disclosed.
- No Saipan IUI availability, provider success rate, medical fee or guarantee claimed.

## Visual evidence and scope

- GitHub Actions run: https://github.com/COLDDCC/saipanivf/actions/runs/40474386745
- Actual Chromium 390×844 full-page new guide and golden-reference captures plus 1440×900 new guide examined as images in review; screenshot body shows no clipped header, overlapping cards or missing text.
- Identified mobile horizontal scrolling ambiguity and added visible guidance above tables in commit b07d076; this small copy-only follow-up requires normal CI build checks, not a wholly new layout review.
- No image-based medical provider or staff representations used.
- The review is visual, editorial and source-based, not an independent doctor endorsement or a guarantee of treatment accuracy for a particular patient.

## Release
- Code: branch content/iui-vs-ivf-guide-20261027 (PR #16).
- Independent build, site links, SEO, i18n, responsive-content and loading checks: passed on run 40474386745.
- Full verify: must pass after this signed review and updated hint.
- Cloudflare deployment: must be observed separately; GitHub merge alone is not production evidence.
