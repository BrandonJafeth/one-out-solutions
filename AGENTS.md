# AGENTS.MD — Landing Page One Out Solutions
## Stack: Astro 5 · Skill: frontend-design

> Lee este documento completo antes de generar código. Aplica el skill `frontend-design`:
> dirección estética BOLD, ejecución precisa, cero patrones genéricos de IA.
> Estética objetivo: **tecnológica, editorial, agresiva** — fiel a One Out Solutions.

---

## 🎨 Identidad Visual

### Paleta
```css
:root {
  --orange:   #DB6923;  /* Naranja marca — CTAs, hero, acentos */
  --cyan:     #24BAEF;  /* Cyan eléctrico — acentos secundarios, hovers */
  --black:    #0D0D0D;  /* Fondo base oscuro */
  --surface:  #1A1A1A;  /* Cards, secciones alternas */
  --white:    #F5F5F5;  /* Texto sobre oscuro, fondos claros */
  --muted:    #888888;  /* Texto secundario */
  --border:   #2A2A2A;
  --success:  #2D9E6B;
  --error:    #D64045;
}
```

### Tipografía — Fontsource (npm, sin Google Fonts)
```bash
npm install @fontsource-variable/outfit
```

```typescript
// Layout.astro — importar en frontmatter
import '@fontsource-variable/outfit';
```

```css
:root {
  --font-display: 'Outfit Variable', sans-serif;
  --font-body:    'Outfit Variable', sans-serif;
}
```

> **Regla absoluta**: NUNCA `<link>` a Google Fonts. Todo via `@fontsource` (npm) → servido local.

### Color por Elemento
| Elemento | BG | Texto | Nota |
|---|---|---|---|
| Navbar | `#0D0D0D` | `#F5F5F5` | CTA "Iniciar Cotización" en `#DB6923` |
| Hero | `#0D0D0D` o imagen + overlay | `#F5F5F5` | H1 bold oversized |
| Sección clara | `#F5F5F5` | `#0D0D0D` | Alternar con oscuras |
| Cards | `#1A1A1A` | `#F5F5F5` | Hover: borde naranja |
| CTA primario | `#DB6923` | `#F5F5F5` | Hover: fill negro + borde naranja |
| CTA outline | `transparent` | `#DB6923` | Hover: fill naranja |
| Hover acento | `#24BAEF` | `#0D0D0D` | Usar con moderación |
| Footer | `#0D0D0D` | `#888888` | — |

---

## 🛠 Stack

| Capa | Tech |
|---|---|
| Framework | Astro 5.x (SSG, 0kb JS default) |
| Lenguaje | TypeScript (sin `any`) |
| Estilos | Tailwind CSS v4 + CSS variables |
| Interactividad | React 19 (solo Islas, nunca `client:only`) |
| Iconos | Lucide React |
| Animaciones | GSAP — timeline sequencing, scroll-triggered, performant |
| Fuentes | Fontsource npm (sin Google Fonts) |
| Datos | JSON estáticos en `src/data/` |

---

## 📁 Estructura

```
src/
├── components/
│   ├── common/       # Button.astro, Badge.astro, SectionTitle.astro
│   ├── layout/       # Navbar.astro · NavbarMobile.tsx (client:load) · Footer.astro
│   └── sections/
│       ├── Hero.astro
│       ├── Nosotros.astro
│       ├── Servicios.astro
│       ├── Proceso.astro
│       ├── Planes.astro
│       └── Contacto.tsx          # Isla React (client:visible) — formulario
├── data/
│   ├── servicios.json            # Lista de servicios/soluciones
│   ├── proceso.json              # Pasos del proceso de trabajo
│   └── planes.json               # Planes y precios
├── layouts/
│   └── Layout.astro              # Head + SEO + ViewTransitions + fuentes
├── pages/
│   └── index.astro               # Landing one-page (todas las secciones)
└── utils/
    └── formatPrice.ts
```

---

## 📄 Secciones (one-page en `index.astro`)

La landing es una **single page** con scroll. El navbar enlaza a anchors (`#nosotros`, `#servicios`, etc.).

### Navbar
- Links: Nosotros · Servicios · Proceso · Planes · Contacto
- CTA derecha: **"Iniciar Cotización"** — botón sólido naranja `#DB6923`
- Sticky, fondo `#0D0D0D`, menú hamburguesa en móvil (React `client:load`)

