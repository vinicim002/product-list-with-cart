// eslint.config.mjs
// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // Configuração base do ESLint
  eslint.configs.recommended,

  // Configuração do TypeScript ESLint
  ...tseslint.configs.recommended,

  // Integração com o Prettier (desativa regras conflitantes)
  prettier,

  {
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',  
    },
  },
]);
