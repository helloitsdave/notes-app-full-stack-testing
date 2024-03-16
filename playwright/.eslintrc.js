// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  root: true,
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  extends: [
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:playwright/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
  },
};
