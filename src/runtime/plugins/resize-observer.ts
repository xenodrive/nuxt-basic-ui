import { ResizeObserver } from 'vue-resize';
import 'vue-resize/dist/vue-resize.css';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('ResizeObserver', ResizeObserver);
});
