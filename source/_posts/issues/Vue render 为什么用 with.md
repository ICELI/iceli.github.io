
---
title: Vue render 为什么用 with
date: Mon May 14 2018 21:15:26 GMT+0800 (CST)
tags:
 - vue
---

```js
var aaa = {
    data: {s:1},
    render: function(){
        with(this) {
            console.log(data) // 无需this.data
        }
    }
}

aaa.render() // {s: 1}

```