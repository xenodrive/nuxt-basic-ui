<template>
  <div class="m-2 flex gap-1">
    <Badge>Badge</Badge>
    <Badge icon="map-marker" title="Title">Badge</Badge>
    <Badge color="red-500">Badge</Badge>
    <Badge color="yellow-400">Badge</Badge>
    <Badge icon="map-marker" color="indigo-200">Badge</Badge>
    <Badge icon="map-marker" color="indigo-200">Badge<template #sublabel>Hello</template></Badge>
    <Badge title="Hello">Badge</Badge>
    <Badge color="indigo-500" color-title="indigo-200" title="Hello">Badge</Badge>
    <Badge
      color="transparent"
      color-title="transparent"
      color-title-text="indigo-900"
      color-text="indigo-500"
      class="outline outline-1 outline-indigo-500"
      title="Hello"
      >Badge</Badge
    >
  </div>
</template>
