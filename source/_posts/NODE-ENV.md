---
title: 根据Node 环境变量实现不同环境下模块依赖的问题
date: 2017-09-12 16:49:27
tags:
 - Node.js
 - webpack
 - NODE_ENV
 - Build
---

### 推荐：
```js
let config

if (process.env.NODE_CONFIG === 'test') {
  config = require('./address.test')
} else if (process.env.NODE_CONFIG === 'pre') {
  config = require('./address.pre')
} else if (process.env.NODE_CONFIG === 'prod') {
  config = require('./address.prod')
} else if (process.env.NODE_CONFIG === 'dev') {
  config = require('./address.pre')
}

module.exports = config

```

将环境变量`process.env.Node_CONFIG`与预期的值进行比较，比如放在if条件判断语句中，这样在构建过程即会根据当前的环境配置转化为布尔值，且只加载对应的模块，不符合条件的模块会被忽略。

- Node环境与浏览器环境无差别，代码构建后只包含当前环境下依赖的模块

### 反例：
```js
let env = process.env.Node_CONFIG || 'dev'
let config

switch (env) {
  case 'test':
    config = require('./address.test')
    break
  case 'pre':
    config = require('./address.pre')
    break
  case 'prod':
    config = require('./address.prod')
    break
  default:
    config = require('./address.dev')
}

module.exports = config

```

上面例子中，由于环境变量`process.env.Node_CONFIG`只是赋值给了一个变量，没有直接进行逻辑判断，所以`process.env.Node_CONFIG`不会转化为布尔值。

虽然构建时也能根据当前的环境变量获取对应的模块，但是代码逻辑会保留，4个模块都会打包进bundle。而且在浏览器环境中我们无法获取环境变量，以至于只使用dev模块。

- 在Node环境下使用正常
- 打包至浏览器端使用时出错 
- 构建时4个模块都会打包进来

### 总结：
当我们想要根据Node环境变量实现不同环境下模块依赖时：
- 如果该模块只在Node环境下使用，比如webpack构建前的配置文件，则没有使用限制。
- 如果模块需要在浏览器下环境下使用，这必须确保`process.env.Node_xxx`已经被替换为具体的值或者根据逻辑比较转为布尔值。

```js
new webpack.DefinePlugin({
    'process.env': {
      NODE_CONFIG: JSON.stringify(process.env.NODE_CONFIG || 'dev')
    }
  })

// or

if (process.env.NODE_CONFIG === 'test') {
    
}
```
http://git.jm.com/FE-team/nuxt-template/tree/ssr-api