<template>
  <div class="label">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.label {
  @apply min-w-[12rem] select-none p-2 text-xs text-gray-500;
  font-variant-caps: small-caps;
}
</style>
