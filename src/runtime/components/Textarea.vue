<template>
  <div
    ref="el"
    v-window-event:mouseup="onLineNumberUp"
    class="poortext-editor poortext-editor--touch-capture-guard leading-none"
    tabindex="-1"
    :style="{
      '--textarea-padding-left': props.lineNumber ? props.lineNumberGutter : '0',
      '--caret-color': caretColor,
      '--line-number-background': props.lineNumberBackground,
      '--line-number-border': props.lineNumberBorder,
      '--line-number-color': props.lineNumberColor,
      '--line-number-gutter': props.lineNumberGutter,
      '--line-number-width': props.lineNumberWidth,
    }"
    @click="onClickToFocus">
    <div class="poortext-editor--scroll-container scrollbar" tabindex="-1">
      <div class="poortext-editor--container">
        <div v-if="props.lineNumber" class="line-number poortext-editor-line-number-background"></div>
        <div class="poortext-editor--editor-container">
          <div v-if="props.lineNumber" class="line-number"></div>
          <textarea
            ref="editor"
            class="poortext-editor--editor"
            :value="text"
            :readonly="props.readonly"
            spell-check="false"
            autocapitalize="off"
            autocomplete="off"
            autocorrect="off"
            data-gramm="false"
            data-testid="textarea"
            @input="text = ($event.target as HTMLTextAreaElement).value"
            @change="emit('change', ($event.target as HTMLTextAreaElement).value)"></textarea>
        </div>

        <div v-if="!text && props.placeholder" class="poortext-editor--line">
          <slot name="empty">
            <div v-if="props.lineNumber" class="line-number poortext-editor-line-number">{{ formatLineNumber(1) }}</div>
            <pre class="poortext-editor--highlight placeholder">{{ props.placeholder }}</pre>
          </slot>
        </div>
        <div v-for="(line, lineIdx) in linesHighlighted" v-else :key="lineIdx" class="poortext-editor--line">
          <div
            v-if="props.lineNumber"
            class="line-number poortext-editor-line-number"
            @mousedown="onLineNumberDown($event, lineIdx)"
            @mousemove="onLineNumberMove($event, lineIdx)"
            @click="onLineNumberClick($event, lineIdx)">
            {{ formatLineNumber(lineIdx + 1) }}
          </div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <pre class="poortext-editor--highlight" v-html="line"></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from '#imports';
type Props = {
  modelValue?: string;
  lineNumber?: boolean | ((n: number) => string);
  lineNumberWidth?: string;
  lineNumberBackground?: string;
  lineNumberBorder?: string;
  lineNumberColor?: string;
  lineNumberGutter?: string;
  highlight?: (s: string[]) => string[];
  placeholder?: string;
  readonly?: boolean;
  caretColor?: string;
};
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  lineNumber: false,
  lineNumberGutter: '1ch',
  highlight: (s: string[]) => {
    const replace: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return s.map((l) =>
      l
        .split('')
        .map((x) => replace[x] ?? x)
        .join(''),
    );
  },
  readonly: false,
  caretColor: 'auto',
});

const emit = defineEmits(['update:modelValue', 'change']);

const editor = ref<HTMLTextAreaElement>();

function onClickToFocus(e: MouseEvent) {
  if (e.target !== editor.value) {
    e.preventDefault();
    e.stopPropagation();
    editor.value?.focus();
  }
}

const text = ref<string>(props.modelValue);
watch(
  () => props.modelValue,
  () => {
    if (props.modelValue !== text.value) {
      text.value = props.modelValue;
      /*
      nextTick(() => {
        // set cursor position
        editor.value?.setSelectionRange(0, 0);
      });
      */
    }
  },
  { immediate: true },
);
watch(
  () => text.value,
  () => {
    if (props.modelValue !== text.value) {
      emit('update:modelValue', text.value);
    }
  },
);

const el = ref<HTMLElement>();
const caretColor = computed(() => {
  if (props.caretColor && props.caretColor !== 'auto') return props.caretColor;

  if (!el.value) return '';
  const css = getComputedStyle(el.value);
  return css.color;
});

const lines = computed(() => text.value.split('\n'));
const linesHighlighted = computed(() => {
  return props.highlight(lines.value);
});

function formatLineNumber(n: number) {
  if (!props.lineNumber) return '';
  return props.lineNumber === true ? String(n) : props.lineNumber(n);
}

const dragStartLineIdx = ref<number>();
function onLineNumberDown(e: MouseEvent, lineIdx: number) {
  dragStartLineIdx.value = lineIdx;
  e.preventDefault();
  e.stopPropagation();
}

