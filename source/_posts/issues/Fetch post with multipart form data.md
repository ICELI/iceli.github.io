
---
title: Fetch post with multipart form data
date: Sat Mar 31 2018 19:32:16 GMT+0800 (CST)
tags:
 - fetch
---

上传文件不需要设置`content-type` 将formData直接放于响应体，提交时浏览器会自动设置。
```
fetch.postJSON('/sharer/certificate/upload', {
    // ...data
},
    {
        headers: new Headers(),
        body:  fromData  
    }
)
```
```
Request Headers

Accept:*/*
Accept-Encoding:gzip, deflate, br
Accept-Language:zh-CN,zh;q=0.8
Cache-Control:no-cache
Connection:keep-alive
Content-Length:1945
Content-Type:multipart/form-data; boundary=----WebKitFormBoundary9g72c9Pkoq83YA4x
Host:localhost:3000
Origin:http://localhost:3000
Pragma:no-cache
Referer:http://localhost:3000/x/sharer/certificate/client
User-Agent:Dealer/iOS /1.0.0.1

Request Payload

------WebKitFormBoundary9g72c9Pkoq83YA4x
Content-Disposition: form-data; name="file"; filename="锁.png"
Content-Type: image/png


------WebKitFormBoundary9g72c9Pkoq83YA4x--
```

https://stackoverflow.com/questions/35192841/fetch-post-with-multipart-form-data/35206069

上传文件multipart form-data boundary 说明 http://www.cnblogs.com/yydcdut/p/3736667.html