# AMH guide — editorial and visual acceptance

Golden reference: /guides/egg-freezing-cost/
Primary question: AMH 检查结果低，就代表自然怀孕机会低，或一定需要 IVF 吗？
First-screen answer: AMH 低不等于无法自然怀孕；AMH 与 AFC 主要帮助医生预测促排卵巢反应，不能独立预测卵子质量或个人活产率。
Sources: ASRM 2020 ovarian reserve opinion, ASRM 2021 infertility evaluation, NICE NG257 recommendations 1.18.2–1.18.5; authoritative sources rechecked 2026-10-28.
Comparison: Current merged-main golden source and actual Chromium rendering reviewed in both Chinese locales at 390×900 and 1440×900; source efc320c, 2026-10-28. Full paired screenshots and browser measurements in amh-evidence/.
Score: 88/100
Blockers: none
Mobile review: passed
Localization: passed
Reviewer: Codex editorial, source, localization and actual screenshot review; not an independent clinical signoff.
Reviewed date: 2026-10-28

| Dimension | Rating | Observable evidence |
|---|---|---|
| Five-second answer | Equal | Direct qualified takeaway also appears in the subtitle. Mobile answer begins at y=512, before golden y=655; desktop y=421 versus y=494. Both immediately answer their distinct primary query. |
| Information density | Equal | Four test comparisons, four result scenarios, four referral situations, five report checks and six distinct FAQs; no duplicated prices or unrelated destination filler. |
| Visual clarity | Equal | Actual paired screenshots show legible type, neutral answer fill, consistent spacing and compact illustrative laboratory cover; mobile cover is 112px high, desktop maximum 230px. Shared site navigation remains consistent. |
| Structured usefulness | Better | Adds a test-purpose/limitations comparison, result-specific actions, referral timing and report checklist, enabling a consultation decision rather than only explaining a term. The reference instead provides budget planning tables. |
| Specificity | Equal | No universal AMH cutoffs or promised conception rates; units and laboratory variability are explicit. ASRM age/time referral thresholds are contextualized beside their source. |
| Trust | Equal | Named website content team, updated/checked dates, primary medical links, Pexels source/license retained in the internal image manifest; no depiction or claim of a specific clinic. Medical limitations are explicit. |
| User journey | Equal | Links to first visit, egg-freezing costs, IUI/IVF, guide hub, editorial policy and optional consultation; all internal routes checked. |
| Accessibility and responsive behavior | Equal | Both locales have one H1, no document overflow at either width, visible focus styles, native FAQ toggled by Enter. Mobile table is contained (346px viewport / 720px content); focused ArrowRight moved scrollLeft to 40px. Paired screenshots include all sections and footer. |
| Technical SEO | Equal | Full built-route checks validate canonical, real Chinese alternates, sitemap and links. Shared WebPage/Breadcrumb schema remains; no unsupported translations are advertised. |
| Localization | Equal | Traditional output explicitly edited and reread for Taiwan terms: 抗穆勒氏管荷爾蒙、基礎濾泡、卵巢庫存、超音波、醫師、品質、資訊、篩檢. This topic has no local visa or currency claims; Chinese links stay in the chosen locale. |

## Score rationale
Answer/intent 23/25; evidence 23/25; visual/mobile/accessibility 17/20; decision utility 13/15; technical SEO/localization 12/15. Total 88/100, an internal editorial heuristic, not a ranking prediction or medical certification. The useful improvement over the reference is topic-specific test interpretation and consultation preparation, not additional length.

## Evidence and fixes
- Paired full-page screenshots: [Simplified mobile](amh-evidence/cn-390.jpg), [Traditional mobile](amh-evidence/tw-390.jpg), [Simplified desktop](amh-evidence/cn-1440.jpg), [Traditional desktop](amh-evidence/tw-1440.jpg).
- [Browser results](amh-evidence/browser-results.json): actual Chromium viewport, overflow, H1, FAQ and table-keyboard measurements.
- Resolved main/PR conflicts by preserving BOTH the AMH and citizenship guide routes, hub cards, alternates and loading checks.
- Corrected Astro global selectors that previously failed to scope layout descendants. Added editorial identity and recorded cover licensing, replaced repeated cover with existing licensed unused laboratory photo, and reviewed its actual content/alt.
- Added page-specific Taiwan terminology without changing other pages' medical copy.
- npm ci and build succeeded. All technical check scripts passed after the above fixes. Full verify with GITHUB_BASE_REF=main is the final same-PR editorial acceptance check; CI/deployment results are separately recorded on the PR.

## High-impact claim ledger (checked 2026-10-28)

- ASRM, Testing and interpreting measures of ovarian reserve (2020): https://www.asrm.org/practice-guidance/practice-committee-documents/testing-and-interpreting-measures-of-ovarian-reserve-a-committee-opinion-2020/ — ovarian reserve tests are useful for predicting oocyte yield and response, poor predictors of reproductive potential independently of age. US committee opinion, not a Saipan provider success rate.
- ASRM, Fertility evaluation of infertile women (2021): https://www.asrm.org/practice-guidance/practice-committee-documents/fertility-evaluation-of-infertile-women-a-committee-opinion-2021/ — assessment and clinical context; 12 months under age 35, 6 months at 35+, earlier where risk factors exist, and reserve screening not advised for people without infertility indications. These are clinical guidance thresholds, not individual diagnoses.
- NICE, NG257 Investigation of fertility problems and management strategies (2026): https://www.nice.org.uk/guidance/ng257/chapter/Investigation-of-fertility-problems-and-management-strategies — explains AMH and AFC usage for ovarian response, discourages use of FSH for predicting assisted reproduction response/outcomes, and stresses limitations for spontaneous pregnancy prediction. UK guidance; local care decisions vary.
- No invented AMH numerical cutoffs, provider acceptance, predicted pregnancies, treatment prices or outcomes.

## Customer copy correction — 2026-10-28
- Removed the complete visible stock-photo attribution/license/disclaimer paragraph at the owner's request. This operational note interrupted the patient-facing article and does not help interpret AMH results. Pexels does not require attribution; provenance and license remain in docs/stock-images.json (photo 8851726).
- Removed the now-unused cover-credit styles. Both Chinese versions derive from this source, so the correction applies to both. Image alt text stays descriptive and does not identify the photo as a specific clinic.
- Existing medical source notes remain relevant. This is a small presentation correction, not a medical rewrite; prior full visual comparison remains applicable with the answer moved earlier.
