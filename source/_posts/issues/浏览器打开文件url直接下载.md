
---
title: 浏览器打开文件url直接下载
date: Fri Dec 14 2018 14:24:55 GMT+0800 (CST)
tags:

---

### 前端：
通过给A标签加`download`属性，其`value`为文件名
#### 同步
```
<a href="xxx/xxx/xx.xx" download="filename">
```
#### 异步
```
//谷歌，360极速等浏览器下载
function download(src) {
    // 创建隐藏的可下载链接
    var eleLink = document.createElement('a');
    eleLink.download = src;
    eleLink.style.display = 'none';
    // // 字符内容转变成blob地址
    eleLink.href = src;
    // // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // // 然后移除
    document.body.removeChild(eleLink);
};
```
### 服务端：
设置响应头`Content-Disposition`
```
Content-Disposition: attachment; filename="filename.jpg"
```
nos通过url query的`download`参数来实现:
```js
window.location.href = 'http://url?download=filename.jpg'
```


参考链接：
- http://jsfiddle.net/onigetoc/ucsse0sj/  
- https://segmentfault.com/q/1010000010493203
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Disposition