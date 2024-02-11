<template>
  <Component
    :is="props.tag ?? 'a'"
    class="cursor-pointer"
    :target="props.target ?? '_blank'"
    :href="src"
    @click.prevent="downloadIt"
    ><slot
  /></Component>
</template>

<script lang="ts" setup>
import type { Component } from '#imports';
import useDownloader from '../composables/useDownloader';
type Props = {
  tag?: string | Component;
  src: string;
  target?: string;
};
const props = defineProps<Props>();

const { download } = useDownloader();

const loading = defineModel<boolean>('loading', { default: false });

async function downloadIt() {
  loading.value = true;

  try {
    await download(props.src);
  } finally {
    loading.value = false;
  }
}
</script>
