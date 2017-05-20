---
title: SPA 前端路由页面PV统计问题解决方案
date: 2017-05-20 21:41:00
categories: Angular
tags:
	- spa
	- angular
	- pv
---

百度统计pv方案
```js
$rootScope.$on('$stateChangeSuccess', function () {
    // 百度统计pv量
    _hmt.push(['_trackPageview', $location.path()]);
);
```

google差不多，在路由更新后
```js
ga('set', 'page', $location.path());
ga('send', 'pageview');

// 或者
ga('send', 'pageview', $location.path());
```

参考：
- https://github.com/jm-team/ng-seed/commit/705a037#diff-bd9c9dcd314f2d7df52935b3a6a4d504R92
- http://tongji.baidu.com/open/api/more?p=ref_trackPageview
- https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications
