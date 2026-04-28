# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server at localhost:4321
npm run build     # Build to ./dist/
npm run preview   # Preview production build
npm run astro     # Astro CLI (astro check, astro add, etc.)
```

No test suite configured. Use `npm run astro check` for TypeScript diagnostics.

## Architecture

**Astro 5 SSG landing page** for One Out Solutions — a Costa Rica software company. Zero JS by default; React used only as islands.

### Pages
- `src/pages/index.astro` — single-page landing (all sections rendered here, GSAP animations defined here)
- `src/pages/proyecto/[slug].astro` — static project detail pages generated from `src/data/proyectos.json`

### Component layers
- `src/components/sections/` — Astro sections (Hero, Nosotros, Servicios, Proceso, Proyectos, Contacto)
- `src/components/layout/` — Navbar.astro (server), NavbarMobile.tsx (`client:load`), Footer.astro
- `src/components/common/` — Button.astro, Badge.astro (reusable primitives)
- `src/components/ui/` — React UI components (ImageAutoSlider `client:visible`, Radar)
- `src/components/sections/ContactoForm.tsx` — 3-step React form island (`client:visible`)

### Data
All content is driven by JSON in `src/data/`: `servicios.json`, `proceso.json`, `planes.json`, `proyectos.json`.

### Layout
`src/layouts/Layout.astro` — wraps every page. Includes: SEO meta + OG tags, JSON-LD Organization schema, Clarity analytics, Lenis smooth scroll, GSAP + ScrollTrigger global setup, ClientRouter (view transitions), scroll-to-top button.

**GSAP + Lenis pattern:** must be registered inside `astro:page-load` event and cleaned up on `astro:before-preparation` (for view transitions compatibility). See Layout.astro.

## Key Constraints

**Fonts:** Always use `@fontsource-variable/outfit` (npm). Never `<link>` to Google Fonts.

**React islands:** Only use `client:load` or `client:visible`. Never `client:only`.

**TypeScript:** No `any`. All component props typed.

**Forms:** react-hook-form + Zod + `@hookform/resolvers`. Inline validation feedback — never `alert()`.

## Design System

Defined in `src/styles/global.css` as Tailwind v4 `@theme` tokens:

| Token | Value | Use |
|---|---|---|
| `orange` | `#DB6923` | CTAs, accents, brand |
| `black` | `#000000` | Base background |
| `surface` | `#0D0D0D` | Section backgrounds |
| `white` | `#F5F5F5` | Text on dark |
| `muted` / `silver` | `#888888` / `#A1A4A5` | Secondary text |
| `border` | `rgba(214,235,253,0.19)` | Frost borders |
| `success` | `#2D9E6B` | — |
| `error` | `#D64045` | — |

Cyan (`#24BAEF`) exists but is used sparingly — hovers only, never dominant.

**Typography:** `font-display` + `font-body` → Outfit Variable. Headers use `tracking-[-0.05em]` (aggressive editorial).

**Reusable CSS classes** (defined in `@layer components`): `.frost-card`, `.pill-cta`, `.pill-cta-primary`, `.pill-cta-secondary`, `.noise`, `.text-white-glow`, `.text-orange-glow`.

## Aesthetic Principles

Technological, editorial, aggressive. Orange-dominant, deep black, asymmetric layouts, oversized bold typography. Card hover → orange border. Cyan strictly for hover accents. Animations via GSAP ScrollTrigger with stagger. Target Lighthouse > 95.
