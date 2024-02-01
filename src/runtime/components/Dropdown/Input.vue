<template>
  <Input
    v-model="modelValue"
    icon-prepend="magnify"
    class="mb-1 w-full rounded border py-1 text-sm"
    :autofocus="props.autofocus"
    clearable />
</template>

<script lang="ts" setup>
type Props = {
  autofocus: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  autofocus: true,
});
const modelValue = defineModel<string>();
</script>
