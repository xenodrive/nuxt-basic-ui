<template>
  <label
    class="app-hoverable inline-flex items-center"
    :class="{ 'cursor-pointer': !props.disabled && !props.readonly }"
    @click="onClick">
    <Icon :icon="icon" class="text-indigo-500 aria-disabled:text-gray-400" :aria-disabled="props.disabled" />
    <div class="ml-0.5 select-none aria-disabled:text-gray-400" :aria-disabled="props.disabled"><slot /></div>
  </label>
</template>

<script lang="ts" setup>
import { computed } from '#imports';

const value = defineModel<boolean | undefined | null | number | string>({ default: undefined });
type Props = {
  readonly?: boolean;
  disabled?: boolean;
  triState?: boolean | null | number | string;
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
</script>
