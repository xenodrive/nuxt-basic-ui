<template>
  <span
    class="badge rounded-sm text-xs"
    :class="twMerge('inline-flex h-fit w-fit flex-none overflow-hidden whitespace-nowrap select-none', props.class)"
    :style="style">
    <span
      v-if="$slots.title || props.title || props.icon"
      class="title inline-flex items-center gap-0.5 px-1 py-0.5"
      :class="props.classTitle">
      <Icon v-if="props.icon" :name="props.icon" />
      <slot name="title">{{ props.title }}</slot>
    </span>
    <span class="value inline-flex items-center gap-0.5 px-1 py-0.5" :class="props.classValue">
      <Icon v-if="props.iconValue" :name="props.iconValue" />
      <slot>{{ props.value }}</slot>
    </span>
  </span>
</template>

<script lang="ts" setup>
import type { TwColor } from '#imports';
import { computed, twcolor, useSlots } from '#imports';
import { twMerge, type ClassNameValue } from 'tailwind-merge';

const $slots = useSlots();

type Props = {
  color?: TwColor | string;
  colorText?: TwColor | string;

  colorTitle?: TwColor | string;
  colorTitleText?: TwColor | string;

  title?: string;
  value?: string;

  class?: ClassNameValue;
  classTitle?: ClassNameValue;
  classValue?: ClassNameValue;

  icon?: string;
  iconValue?: string;
};

const props = defineProps<Props>();

const style = computed(() => {
  const bgTitle = twcolor(props.colorTitle);
  const fgTitle = twcolor(props.colorTitleText, twcolor(bgTitle, '--badge-title-background-color').textColor());
  const bgValue = twcolor(props.color);
  const fgValue = twcolor(props.colorText, twcolor(bgValue, '--badge-value-background-color').textColor());

  return {
    '--badge-title-background-color': bgTitle.toString(),
    '--badge-title-text-color': fgTitle.toString(),
    '--badge-value-background-color': bgValue.toString(),
    '--badge-value-text-color': fgValue.toString(),
  };
});
</script>

<style scoped>
.badge {
  /* prettier-ignore */
  --badge-title-text-shadow-color: rgb(from var(--badge-title-text-color) r g b / var(--badge-title-text-shadow-opacity));
  /* prettier-ignore */
  --badge-title-text-shadow-color: rgb(from var(--badge-value-text-color) r g b / var(--badge-value-text-shadow-opacity));

  .title {
    color: var(--badge-title-text-color);
    background-color: var(--badge-title-background-color);

    text-shadow: 0px 1px var(--badge-title-text-shadow-color);
  }

  .value {
    color: var(--badge-value-text-color);
    background-color: var(--badge-value-background-color);

    text-shadow: 0px 1px var(--badge-value-text-shadow-color);
  }
}
</style>
