<template>
  <div>
    <Checkbox :model-value="true" tri-state>Hello</Checkbox>

    <div style="width: 350px; height: 200px;" class="m-4 bg-red-100 relative z-0" id="popup-container">
      <Dropdown v-for="place in places">
        <template #trigger>
          <Button class="absolute" :style="place">Trigger</Button>
        </template>

        <DropdownItem>Hello, world</DropdownItem>
      </Dropdown>
    </div>

    <div class="relative w-96 h-96 bg-blue-100 z-50">
      Hello
    </div>
  </div>
</template>

<script setup lang="ts">
const places = computed(() => {
  const result = [];
  for (const y of [-10, 0, 50, 80, 100]) {
    for (const x of [-10, 0, 50, 80, 100]) {
      result.push({ left: x + '%', top: y + '%' });
    }
  }
  return result;
});
</script>
