<template>
  <Dropdown>
    <DropdownItem checkbox checked>Hello</DropdownItem>
    <DropdownItem checkbox>Hello</DropdownItem>
    <DropdownItem checkbox :checked="undefined">Hello</DropdownItem>
    <DropdownItem checkbox disabled>Hello</DropdownItem>
  </Dropdown>
</template>
