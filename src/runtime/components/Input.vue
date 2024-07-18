<template>
  <div :class="twMerge('relative inline-flex flex-col', props.class)" @click="focus">
    <div :class="twMerge('inline-flex items-baseline', props.inputClass)">
      <div v-if="prependExists" class="absolute bottom-0 left-0 top-0 flex w-8 items-center justify-center">
        <slot name="prepend">
          <Icon
            v-if="props.iconPrepend"
            :name="props.iconPrepend"
            class="text-gray-400"
            @click="emit('click-icon-prepend')" />
        </slot>
      </div>

      <input
        ref="$input"
        v-focus="props.autofocus"
        :value="value"
        :type="inputType"
        class="inline-block bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:text-gray-500"
        :class="[prependExists ? 'pl-8' : '', appendExists ? 'pr-8' : '']"
        style="text-align: inherit"
        :placeholder="props.placeholder"
        :size="props.size"
        :maxlength="props.maxlength ?? props.size"
        :style="{ width: props.size ? `${props.size}ch` : '100%' }"
        :readonly="props.disabled"
        :disabled="props.disabled"
        :autofocus="props.autofocus"
        :autocomplete="String(props.autocomplete)"
        @focus="emit('focus', $event)"
        @click="emit('click', $event)"
        @input="onInput"
        @keydown="onKeydown" />

      <div v-if="appendExists" class="absolute bottom-0 right-0 top-0 flex w-8 items-center justify-center">
        <Icon v-if="props.clearable && value" name="close" class="cursor-pointer text-gray-400" @click="value = ''" />
        <slot v-else name="append">
          <Icon
            v-if="props.iconAppend"
            :name="props.iconAppend"
            class="text-gray-400"
            @click="emit('click-icon-append')" />
        </slot>
      </div>
    </div>

    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, useSlots, watch } from '#imports';
import { twMerge, type ClassNameValue } from 'tailwind-merge';

type Props = {
  type?: 'string' | 'text' | 'list' | 'number' | 'password';

  size?: number | string;
  maxlength?: number | string;

  modelValue?: string | number;

  // list
  list?: string[] | object[];

  disabled?: boolean;

  class?: ClassNameValue;
  inputClass?: ClassNameValue;

  autocomplete?: boolean | string;

  placeholder?: string;

  iconPrepend?: string;
  iconAppend?: string;

  prependWidth?: string;
  appendWidth?: string;

  autofocus?: boolean;

  clearable?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  autofocus: false,
});

watch(
  () => props.autofocus,
  (v, o) => {
    if (o !== v && v) {
      nextTick(() => $input.value?.focus());
    }
  },
);

const emit = defineEmits([
  'update:modelValue',
  'click',
  'focus',
  'click-icon-prepend',
  'click-icon-append',
  'backspace-on-empty',
  'typing',
  'escape',
]);

const $input = ref<HTMLInputElement>();

const value = defineModel<string>({ default: '' });

function focus() {
  if ($input.value && $input.value !== document.activeElement) {
    $input.value?.focus();
  }
}

const inputType = computed(() => {
  switch (props.type) {
    case 'password':
      return 'password';
    default:
      return 'text';
  }
});

const $slots = useSlots();

const prependExists = computed(() => Boolean($slots.prepend ?? props.iconPrepend));
const appendExists = computed(() => Boolean($slots.append ?? props.iconAppend));

function onInput(e: Event) {
  value.value = (e.target as HTMLInputElement).value;
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Backspace' && value.value === '') {
    emit('backspace-on-empty');
    return;
  }
  if (e.key === 'Enter') return;
  emit(e.key === 'Escape' ? 'escape' : 'typing');
}

defineExpose({
  focus,
});
</script>
