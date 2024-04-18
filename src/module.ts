import {
  addComponentsDir,
  addImportsDir,
  addPlugin,
  addTemplate,
  createResolver,
  defineNuxtModule,
  installModule,
  resolveFiles,
  useLogger,
} from '@nuxt/kit';
import fs from 'node:fs';
import { dirname } from 'node:path';

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

    // Add runtime as a layer
    nuxt.options._layers.push({
      config: {
        rootDir: resolve('./runtime'),
        srcDir: resolve('./runtime'),
      },
      configFile: 'nuxt.config',
      cwd: resolve('./runtime'),
    });

    // XXX: Hijack user specified cssPath, or tailwindcss/tailwind.css
    const origCssPath = nuxt.options.tailwindcss?.cssPath ?? 'tailwindcss/tailwind.css';
    const cssFiles = await resolveFiles(resolve('./runtime/assets/css/'), ['*.css', '*.scss']);

    const getContents = () => [...cssFiles, origCssPath].map((f) => `@import '${f}';`).join('\n');
    const tmpl = addTemplate({
      filename: 'tailwind.css',
      write: true,
      getContents,
    });

    // XXX: write the CSS immediately
    fs.mkdirSync(dirname(tmpl.dst), { recursive: true });
    fs.writeFileSync(tmpl.dst, getContents());
    const cssPath = tmpl.dst;

    // XXX: XXX: Workaround for a race condition.
    // https://github.com/nuxt-modules/tailwindcss/issues/802
    if (nuxt.options.vite.warmupEntry !== false) {
      nuxt.hook('vite:serverCreated', async (server, env) => {
        if (!env.isServer) await server.transformRequest(cssPath, { ssr: env.isServer });
      });
    }

    // Additional modules
    installModule('@nuxtjs/tailwindcss', {
      ...(nuxt.options.tailwindcss || {}),
      cssPath,
      exposeConfig: true,
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
