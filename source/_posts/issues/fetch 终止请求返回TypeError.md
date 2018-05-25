
---
title: fetch 终止请求返回TypeError
date: Fri May 25 2018 15:11:09 GMT+0800 (CST)
tags:
 - iOS
 - 移动端
---

- ios11+ 微信6.6.6+
微信返回 TypeError: 已取消 
- ios10 微信6.6.6+
微信返回 TypeError: type error 

触发条件：
当前页面发起fetch请求，a、location跳转离开当前页面，导致fetch失败。

https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch#%E6%A3%80%E6%B5%8B%E8%AF%B7%E6%B1%82%E6%98%AF%E5%90%A6%E6%88%90%E5%8A%9F