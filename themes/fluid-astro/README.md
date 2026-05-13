# Fluid Astro Theme

Fluid Astro is a Fluid-inspired Astro theme surface for blog layouts,
components, styles, and Hexo-Fluid-style configuration.

This package is intentionally a theme package surface, not a full Astro
integration yet. It provides reusable layouts and components; the host Astro
site still owns routes, content collections, markdown plugins, and deployment.

## What Is Included

- `_config.yml`: default theme configuration.
- `config.mjs`: config loader and theme helper exports.
- `layouts/`: `BaseLayout`, `PageLayout`, and `PostLayout`.
- `components/`: common, home, media, page, post, and SEO components.
- `assets/styles/`: global and typography CSS imported by `BaseLayout`.

## Local Repository Usage

The current site imports the theme through relative paths:

```astro
---
import PageLayout from '../../../themes/fluid-astro/layouts/PageLayout.astro';
import { fluidThemeConfig } from '../../../themes/fluid-astro/config.mjs';
---
```

The default config path for this repository is:

```text
themes/fluid-astro/_config.yml
```

## Package Usage

When published or installed as a package, import from package subpaths:

```astro
---
import PageLayout from '@gaficat/fluid-astro/layouts/PageLayout.astro';
import { fluidThemeConfig } from '@gaficat/fluid-astro/config';
---
```

## Astro Integration

Add the integration to the host project's `astro.config.mjs` to prepare Fluid
config resolution, useful package aliases, and core blog routes:

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import fluidAstro from '@gaficat/fluid-astro/integration';

export default defineConfig({
  integrations: [
    fluidAstro({
      config: './fluid.config.yml',
      alias: '@fluid-astro',
      routes: {},
    }),
  ],
});
```

With that alias, host routes can import theme modules like this:

```astro
---
import PostLayout from '@fluid-astro/layouts/PostLayout.astro';
import { fluidThemeConfig } from '@fluid-astro/config';
---
```

The integration injects these routes by default:

| key | pattern | entrypoint |
| --- | --- | --- |
| `home` | `/` | `routes/index.astro` |
| `page` | `/page/[page]` | `routes/page/[page].astro` |
| `post` | `/posts/[abbrlink]` | `routes/posts/[abbrlink].astro` |
| `archives` | `/archives` | `routes/archives/index.astro` |
| `categories` | `/categories` | `routes/categories/index.astro` |
| `category` | `/categories/[...slug]` | `routes/categories/[...slug].astro` |
| `tags` | `/tags` | `routes/tags/index.astro` |
| `tag` | `/tags/[tag]` | `routes/tags/[tag].astro` |
| `links` | `/links` | `routes/links/index.astro` |

Disable all route injection when the host already owns its routes:

```js
fluidAstro({ routes: false });
```

Disable individual routes by key:

```js
fluidAstro({
  routes: {
    home: false,
    post: false,
  },
});
```

Use a host-owned config file by setting `FLUID_ASTRO_CONFIG` before running
Astro, or by passing `config` to the integration:

```bash
FLUID_ASTRO_CONFIG=./fluid.config.yml npm run dev
FLUID_ASTRO_CONFIG=./fluid.config.yml npm run build
```

If `FLUID_ASTRO_CONFIG` is not set, the loader checks:

1. `themes/fluid-astro/_config.yml` in the host project.
2. the package default `_config.yml`.

## Host Requirements

The host project must provide:

- Content collections compatible with the injected routes, typically `posts`.
- Host routes under `src/pages/**` only for pages the integration does not
  inject or that the host wants to override.
- Static assets referenced by config, such as `/img/upyun_logo8.svg` and
  `/img/police_beian.png`, or equivalent config overrides.
- Markdown plugins needed by authored content, such as math and image-caption
  plugins if used by the host site.
- Peer dependencies declared by the theme: `astro` and `plyr`.

## Example Route

```astro
---
import { getCollection } from 'astro:content';
import PostLayout from '@gaficat/fluid-astro/layouts/PostLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return posts.map((post) => ({
    params: { abbrlink: post.data.abbrlink },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content, headings } = await post.render();
---

<PostLayout post={post} headings={headings}>
  <Content />
</PostLayout>
```

## Exports

```json
{
  ".": "./config.mjs",
  "./config": "./config.mjs",
  "./integration": "./integration.mjs",
  "./_config.yml": "./_config.yml",
  "./routes/*": "./routes/*",
  "./layouts/BaseLayout.astro": "./layouts/BaseLayout.astro",
  "./layouts/PageLayout.astro": "./layouts/PageLayout.astro",
  "./layouts/PostLayout.astro": "./layouts/PostLayout.astro",
  "./components/*": "./components/*",
  "./assets/styles/*": "./assets/styles/*"
}
```

## Current Limits

- Route injection covers core blog pages, but not about/aboutme, RSS, or search
  index routes yet.
- The integration does not create `src/content.config.ts` or copy static assets
  into the host project.
- Post, category, and tag URLs currently follow this site's URL conventions.
- Config is loaded at module evaluation time. Set `FLUID_ASTRO_CONFIG` before
  Astro imports theme modules, or use the integration `config` option.
- This package has not been published to npm yet.
