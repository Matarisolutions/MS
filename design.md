# Matari Solutions — Design Specification

This document is the single source of truth for Matari Solutions LLC's brand and
visual style. It exists so that humans **and AI tools** (Claude, ChatGPT, image
generators, etc.) can produce on-brand copy, layouts, components, and imagery
without guessing.

> **For AI assistants:** Treat the tokens below as authoritative. When generating
> UI, copy, or imagery for this site, use these exact colors, fonts, spacing, and
> voice. The live design tokens are defined as CSS custom properties in
> `src/assets/css/style.css` (theme defaults) and overridden for the Matari brand
> in `src/assets/css/custom.css`. If this document and the CSS disagree, the CSS
> `:root` in `custom.css` wins for brand colors.

---

## 1. Brand identity

- **Name:** Matari Solutions LLC
- **Sector:** Mission-driven government contracting (federal, state & local agencies)
- **Positioning:** Accountable, transparent, and innovative solutions that help
  agencies achieve mission success.
- **Tagline:** _Mission-Driven Solutions_
- **Core values — the MATARI acronym** (use these as the value pillars everywhere):
  | Value              | Meaning                                                   |
  | ------------------ | --------------------------------------------------------- |
  | **M**ission-Driven | Focused on agency objectives and measurable outcomes      |
  | **A**ccountable    | Compliance, responsibility, performance excellence        |
  | **T**ransparent    | Clear communication and defensible processes              |
  | **A**daptive       | Flexible solutions aligned with evolving needs            |
  | **R**eliable       | Consistent delivery and dependable performance            |
  | **I**nnovative     | Integrated solutions that modernize government operations |

---

## 2. Color palette

### Brand colors (Matari overrides — use these first)

| Token            | Hex       | Role                                                                                                                                    |
| ---------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `--theme-color`  | `#3FDED9` | **Primary accent** — teal. Links, icons, eyebrow labels, highlights, the light end of gradients. Must stay legible on dark backgrounds. |
| `--theme-color2` | `#173460` | **Secondary / gradient partner** — deep navy. The dark end of gradients.                                                                |

**Signature gradient:** navy → teal, `linear-gradient(90deg, #173460 0%, #3FDED9 100%)`.
Used on primary buttons, card borders, and brand accents. Never invert so that
navy sits on top of dark UI text.

### Surface & neutral tokens (inherited from the theme)

| Token                  | Hex       | Role                              |
| ---------------------- | --------- | --------------------------------- |
| `--ot-body-background` | `#000916` | Page background (near-black navy) |
| `--smoke-color`        | `#00172F` | Dark section background           |
| `--black-color2`       | `#080E1C` | Card / raised surface on dark     |
| `--title-color`        | `#FFFFFF` | Headings on dark                  |
| `--body-color`         | `#A9A9A9` | Body text on dark                 |
| `--white-color`        | `#FFFFFF` | Button text, logos on dark        |
| `--light-color`        | `#8D96AD` | Muted/secondary text              |

### Status & data-viz accents

| Token             | Hex       | Use                  |
| ----------------- | --------- | -------------------- |
| `--success-color` | `#069845` | Success / positive   |
| `--error-color`   | `#DC3545` | Errors / validation  |
| `--yellow-color`  | `#FC800A` | Warnings / attention |

Multi-color stat counters and category icons may use the theme's accent set
(`#069845`, `#F0A230`, `#E0009B`, `#8F54FF`, `#3C72FC`) for variety — but the
**primary brand gradient is always navy→teal**.

**Contrast rule:** the site is dark-first. Body text `#A9A9A9` and headings
`#FFFFFF` sit on the near-black navy background. Teal `#3FDED9` is the accent;
do not use navy `#173460` for text on dark surfaces.

---

## 3. Typography

- **Typeface (headings & body):** **Kumbh Sans** (Google Fonts, weights 100–900).
  `--title-font` and `--body-font` are both Kumbh Sans.
- **Icon font:** Font Awesome 6 Pro (`fas`, `far`, `fal`, `fab`, `fad`).
- **Headings:** white, bold (600–700), tight leading. Section headings use the
  `.sec-title` class.
- **Eyebrow / kicker:** small accent-color label above a heading (`.sub-title`).
  Always pair an eyebrow with a heading — never use it alone.
- **Body:** `#A9A9A9`, ~16px, ~1.6 line-height.

---

## 4. Layout & spacing

| Token                    | Value    | Meaning                            |
| ------------------------ | -------- | ---------------------------------- |
| `--main-container`       | `1170px` | Max content width                  |
| `--container-gutters`    | `30px`   | Gutter                             |
| `--section-space`        | `120px`  | Vertical section padding (desktop) |
| `--section-space-mobile` | `70px`   | Vertical section padding (mobile)  |
| `--section-title-space`  | `50px`   | Space below a section title        |

- Grid: Bootstrap 5 (12-col). Sections alternate dark surfaces.
- Use `.space` (top+bottom padding) for standalone sections; `.space-bottom`
  only when the preceding section already provides top separation.

---

## 5. Components

- **Primary button (`.ot-btn`):** pill (border-radius 50px), white text, navy→teal
  animated gradient background, arrow icon on the right (`fa-long-arrow-right`).
- **Outline button (`.ot-btn.style-border`):** transparent with a teal gradient border.
- **Cards (`.service-card`):** rounded (24px) dark surface, teal icon, gradient hover
  border, "Read More" gradient text link.
- **Counters (`.counter-card`):** large number + label; number animates up on scroll.
- **Sliders:** Swiper (`.ot-slider`) for brand/agency logo strips.
- **Motion:** scroll-in reveals via `data-cue="slideInUp"` (scrollCue.js). Keep
  animations subtle; content must be fully readable once revealed.

---

## 6. Logo

| File                                   | Use                                                |
| -------------------------------------- | -------------------------------------------------- |
| `src/assets/img/logo-matari.png`       | Primary logo (teal), header / mobile / side panel  |
| `src/assets/img/logo-matari-white.png` | All-white variant, footer (displayed ~20% smaller) |

- Header logo max-height **44px**; footer logo max-height **35px**.
- Keep clear space around the mark; never stretch or recolor outside the palette.

---

## 7. Imagery

- **Tone:** photorealistic, professional, trustworthy; federal / government-contracting
  context. Diverse professionals in business attire, modern offices.
- **Color grade:** cool — deep navy with teal/cyan accents to match the palette.
- **Cutouts** (figures over animated/rippled sections): transparent-background PNGs.
- **Backgrounds** (page banners): dark, low-contrast, no bright center (light heading
  text sits on top). No text, no logos, no flags baked into imagery.
- Agency seals shown in uniform square cells in the "Agencies We Serve" strip.

---

## 8. Voice & tone

- **Confident, plain, outcome-focused.** Lead with the agency's mission and
  measurable results, not jargon.
- Emphasize accountability, transparency, compliance, and reliability.
- Sentence case for UI labels; Title Case for page/section headings.
- Avoid hype; prefer concrete capability statements
  (e.g. "compliant, competitive pricing strategies").

---

## 9. How AI tools should apply this

1. Pull colors, fonts, and spacing from the tokens above (or the CSS `:root`).
2. Reuse existing theme component classes (`.ot-btn`, `.service-card`,
   `.sub-title` + `.sec-title`, `.counter-card`) rather than inventing markup.
3. Put brand tweaks in `src/assets/css/custom.css`; never edit the vendor
   `src/assets/css/style.css`.
4. Match the imagery prompts in §7 when generating photos/illustrations.
5. Keep the dark-first, navy→teal aesthetic and the MATARI value framing.
