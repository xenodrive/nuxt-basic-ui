<template>
  <div class="page">
    <Loading :model-value="props.loading" />
    <header><slot name="header" /></header>
    <div class="page-viewport">
      <div
        class="page-contents"
        :class="props.contentClass"
        :style="{
          height: props.hFull ? '100%' : undefined,
          width: props.wFull ? '100%' : undefined,
          padding: props.padding ?? undefined,
        }">
        <slot />
      </div>
    </div>
    <footer><slot name="footer" /></footer>
  </div>
</template>

<script lang="ts" setup>
import type { ClassNameValue } from 'tailwind-merge';

type Props = {
  loading?: boolean;
  contentClass?: ClassNameValue;
  wFull?: boolean;
  hFull?: boolean;
  padding?: string | number;
};
const props = defineProps<Props>();
</script>

<style>
html,
body,
#__nuxt {
  width: 100%;
  height: 100%;
}
</style>

<style scoped>
@import '../assets/css/theme.css';

.page {
  @apply relative flex h-full w-full flex-col;

  > header {
    @apply w-full flex-none;
  }

  > .page-viewport {
    @apply relative w-full flex-grow basis-full overflow-x-auto overflow-y-scroll;

    > .page-contents {
      @apply mx-auto h-fit w-fit min-w-(--breakpoint-xl) p-4;

      &:deep(h1) {
        @apply flex items-center gap-4 text-lg font-bold;
      }
    }
  }

  > footer {
    @apply w-full flex-none;
  }
}
</style>
