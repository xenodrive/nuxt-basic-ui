<template>
  <Teleport :to="props.teleport">
    <div
      class="notification pointer-events-none"
      :class="twMerge('fixed top-4 right-0 left-0 z-50 flex flex-col items-center justify-center gap-2', props.class)">
      <template v-for="item in notifications" :key="item.id">
        <Transition :name="props.transitionName" appear>
          <div
            v-if="item.shown"
            class="pointer-events-auto flex items-center justify-center transition-all"
            :class="[twMerge('rounded px-1 py-1', props.notificationClass), `notification-type-${item.type}`]"
            :style="style">
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
import { computed, twcolor, type TwColor } from '#imports';
import { twMerge, type ClassNameValue } from 'tailwind-merge';
import useNotification from '../composables/useNotification';

const props = withDefaults(
  defineProps<{
    class?: ClassNameValue;
    teleport?: string | null;
    transitionName?: string;
    notificationClass?: ClassNameValue;
    messageColor?: TwColor;
    warningColor?: TwColor;
    errorColor?: TwColor;
    infoColor?: TwColor;
  }>(),
  {
    teleport: 'body',
    transitionName: 'notification-message',
    notificationClass: '',
  },
);

const { notifications } = useNotification();

const style = computed(() => {
  const fgcolor = twcolor('--notification-background-color').textColor();
  return {
    '--notification-text-color': fgcolor.toString(),
  };
});
</script>

<style scoped>
.notification {
  .notification-message-enter-active {
    animation-timing-function: var(--ease-in-out);
  }
  .notification-message-leave-active {
    animation-timing-function: var(--ease-in-out);
  }
  .notification-message-enter-from,
  .notification-message-leave-to {
    transform: translateY(-100%);
    opacity: 0;
  }
  .notification-message-enter-to,
  .notification-message-leave-from {
    transform: translateY(0);
    opacity: 1;
  }

  .notification-type-message {
    --notification-background-color: var(--notification-message-color);
  }
  .notification-type-info {
    --notification-background-color: var(--notification-info-color);
  }
  .notification-type-warning {
    --notification-background-color: var(--notification-warning-color);
  }
  .notification-type-error {
    --notification-background-color: var(--notification-error-color);
  }

  .notification-type-message,
  .notification-type-info,
  .notification-type-warning,
  .notification-type-error {
    background: var(--notification-background-color);
    color: var(--notification-text-color);
  }
}
</style>
