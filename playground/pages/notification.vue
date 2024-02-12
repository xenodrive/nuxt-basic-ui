<template>
  <div>
    <Notifications notification-class="rounded-full" />
    <Button @click="message('hello', { duration: 10000, closeable: true })">Hello</Button><br />
    <Button @click="error('error')">Error</Button><br />
    <Button @click="warning('warning')">warning</Button><br />
    <Button @click="info('info')">Info</Button><br />
  </div>
</template>

<script setup lang="ts">
const { message, error, warning, info } = useNotification();
</script>
