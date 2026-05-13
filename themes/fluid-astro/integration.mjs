import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageDir = dirname(fileURLToPath(import.meta.url));

/**
 * @typedef {Object} FluidAstroIntegrationOptions
 * @property {string} [config] Path to the host Fluid config file, relative to the host project root.
 * @property {string|false} [alias="@fluid-astro"] Optional short Vite alias for theme imports.
 */

/**
 * Minimal Astro integration for Fluid Astro.
 *
 * The integration prepares config resolution and aliases. Route generation and
 * content collections are still owned by the host project.
 *
 * @param {FluidAstroIntegrationOptions} [options]
 * @returns {import('astro').AstroIntegration}
 */
export default function fluidAstro(options = {}) {
  const { config, alias = '@fluid-astro' } = options;

  return {
    name: '@gaficat/fluid-astro',
    hooks: {
      'astro:config:setup': ({ config: astroConfig, updateConfig }) => {
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
      },
    },
  };
}
