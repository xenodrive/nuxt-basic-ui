<template>
  <Modal v-model="modal" class="flex flex-col">
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
        <button
          :disabled="props.validator && !props.validator(editing)"
          class="appearance-none shadow-none outline-none"
          :class="twMerge('bg-indigo-500 hover:bg-indigo-600 focus:ring-0', props.commitClass)"
          @click="commit()">
          <slot name="label-commit">{{ props.commitLabel }}</slot>
        </button>
        <button :class="props.cancelClass" @click="modal = false">{{ props.cancelLabel }}</button>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup generic="T extends {}">
import { ref, watch } from '#imports';
import { twMerge, type ClassNameValue } from 'tailwind-merge';

type Props = {
  validator?: (v: T) => boolean;
  contentClass?: any;

  commitLabel?: string;
  commitClass?: ClassNameValue;

  cancelLabel?: string;
  cancelClass?: ClassNameValue;
};
const props = withDefaults(defineProps<Props>(), {
  commitLabel: 'OK',
  cancelLabel: 'Cancel',
});
const modal = ref(false);
const modelValue = defineModel<T>({ required: true });
const editing = ref<T>();

watch(modal, (open) => {
  if (open) editing.value = JSON.parse(JSON.stringify(modelValue.value));
});

function commit() {
  modelValue.value = editing.value as T;
  modal.value = false;
}

function update(value: T) {
  editing.value = JSON.parse(JSON.stringify(value));
}
</script>
