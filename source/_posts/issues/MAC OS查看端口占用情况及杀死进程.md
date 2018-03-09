
---
title: MAC OS查看端口占用情况及杀死进程
date: Fri Mar 09 2018 16:30:19 GMT+0800 (CST)
tags:
 - shell
 - mac
---

终端命令

sudo lsof -i :9000

COMMAND   PID    USER   FD      TYPE             DEVICE                      SIZE/OFF      NODE       NAME

java              716      a           313u   IPv6               0x1111111111111     0t0                    TCP        *:cslistener (LISTEN)


然后根据PID杀进程：

sudo kill -9 716