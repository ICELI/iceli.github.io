---
title: vuex 源码速读
date: 2017-06-03 19:39:42
tags:
 - vue2
 - vue
 - vuex
---

> 阅读源码须知：
- 熟悉vuex用法
- 至少阅读过vuex的官方文档
- vuex 与 vue差不太多 都用了rollup进行打包
- 但是 vuex 没有用到flow

### 从代码构建入手

package.json
```js
scripts: {
	"build:main": "node build/build.main.js"
}
```

build/build.main.js
```js
build(Object.keys(configs).map(key => configs[key]))
```

build/configs.js
```js
const configs = {
  umdDev: {
    entry: resolve('src/index.js'),
    dest: resolve('dist/vuex.js'),
    format: 'umd',
    env: 'development'
  },
  umdProd: {
    entry: resolve('src/index.js'),
    dest: resolve('dist/vuex.min.js'),
    format: 'umd',
    env: 'production'
  },
  commonjs: {
    entry: resolve('src/index.js'),
    dest: resolve('dist/vuex.common.js'),
    format: 'cjs'
  },
  esm: {
    entry: resolve('src/index.esm.js'),
    dest: resolve('dist/vuex.esm.js'),
    format: 'es'
  }
}
```
vue2 采用webpack2，所以对应的是module属性的值"dist/vuex.esm.js" ，对应configs那入口文件就是index.esm.js了
package.json
```js
"main": "dist/vuex.common.js",
"module": "dist/vuex.esm.js",
"unpkg": "dist/vuex.js",
"typings": "types/index.d.ts",
```
对比index.esm.js与index.j就是多了一段代码
```js
export {
  Store,
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  createNamespacedHelpers
}
```
提供了按需import模块的接口

### 进入Store

### install
如果是浏览器环境，就自动安装Vuex
```js
// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

```
通过判断变量Vue来是否已经安装过，因为Vue是在此处赋值的。
```js
if (Vue) {	
  return
}
Vue =_Vue
applyMixin(Vue)
```

applyMixin(Vue)

```js
if (version >= 2) {
	const usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1
	Vue.mixin(usesInit ? { init: vuexInit } : { beforeCreate: vuexInit })
} else {
	// override init and inject vuex init procedure
	// for 1.x backwards compatibility.
	const _init = Vue.prototype._init
	Vue.prototype._init = function (options = {}) {
	  options.init = options.init
		? [vuexInit].concat(options.init)
		: vuexInit
	  _init.call(this, options)
	}
}
```
Vue.mixin
Vue2的通过`beforeCreate`钩子将vuex注入到Vue实例上`this.$store`。在v2.0.0-alpha.7之前`beforeCreate`钩子对应为`init`
注：在2.3.0以后，options.store可以为function，目的是解决store为对象时引起的副作用问题。
```js
this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
```




### version 占位符
构建时会替换为package.json里的version
```js
version: '__VERSION__',
```

### 辅助函数
- mapState
- mapMutations
- mapGetters
- mapActions

### createNamespacedHelpers
createNamespacedHelpers('foo/') 修改命名空间

```js
const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers('foo/')
const vm = new Vue({
  store,
  computed: {
	...mapState(['count']),
	...mapGetters(['isEven'])
  },
  methods: {
	...mapMutations(['inc', 'dec']),
	...mapActions(['actionA', 'actionB'])
  }
})
expect(vm.count).toBe(0)
expect(vm.isEven).toBe(true)
store.state.foo.count++
expect(vm.count).toBe(1)
expect(vm.isEven).toBe(false)
vm.inc()
expect(store.state.foo.count).toBe(2)
expect(store.getters['foo/isEven']).toBe(true)
vm.dec()
expect(store.state.foo.count).toBe(1)
expect(store.getters['foo/isEven']).toBe(false)
```