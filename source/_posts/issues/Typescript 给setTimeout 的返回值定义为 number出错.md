
---
title: Typescript 给setTimeout 的返回值定义为 number出错
date: Mon Jul 23 2018 15:17:06 GMT+0800 (CST)
tags:
 - NG
 - TS
---

```js
let scrollTimer: number = setTimeout(function () {})
// 不能将类型“Timer”分配给类型“number”
```
通过 `cmd` + 点击定位，发现`setTimeout`使用的是 Node.js 下的接口定义
@types/node index.d.ts
```js
declare function setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): NodeJS.Timer;
```
通过`yarn.lock`定位依赖，发现来源于`@types/react-dom`
```package.json
@types/react-dom
dependencies @types/node
```

而在typescript中，`window`下的`setTimeout`返回的是`number`：
```typescript
interface WindowTimers extends WindowTimersExtension {
    clearInterval(handle?: number): void;
    clearTimeout(handle?: number): void;
    setInterval(handler: (...args: any[]) => void, timeout: number): number;
    setInterval(handler: any, timeout?: any, ...args: any[]): number;
    setTimeout(handler: (...args: any[]) => void, timeout: number): number;
    setTimeout(handler: any, timeout?: any, ...args: any[]): number;
}

```

解决：
- 移除对`@type/node`的依赖(不太可行)
- 使用window.setTimeout
```js
let scrollTimer: number = window.setTimeout(function () {})
```

https://github.com/TypeStrong/atom-typescript/issues/1053