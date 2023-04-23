module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier/vue'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error',
    'vue/html-closing-bracket-style': [
      'error',
      {
        selfClosingTag: 'always'
      }
    ]
    // その他のカスタムルールをここに追加します
  }
}
