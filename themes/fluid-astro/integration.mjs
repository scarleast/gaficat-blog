import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageDir = dirname(fileURLToPath(import.meta.url));

const defaultRouteMap = {
  home: { pattern: '/', entrypoint: './routes/index.astro' },
  page: { pattern: '/page/[page]', entrypoint: './routes/page/[page].astro' },
  post: { pattern: '/posts/[abbrlink]', entrypoint: './routes/posts/[abbrlink].astro' },
  archives: { pattern: '/archives', entrypoint: './routes/archives/index.astro' },
  categories: { pattern: '/categories', entrypoint: './routes/categories/index.astro' },
  category: { pattern: '/categories/[...slug]', entrypoint: './routes/categories/[...slug].astro' },
  tags: { pattern: '/tags', entrypoint: './routes/tags/index.astro' },
  tag: { pattern: '/tags/[tag]', entrypoint: './routes/tags/[tag].astro' },
  links: { pattern: '/links', entrypoint: './routes/links/index.astro' },
};

/**
 * @typedef {Object} FluidAstroIntegrationOptions
 * @property {string} [config] Path to the host Fluid config file, relative to the host project root.
 * @property {string|false} [alias="@fluid-astro"] Optional short Vite alias for theme imports.
 * @property {false|Record<string, boolean>} [routes] Set to false to disable route injection, or disable individual route keys.
 */

/**
 * Minimal Astro integration for Fluid Astro.
 *
 * The integration prepares config resolution and aliases, and can inject core
 * blog routes. Content collections are still owned by the host project.
 *
 * @param {FluidAstroIntegrationOptions} [options]
 * @returns {import('astro').AstroIntegration}
 */
export default function fluidAstro(options = {}) {
  const { config, alias = '@fluid-astro', routes = {} } = options;

  return {
    name: '@gaficat/fluid-astro',
    hooks: {
      'astro:config:setup': ({ config: astroConfig, injectRoute, updateConfig }) => {
        if (config) {
          process.env.FLUID_ASTRO_CONFIG = resolve(astroConfig.root.pathname, config);
        }

        const aliases = {
          '@gaficat/fluid-astro': packageDir,
        };

        if (alias) {
          aliases[alias] = packageDir;
        }

        updateConfig({
          vite: {
            resolve: {
              alias: aliases,
            },
          },
        });

        if (routes !== false) {
          for (const [key, route] of Object.entries(defaultRouteMap)) {
            if (routes[key] === false) continue;

            injectRoute({
              pattern: route.pattern,
              entrypoint: resolve(packageDir, route.entrypoint),
              prerender: true,
            });
          }
        }
      },
    },
  };
}
