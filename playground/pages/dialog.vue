<template>
  <div class="bg-indigo-100 p-2">
    <div class="">
      <Dialog v-model="model">
        <template #trigger>Open</template>
        <div>dialog</div>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
const model = ref({});
</script>
