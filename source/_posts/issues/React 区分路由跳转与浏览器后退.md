
---
title: React 区分路由跳转与浏览器后退
date: Fri Mar 16 2018 16:07:59 GMT+0800 (CST)
tags:
 - react
---

可以通过this.props.history.action来进行判断：就我所知action分为push和pop两种，push是通过路由，pop是通过goback；浏览器的前进后退按钮似乎都是pop

PS: 
#### history change 事件 与 组件渲染生命周期

- 浏览器后退 先走组件渲染再执行history监听事件回调
- SPA路由跳转 与上面刚好相反

https://segmentfault.com/q/1010000010183753