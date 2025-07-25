import { fixupPluginRules } from '@eslint/compat';
import _import from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default [
  {
    ignores: [
      'node_modules/',
      '.pnp/',
      '.pnp.js',
      'coverage/',
      '.next/',
      'out/',
      'build/',
      '.DS_Store',
      '*.pem',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      '.env*.local',
      '.vercel',
      '*.tsbuildinfo',
      'next-env.d.ts',
      'storybook-static/',
      '.storybook/',
      'src/components/shadcn/',
    ],
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      globals: {
        React: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      react: await import('eslint-plugin-react').then(m => m.default),
      'react-hooks': await import('eslint-plugin-react-hooks').then(m => m.default),
      'jsx-a11y': await import('eslint-plugin-jsx-a11y').then(m => m.default),
      prettier: await import('eslint-plugin-prettier').then(m => m.default),
      'simple-import-sort': simpleImportSort,
      import: fixupPluginRules(_import),
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'prettier/prettier': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/aria-props': 'warn',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/no-duplicates': 'error',
      'import/newline-after-import': ['error', { count: 1 }],
    },
    settings: {
      react: {
        version: 'detect',
      },
      next: {
        rootDir: 'src/',
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: await import('@typescript-eslint/parser').then(m => m.default),
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        React: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': await import('@typescript-eslint/eslint-plugin').then(m => m.default),
      react: await import('eslint-plugin-react').then(m => m.default),
      'react-hooks': await import('eslint-plugin-react-hooks').then(m => m.default),
      'jsx-a11y': await import('eslint-plugin-jsx-a11y').then(m => m.default),
      prettier: await import('eslint-plugin-prettier').then(m => m.default),
      'simple-import-sort': simpleImportSort,
      import: fixupPluginRules(_import),
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/aria-props': 'warn',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/no-duplicates': 'error',
      'import/newline-after-import': ['error', { count: 1 }],
      'max-len': ['error', { code: 100, ignoreUrls: true, ignoreStrings: true }],
    },
    settings: {
      react: {
        version: 'detect',
      },
      next: {
        rootDir: 'src/',
      },
    },
  },
];
