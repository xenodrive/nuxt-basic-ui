<template>
  <div class="page">
    <Loading :model-value="props.loading" />
    <slot />
  </div>
</template>

<script lang="ts" setup>
type Props = {
  loading?: boolean;
};
const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.page {
  @apply relative mx-auto min-h-full w-full max-w-screen-xl p-4;

  :deep(h1) {
    @apply flex items-center gap-4 text-lg font-bold;
  }

  > :deep(header) {
    @apply mb-4 flex items-center gap-4;
  }

  > :deep(footer) {
    @apply mt-4 flex items-center gap-4;
  }
}
</style>
