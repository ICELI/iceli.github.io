
---
title: tslint error不终止webpack dev
date: Wed Nov 14 2018 17:30:01 GMT+0800 (CST)
tags:
 - lint
---

```markdown
"defaultSeverity": "warning" will only work for tslint rules.
If tsconfig.json has "noUnusedLocals": true then webpack will return error to UI regardless of tslint settings.
```
Show warnings instead of compiler errors
https://github.com/wmonk/create-react-app-typescript/issues/238