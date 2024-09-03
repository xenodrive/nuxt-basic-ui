<template>
  <div class="relative mt-4">
    <label
      :class="twMerge('small-caps absolute -top-4 left-0 text-xs whitespace-nowrap select-none', props.labelClass)">
      <slot name="label">{{ props.label }}</slot>
    </label>

    <slot />
  </div>
</template>

<script lang="ts" setup>
import { twMerge, type ClassNameValue } from 'tailwind-merge';
type Props = {
  label: string;
  labelClass?: ClassNameValue;
};
const props = defineProps<Props>();
</script>

<style scoped>
label {
  font-variant: small-caps;
  color: var(--field-label-text-color);
}
</style>
