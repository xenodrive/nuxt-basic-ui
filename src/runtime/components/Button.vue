<template>
  <button
    class="button"
    :class="twMerge('relative overflow-hidden', props.class)"
    @mouseenter="hover = true"
    @mouseleave="hover = false">
    <div class="absolute inset-0 bg-black bg-opacity-0 transition-colors hover:bg-opacity-5 active:bg-opacity-10" />
    <Loading :model-value="props.loading" size="small" :backdrop="false" class="bg-opacity-80" />
    <Icon v-if="icon" :name="`${icon}`" :size="iconSizeProp" /> <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed, ref } from '#imports';
import { twMerge, type ClassNameValue } from 'tailwind-merge';

// TODO:
type Props = {
  icon?: string;
  iconSize?: number | string;
  hoverIcon?: string;
  loading?: boolean;

  class?: ClassNameValue;
};
const props = defineProps<Props>();

const iconSizeProp = computed(() => {
  return typeof props.iconSize === 'number' ? `${props.iconSize}px` : props.iconSize;
});

const hover = ref(false);

const icon = computed(() => {
  if (hover.value && props.hoverIcon) return props.hoverIcon;
  return props.icon;
});
</script>
