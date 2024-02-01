/*
 * Usage examples:
 *   v-window-event:click.outside="onClickOutside"
 *   v-window-event:mouseup.passive="onMouseUp" v-window-event:mousemove.passive="onMouseMove"
 */

import type { Directive } from 'vue';
import { defineNuxtPlugin } from '#app';

export type GlobalEventDirectivesAPI = {
  el: HTMLElement;
};
type Callback = (e: Event, api: GlobalEventDirectivesAPI) => void;

type RegKey = string;

const handlers = {} as Record<RegKey, Record<string, EventListener>>;

type KeyObject = {
  targetName: string;
  eventName: string;
  capture: boolean;
  outside: boolean;
};

function getKey(key: KeyObject | string): string {
  if (typeof key === 'string') return key;
  const { targetName, eventName, capture, outside } = key;
  return [targetName, eventName, Boolean(capture), Boolean(outside)].join(':');
}

function createHandler(el: HTMLElement, callback: Callback, onlyOnOutside: boolean): EventListener {
  return function (e) {
    if (onlyOnOutside && e.composedPath().includes(el)) return;

    callback(e, { el });
  };
}

function removeHandler(regKey: RegKey, keyObj: KeyObject) {
  const map = handlers[regKey]; // 最初の手がかり
  if (!map) return undefined; // 知らない子

  const key = getKey(keyObj);
  const removing = map[key] as EventListener | undefined;

  if (removing) delete map[key];
  return removing;
}

function registerHandler(regKey: RegKey, keyObj: KeyObject, handler: EventListener) {
  const map = handlers[regKey] || (handlers[regKey] = {});
  const key = getKey(keyObj);
  if (map[key]) throw new Error('Duplicated handler: type ' + (map[key] !== handler ? 'A' : 'B')); // 二重登録

  map[key] = handler;
}

let regId = 1;
const regLabel = 'xdGlobalEventDirectives-';

function createEventDirectiveFor(targetName: 'window' | 'document') {
  return <Directive<HTMLElement, Callback>>{
    created(el, binding) {
      const target = globalThis[targetName];
      if (typeof target === 'undefined') return;

      const eventName = binding.arg ?? 'click';
      const callback = binding.value;
      const { capture, once, passive, outside } = binding.modifiers;
      const key = { targetName, eventName, capture, outside };

      if (typeof callback !== 'function') return;

      const handler = createHandler(el, callback, outside);

      const keyString = getKey(key);

      const regKey = regLabel + String(regId++);
      registerHandler(regKey, key, handler);

      el.dataset[regKey] = keyString;

      target.addEventListener(eventName, handler, { capture, once, passive });
    },

    beforeUnmount(el, binding) {
      const target = globalThis[targetName];
      if (typeof target === 'undefined') return;

      const eventName = binding.arg ?? 'click';
      const callback = binding.value;
      const { capture, outside } = binding.modifiers;
      const key = { targetName, eventName, capture, outside };

      if (typeof callback !== 'function') return;

      const keyString = getKey(key);
      const regId = Object.entries(el.dataset).find(([k, v]) => k.startsWith(regLabel) && v === keyString);

      if (!regId) {
        console.error('Unknown handler 1');
        return;
      }
      const handler = removeHandler(regId[0], key);
      if (!handler) {
        console.error('Unknown handler', el.dataset);
        return;
      }

      delete el.dataset[regId[0]];

      target.removeEventListener(eventName, handler, { capture });
    },
  };
}

export const windowEvent = createEventDirectiveFor('window');
export const documentEvent = createEventDirectiveFor('document');

export default defineNuxtPlugin((nuxtApp) => {
  // register directives
  nuxtApp.vueApp.directive('window-event', windowEvent);
  nuxtApp.vueApp.directive('document-event', documentEvent);
});
