<template>
  <div>
    <div :class="twMerge('inline', props.triggerClass)" @click.stop.prevent="show = true">
      <slot name="trigger" />
    </div>

    <dialog
      ref="dialog"
      class="relative m-auto h-fit max-h-full min-h-4 w-fit max-w-full min-w-32 overflow-x-hidden overflow-y-auto rounded-lg bg-white p-2 shadow-xl outline-none backdrop:bg-gray-900/70"
      v-bind="$attrs"
      @cancel.prevent.stop="cancel"
      @click.prevent.stop="onClick">
      <div class="dialog-inner">
        <slot v-if="props.closeable" name="close" :close="close">
          <div class="absolute top-1 right-2 cursor-pointer" @click="close()">
            <Icon name="close" />
          </div>
        </slot>
        <slot :close="close" />
      </div>
    </dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from '#imports';
import { twMerge, type ClassNameValue } from 'tailwind-merge';
defineOptions({
  inheritAttrs: false,
});

const show = defineModel<boolean | undefined>();
const emit = defineEmits<{
  open: [];
  close: [];
}>();
const props = withDefaults(
  defineProps<{
    closeable?: boolean;
    triggerClass?: ClassNameValue;
  }>(),
  {
    closeable: true,
  },
);

const dialog = ref<HTMLDialogElement>();

watchEffect(() => {
  if (show.value === true) {
    dialog.value?.showModal();
    emit('open');
  } else if (show.value === false) {
    dialog.value?.close();
    emit('close');
  }
});

function close() {
  if (props.closeable) {
    show.value = false;
  }
}

function cancel() {
  if (props.closeable) close();
}

function onClick(e: MouseEvent) {
  if (!(e.target as HTMLElement).closest('.dialog-inner')) {
    close();
  }
}
</script>
