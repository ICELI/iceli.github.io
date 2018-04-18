
---
title: html高度百分百导致document.documentElement.scrollTop失效
date: Wed Apr 18 2018 17:47:40 GMT+0800 (CST)
tags:

---

```js
 (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 60)
```