# AMH guide review — evidence record (NOT SIGNED OFF)

Golden reference: /guides/egg-freezing-cost/
Primary question: AMH 检查结果低，就代表自然怀孕机会低，或一定需要 IVF 吗？
First-screen answer: AMH 低不等于无法自然怀孕；AMH 与 AFC 主要帮助医生预测促排卵巢反应，不能独立预测卵子质量或个人活产率。
Sources: ASRM 2020 ovarian reserve guidance, ASRM 2021 infertility evaluation, NICE NG257 2026; reviewed 2026-10-28
Comparison: Source-level comparison only; real Chromium desktop/mobile comparison with current golden page still required.
Score: provisional, not scored for release
Blockers: mobile/desktop real render, locale copy review and independent visual golden comparison have not been signed off
Mobile review: not verified
Localization: technical routes passed in CI; human Traditional Chinese copy review not verified
Reviewer: GPT-6 source/code review only (not a clinical professional, no visual signoff)
Reviewed date: 2026-10-28

| Dimension | Rating | Observable evidence / remaining work |
|---|---|---|
| Five-second answer | Not verified | Frontmatter and immediate summary card supply the essential answer, but mobile fold position is not visually verified |
| Information density | Equal | Compact four-column comparison, four interpretation scenarios, four evidence-based referral scenarios, five report checks and four consultation prompts |
| Visual clarity | Not verified | Uses shared laboratory image and compact hero styles, but no screenshot comparison of rendered layout |
| Structured usefulness | Better | Distinguishes AMH, AFC, FSH and age; report checklist offers concrete next steps beyond the costs golden reference |
| Specificity | Equal | No unsupported numeric AMH thresholds or individual pregnancy/live-birth percentages |
| Trust | Equal | Official ASRM and NICE references, date marker and limitation statement; not a clinic-specific medical promise |
| User journey | Equal | Internal links to first visit, IUI vs IVF, egg freezing cost and non-coercive contact path |
| Accessibility and responsive behavior | Not verified | Keyboard-focusable scroll region, 44px nav chips and mobile grid rules visible in source; browser review pending |
| Technical SEO | Equal | Single H1 via SiteLayout, bilingual-only hreflang/sitemap, internal link checks and SEO CI stage passed |
| Localization | Not verified | Chinese locales generated and route tests passed; final Traditional Chinese language editing not performed |

## High-impact claim ledger (checked 2026-10-28)

- ASRM, Testing and interpreting measures of ovarian reserve (2020): https://www.asrm.org/practice-guidance/practice-committee-documents/testing-and-interpreting-measures-of-ovarian-reserve-a-committee-opinion-2020/ — ovarian reserve tests are useful for predicting oocyte yield and response, poor predictors of reproductive potential independently of age. US committee opinion, not a Saipan provider success rate.
- ASRM, Fertility evaluation of infertile women (2021): https://www.asrm.org/practice-guidance/practice-committee-documents/fertility-evaluation-of-infertile-women-a-committee-opinion-2021/ — assessment and clinical context; 12 months under age 35, 6 months at 35+, earlier where risk factors exist, and reserve screening not advised for people without infertility indications. These are clinical guidance thresholds, not individual diagnoses.
- NICE, NG257 Investigation of fertility problems and management strategies (2026): https://www.nice.org.uk/guidance/ng257/chapter/Investigation-of-fertility-problems-and-management-strategies — explains AMH and AFC usage for ovarian response, discourages use of FSH for predicting assisted reproduction response/outcomes, and stresses limitations for spontaneous pregnancy prediction. UK guidance; local care decisions vary.
- No invented AMH numerical cutoffs, provider acceptance, predicted pregnancies, treatment prices or outcomes.

## Actual technical results

- Run https://github.com/COLDDCC/saipanivf/actions/runs/40619268656: dependency install, Astro build, independent site links, SEO, i18n, loading, and standalone generated-page checks pass.
- Full verify intentionally fails at `check:guide-review` because this document cannot truthfully claim mobile visual and localization review have passed.
- GitHub PR #20 remains blocked from merge until signed review is supported by actual rendered evidence.

## Acceptance still required

1. Obtain screenshot artifacts from the visual job added to `.github/workflows/verify.yml`, then capture and examine current golden page and AMH page at 390px and 1440px using rendered Chromium screenshots.
2. Check Traditional Chinese terminology and the cross-locale source/links visually.
3. Review image attribution and ensure no inaccurate depiction of a specific clinic.
4. Score all ten comparison dimensions with observed visual evidence; sign off only if no blocking problems and >=85/100.
5. Run the full `npm run verify` and confirm CI and deployment separately.
