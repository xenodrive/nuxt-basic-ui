<template>
  <div class="bg-indigo-100 p-2">
    <Dialog v-model="model" commit-color="red-500" commit-class="px-2 rounded">
      <template #trigger>Open</template>
      <div>dialog</div>
    </Dialog>
  </div>
</template>

<script setup>
const model = ref({});
</script>
