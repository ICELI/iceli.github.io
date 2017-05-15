---
title: Vue2源码：响应式原理
date: 2017-05-06 13:05:07
categories: vue2
tags:
 - vue2
 - vue
---

> 把一个普通 JavaScript 对象传给 Vue 实例的 data 选项，Vue 将遍历此对象所有的属性，并使用 Object.defineProperty 把这些属性全部转为 getter/setter。Object.defineProperty 是仅 ES5 支持，且无法 shim 的特性，这也就是为什么 Vue 不支持 IE8 以及更低版本浏览器的原因。


> 每个组件实例都有相应的 watcher 实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新。

![img](https://cn.vuejs.org/images/data.png)
![img](https://cn.vuejs.org/images/lifecycle.png)

### src/core/instance/state.js
