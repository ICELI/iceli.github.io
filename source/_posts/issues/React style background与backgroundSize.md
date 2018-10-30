
---
title: React style background与backgroundSize
date: Tue Oct 30 2018 11:19:51 GMT+0800 (CST)
tags:
 - react
---

react组件行内样式
```
var style = {
    background: `#ffffff url(${url})`,
    backgroundSize: 'cover'
};
```
在re-render时backgroundSize丢失，导致图片缩放

https://github.com/facebook/react/issues/5030