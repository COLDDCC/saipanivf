# Guide acceptance review: pgt-a

Golden reference: /guides/egg-freezing-cost/
Primary question: 做试管婴儿要不要加做 PGT-A（三代试管胚胎染色体筛查）？在塞班做会多花多少钱、多跑几趟？
First-screen answer: 多数人不必把 PGT-A 当作必选项。PGT-A 可以降低流产风险，但没有证据表明它能提高大多数人最终生下宝宝的机会；附 PGT-A 规划预算 US$3,000–6,000、先冷冻后移植、遗传病应讨论 PGT-M / PGT-SR 三项要点。
Sources: ASRM 2024 PGT-A committee opinion; HFEA PGT-A add-on rating (review date 2025-10-19); HFEA PGT-M/PGT-SR (review date 2026-06-27); ESHRE 2023 add-ons recommendations; ACOG Committee Opinion 799 (2020). All retrieved 2026-10-29; URLs and limits in the ledger below.
Comparison: Current guide compared with the CURRENT egg-freezing-cost source and its CI-rendered pages (Chromium, 320/390/768/1440 px) built from the same commit 7e0670bb5619da5e33418d21d5be1d9e15a43b1b.
Score: 90/100
Blockers: none
Mobile review: passed
Localization: passed
Reviewer: Claude (AI agent), using saipan-guide-editor skill; source review plus actual CI Chromium screenshots and browser measurements. Not an independent clinician or genetic counselor review — recommended before merge.
Reviewed date: 2026-10-29

New route: /guides/pgt-a/
Traditional route: /zh-hant/guides/pgt-a/
Reference: /guides/egg-freezing-cost/
Base commit: 7518d40773d44229f555936904397b6180f50bc4

## Intent and scope
Chinese-speaking IVF patients (mainland and Taiwan readers, including cross-border patients considering Saipan) deciding whether to add PGT-A. Primary keyword: PGT-A 要不要做 / 三代试管要不要做. Secondary intents: PGT-A vs PGT-M vs PGT-SR, what the evidence shows by outcome, age/recurrent-loss situations, extra cost, report categories (euploid/aneuploid/mosaic/no result), questions to ask before paying.

Site overlap checked: `/guides/ivf-cost/` lists the PGT-A budget line and one FAQ ("需要做 ICSI 或 PGT-A 吗？不一定"); `/treatments/` has a one-line glossary entry. Neither explains evidence, alternatives or consequences. This page links to the cost guide, AMH guide and aftercare guide rather than repeating them; the budget figures are imported from `src/data/pricing.ts` so the two pages cannot drift.

Specific additional user benefit versus the golden reference: an evidence-by-outcome table (live birth vs miscarriage vs older age vs recurrent loss) and a five-situation discussion table, plus a Saipan-specific consequence the reference topic does not have — PGT-A forces freeze-all and a separate frozen transfer, so the page totals the linked medical budget (US$9,300–12,300 excluding transfer medication and travel) and flags a likely second trip.

SERP/reference pages actually reviewed (2026-10-29): VARTA "Is embryo testing worth it?" (Victorian statutory authority, undated, ~2021) and Pinnacle Fertility "The pros and cons of PGT" (clinic blog, updated 2025-06-30). Used only to check topic coverage. Not copied: Pinnacle's "sex selection" and "reduce stressful decisions" pros (not evidence-based patient benefits; sex selection deliberately omitted), VARTA's AUD per-embryo price (different jurisdiction).

