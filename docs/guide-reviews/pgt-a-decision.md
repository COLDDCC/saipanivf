# PGT-A decision guide review

Golden reference: /guides/egg-freezing-cost/
Primary question: Should every IVF patient add PGT-A?
First-screen answer: Routine testing for all patients has not been shown to improve live birth prospects.
Sources: ASRM committee opinion (2024), HFEA PGT-A patient information, Yan et al. (NEJM 2021, PMID 34818479), checked 2026-10-31; ACOG Committee Opinion 799 (2020) and site planning budget (src/data/pricing.ts), checked 2026-11-02. All linked in context.
Comparison: The budget reference breaks a headline price into comparable items. This guide breaks a headline success rate into denominator, endpoint and follow-up, then provides questions for the consent discussion.
Score: 88/100
Blockers: none
Mobile review: passed
Localization: passed
Reviewer: Codex editorial and rendered-page review, not independent clinical review. 2026-11-02 additions reviewed by Claude (AI agent) from source and CI Chromium captures; not a clinical review.

| Dimension | Result | Evidence |
|---|---|---|
| Five-second answer | Equal | The mobile heading immediately answers the universal-testing question. |
| Information density | Equal | Four reader scenarios, outcome definitions and a real trial answer distinct consultation questions. |
| Visual clarity | Equal | The highlighted case is readable at 390 px; short rows fit a narrow screen. |
| Structured usefulness | Equal | A quote and travel worksheet, editable appointment notes and trial results support an actual consultation. |
| Specificity | Equal | A single available blastocyst illustrates how selection and ranking differ. |
| Trust | Equal | Direct professional and regulator sources accompany the claims; no clinic-specific price or success rate is assumed. |
| User journey | Equal | Links to lab records and written quotes support follow-up before consent. |
| Accessibility and responsive behavior | Equal | Both locales tested at 320, 390, 768 and 1440 px; native result panels open without document overflow. |
| Technical SEO | Equal | Shared layout supplies canonical and Chinese alternates; guide index and sitemap expose the route. |
| Localization | Equal | Both Chinese titles and bilingual result labels rendered, including mosaic and no result. |

## Comparison with the egg-freezing cost guide after revision

- Opening: both pages answer the title immediately, then provide a concrete way forward. The PGT-A card asks which actual decision will change.
- Reader-specific paths: budget tiers map to four circumstances rather than assumed clinic prices.
- Evidence: the trial table preserves the per-group denominators, age and blastocyst eligibility, follow-up and both outcomes. Readers with a single blastocyst are explicitly outside that trial population.
- Action: the consent worksheet covers units of billing, overlapping IVF charges, inconclusive results, the anticipated report date and return-trip planning. Notes work without JavaScript.
- Verified simplified and traditional renders at 320, 390, 768 and 1440 px, including the result disclosures and editable notes. Inspected the 390 px first screen and checked the traditional numerical values against the original.

## Plain-language copy review
Replaced statistical and administrative wording with questions a patient could ask aloud. Kept the report vocabulary, original study numbers, follow-up window and enrollment limits. The page still links to the same clinical sources.

## Additions — 2026-11-02 (merged in from the retired /guides/pgt-a/ draft)
The duplicate draft `/guides/pgt-a/` (PR #22, never on main) was retired in favour of this page. Two items from it that this page lacked were added in this page's plain-language voice:
- **Cost and second trip (`#cost`)**: PGT-A means freeze-all and a later frozen transfer, often another trip to Saipan. Shown with the shared `RangeBars` component (skill `saipan-guide-tables`) on one fixed scale, values printed as text. Figures come from `src/data/pricing.ts` (PGT-A US$3,000–6,000; embryo freezing 1,000; first-year storage 800; FET 4,500 excluding medication; linked total US$9,300–12,300) and the airfare range from `/guides/egg-freezing-cost/` (checked 2026-10-26). Labelled as site planning estimates, not a clinic quote; caveat that freezing/FET are not wholly incremental.
- **Prenatal testing after PGT-A (`#results`)**: ACOG Committee Opinion 799 (March 2020) recommends offering aneuploidy screening or diagnostic testing to all patients who conceive after PGT-A. https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2020/03/preimplantation-genetic-testing — the page shows no later reaffirmation date; cited with its year.
- New H2 wording chosen so every glyph is already in the SC/TC heading font subsets (no font regeneration needed).
- Effect on the comparison: Structured usefulness and Specificity now include a quantified, sourced budget for the decision, matching the reference's strength; Trust adds a fourth primary source. Ratings left at Equal (no self-upgrade).

