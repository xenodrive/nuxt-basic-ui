<template>
  <span
    class="tag inline-flex select-none items-center gap-1 overflow-hidden whitespace-nowrap"
    :class="props.class"
    :style="style">
    <Icon v-if="props.icon" :name="props.icon" />
    <slot>{{ props.name }}</slot>
  </span>
</template>

<script lang="ts" setup>
import { computed } from '#imports';
import chroma from 'chroma-js';
import { theme, twcolor } from '../utils/twcolor';

type Props = {
  color?: string;
  colorText?: string;

  icon?: string;
  name?: string;

  sublabel?: string;

  outline?: string;

  class?: string;
};

const props = defineProps<Props>();

function getColorInfo(color: string | undefined, textColor: string | undefined) {
  if (!color) return {};

  const c = chroma(twcolor(color));
  const isDark = c.luminance() < 0.5;

  const text = chroma(textColor ? twcolor(textColor) : isDark ? theme('tag.dark.text') : theme('tag.light.text'));

  return {
    background: c.hex(),
    text: text.hex(),
  };
}

const style = computed(() => {
  const main = getColorInfo(props.color, props.colorText);

  return {
    outline: props.outline && `1px solid ${twcolor(props.outline)}`,
    '--text-color': main.text,
    '--background-color': main.background,
  };
});
</script>
