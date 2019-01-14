
---
title: eslint prettier not fixing vue max-attributes-per-line
date: Mon Jan 14 2019 11:27:58 GMT+0800 (CST)
tags:

---

prettier not fixing vue/max-attributes-per-line

解决：
1. 禁用 vue/max-attributes-per-line
2. 修改其配置，使其与prettier不冲突
```js
'vue/max-attributes-per-line': [2, {
  'singleline': 20,
  'multiline': {
     'max': 1,
     'allowFirstLine': false
   }
}]
```


https://github.com/prettier/eslint-plugin-prettier/issues/94