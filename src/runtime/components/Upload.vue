<template>
  <Component :is="props.tag ?? Button" @click="click()">
    <slot />
    <input ref="input" type="file" style="display: none" accept="application/json" @change="onchange($event)" />
  </Component>
</template>

<script lang="ts" setup>
import Button from './Button.vue';

import { ref } from '#imports';
type Props = {
  tag?: string;
};
const props = defineProps<Props>();
const input = ref();

const emit = defineEmits(['upload']);

function click() {
  input.value.click();
}

function onchange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target?.files?.[0];

  target.value = ''; // clear for next time
  emit('upload', file);
}
</script>
