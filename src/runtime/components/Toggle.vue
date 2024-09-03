<template>
  <label
    class="toggle disabled-style"
    :class="twMerge('relative inline-flex', props.class)"
    style="align-items: last baseline"
    :aria-disabled="props.disabled">
    <input
      ref="$checkbox"
      v-model="checked"
      type="checkbox"
      value="1"
      class="checkbox sr-only"
      :disabled="props.disabled || props.readonly" />

    <div :class="twMerge('inline-flex items-center gap-1', props.innerClass)">
      <div
        class="toggle-switch order-5 rounded-full leading-[0] transition-all after:rounded-full after:transition-all"
        :style="style" />
      <span :class="twMerge('order-6 select-none', props.labelClass)"><slot /></span>
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed, ref, twcolor } from '#imports';
import { twMerge, type ClassNameValue } from 'tailwind-merge';

type TwColor = string;

const checked = defineModel<boolean>({ default: false });
const props = withDefaults(
  defineProps<{
    color?: TwColor | `${TwColor},${TwColor}`;
    knobColor?: TwColor | `${TwColor},${TwColor}`;
    readonly?: boolean;
    disabled?: boolean;

    width?: string;
    height?: string;
    knobSize?: string;
    ringSize?: string;

    class?: ClassNameValue;
    innerClass?: ClassNameValue;
    labelClass?: ClassNameValue;
  }>(),
  {},
);

const $checkbox = ref<HTMLInputElement>();

const knobColor = computed(() => {
  if (!props.knobColor) return [];

  return String(props.knobColor)
    .split(/[\s,]+/)
    .map((c) => twcolor(c).toString());
});

const toggleColor = computed(() => {
  if (!props.color) return [];

  return String(props.color)
    .split(/[\s,]+/)
    .map((c) => twcolor(c).toString());
});

const style = computed(() => ({
  '--toggle-width': props.width,
  '--toggle-height': props.height,
  '--toggle-color-on': toggleColor.value[0],
  '--toggle-color-off': toggleColor.value[1],
  '--toggle-ring-width': props.ringSize,
  '--toggle-knob-diameter': props.knobSize,
  '--toggle-knob-color-on': knobColor.value[0],
  '--toggle-knob-color-off': knobColor.value[1],
}));
</script>

<style scoped>
.toggle-switch {
  --toggle-ring-color: rgb(from var(--toggle-color-on) r g b / var(--toggle-ring-opacity));
  --toggle-knob-padding: calc(min(var(--toggle-width), var(--toggle-height)) - var(--toggle-knob-diameter));

  position: relative;
  width: var(--toggle-width);
  height: var(--toggle-height);
  outline: var(--toggle-knob-padding) solid transparent;
  outline-offset: 0;
  margin: max(0px, calc((var(--toggle-knob-diameter) - var(--toggle-height)) / 2));
  background-color: var(--toggle-color-off);

  cursor: pointer;

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

.checkbox:checked ~ div > .toggle-switch {
  background-color: var(--toggle-color-on);
  &:after {
    transform: translate(calc(var(--toggle-width) - var(--toggle-knob-diameter) - var(--toggle-knob-padding)), 0);
    background-color: var(--toggle-knob-color-on);
  }
}

.disabled-style:not([aria-disabled='true']) {
  .checkbox:hover ~ div > .toggle-switch,
  .toggle-switch:hover {
    outline-width: var(--toggle-ring-width);
    outline-style: solid;
    outline-color: var(--toggle-ring-color);
  }
}
</style>
