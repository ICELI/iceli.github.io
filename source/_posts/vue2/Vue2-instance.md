---
title: Vue2源码：源码速读
date: 2017-05-12 00:05:00
categories: vue2
tags:
 - vue2
 - vue
---

> 基本思路:
1. 首先通过模块依赖关系找到Vue类在哪定义
2. Vue类的属性及方法在哪个阶段定义的，理清添加的顺序及依赖关系
3. Vue实例化初始化方法的执行顺序，找到生命周期钩子在哪些对应方法中触发的
4. Vue实例化时，组件模板是如何渲染并更新到`el`上的
5. Vue实例，vm的Data响应式是怎么实现的
6. 阅读源码全程忽略`process.env.NODE_ENV !== 'production'`条件里的代码，先了解主流程

### 要理清命名的规则，便于理解每一步的作用
- xxxMixin(Vue) -- 给Vue类添加原型方法
- initXxx(vm) -- 给vm添加初始化属性
- vm -- 对应Vue的实例
- 内置私有方法或属性前加下划线`_`, 暴露给外部调用的方法或属性前加美元符号`$`

我们可以查看组件的接口配置文件`flow/component.js`，基本上包含了一个组件的所有属性和方法。

## 从代码构建入手

### 1. package.json
从scripts属性可看到打包入口文件build/build.js
```js
{
	...
	"build": "node build/build.js"
	...
}
```

可从main、module等属性获取对应的版本，竟然还有ts版，不知是否可用？
```js
"main": "dist/vue.runtime.common.js", // webpack1
"module": "dist/vue.runtime.esm.js", // webpack2 or rollup
"unpkg": "dist/vue.js", // 直接<script>引入vue文件
"typings": "types/index.d.ts", // typescript版 具体进度未知？？？
```

### 2. dist 构建后的文件存放目录
查看[README.md](https://github.com/vuejs/vue/blob/dev/dist/README.md)

#### Explanation of Build Files

| | UMD | CommonJS | ES Module |
| --- | --- | --- | --- |
| **Full** | vue.js | vue.common.js | vue.esm.js |
| **Runtime-only** | vue.runtime.js | vue.runtime.common.js | vue.runtime.esm.js |
| **Full (production)** | vue.min.js | | |
| **Runtime-only (production)** | vue.runtime.min.js | | |


我们用vue-cli时，因为用了vue-loader，不需要compiler编译模板。同时使用了ES6的import/export管理模块依赖。所以webpack2构建时所依赖的vue，就是基于ES module规范的runtime版本：`vue.runtime.esm.js`。


### 3. build/config.js 项目构建配置文件
dist目录下文件的rollup配置都在此文件中定义，其中`vue.runtime.esm.js`对应配置如下：
```js
'web-runtime-esm': {
    entry: resolve('web/runtime.js'),
    dest: resolve('dist/vue.runtime.esm.js'),
    format: 'es',
    banner
  },
```
找到rollup入口文件`web/runtime.js`

### 4. build/alias.js
通过别名快速定位文件依赖，就是webstorm不能`ctrl+点击`跳转了,有点坑
```js
module.exports = {
  vue: path.resolve(__dirname, '../src/platforms/web/runtime-with-compiler'),
  compiler: path.resolve(__dirname, '../src/compiler'),
  core: path.resolve(__dirname, '../src/core'),
  shared: path.resolve(__dirname, '../src/shared'),
  web: path.resolve(__dirname, '../src/platforms/web'),
  weex: path.resolve(__dirname, '../src/platforms/weex'),
  server: path.resolve(__dirname, '../src/server'),
  entries: path.resolve(__dirname, '../src/entries'),
  sfc: path.resolve(__dirname, '../src/sfc')
}
```

### 5. src/platforms/web/runtime.js 通过别名找到源文件，只有2行。。。

### 6. src/platforms/web/runtime/index.js 这才是真身。。。
vue启动方法`$mount`在此定义，挂载至el，该参数可以是string 或者 Element，如果是字符串就调用document.querySelector方法返回DOM


### 7. src/core/index.js 顺着`import Vue from xxx`我们一路来到了core目录

### 8. src/core/instance/index.js
终于见到你，还好我没放弃
```js
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
```
Vue构造函数就是在此定义，内部执行初始化方法`_init`，该方法在`initMixin`中定义`Vue.prototype._init`
先在内部执行一系列初始化方法
```js
initLifecycle(vm)
initEvents(vm)
initRender(vm)
callHook(vm, 'beforeCreate')
initInjections(vm) // resolve injections before data/props
initState(vm)
initProvide(vm) // resolve provide after data/props
callHook(vm, 'created')
```

最后，当实例化参数有`el`时，自动挂载实例至此DOM元素。
```js
if (vm.$options.el) {
  vm.$mount(vm.$options.el)
}
```
几个在mountComponent用到的方法：
renderMixin: _render
lifecycleMixin: _update
Watcher: _watcher

initEvent


```
// init parent attached events
  const listeners = vm.$options._parentListeners
  if (listeners) {
    updateComponentListeners(vm, listeners)
  }
```
开始不明白为什么在这里要判断`listeners`，因为`vm.$options._parentListeners`是在initRender之后才能获得，好像永远没有这属性了
后来发现在initInternalComponent 内部组件初始化时会用定义，内部组件为了达到优化的目的直接复制对象过去，跳过merge options。

initInternalComponent有一个条件就是_isComponent, 它又是在什么时候定义的呢
先定义的组件vue.component => new Vue() => mountComponent => new Watcher => updateComponent => _render() => _update => __path__ => createPatchFunction => createElm =>
createComponentInstanceForVnode  = componentVNodeHooks => createComponent => i(vnode, false /* hydrating */, parentElm, refElm);
初始化vnode组件实例时vnode.componentInstance，返回的是new vnodeComponentOptions.Ctor(options)，Ctor它指向Vue.component定义组件时返回的Sub构造函数，通过Vue.extend拷贝继承Vue。
所以，在实例化子组件时和实例化Vue很像。
![img](../../images/vue-call-stack.png)
到这里vdom的内容也看了大半了,顺带来看了initGlobalAPI的核心API
`
initRender


### 9. src/core/global-api/index.js
挂载各种方法
