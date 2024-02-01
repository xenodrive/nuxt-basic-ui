<template>
  <span :class="iconClass" :style="iconStyle"><slot /></span>
</template>

<script lang="ts" setup>
import { computed } from '#imports';

type Props = {
  icon?: string;
  name?: string;
  size?: number | string;
  iconClass?: string | object | (string | object)[];
};
const props = defineProps<Props>();

const iconName = computed(() => {
  return `mdi-` + (props.name ?? props.icon ?? '').replace(/^mdi:/, '');
});

const iconClass = computed(() => {
  const propsIconClass = Array.isArray(props.iconClass) ? props.iconClass : [props.iconClass];
  return ['mdi', iconName.value, ...propsIconClass];
});

const iconStyle = computed(() => {
  return [
    {
      'font-size': typeof props.size === 'number' ? `${props.size}px` : props.size || 'inherit',
      'line-height': 1,
    },
  ];
});
</script>
