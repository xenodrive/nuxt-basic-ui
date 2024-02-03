export default defineNuxtConfig({
  tailwindcss: {
    cssPath: '~/main.scss',
  },
  modules: ['../src/module'],
  devtools: { enabled: true },
});
