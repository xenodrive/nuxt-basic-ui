<template>
  <Page>
    <template #header>
      <div class="bg-slate-300">
        <div>header1</div>
        <div>header2</div>
      </div>
    </template>

    <h1>The page</h1>

    body

    <div class="w-[1000px] border">w</div>
    <div class="inline-block h-[1000px] border">h</div>

    <template #footer>
      <div class="flex justify-between bg-slate-300">
        <div>footer1</div>
        <div>footer2</div>
      </div>
    </template>
  </Page>
</template>
