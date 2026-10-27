# Guide acceptance review: iui-vs-ivf

- Golden reference: `/guides/egg-freezing-cost/` (current source inspected 2026-10-27)
- New route: `/guides/iui-vs-ivf/`
- Primary question: 人工授精 IUI 和试管婴儿 IVF 有什么区别，哪种方案值得先与医生讨论？
- First-screen answer: IUI 是将处理后的精子送入子宫，在体内受精；IVF 是取卵后在实验室受精，随后移植。治疗选择取决于检查，而不是单次费用。
- Reviewer: assistant / source-based review only; **not an independent medical professional**
- Review date: 2026-10-27
- Editorial rubric: provisional **81/100**, below 85 release threshold until visual/mobile and locale checks plus clinical review
- Status: PR draft candidate; **not clinically approved or production verified**.

| Dimension | Comparison vs current golden reference | Evidence |
|---|---|---|
| Five-second answer | Equal (source review) | `SiteLayout` title followed by `quick-answer` containing immediate mechanism and choice; the golden reference uses a distinct immediate budget answer |
| Information density | Equal (source review) | Comparison, decision table, steps, checklist, actionable FAQs; no unsourced filler |
| Visual clarity | Not verified | Styles are responsive in source; actual visual screenshot/crop not checked; uses restrained text-first page (no new hero photo) |
| Structured usefulness | Better (topic-specific) | Seven-row comparison + five-scenario decision aid + cost checklist + five ready-to-ask questions |
| Specificity | Equal (topic-specific) | Explicitly avoids inventing individual success rates and provider IUI fees; source scope and limitations stated |
| Trust | Equal (source review) | NHS, HFEA, ASRM links, date, distinctions between clinic offerings and educational guidance |
| User journey | Equal | /guides/ivf-steps/, /fees/, /guides/quotation/, /guides/first-visit/, /contact/ |
| Accessibility and responsive | Not verified | Scrollable, focusable mobile tables; semantic table headings and details; interaction requires browser validation |
| Technical SEO | Not verified | SiteLayout supplies title/description/canonical/hreflang; sitemap generation should include route, but build/indexability not yet confirmed |
| Localization | Not verified | Traditional Chinese auto-generation exists; region-specific medical terminology and 8-language output need actual checks |

## Evidence ledger (checked 2026-10-27)

1. IUI places processed sperm into uterus, requires evaluation for tubal suitability, lower treatment burden vs IVF: HFEA, `https://www.hfea.gov.uk/treatments/explore-all-treatments/intrauterine-insemination-iui/`; NHS, `https://www.nhs.uk/tests-and-treatments/intrauterine-insemination-iui/`. Applicability: general treatment education, not individual eligibility.
2. IVF fertilises eggs outside body with retrieval and embryo transfer: NHS, `https://www.nhs.uk/conditions/infertility/treatment/`. Applicability: general procedure.
3. Unexplained infertility treatment options and limits of natural-cycle IUI: ASRM, `https://www.asrm.org/practice-guidance/practice-committee-documents/evidence-based-treatments-for-couples-with-unexplained-infertility-a-guideline-2020/`. Applicability: ASRM 2020 guideline, not Saipan provider policy.
4. No numeric provider costs, outcomes, travel durations or service guarantees asserted. Need provider confirmation for actual IUI availability.
5. No clinic-specific claims of eligibility, success, or safety inserted.

## Visual and release gates
- Screenshot / mobile verification: **Not verified**.
- `npm ci` and `npm run verify`: **Not run in connector environment**; inspect PR CI.
- Simplified Chinese source: authored; Traditional Chinese auto-conversion exists in build source but not checked. Other locale templates must be checked for missing translations before promoting.
- No purpose-specific cover image: educational comparison table carries visual function; cover photography omitted to avoid irrelevant or misleading stock clinical photography. Reassess against golden visual bar during preview.
- Medical safety review: pending; don't claim medical approval.
- Source committed: yes (branch).
- CI passed: not verified.
- Deployment observed: no.

## Remaining blockers
1. Golden-reference comparison has unverified visual, a11y, technical SEO and locale dimensions: under threshold, so do not merge automatically.
2. Confirm live build, localized URLs, search metadata overrides, links and source availability.
3. Confirm clinic-specific IUI treatment provision only if subsequently making service claims.
