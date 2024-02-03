<template>
  <NuxtLink v-slot="{ navigate }" :to="props.to" custom>
    <div
      ref="$el"
      class="item input-candidate-item"
      :aria-disabled="props.disabled"
      :class="twMerge(['px-3 py-2', $attrs.class as ClassNameValue])"
      :style="$attrs.style as any"
      @click="onClick(navigate)">
      <Icon
        v-if="props.checkbox"
        class="text-indigo-500"
        :name="
          props.checked === undefined
            ? 'minus-box-outline'
            : props.checked
              ? 'checkbox-marked'
              : 'checkbox-blank-outline'
        " />
      <Icon
        v-else-if="props.radio"
        class="text-indigo-500"
        :name="props.checked ? 'radiobox-marked' : 'radiobox-blank'" />
      <Icon v-else-if="props.icon" :name="props.icon" />
      <div class="flex-1">
        <slot />
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { inject, ref, useAttrs } from '#imports';
import { type ClassNameValue, twMerge } from 'tailwind-merge';

defineOptions({
  inheritAttrs: false,
});
type Props = {
  value?: unknown;
  icon?: string;
  disabled?: boolean;
  to?: string;

  checkbox?: boolean;
  radio?: boolean;
  checked?: boolean | undefined;
};
const props = defineProps<Props>();

const $el = ref<HTMLElement>();

type Selectable = {
  select(x: unknown): void;
};
const api = inject<Selectable>('x-selectable');

const emit = defineEmits(['click']);

const $attrs = useAttrs();

function onClick(navigate: (to: string) => void) {
  if (props.disabled) return;

  if (props.to) {
    navigate(props.to);
    emit('click', props.value);
    return;
  }

  api?.select(props.value);
  emit('click', props.value);
}
</script>

<style lang="scss" scoped>
.item {
  @apply app-hoverable flex cursor-pointer
    select-none
    items-baseline
    gap-2
    rounded aria-selected:bg-slate-200;
}
</style>
