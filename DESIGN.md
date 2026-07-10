---
name: Mithun Rathinasamy Personal Website
description: A precise, quietly inventive portfolio for the founder of Chevvi.
colors:
  paper: "#ffffff"
  deep-ink: "#0a1a24"
  slate: "#68777f"
  sea-glass-line: "#c9ddda"
  fog: "#eef2f3"
  navy-soft: "#142832"
  coral-signal: "#ff5a4f"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(3.625rem, 5.55vw, 5rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.055em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.625rem, 3.9vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.07
    letterSpacing: "-0.045em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.38
    letterSpacing: "0.12em"
rounded:
  focus: "4px"
  device-inner: "14px"
  device-outer: "26px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  section: "64px"
components:
  theme-button:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.deep-ink}"
    rounded: "999px"
    width: "40px"
    height: "40px"
  project-screen:
    backgroundColor: "{colors.deep-ink}"
    rounded: "{rounded.device-outer}"
    padding: "12px"
---

# Design System: Mithun Rathinasamy Personal Website

## 1. Overview

**Creative North Star: "The Signal Field"**

The site pairs Swiss-like precision with one live technical surface: a restrained topographic shader in the hero. It should feel like a capable builder's workspace translated into a public identity, not a product template or an effects showcase. Light and dark modes are equally authored.

The system rejects generic SaaS gradients, glass cards, ornamental hardware mockups, novelty cursor effects, generic unlabeled switches, and cropped product screenshots.

**Key Characteristics:**

- Large, tightly tracked sans-serif statements.
- Tinted neutral surfaces with deep teal-black structure.
- A single coral status signal used sparingly.
- Flat hierarchy through tone, rules, and spacing.
- One bounded shader field with an accessible static fallback.

## 2. Colors

The palette is cool, architectural, and nearly monochrome, with coral reserved for a small human signal.

### Primary

- **Deep Ink** (#0a1a24): Primary text, dark surfaces, hardware surrounds, and dark-mode canvas.
- **Coral Signal** (#ff5a4f): Location status and keyboard focus only.

### Neutral

- **Paper** (#ffffff): Light-mode page and text on dark surfaces.
- **Slate** (#68777f): Secondary copy in light mode.
- **Sea-glass Line** (#c9ddda): Dividers and quiet structure.
- **Fog** (#eef2f3): Secondary light surfaces.
- **Navy Soft** (#142832): Secondary dark surfaces.

**The Signal Rule.** Coral remains below ten percent of any viewport; its rarity makes it meaningful.

## 3. Typography

**Display Font:** Inter (with system-ui fallback)
**Body Font:** Inter (with system-ui fallback)

**Character:** A single practical sans family becomes distinctive through confident scale, tight display tracking, and disciplined line lengths.

### Hierarchy

- **Display** (500, clamp(58px, 5.55vw, 80px), 1.05): Hero statement only.
- **Headline** (500, clamp(42px, 3.9vw, 56px), 1.07): Project and experience headings.
- **Title** (500, 22px, 1.27): Product links and compact statements.
- **Body** (400, 18px, 1.55): Descriptions capped near 70 characters.
- **Label** (600, 13px, 0.12em, uppercase): Short section identifiers only.

**The One-Voice Rule.** Use scale and spacing within Inter before introducing another font family.

## 4. Elevation

The site is flat by default. Depth comes from tonal contrast, borders, and media framing rather than ambient shadows. Focus rings are functional, not decorative.

**The Flat-by-Default Rule.** Do not add a shadow unless it communicates a real interaction or physical edge.

## 5. Components

### Buttons

- **Shape:** Circular theme control (40px) with a single explicit sun or moon glyph.
- **Primary:** Transparent or tonal background with Deep Ink/Paper glyphs.
- **Hover / Focus:** Short exponential rotation/scale transition and a Coral Signal focus outline.

### Cards / Containers

- **Corner Style:** Square editorial panels by default; radii are reserved for actual device screens.
- **Background:** Fog in light mode and Navy Soft in dark mode.
- **Shadow Strategy:** None at rest.
- **Border:** One-pixel Sea-glass Line where separation is necessary.
- **Internal Padding:** 24px to 26px.

### Navigation

Compact medium-weight links use real external-link icons. Desktop keeps the full set; mobile prioritizes product destinations and the theme button.

### Product Screen

The Owlish image uses its native aspect ratio and `object-fit: contain`; no product content may be cropped. The surrounding dark screen edge is thin and secondary to the screenshot.

### Hero Signal Field

A WebGL topographic field sits behind the hero copy. It reacts gently to pointer position, pauses off-screen, caps device pixel ratio, follows the active theme, and becomes a static field under reduced motion.

## 6. Do's and Don'ts

### Do:

- **Do** preserve the native aspect ratio of every product screenshot.
- **Do** use the Coral Signal (#ff5a4f) only for status and focus.
- **Do** keep motion isolated to the hero and theme-state feedback.
- **Do** preserve complete keyboard operation and reduced-motion behavior.
- **Do** author both light and dark shader palettes rather than inverting one.

### Don't:

- **Don't** use generic SaaS landing-page gradients or glassmorphism.
- **Don't** use ornamental device mockups or crop product screenshots.
- **Don't** use novelty cursor effects or motion scattered across every section.
- **Don't** use a generic unlabeled switch for theme selection.
- **Don't** add decorative shadows, gradient text, or colored side stripes.
