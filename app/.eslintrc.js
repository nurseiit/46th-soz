module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
      }
    }
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  env: {
    browser: true,
    es6: true
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/react'
  ],
  rules: {
    'import/extensions': [1, { extensions: ['.ts', '.tsx'] }],
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': [
      1,
      {
        custom: 'ignore'
      }
    ]
  }
};
