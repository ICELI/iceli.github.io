
---
title: 代理NEI线上接口DELETE请求204 No Content
date: Mon Mar 18 2019 17:24:26 GMT+0800 (CST)
tags:

---

背景：
本地开发时，接口使用`http-proxy-middleware` 代理至NEI线上接口，delete请求http status code 204 无响应体，导致fetch插件的deleteJSON解析json()报错。

问题：
- NEI为什么会返回204
- 如果无法定位问题，是否可以绕过

解决:
1. 强制修改代理返回的内容，但还是无法获取nei上的mock数据
    ```js
    onProxyRes: function(proxyRes, req, res) {
        if (proxyRes.statusCode === 204) {
            proxyRes.statusCode = 200
            proxyRes.statusMessage = 'OK'
    
            proxyRes.on('end', function() {
                res.end(JSON.stringify({}))
            })
        }
    },
    ```
2. 使用nei本地mock服务，不会返回204，直接绕过该问题
    ```bash
    $ nei server # http://localhost:8002
    ```

参考：
- https://github.com/chimurai/http-proxy-middleware/issues/151
- https://github.com/chimurai/http-proxy-middleware/issues/97
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/DELETE
- [webpack跨域问题 options请求返回204 No Content？](https://segmentfault.com/q/1010000014866522)