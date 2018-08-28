
---
title: TypeScript 使用import() 动态加载模块报错
date: Tue Aug 28 2018 15:07:44 GMT+0800 (CST)
tags:
 - TS
---

```esnext
import('./something')
```
结果typescript报错
```
[ts] 面向 ECMAScript 2015 模块时，不能使用动态导入。
```
解决办法：
- 将tsconfig.json中的module配置从`es6`改为`esnext`
```json
{
    "compilerOptions": {
        "outDir": "./build/",
        "sourceMap": true,
        "module": "esnext", // 支持import()
        "target": "es5",
    }
}
```