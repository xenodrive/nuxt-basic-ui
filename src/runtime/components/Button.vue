<template>
  <button
    class="button hover-style disabled-style cursor-pointer"
    :disabled="props.disabled"
    :class="twMerge('relative overflow-hidden', props.class)"
    :style="style"
    :aria-busy="props.loading"
    @mouseenter="hover = true"
    @mouseleave="hover = false">
    <Loading :model-value="props.loading" size="text" :backdrop="false" />
    <Icon v-if="icon" :name="`${icon}`" :size="iconSizeProp" />
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed, ref, twcolor } from '#imports';
import { twMerge, type ClassNameValue } from 'tailwind-merge';

// TODO:
type Props = {
  icon?: string;
  iconSize?: number | string;
  hoverIcon?: string;

  loading?: boolean;
  disabled?: boolean;

  color?: string;
  colorText?: string;

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

const style = computed(() => {
  const bgcolor = twcolor(props.color);
  const fgcolor = twcolor(props.colorText, twcolor(bgcolor, '--button-background-color').textColor());
  return {
    '--button-background-color': bgcolor.toString(),
    '--button-text-color': fgcolor.toString(),
  };
});
</script>

<style scoped>
.button:default {
  background-color: var(--button-background-color);
  color: var(--button-text-color);
}
</style>
