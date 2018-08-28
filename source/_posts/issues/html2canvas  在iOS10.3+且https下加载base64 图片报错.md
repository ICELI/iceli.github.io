
---
title: html2canvas  在iOS10.3+且https下加载base64 图片报错
date: Tue Aug 28 2018 10:35:02 GMT+0800 (CST)
tags:
 - iOS
---

html2canvas版本 v0.5.0-alpha1

1. 升级canves2html版本
2. 不要使用base64图片

SecurityError when using Data URIs css backgrounds on iOS 10+ Safari/Chrome

https://github.com/niklasvh/html2canvas/commit/8999c7618184e1564d19d9c367a488c22c0d65a3
https://github.com/niklasvh/html2canvas/issues/1151