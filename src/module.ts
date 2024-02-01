import { addComponentsDir, addPlugin, createResolver, defineNuxtModule, installModule, resolveFiles, useLogger } from '@nuxt/kit';

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

    nuxt.options.css.push('@mdi/font/css/materialdesignicons.css');

    nuxt.hook('tailwindcss:config', function (config) {
      if (config && Array.isArray(config.content)) {
        config.content.push(resolve('./runtime') + '/**/*.{vue,js,ts}');
      }
    });

    installModule('@nuxtjs/tailwindcss');

    const path = resolve('./runtime/components');
    addComponentsDir({ path });

    for (const plugin of await resolveFiles(resolve('./runtime/plugins/'), ['*.mjs', '*.ts'])) {
      addPlugin(plugin.replace(/\.m?[jt]s$/, ''));
    }

    logger.info('@xenodrive/nuxt-basic-ui Loaded');
  },
});