### Hero (`#hero`)
- H1 con propuesta de valor + keyword SEO
- Subtítulo descriptivo
- CTA primario "Iniciar Cotización" → `#contacto`
- CTA outline "Ver Servicios" → `#servicios`
- Fondo oscuro con elemento visual (imagen, gradiente o patrón geométrico)

### Nosotros (`#nosotros`)
- Quiénes somos, misión y valores
- Stats del equipo (años de experiencia, proyectos, clientes)
- Datos desde `src/data/` o hardcodeados en el componente

### Servicios (`#servicios`)
- Grid de cards de soluciones tecnológicas
- Datos desde `servicios.json`
- Cada card: ícono (Lucide), nombre, descripción corta

### Proceso (`#proceso`)
- Pasos del flujo de trabajo (timeline o stepper visual)
- Datos desde `proceso.json`
- Numerado, con ícono y descripción por paso

### Planes (`#planes`)
- Cards de precios/paquetes
- Datos desde `planes.json`
- Cada card: nombre, precio, lista de features, CTA "Elegir plan" → `#contacto`
- Destacar el plan recomendado visualmente

### Contacto (`#contacto`)
- Formulario React (`client:visible`): `name`*, `email`*, `company`, `message`*
- Validación Zod, feedback inline (nunca `alert()`)
- Envío via `fetch` a Formspree o Resend
- CTA label: **"Iniciar Cotización"**

### Footer
- Logo, links de sección, redes sociales, copyright

---

## ⚡ Animaciones & Performance

```astro
<!-- Layout.astro — navegación sin recarga -->
import { ClientRouter } from 'astro:transitions';
```

```typescript
// Scroll reveal — Motion One
import { animate, inView } from 'motion';
inView('.card, .step, .plan', ({ target }) => {
  animate(target, { opacity: [0, 1], y: [24, 0] }, { duration: 0.4 });
});
```

- `<Image />` de Astro obligatorio (genera WebP/AVIF).
- Target Lighthouse > 95 en Performance, Accessibility y SEO.

---

## ⚡ Animaciones (GSAP)

**Setup:**
```bash
npm install gsap
```

**En Layout.astro** (client:load):
```typescript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
```

**Patterns:**
- Scroll reveal: `ScrollTrigger` con stagger
- Button hover: `gsap.to()` 150ms
- Page transitions: `ViewTransitions` de Astro
- Responsive: `gsap.matchMedia()` con `prefers-reduced-motion`

---

## 🚀 SEO

- `title`, `description`, `canonical`, Open Graph en `Layout.astro`.
- JSON-LD tipo `Organization` en el `<head>`.
- H1 único por página con keyword local.
- Keywords: "Desarrollo de software Costa Rica", "Sistemas a medida Guanacaste", "Soluciones tecnológicas empresariales".

---

## 🎯 Principios de Diseño (frontend-design skill)

1. **Estética**: tecnológica editorial agresiva. Naranja dominante, negro profundo, asimetría, tipografía bold oversized. Sin patrones genéricos.
2. **Tipografía protagonista**: H1 gigante, tracking ajustado. Hitalica via Fontsource.
3. **Color con intención**: `#DB6923` es el alma. `#24BAEF` solo en hovers — nunca dominante.
4. **Movimiento**: Staggered reveals via GSAP ScrollTrigger. Cards y pasos con scroll reveal.
5. **Grid-breaking**: Hero y sección Proceso con layouts que rompen el grid estándar.
6. **Mobile First**: Drawer deslizable en móvil. Planes apilados verticalmente.
7. **Accesibilidad**: Contraste ≥ 4.5:1, HTML semántico, `label` en inputs, `alt` en imágenes.

---

## ✅ Checklist

- [ ] Fuentes via Fontsource (npm) — sin Google Fonts
- [ ] CSS variables de paleta en estilo global
- [ ] Navbar sticky con CTA "Iniciar Cotización" + menú móvil
- [ ] Hero con H1 + 2 CTAs
- [ ] Sección Nosotros con stats
- [ ] Sección Servicios desde `servicios.json`
- [ ] Sección Proceso (timeline/stepper) desde `proceso.json`
- [ ] Sección Planes desde `planes.json` con plan destacado
- [ ] Formulario Contacto validado con feedback inline
- [ ] Footer completo
- [ ] Anchors funcionales desde navbar
- [ ] SEO completo (meta + OG + JSON-LD)
- [ ] Lighthouse > 95