---
name: gsap-core
description: Core GSAP animation methods, properties, and best practices.
---

# SKILL: GSAP Core

## When to Use
✅ Complex animation sequencing · timeline control · performant UI animation · scroll-driven animation · SVG morphing · coordinated multi-element animations

## Core Tween Methods
```javascript
gsap.to(targets, vars)           // animate to (most common)
gsap.from(targets, vars)         // animate from
gsap.fromTo(targets, from, to)   // explicit start & end
gsap.set(targets, vars)          // apply immediately (duration: 0)
```

## Common Vars
```javascript
{
  duration: 0.5,              // seconds
  delay: 0,                   // seconds before start
  ease: "power1.out",         // see Easing section
  stagger: 0.1,               // offset each target by 0.1s
  repeat: -1,                 // -1 = infinite
  yoyo: true,                 // reverse on repeat
  overwrite: "auto",          // kill overlapping tweens
  onComplete: () => {},       // callback on finish
  immediateRender: true,      // apply start state immediately (from/fromTo)
}
```

## Transform Aliases (Prefer Over transform String)
```javascript
x, y, z                 // translateX/Y/Z (px)
xPercent, yPercent      // translate in %
scale, scaleX, scaleY   // scale
rotation                // rotate (deg default)
rotationX, rotationY    // 3D rotate
skewX, skewY            // skew
transformOrigin         // origin point
autoAlpha               // opacity + visibility (0 = hidden + pointer-events: none)
```

## Relative Values
```javascript
x: "+=20"      // add 20
x: "-=20"      // subtract 20
rotation: "*=2"  // multiply by 2
rotation: "/=2"  // divide by 2
```

## Easing (Built-in)
```
"none"                      // linear
"power1.out" (default)      // base: power2, power3, power4
"power3.inOut"              // .in, .out, .inOut variants
"back.out(1.7)"             // overshoot
"elastic.out(1, 0.3)"       // springy
"bounce.out"
"circ.out", "expo.out", "sine.out"
```

## Stagger
```javascript
stagger: 0.1                    // 0.1s between each target

// Advanced:
stagger: {
  amount: 0.3,           // total stagger duration
  from: "center",        // "start", "end", "center", "edges", "random", or index function
  each: 0.1
}
```

## Common Properties

| Name | Use |
|------|-----|
| `autoAlpha` | Fade in/out; 0 = hidden + non-interactive |
| `CSS variables` | `"--hue": 180`, `"--opacity": 0.5` |
| `clearProps` | Remove inline styles on complete: `"all"` or `"x,rotation"` |
| `immediateRender` | Default `true` for `from/fromTo`; set `false` if stacking multiple on same property |

## Function-Based Values
```javascript
gsap.to(".item", {
  x: (i, target, targetsArray) => i * 50,  // first: 0, second: 50, etc.
  stagger: 0.1
});
```

## Control Playback
```javascript
const tween = gsap.to(".box", { x: 100, duration: 1 });
tween.pause();
tween.play();
tween.reverse();
tween.kill();
tween.progress(0.5);        // seek to 50%
tween.time(0.2);            // seek to 0.2s
tween.totalTime(1.5);
```

## Defaults (Project-wide)
```javascript
gsap.defaults({ duration: 0.6, ease: "power2.out" });
```

## Responsive + Accessibility (matchMedia)
```javascript
const mm = gsap.matchMedia();

mm.add(
  {
    isDesktop: "(min-width: 800px)",
    isMobile: "(max-width: 799px)",
    reduceMotion: "(prefers-reduced-motion: reduce)"
  },
  (context) => {
    const { isDesktop, reduceMotion } = context.conditions;
    gsap.to(".box", {
      rotation: isDesktop ? 360 : 180,
      duration: reduceMotion ? 0 : 2   // skip if prefers-reduced-motion
    });
  }
);

mm.revert();  // cleanup on unmount
```

## SVG Animation
```javascript
// Rotate around custom origin in SVG global coords
gsap.to(svgEl, {
  rotation: 90,
  svgOrigin: "100 100"    // NOT transformOrigin
});

// Directional rotation
rotation: "-170_short"     // shortest path
rotation: "+=30_cw"        // clockwise
rotation: "+=30_ccw"       // counter-clockwise
```

## Best Practices ✅
- Use camelCase for CSS properties
- Prefer transform aliases over animating width/height/top/left
- Use `autoAlpha` instead of `opacity` for fade in/out
- Store tween return for playback control
- Use timelines for sequencing (not `.delay`)
- Use `gsap.matchMedia()` for responsive & prefers-reduced-motion
- Set `immediateRender: false` on later stacked `from()` tweens

## Forbidden ❌
- Animating layout (width, height, top, left) when transforms work
- Using both `svgOrigin` AND `transformOrigin` on same element
- Stacking multiple `from()` tweens without `immediateRender: false`
- Invalid ease names
- Relying on defaults when custom timing needed

## Performance
✅ GSAP core is highly optimized · transforms render faster than layout properties · use `clearProps` to let CSS take over after animation

## Related Skills
- `gsap-timeline` — sequencing multiple steps
- `gsap-scrolltrigger` — scroll-linked animation
- `gsap-react` — React integration
- `gsap-plugins` — Flip, Draggable, etc.
- `gsap-utils` — clamp, mapRange, etc.
- `gsap-performance` — optimization tips
