
---
title: React-router history报错 this.context.router
date: Sun Nov 11 2018 19:12:37 GMT+0800 (CST)
tags:
 - react
---

```
*报警平台 报警项目：推手-FrontAg前端诊断 * 报警：
本次报警监控从2018-11-11 13:50:00 到 2018-11-11 13:55:00, 共1条报警 

报警内容为：
2018-11-11 13:51:40 [Cannot read property 'history' of undefined]
【信息】： url: undefined option:undefined
【referer】： https://wx.ts.163.com/x/mall/index?v=1541055337445
【method】： e.render
-----
『设备信息』
【ip】：171.210.60.80
【traceId】： b49b16fe-1920-43d7-b17e-1d2e5de940aa
【推手id】： ff24b00b96121245
【ua】： Mozilla/5.0 (Linux; Android 5.1; OPPO R9tm Build/LMY47I; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.121 Mobile Safari/537.36 Dealer/Android/1.7.2.11 DealerD/DEVICE|T1BQTyBSOQ==/CHANNEL|update/DEVICE-ID|b49b16fe-1920-43d7-b17e-1d2e5de940aa/OS|QW5kcm9pZCA1LjE=
-----
『其他信息』
【堆栈信息】： TypeError: Cannot read property 'history' of undefined
    at e.render (https://dealer.nosdn.127.net/dealer_webapp/static/js/vendor.a0f05610.js:1:382184)
    at f (https://dealer.nosdn.127.net/dealer_webapp/static/js/vendor.a0f05610.js:1:32348)
    at beginWork (https://dealer.nosdn.127.net/dealer_webapp/static/js/vendor.a0f05610.js:1:35795)
    at i (https://dealer.nosdn.127.net/dealer_webapp/static/js/vendor.a0f05610.js:1:52069)
    at a (https://dealer.nosdn.127.net/dealer_webapp/static/js/vendor.a0f05610.js:1:52342)
    at w (https://dealer.nosdn.127.net/dealer_webapp/static/js/vendor.a0f05610.js:1:55293)
    at g (https://dealer.nosdn.127.net/dealer_webapp/static/js/vendor.a0f05610.js:1:54833)
    at m (https://dealer.nosdn.127.net/dealer_webapp/static/js/vendor.a0f05610.js:1:54670)
    at h (https://dealer.nosdn.127.net/dealer_webapp/static/js/vendor.a0f05610.js:1:54048)
    at l (https://dealer.nosdn.127.net/dealer_webapp/static/js/vendor.a0f05610.js:1:53505)
【urs】： 13551862517|1541029009|0|yanxuan_web|00&99|sic&1540377639&yanxuan_web#sic&null#10#0#0|&0|null|13551862517
【openId】： oozJX1DQ2CVFvEZ-cn2FVuKv0EP4
【屏幕尺寸】：360x640
```

https://github.com/ReactTraining/react-router/blob/v4.3.1/packages/react-router/modules/Route.js#L114

https://www.crifan.com/reactjs_react_router_this_context_router_undefined/


```jsx
static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      staticContext: PropTypes.object
    })//.isRequired
};

```