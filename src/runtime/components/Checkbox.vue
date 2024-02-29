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
import { computed } from '#imports';
import chroma from 'chroma-js';
import { twcolor, type TwColor } from '../utils/twcolor';

const value = defineModel<boolean | undefined | null | number | string>();
type Props = {
  readonly?: boolean;
  disabled?: boolean;
  triState?: boolean | null | number | string;
  color?: TwColor;
};
const props = defineProps<Props>();

const triStateValue = computed(() => {
  return typeof props.triState === 'boolean' ? undefined : props.triState;
});

const icon = computed(() => {
  return typeof value.value !== 'boolean'
    ? 'minus-box-outline'
    : value.value
      ? 'checkbox-marked'
      : 'checkbox-blank-outline';
});

function onClick() {
  if (props.disabled || props.readonly) return;

  // true -> (undefined ->) false -> true
  value.value =
    value.value === true
      ? props.triState !== false
        ? triStateValue.value
        : false
      : typeof value.value !== 'boolean'
        ? false
        : true;
}

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
