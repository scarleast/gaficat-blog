---
title: 通过SSH客户端配置文件管理多个秘钥
date: '2019-12-07 22:20:31'
abbrlink: 50ccaf37
tags:
  - linux命令
categories:
  - 教程
  - 小技巧
math: false
toc: true
---

# 摘要

本文介绍了常见的ssh多秘钥管理的方式（SSH客户端配置文件的基础知识），并介绍了一些最常见的配置选项可以通过本方式，更方便使用ssh、scp、git等命令完成认证。

# 背景

最近突然有了一个挺抓狂的问题，github不同项目设置了不同的ssh key，公司、自己的VPS秘钥不同，有的VPS在国外，需要连接代理，如果都需要通过SSH连接到多个远程系统，就会发现记住所有的远程IP地址，不同的用户名，非标准端口和各种命令行选项非常困难。

一种选择是为每个远程服务器连接[创建一个bash别名](https://linuxize.com/post/how-to-create-bash-aliases/)。但是，还有另一个更好，更简单的解决方案。OpenSSH允许您设置每个用户的配置文件，可以在其中为连接到的每台远程计算机存储不同的SSH选项。

# 配置过程

配置的过程，简单来说，就是创建一个配置文件：`~/.ssh/config`，将连接需要的参数填好即可。

## 预备工作

我们假设您使用的Linux或macOS系统已安装OpenSSH客户端。

## SSH配置文件位置

OpenSSH客户端配置文件位于`～/.ssh/config`，若没有，需要手动创建：

```bash
mkdir -p ~/.ssh && chmod 700 ~/.ssh
touch ~/.ssh/config && chmod 600 ~/.ssh/config
```

## SSH配置文件结构

SSH配置文件采用如下结构：

```bash
Host hostname1
    SSH_OPTION value
    SSH_OPTION value

Host hostname2
    SSH_OPTION value
```

- Host: 是给该主机其的别称，这里因为我的机器是腾讯云的，取名为tencent
- ServerAliveInterval: 因为腾讯云的机器，默认一段时间不操作后会断开连接，这个参数是为了保持连接的。20的意思是每20秒向服务器发送一个空字符，保持连接。
- HostName：主机名，写VPS的地址就行了。
- User：用户名
- Port：端口
- IdentityFile: 秘钥路径

## 基本示例配置文件

```shell ~/.ssh/config
Host dev
    HostName dev.example.com
    User john
    Port 2322
```

- Host：别称为dev
- HostName：主机名为dev.example.com
- User：用户名为john
- Port端口为2322

现在就可以输入如下命令查看效果了：

```bash
ssh dev
```

## 常用的一些其他参数

```bash
Host dev
    HostName dev.example.com
    User john
    Port 2322
    IdentityFile ~/.ssh/temple_ssh_key
    ServerAliveInterval 20
    ProxyCommand nc -X 5 -x 127.0.0.1:7891 %h %p
```

- IdentityFile：使用秘钥登录时的秘钥路径。
- ServerAliveInterval：部分VPS一段时间不输入字符会断开连接，这里的20表示每20秒向服务器发送一个空字符保持连接。
- ProxyCommand：代理，表示使用127.0.0.1：7891，socks5的代理连接VPS。

事实上，SSH的配置文件也被其他程序，如scp，sftp和rsync，一个常用的场景是同步文件，如我需要通过scp拷贝一个文件到远程的服务器，通常记住多个服务器的地址和配置很困难，若如上所示，完成了配置文件的设置，我们只需要输入：

```bash
scp ~/sample dev:~/sample
```

若没有配置文件，我们需要输入非常长的命令：

```bash
scp -i "~/.ssh/temple_ssh_key" -p 2322 ~/sample john@dev.example.com:~/sample
```

便捷程度一目了然。