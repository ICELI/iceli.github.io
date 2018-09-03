
---
title: 获取webpack 的 global hash
date: Mon Sep 03 2018 15:34:39 GMT+0800 (CST)
tags:
 - webpack
---

> ExtendedAPIPlugin  
    ```
    new webpack.ExtendedAPIPlugin()
    ```
    
> Adds useful free vars to the bundle.
> `__webpack_hash__` The hash of the compilation available as free var.


```js
var hash = __webpack_hash__;
```

https://stackoverflow.com/questions/39082976/how-to-pass-the-build-hash-as-an-environment-variable-in-webpack

https://github.com/webpack/webpack/issues/5337