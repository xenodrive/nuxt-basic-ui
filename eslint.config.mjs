import { createConfigForNuxt } from '@nuxt/eslint-config/flat';
import vuePrettierConfig from '@vue/eslint-config-prettier';

const config = await createConfigForNuxt()
  .append({
    ignores: ['**/*.d.ts', 'dist'],
  })
  .prepend(vuePrettierConfig)
  .override('nuxt/vue/rules', {
    rules: {
      'vue/html-self-closing': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
    },
  })
  .override('nuxt/vue/single-root', {
    rules: {
      'vue/no-multiple-template-root': 'off',
    },
  })
  .override('nuxt/typescript/rules', {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  });

export default config;
