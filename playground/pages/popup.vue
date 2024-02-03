<template>
  <div>
    <Checkbox checked tri-state>Hello</Checkbox>
    <Checkbox checked tri-state color="red-500">Hello</Checkbox>
    <Checkbox checked disabled color="red-500">Hello</Checkbox>

    <div id="popup-container" style="width: 350px; height: 200px" class="relative z-0 m-4 bg-red-100">
      <Dropdown v-for="(place, idx) in places" :key="idx">
        <template #trigger>
          <Button class="absolute" :style="place">Trigger</Button>
        </template>

        <DropdownItem>Hello, world</DropdownItem>
      </Dropdown>
    </div>

    <div class="relative z-50 h-96 w-96 bg-blue-100">Hello</div>
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
