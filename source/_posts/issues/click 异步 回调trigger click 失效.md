
---
title: click 异步 回调trigger click 失效
date: Fri Sep 21 2018 12:09:09 GMT+0800 (CST)
tags:

---

浏览器之所以拦截新开窗口是因为该操作并不是用户主动触发的，所以它认为这是不安全的就拦截了，即使 ajax 回调函数中模拟执行 click 或者 submit 等用户行为（trigger('click')），浏览器也会认为不是由用户主动触发的，因此不能被安全执行，所以被拦截。

同：
ajax请求响应中用window.open打开新窗口会被浏览器拦截的解决方式
https://www.cnblogs.com/51kata/p/5473235.html