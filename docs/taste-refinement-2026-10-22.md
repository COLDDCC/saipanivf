# Taste consistency pass — 2026-10-22

Skill: https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/SKILL.md
References read: critique, colour, layout. Existing direction retained: uneven photographs, seed 1688054565, coastal blue, established typography. Component-level refinement, so no new draw or section restructuring. No images or medical claims added.

Inventory/argument remain in taste-redesign.md. The live elements remain the topic finder, rotating photographic hero, itemised calculator and consultation draft. Blue remains the established brand palette.

## ROUND 1
Seen in one second: Saipan treatment title and dominant photograph; blue actions.
Idea (one sentence): Garapan location and named care team anchor a coastal photographic patient guide.
Live thing: select treatment information, estimate costs, prepare a consultation draft.
Layout words by section: hero=split / treatment=offset photographs / clinic=photo-address / team=stepped portraits / budget=split / guides=feature-list / FAQ=disclosure / contact=two-column / footer=wordmark.
Scores: not assigned without the required three-width screenshots.
Caps applied: no full Taste gate or mobile/tablet visual-compliance claim.
Top three problems:
1. Consultation title uses 54px; French spans three lines at the observed 1348px desktop viewport. Use the same calmer 30–42px heading scale as the rest of the site, retaining all text.
2. Form inputs still compute to the previous green-tinted background rgb(245,248,246), despite the blue site palette. Centralise palette roles and use pale-blue field/surface/rule colours.
3. Recent detail modules reintroduce small labels and decorative rules; a malformed shared table selector also does not apply. Remove redundant heading labels, use filled surfaces/space for non-table information, and correct the selector. Keep real field/table boundaries and focus states.

## Changes
- Existing blue colours now have one root definition in site.css; secondary ink, form field, rule and inverse-text tokens share the same palette.
- Shared table selector corrected from an invalid concatenation to tbody th.
- Consultation title scaled to 30–42px; redundant brand eyebrow removed; optional fields use a filled blue surface. Mobile form order and all form actions retained.
- Related childbirth section, medical source notes and preservation scope use matching surfaces. No stock images replaced, no image filters added.
- Decorative dividers removed from FAQ directory and mobile cost rows. Desktop data tables and field borders retain their functional conventions.

## Validation and limits
- Taste source lint on the eight changed files: 0 FAIL, 0 WARN.
- Full project build and regression suite passed: 184 language routes, images, SEO, budget, carousel, consultation, journey and engagement, plus 32 actual treatment CTAs and 16 guide pages.
- Whole-src lint was also reviewed; pre-existing guide/journey index numbering, team divider and the allowed floating language-menu shadow are outside this bounded consistency pass. The whole site is not claimed to have passed the Taste source gate.
- Browser desktop measurements before change: header 98.5px, carousel 524px, all eight contact variants without horizontal overflow; French consultation heading three lines, the other seven two lines.
- Live before/after screenshots and computed-style checks are performed through the supported browser. The standalone inspector is not run because the available browser does not expose its required 1440/768/390 viewport controls. Scores and full mobile/tablet certification are withheld.

## ROUND 2 — deployed desktop review
Seen in one second: lagoon photograph with the Saipan IVF title; the original split composition survives.
Idea (one sentence): unchanged coastal photographic patient guide, grounded in Garapan location and named care team.
Live thing: English egg-freezing budget recalculates to $12,800–17,800; French consultation generates a clearly marked NON ENVOYÉ draft. No email sent.
Layout words by section: unchanged from round 1.
Scores: withheld; phone/tablet widths unavailable.
Caps applied: incomplete three-width inspector; no full compliance score.
Top three remaining limits:
1. Phone/tablet composition requires the unavailable 390/768px screenshots; CSS checks are not a substitute.
2. Pre-existing guide/journey decorative numbering is outside this pass.
3. Full-page photographic/art-direction scoring is not claimed from core-page desktop checks alone.

Measured after complete page load at 1348px: all eight contact fields use rgb(241,246,252), with 42px consultation titles spanning at most two lines; French improved from three to two. All eight form cards retain 635.23px desktop width. All 24 core routes have no horizontal overflow. All home carousels retain 524px height, blue rgb(23,59,96) ink and visible newborn logos. The header/hero structure, image source parity and routes remain intact. Cloudflare code deployment succeeded at 91b65cc55922bb5d153af9868c2e9ad11843ee4f.
