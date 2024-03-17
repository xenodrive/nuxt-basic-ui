<template>
  <div class="flex flex-col items-center justify-center">
    <div class="mb-2 flex items-center justify-center border">
      <img v-if="src" :src="src" />
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from '#imports';
import { Byte, Encoder } from '@nuintun/qrcode';

type Props = {
  code: string;
  size?: number;
};
const props = withDefaults(defineProps<Props>(), {
  size: 8,
});

const src = computed(() => {
  if (!props.code) return undefined;

  const qrcode = new Encoder();
  return qrcode.encode(new Byte(props.code)).toDataURL(props.size);
});
</script>
