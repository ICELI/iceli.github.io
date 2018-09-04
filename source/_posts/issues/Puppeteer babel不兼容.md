
---
title: Puppeteer babel不兼容
date: Tue Sep 04 2018 14:07:10 GMT+0800 (CST)
tags:

---

async function inside evaluate fails

Are you transforming your code with babel? The babel async function code isn't compatible with Puppeteer. We call function.toString and send your code into Chromium, but babel messes with that and we end up sending an incomplete string. You can get around this by using template strings instead of functions.
```js
await page.evaluate(`(async() => {
   console.log('1');
})()`);
```
https://github.com/GoogleChrome/puppeteer/issues/1665