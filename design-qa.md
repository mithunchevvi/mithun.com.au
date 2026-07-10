# Design QA

## July 10 polish revision

- Added the theme-aware WebGL Signal Field behind the hero. The field uses a capped device-pixel ratio, pauses outside the viewport, follows pointer movement, and renders a fixed frame when reduced motion is enabled.
- Replaced the generic switch with a circular sun/moon control. Browser interaction verified the icon, `aria-label`, `aria-pressed`, persisted theme, theme color, and shader palette all update together.
- Removed the 16:10 screenshot crop. The Owlish source is now rendered at its native 144:83 ratio with `object-fit: contain`; measured desktop bounds are 1136 x 655 inside a 1160 x 679 frame, with both horizontal edges visible.
- Rechecked at 1440 x 900 and 390 x 844. The mobile document width and body width both remain exactly 390px, with no horizontal overflow.
- Browser console health: no warnings or errors in either theme or viewport.

- Source visual truth: the accepted Paper founder variation in light mode.
- Implementation: `http://127.0.0.1:4321/`
- Desktop screenshot: `tmp/qa/implementation-light-full-1440.png`
- Mobile screenshots: `tmp/qa/implementation-mobile-hero-390.png`, `tmp/qa/implementation-mobile-owlish-390.png`, `tmp/qa/implementation-mobile-mikan-390.png`
- Combined comparison: `tmp/qa/design-comparison-light.png`
- Desktop viewport: 1440 x 900
- Mobile viewport: 390 x 844
- States: light theme, dark theme, responsive mobile, theme-toggle interaction

## Full-view comparison evidence

The Paper source and final Astro render were normalized to the same 720px column width and placed side by side in `tmp/qa/design-comparison-light.png`. The composition, section order, copy, type hierarchy, content lanes, palette, device treatments, and vertical rhythm align closely. A small Codex browser inspection toolbar appears in the implementation capture at the Owlish section boundary; it is browser tooling rather than site content and is absent from production.

## Focused-region evidence

- Hero: `tmp/qa/implementation-light-hero-1440.png` and `tmp/qa/implementation-dark-hero-1440.png` verify headline wrapping, Chevvi panel alignment, navigation, and both theme palettes.
- Owlish: `tmp/qa/owlish-visible-dark.png` verifies the wide 16:10 display frame, screenshot crop, notch, border radii, and image sharpness.
- Mikan AI: `tmp/qa/mikan-visible-dark.png` verifies both complete phone screenshots and device surrounds.
- Mobile: the three 390px captures verify headline wrapping, stacked Chevvi panel, wide screenshot scaling, phone stacking, and no horizontal overflow.

## Required fidelity surfaces

- Fonts and typography: passed. Inter 400/500/600, display tracking, line heights, hierarchy, and desktop wrapping match the Paper source. Mobile scales maintain the same hierarchy without truncation.
- Spacing and layout rhythm: passed. Header, 720px hero, asymmetric project introductions, media spacing, experience rail, and compact footer follow the extracted Paper values.
- Colors and tokens: passed. Light and dark themes use the Paper navy, fog, sea-glass line, white, slate, and coral tokens with accessible contrast.
- Image quality and asset fidelity: passed. The exact Owlish and Mikan source screenshots are rendered through Astro's image pipeline. No placeholder or recreated product artwork remains.
- Copy and content: passed. Navigation, founder positioning, product copy, recognizable-company list, Chevvi reference, location, and social links match the accepted design and user decisions.

## Interaction and browser checks

- Page identity: passed (`Mithun Rathinasamy | Founder of Chevvi`).
- Meaningful content / no blank shell: passed.
- Framework error overlay: none.
- Console warnings and errors: none.
- Theme toggle: passed; changes `light` to `dark`, updates the accessible label and pressed state, and persists the choice.
- External links: passed by DOM inspection; Owlish, Mikan AI, Chevvi, LinkedIn, and GitHub resolve to the requested URLs and open in a new tab.
- Mobile overflow: passed; viewport, document, and body widths all measured 390px at the 390px breakpoint.

## Comparison history

1. Initial full-page capture showed blank lazy-loaded media below the fold. The actual images were complete when visible; QA scrolled through the page to load the responsive sources and recaptured the full implementation. Post-fix evidence shows all three real product images rendered.
2. The final normalized comparison found no actionable P0, P1, or P2 visual mismatch. Responsive scaling and true external-link icons are intentional production adaptations.

## Findings

No actionable P0, P1, or P2 findings remain.

## Follow-up polish

- P3: A bespoke favicon and social preview image could be added after launch without changing the accepted page design.

final result: passed
