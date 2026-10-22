# Language quality audit — 2026-10-22

Scope: 8 language variants, 23 routes each (184 pages). No languages added.

## Corrected
- Japanese and Korean entry FAQs now address the relevant passport holders, VWP/ESTA eligibility, medical travel and 90-day maximum, with nationality distinguished from residence. Removed the irrelevant PRC-only EVS-TAP description and portal; official US State Department VWP and visitor sources retained.
- Traditional Chinese Taiwan travel answer now cites VWP/ESTA instead of the PRC-only travel-authorisation portal.
- Japanese and Korean travel checklists and consultation templates now cover passport eligibility and confirmation of clinical/interpreting languages. A translated website does not establish availability of clinicians speaking that language.
- Spanish USD amounts now use consistent thousands separators and explicit USD in the calculator, comparison, illustrations and treatment prices. French/German/Spanish itemised ranges display the currency once. Values and treatment assumptions unchanged; no exchange-rate conversion.
- Language switching on contact pages preserves only an allowlisted treatment topic. Personal details and arbitrary query parameters are not copied.

## Validation
- Full `npm run verify`: build, budget, hero, site, images, SEO, FAQ, internationalisation, consultation, journey and engagement checks.
- Dictionary coverage: Japanese/Korean/Spanish/German/French have all English dictionary leaf keys, no empty values and no identical English strings longer than 35 characters. This catches omissions, not every linguistic error.
- Existing checks cover all 184 routes, active language, 9 hreflang entries and equivalent image sources/order on 161 translated routes.
- French live consultation draft generated successfully; explicitly marked not sent. No email sent.

## Limits
- Not a native-speaker certification or clinical/legal sign-off.
- Dedicated 390px iframe harness could not be opened because cloud-browser security blocks file URLs. Mobile visual QA is not claimed complete. Static responsive rules and functional checks do not substitute for device testing.
