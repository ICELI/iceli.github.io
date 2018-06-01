
---
title: Element UI Table组件过多导致页面卡顿
date: Fri Jun 01 2018 16:18:51 GMT+0800 (CST)
tags:
 - CSS
---

```css
.el-table__body,
.el-table__footer,
.el-table__header {
    table-layout:fixed;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
}
```