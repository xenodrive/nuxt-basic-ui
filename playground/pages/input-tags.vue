<template>
  <div class="p-2">
    <InputTags
      v-model="text"
      v-model:tags="tags"
      select-first-candidate-on-enter-key
      class="rounded border border-black"
      @select="tags.push($event)">
      <DropdownItem :value="text">item</DropdownItem>
    </InputTags>

    <div class="w-96">
      <InputTags
        v-model="text"
        v-model:tags="tags"
        select-first-candidate-on-enter-key
        class="w-full rounded border border-black"
        @select="tags.push($event)">
        <DropdownItem :value="text">item</DropdownItem>
      </InputTags>
    </div>
  </div>
</template>

<script setup>
const tags = ref([]);
const text = ref('hello');
</script>
