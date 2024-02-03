<template>
  <div class="bg-indigo-100 p-2">
    <div class="border border-black">
      <Box label="The box" strike-color="indigo-100" class="flex gap-1 border-black">
        <Tag>Tag</Tag>
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
      </Box>
    </div>
  </div>
</template>
