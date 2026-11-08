const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettierConfig = require('eslint-config-prettier');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      prettierConfig,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],

      'no-console': ['warn', { allow: ['warn', 'error'] }],

      'padded-blocks': ['error', { blocks: 'never', classes: 'always', switches: 'never' }],

      quotes: ['warn', 'single', { avoidEscape: true }],

      'object-curly-spacing': ['warn', 'always'],

      'template-curly-spacing': ['warn', 'always'],

      semi: ['warn', 'always'],

      'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],

      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'no-public' },
      ],

      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'enumMember', format: ['UPPER_CASE'], leadingUnderscore: 'forbid' },
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: { regex: '^I[A-Z]', match: true },
        },
        { selector: ['objectLiteralProperty', 'typeProperty'], format: null },
      ],

      indent: ['error', 2],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
      prettierConfig,
    ],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': ['error', { parser: 'html' }],

      '@angular-eslint/template/banana-in-box': 'error',

      '@angular-eslint/template/eqeqeq': 'warn',

      '@angular-eslint/template/no-nested-tags': 'error',
    },
  },
]);