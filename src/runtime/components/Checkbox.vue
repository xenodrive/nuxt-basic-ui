<template>
  <label
    class="checkbox disabled-style"
    :class="[
      { 'cursor-pointer': !props.disabled && !props.readonly },
      twMerge('inline-flex items-center', props.class),
    ]"
    :aria-disabled="props.disabled"
    :style="style"
    @click="onClick">
    <Icon class="icon" :icon="icon" />
    <div class="ml-0.5 select-none first:ml-0"><slot /></div>
  </label>
</template>

<script lang="ts" setup>
import type { TwColor } from '#imports';
import { computed, twcolor, watch } from '#imports';
import { twMerge, type ClassNameValue } from 'tailwind-merge';

const modelValue = defineModel<any>();
const selected = defineModel<any[]>('selected');
type Props = {
  readonly?: boolean;
  disabled?: boolean;
  triState?: any;

  color?: string | TwColor;
  iconColor?: string | TwColor;

  value?: any;
  class?: ClassNameValue;
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

const style = computed(() => ({
  '--checkbox-text-color': twcolor(props.color).toString(),
  '--checkbox-icon-color': twcolor(props.iconColor ?? props.color).toString(),
}));
</script>

<style scoped>
.checkbox {
  color: var(--checkbox-text-color);

  .icon {
    color: var(--checkbox-icon-color);
  }
}
</style>
