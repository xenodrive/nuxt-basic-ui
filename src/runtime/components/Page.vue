<template>
  <div class="page">
    <Loading :model-value="props.loading" />
    <div class="page-contents">
      <slot />
    </div>
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
  @apply relative mx-auto min-h-full w-full min-w-fit p-4;

  > .page-contents {
    @apply mx-auto max-w-screen-xl;

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
}
</style>
