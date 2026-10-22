# Performance measurement — 2026-10-22

Lighthouse 12 against the live https://saipanivf.pages.dev, mobile emulation
(Lighthouse default Moto G Power profile), Microsoft Edge headless. This fills
the gap recorded in docs/typography-and-loading-2026-10-22.md: no measured
Lighthouse/LCP/CLS results had been claimed before.

| Page | Score | FCP | LCP | CLS | TBT | Speed Index |
|---|---|---|---|---|---|---|
| / (en home) | 99 | 1.6 s | 1.6 s | 0 | 40 ms | 2.1 s |
| /ja/ (CJK home, heaviest fonts) | 95 | 1.5 s | 1.6 s | 0.009 | 80 ms | 5.1 s |
| /fees/ (heaviest content page) | 93 | 2.0 s | 2.1 s | 0 | 110 ms | 5.0 s |

All three pages pass Core Web Vitals thresholds on mobile: LCP under 2.5 s,
CLS under 0.1, TBT under 200 ms. The self-hosted font subsets and the preload
work introduced 2026-10-22 did not regress measured performance.

Caveats: single-run synthetic results from one network location through a
proxy; field data (real user CrUX) is not available for this domain yet —
Cloudflare Web Analytics is the planned follow-up for real-user observation.
