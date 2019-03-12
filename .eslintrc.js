module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'no-unused-vars': [1],
    'comma-dangle': [2,'never'],
    'no-console': [0]
  }
};
