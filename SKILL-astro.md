# SKILL: Astro Framework

## When to Use
Content-driven sites, islands architecture, SSG/SSR hybrid, selective hydration, content collections, fast performance

## Output Mode Selection

| Mode | Use Case | Rendering |
|------|----------|-----------|
| **static** | Blogs, docs, landing pages (default) | SSG at build time |
| **hybrid** | 80% static + login/API routes | Mostly SSG, on-demand SSR for dynamic |
| **server** | Most pages need request data | SSR all pages (rare) |

**Pick hybrid for most projects** — static content + server islands for dynamic parts

## Hydration Strategy — When to Use client: Directives

```
Need data from server each request?
  ├─ YES → server:defer (server island)
  │  ├─ User avatars, personalization, prices
  │  └─ Renders server-side on each request
  └─ NO → Need browser interactivity?
     ├─ YES → client:load | client:idle | client:visible
     │  ├─ client:load → Hydrate now (hero, forms, modals)
     │  ├─ client:idle → Hydrate when browser idle (below fold)
     │  └─ client:visible → Hydrate on viewport entry
     └─ NO → No directive (static HTML, 0 JS) ← 90% of site

DO NOT:
- client:visible on hero (already in viewport, wastes overhead)
- client:idle on mobile (requestIdleCallback slow)
- Hydrate entire navbar for just a toggle (use vanilla <script>)
```

## Component Structure
```astro
---
// Server-side code (runs once at build/request)
interface Props {
  title: string;
  count?: number;
}
const { title, count = 0 } = Astro.props;
const data = await fetch('...');
---

<!-- Template (static HTML) -->
<div>
  <h1>{title}</h1>
  <p>Count: {count}</p>
</div>

<style>
  /* Scoped by default */
  h1 { color: navy; }
</style>
```

## Content Collections (Astro 5+)

```typescript
// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
```

```typescript
// Usage in pages
import { getCollection } from 'astro:content';

const posts = await getCollection('blog', ({ data }) => !data.draft);
```

## Image Optimization
```astro
---
import { Image, Picture } from 'astro:assets';
import heroImg from '../assets/hero.jpg';
---

<!-- Optimized, lazy-loaded -->
<Image src={heroImg} alt="Hero" width={800} height={600} />

<!-- Responsive with multiple formats -->
<Picture src={heroImg} alt="Hero" widths={[320, 640, 1280]} formats={['webp', 'jpg']} />
```

## View Transitions (SPA-like navigation)
```astro
<!-- Layout.astro -->
---
import { ViewTransitions } from 'astro:transitions';
---
<head>
  <ViewTransitions />
</head>
```

## Server Islands (server:defer)
```astro
---
import UserInfo from '../components/UserInfo.astro';
---

<!-- Renders server-side on EACH request (personalized) -->
<UserInfo server:defer>
  <span slot="fallback">Loading...</span>
</UserInfo>
```

## Type-Safe Environment Variables
```typescript
// astro.config.mjs
export default defineConfig({
  env: {
    schema: z.object({
      DATABASE_URL: z.string().url(),
      API_KEY: z.string(),
      DEBUG: z.boolean().default(false),
    })
  }
});
```

```astro
---
import { API_KEY, DATABASE_URL } from 'astro:env/server';
---
```

## Sessions (Server State)
```astro
---
// Page with hybrid/server output mode
import { Astro } from 'astro';

export async function POST({ request, session }) {
  session.set('cart', { items: [...] });
  return new Response('Saved');
}
---
```

## E-Commerce Pattern (Mixed Strategies)
```astro
---
<!-- Static: Product info -->
<h1>{product.title}</h1>
<img src={product.image} alt="" />
---

<!-- Server island: Dynamic price/stock -->
<PriceInfo productId={product.id} server:defer />

<!-- Client island: Interactive add-to-cart -->
<AddToCart client:load productId={product.id} />
```

## Adapters (for SSR)
```bash
npm install @astrojs/node
# or @astrojs/vercel, @astrojs/netlify, @astrojs/cloudflare
```

```javascript
// astro.config.mjs
import node from '@astrojs/node';

export default defineConfig({
  output: 'hybrid',  // or 'server'
  adapter: node({ mode: 'standalone' })
});
```

## API Endpoints
```typescript
// src/pages/api/data.ts
export async function GET() {
  return new Response(JSON.stringify({ data: [...] }));
}
```

## Routing — File-Based
```
src/pages/
├── index.astro              → /
├── about.astro              → /about
├── blog/
│   └── [slug].astro         → /blog/post-1, /blog/post-2, etc.
└── api/
    └── data.ts              → /api/data
```

## Best Practices ✅
- Islands architecture — only hydrate what needs JS
- server:defer for per-request data (don't render statically)
- Content collections + Zod for type safety
- <Image /> for all images (automatic optimization)
- Choose right output mode (static by default)
- Use client directives sparingly
- ViewTransitions for smooth SPA-like navigation
- Type-safe env with astro:env

## Forbidden ❌
- Hydrating components that don't need interactivity
- client:only without framework specified
- Importing images with string paths (use import)
- Skipping content schema validation
- Accessing Astro.request in static pages
- Using browser APIs in component frontmatter
- Forgetting to install adapters for SSR
- Passing functions to server:defer (not serializable)

## Related Skills
- `frontend-design` — Astro component design
- `gsap-core` — Animations with Astro
- `SKILL-animations.md` — GSAP + ScrollTrigger in Astro
