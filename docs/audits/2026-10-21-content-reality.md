# Content reality audit — 2026-10-21

Scope: treatment descriptions, FAQ, fee calculation and cross-language travel claims. No change to design, about/team or consultation delivery.

## Confirmed correction

English, Japanese and Korean travel FAQ incorrectly limited both ESTA and CNMI EVS-TAP to CNMI. These are separate programmes. Corrected their geographic scope and 90-day versus 14-day limits. Traditional Chinese also incorrectly implied medical visits were not permitted under ESTA/VWP; corrected eligibility wording. Live verification also exposed an OpenCC conversion mismatch (免籤 versus 免簽) that prevented the Taiwan-specific question and answer from replacing the PRC text. Corrected the exact conversion keys and added an explicit Taiwan eligibility regression check. Added official VWP and visitor-visa references, including the distinction between medical visits and travel primarily to obtain citizenship through childbirth. Neither authorisation guarantees admission.

Official references:
- https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visa-waiver-program.html
- https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html
- https://g-cnmi-eta.cbp.dhs.gov/
- https://www.cbp.gov/sites/default/files/2025-03/Guam-CNMI%2020250210.pdf

## Medical logic checked

- NHS describes a full IVF cycle as around 3–6 weeks. This is not the required time on Saipan; frozen transfer can be a later stage.
- ASRM's 2026 committee opinion cites the 2,387-couple trial with live birth rates of 33.8% (ICSI) and 36.6% (conventional IVF), with no statistically significant difference. The site correctly identifies these as study data, not the clinic's results.
- HFEA describes egg freezing as a future fertility option, not a guarantee of a baby. Retrieval/freezing costs and later thawing/fertilisation/transfer are distinct stages.
- Treatment information is general patient education, not verification of an individual clinic's protocol, appointment availability or treatment eligibility.

References:
- https://www.nhs.uk/tests-and-treatments/ivf/
- https://prod.asrm.org/practice-guidance/practice-committee-documents/intracytoplasmic-sperm-injection-for-nonmale-factor-indications-a-committee-opinion-2026
- https://www.hfea.gov.uk/treatments/fertility-preservation/egg-freezing/
- https://www.hfea.gov.uk/treatments/fertility-preservation/embryo-freezing/

## Budget logic and remaining evidence gap

Default IVF combination: 15,000 + 3,000–8,000 + 800 + 1,800 + 1,000 + 4,500 = USD 26,100–31,100. ICSI is optional, not universally indicated. Initial assessment, transfer medication, yearly storage and travel/living costs are excluded and identified separately. Calculator paths are covered by existing budget tests.

The monetary inputs in src/data/pricing.ts are planning assumptions. Arithmetic verification is not price verification. No institution-issued quotation or current fee schedule was obtained in this audit; do not relabel the amounts as confirmed provider fees.

## Not certified by this audit

Current individual citizenship/passport outcomes, clinic credentials, actual patient results and contracted service availability. The FAM direct page timed out during this run; its historical citizenship wording is not recorded as newly reverified. Existing historical-versus-current-rule qualifications remain. This is a scoped content audit, not medical or legal approval of the entire site.
