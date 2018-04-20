
---
title: Android 系统字体导致rem计算错误
date: Fri Apr 20 2018 17:10:07 GMT+0800 (CST)
tags:
 - 移动端
 - android
---

```html
<!DOCTYPE html>
<html style="font-size: 100px"> <!-- 取100是为了避免默认的16px被缩小后可能会有小数，浏览器对小数会四舍五入导致比例计算错误 -->
<head>
</head>
...
```
html初始取100是为了避免默认的16px被缩小后可能会有小数，浏览器对小数会四舍五入导致比例计算错误

```js
const computedSize = window.getComputedStyle(document.documentElement, null).getPropertyValue('font-size')
const androidScale = 100 / computedSize.replace('px', '')

;(function (win) {
  var doc = win.document,
    docElem = doc.documentElement,
    designDraftWidth = 750, //设计稿宽度
    dpr = Math.min(win.devicePixelRatio, 3),
    resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize';

  //设置dpr，安卓6以下不支持initial-scale小于1
  var userAgent = navigator.userAgent.toLowerCase();
  var check = userAgent.match(/android\s([0-9\.]*)/);
  if (check && check[1] && check[1].split(".")[0] - 6 < 0) {
    dpr = 1;
  }
  var scale = 1 / dpr;

  docElem.dataset.dpr = dpr;
  var metaElem = doc.createElement('meta');
  metaElem.name = 'viewport';
  metaElem.content = 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ", user-scalable=no, viewport-fit=cover";
  docElem.firstElementChild.appendChild(metaElem);
  var recalc = function () {
    var width = docElem.clientWidth;
    var rw = 100 * (width / designDraftWidth) * androidScale;
    docElem.style.fontSize = rw + 'px';
    window.htmlFontSize = rw
  };
  recalc();
  win.addEventListener(resizeEvt, recalc, false);
  win.recalc = recalc;
}(window));
```