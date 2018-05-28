
---
title: html2canvas 图片跨域安全问题
date: Mon May 28 2018 21:33:28 GMT+0800 (CST)
tags:

---

1. canvas图片跨域请求 依赖cors响应头来支持跨域
2. 该图片304缓存了没有cors头的请求
3. 图片url有时间戳！！！

```
html2canvas SecurityError: The operation is insecure.
```