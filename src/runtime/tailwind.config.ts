import type { RecursiveKeyValuePair, ResolvableTo, ThemeConfig } from 'tailwindcss/types/config';

interface CustomThemeConfig extends ThemeConfig {
  checkbox: ResolvableTo<RecursiveKeyValuePair>;
  toggle: ResolvableTo<RecursiveKeyValuePair>;
  dropdown: ResolvableTo<RecursiveKeyValuePair>;
  tag: ResolvableTo<RecursiveKeyValuePair>;
  badge: ResolvableTo<RecursiveKeyValuePair>;
  dialog: ResolvableTo<RecursiveKeyValuePair>;
}

export default {
  presets: [
    {
      theme: {
        extend: {
          colors: ({ colors }: any) => ({
            primary: colors.indigo['500'],
            invert: colors.white,
          }),
        },

        checkbox: ({ theme }) => ({
          active: {
            icon: theme('colors.primary'),
            background: 'transparent',
          },
          disabled: {
            icon: 'inherit',
            background: 'transparent',
          },
          hover: {
            icon: theme('colors.primary'),
            background: theme('colors.primary'),
            backgroundOpacity: '25%',
          },
        }),

        toggle: ({ theme }) => ({
          height: '1.25rem',
          width: '2.5rem',

          knob: {
            size: '1rem',
            off: theme('colors.white'),
            on: theme('colors.white'),
          },

          background: {
            off: theme('colors.gray.200'),
            on: theme('colors.primary'),
          },

          ring: {
            size: '2px',
            color: theme('colors.primary'),
            opacity: '30%',
          },
        }),

        dropdown: ({ theme }) => ({
          selected: {
            text: 'inherit',
            background: theme('colors.slate.200'),
            backgroundOpacity: '100%',
          },
          hover: {
            text: 'inherit',
            background: theme('colors.slate.200'),
            backgroundOpacity: '100%',
          },
        }),

        tag: ({ theme }) => ({
          dark: {
            text: theme('colors.slate.100'),
          },
          light: {
            text: theme('colors.slate.900'),
          },
          background: theme('colors.slate.200'),
          text: theme('colors.slate.900'),
        }),

        badge: ({ theme }) => ({
          dark: {
            text: theme('colors.slate.100'),
          },
          light: {
            text: theme('colors.slate.900'),
          },
          title: {
            background: theme('colors.slate.800'),
            text: theme('colors.slate.100'),
          },
          value: {
            background: theme('colors.slate.200'),
            text: theme('colors.slate.900'),
          },
        }),

        dialog: {
          commit: {
            label: 'OK',
          },
          cancel: {
            label: 'Cancel',
          },
        },
      } satisfies Partial<CustomThemeConfig & { extend: Partial<CustomThemeConfig> }>,
    },
  ],
};
