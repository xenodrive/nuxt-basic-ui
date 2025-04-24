<template>
  <NuxtLink v-slot="{ navigate }" :to="props.to" custom>
    <div
      ref="$el"
      class="dropdown-item input-candidate-item disabled-style hover-style flex cursor-pointer items-baseline gap-2 rounded bg-white px-3 py-2 select-none"
      :aria-disabled="props.disabled"
      :class="[
        $attrs.class as ClassNameValue,
        { 'dropdown-item-active': props.active || (props.value !== undefined && api?.selected.value === props.value) },
      ]"
      :style="[$attrs.style as StyleValue, style]"
      @click="onClick($event, navigate)">
      <Icon
        v-if="props.checkbox"
        class="icon"
        :name="
          props.checked === undefined ? 'minus-box' : props.checked ? 'checkbox-marked' : 'checkbox-blank-outline'
        " />
      <Icon
        v-else-if="props.radio"
        class="icon"
        :name="
          props.checked === undefined
            ? 'radiobox-indeterminate-variant'
            : props.checked
              ? 'radiobox-marked'
              : 'radiobox-blank'
        " />
      <Icon v-else-if="props.icon" :name="props.icon" />
      <div class="flex-1">
        <slot />
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { computed, inject, ref, twcolor, type ComputedRef } from '#imports';
import type { ClassNameValue } from 'tailwind-merge';
import type { StyleValue } from 'vue';

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

  active?: boolean | undefined;
};
const props = defineProps<Props>();

const $el = ref<HTMLElement>();

type Selectable = {
  select(x: unknown): void;
  selected: ComputedRef<unknown>;
  close(): void;
};
const api = inject<Selectable>('x-selectable');

const emit = defineEmits(['click']);

function onClick(e: MouseEvent, navigate: (e?: MouseEvent) => void) {
  if (props.disabled) return;

  if (props.to) {
    api?.close();
    navigate(e);
    emit('click', props.value);
    return;
  }

  api?.select(props.value);
  emit('click', props.value);
}

const style = computed(() => {
  const fgcolor = twcolor('--dropdown-item-active-background-color').textColor();
  return {
    '--dropdown-item-active-text-color': fgcolor.toString(),
  };
});
</script>

<style scoped>
.dropdown-item {
  &.dropdown-item-active {
    background-color: var(--dropdown-item-active-background-color);
    color: var(--dropdown-item-active-text-color);

    .icon {
      color: var(--dropdown-item-active-icon-color);
    }
  }

  .icon {
    color: var(--dropdown-item-icon-color);
  }
}
</style>
