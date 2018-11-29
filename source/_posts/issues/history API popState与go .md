
---
title: history API popState与go 
date: Thu Nov 29 2018 17:24:40 GMT+0800 (CST)
tags:

---

```js
history.pushState({
    page: "credited"
},"");
history.pushState({
    page: "current"
},"");

window.addEventListener("popstate", function(event) {
    if(event.state.page != "credited"){
        return false;
    }
    history.go(-4); //todo: 长度判断
});
```
- `history.go` 当-4期间的页面有location跳转时，无论目标地址是不是location访问的，都会location回去。
- popstate只能监听浏览器后退