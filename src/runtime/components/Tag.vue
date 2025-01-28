<template>
  <span
    class="tag rounded-full px-1.5 py-0.5 text-xs"
    :class="twMerge('inline-flex items-baseline gap-1 overflow-hidden whitespace-nowrap select-none', props.class)"
    :style="style">
    <Icon v-if="props.icon" :name="props.icon" />
    <slot>{{ props.name }}</slot>
  </span>
</template>

<script lang="ts" setup>
import { computed, twcolor } from '#imports';
import { twMerge } from 'tailwind-merge';

type Props = {
  color?: string;
  colorText?: string;

  icon?: string;
  name?: string;

  class?: string;
};

const props = defineProps<Props>();

const style = computed(() => {
  const bgcolor = twcolor(props.color);
  const fgcolor = twcolor(props.colorText, twcolor(bgcolor, '--tag-background-color').textColor());
  return {
    '--tag-background-color': bgcolor.toString(),
    '--tag-text-color': fgcolor.toString(),
  };
});
</script>

<style scoped>
@layer base {
  .tag {
    background-color: var(--tag-background-color);
    color: var(--tag-text-color);
  }
}
</style>
