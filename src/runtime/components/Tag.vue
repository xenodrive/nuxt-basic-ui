<template>
  <span class="tag inline-flex items-center overflow-hidden whitespace-nowrap" :class="props.class" :style="style">
    <span class="main inline-flex items-center">
      <Icon v-if="props.icon" :name="props.icon" />
      <slot>{{ props.name }}</slot>
    </span>
    <span v-if="$slots.sublabel || props.sublabel" class="sub overflow-hidden text-ellipsis whitespace-nowrap">
      <slot name="sublabel">{{ props.sublabel }}</slot>
    </span>
  </span>
</template>

<script lang="ts" setup>
import { computed, useSlots } from '#imports';
import chroma from 'chroma-js';
import { twColor } from '../utils';

const $slots = useSlots();

type Props = {
  color?: string;
  colorText?: string;

  colorSub?: string;
  colorSubText?: string;

  icon?: string;
  name?: string;

  sublabel?: string;

  outline?: string;

  class?: string;
};

const props = defineProps<Props>();

function getColorInfo(color: string | undefined, textColor: string | undefined) {
  if (!color) return {};

  const c = chroma(twColor(color));
  const isDark = c.luminance() < 0.5;
  const text = chroma(textColor ? twColor(textColor) : c.luminance(isDark ? 0.9 : 0.1));

  return {
    background: c.hex(),
    text: text.hex(),
    textShadow: text.alpha(0.25).hex(),
  };
}

const style = computed(() => {
  const main = getColorInfo(props.color, props.colorText);
  const sub = getColorInfo(props.colorSub, props.colorSubText);

  return {
    outline: props.outline && `1px solid ${twColor(props.outline)}`,
    '--main-text-color': main.text,
    '--main-text-shadow-color': main.textShadow,
    '--main-background-color': main.background,
    '--sub-text-color': sub.text,
    '--sub-text-shadow-color': sub.textShadow,
    '--sub-background-color': sub.background,
  };
});
</script>
