
---
title: React defaultProps 设置window.innerHeigt 与 REM适配的坑
date: Mon Nov 05 2018 21:33:08 GMT+0800 (CST)
tags:
 - react
---

```jsx
static defaultProps = {
    offsetTop: window.innerHeigt
}
```
> REM适配会修改viewport 缩小0.5，实质为放大2倍

> class的static属性在模块文件加载时即执行

所以，REM适配脚本必须在APP模块依赖前已经生效才行。

目前根据Dealer-x实践，即使调整了顺序（rem init在 pageInit之前），也不能保证REM脚本已经生效