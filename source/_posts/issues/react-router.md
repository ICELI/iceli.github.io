
---
title: react-router
date: Wed Oct 17 2018 09:14:56 GMT+0800 (CST)
tags:
 - react
---

```js
const { history, location } = this.props

history.push(router.get('invitationPurchase'))
console.log(history, locaiton) // 还是原来的值
console.log(window.location) // 已经是最新的值
```

- history调用`.push` `.replace` 方法后无法获取最新的search/query参数
- 因为history和location都是通过props下发到组件的，所以不能在调用方法后直接获取。组件props跟新会促发`componentWillReceiveProps`
- 原生location可以获取