function onLineNumberUp(e: MouseEvent) {
  if (dragStartLineIdx.value !== undefined) {
    dragStartLineIdx.value = undefined;
    e.preventDefault();
    e.stopPropagation();
  }
}

function onLineNumberClick(e: MouseEvent, lineIdx: number) {
  onLineNumberDown(e, lineIdx);
  onLineNumberMove(e, lineIdx);
  onLineNumberUp(e);
}

function onLineNumberMove(e: MouseEvent, lineIdx: number) {
  if (dragStartLineIdx.value === undefined) return;
  const minIdx = Math.min(dragStartLineIdx.value, lineIdx);
  const maxIdx = Math.max(dragStartLineIdx.value, lineIdx);

  const spos = minIdx > 0 ? lines.value.slice(0, minIdx).join('\n').length + 1 : 0;
  const epos = lines.value.slice(0, maxIdx + 1).join('\n').length;

  editor.value?.setSelectionRange(spos, epos);
  editor.value?.focus();
}
</script>

<style scoped>
.poortext-editor {
  cursor: text;
  box-sizing: border-box;
  position: relative;
  z-index: 0;
  height: 100%;

  --caret-color: black;
  --line-number-width: 5ch;
  --line-number-background: #f8f8f8;
  --line-number-border: 1px solid #ccc;
  --line-number-color: #aaa;
  --line-number-gutter: 0.5ch;

  .poortext-editor--scroll-container {
    position: relative;
    overflow: auto;
    width: 100%;
    height: 100%;

    .line-number {
      width: var(--line-number-width);
      padding-right: var(--line-number-gutter);
      user-select: none;
      flex: 0 0 auto;
    }

    .poortext-editor--container {
      position: relative;
      overflow: hidden;
      width: 100%;
      min-height: 100%;
      height: auto;

      .poortext-editor-line-number-background {
        /* for backgorund */
        position: absolute;
        height: 100%;
        z-index: -1;
        display: block;

        /* decoration */
        background: var(--line-number-background);
        border-right: var(--line-number-border);
      }

      .poortext-editor--line {
        display: flex;
        justify-content: flex-start;
        align-items: stretch;

        .poortext-editor-line-number {
          /* decoration */
          text-align: right;
          color: var(--line-number-color);
        }
      }

      .poortext-editor--editor-container {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;

        position: absolute;
        width: 100%;
        height: 100%;

        > .line-number {
        }
      }

      textarea.poortext-editor--editor,
      pre.poortext-editor--highlight {
        margin: 0;
        border: 0;
        padding: 0 0 0 var(--textarea-padding-left);

        flex: 1 0 0%;

        background: none;
        box-sizing: inherit;

        font: inherit;

        letter-spacing: inherit;
        line-height: inherit;
        tab-size: inherit;
        text-indent: inherit;
        text-rendering: inherit;
        text-transform: inherit;

        overflow-wrap: anywhere !important;
        white-space: pre-wrap !important;
        word-break: break-all !important;

        user-select: none;

        color: inherit;
      }

      textarea.poortext-editor--editor {
        width: 100%;
        height: 100%;

        outline: none;
        resize: none;

        font: inherit;
        color: transparent !important;
        z-index: 1;

        caret-color: var(--caret-color);

        &::selection,
        &::-moz-selection {
          background-color: #6366f1;
          color: white !important;
        }
      }

      pre.poortext-editor--highlight {
        position: relative;
        font: inherit;
        color: inherit;

        &:before {
          /* needed when line number is disabled */
          content: '\200b';
        }

        &.placeholder {
          opacity: 0.25;
        }
      }
    }
  }

  &.poortext-editor--touch-capture-guard {
    .poortext-editor--scroll-container {
      pointer-events: none !important;
    }
  }

  & {
    .poortext-editor--scroll-container {
      &:focus-within {
        pointer-events: initial !important;
        > * {
          pointer-events: none !important;
        }

        textarea {
          pointer-events: initial !important;
        }

        .poortext-editor--line > .line-number {
          pointer-events: initial !important;
        }
      }
    }
  }

  .scrollbar {
    /* ---------------------------------------------- */
    scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
    scrollbar-width: auto;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 20px;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
      border-radius: 20px;
    }

    &:active::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 20px;
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
    }
    &:active::-webkit-scrollbar-track {
      background-color: transparent;
      border-radius: 20px;
    }

    &:hover {
      scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
      scrollbar-width: auto;
    }
    /* ---------------------------------------------- */
  }
}
</style>
