
---
title: 避免git 菱形提交
date: Sat Mar 10 2018 15:34:53 GMT+0800 (CST)
tags:
 - git
---

```sh
git stash && git pull -r && git stash pop
```