<template>
  <span
    :class="twMerge('inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-xs', props.class)"
    :style="style">
    <Icon v-if="props.icon" :name="props.icon" /> <slot>{{ props.name }}</slot>
  </span>
</template>

<script lang="ts" setup>
import { computed } from '#imports';
import chroma from 'chroma-js';
import { twMerge } from 'tailwind-merge';
import { twColor } from '../utils';

type Props = {
  color?: string;
  textColor?: string;
  icon?: string;
  name?: string;

  outlined?: boolean;

  class?: string;
};

const props = defineProps<Props>();

const style = computed(() => {
  try {
    if (props.outlined) {
      const text = twColor(props.color ?? 'gray-300');
      return {
        border: '1px solid',
        borderColor: text.toString(),
        color: text.toString(),
      };
    }

    const background = chroma(twColor(props.color ?? 'gray-300'));
    const text = twColor(props.textColor ?? (background.luminance() < 0.5 ? '#fff' : '#000'));

    return {
      color: text.toString(),
      backgroundColor: background.toString(),
    };
  } catch (e) {
    return {};
  }
});
</script>
