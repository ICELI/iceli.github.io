
---
title: 微信分享自定义内容失效 the permission value is offline verifying
date: Thu May 10 2018 14:28:07 GMT+0800 (CST)
tags:

---

```
errMsg : "onMenuShareTimeline:fail, the permission value is offline verifying
```
若在组件渲染时直接调用JSAPI，则必须写在wx.ready的回调中。

```js
window.wx && window.wx.ready(function () {
    wxUtil.setWeixinShare(shareInfo)
})
```