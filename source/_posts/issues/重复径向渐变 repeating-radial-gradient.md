
---
title: 重复径向渐变 repeating-radial-gradient
date: Fri May 11 2018 15:44:04 GMT+0800 (CST)
tags:
 - CSS
---

```css
.dot-list {
  height: .24rem;
  background: radial-gradient(circle closest-side, red, red .12rem, transparent .12rem, transparent .20rem) repeat;
  background-size: .30rem .24rem;
}
```

问题：
1. 圆形有锯齿
2. 宽度无法保证不截断最后一个圆

https://developer.mozilla.org/zh-CN/docs/Web/CSS/repeating-radial-gradient