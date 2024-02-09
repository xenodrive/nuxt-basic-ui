<template>
  <div
    ref="$el"
    v-window-event:click.outside.capture.passive="onClickOutside"
    class="pointer-events-none"
    @keydown="updateRect()">
    <div
      ref="$trigger"
      class="pointer-events-none inline [&>*]:pointer-events-auto"
      :class="{ 'cursor-pointer': !props.disabled }"
      @click="toggle">
      <slot name="trigger" />
    </div>

    <Teleport v-if="teleport" :to="popupContainer">
      <Transition name="fade">
        <div
          v-show="teleport && isActive && !props.inactive"
          ref="$popup"
          class="popup pointer-events-auto absolute z-50 w-max"
          :style="position"
          :class="props.popupClass"
          @click.stop="updateRect()">
          <slot />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from '#imports';
import { useResizeObserver } from '@vueuse/core';

const $el = ref<HTMLElement>();
const $popup = ref<HTMLElement>();
const $trigger = ref<HTMLElement>();

const popupContainer = ref<HTMLElement>();

useResizeObserver([popupContainer, $popup], () => {
  updateRect();
});

// XXX: delay to find popupContainer
const teleport = ref(false);
onMounted(() => {
  setTimeout(() => {
    popupContainer.value = document.getElementById('popup-container') ?? document.body;
    teleport.value = true;
  }, 100);
});

type Side = 'top' | 'right' | 'bottom' | 'left';
type Align = 'begin' | 'center' | 'end';
type Props = {
  active?: boolean;
  inactive?: boolean;

  side?: Side | 'auto';
  align?: Align | 'auto';

  margin?: number;

  disabled?: boolean;
  popupClass?: any;
};

const props = withDefaults(defineProps<Props>(), {
  side: 'auto',
  align: 'auto',
  margin: 4,
});

const isActive = defineModel<boolean>({ default: false });
watch(isActive, (active) => active && updateRect());

const triggerRect = ref<DOMRect>();

function updateRect() {
  triggerRect.value = ($trigger.value?.firstElementChild as HTMLElement)?.getBoundingClientRect();
}

function getTriggerXY(side: Side, align: Align) {
  if (!triggerRect.value) return [0, 0];

  const ax = {
    'top-begin': 0,
    'top-center': 1 / 2,
    'top-end': 1,
    'bottom-begin': 0,
    'bottom-center': 1 / 2,
    'bottom-end': 1,

    'left-begin': 0,
    'left-center': 0,
    'left-end': 0,
    'right-begin': 1,
    'right-center': 1,
    'right-end': 1,
  }[side + '-' + align];

  const ay = {
    'top-begin': 0,
    'top-center': 0,
    'top-end': 0,
    'bottom-begin': 1,
    'bottom-center': 1,
    'bottom-end': 1,

    'left-begin': 0,
    'left-center': 1 / 2,
    'left-end': 1,
    'right-begin': 0,
    'right-center': 1 / 2,
    'right-end': 1,
  }[side + '-' + align];

  const mx = { left: -1, right: 1, top: 0, bottom: 0 }[side];
  const my = { left: 0, right: 0, top: -1, bottom: 1 }[side];

  return [
    triggerRect.value.left + ax! * triggerRect.value.width + mx * props.margin,
    triggerRect.value.top + ay! * triggerRect.value.height /* + window.scrollY */ + my * props.margin,
  ];
}

function getAnchorXY(side: Side, align: Align) {
  const anchor = {
    'top-begin': 7,
    'top-center': 8,
    'top-end': 9,
    'bottom-begin': 1,
    'bottom-center': 2,
    'bottom-end': 3,

    'left-begin': 3,
    'left-center': 6,
    'left-end': 9,
    'right-begin': 1,
    'right-center': 4,
    'right-end': 7,
  }[side + '-' + align];

  return [
    [0, -1 / 2, -1, 0, -1 / 2, -1, 0, -1 / 2, -1][(anchor ?? 1) - 1],
    [0, 0, 0, -1 / 2, -1 / 2, -1 / 2, -1, -1, -1][(anchor ?? 1) - 1],
  ];
}

const position = computed(() => {
  const page = popupContainer.value;
  if (!page) {
    return undefined;
  }

  const pageRect = page.getBoundingClientRect();
  if (!pageRect) {
    return undefined;
  }

  const popupRect = $popup.value?.getBoundingClientRect();
  if (!popupRect) {
    return undefined;
  }

  if (!triggerRect.value) {
    return undefined;
  }

  const [side, align] = (function () {
    if (props.side !== 'auto' && props.align !== 'auto') {
      return [props.side, props.align];
    }

    const triggerCenter = [
      triggerRect.value.x + triggerRect.value.width / 2,
      triggerRect.value.y + triggerRect.value.height / 2,
    ];

    const flipX = triggerCenter[0] > (page === document.body ? window.innerWidth : page.clientWidth) / 2;
    const flipY = triggerCenter[1] > (page === document.body ? window.innerHeight : page.clientHeight) / 2;

    return [flipY ? 'top' : 'bottom', flipX ? 'end' : 'begin'] as const;
  })();

  const [anchorX, anchorY] = getAnchorXY(side, align);
  const [triggerX, triggerY] = getTriggerXY(side, align);

  const left = triggerX - pageRect.left + page.scrollLeft;
  const top = triggerY - pageRect.top + page.scrollTop;

  const pos = {
    left: `${left}px`,
    top: `${top}px`,

    transform: `translate(${anchorX * 100}%, ${anchorY * 100}%)`,
  };

  return pos;
});

function open() {
  if (props.disabled) return;
  isActive.value = true;
}
function close() {
  isActive.value = false;
}
function toggle() {
  if (props.disabled) return;
  isActive.value = !isActive.value;
}

function onClickOutside(e: Event) {
  if ($popup.value && e.composedPath().includes($popup.value)) {
    return;
  }
  close();
}

const api = {
  $el,
  $popup,
  $trigger,
  open,
  close,
  toggle,
};
defineExpose(api);
</script>
