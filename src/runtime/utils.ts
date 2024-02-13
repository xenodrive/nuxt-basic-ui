import themeObj from '#tailwind-config/theme';

type MyRecord<T = any, K extends keyof T = any> = { readonly [P in keyof T]: unknown | MyRecord<T[K]> };
type ExpandTailwindConfig<T extends MyRecord<T>, J extends string = '-'> =
  T extends MyRecord<T, infer R>
    ? R extends string
      ? T[R] extends MyRecord
        ? `${R}${J}${ExpandTailwindConfig<T[R], J>}`
        : R
      : never
    : never;

export type TwColor = ExpandTailwindConfig<typeof themeObj.colors>;

type TwKey = keyof typeof themeObj.colors;
export function twColor(name: TwColor | string): string;
export function twColor(name: undefined): undefined;
export function twColor(name: TwColor | string | undefined) {
  if (name === 'transparent') return '#00000000'; // for chroma-js
  if (name) {
    if (name in themeObj.colors && typeof themeObj.colors[name as TwKey] === 'string') {
      return themeObj.colors[name as TwKey] as string;
    }
    const m = name.match(/^([a-z]+)-(50|950|[123456789]00)$/);
    if (m && m[1] in themeObj.colors) {
      const obj = themeObj.colors[m[1] as TwKey];
      if (typeof obj === 'object' && m[2] in obj) {
        return obj[m[2] as keyof typeof obj];
      }
    }
  }
  return name;
}

export type TwConfig = ExpandTailwindConfig<typeof themeObj, '.'>;
export function theme(name: TwConfig) {
  const parts = name.split('.');
  return parts.reduce((acc, val) => acc && (acc as any)?.[val], themeObj);
}
