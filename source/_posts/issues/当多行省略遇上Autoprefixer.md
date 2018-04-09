
---
title: 当多行省略遇上Autoprefixer
date: Mon Apr 09 2018 14:54:54 GMT+0800 (CST)
tags:
 - postcss
 - autoprefixer
---

```scss
text-overflow:ellipsis;
display:-webkit-box;
-webkit-box-orient:vertical;
-webkit-line-clamp:2;
```
Autoprefixer 7.1.6 会将`-webkit-box-orient:vertical;`移除。
解决：
- `remove: false` 无效
- 
```css
display:-webkit-box;
/* autoprefixer: off */
-webkit-box-orient: vertical;
/* autoprefixer: on */
-webkit-line-clamp:2;
```