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

### 5. ../src/platforms/web/runtime.js 通过别名找到源文件，只有2行。。。

### 6. ../src/platforms/web/runtime/index.js 这才是真身。。。

### 7. 
