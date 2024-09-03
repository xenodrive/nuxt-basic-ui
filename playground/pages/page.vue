<template>
  <Page class="h-screen!">
    <h1>The page</h1>

    <template #header>
      <div class="bg-slate-300">
        <div>header1</div>
        <div>header2</div>
      </div>
    </template>
    body

    <div class="w-[200px] border">full w</div>
    <div class="h-[200px] border">full h</div>

    <template #footer>
      <div class="flex gap-4 bg-slate-300">
        <div>footer1</div>
        <div>footer2</div>
      </div>
    </template>
  </Page>
</template>
