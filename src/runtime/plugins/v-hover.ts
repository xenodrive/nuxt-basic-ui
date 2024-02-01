import type { Directive } from 'vue';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('hover', <Directive<HTMLElement, string>>{
    mounted(el, binding, vnode) {
      if (!binding.arg) return;

      const key = binding.arg;
      el.addEventListener('mouseover', () => {
        el.setAttribute(key, binding.value);
      });
      el.addEventListener('mouseout', () => {
        // restore
        el.setAttribute(key, vnode.props?.[key]);
      });
    },

    getSSRProps() {
      // you can provide SSR-specific props here
      return {};
    },
  });
});
