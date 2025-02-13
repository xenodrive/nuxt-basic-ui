<template>
  <Page>
    <div :style="{ color: c.darken(0.5).toString() }">darken(0.5): {{ c.darken(0.5).resolved() }}</div>
    <div :style="{ color: c.toString() }">base: {{ c.resolved() }}</div>
    <div :style="{ color: c.lighten(0.5).toString() }">lighten(0.5): {{ c.lighten(0.5).resolved() }}</div>

    <Input v-model="color" class="border-b" />
  </Page>
</template>

<script lang="ts" setup>
const color = ref('red-500');

const c = computed(() => twcolor(color.value));
</script>
