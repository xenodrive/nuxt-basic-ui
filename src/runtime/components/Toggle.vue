<template>
  <label
    :class="[{ 'cursor-pointer': !props.disabled && !props.readonly }, twMerge('relative inline-flex', props.class)]"
    style="align-items: last baseline"
    :aria-disabled="props.disabled">
    <input
      ref="$checkbox"
      v-model="checked"
      type="checkbox"
      value="1"
      class="peer sr-only"
      :disabled="props.disabled || props.readonly" />

    <div class="inline-flex items-center">
      <div
        class="toggle-switch rounded-full leading-[0] transition-all after:rounded-full after:transition-all aria-disabled:opacity-50 aria-disabled:saturate-0"
        :style="style"
        :aria-disabled="props.disabled" />
      <span class="ml-1 select-none aria-disabled:opacity-30" :aria-disabled="props.disabled"><slot /></span>
    </div>
  </label>
</template>

<script setup lang="ts">
import { ref, computed } from '#imports';
import { twMerge, type ClassNameValue } from 'tailwind-merge';
import { twcolor, type TwColor, theme } from '../utils/twcolor';
import chroma from 'chroma-js';

const checked = defineModel<boolean>({ default: false });
const props = withDefaults(
  defineProps<{
    color?: TwColor | `${TwColor},${TwColor}`;
    knobColor?: TwColor | `${TwColor},${TwColor}`;
    readonly?: boolean;
    disabled?: boolean;

    size?: string;
    width?: string;
    height?: string;
    knobSize?: string;
    ringSize?: string;

    class?: ClassNameValue;
  }>(),
  {},
);

const $checkbox = ref<HTMLInputElement>();

const knobColor = computed(() => {
  if (!props.knobColor) return [];

  return String(props.knobColor)
    .split(/[\s,]+/)
    .map((c) => twcolor(c));
});

const ringColor = computed(() => {
  if (!toggleColor.value || !toggleColor.value[0]) return undefined;
  return `rgb(${chroma(toggleColor.value[0]).rgb().join(' ')} / ${theme('toggle.ring.opacity')})`;
});

const toggleColor = computed(() => {
  if (!props.color) return [];

  return String(props.color)
    .split(/[\s,]+/)
    .map((c) => twcolor(c));
});

const style = computed(() => ({
  '--toggle-width': props.width,
  '--toggle-height': props.height,
  '--toggle-color-on': toggleColor.value[0],
  '--toggle-color-off': toggleColor.value[1],
  '--toggle-ring-width': props.ringSize,
  '--toggle-ring-color': ringColor.value,
  '--toggle-knob-diameter': props.knobSize,
  '--toggle-knob-color-on': knobColor.value[0],
  '--toggle-knob-color-off': knobColor.value[1],
}));
</script>

<style lang="scss" scoped>
.toggle-switch {
  --toggle-width: theme('toggle.width');
  --toggle-height: theme('toggle.height');
  --toggle-color-on: theme('toggle.background.on');
  --toggle-color-off: theme('toggle.background.off');
  --toggle-ring-width: theme('toggle.ring.size');
  --toggle-ring-color: theme('toggle.ring.color' / theme('toggle.ring.opacity'));
  --toggle-knob-diameter: theme('toggle.knob.size');
  --toggle-knob-color-on: theme('toggle.knob.on');
  --toggle-knob-color-off: theme('toggle.knob.off');

  --toggle-knob-padding: calc(min(var(--toggle-width), var(--toggle-height)) - var(--toggle-knob-diameter));

  position: relative;
  width: var(--toggle-width);
  height: var(--toggle-height);
  outline: var(--toggle-knob-padding) solid transparent;
  outline-offset: 0;
  margin: max(0px, calc((var(--toggle-knob-diameter) - var(--toggle-height)) / 2));
  background-color: var(--toggle-color-off);

  &:after {
    position: absolute;
    left: calc(var(--toggle-knob-padding) / 2);
    top: calc(var(--toggle-knob-padding) / 2);
    content: '';
    width: var(--toggle-knob-diameter);
    height: var(--toggle-knob-diameter);
    outline: 1px solid rgba(0 0 0 / 10%);
    transform: translate(0, 0);
    background-color: var(--toggle-knob-color-off);
  }
}
.peer:checked ~ div > .toggle-switch {
  background-color: var(--toggle-color-on);
  &:after {
    transform: translate(calc(var(--toggle-width) - var(--toggle-knob-diameter) - var(--toggle-knob-padding)), 0);
    background-color: var(--toggle-knob-color-on);
  }
}
.peer:hover ~ div > .toggle-switch,
.toggle-switch:hover {
  outline-width: var(--toggle-ring-width);
  outline-style: solid;
  outline-color: var(--toggle-ring-color);
}
</style>
