---
title: Vue2源码：准备
date: 2017-05-05 13:05:00
categories: vue2
tags:
 - vue2
 - vue
---

> 因为`vue2`使用了`flow`进行静态代码检查，`rollup`进行代码构建，所以在进行源码阅读之前，还需要补充下这几块知识

### flow
- https://flow.org/
- http://www.imooc.com/m/wap/article/detail.html?aid=15855

### rollup
> Tree-shaking, 对于lib而言 rollup更适合用。

用 webpack 打包，还是会自带一个小型的动态 module 加载机制，并且每个文件是包在一个模块函数里的。rollup 打包通过重命名 import binding 直接把所有文件的函数都放在同一个函数体里面... 所以最终出来的文件会小一些，并且初始化快个十几毫秒的样子。--尤小右
 
- 官网 https://rollupjs.org/
- API https://github.com/rollup/rollup/wiki/JavaScript-API
- 尤小右 https://www.zhihu.com/question/37861778/answer/73847503
- 小爵 https://zhuanlan.zhihu.com/p/25276769

### API 分类
- Global Config
- Global API
- Options
	- Data
	- DOM
	- Lifecycle Hooks
	- Assets
	- composition
	- Misc
- Instance Properties
- Instance Methods
	- Data //stateMixin src/core/instance/state.js
	- Events //eventMixin src/core/instance/events.js
	- Lifecycle //除了$mount方法被分到runtime.js中定义，最终还是调用的`mountComponent`
- Directives
- Special Attributes
- Built-In Component
- VNode Interface
- Server-side Rendering

> 阅读源码时，可以看到这些API是在哪个阶段定义的，代码看完你找到了吗？
