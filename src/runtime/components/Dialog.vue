<template>
  <Modal v-model="modal" :closeable="props.closeable !== false">
    <template #trigger>
      <slot name="trigger" />
    </template>

    <div class="flex flex-col">
      <div class="max-h-full flex-grow overflow-auto" :class="props.contentClass">
        <template v-if="editing != null">
          <slot :value="editing" :commit="commit" :cancel="cancel" />
        </template>
      </div>

      <div v-if="editing != null" class="mt-2 flex items-baseline justify-between">
        <div>
          <slot name="footer" :value="editing" />
        </div>
        <div class="flex justify-end gap-2">
          <Button
            :disabled="props.validator && !props.validator(editing as T)"
            class="commit"
            :class="props.commitClass"
            :color="props.commitColor"
            @click="commit()">
            <slot name="label-commit">{{ props.commitLabel }}</slot>
          </Button>
          <Button class="cancel" :class="props.cancelClass" :color="props.cancelColor" @click="cancel()">
            {{ props.cancelLabel }}
          </Button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup generic="T extends Objectish">
import { nextTick, ref, watch } from '#imports';
import { createDraft, finishDraft, type Draft, type Objectish } from 'immer';
import type { ClassNameValue } from 'tailwind-merge';

type Props = {
  validator?: (v: T) => boolean;
  confirm?: (v: T) => Promise<boolean>;

  contentClass?: any;

  commitLabel?: string;
  commitClass?: ClassNameValue;
  commitColor?: string;

  cancelLabel?: string;
  cancelClass?: ClassNameValue;
  cancelColor?: string;

  closeable?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  commitLabel: 'OK',
  cancelLabel: 'Cancel',
  closeable: true,
});
const modal = defineModel<boolean | undefined>('active', { default: undefined });
const modelValue = defineModel<T>({ required: true });
const editing = ref<Draft<T>>();

const emit = defineEmits(['close', 'commit', 'cancel']);

watch(modal, (open) => {
  if (open) {
    editing.value = createDraft(modelValue.value);
  } else {
    emit('close');
  }
});

async function commit() {
  if (!editing.value) return;
  if (props.confirm && !(await props.confirm(editing.value as T))) return;

  const obj = finishDraft(editing.value) as T;
  modelValue.value = obj;
  emit('commit', obj as T);
  editing.value = undefined;

  await nextTick();
  modal.value = false;
}

async function cancel() {
  emit('cancel');
  editing.value = undefined;

  await nextTick();
  modal.value = false;
}
</script>
