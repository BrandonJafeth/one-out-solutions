---
name: animations
description: Standard GSAP setups, scroll animation, and staggered reveal flows.
---

# SKILL: Animations with GSAP

## Setup
```bash
npm install gsap
```

```typescript
// Layout.astro client:load
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Defaults
gsap.defaults({ duration: 0.4, ease: "power2.out" });
```

## Core Rules
- **Purpose over polish** — animations serve UX
- **Timing:** interactions 100-200ms, reveals 300-600ms
- **Performance:** use transforms, not layout props
- **Accessibility:** honor `prefers-reduced-motion`
- **Control:** store tween/timeline for play/pause/reverse

## Button Hover (Interaction)
```javascript
gsap.to(".btn", {
  duration: 0.15,
  overwrite: "auto",
  onMouseEnter() { gsap.to(this, { y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }); },
  onMouseLeave() { gsap.to(this, { y: 0, boxShadow: "none" }); }
});
```

## Scroll Reveal (ScrollTrigger)
```javascript
gsap.utils.toArray("[data-scroll-reveal]").forEach((el) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
      markers: false
    },
    duration: 0.6,
    y: 24,
    opacity: 0,
    ease: "power2.out"
  });
});
```

## Stagger on Scroll
```javascript
gsap.to(".card", {
  scrollTrigger: {
    trigger: ".cards-container",
    start: "top 70%"
  },
  duration: 0.5,
  y: 0,
  opacity: 1,
  stagger: { amount: 0.3, from: "start" }
});
```

## Page Transitions
```astro
// Layout.astro
import { ViewTransitions } from 'astro:transitions';
// Use Astro's ViewTransitions for page-level animations
```

## Responsive + Accessibility
```javascript
gsap.matchMedia().add(
  {
    isMobile: "(max-width: 768px)",
    reduceMotion: "(prefers-reduced-motion: reduce)"
  },
  (context) => {
    const { isMobile, reduceMotion } = context.conditions;
    gsap.to(".hero", {
      y: isMobile ? 20 : 0,
      duration: reduceMotion ? 0 : 0.8
    });
  }
);
```

## Tween Control
```javascript
const tween = gsap.to(".el", { x: 100, duration: 1 });
tween.pause();
tween.play();
tween.reverse();
tween.kill();
```

## Best Practices ✅
- Use `scrollTrigger` for scroll-driven animation (not Intersection Observer)
- Store tweens for playback control
- Use `gsap.matchMedia()` for responsive + prefers-reduced-motion
- Prefer transforms (x, y, scale, rotation) over layout (width, height, top, left)
- Use `autoAlpha` instead of `opacity` for fade in/out
- Stagger with `{ amount, from }` for orchestrated reveals

## Forbidden ❌
- Animations > 600ms without purpose
- No prefers-reduced-motion handling
- Layout animation (width, height, top, left)
- Blocking user interaction during animation
- Forgetting to register ScrollTrigger plugin
- Auto-playing animations without control

## Done ✅
- All animations have purpose
- Respect prefers-reduced-motion (matchMedia)
- Timing: interactions < 200ms, reveals < 600ms
- No layout shift (use transforms)
- ScrollTrigger setup in Layout.astro
- Stagger reveals tested
- Accessibility verified
