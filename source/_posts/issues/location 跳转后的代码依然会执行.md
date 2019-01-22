
---
title: location 跳转后的代码依然会执行
date: Tue Jan 22 2019 20:48:31 GMT+0800 (CST)
tags:

---

```
if (1) {
    location = 'http://www.baidu.com'
}
alert(2)
```
```
if (1) {
    location = 'http://www.baidu.com'
    return false
}
alert(2)
```
