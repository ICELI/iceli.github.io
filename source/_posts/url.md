---
title: Angularjs $location.search实现URL保存搜索条件
date: 2017-04-12 11:31:20
categories: Angular
tags:
	- FE
	- ng
	- angular
	- url
---

> 当查询条件较少且固定时，推荐使用路由方式比较简便。当搜索条件多且不定的情况下，可使用该方法。

1. 页面刷新初始化一次查询`initSearch()` [#L37](https://github.com/jm-team/ng-seed/blob/v0.7.0/src/page/components/search/search.controller.js#L37)
2. 搜索和浏览器前进后退的查询都用`$locationChangeSuccess`事件，回调执行 `initSearch()`  [#L16](https://github.com/jm-team/ng-seed/blob/v0.7.0/dep/jmui/search/index.js#L16) 
3. 搜索的`$locationChangeSuccess`事件由执行`$location.search(option)`方法触发[#L23](https://github.com/jm-team/ng-seed/blob/v0.7.0/src/page/components/search/search.controller.js#L23)
4. 我们把查询事件的异常处理提取到[jmSearch](https://github.com/jm-team/ng-seed/blob/v0.7.0/dep/jmui/search/index.js)服务当中，该服务由jmui管理
5. 需要保存搜索条件的页面在controller中注入jmSearch服务 [#L6](https://github.com/jm-team/ng-seed/blob/v0.7.0/src/page/components/search/search.controller.js#L6)
6. jmSearch需要传入当前`$scope`和查询的方法`initSearch` [#L39](https://github.com/jm-team/ng-seed/blob/v0.7.0/src/page/components/search/search.controller.js#L39)
7. 页面路由需配置`reloadOnSearch: false`, 防止刷新页面 [search.js#L6](https://github.com/jm-team/ng-seed/blob/v0.7.0/src/page/components/search/search.router.js#L6)

参考：[ng-seed ](https://github.com/jm-team/ng-seed) /search模块