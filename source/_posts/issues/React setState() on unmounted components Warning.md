
---
title: React setState() on unmounted components Warning
date: Wed Aug 01 2018 18:18:08 GMT+0800 (CST)
tags:
 - react
---

解决方案有几个：
- 自己封装一个cancelable Promise，在unmount的时候cancel掉。
- 对于通用数据抽到redux的store里用connect传props。
- 使用rxjs对异步做subscribe，unmount的时候dispose掉。
- 在异步setState之前做mount判断。如果你确认这个异步setState没有侵入性，也可以不理它。
- warning的目的在于让开发者确认自己的编码存在潜在的问题，在prod下是不报的。

https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html

https://www.zhihu.com/question/61389307