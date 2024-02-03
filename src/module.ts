import { addComponentsDir, addPlugin, createResolver, defineNuxtModule, installModule, resolveFiles, useLogger } from '@nuxt/kit';
import plugin from 'tailwindcss/plugin.js';

// Module options TypeScript interface definition
export interface ModuleOptions {}

const logger = useLogger('nuxt:basic-ui');

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@xenodrive/nuxt-basic-ui',
    configKey: 'ui',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(_options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    // CSS
    nuxt.options.css.push('@mdi/font/css/materialdesignicons.css');

    // CommonJS packages
    if (!nuxt.options.vite.optimizeDeps) nuxt.options.vite.optimizeDeps = {};
    if (!nuxt.options.vite.optimizeDeps.include) nuxt.options.vite.optimizeDeps.include = [];
    nuxt.options.vite.optimizeDeps.include = [
      ...nuxt.options.vite.optimizeDeps.include,
      'chroma-js',
      'tailwindcss/colors',
    ];

    // Tailwind
    nuxt.hook('tailwindcss:config', function (config) {
      if (config && Array.isArray(config.content)) {
        config.content.push(resolve('./runtime') + '/**/*.{vue,js,ts}');
      }

      if (!config.presets) config.presets = [];
      config.presets.push({
        plugins: [
          plugin(({ addComponents }) => addComponents({
            '.app-hoverable': {},
            '.app-border': {},
          })),
        ],
      });
    });
    installModule('@nuxtjs/tailwindcss');

    // Additional modules
    installModule('@vueuse/nuxt');


    // Load our components
    const path = resolve('./runtime/components');
    addComponentsDir({ path });

    // Load our Plugins
    for (const plugin of await resolveFiles(resolve('./runtime/plugins/'), ['*.mjs', '*.ts'])) {
      addPlugin(plugin.replace(/\.m?[jt]s$/, ''));
    }

    logger.info('@xenodrive/nuxt-basic-ui Loaded');
  },
});
