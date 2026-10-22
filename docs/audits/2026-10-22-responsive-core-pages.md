# Responsive core-page improvements — 2026-10-22

Scope: homepage, fees and contact across the existing eight languages. Shared blue palette and image sources retained.

## Changes
- Shared navigation switches to its existing expandable menu at 1100px rather than waiting until 800px. The brand can shrink, subtitles can truncate, and controls retain touch targets. No-JavaScript navigation fallback follows the same breakpoint.
- On narrow homepages, long headings and buttons can wrap, the hero controls use full-width two-column labels with a separate playback row, and playback buttons have 44px targets. Typography is more compact. The overlapping slide grid is retained to avoid changing carousel height on every automatic transition.
- Contact form is first in DOM and in the single-column mobile layout. Desktop retains explanatory text on the left and form on the right. All guidance, optional details, draft-only notice and privacy information remain.
- A shared itemised budget component renders desktop tables and narrow-screen definition lists from identical rows. Mobile lists contain every item, amount and scope note, without requiring horizontal scrolling. Eight variants retain all 11 items.
- Narrow-screen calculator padding and output sizing leave more room for amounts; treatment selector and buttons fit the content width.

## Checks
- `npm run verify` passed the build and all existing regression checks.
- `npm run check:mobile` passed all eight variants: every mobile cost row matches desktop; contact form precedes explanatory content; one required field and browser zoom remain available.
- `git diff --check` passed.

## Verification limit
The current cloud-browser surface does not expose viewport resizing. A browser zoom attempt did not change its CSS viewport (1348px). No local-file workaround was attempted. Therefore these structural/CSS checks are not a 320/375/390px screenshot test or physical-device certification. Live desktop visual and functional checks are performed after deployment.

## Follow-up: actual consultation entry paths
Following the live Simplified Chinese treatment CTA exposed a real gap: it passed a translated treatment title instead of a stable slug. The form prefilled correctly, but switching language lost the project. The matching Chinese guide CTAs had the same issue.

Treatment and guide CTAs now use stable slugs. Language switching also recognises previous Chinese links and follows subsequent manual project changes, including clearing the selection. It carries only an allowlisted project; personal query parameters are excluded.

The responsive-content check now validates all 32 treatment CTAs and 16 relevant guide pages, plus legacy URLs, changed/cleared selections and ignored unknown/personal parameters. Full build/regression checks pass. This is a user-path/functional verification; physical mobile/browser viewport QA remains pending.
