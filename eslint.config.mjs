import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { includeIgnoreFile } from '@eslint/compat'
import jsLint from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import eslintConfigPrettier from 'eslint-plugin-prettier/recommended'
import eslintPluginSvelte from 'eslint-plugin-svelte'
import globals from 'globals'
import tsLint from 'typescript-eslint'

import importLint from './eslint.import.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ignorePath = path.resolve(__dirname, '.gitignore')

export default [
  // config parsers
  {
    files: ['**/*.{js,mjs,cjs,ts,json}'],
  },

  // config envs
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.jest },
    },
  },

  // import sort
  ...importLint,

  // syntax rules
  jsLint.configs.recommended,
  {
    rules: {
      'no-irregular-whitespace': ['error', { skipComments: true }],
    },
  },

  // typescript
  ...tsLint.configs.strict,
  {
    ignores: ['**/*.json'],
  },

  // svelte
  // .prettierrcを追加してる理由
  // https://github.com/sveltejs/eslint-plugin-svelte/issues/258
  ...eslintPluginSvelte.configs['flat/recommended'],
  {
    files: ['**/*.svelte', '*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
      },
    },
  },

  // prettier
  eslintConfigPrettier,
  {
    rules: {
      'no-console': 'warn',
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          printWidth: 120,
          semi: false,
          singleQuote: true,
          trailingComma: 'all',
        },
      ],
    },
  },

  // ignores
  // referenced by: https://eslint.org/docs/latest/use/configure/ignore#including-gitignore-files
  includeIgnoreFile(ignorePath),
]
