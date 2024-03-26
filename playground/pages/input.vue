<template>
  <div class="p-2">
    <Input v-model="text" class="rounded border border-black" />
    text: {{ text }}
  </div>
</template>

<script setup>
const text = ref('hello');
</script>
