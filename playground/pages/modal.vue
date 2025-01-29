<template>
  <div class="bg-indigo-100 p-2">
    <Modal v-model="model">
      <template #trigger>Open</template>
      <div>Modal</div>
    </Modal>
  </div>
</template>

<script setup>
const model = ref(false);
</script>
