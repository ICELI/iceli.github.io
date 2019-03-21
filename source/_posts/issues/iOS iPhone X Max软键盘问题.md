
---
title: iOS iPhone X Max软键盘问题
date: Thu Mar 21 2019 11:34:47 GMT+0800 (CST)
tags:
 - iOS
---

iPhone X Max 焦点输入框唤起软键盘时，如果输入框距离页面底部的距离不够同时展示输入框与软键盘，页面会往上拉高一段距离。当收起软键盘时，这段距离不会自动复原（拖动页面可恢复），导致自定义alert组件的确定按钮位置偏移。

解决：给页面容器加padding-bottom

TODO：待排查原因是否与页面100vh有关？