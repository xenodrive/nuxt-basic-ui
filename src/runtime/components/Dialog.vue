<template>
  <Modal v-model="modal" class="dialog flex flex-col" :closeable="props.closeable !== false">
    <template #trigger><slot name="trigger" /></template>

    <div class="max-h-full flex-grow overflow-scroll" :class="props.contentClass">
      <template v-if="editing != null">
        <slot :value="editing" :update="update" />
      </template>
    </div>

    <div v-if="editing != null" class="mt-2 flex items-baseline justify-between">
      <div>
        <slot name="footer" :value="editing" :update="update" />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          :disabled="props.validator && !props.validator(editing)"
          class="commit"
          :class="props.commitClass"
          @click="commit()">
          <slot name="label-commit">{{ props.commitLabel }}</slot>
        </Button>
        <Button class="cancel" :class="props.cancelClass" @click="modal = false">{{ props.cancelLabel }}</Button>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup generic="T extends {}">
import { ref, watch } from '#imports';
import { type ClassNameValue } from 'tailwind-merge';
import { theme } from '../utils/twcolor';

type Props = {
  validator?: (v: T) => boolean;
  confirm?: (v: T) => Promise<boolean>;

  contentClass?: any;

  commitLabel?: string;
  commitClass?: ClassNameValue;

  cancelLabel?: string;
  cancelClass?: ClassNameValue;

  closeable?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  commitLabel: theme('dialog.commit.label'),
  cancelLabel: theme('dialog.cancel.label'),
  closeable: true,
});
const modal = defineModel<boolean>('active', { default: false });
const modelValue = defineModel<T>({ required: true });
const editing = ref<T>();

const emit = defineEmits(['close']);

watch(
  modal,
  (open) => {
    if (open) {
      editing.value = JSON.parse(JSON.stringify(modelValue.value));
    } else {
      emit('close');
    }
  },
  { immediate: true },
);

async function commit() {
  if (props.confirm && !(await props.confirm(editing.value as T))) return;
  modelValue.value = editing.value as T;
  modal.value = false;
}

function update(value: T) {
  editing.value = JSON.parse(JSON.stringify(value));
}
</script>
