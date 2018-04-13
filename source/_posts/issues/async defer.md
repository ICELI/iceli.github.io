
---
title: async defer
date: Fri Apr 13 2018 10:29:01 GMT+0800 (CST)
tags:

---

所以两个属性都指定是为了在async不支持的时候启用defer，但defer在某些情况下还是有bug。


可以一起用，合法的，规范有说明：
> The defer attribute may be specified even if the async attribute is specified, to cause legacy Web browsers that only support defer (and not async) to fall back to the defer behavior instead of the synchronous blocking behavior that is the default.

不过要理解这句话的潜在含义：为了 fallback async 可以连用 defer，但反过来是不成立的。

https://segmentfault.com/a/1190000006778717
https://segmentfault.com/q/1010000000640869