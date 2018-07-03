
---
title: sudo cat 追加文件报权限错误
date: Tue Jul 03 2018 20:19:09 GMT+0800 (CST)
tags:
 - shell
---

```bash
sudo cat hosts.patch > /etc/hosts  
```
系统提示Permission Denied

因为该命令会分成两步执行：
```bash
sudo cat hosts.patch #有sudo
```
```bash
> /etc/hosts #并没有sudo权限
```


解决：
```bash
sudo sh -c "cat hosts.patch > /etc/hosts"

# 或者：

echo "cat hosts.patch > /etc/hosts" | sudo sh
```


http://nigelzeng.iteye.com/blog/1696678