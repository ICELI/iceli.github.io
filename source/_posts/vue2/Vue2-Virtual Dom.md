---
title: Vue2源码：Virtual Dom
date: 2017-05-07 13:05:07
categories: vue2
tags:
 - vue2
 - vue
---

### src/core/vdom/vnode.js


```js
constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions
  )
```
### src/core/vdom/create-component.js
componentOptions组件参数只在创建组件时才需传入，包含`Ctor, propsData, listeners, tag, children`
```js
const vnode = new VNode(
	`vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
	data, undefined, undefined, undefined, context,
	{ Ctor, propsData, listeners, tag, children }
)
```
