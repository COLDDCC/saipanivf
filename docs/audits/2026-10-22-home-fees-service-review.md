# Homepage, fees and service clarity

Scope: approved homepage, fee presentation, service identity and SEO configuration work. The consultation form remains an email-draft generator; no intake endpoint, lead storage, email sending or Feishu integration was added.

- Shared home decision links across eight languages: costs, timing and first-visit preparation. Existing budget section now precedes treatment details; project-owner client count follows the provider/team material and explicitly distinguishes clients from clinical outcomes.
- Stable cost/enquiry links remain outside the rotating slides. Compact mobile carousel tabs retain horizontal scrolling and all playback controls. Long German team copy now fits the mobile portrait grid.
- All fee pages use `FeesExperience` and `LocalizedBudget`. Removed repetitive Chinese pricing cards/equation and foreign-language decorative fee illustrations; retained the 11 cost rows, treatment scope comparison and local payment/insurance context. Calculator precedes comparison; result comes first on small screens.
- Server-rendered totals, client calculator inputs, tables, comparisons and translated treatment-detail amounts read `src/data/pricing.ts`. Existing default scenario is preserved and described as an example, including optional ICSI. These remain planning inputs; no current provider quotation was obtained or invented.
- One `SITE_ORIGIN` setting controls Astro, canonical, Open Graph, JSON-LD, Traditional Chinese conversion, sitemap and generated robots. Default hosting origin is unchanged. Invalid non-HTTPS or path-bearing origins fail configuration.
- Regenerated heading font subsets and verified integrity and glyph coverage.

Validation: `npm run verify` covers 184 language routes and all existing checks. A separate `SITE_ORIGIN=https://domain-check.example` build passed SEO and i18n checks; the final build was restored to the configured default origin. Browser validation covers eight languages × home/fees × 320/390/1440 widths, no page overflow or runtime errors, persistent first-screen actions, and real IVF/egg/FET switching. Visual review of Chinese desktop/mobile home and mobile fees completed. Live deployment status is separate from these local checks.
