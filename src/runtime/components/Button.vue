<template>
  <button :class="twMerge('relative', props.class)" @mouseenter="hover = true" @mouseleave="hover = false">
    <Loading :model-value="props.loading" size="small" :backdrop="false" class="bg-opacity-80" />
    <Icon v-if="icon" :name="`${icon}`" :size="iconSizeProp" /> <slot />
  </button>
</template>

<script lang="ts" setup>
import { ref, computed } from '#imports';
import { twMerge } from 'tailwind-merge';

// TODO:
type Props = {
  icon?: string;
  iconSize?: number | string;
  hoverIcon?: string;
  loading?: boolean;

  class?: string;
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
