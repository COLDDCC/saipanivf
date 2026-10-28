# Family planning guide — editorial review (user-approved preview and automated verification)

Golden reference: /guides/egg-freezing-cost/
Primary question: 第三方辅助生殖初次咨询应该问什么、准备哪些文件？
First-screen answer: 先确认是否接诊、资源来源、筛查范围、费用、同意与法律文件。
Sources: ASRM 2024 https://www.asrm.org/practice-guidance/practice-committee-documents/guidance-regarding-gamete-and-embryo-donation/ ; HFEA https://www.hfea.gov.uk/choose-a-fertility-clinic/consent-to-treatment-and-storage/ ; HFEA https://www.hfea.gov.uk/treatments/explore-all-treatments/using-donated-eggs-sperm-or-embryos-in-treatment/ ; URLs and topical relevance verified 2026-10-27.
Comparison: User approved standalone HTML preview and selected a Pexels hero image; source implementation uses existing site layout and separate CI layout checks.
Score: 88/100
Blockers: none
Mobile review: Passed
Localization: Passed
Reviewer: User approved desktop/mobile-capable HTML preview and requested publication; CI verifies responsive-source rules and generated zh-hant page. No manual production device screenshot was captured.
Reviewed date: 2026-10-27

| Dimension | Assessment | Evidence and rationale |
|---|---|---|
| Five-second answer | Equal | H2 answer panel immediately after topic navigation |
| Information density | Better | Expanded 3 generic paragraphs into query-specific checklists |
| Visual clarity | Equal | User-approved HTML layout retains tables and navigation; Pexels photo selected by user |
| Structured usefulness | Better | Two comparison tables, consultation prompts, four sections |
| Specificity | Better | Requests actual written scope and sample responsibilities; no claimed provider services |
| Trust | Equal | Explicit official links and applicability limits |
| User journey | Equal | Quote guide and existing GuideNextSteps CTA |
| Accessibility and responsive behavior | Equal | Existing breakpoint stack, intrinsic image dimensions, horizontal tables, semantic headings; automated mobile check passed |
| Technical SEO | Equal | CI confirms 188 indexable pages, canonical, structured data, sitemap and valid links |
| Localization | Equal | CI confirms generated Traditional route and locale checks; no claim of native-language copy editing |

## Evidence ledger
- ASRM 2024: donor infectious, genetic and psychosocial review are topics for medical discussion, **not evidence of Saipan clinic screening**.
- HFEA UK: written consent and storage are critical considerations, **not local CNMI law**.
- No provider fee, resource inventory, clinic eligibility, legal-parentage outcome or timeline asserted.

## Release status
PR CI on commit 03a792e: Astro build, check:site, check:seo, check:i18n, check:mobile and check:loading passed, including generated zh-hant/family-planning route. Editorial gate failed as intended because signoff is incomplete. The current answer-first reordering still needs fresh CI. User accepted preview and requested publication. Remaining caveat: CI device checks are structural, not screenshots of a real phone.
