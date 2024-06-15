module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules', 'build'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react', 'prettier', 'import'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'off',
    indent: ['error', 2],
    'prettier/prettier': 'error',
    'linebreak-style': [0, 'unix'],
    quotes: ['error', 'single'],
    //  "semi": ["error", "never"],
    semi: [2, 'always'],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 0,
    'import/no-unresolved': [2, { caseSensitive: false }],
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    // "react/jsx-filename-extension-filename-extension": [1, { "extensions": [".ts", ".tsx"] }],
    // "react/react-in-jsx-scope": "off",
    // allow jsx syntax in js files (for next.js project)
    // "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
