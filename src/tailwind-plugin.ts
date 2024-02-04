import chroma from 'chroma-js';
import plugin from 'tailwindcss/plugin.js';

export default plugin(() => {}, {
  theme: {
    extend: {
      colors: ({ colors }: any) => ({
        primary: `rgb(${chroma(colors.indigo['500']).rgb().join(' ')} / <alpha-value>)`,
      }),
    },

    checkbox: ({ theme }: any) => ({
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

    dropdown: ({ theme }: any) => ({
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

    tag: ({ theme }: any) => ({
      background: theme('colors.slate.200'),
      text: theme('colors.slate.800'),
    }),

    badge: ({ theme }: any) => ({
      title: {
        background: theme('colors.slate.800'),
        text: theme('colors.slate.200'),
      },
      value: {
        background: theme('colors.slate.200'),
        text: theme('colors.slate.800'),
      },
    }),
  },
});
