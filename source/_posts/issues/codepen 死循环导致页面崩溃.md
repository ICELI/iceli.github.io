
---
title: codepen 死循环导致页面崩溃
date: Tue Apr 23 2019 17:19:13 GMT+0800 (CST)
tags:

---

codepen 死循环导致页面崩溃，包括dashboard页面也无法进入

发现了两种方法可以避免未编写完的JS文件自动刷新导致的卡死:

- 在URL后面加上?turn_off_js=true.
    ```
    https://codepen.io/ICELI/pen/eoLgJr?turn_off_js=true
    ```
- Settings > Behavior > Want a Run Button? > 取消勾选"AUTO UPDATE PREVIEW".

https://www.cnblogs.com/7z7chn/p/5068345.html