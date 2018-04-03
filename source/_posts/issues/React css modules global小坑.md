
---
title: React css modules global小坑
date: Tue Apr 03 2018 16:54:50 GMT+0800 (CST)
tags:
 - css-module
---

基本用法：
```css
:global(.classname) {
    background: #fff
}
```
预处理：
如果用了预处理工具, 可以支持块级写法
```scss
:global {
    .classname {
        background: #fff
    }
}
```
因为经过sass-loader等预处理器转译后，嵌套将会自动展开为：
```css
:global .classname {
    background: #fff
}
```
动画@keyframes
```css
@keyframes :global(zoomBounceIn) {
  0% {
    transform: scale(0);
  }
  50%{
    transform: scale(1.1);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
```

https://github.com/css-modules/css-modules#usage-with-preprocessors

https://github.com/css-modules/css-modules/issues/115