| Dimension | Result | Evidence and topic-specific rationale |
|---|---|---|
| Five-second answer | Equal | Reference leads with a numeric total budget; this guide leads with a verdict plus three scoped facts. Measured answer-box top: 452 px (CN/TW, 390 wide) vs 635 px for the reference; 380 vs 472 px at 1440. Positioned earlier, but a verdict is not more actionable than the reference's total, so not claimed Better. |
| Information density | Equal | Every section answers a distinct sub-question (which test, what evidence, which situation, cost, report, checklist). No promotional filler; the CTA block is one paragraph. Reference is similarly dense on budget sub-questions. |
| Visual clarity | Better | Visual upgrade 2026-10-29 (skills saipan-guide-tables / -illustrations): HFEA ratings shown as rating cards with shape + verdict word (not color alone), a same-scale budget bar chart above the exact table, an icon step flow (Health Icons, CC0) and one Open Peeps consultation drawing (CC0, labelled 示意图). The reference has tables and a cover photo only, so readers here can see the evidence pattern and the cost proportions at a glance. Restrained panels, shared site header/footer, CJK heading subsets regenerated so no fallback glyphs (verified in final screenshots). Cover is a licensed generic lab-glassware stock photo, shown as a 112 px strip on mobile; it is illustrative only and labelled 示意图片 in alt text. Reference cover is a similarly generic notebook photo. |
| Structured usefulness | Equal | Four tables (types, evidence by outcome, situations, cost), a five-step flow, four result cards and an eight-question checklist. Reference has budget tiers, breakdown, travel, storage-years and comparison tables. Both match their topic; no forced calculator. |
| Specificity | Equal | Quantified where evidence allows: HFEA colour ratings per outcome, STAR ITT 41.8% vs 43.5%, 2021 Chinese RCT 77.2% vs 81.8%, inconclusive biopsy 0.86–3.8%, budget lines from pricing.ts with notes. Limits stated (trial populations restricted; numbers relayed via ASRM). No invented turnaround days or success rates. |
| Trust | Better | Every medical claim maps to a guideline/regulator (ASRM, HFEA, ESHRE, ACOG) with inline attribution and dates, including the HFEA review date and the fact that ACOG 799 shows no later reaffirmation. The reference relies partly on a clinic blog for its day-count table. Budget is labelled site planning data, not a clinic quote, as in the reference. |
| User journey | Equal | Next step is a consultation with listed inputs (age, AMH/ultrasound, prior IVF/miscarriage), non-coercive wording, plus links to IVF cost, AMH, aftercare, fees tool and quotation checklist. Guide hub card added under 治疗与生育力保存. |
| Accessibility and responsive behavior | Equal | CI Chromium at 320/390/768/1440 for CN and TW: one H1, no document overflow, all images loaded, FAQ opens, every horizontally scrolling table is a focusable labelled region (reference fails this at 320 px). Inline links underlined; 44 px TOC targets; native details. |
| Technical SEO | Equal | Canonical, three alternates (zh-CN, zh-TW, x-default) and sitemap entries via the special-guide locale set; shared WebPage/Breadcrumb schema matches visible title. check:site, check:seo, check:i18n (new explicit locale assertions) and check:loading passed in CI on 7e0670b. No FAQPage schema added, matching the newer SiteLayout guides. |
| Localization | Equal | TW render inspected: 醫師、篩檢、切片（活檢）、冷凍胚胎、卵巢庫存、超音波、第三代試管; regex prevents 冷冷凍. check-i18n rejects 醫生/篩查/活檢/冷冷凍 in the TW page. No unprovided English/Japanese etc. alternates advertised. |

Internal rubric: answer/intent 23/25; evidence 23/25; visual/mobile 19/20; decision utility 13/15; SEO/localization 12/15. Heuristic only, not a clinical endorsement or ranking forecast.

## Evidence ledger
All checked 2026-10-29. No individual success-rate predictions, doses, provider promises or universal turnaround times introduced.

| Claim on page | Source | Applicability / limits |
|---|---|---|
| Value of PGT-A as universal screening for all IVF patients not demonstrated; may have a role in advanced maternal age especially with good ovarian reserve, unproven in ITT; RPL benefit lacking; trophectoderm biopsy less impact than cleavage-stage; most euploid blastocysts transferred in frozen cycles; inconclusive 0.86–3.8%; rebiopsy requires warming, rebiopsy, revitrification; consent should cover limits, mosaic, no-result, offer no-testing option and genetic counseling, written disposition policy | ASRM Practice Committee, Fertil Steril 2024;122:421–34. https://www.asrm.org/practice-guidance/practice-committee-documents/the-use-of-preimplantation-genetic-testing-for-aneuploidy-a-committee-opinion-2024/ | Primary US professional guidance; replaces 2018 opinion. Page text was read up to ~100k of ~101.5k characters; final segment (references) not read. |
| STAR ITT 41.8% vs 43.5% ongoing pregnancy at 20 weeks; 2021 Chinese RCT cumulative live birth 77.2% vs 81.8%, non-inferiority not shown | Same ASRM opinion (secondary summary of RCTs) | Relayed through ASRM, disclosed on page. Trial populations had specific entry criteria; page says results don't apply to everyone. |
| Ratings: live birth (most patients) red, often fewer embryos to transfer; miscarriage (most) green, reduced not eliminated; older women live birth and miscarriage grey; no known extra risk to the patient, some risk to the embryo; mosaic embryos may have lower pregnancy chance but healthy births reported; clinic practice differs | HFEA, https://www.hfea.gov.uk/treatments/treatment-add-ons/pre-implantation-genetic-testing-for-aneuploidy-pgt-a/ (review date 2025-10-19) | UK regulator ratings; applied as evidence summary, not as Saipan clinic policy. The page's specific list of embryo risks was not retrievable, so no specific embryo risks are listed. |
| PGT-M for known serious single-gene conditions; PGT-SR for known chromosome rearrangements; testing not 100% accurate | HFEA, https://www.hfea.gov.uk/treatments/embryo-testing-and-treatments-for-disease/pre-implantation-genetic-testing-for-monogenic-disorders-pgt-m-and-pre-implantation-genetic-testing-for-chromosomal-structural-rearrangements-pgt-sr/ (review date 2026-06-27) | Regulator patient information; UK licensing context not asserted for Saipan. |
| PGT-A currently not recommended for routine clinical use | ESHRE Add-ons Working Group, Hum Reprod 2023, https://doi.org/10.1093/humrep/dead184 (read via UCL Discovery author copy) | European professional guidance. |
| Prenatal aneuploidy screening or diagnostic testing should be offered to all patients after PGT-A, as for any pregnancy | ACOG Committee Opinion No. 799, March 2020, https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2020/03/preimplantation-genetic-testing | Page shows no later reaffirmation date; disclosed inline. ACOG list-of-titles PDF could not be fetched to confirm current status. |
| PGT-A US$3,000–6,000; embryo freezing US$1,000; first-year storage US$800; FET US$4,500 (transfer medication extra); linked total US$9,300–12,300 | src/data/pricing.ts (site planning assumptions, not provider fees) | Labelled 本站规划预算 / 非诊所报价 on page; caption explains that freezing and FET are not wholly incremental to PGT-A. |
| Return airfare US$450–1,000 per person | /guides/egg-freezing-cost/ travel table, checked 2026-10-26 | Reused existing site estimate with link; accommodation for a transfer trip intentionally not estimated. |
| Checklist items (lab, billing unit, mosaic/no-result policy, timing, Chinese report explanation) | Editorial consultation prompts grounded in ASRM consent recommendations | Questions, not verified provider policy. No claim that the Saipan provider offers or performs PGT-A in-house. |

