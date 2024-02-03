<template>
  <label class="relative inline-flex cursor-pointer items-center">
    <input type="checkbox" ref="$checkbox" @change="onChange" value="1" :checked="props.checked" class="peer sr-only" />
    <div class="toggle-switch rounded-full bg-gray-200 after:rounded-full after:bg-white transition-all after:transition-all" />
    <span class="ml-2 text-sm font-medium text-gray-900 select-none"><slot /></span>
  </label>
</template>

<script setup lang="ts">
import { ref, computed } from '#imports';
import { twColor, type TwColor } from '../utils';
import chroma from 'chroma-js';

const props = withDefaults(
  defineProps<{
    size?: string;
    checked?: boolean;
    color?: TwColor;
  }>(),
  {
    size: '1.25rem',
    checked: false,
    color: 'blue-500',
  },
);
const emit = defineEmits<{
  'update:checked': [val: boolean];
}>();
const $checkbox = ref<HTMLInputElement>();

function onChange() {
  emit('update:checked', $checkbox.value!.checked);
}

const color = computed(() => {
  return twColor(props.color);
});

const ring = computed(() => {
  const c = chroma(twColor(props.color));
  return c.alpha(0.3).hex();
});

const width = computed(() => {
  return `calc(${props.size} * 1.888)`;
});
const height = computed(() => {
  return props.size;
});
const diameter = computed(() => {
  return `calc(${props.size} * 0.8)`;
});
</script>

<style lang="scss" scoped>
.toggle-switch {
  position: relative;
  width: v-bind('width');
  height: v-bind('height');
  --my-padding: calc(min(v-bind('width'), v-bind('height')) - v-bind('diameter'));
  outline: var(--my-padding) solid transparent;
  outline-offset: 0;
  &:after {
    position: absolute;
    left: calc(var(--my-padding) / 2);
    top: calc(var(--my-padding) / 2);
    content: '';
    width: v-bind('diameter');
    height: v-bind('diameter');
    outline: 1px solid rgba(0 0 0 / 10%);
    transform: translate(0, 0);
  }
}
.peer:checked ~ .toggle-switch {
  background-color: v-bind('color');
  &:after {
    transform: translate(calc(v-bind('width') - v-bind('diameter') - var(--my-padding)), 0);
  }
}
.peer:focus ~ .toggle-switch, .toggle-switch:hover {
  outline: calc(var(--my-padding) / 2) solid v-bind('ring');
}
</style>
