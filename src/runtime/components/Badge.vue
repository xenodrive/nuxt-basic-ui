<template>
  <span
    class="badge inline-flex flex-none select-none items-center overflow-hidden whitespace-nowrap"
    :class="props.class"
    :style="style">
    <span
      v-if="$slots.title || props.title || props.icon"
      class="title inline-flex h-full items-center"
      :class="props.classTitle">
      <Icon v-if="props.icon" :name="props.icon" />
      <slot name="title">{{ props.title }}</slot>
    </span>
    <span class="value inline-flex h-full items-center" :class="props.classValue">
      <Icon v-if="props.iconValue" :name="props.iconValue" />
      <slot>{{ props.value }}</slot>
    </span>
  </span>
</template>

<script lang="ts" setup>
import { computed, useSlots } from '#imports';
import chroma from 'chroma-js';
import { theme, twColor, type TwColor } from '../utils/twColor';

const $slots = useSlots();

type Props = {
  color?: TwColor;
  colorText?: TwColor;

  colorTitle?: TwColor;
  colorTitleText?: TwColor;

  outline?: TwColor;

  title?: string;
  value?: string;

  class?: string;
  classTitle?: string;
  classValue?: string;

  icon?: string;
  iconValue?: string;
};

const props = defineProps<Props>();

function getColorInfo(color: string | undefined, textColor: string | undefined) {
  if (!color) return {};

  const c = chroma(twColor(color));
  const isDark = c.luminance() < 0.5;
  const text = textColor ? twColor(textColor) : isDark ? theme('badge.dark.text') : theme('badge.light.text');
  console.log(text, color, textColor, isDark);
  const textShadow = chroma(text).alpha(0.25);

  return {
    background: c.hex(),
    text: text,
    textShadow: textShadow.hex(),
  };
}

const style = computed(() => {
  const title = getColorInfo(props.colorTitle, props.colorTitleText);
  const value = getColorInfo(props.color, props.colorText);

  return {
    outline: props.outline && `1px solid ${twColor(props.outline)}`,
    '--title-text-color': title.text,
    '--title-text-shadow-color': title.textShadow,
    '--title-background-color': title.background,
    '--value-text-color': value.text,
    '--value-text-shadow-color': value.textShadow,
    '--value-background-color': value.background,
  };
});
</script>
