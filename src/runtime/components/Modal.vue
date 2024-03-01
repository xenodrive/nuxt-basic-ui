<template>
  <div :class="props.triggerClass" class="inline" @click.stop="show = !show">
    <slot name="trigger" />
  </div>
  <Teleport to="body">
    <div
      v-if="show"
      v-window-event:keydown="onKeyDown"
      class="fixed inset-0 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-70 p-4"
      style="z-index: 9999"
      @click.stop="close()">
      <div
        class="relative h-fit max-h-full w-fit max-w-full overflow-y-auto overflow-x-hidden rounded-lg bg-white p-2 shadow-xl"
        v-bind="$attrs"
        @click.stop>
        <slot v-if="props.closeable" name="close" :close="close">
          <div class="absolute right-2 top-1 cursor-pointer" @click="close()">
            <Icon name="close" />
          </div>
        </slot>
        <slot :close="close" />
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, watch } from '#imports';
defineOptions({
  inheritAttrs: false,
});
interface Props {
  modelValue?: boolean;
  closeable?: boolean;
  triggerClass?: unknown;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  closeable: true,
});
const emit = defineEmits(['open', 'close', 'update:modelValue']);

const show = ref(props.modelValue);
watch(
  () => props.modelValue,
  () => (show.value = props.modelValue),
);
watch(show, () => {
  if (show.value !== props.modelValue) {
    emit('update:modelValue', show.value);
    if (show.value) {
      emit('open');
    }
  }
});

function close() {
  if (!props.closeable) return;

  emit('update:modelValue', false);
  emit('close');

  show.value = false;
}

function onKeyDown(e: KeyboardEvent) {
  if (e.code === 'Escape') {
    close();
  }
}
</script>
