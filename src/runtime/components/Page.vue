<template>
  <div class="page">
    <Loading :model-value="props.loading" />
    <header><slot name="header" /></header>
    <div class="page-container">
      <div class="page-scroller">
        <div class="page-contents">
          <slot />
        </div>
      </div>
    </div>
    <footer><slot name="footer" /></footer>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  loading?: boolean;
};
const props = defineProps<Props>();
</script>

<style scoped>
@import '../assets/css/theme.css' theme(reference);

.page {
  @apply relative flex h-full w-full flex-col;

  > .page-container {
    @apply h-full overflow-scroll;

    > .page-scroller {
      @apply mx-auto h-fit w-fit p-4;

      > .page-contents {
        @apply h-fit w-fit min-w-(--breakpoint-xl);

        &:deep(h1) {
          display: flex;

          @apply flex items-center gap-4 text-lg font-bold;
        }
      }
    }
  }

  > header {
    @apply w-full flex-none;
  }

  > footer {
    @apply w-full flex-none;
  }
}
</style>
