<template>
  <NuxtLink v-slot="{ navigate }" :to="props.to" custom>
    <div
      ref="$el"
      class="dropdown-item input-candidate-item"
      :aria-disabled="props.disabled"
      :class="[
        $attrs.class as ClassNameValue,
        { 'dropdown-item-active': props.active || (props.value !== undefined && api?.selected.value === props.value) },
      ]"
      :style="$attrs.style as any"
      @click="onClick(navigate)">
      <Checkbox v-if="props.checkbox" :model-value="props.checked" readonly />
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
import { inject, ref, useAttrs, type ComputedRef } from '#imports';
import { type ClassNameValue } from 'tailwind-merge';

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
