import { defineNuxtPlugin } from '#app';
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('focus', {
    mounted: (el: HTMLElement, { value }) => value && el.focus(),
  });
});
