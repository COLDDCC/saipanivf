---
name: saipanivf-region-localization
description: Maintain region-specific content and release checks for Saipan IVF's eight locales, especially Taiwan zh-TW.
---
# Saipan IVF regional localization

Inspired by the review and glossary workflow in [localize-anything](https://github.com/xueyang-dev/localize-anything) and regional URL/content separation guidance in [internationalization](https://github.com/rampstackco/claude-skills/tree/main/skills/internationalization). This is a project-specific workflow, not a claim that either external CLI has been installed.

## Before editing
1. Read `src/data/taiwan-region.mjs`, `src/integrations/traditional.mjs`, `docs/taiwan-localization.md` and `scripts/check-p0-source.mjs`.
2. Inventory affected routes, locale copies and the official primary source for every entry, medical, nationality, residency or price claim.
3. Classify changes as shared interface, translated prose or **region-specific factual advice**. Never generate the third class by simple Chinese-character conversion.
4. Follow the locked terminology and language-service distinctions in the Taiwan localization guide.
5. Never promise medical outcomes, immigration admission, confirmed interpreter availability or card acceptance without verifiable evidence.

## Implementation
- Prefer `taiwanGuide` as the shared source for Taiwan-only claims; do not duplicate normative facts across multiple source files.
- Keep `/zh-hant/` paths, locale switcher, self canonicals, reciprocal hreflang, sitemap and layout intact.
- If a source-language phrase must be replaced during a transitional build, require a verifiable match or a scoped, explicit exemption. Plan to eliminate exact-match rewriting progressively.
- Never edit an immigration rule without recording the official source, review date and reviewer/verification status.

## Release gate
1. `npm run verify` must pass.
2. `node scripts/check-taiwan-localization.mjs` runs against generated HTML and fails for obvious cross-region leakage.
3. Review rendered contact, fees, FAQ, travel checklist and service-scope pages in desktop/mobile; check that no visual, functional, SEO or localization regressions are introduced.
4. Obtain independent language review for high-risk changed claims; request human confirmation for material ambiguity. Mechanical checks are *not* legal or medical verification.
5. PR notes must include changed paths, sources checked, review limitations and test results.
