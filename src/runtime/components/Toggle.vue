<template>
  <label class="relative inline-flex cursor-pointer items-center">
    <input ref="$checkbox" type="checkbox" value="1" :checked="props.checked" class="peer sr-only" @change="onChange" />
    <div
      class="toggle-switch rounded-full bg-gray-200 transition-all after:rounded-full after:bg-white after:transition-all"
      :class="{ override: !!color }" />
    <span class="ml-2 select-none text-sm font-medium text-gray-900"><slot /></span>
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
  if (!props.color) return false;
  return twColor(props.color);
});

const ring = computed(() => {
  if (!props.color) return false;
  return chroma(twColor(props.color)).alpha(0.3).hex();
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
  background-color: theme('colors.primary');
  &.override {
    background-color: v-bind(color);
  }
  &:after {
    transform: translate(calc(v-bind('width') - v-bind('diameter') - var(--my-padding)), 0);
  }
}
.peer:focus ~ .toggle-switch,
.toggle-switch:hover {
  outline: calc(var(--my-padding) / 2) solid theme('colors.primary' / 30%);
  &.override {
    outline-color: v-bind(ring);
  }
}
</style>
