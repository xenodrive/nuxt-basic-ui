<template>
  <label
    class="checkbox inline-flex items-center"
    :class="{ 'cursor-pointer': !props.disabled && !props.readonly }"
    :aria-disabled="props.disabled"
    @click="onClick">
    <Icon class="icon" :icon="icon" :class="{ override: !!color }" />
    <div class="ml-0.5 select-none first:ml-0" :aria-disabled="props.disabled"><slot /></div>
  </label>
</template>

<script lang="ts" setup>
import { computed, watch } from '#imports';
import chroma from 'chroma-js';
import { twcolor, type TwColor } from '../utils/twcolor';

const modelValue = defineModel<any>();
const selected = defineModel<any[]>('selected');
type Props = {
  readonly?: boolean;
  disabled?: boolean;
  triState?: any;
  color?: TwColor;

  value?: any;
};
const props = withDefaults(defineProps<Props>(), {
  triState: false,
  value: true,
});

// XXX: initial values
if (modelValue.value === '') modelValue.value = props.value;
if (modelValue.value === undefined && props.triState === false) modelValue.value = false;

const triStateValue = computed(() => {
  return typeof props.triState === 'boolean' || props.triState === '' ? undefined : props.triState;
});

const icon = computed(() => {
  return modelValue.value === props.value
    ? 'checkbox-marked'
    : modelValue.value === triStateValue.value
      ? 'minus-box-outline'
      : 'checkbox-blank-outline';
});

function onClick() {
  if (props.disabled || props.readonly) return;

  // true -> (undefined ->) false -> true
  modelValue.value =
    modelValue.value === props.value
      ? props.triState !== false
        ? triStateValue.value
        : false
      : modelValue.value !== false
        ? false
        : props.value;

  if (selected.value) {
    if (modelValue.value === props.value) {
      if (selected.value.indexOf(props.value) < 0) {
        selected.value.push(props.value);
      }
    } else if (modelValue.value === false) {
      const idx = selected.value.indexOf(props.value);
      if (idx >= 0) {
        selected.value.splice(idx, 1);
      }
    }
  }
}

watch(
  selected,
  () => {
    if (selected.value) {
      const idx = selected.value.indexOf(props.value);
      modelValue.value = idx >= 0 ? props.value : false;
    }
  },
  { immediate: true },
);

const color = computed(() => {
  return props.color && chroma(twcolor(props.color)).rgb().join(' ');
});
</script>

<style style="scss" scoped>
.checkbox:not([aria-disabled='true']) {
  & > .icon {
    &.override {
      color: rgb(v-bind(color));
    }
  }

  &:hover > .icon {
    &.override {
      background-color: rgba(v-bind(color) / theme('checkbox.hover.backgroundOpacity'));
      color: rgb(v-bind(color));
    }
  }
}
</style>
