
---
title: x5video Android全屏播放显示不全问题
date: Fri Nov 09 2018 14:44:27 GMT+0800 (CST)
tags:
 - 移动端
---

### 问题
- 先忽略iOS 不支持[H5同层播放器](https://x5.tencent.com/tbs/guide/video.html)
- Android下，X5内核浏览器（QQ浏览器，微信）
- 滚动至页面底部后
- 如果video的水平中心线在手机屏幕的水平中心线以下，点击播放video时窗口内容就会定位不准，

#### demo
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Video test</title>
  </head>
  <body>
    <video
      id="video"
      style="width:100%;margin: 1500px 0 50px"
      src="http://dealer.nosdn.127.net/2018-11-11/0571284dcfab225f/72894822494f6efd6aa17df560e230f3.mp4"
      controls="true"
      poster="http://dealer.nosdn.127.net/2018-11-11/0571284dcfab225f/72894822494f6efd6aa17df560e230f3.mp4?vframe&type=png"
      preload="auto"
      webkit-playsinline="true"
      playsinline="true"
      x-webkit-airplay="allow"
      x5-video-player-type="h5"
      x5-video-player-fullscreen="true"
      x5-video-orientation="portrait"
    ></video>
  </body>
</html>
```

#### 解决
- 当video播放时，给video加下边距，使其

```js
const video = document.querySelector("#video");

video.addEventListener("x5videoenterfullscreen", function() {
    video.style.marginBottom = "1000px";
});
video.addEventListener("x5videoexitfullscreen", function() {
    video.style.marginBottom = "";
});
```

#### 完整Demo
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Video test</title>
  </head>
  <body>
    <video
      id="video"
      style="width:100%;margin: 1500px 0 50px"
      src="http://dealer.nosdn.127.net/2018-11-11/0571284dcfab225f/72894822494f6efd6aa17df560e230f3.mp4"
      controls="true"
      poster="http://dealer.nosdn.127.net/2018-11-11/0571284dcfab225f/72894822494f6efd6aa17df560e230f3.mp4?vframe&type=png"
      preload="auto"
      webkit-playsinline="true"
      playsinline="true"
      x-webkit-airplay="allow"
      x5-video-player-type="h5"
      x5-video-player-fullscreen="true"
      x5-video-orientation="portrait"
    ></video>
    <script>
      const video = document.querySelector("#video");

      video.addEventListener("x5videoenterfullscreen", function() {
        video.style.marginBottom = "1000px";
      });
      video.addEventListener("x5videoexitfullscreen", function() {
        video.style.marginBottom = "";
      });
    </script>
  </body>
</html>

```
#### 参考
https://x5.tencent.com/tbs/guide/video.html
#### 为什么用H5同层播放器
https://www.jianshu.com/p/9dec20414bb8