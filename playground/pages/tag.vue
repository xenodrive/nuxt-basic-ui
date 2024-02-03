<template>
  <div class="m-2 flex gap-1">
    <Tag>Tag</Tag>
    <Tag sublabel="sublabel">Tag</Tag>
    <Tag color="red-500">Tag</Tag>
    <Tag color="yellow-400">Tag</Tag>
    <Tag icon="map-marker" color="indigo-200">Tag</Tag>
    <Tag icon="map-marker" color="indigo-200">Tag<template #sublabel>Hello</template></Tag>
    <Tag sublabel="Hello">Tag</Tag>
    <Tag color="indigo-500" color-sub="indigo-200" sublabel="Hello">Tag</Tag>
    <Tag
      color="transparent"
      color-sub="transparent"
      color-sub-text="indigo-900"
      color-text="indigo-500"
      outline="indigo-500"
      sublabel="Hello"
      >Tag</Tag
    >
  </div>
</template>
