
---
title: Typescript React-css-module
date: Wed Mar 21 2018 16:29:09 GMT+0800 (CST)
tags:
 - TS
---

使用awesome-typescript-loader时，react-css-modules出错。
```js
{
    "compilerOptions": {
        "outDir": "./build/",
        "sourceMap": true,
        "noImplicitAny": true,
        "module": "es2015", // 为`commonjs`时出错
        "target": "es5",
        "jsx": "preserve",
        "baseUrl": "./",
        "paths": {
            "utils/*": ["src/utils/*"],
            "configs/*": ["src/config/*"]
        },
        "allowJs": true
    },
    "include": [
        "./src/**/*"
    ]
}
```
https://qiita.com/terrierscript/items/56d2cc15f76df50dfee7

https://github.com/s-panferov/awesome-typescript-loader/issues/146#issuecomment-248808206