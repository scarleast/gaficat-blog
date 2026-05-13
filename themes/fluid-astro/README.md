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
config resolution and useful package aliases:

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import fluidAstro from '@gaficat/fluid-astro/integration';

export default defineConfig({
  integrations: [
    fluidAstro({
      config: './fluid.config.yml',
      alias: '@fluid-astro',
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

- Astro routes under `src/pages/**`.
- Content collections compatible with the layouts, typically `posts` and
  optionally `pages`.
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
  "./_config.yml": "./_config.yml",
  "./layouts/BaseLayout.astro": "./layouts/BaseLayout.astro",
  "./layouts/PageLayout.astro": "./layouts/PageLayout.astro",
  "./layouts/PostLayout.astro": "./layouts/PostLayout.astro",
  "./components/*": "./components/*",
  "./assets/styles/*": "./assets/styles/*"
}
```

## Current Limits

- Route generation is not bundled as an Astro integration.
- The current integration prepares config and aliases; it does not create
  `src/pages/**` routes or content collections.
- Post, category, and tag URLs currently follow this site's URL conventions.
- Config is loaded at module evaluation time. Set `FLUID_ASTRO_CONFIG` before
  Astro imports theme modules, or use the integration `config` option.
- This package has not been published to npm yet.
