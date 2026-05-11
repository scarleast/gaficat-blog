---
title: '只有一根电源线？照样玩转树莓派Zero W！'
date: '2019-11-05 21:36:35'
abbrlink: e19723e0
tags:
  - 树莓派
  - 电子设计
categories:
  - [电子设计, 树莓派]
  - [教程, 树莓派]
math: true
toc: true
---

# 背景

最近从小伙伴那里低价“买”来了一个树莓派Zero W，但是上手后，如何连接树莓派Zero W就成了问题。我尝试借助搜索引擎解决我的问题，但并没有找到一篇很完整、很完美解决我问题的文章。因此，我决定将自己折腾的过程记录下来。通过这篇文章，您将了解到从格式化SD卡开始，到烧写镜像，最后连接树莓派的全过程。

我这篇文章的题目叫“只有一根电源线？照样玩转树莓派Zero W！”，这其实明确了我期望的使用场景：

- 除了一根电源线，我不希望使用更多的配件了。比如额外的屏幕、键盘等等。插上电，我可以抱着自己的笔记本在房子里面到处走动，不需要担心一条随时会掉的“尾巴”。
- 我不希望占用树莓派Zero W的串口。因为树莓派的串口默认是给蓝牙使用的，某些情况下我可能依然需要使用蓝牙。
- 我不希望占用树莓派Zero W的USB数据接口，某些情况下我可能需要使用USB转TTL，连接一些传感器、模块。

