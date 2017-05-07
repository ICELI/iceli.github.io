---
title: git submodule 子模块的使用
date: 2017-05-06 22:03:39
categories: git
tags:
 - git
---

> `git submodule` 有时候我们将一个项目分成多个子模块去维护，但是又想要有一个清晰的项目包含关系就可以通过父子模块来实现。

比如我有一个nodejs学习的项目计划，包含很多个nodejs模块的学习，每一个小模块的demo都有自己独立的依赖包，为了方便写demo我将他们分为nodejs-xxx系列的小项目。他们分散在github的仓库列表里。为了可以清晰的查看他们，我们可以通过git子模块去管理他们。

基本上通过《[Git-工具-子模块](https://git-scm.com/book/zh/v1/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)》这篇文章就可以掌握它的实现步骤。但是，关于子模块代码更新同步的地方没有讲清楚，这里写下我自己总结的步骤：

1. 添加子模块
 ```bash
 $ git submodule add https://github.com/ICELI/nodejs-xlsx.git nodejs-xlsx
 ```
 .gitmodules可以看到新增了以下内容
 ```
 [submodule "nodejs-xlsx"]
     path = nodejs-xlsx
     url = https://github.com/ICELI/nodejs-xlsx.git
 ```

2. 下载包含子模块的项目后，
 ```
 git clone https://github.com/ICELI/nodejs.git
 ```
 先`git submodule init`，再`git submodule update`更新子模块代码

3. 在其它地方对子模块改动后，本地仓库怎么同步呢
 - 先重复以上步骤
 - 在子模块`git merge origin/master`(也可以是其他分支)
 - 在父模块`git add .`（可通过`git status`查看改动，选择上面的子模块改动）
 - 在父模块`git commit -m 'update submodule'`
 - 在父模块`git pull`（提交子模块的改动）
 
这样我们既可以通过小项目去维护代码，又可以通过一个大的父项目去查看和维护整个项目