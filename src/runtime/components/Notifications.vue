<template>
  <Teleport :to="props.teleport">
    <div
      class="pointer-events-none"
      :class="twMerge('fixed left-0 right-0 top-4 flex flex-col items-center justify-center gap-2', props.class)">
      <template v-for="item in notifications" :key="item.id">
        <Transition :name="props.transitionName" appear>
          <div
            v-if="item.shown"
            class="pointer-events-auto flex items-center justify-center transition-all"
            :class="twMerge('rounded px-1 py-1', 'bg-slate-200', props.notificationClass, classNameFor(item))">
            <slot :type="item.type" :message="item.message" :closeable="item.closeable" :close="item.close">
              <div class="mx-1">{{ item.message }}</div>
              <Button
                v-if="item.closeable"
                icon="close"
                class="flex-none rounded-full leading-none"
                @click="item.close()" />
            </slot>
          </div>
        </Transition>
      </template>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { twMerge, type ClassNameValue } from 'tailwind-merge';
import useNotification from '../composables/useNotification';

const props = withDefaults(
  defineProps<{
    class?: ClassNameValue;
    teleport?: string | null;
    transitionName?: string;
    notificationClass?: ClassNameValue;
    messageClass?: ClassNameValue;
    warningClass?: ClassNameValue;
    errorClass?: ClassNameValue;
    infoClass?: ClassNameValue;
  }>(),
  {
    teleport: 'body',
    transitionName: 'notification-message',
    notificationClass: '',
    messageClass: '',
    warningClass: '',
    errorClass: '',
    infoClass: '',
  },
);

const { notifications } = useNotification();

function classNameFor(item: (typeof notifications.value)[0]) {
  switch (item.type) {
    default:
    case 'message':
      return twMerge('bg-slate-200', props.messageClass);
    case 'error':
      return twMerge('bg-red-500 text-invert', props.errorClass);
    case 'warning':
      return twMerge('bg-yellow-500', props.warningClass);
    case 'info':
      return twMerge('bg-blue-500 text-invert', props.infoClass);
  }
}
</script>

<style scoped>
.notification-message-enter-active {
  @apply ease-in-out;
}
.notification-message-leave-active {
  @apply ease-in-out;
}
.notification-message-enter-from,
.notification-message-leave-to {
  @apply -translate-y-full opacity-0;
}
.notification-message-enter-to,
.notification-message-leave-from {
  @apply translate-y-0 opacity-100;
}
</style>
