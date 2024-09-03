import {
  addComponentsDir,
  addImportsDir,
  addPlugin,
  addVitePlugin,
  createResolver,
  defineNuxtModule,
  installModule,
  resolveFiles,
  useLogger,
} from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';
import tailwindcssPlugin from '@tailwindcss/vite';

const logger = useLogger('nuxt:basic-ui');

export default defineNuxtModule({
  meta: {
    name: '@xenodrive/nuxt-basic-ui',
    configKey: 'ui',
  },
  // Default configuration options of the Nuxt module
  defaults: {},

  async setup(_options, nuxt: Nuxt) {
    const { resolve } = createResolver(import.meta.url);

    // CSS
    nuxt.options.css.push('@mdi/font/css/materialdesignicons.css');

    // CommonJS packages
    if (!nuxt.options.vite.optimizeDeps) nuxt.options.vite.optimizeDeps = {};
    if (!nuxt.options.vite.optimizeDeps.include) nuxt.options.vite.optimizeDeps.include = [];
    nuxt.options.vite.optimizeDeps.include = [...nuxt.options.vite.optimizeDeps.include, 'tailwindcss/colors'];

    // Inject css / tailwind
    if (nuxt.options.builder === '@nuxt/vite-builder') {
      addVitePlugin(tailwindcssPlugin());
    } else {
      nuxt.options.postcss.plugins['@tailwindcss/postcss'] = {};
    }
    nuxt.options.css.unshift(resolve('./runtime/assets/css/main.css'));

    // Add runtime as a layer
    nuxt.options._layers.push({
      config: {
        rootDir: resolve('./runtime'),
        srcDir: resolve('./runtime'),
      },
      configFile: 'nuxt.config',
      cwd: resolve('./runtime'),
    });

    installModule('@vueuse/nuxt');

    // Load our composables
    addImportsDir(resolve('./runtime/composables'));
    addImportsDir(resolve('./runtime/utils'));

    // Load our components
    addComponentsDir({ path: resolve('./runtime/components') });

    // Load our Plugins
    for (const plugin of await resolveFiles(resolve('./runtime/plugins/'), ['*.mjs', '*.ts'])) {
      addPlugin(plugin.replace(/\.m?[jt]s$/, ''));
    }

    logger.info('@xenodrive/nuxt-basic-ui Loaded');
  },
});
