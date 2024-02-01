<template>
  <div class="relative mt-4">
    <label class="small-caps absolute -top-4 left-0 select-none whitespace-nowrap text-xs">
      <slot name="label">{{ props.label }}</slot>
    </label>

    <slot />
  </div>
</template>

<script lang="ts" setup>
type Props = {
  label: string;
};
const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
label {
  @apply select-none;
  font-variant: small-caps;
}
</style>
