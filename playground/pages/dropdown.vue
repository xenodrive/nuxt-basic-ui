<template>
  <div>
    <Dropdown v-model="item">
      <DropdownItem checkbox checked>Hello</DropdownItem>
      <DropdownItem checkbox value="hello">Hello</DropdownItem>
      <DropdownItem checkbox value="world">World</DropdownItem>
      <DropdownItem checkbox :checked="undefined">Hello</DropdownItem>
      <DropdownDivider />
      <DropdownItem checkbox disabled>Hello</DropdownItem>
    </Dropdown>

    <Dropdown v-model="item">
      <DropdownItem radio checked>Hello</DropdownItem>
      <DropdownItem radio value="hello">Hello</DropdownItem>
      <DropdownItem radio value="world">World</DropdownItem>
      <DropdownItem radio :checked="undefined">Hello</DropdownItem>
      <DropdownDivider />
      <DropdownItem radio disabled>Hello</DropdownItem>
    </Dropdown>

    <Dropdown v-model="item" popup-class="mb-1" class="absolute right-3 bottom-3 sm:bottom-9">
      <template #trigger>
        <Button icon="layers" class="text-primary h-8 w-8 rounded bg-slate-50 text-lg shadow" />
      </template>

      <DropdownItem checkbox checked>Hello</DropdownItem>
      <DropdownItem checkbox value="hello">Hello</DropdownItem>
      <DropdownItem checkbox value="world">World</DropdownItem>
      <DropdownItem checkbox :checked="undefined">Hello</DropdownItem>
      <DropdownDivider />
      <DropdownItem checkbox disabled>Hello</DropdownItem>
    </Dropdown>
  </div>
</template>

<script lang="ts" setup>
const item = ref('hello');
</script>
