---
title: JS直接设置元素样式属性和transition，过渡效果异常及Firefox浏览器异常解决方法
date: 2017-05-29 21:19:34
tags:
 - css
 - transition
 - firefox
---

我们即使先对元素设置属性，再设置transition也会有过渡效果。
```js
element.style.left = -100%;
element.style.transition = "left .5s";
```

因为JavaScript是单线程的，所以对元素样式的修改是同时发生的。一般我们会想到用setTimeout去解决。
```js
element.style.left = -100%;
setTimeout(function() {
    element.style.transition = "left .5s";
}, 10) // firefox 最小时间为10ms
// https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout#最小延迟和超时嵌套
```

不过在Firefox下时好时坏，这可能与Firefox对css渲染的执行机制有关。在延迟时间较小时，Firefox并未重绘样式，那我们怎么确保做到重绘且时间最小呢。有两种办法可：
1. requestAnimationFrame 在重绘的回调内设置transition过渡效果
    ```
    element.style.left = -100%;
    requestAnimationFrame(function() {
        element.style.transition = "left .5s";
    })
    ```
2. getComputedStyle 强制触发重绘再设置transition过渡效果
    ```
    element.style.left = -100%;
    getComputedStyle(element).left
    element.style.transition = "left .5s";
    ```

> 参考：[临时无视CSS3的transition直接设置样式](https://www.web-tinker.com/article/20286.html)
demo：http://plnkr.co/edit/HGAIP45kU2Ooia6zH98z?p=preview