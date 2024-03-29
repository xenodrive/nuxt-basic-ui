<template>
  <div class="box relative border">
    <label
      v-if="props.label"
      class="absolute -top-2.5 left-1 z-0 flex h-5 items-center whitespace-nowrap px-0.5 text-xs"
      :class="{ 'cursor-pointer': props.collapsible }"
      @click="collapsed = !collapsed">
      <template v-if="props.collapsible">
        <Icon
          name="mdi:menu-right"
          size="24px"
          class="relative -left-2 w-3 before:transition before:duration-75"
          :class="{ 'mdi-rotate-90': !collapsed }" />
      </template>
      {{ props.label }}
    </label>

    <slot :collapsed="props.collapsible && collapsed" :open="open" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from '#imports';
import { twcolor, type TwColor } from '../utils/twcolor';

type Props = {
  label?: string;
  collapsible?: boolean;
  collapse?: boolean;

  strikeColor?: TwColor;
};
const props = defineProps<Props>();

const collapsed = defineModel<boolean>({ default: false });
if (props.collapse) collapsed.value = props.collapse;

function open() {
  collapsed.value = false;
}

const strikeColor = computed(() => {
  return props.strikeColor ? twcolor(props.strikeColor) : 'white';
});
</script>

<style lang="scss" scoped>
label {
  @apply select-none;
  font-variant: small-caps;

  &:before {
    position: absolute;
    z-index: -1;
    background: v-bind(strikeColor);
    display: block;
    content: '';
    left: -2px;
    top: calc(0.625rem - 2px);
    width: calc(100% + 3px);
    height: 3px;
  }
}
</style>
