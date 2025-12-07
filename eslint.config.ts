/* eslint-disable import-x/no-named-as-default-member -- 💫 Allow named imports from default exports */

import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import eslint from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from '@eslint-react/eslint-plugin';
import tsEslint from 'typescript-eslint';
import { importX } from 'eslint-plugin-import-x';
import { Linter } from 'eslint';

const stylisticConfig = stylistic.configs.customize({
  semi: true,
});

const nextConfig: Linter.Config[] = [
  {
    files: ['**/*.{js,jsx,mjs,ts,tsx,mts,cts}'],

    plugins: {
      'react': reactPlugin,
      'react-hooks': reactHooks,
      'import-x': importX,
      '@stylistic': stylistic,
      '@next/next': nextPlugin,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- 💫 Allow to set as any to avoid type error
      ...(reactPlugin.configs.recommended as any).plugins,
    },

    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.js', '*.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    settings: {
      'react-x': {
        version: 'detect',
        importSource: 'react',
        polymorphicPropName: 'as',
      },

      'import-x/extensions': [
        '.ts', '.tsx',
        '.cts', '.mts',
        '.js', '.jsx',
        '.cjs', '.mjs',
      ],
      'import-x/external-module-folders': ['node_modules', 'node_modules/@types'],
      'import-x/parsers': { '@typescript-eslint/parser': [
        '.ts',
        '.tsx',
        '.cts',
        '.mts',
        '.js',
        '.jsx',
        '.cjs',
        '.mjs'] },
      'import-x/resolver': { typescript: true },
    },

    rules: {
      ...importX.flatConfigs.recommended.rules,
      ...importX.flatConfigs.typescript.rules,

      ...stylisticConfig.rules,
      ...reactPlugin.configs['strict-typescript'].rules,
      ...reactHooks.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
];

const eslintConfig = defineConfig([
  eslint.configs.recommended,
  tsEslint.configs.eslintRecommended,
  tsEslint.configs.strict,
  tsEslint.configs.stylistic,

  ...nextConfig,

  {
    files: ['**/*.js'],
    extends: [tsEslint.configs.disableTypeChecked],
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'public/doom/**',
    'components/ui/**',
  ]),
]);

export default eslintConfig;
