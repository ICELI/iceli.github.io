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
	- Data
	- Events
	- Lifecycle
- Directives
- Special Attributes
- Built-In Component
- VNode Interface
- Server-side Rendering

> 阅读源码时，可以看到这些方法是在哪个阶段定义的，代码看完你找到了吗？

## 从代码构建入手

### 1. package.json
从scripts属性可看到打包入口文件build/build.js
```json
{
	...
	"build": "node build/build.js"
	...
}
```

可从main、module等属性获取对应的版本，竟然还有ts版，不知是否可用？
```
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
dist目录下的文件就是根据这个rollup配置生成的，其中`vue.runtime.esm.js`对应配置如下：
```
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
```
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
```
initLifecycle(vm)
initEvents(vm)
initRender(vm)
callHook(vm, 'beforeCreate')
initInjections(vm) // resolve injections before data/props
initState(vm)
initProvide(vm) // resolve provide after data/props
callHook(vm, 'created')
```

最后，当实例化传入`el`时，自动挂载实例至此DOM元素。
```js
if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
```
几个在mountComponent用到的方法：
renderMixin: _render
lifecycleMixin: _update
Watcher: _watcher


在initMixin之后，又对state、event、lifecycle、render进行混合
 
>要理清命名的规则，便于理解每一步的作用
- xxxMixin -- 给Vue类添加原型方法
- initXxx -- 给vm添加初始化属性
- vm -- 对应Vue的实例
- 内置私有方法或属性前加下划线`_`, 暴露给外部调用的方法或属性前加美元符号`$`

我们可以查看组件的接口配置文件`flow/component.js`
基本上包含了一个组件的所有属性和方法。

### 9. src/core/global-api/index.js
挂载各种方法


> 阅读源码全程忽略`process.env.NODE_ENV !== 'production'`条件里的代码，先了解主流程