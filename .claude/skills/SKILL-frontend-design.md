---
name: frontend-design
description: Design system guidelines, color palette, and general styling
---

# SKILL: Frontend Design

## Paleta (CSS Variables)
```css
:root {
  --orange: #DB6923;   --cyan: #24BAEF;    --black: #0D0D0D;   --surface: #1A1A1A;
  --white: #F5F5F5;    --muted: #888888;   --border: #2A2A2A;  --success: #2D9E6B;   --error: #D64045;
  --space-xs: 4px;   --space-sm: 8px;   --space-md: 16px;   --space-lg: 24px;   --space-xl: 32px;   --space-2xl: 48px;
  --font-display: 'Outfit Variable', sans-serif;
  --radius-md: 8px;  --radius-lg: 12px;
}
```

## Typography
| Element | Size | Weight | Line-Height | Usage |
|---------|------|--------|-------------|-------|
| H1 Hero | 96px | 700 | 1.1 | Titular principal |
| H2 Section | 64px | 700 | 1.2 | Títulos |
| H3 Card | 32px | 600 | 1.3 | Subtítulos |
| Body | 16px | 400 | 1.6 | Párrafos |
| Caption | 14px | 400 | 1.5 | Labels |

## Component Colors
| Component | BG | Text | Hover |
|-----------|----|----|-------|
| Navbar | `#0D0D0D` | `#F5F5F5` | CTA: orange |
| Hero | dark | `#F5F5F5` | — |
| Card | `#1A1A1A` | `#F5F5F5` | orange border |
| Btn Primary | `#DB6923` | `#F5F5F5` | transparent + border |
| Btn Outline | transparent | `#DB6923` | fill orange |
| Section Clear | `#F5F5F5` | `#0D0D0D` | — |
| Footer | `#0D0D0D` | `#888888` | — |

## Button Component
```css
.btn { transition: all 150ms ease-out; cursor: pointer; border-radius: 8px; font-weight: 600; }
.btn-primary { background: var(--orange); color: white; border: 2px solid var(--orange); }
.btn-primary:hover { background: transparent; color: var(--orange); }
.btn-outline { background: transparent; color: var(--orange); border: 2px solid var(--orange); }
.btn-outline:hover { background: var(--orange); color: white; }
@media (prefers-reduced-motion: reduce) { .btn { transition: none; } }
```

## Card Component
```css
.card { padding: 16px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; transition: all 300ms ease-out; }
.card:hover { border-color: var(--orange); box-shadow: 0 0 0 4px rgba(219, 105, 35, 0.05); }
```

## Contrast (WCAG AAA ✅)
- `#F5F5F5` on `#0D0D0D`: 18.7:1
- `#DB6923` on `#0D0D0D`: 5.2:1
- `#24BAEF` on `#0D0D0D`: 7.1:1
- `#888888` on `#0D0D0D`: 4.5:1

## Layout Grid
```css
.container { max-width: 1280px; margin: 0 auto; padding: 0 32px; }
.grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px; }
.grid-col-4 { grid-column: span 4; } .grid-col-6 { grid-column: span 6; }
@media (max-width: 768px) { .grid-col-4, .grid-col-6 { grid-column: span 12; } }
```

## Focus States
```css
button:focus-visible, a:focus-visible, input:focus-visible { outline: 2px solid var(--cyan); outline-offset: 2px; }
```

## Performance Targets
- Lighthouse Performance: > 95
- Lighthouse Accessibility: > 95
- Lighthouse SEO: > 95
- CLS < 0.1

## Forbidden ❌
Generic libraries · Google Fonts · Colors outside palette · No hover states · Missing focus · Inline styles · Multiple H1 per page · Decorative animations · Images without Astro `<Image />`

## Done ✅
Typography on scale · Colors from palette · Buttons are `.btn` · Cards are `.card` · Contrast WCAG AAA · Focus visible · Mobile-first · Animations < 500ms · Lighthouse > 95 · No console errors · Accessibility tested