面向搜索引擎解决问题的过程中，我搜到了一种解决方案：[如何优雅地食用树莓派Zero W](https://sspai.com/post/40086)，但这种方式需要占用树莓派Zero的USB数据接口，因此不满足上述的要求。最终，我决定通过网络，使用SSH连接树莓派。但树莓派Zero W没有网口，所以最终就只能通过WiFi来连接了。

ps：你可能会发现，“我的树莓派Zero上电之后怎么什么都不亮”，这其实因为树莓派Zero没有电源灯，只有一个读写SD卡的指示灯，所以烧录好镜像以后，就会亮灯了~因为这个事我一度怀疑我的小伙伴是奸商~

# 所需材料

- 树莓派Zero w
- SD卡和读卡器
- 数据线
- 没有了

<img src="https://pic.gaficat.com/maker/IMG20191104201638.jpg" style="zoom: 25%;" />

# 全过程

## 1.格式化SD卡

格式化SD卡，使用树莓派论坛推荐的[SD Memory Card Formatter](https://www.sdcard.org/downloads/formatter/)就行了，Windows和Mac平台都能使用（打不开官网的，给出[百度云](https://pan.baidu.com/s/1v_Ym613hFGyaUXE0ifNFDQ)链接吧）。打开软件，选择对应的SD卡，点击格式化即可。

## 2. 烧写镜像

我们可以在树莓派的官网看到两种镜像：[NOOBS](https://www.raspberrypi.org/downloads/noobs/)和[Raspbian](https://www.raspberrypi.org/downloads/raspbian/)。NOOBS是树莓派官方发布的工具，其实是集成了安装程序、恢复程序和镜像等。NOOBS对初次接触树莓派的人非常友好，下载好NOOBS的镜像，把内容解压到SD卡根目录，给树莓派插上 SD卡、键盘、鼠标、屏幕，上电即可，之后根据提示即可完成系统的安装。由于本次我们不单独给树莓派配备屏幕等配件，所以选择安装[Raspbian](https://www.raspberrypi.org/downloads/raspbian/)，[Raspbian](https://www.raspberrypi.org/downloads/raspbian/)有[“lite”](https://pan.baidu.com/s/1IhETg1WfY_jGH4LSBvSFmg)、“desktop”或者“desktop and recommended software”几个版本。我是程序猿，我想装逼，我不需要图形界面，所以就选择[“lite”](https://pan.baidu.com/s/1IhETg1WfY_jGH4LSBvSFmg)了。开玩笑啦，其实，毕竟Zero的性能有限，我不需要使用它的图形界面做一些其他事，只想在上面跑一些python脚本。当然也可以选择“desktop”或者“desktop and recommended software”版本的镜像，安装好之后可以使用VNC连接Zero，不过这不是本篇文章讨论的内容。

树莓派官方推荐使用开源工具[balenaEtcher](https://www.balena.io/etcher/)完成烧写镜像的过程，对于大多数用户而言，这是最简单的选择。使用[balenaEtcher](https://www.balena.io/etcher/)烧写镜像的过程如下：

- 下载[balenaEtcher](https://www.balena.io/etcher/)并安装
- 把SD卡插入读卡器
- 打开[balenaEtcher](https://www.balena.io/etcher/)并从硬盘中选择要写入SD卡的镜像文件（.img或.zip）
- 选择要写入镜像的SD卡
- 最后写入镜像即可

我在Windows平台测试，没有问题的，但是在Mac Mojave和Mac Catalina，该开源工具似乎并无法正常使用，不知道是不是我的打开姿势不对，所以无奈，Mac上只能使用命令行进行整个烧录过程。还是强烈建议各位使用[balenaEtcher](https://www.balena.io/etcher/)在Windows完成镜像的烧写过程，使用命令行烧写镜像，一旦选择错硬盘，将直接覆盖磁盘内的数据，三思而后行。

### 2.1 查找SD卡

格式化SD卡之后，首先使用`diskutil list`查找SD卡的磁盘，我们可以从**磁盘的描述、容量信息以及名称（注意/dev/disk2后面括号内的`(external，physical)标识`）**，看出我们SD卡对应的磁盘，这里，我的SD卡为：`/dev/disk2`，如下所示：

```shell
scarleastdeMacBook-Pro:~ scarleast$ diskutil list
/dev/disk0 (internal, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                        *500.3 GB   disk0
   1:                        EFI EFI                     314.6 MB   disk0s1
   2:                 Apple_APFS Container disk1         500.0 GB   disk0s2

/dev/disk1 (synthesized):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      APFS Container Scheme -                      +500.0 GB   disk1
                                 Physical Store disk0s2
   1:                APFS Volume Macintosh HD - 数据     107.9 GB   disk1s1
   2:                APFS Volume Preboot                 82.4 MB    disk1s2
   3:                APFS Volume Recovery                528.9 MB   disk1s3
   4:                APFS Volume VM                      3.2 GB     disk1s4
   5:                APFS Volume Macintosh HD            10.6 GB    disk1s5

/dev/disk2 (external, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:     FDisk_partition_scheme                        *15.9 GB    disk2
   1:             Windows_FAT_32 BOOT                    15.9 GB    disk2s1
```

### 2.2 为烧写镜像做准备

确定了SD卡的磁盘后，需要卸载SD卡，为烧写镜像做准备，使用`diskutil unmountDisk /dev/disk<disk# from diskutil>`即可，这里注意，需要自行替换`/dev/disk<disk# from diskutil>`为SD卡实际的设备名，如下所示（我的为`/dev/disk2`）：

```shell
scarleastdeMacBook-Pro:~ scarleast$ diskutil unmountDisk /dev/disk2
Unmount of all volumes on disk2 was successful
```

### 2.3  烧写镜像

使用`sudo dd bs=1m if=image.img of=/dev/rdisk<disk# from diskutil> conv=sync`，即可将镜像烧录到SD卡中，几个参数的含义：

- if：树莓派镜像的路径
- of：SD卡的路径，**务必确定这里填写的是SD卡的路径，否则有可能直接覆盖相应磁盘上的所有文件**

执行命令后，需要输入root密码，之后等待即可，期间希望查看进度，可以按`Ctrl + T`查看，过程如下所示：

```shell
scarleastdeMacBook-Pro:~ scarleast$ sudo dd bs=1m if=~/Desktop/2019-09-26-raspbian-buster-lite.img  of=/dev/rdisk2  conv=sync
load: 1.98  cmd: dd 6571 uninterruptible 0.00u 0.05s
48+0 records in
47+0 records out
49283072 bytes transferred in 2.859712 secs (17233578 bytes/sec)
load: 1.98  cmd: dd 6571 uninterruptible 0.00u 0.07s
73+0 records in
72+0 records out
75497472 bytes transferred in 4.517975 secs (16710467 bytes/sec)
load: 1.98  cmd: dd 6571 uninterruptible 0.01u 0.08s
85+0 records in
84+0 records out
88080384 bytes transferred in 5.720841 secs (15396405 bytes/sec)
load: 1.98  cmd: dd 6571 uninterruptible 0.01u 0.10s
98+0 records in
97+0 records out
101711872 bytes transferred in 6.617933 secs (15369130 bytes/sec)
2144+0 records in
2144+0 records out
2248146944 bytes transferred in 165.306870 secs (13599840 bytes/sec)
```

烧写完成之后，SD卡会自动挂载到`/Volume/<volume_label>`路径下，可以直接查看SD卡中的内容：

```shell
 ls /Volumes/boot/
COPYING.linux			bcm2710-rpi-3-b.dtb		fixup4x.dat			start.elf
LICENCE.broadcom		bcm2710-rpi-cm3.dtb		fixup_cd.dat			start4.elf
bcm2708-rpi-b-plus.dtb		bcm2711-rpi-4-b.dtb		fixup_db.dat			start4cd.elf
bcm2708-rpi-b.dtb		bootcode.bin			fixup_x.dat			start4db.elf
bcm2708-rpi-cm.dtb		cmdline.txt			issue.txt			start4x.elf
bcm2708-rpi-Zero-w.dtb		config.txt			kernel.img			start_cd.elf
bcm2708-rpi-Zero.dtb		fixup.dat			kernel7.img			start_db.elf
bcm2709-rpi-2-b.dtb		fixup4.dat			kernel7l.img			start_x.elf
bcm2710-rpi-2-b.dtb		fixup4cd.dat			kernel8.img
bcm2710-rpi-3-b-plus.dtb	fixup4db.dat			overlays
```



## 3. 设置wifi连接-重点

这一步是整个过程的重点，这一能让树莓派上电之后自动连接WiFi，连接了WiFi我们就可以通过SSH登录树莓派，进行一些操作了。

###  3.1 新建WiFi配置文件

用读卡器连接电脑，在SD卡根目录下，新建一个名称为`wpa_supplicant.conf`的文件，内容如下：

```shell
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
ssid="Test_WiFi_2.4G"
psk="HmBePxIi.3"
key_mgmt=WPA-PSK
}
```

我们**只需要关注和修改network中的内容**即可：

- ssid：WiFi的名称
- psk：WiFi的密码
- key_mgmt：加密方式，以实际情况填写，家用目前通常为`WPA/WPA2`，我这里填写`WPA-PSK`即可。

### 3.2 为树莓派开启ssh

在SD卡根目录新建一个名称为`ssh`的空文件，可以使用touch命令，`touch ssh`。

## 4. 上电

将SD卡安装到树莓派上，通电，等待1-2分钟，若配置没有问题，就可以在路由器的后台页面中，看到树莓派已经连接上WiFi了。

<img src="https://pic.gaficat.com/maker/树莓派zero连接上WiFi.png" style="zoom:50%;" />

此时使用ssh，默认账户名`pi`，默认密码`raspberry`，即可连接树莓派：

```shell
scarleastdeMacBook-Pro:~ scarleast$ ssh pi@192.168.0.153
The authenticity of host '192.168.0.153 (192.168.0.153)' can't be established.
ECDSA key fingerprint is SHA256:w8A0kgEd0oZDCF08dfoRYy2YYPA+Q+r8SObvsmETL2w.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '192.168.0.153' (ECDSA) to the list of known hosts.
pi@192.168.0.153's password: 
Linux raspberrypi 4.19.75+ #1270 Tue Sep 24 18:38:54 BST 2019 armv6l

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.

SSH is enabled and the default password for the 'pi' user has not been changed.
This is a security risk - please login as the 'pi' user and type 'passwd' to set a new password.

pi@raspberrypi:~ $ exit
```

最后，不要忘了根据命令行提示修改密码~

# 尾巴

其实之前，我一直使用使用的树莓派3b+，配套有屏幕和无线键盘鼠标，镜像也是选择NOOBS直接安装，连接树莓派选择就更多了。本文是在接触到了Zero之后，被逼无奈折腾的结果，有些时候不逼自己一把，怎么知道自己闲时间那么多呢？当然，这种配置WiFi的方式，在其他的树莓派硬件上同样适用。Happy Maker~