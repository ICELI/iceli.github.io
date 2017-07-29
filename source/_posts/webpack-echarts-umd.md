---
layout: Webpack打包Echarts主题文件地图文件报错Echarts is not Loaded
title: Webpack打包Echarts主题文件地图文件报错Echarts is not Loaded
date: 2017-07-29 18:38:55
tags:
 - umd
 - webpack
 - echarts
---

Echarts主题文件地图文件用的是umd模块包装方案
```js
(function (root /* Object {} */, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {

  //
});
```
`debugger` 发现this传入的root不是window，而是个空对象`Object {}`，导致`root.echarts`无法获取到echarts。
而且当前模块运行环境即不支持AMD也不支持commonjs。

对比vue-cli提供的webpack配置与正常webpack配置（自己手写），多了babel-loader对js的处理，将babel-loader去掉即可正常。

原来babel 配置presets 的 modules 为false，问题可能出现在这里了，查看babel modules API如下：

[modules](https://www.npmjs.com/package/babel-preset-env#modules)
```doc
"amd" | "umd" | "systemjs" | "commonjs" | false, defaults to "commonjs".

Enable transformation of ES6 module syntax to another module type.

Setting this to false will not transform modules.
```

将modules改为umd后，babel为模块提供了运行环境，umd包装的模块即可正常运行。
```js
  "presets": [
    [
      "env",
      {
        "modules": "umd"
      }
    ],
    "stage-2"
  ],
```
https://github.com/jm-team/vue-seed/blob/master/.babelrc#L6

现在，我们已经知道怎么为模块提供运行环境，但是为什么那个this不是指向window呢？其实很简单，因为模块调用都是通过如下代码实现的：

```js
// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
```
每个模块调用都call硬绑定了this上下文为`module.exports`，初始化即是`{}`。