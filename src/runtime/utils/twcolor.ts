import type { ClassNameValue } from 'tailwind-merge';

interface TwColorLike {
  color: string | undefined;
}

export class TwColor {
  color: string | undefined;

  constructor(s: string | TwColorLike | undefined | null) {
    if (!s) {
      this.color = undefined;
      return;
    }
    if (s instanceof TwColor || typeof s === 'object') {
      this.color = s.color;
      return;
    }
    if (s?.startsWith('var(') || s?.startsWith('#')) {
      this.color = s;
      return;
    }
    if (s?.startsWith('--')) {
      this.color = `var(${s})`;
      return;
    }
    this.color = `var(--color-${s})`;
  }

  toString() {
    return this.color;
  }

  isUndefined() {
    return this.color === undefined;
  }

  darken(n: number) {
    const r = new TwColor(this);
    if (r.isUndefined()) return r;
    if (n > 0) {
      r.color = `color-mix(in srgb, ${this.color} ${n}, black)`;
    }
    return r;
  }

  lighten(n: number) {
    const r = new TwColor(this);
    if (r.isUndefined()) return r;
    if (n > 0) {
      r.color = `color-mix(in srgb, ${this.color} ${n}, white)`;
    }
    return r;
  }

  textColor() {
    const r = new TwColor(this);

    if (r.isUndefined()) return r;
    const c = `calc(clamp((127.5 - (0.2126 * r + 0.7152 * g + 0.0722 * b)) * 255, 0, 255))`;
    r.color = `rgb(from ${this.toString()} ${c} ${c} ${c})`;
    return r;
  }
}

export function twcolor(...s: (string | null | undefined | TwColorLike)[]): TwColor {
  const r = s.map((x) => new TwColor(x));
  return r.find((x) => !x.isUndefined()) || r[0];
}

export function findBgColor(className: ClassNameValue, color: string | TwColor | undefined) {
  const c = String(className)
    .split(' ')
    .find((x) => x.match(/^bg-[a-z]+(-[0-9]+)?$/));
  return twcolor((c && c.substring(3)) || color);
}
