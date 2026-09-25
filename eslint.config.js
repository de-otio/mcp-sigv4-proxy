// Flat config (eslint 9+/10). Migrated from .eslintrc.json when bumping
// eslint 8.57.1 -> 10.2.0, which dropped support for the legacy
// eslintrc format entirely. Kept to the same two @typescript-eslint/*
// packages the project already depended on, rather than switching to the
// combined `typescript-eslint` meta-package, to minimize the dependency
// surface of this bump.
import js from '@eslint/js';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  {
    ignores: ['**/*.js', '**/*.d.ts', 'node_modules/**', 'dist/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tseslintParser,
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      '@typescript-eslint': tseslintPlugin,
    },
    rules: {
      ...tseslintPlugin.configs.recommended.rules,
      // TypeScript already checks this more accurately (incl. ambient/lib
      // types like RequestInit); the base rule produces false positives on
      // TS files. Matches typescript-eslint's own recommended override,
      // which this hand-assembled config doesn't otherwise inherit.
      'no-undef': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
];
