import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'script' },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-empty-pattern": ["error", { allowObjectPatternsAsParameters: true }],
    },
  },
  ...tseslint.configs.recommended,
  {
    ignores: [
      '**config**',
      'scripts/*',
      'dist/*',
      'build/*',
      'coverage/*',
      'node_modules/*',
    ],
  },
  eslintPluginPrettierRecommended,
];
