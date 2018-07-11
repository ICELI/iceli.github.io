
---
title: regex 杠b
date: Wed Jul 11 2018 15:36:37 GMT+0800 (CST)
tags:
 - regex
---

\b与[\b]
- \b 单词边界
```js
'/x/x/x'.replace(/\b\//g, '-')
// "/x-x-x"

// 更好的方法
'/x/x/x'.replace(/([^\/]+)\//g, '$1-')
// "/x-x-x"
```
- [\b] 退格符
```bash
#命令行删除字符
$ > 123 + \b
$ > 12
```

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp