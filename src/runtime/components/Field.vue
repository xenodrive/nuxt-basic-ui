<template>
  <div class="relative mt-4">
    <label
      :class="twMerge('small-caps absolute -top-4 left-0 select-none whitespace-nowrap text-xs', props.labelClass)">
      <slot name="label">{{ props.label }}</slot>
    </label>

    <slot />
  </div>
</template>

<script lang="ts" setup>
import { twMerge, type ClassNameValue } from 'tailwind-merge';
type Props = {
  label: string;
  labelClass: ClassNameValue;
};
const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
label {
  @apply select-none;
  font-variant: small-caps;
  color: theme('field.label.text');
}
</style>
