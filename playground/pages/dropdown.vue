<template>
  <Dropdown v-model="item">
    <DropdownItem checkbox checked>Hello</DropdownItem>
    <DropdownItem checkbox value="hello">Hello</DropdownItem>
    <DropdownItem checkbox :checked="undefined">Hello</DropdownItem>
    <DropdownDivider />
    <DropdownItem checkbox disabled>Hello</DropdownItem>
  </Dropdown>
</template>

<script lang="ts" setup>
const item = ref('hello');
</script>
