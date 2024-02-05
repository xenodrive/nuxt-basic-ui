import twcolors from '#tailwind-config/theme/colors';

type MyRecord<T = any, K extends keyof T = any> = { readonly [P in keyof T]: string | MyRecord<T[K]> };
type ExpandTailwindColors<T extends MyRecord<T>> =
  T extends MyRecord<T, infer R>
    ? R extends string
      ? T[R] extends string
        ? R
        : T[R] extends MyRecord
          ? `${R}-${ExpandTailwindColors<T[R]>}`
          : never
      : never
    : never;

export type TwColor = ExpandTailwindColors<typeof twcolors>;

type TwKey = keyof typeof twcolors;
export function twColor(name: TwColor | string): string;
export function twColor(name: undefined): undefined;
export function twColor(name: TwColor | string | undefined) {
  if (name === 'transparent') return '#00000000'; // for chroma-js
  if (name) {
    if (name in twcolors && typeof twcolors[name as TwKey] === 'string') {
      return twcolors[name as TwKey] as string;
    }
    const m = name.match(/^([a-z]+)-(50|950|[123456789]00)$/);
    if (m && m[1] in twcolors) {
      const obj = twcolors[m[1] as TwKey];
      if (typeof obj === 'object' && m[2] in obj) {
        return obj[m[2] as keyof typeof obj];
      }
    }
  }
  return name;
}
