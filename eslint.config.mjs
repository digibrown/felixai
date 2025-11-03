import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  // Ignore build artifacts
  { ignores: ['dist', 'node_modules', '.astro'] },

  // Base JS recommendations
  js.configs.recommended,

  // TypeScript recommendations
  ...tseslint.configs.recommended,

  // Astro recommended rules (includes parser for .astro)
  ...astro.configs['flat/recommended'],

  // TS files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    rules: {}
  },

  // Astro files with a11y
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astro.parser,
      parserOptions: {
        parser: tseslint.parser
      }
    },
    plugins: { 'jsx-a11y': jsxA11y },
    rules: {}
  }
];
