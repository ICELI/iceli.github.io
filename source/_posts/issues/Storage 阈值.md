
---
title: Storage 阈值
date: Tue Oct 30 2018 17:24:09 GMT+0800 (CST)
tags:

---

```
sessionStorage.setItem('小于5M')
```

```js
// 优化数据存储大小
const { data, activityList, ...storageData } = states
storageData.activityList = activityList.slice(0, size)
storageData.data = Object.keys(data).reduce((obj, k) => {
    obj[k] = data[k].slice(0, size)
    return obj
}, {})
```

https://stackoverflow.com/questions/23977690/local-storage-in-chrome