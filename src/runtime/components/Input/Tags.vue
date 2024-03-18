<template>
  <div :class="twMerge('inline-flex items-center gap-1', props.class)" @click="onClick()">
    <div v-if="prependExists" class="flex items-center justify-center">
      <slot name="prepend">
        <Icon
          v-if="props.iconPrepend"
          :name="props.iconPrepend"
          class="p-0.5 text-gray-400"
          :class="props.iconPrependClass"
          @click="emit('click-icon-prepend')" />
      </slot>
    </div>

    <div class="flex flex-1 flex-wrap gap-1">
      <div v-for="(tag, tidx) in tags" :key="tidx" class="flex flex-none items-center">
        <slot name="tag" :tag="tag">
          <Dropdown :disabled="!slots['tag-dropdown'] || tag.clickable === false">
            <template #trigger>
              <Tag
                class="max-w-[12rem] text-xs"
                :outlined="props.outlined"
                :color="tag.color"
                :icon="tag.icon"
                @click="emit('click-tag', tag)">
                <span class="select-none overflow-hidden text-ellipsis whitespace-nowrap px-0.5">{{
                  tag.name ?? tag
                }}</span>
                <Icon
                  v-if="tag?.clearable !== false"
                  name="close"
                  class="-ml-1 -mr-0.5 inline-block cursor-pointer rounded-full p-0.5 hover:bg-black/10"
                  @click.stop="remove(tidx)" />
              </Tag>
            </template>

            <slot name="tag-dropdown" :tag="tag" />
          </Dropdown>
        </slot>
      </div>

      <Dropdown
        v-model:active="active"
        :inactive="props.inactive"
        :select-first-candidate-on-enter-key="props.selectFirstCandidateOnEnterKey"
        :margin="6"
        class="flex-grow basis-28"
        @select="
          emit('select', $event);
          onClick();
        ">
        <template #trigger>
          <Input
            ref="$input"
            v-model="input"
            class="w-full"
            @backspace-on-empty="remove()"
            @typing="active = true"
            @focus="onInputFocus"
            @click.stop="onInputClick"
            @escape="emit('escape')" />
        </template>
        <slot />
      </Dropdown>
    </div>

    <div v-if="appendExists" class="ml-auto flex items-center justify-center whitespace-nowrap">
      <slot name="append">
        <Icon
          v-if="props.iconAppend"
          :name="props.iconAppend"
          :class="props.iconAppendClass"
          class="p-0.5 text-gray-400"
          @click="emit('click-icon-append')" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup generic="T extends Tag">
import { computed, ref, useSlots } from '#imports';
import { twMerge, type ClassNameValue } from 'tailwind-merge';

export type Tag = {
  name: string;
  color?: string;
  icon?: string;
  clearable?: boolean;
  clickable?: boolean;
  value?: any;
};

type Props = {
  outlined?: boolean;

  // input
  iconPrepend?: string;
  iconPrependClass?: string;
  iconAppend?: string;
  iconAppendClass?: string;

  // dropdown
  inactive?: boolean;
  selectFirstCandidateOnEnterKey?: boolean;

  class?: ClassNameValue;
};
const props = defineProps<Props>();

const slots = useSlots();

const tags = defineModel<T[]>('tags', { required: true });
const input = defineModel<string>();
const active = defineModel<boolean>('active');

const emit = defineEmits([
  'select',
  'input',
  'click-icon-prepend',
  'click-icon-append',
  'click-tag',
  'escape',
  'focus',
]);

function remove(idx?: number) {
  if (idx === undefined) idx = tags.value.length - 1;
  if (idx < 0) return;

  if (tags.value[idx]?.clearable !== false) {
    const newTags = [...tags.value];
    newTags.splice(idx, 1);
    tags.value = newTags;
  }
}

const dontActivate = ref(false);
function onInputFocus(e: Event) {
  emit('focus', e);

  dontActivate.value = true;
  setTimeout(() => {
    dontActivate.value = false;
  }, 100);
}

function onInputClick() {
  if (!dontActivate.value) {
    // toggle
    active.value = !active.value;
  }
}

const $input = ref();
function onClick() {
  $input.value?.focus();
}

const $slots = useSlots();

const prependExists = computed(() => Boolean($slots.prepend ?? props.iconPrepend));
const appendExists = computed(() => Boolean($slots.append ?? props.iconAppend));
</script>
