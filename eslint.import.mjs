import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import eslintPluginImport from 'eslint-plugin-import'
import importRecommendedConfig from 'eslint-plugin-import/config/recommended.js'
import importTypeScriptConfig from 'eslint-plugin-import/config/typescript.js'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const flatCompat = new FlatCompat()

export default [
  ...fixupConfigRules(flatCompat.config(importRecommendedConfig)),
  ...fixupConfigRules(flatCompat.config(importTypeScriptConfig)),
  {
    plugins: {
      import: fixupPluginRules(eslintPluginImport),
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'import/newline-after-import': 'error',
      'import/no-extraneous-dependencies': ['off'],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/no-named-as-default': 'error',
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        node: true,
        typescript: true,
      },
      'import/ignore': ['node_modules'],
    },
  },
]
