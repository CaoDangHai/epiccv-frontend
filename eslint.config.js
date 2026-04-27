import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Block 1: Cấu hình ignores global cho toàn dự án
  {
    ignores: ['dist', '**/.gitkeep'],
  },

  // Block 2: Kế thừa ruleset mặc định (BẮT BUỘC PHẢI TÁCH RỜI)
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Block 3: Cấu hình linting chính cho React/TS
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);