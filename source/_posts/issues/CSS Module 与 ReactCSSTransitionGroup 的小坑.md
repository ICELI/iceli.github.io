
---
title: CSS Module 与 ReactCSSTransitionGroup 的小坑
date: Fri Mar 30 2018 09:18:20 GMT+0800 (CST)
tags:
 - react
 - css-module
---

首先一个选择器如果没有任何内容（包括注释）css module 将不会存在该key
```css
.modalAppear {
}
.modalAppear.modalAppearActive {
}
.modalEnter {
    /* opacity: 0.01; */
}
.modalEnter.modalEnterActive {
    opacity: 1;
    transition: opacity 200ms ease-in;
}
.modalLeave {
    opacity: 1;
}
.modalLeave.modalLeaveActive {
    opacity: 0.01;
    transition: opacity 200ms ease-in;
}
```
css module
```js
{
   modalEnter: 'xxx_hash_xxx', 
   modalEnterActive: 'xxx_hash_xxx',
   modalLeave: 'xxx_hash_xxx',
   modalLeaveActive: 'xxx_hash_xxx'
}
```

### Appear 与 Enter
- ReactCSSTransitionGroup 组件初始化挂载触发Appear
- ReactCSSTransitionGroup 内部如有新增子组件则触发Enter