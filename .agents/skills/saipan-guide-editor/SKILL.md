---
name: saipan-guide-editor
description: Audit and improve Saipan IVF patient guides with evidence-first SEO, medically cautious content, clear answer-first UX, and accessible bilingual editorial design.
---
# Saipan IVF Guide Editor

## Role
Upgrade existing Saipan IVF guides to exceed comparable patient decision guides in evidence quality, answer usefulness, mobile reading experience, and accessibility. Do not measure quality by word count, number of cards, or unsupported conversion claims.

## Required context
1. Read README.md, src/data/pricing.ts, src/pages/guides.astro, existing related guides and src/layouts/SiteLayout.astro before editing.
2. Inspect the actual reference page if retrievable. If ProIVF /guides/miami-ivf-guide is inaccessible, say so; do not assert specific competitor headings, statistics, images, rankings, or layouts.
3. Look up current authoritative facts from HFEA, NHS, ASRM, CDC, CBP and official institution documents as appropriate. Record URL and checked date for material claims.
4. Inspect existing routes and translation generation: src/integrations/traditional.mjs, dynamic locale routes and the site's canonical/hreflang rules. Don't create duplicate Traditional Chinese outputs.

## Reusable workflow
1. **SERP and intent brief**: user question, relevant adjacent questions, competing answer formats, actual evidence gaps, existing-site overlap and chosen canonical URL. Prefer one useful page over multiple overlapping pages.
2. **Source ledger**: map every fee, visa/entry, clinical outcome, success rate, eligibility, time claim, and provider-specific promise to a dated primary source. Mark assumptions as assumptions. Block unsourced facts.
3. **Answer-first structure**:
   - One clear H1, concise 2–4 sentence answer immediately visible.
   - Five-second summary of what is known, what varies, and what the reader should verify.
   - Navigation anchors to fees, process, eligibility, schedule, risks, common questions, and sources where relevant.
   - Useful tables with inclusions/exclusions; annotate unit, currency, date, provider status and range methodology.
   - Concrete itinerary/checklist and decision framework; no invented timelines.
   - FAQ only where there are substantive user questions, not keyword filler.
   - At least one contextually relevant related guide and a non-coercive consultation route.
4. **Design**: first audit existing design, then use restrained editorial typography, generous but not empty whitespace, responsive comparisons/tables, correct headings, keyboard-friendly expandable disclosures and accessible contrast. Do not fork standalone HTML design systems for each article; share components and preserve site navigation/footer.
5. **Localization**: Simplified and Traditional Chinese should have region-appropriate titles and wording, not character-conversion-only when market intent differs. Audit the build's existing Traditional Chinese generator before adding a separate path. Canonicals and hreflang must resolve to pages that exist.
6. **Medical and business accuracy**: avoid guaranteed pregnancy, blanket eligibility, fixed prices, unlabeled stock photos implying clinicians/patients, invented ratings, claims about nationality-based entry rules without authoritative current evidence. Do not label site planning figures as SIVF official provider fees.
7. **SEO hygiene**: one primary intent per canonical, descriptive snippets, source visibility, related-guide linking, valid schema only for visible corresponding content; don't promise search rich results.
8. **Verification**: run npm ci and npm run verify in a suitable environment. Check built pages, mobile layout, both language versions, sitemap, internal links, accessible interactions and CI. If unavailable, report precisely as unverified. Never call a code push a live deployment.

## Review rubric (100 points)
- Answer usefulness, question coverage and clarity: 25
- Evidence quality and medical/fee/policy accuracy: 25
- Visual reading experience + mobile/a11y: 20
- Unique contribution (decision tables, examples, useful comparison): 15
- Technical SEO and correct localization: 15
Release target: at least 85/100, and **zero blocking source, indexability, or medical accuracy issues**. Scores are internal editorial checks, not external SEO metrics.

## Reference skills (optional)
- inhouseseo/superseo-skills: content-brief, improve-content, eeat-audit, semantic-gap-analysis
- Leonxlnx/taste-skill: redesign-existing-projects, minimalist-ui
- gaguero/seo-agent-skills: seo-quality-gates
External Skill descriptions are reference frameworks; don't claim installation until they are actually installed and read.

## Reporting
For each guide: existing gaps, specific competitor observations with sources, changed paths, evidence ledger, screenshots/preview if actually available, verification output, and deployment status. Prefer one truly complete guide over bulk thin content.