Cover: existing /images/stock/hero-laboratory.webp, Pexels photo 6074940, https://www.pexels.com/photo/6074940/, Pexels License, retrieved 2026-10-19 (docs/stock-images.json, placement updated). Generic glassware and syringes on pink background; does not depict real patients, clinicians or embryo testing. Previously used only on the English homepage, so per-locale image uniqueness holds.

## Visual proof
CI Chromium captures from commit 7e0670bb5619da5e33418d21d5be1d9e15a43b1b in [pgt-a-evidence](pgt-a-evidence/): cn-390.jpg, cn-1440.jpg, tw-390.jpg, tw-1440.jpg, golden-390.jpg, golden-1440.jpg (desktop downscaled 50%); measurements in visual-results.json. Inspected CN desktop/mobile, TW desktop/mobile and the reference at both sizes.

Issues found and fixed during review: (1) new heading characters fell back to a different serif — regenerated CJK heading subsets with `npm run fonts:regen` in CI (SC 114,048→122,044 bytes, TC 126,108→138,036; both within the repo's 10% guard; check:loading passed); (2) "PGT-A" broke across lines in mobile headings — wrapped in no-wrap spans; (3) inline body links were not visually distinct — underlined; (4) first capture script opened the language menu instead of an FAQ — corrected and recaptured.

## Tests and release
- Local sandbox: npm registry blocked, so npm ci / build / verify could not run locally. All results below are from GitHub Actions on the PR branch.
- CI on 7e0670b: npm ci and npm run build passed; check:site, check:seo, check:i18n, check:mobile, check:loading passed (independent step); full `npm run check` passed check:budget then stopped at check:guide-review because this review file did not yet exist. With this review added, GitHub "Site verification" (npm ci + npm run verify, all checks including check:guide-review 88/100) passed on 3272e8ba80c3c7c31ebff69fc81a120165acfab2.
- Code committed: yes (branch guide/pgt-a, draft PR #22). CI passed: yes (3272e8b, re-run on final commit). Deployment observed: no — Cloudflare preview not inspected; production unchanged until merge.
- Changed implementation: new page, guide hub card, header image mapping, Traditional terminology + sitemap locale set, i18n/loading route inventories with new locale assertions, regenerated heading font subsets, image placement record, this review and evidence.

## Visual upgrade — 2026-10-29
Pilot for the new repo skills `saipan-guide-tables`, `saipan-guide-illustrations` and `saipan-guide-photos`.
- Evidence table → `RatingGrid` (same four rows, same sources; ASRM recurrent-loss row shown as grey "缺乏明确获益证据" with its own label, not converted into an HFEA grade).
- Cost section: `RangeBars` on one fixed scale (scaleMax US$6,000) above the unchanged exact table; values printed as text. Fixed after first capture: value column now fixed-width so bar lengths are comparable across rows.
- Flow → `StepFlow` with Health Icons (microscope, test tubes, DNA, lab search, plane), CC0, commit 8e8eca6b in docs/illustrations.json.
- Situations: Open Peeps drawing `pgt-a-consult` (two standing figures, calm/explaining faces, site ink colour), CC0 artwork, parts and commit recorded in docs/illustrations.json, alt text states it is a drawing and not a real clinician or patient.
- No new numbers; every bar value comes from pricing.ts or the existing ledger row (airfare from the egg-freezing-cost guide).
- CI Chromium capture on 4f72d3c: one H1, no page overflow at 320/390/768/1440 for CN and TW, FAQ opens, scroll regions focusable. imagesLoaded reported false at 320 px only because the lazy-loaded illustration was below the fold when measured; it loads at the other widths.
- Photos: the Pexels workflow ran and stopped with the expected message because the PEXELS_API_KEY secret is not yet configured; no photo was added.

