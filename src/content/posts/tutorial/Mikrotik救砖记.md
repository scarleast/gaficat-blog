---
title: Mikrotik救砖记
date: '2021-01-26 16:47:04'
abbrlink: 211d5476
tags:
  - 3C数码
  - 教程
  - 路由器
categories:
  - 3C数码
  - 路由器
math: false
toc: true
---

本文记录给RB450Gx4重装RouterOS（ROS）系统的教程（作死记）。

<!-- more -->

# 起因

RouterOS简称ROS，是拉脱维亚的一家网络设备制造商MikroTik出品的路由器系统。不同于传统的路由器厂商（传统的路由器厂商通常是卖硬件盈利），MikroTik除了出售硬件的路由器、交换机以外，还会出售自己路由器系统的软件RouterOS，靠卖授权赚钱。当然了，MikroTik也是为数不多敢公布自己路由器实际测试成绩（比如这样：[RB450Gx4测试成绩](https://mikrotik.com/product/rb450gx4#fndtn-testresults)）的厂商。能靠卖路由器系统赚钱，那这个MikroTik的软件一定写的特别好，一定非常快、非常稳定？快不快、稳不稳定不好说，我也没用过，不过真的被安利ROS很久了，都说网页秒开，怎么怎么样好。

刚好最近在咸鱼收了一个MikroTik RB450Gx4，真的很想体验一下RouterOS，RB450Gx4做主路由负责DHCP Server，Linksys Velop负责AP，体验了一下，嗯，感觉还是挺香的~

但是，昨天晚上，发现我的绿米空调伴侣连接不上了（其实是DNS有问题），所以想重新连接一下我的绿米ZigBee插座。结果嫌关NAS太麻烦，就直接带电操作，长按开关进入配对模式，结果小米这个年轻人不讲武德，啪一下，很快啊，直接就断电了，我大意了，没有UPS，没有闪。

当我再次给RB450Gx4插上电时，我傻了，开机自检响一声，隔两秒钟，自动断电复位，又开始开机自检响一声，如此循环。我***？到手还没捂热，才用了半天时间，这断电就给我烧了？什么辣鸡？TMD，我都烦死了，查了半天百度，竟然没人和我遇到一样的情况？

这个时候，已经晚上11点半了，明天还要上班。但刚买的RB450Gx4响一声、重启，再响一声，再重启的时候，系统崩了，我人也崩了。就是感觉不得劲儿，坏也要坏的明白。直觉告诉我，它应该硬件没有坏，有可能是系统崩了，重新装一下系统也许能好。所以硬着头皮，给RouterOS装系统，果然，板子没有坏，重新安装系统就好了，话说路由器还有断电系统拉闸的？折腾完，都已经凌晨三点半了:(

# 预备知识

RouterOS的设置和一般的路由器不太一样，新手很容易设置崩了，所以了解如何恢复出厂设置属于基本操作，遇事不决，恢复出厂设置先。当然了，也许有人会遇到和我一样的情况，系统崩了需要重装。那么，切换RouterOS的启动模式就是预备知识了。

RouterOS分为以下几种启动模式：

- **备份引导启动模式**：有可能就像我遇到的情况，主引导进不去了，只能尝试进备份引导模式试试。
- **恢复出厂设置模式**：这个模式是主引导正常的前提下，恢复出厂设置并重启。
- **CAPs模式**：暂时不太清楚这个模式是干什么的，好像是和无线相关的，因为我用不到这个模式，所以也就不深究了。
- **Netinstall模式**：就是网络安装模式，当系统崩了，需要重装系统的时候，需要进入这个模式。

## 备份引导启动模式

备份引导启动模式有两种触发方式，一种是进入系统，通过命令行触发，另一种是通过reset按键，我暂时还用到，有问题直接重装系统。

- **命令行触发**：`system routerboard settings set force-backup-booter=yes`
- **通过reset按键触发**：通电前按住reset按键，通电后**三秒钟**后释放，以加载备份引导加载器。

## 恢复出厂设置模式

这种情况，是主引导正常，上电系统能跑起来，滴滴响两声，但是可能某些设置有问题，希望一次恢复出厂设置。我们知道，一般的路由器如果我们需要恢复出厂设置，通常都是长按背后的reset按键即可，当然，一般也支持在Web管理页面设置恢复出厂设置。MikroTik同样，ROS支持两种方式，一种是进入系统，通过命令行或者Web、winbox等管理页面，进行相关操作。另一种就是通过长按路由器上的reset键，恢复出厂设置。

### 进入路由器管理系统恢复出厂设置

- **通过命令行**（Web的命令行、SSH、talnet都可以）：`/system reset-configuration`
- **通过管理页面**：无论是winbox还是Web管理页面，都可以在`System -> Reset Configuration`找到恢复出厂设置的选项

### 按reset键恢复出厂设置

其实，我收到RB450Gx4以后，第一件事就是想恢复出厂设置，但是长按了reset键之后，发现啥用都没有？原来，**ROS通过reset键进行复位时，是需要先按住reset不放，再接通电源的**。按照下述步骤，即可恢复出厂设置。

1. 拔下设备电源
2. 按住reset键，并接通电源
3. 等待LED灯闪烁后松开reset键（注意，闪烁的间隔不是特别长，开始LED灯开始闪以后就松，别犹豫）

## 进入Netinstall模式

如果系统崩了，除了进入备份引导以外，还可以直接重装系统，RouterOS提供了一种Netinstall模式，即连接网线，直接通过网络安装，不需要折腾U盘什么的，若需要进入Netinstall模式：

1. 拔下设备电源
2. 接好网线到EHT1口
3. 按住reset键，并接通电源
4. 等待LED灯先闪烁，后常亮，再松开reset键

还是贴上官方的Wiki吧：[https://wiki.mikrotik.com/wiki/Manual:Reset](https://wiki.mikrotik.com/wiki/Manual:Reset)

## 出厂设置后的默认配置

RouterOS安装完系统是没有任何设置的，如果是虚拟机玩家，所有的设置都得自己完成。但对于MikroTik出品的硬件来说，都是带有初始化脚本的。脚本会在恢复出厂设置后，自动进行DHCP、防火墙等相关配置，简化我们的操作。我们可以在命令行输出`/system default-configuration print`查看相关默认初始化脚本。

实际上，MikroTik不同的启动模式，对应了不同的启动脚本，比如我的RB450Gx4若使用默认的设置，其启动脚本的描述如下所示：

```jsx
#| Welcome to RouterOS!
#|    1) Set a strong router password in the System > Users menu
#|    2) Upgrade the software in the System > Packages menu
#|    3) Enable firewall on untrusted networks
#| -----------------------------------------------------------------------------
#| RouterMode:
#|  * WAN port is protected by firewall and enabled DHCP client
#|  * Ethernet interfaces (except WAN port/s) are part of LAN bridge
#| LAN Configuration:
#|     IP address 192.168.88.1/24 is set on bridge (LAN port)
#|     DHCP Server: enabled;
#|     DNS: enabled;
#| WAN (gateway) Configuration:
#|     gateway:  ether1 ;
#|     ip4 firewall:  enabled;
#|     ip6 firewall:  enabled;
#|     NAT:   enabled;
#|     DHCP Client: enabled;
```

即，将WAN口设为了网口1，启动了防火墙和DHCP客户端，从上级路由获取IP上网，并启动了NAT。除了WAN以外的网口桥接在了一起，网段为192.168.88.1。

若在恢复出厂设置的时候，选择不使用默认设置，在默认的启动脚本中也有相关的描述：

```jsx
#-------------------------------------------------------------------------------
# Revert configuration.
# these commands are executed if user requests to remove default configuration
#-------------------------------------------------------------------------------
```

# 重装RouterOS的Todo

重装RouterOS需要使用一台windows电脑，因为使用的相关软件Netinstall和winbox都是windows平台的。

## 下载相关软件

重装RouterOS需要用到的软件有三个，本身的RouterOS系统、安装系统需要使用的Netinstall工具、安装完系统进行初始化设置的Winbox，下载这些软件到[官网](https://mikrotik.com/download)下载即可。Netinstall和Winbox选择Windows版本就行了，RouterOS系统由于不同的路由器使用的芯片架构不同，需要查询对应的架构，下载相应的安装包。我的路由器为[RB450Gx4](https://mikrotik.com/product/rb450gx4)，Architecture字段了解到是ARM架构，直接下载了ARM的安装包，其他的路由器请自行查找相关信息，当然[RB450Gx4](https://mikrotik.com/product/rb450gx4)的相关页面，也有系统的下载链接。

## 设置本机IP

由于路由器进入Netinstall模式后，是没有开DHCP服务的，所以我们电脑需要手动配置IP，RouterOS默认的IP是192.168.88.1，我们需要把电脑的IP设置到这个网段。

- 点击”开始“并打开”设置“

![打开设置](https://pic.gaficat.com/default/ROS装系统图1.png)

- 点击“网络和Internet”

![Windows 网络和Internet](https://pic.gaficat.com/default/ROS装系统图2.png)

- 选择“更改适配器选项”

  ![Windows更改适配器设置](https://pic.gaficat.com/default/ROS装系统图3.png)

- 右键电脑网卡对应的以太网接口，点击“属性”

![Windows以太网接口属性](https://pic.gaficat.com/default/ROS装系统图4.png)

- 选择”Internet 协议版本4“，并点击“属性”。

![Windows IPv4设置](https://pic.gaficat.com/default/ROS装系统图5.png)

- 按照下图进行相关设置

![Windows设置静态IP](https://pic.gaficat.com/default/ROS装系统图6.png)

## 使用Netinstall重装系统

- 直接双击Netinstall，选择Net booting，勾选上Boot Server enabled，并填写Client IP address，按照下图设置即可。

![Netinstall设置服务器](https://pic.gaficat.com/default/ROS装系统图7.png)

- 连接好路由器和电脑，通常，路由器能够从第一个端口 （Ether1） 或标有"BOOT"的端口使用 Netinstall。

![ROS装系统图网线连接](https://pic.gaficat.com/default/ROS装系统图8.png)

- 启动路由器，进入Netinstall模式。按照官方的Wiki，可以按住reset键，接通电源，直到电脑上的Netinstall软件检测到路由器后再松开。（官方的Wiki各处的说法不一样，按照实际情况来吧，我是按住reset键，接通电源后，LED闪烁，等待LED熄灭后就松，好使）
- 等到电脑上的Netinstall软件搜索到路由器以后，选择相应的设备，然后点击browse。

![Netinstall选择固件1](https://pic.gaficat.com/default/ROS装系统图9.png)

- 根据实际情况，选择我们现在的RouterOS所在的文件夹。

![Netinstall选择固件2](https://pic.gaficat.com/default/ROS装系统图10.png)

- 勾选需要安装的包，然后点击”instasll“。

![Netinstall启动安装](https://pic.gaficat.com/default/ROS装系统图11.png)

- 等待安装完成后，点击“reboot”重启。

![Netinstall重启设备](https://pic.gaficat.com/default/ROS装系统图12.png)

此时，你的路由器应该会滴一声自检，之后滴滴两声，启动完成。

## 进行初始设置

刚安装的RouterOS是没有任何设置的，包括IP的设置，这意味着没办法使用Web、SSH等方式连接路由器继续相关配置。所以，当你的路由器启动后，滴一声自检，之后滴滴两声，不要犹豫，系统其实装好了并且启动了。这个时候就需要使用winbox继续连接路由器，进行相关的设置了。

为啥Winbox能连接路由器？RouterOS刚装完系统，虽然没有进行IP等设置，但是Winbox可以不走三层的IP协议，直接通过MAC地址，和路由器进行通信。

Winbox的主界面长这样，输入路由器的 IP 或 MAC 地址、用户名和密码（如果有），然后单击"connect"按钮即可。

![Winbox连接设备](https://pic.gaficat.com/default/ROS装系统图13.png)

当然了，新装的RouterOS系统，还要输入MAC连接太麻烦了，这时候可以选择Neighors选项卡，点击刷新，不出意外，我们的路由器就会出现在列表中。

![Winbox查看局域网内设备](https://pic.gaficat.com/default/ROS装系统图14.png)

使用Winbox连接上路由器，在”system“中找到”Reset Configuration“

![ROS重置菜单](https://pic.gaficat.com/default/ROS装系统图15.png)

切勿勾选任何选项，直接点击Reset Configuration。

![ROS恢复出厂设置](https://pic.gaficat.com/default/ROS装系统图16.png)

如果不是虚拟机玩家，是购买的MikroTik的路由器硬件，等待重启后，将路由器端的网线插到非WAN口（我这一块款是ETH1以外的网口都行），就可以在浏览器输入192.168.88.1进入路由器后台了，系统默认的脚本，会设置好NAT、DHCP、桥接等配置，开箱即用。

# 尾巴

这篇文章其实拖了有几天，临近年底，人感觉没啥动力，感觉自己做的很多事情都是没有意义的，变不了现，看不到结果。

哎，人生哪有那么多丧，加油吧！毕竟RouterOS这玩意儿，自己用的还是挺舒服的，还是希望把自己踩坑的过程分享给更多人，给自己里一个Flag吧，接下来RouterOS出两篇文章：

- RouterOS+AP，WiFi竟然可以这么稳（想分享下我RouterOS+VELOP的体验，真的挺稳的，玩游戏就没再跳过ping）
- 关于RouterOS的初始化相关设置（RouterOS上手后应该怎么设置？）