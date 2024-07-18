<template>
  <Popup
    ref="popup"
    v-model="isActive"
    v-window-event:keydown="onKeyDown"
    :popup-class="twMerge('dropdown overflow-hidden', props.popupClass)">
    <template #trigger>
      <slot name="trigger">
        <Button :icon="props.icon" :class="props.buttonClass">
          <slot name="label">
            <slot name="value" :value="props.modelValue">
              {{ props.label ?? props.modelValue }}
            </slot>
          </slot>
          <Icon :name="props.menuIcon || 'menu-down'" />
        </Button>
      </slot>
    </template>

    <slot :close="close" />
  </Popup>
</template>

<script lang="ts" setup generic="T extends any">
import { computed, provide, ref, watch } from '#imports';
import { type ClassNameValue, twMerge } from 'tailwind-merge';

type Props = {
  icon?: string;
  menuIcon?: string;
  modelValue?: T;

  label?: string;

  buttonClass?: ClassNameValue;
  popupClass?: ClassNameValue;

  autoClose?: boolean;

  selectFirstCandidateOnEnterKey?: boolean;
};

const popup = ref();
const props = defineProps<Props>();
const emit = defineEmits(['select', 'update:modelValue']);

const isActive = defineModel<boolean>('active', { default: false });
watch(isActive, (active) => {
  if (!active) makeElementActive(undefined);
});

function onArrowKey(evt: Event, key: 'up' | 'down') {
  if (!isActive.value) return false;

  const list = Array.from<HTMLElement>(
    popup.value?.$popup?.querySelectorAll('.input-candidate-item:not([aria-disabled="true"])') ?? [],
  );
  if (!list || list.length === 0) return false;

  if (evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  let activeIndex = list.findIndex((x) => x.getAttribute('aria-selected') === 'true');

  switch (key) {
    case 'up':
      activeIndex = activeIndex >= 0 ? (activeIndex - 1 + list.length) % list.length : list.length - 1;
      break;
    case 'down':
      activeIndex = activeIndex >= 0 ? (activeIndex + 1 + list.length) % list.length : 0;
      break;
  }

  makeElementActive(list[activeIndex]);

  return true;
}

const activeNode = ref<HTMLElement>();

function makeElementActive(node: HTMLElement | undefined) {
  if (activeNode.value) activeNode.value.setAttribute('aria-selected', 'false');
  activeNode.value = node;
  if (activeNode.value) activeNode.value.setAttribute('aria-selected', 'true');
}

function onKeyDown(e: KeyboardEvent) {
  const modifiers = [];
  modifiers.push(e.shiftKey ? 'S-' : '');
  modifiers.push(e.ctrlKey ? 'C-' : '');
  modifiers.push(e.altKey ? 'A-' : '');
  const key = modifiers.join('') + (e.key ?? e.code);

  if (isActive.value && key === 'ArrowUp') return onArrowKey(e, 'up');
  if (isActive.value && key === 'ArrowDown') return onArrowKey(e, 'down');
  if (isActive.value && key === 'Escape') {
    isActive.value = false;
    return true;
  }

  if (isActive.value && key === 'Enter') {
    // NB: This includes disabled items
    const list = Array.from<HTMLElement>(popup.value?.$popup?.querySelectorAll('.input-candidate-item') ?? []);

    let activeIndex = list.findIndex((x) => x.getAttribute('aria-selected') === 'true');
    if (activeIndex < 0 && props.selectFirstCandidateOnEnterKey) {
      activeIndex = 0;
    }

    if (activeIndex >= 0) {
      const node = list[activeIndex];
      if (node.ariaDisabled !== 'true') node.click();
    }

    return true;
  }

  if (e.key === 'Tab') {
    if (isActive.value) return onArrowKey(e, 'down');
    return true;
  }

  return true;
}

function close() {
  isActive.value = false;
}

const api = {
  select(item: T) {
    if (props.autoClose) close();
    if (item !== undefined) emit('update:modelValue', item);
    emit('select', item);
  },

  close,

  selected: computed(() => props.modelValue),
};

provide('x-selectable', api);
</script>
