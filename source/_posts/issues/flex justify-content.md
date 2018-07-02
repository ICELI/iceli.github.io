
---
title: flex justify-content
date: Mon Jul 02 2018 11:31:10 GMT+0800 (CST)
tags:
 - CSS
---

```css
display: flex;
justify-content: space-evenly;
```
IE 及 mobile 兼容性问题

https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content

解决方案：
```scss
.evenly-like {
  display: flex;
  justify-content: space-between;

  &:before,
  &:after {
    content: '';
    display: block;
  }
}
```

https://stackoverflow.com/questions/47534216/how-to-make-css-justify-contentspace-evenly-fallback-to-space-between-on-safari