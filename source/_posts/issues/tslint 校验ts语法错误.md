
---
title: tslint 校验ts语法错误
date: Wed Jan 09 2019 16:31:46 GMT+0800 (CST)
tags:
 - lint
---

tslint 校验ts语法错误
```bash
$ tslint -c tslint.json -p tsconfig.json --type-check
```
但是该参数即将废弃，官方建议使用tsc检查
```bash
$ tsc -p tsconfig.json --noEmit
$ tslint -c tslint.json -p tsconfig.json
```
在使用git pre-commit + lint-staged 遇到新的问题

```bash
error TS5042: Option 'project' cannot be mixed with source files on a command line.
```
**无法使用--project参数**，官方回复
> lint-staged adds staged files as argument to your command, so there is a conflict of . and how lint-staged works. This is why you see this error. You should either do -p . and run it on precommit without lint-staged, or remove -p option.

总结：

1. tslint官方的说法，在下一个大版本才可能废除`--type-check`。所以可以先继续用着:
    ```
    tslint -c tslint.json -p . --type-check
    ```
2. 不使用`--type-check`，自己写shell实现ts语法检查
3. 不使用`lint-staged`，自己写shell实现

参考：  
https://github.com/palantir/tslint/issues/3399  
https://github.com/okonet/lint-staged/issues/412