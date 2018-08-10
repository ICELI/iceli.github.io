
---
title: Angular form ngModule 交互失效
date: Fri Aug 10 2018 09:59:20 GMT+0800 (CST)
tags:
 - NG
---

form 表单元素如果使用了[(ngModel)]="name"，
- 添加`name="name"`
- 添加配置项`[ngModelOptions]="{standalone: true}"`

```js
ERROR Error: If ngModel is used within a form tag, either the name attribute must be set or the form
      control must be defined as 'standalone' in ngModelOptions.

      Example 1: <input [(ngModel)]="person.firstName" name="first">
      Example 2: <input [(ngModel)]="person.firstName" [ngModelOptions]="{standalone: true}">
    at Function.TemplateDrivenErrors.missingNameException (forms.es5.js:4122)
    at NgModel._checkName (forms.es5.js:4440)
    at NgModel._checkForErrors (forms.es5.js:4419)
    at NgModel.ngOnChanges (forms.es5.js:4324)
    at checkAndUpdateDirectiveInline (core.es5.js:10840)
    at checkAndUpdateNodeInline (core.es5.js:12341)
    at checkAndUpdateNode (core.es5.js:12284)
    at debugCheckAndUpdateNode (core.es5.js:13141)
    at debugCheckDirectivesFn (core.es5.js:13082)
    at Object.eval [as updateDirectives] (RecommendCreateModalComponent.html:11)
```