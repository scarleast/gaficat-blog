---
title: 总是忘打卡？用iBeacon提醒你！
date: '2020-04-27 23:44:59'
abbrlink: edbd28cc
tags:
  - 电子设计
categories:
  - 电子设计
  - 其他
math: false
toc: true
---

# 背景

最近公司将打卡系统更换为了企业微信打卡，于是就出现了一个很麻烦的问题，**忘打卡**。企业微信虽然也有自动打卡，但是还是需要手动点开app，很多时候，我忘记的是手动在手机上点一下app这个过程。怎么提醒自己呢？我想过设闹钟，但是弹性工作制，上午8点到10点之间去公司都可以，只要打够9个小时的卡就行了。所以我什么时候到公司，时间是不确定的，闹钟肯定是不靠谱的，那怎么办呢？

理想情况下当然是**基于地理位置提醒**了，当我到达或离开公司的时候，能够自动提醒我打卡。我也确实做了尝试——IFTTT，但它的定位服务总是有一些问题，并且手机上一直开着定位服务耗电也是一个问题。所以手机app，基于定位提醒也无法实现了。当然了，我也想过其他的解决方案，比如在公司放一台扫描某个信号的设备，扫描如NFC、蓝牙之类的信号，就能判断我是否到达公司了。但NFC——距离太近，手机蓝牙——需要连接蓝牙耳机并不空闲，所以这个想法就一直搁置了。

后来无意间逛某宝，我看到了**iBeacon信标**，最终一个角落里的树莓派、一个iBeacon信标完美解决**基于地理位置（我是否在公司）**，提醒我打卡的问题。只要我人到达公司或者下班人离开公司，都会通过[server酱](http://sc.ftqq.com/3.version)推送给微信，提醒自己打卡。因为有华米的手表，所以完全不用担心听不到通知的情况。

按照惯例，先上效果，手机上收到的提醒：

<img src="https://pic.gaficat.com/default/image-20200426162508739.png" alt="打卡通知" style="zoom: 40%;" />



iBeacon信标就是这个白白的东西：

<img src="https://pic.gaficat.com/default/iBeacon信标.jpg" alt="iBeacon信标" style="zoom: 25%;" />

树莓派躲在角落瑟瑟发抖：

<img src="https://pic.gaficat.com/default/躲在角落的树莓派.jpg" alt="躲在角落的树莓派" style="zoom:25%;" />

# 关于iBeacon

## 何为iBeacon

Wikipedia这样说：

> iBeacon是苹果公司提出的“一种可以让附近手持电子设备检测到的一种新的低功耗、低成本信号传送器”的一套可用于室内定位系统的协议。

当然啦，我在一开始看到这种解释的时候，也是蒙的。用人话来说：**iBeacon是苹果推出的一种通信协议（通信协议有很多，比如HTTP），只不过它是基于低功耗蓝牙（BLE）通信的，应用的场景很多，比如室内定位、微信摇一摇周边。**

我们可以简单把iBeacon理解为两个角色，发送者（信标）和接收方。信标每隔一段时间，向周围发送广播——“我在这！”接收方在需要的时候，监听信标发送的内容，就能知道周围有几个iBeacon信标以及他们广播的内容了。信标只向外发送数据，不接收数据。接收方只接收数据，不向iBeacon节点发送数据。

![ibeacon-communication](https://pic.gaficat.com/default/ibeacon-communication.jpg)



## iBeacon的优势

### 省电

通常的无线通信协议，需要双方都监听某个信道，来回交换数据。比如我们常用的蓝牙（不是mesh蓝牙），分为主机和从机，我们很明显的感受是，两边都需要开启蓝牙，然后配对，再建立连接。这个过程其实就要求主机、从机都监听某个信道，以完成双向通信的过程。当然了，这种双向通信的需求在某些场景下是必要的，如蓝牙耳机、蓝牙键盘、蓝牙灯泡等。那主机、从机一直监听信道，必然很费电啊，某些场景就是需要省电怎么办呢？这就有了BLE（Bluetooth Low Energy），BLE省电的原理，就是双方协商，我们在某一个时间点一起监听信道收发数据，然后一起休眠一段时间，之后在某个时间点再一起醒过来监听信道收发数据。那都休眠了，当然就省电了。确实，BLE通过休眠，已经非常省电了，那还能不能更加省电呢？当然是可以的，某些场景下不需要双向通信，只需要单向通信，这时候就可以将省电做到极限。比如有这样一种场景，我希望测距，A节点不需要收数据，只需要发数据，B节点只需要监听A节点发射出的信号强度，计算距离就行了，那发数据的A节点不是就能节省大量因为监听信道而消耗的电能了？iBeacon实际上就是这样，iBeacon的信标就是A节点，只定时向外广播，不监听信道接收数据，非常省电。

### 通信距离合适

由于iBeacon基于BLE通信，而BLE通信的距离通常在几米到几十米之间，所以非常适合室内一个房间或者一个区域内的场景。其他的比如NFC，只有几厘米的识别范围，显然不是很合适打卡提醒这种场景。

### 兼容性

由于iBeacon本质是一种基于BLE通信协议，所以理论上所有大于蓝牙4.0的设备都可以支持iBeacon。

### 安全

iBeacon信标不断向外广播数据，会不会泄露用户的隐私？我们以接收方为手机为例来做说明，下图就是一个典型的利用iBeacon的场景，从左至右，iBeacon信标广播了ID，手机收到广播的ID后，向云端请求这个ID对应的内容，云端再将ID对应的内容反馈给手机。在这个过程中，iBeacon的应用，只是信标向手机单向传输的ID信息而已（这个ID是可以自己定义的）。至于手机和云端通信是不是安全，这个就和iBeacon没有什么关系了。

![iBeacon安全性](https://pic.gaficat.com/default/ibeacon安全性.png)

## 其他

想使用iBeacon，还需要了解iBeacon广播的内容。我们试想这样一个场景，一家商场里面，两家店是邻居，其中一家无印良品，另一家是宜家，大家都希望用iBeacon信标广播自己店的信息来吸引顾客。那问题就来了，前面说iBeacon信标只是广播ID，那怎么区分两家店、两家店卖的商品、两家店所处的位置呢？答案就是iBeaon广播的内容。iBeacon信标向外广播的参数有三个：UUID、Major、Minor。这三个参数是可以自己配置，我们可以按照下图的方式来配置。怎么区分两家店呢？用UUID表示：`D9B9EC1F-3925-43D0-80A9-1E39D4CEA95C`表示无印良品，宜家设为其他的就行了。怎么区分店的地址呢？用Major表示：1表示旧金山，2表示巴黎，3表示伦敦。怎么区分商品呢？用Minor表示，10代表衣物、20代表厨房用品、30代表汽车用品。

![iBeacon_uuid](https://pic.gaficat.com/default/iBeacon_uuid.png)

UUID就是类似上图长度的字符串，Major和Minor都是0-65535之间的整数。

# 实现基于iBeacon的打卡提醒

总体上的思路是：从某宝买来一个iBeacon信标，这个信标会自动定时向外广播相应内容，我用树莓派不断扫描周围iBeacon信标发出的广播数据，当第一次检测到iBeacon节点进入时，触发相应的告警，当检测到iBeacon节点离开时，同样触发告警就行了。

## 硬件环境

- 一个带有蓝牙且可以连接互联网的树莓派，目前4B、3B+、3B、3A和Zero W均符合要求。
- 一个iBeacon信标（某宝搜索iBeacon即可买到）。
- 一台安装了微信的手机，苹果、安卓都可以。

## TODO

我将代码整理到了[github](https://github.com/scarleast/notify-by-ibeacon)，感兴趣的小伙伴可以直接拿去用，整体配置的步骤分为三大块：

- 设置iBeacon信标
- 设置微信上的server酱（server酱是一款推送工具，借助微信，可以推送我们想要的通知）
- 设置树莓派

### iBeacon信标

- 配置并记录下好iBeacon信标的UUID、major、minor，另外，也记录下iBeacon信标的mac地址，用相应app配置就行了，这里不做详细说明。

> 通常我们买到的iBeacon信标都是附带配套APP，可以查看iBeacon信标的mac地址，并且配置UUID、major、minor这三个参数的，这三个参数其实可以随意配置的，如果不知道怎么配置，也可以使用默认的，只要记录下来就行了。需要注意的是，部分卖家不提供安卓配套的APP，自行选择合适的店家即可。

### server酱

- 记录server酱的SCKEY

  > 登录server酱的网站http://sc.ftqq.com/3.version，登入后绑定微信，记录下SCKEY就行了

### 树莓派

首先需要确保树莓派已经连接上了网络，之后通过ssh连接 树莓派或者打开图形界面下打开终端。

- 安装所需要的依赖（使用到了python3）

  ```bash
  sudo apt-get -y install python-dev libbluetooth-dev libcap2-bin git
  sudo setcap 'cap_net_raw,cap_net_admin+eip' $(readlink -f $(which python))
  sudo pip3 install beacontools[scan] requests
  ```

- 下载代码

  ```bash
  git clone https://github.com/scarleast/notify-by-ibeacon.git
  cd notify-by-ibeacon
  ```

- 修改配置文件，配置文件位于`/notify-by-ibeacon/config.json`

  ```json
  {
      "timeout": 60,
      "serverchain_receiver": {
          "SCUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX": {
              "bt_addr": "XX:XX:XX:XX:XX:XX",
              "uuid": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
              "major": 1,
              "minor": 1
          }
      }
  }
  ```

  > - timeout：超时时间。即树莓派扫描不到相应iBeacon信标多少秒后，触发提醒。
  > - serverchain_recerver：使用server酱接收提醒。该字段的value为一个字典，key为server酱的SCKEY，value为iBeacon信标的相关参数。
  >   - bt_addr：iBeacon信标的mac地址。
  >   - uuid：希望检测的UUID值。
  >   - major：用于区分相同UUID值下不同的服务，取值范围0~65535。
  >   - minor：用于区分相同UUID值、相同major下不同的服务，取值范围0~65535.

- 启动程序

  ```bash
  sudo python3 sudo python3 ble_test.py
  ```

- 后台运行（可选）

  > 如果希望程序始终在后台运行，可以使用screen工具，[用screen 在后台运行程序](https://blog.csdn.net/hejunqing14/article/details/50338161).

# 尾巴

其实代码刚写完的时候，每次出入公司都挺提心吊胆的，怕程序出问题。但使用几天时间后，每天上班到达相应楼层刚走出电梯门，就收到上班打卡的提醒。每天下班，可能正想着等会儿给女票带一束怎么样的花，完全忘了打卡，刚到达车库就收到下班打卡的提醒。内心会有一种莫名的惊喜感的，这可能是创客DIY的一种成就感吧。

这篇文章中，我把iBeacon应用在了打卡提醒的场景下，其实基于iBeacon这种位置的触发的方式，还可以衍生出非常多的玩法。最典型的就是智能家居的场景了，比如下班离开公司，就自动打开家里的空调、热水器，就再不用定时或者回家路上用APP操作了;比如离开家自动关闭所有灯和不需要使用的开关、电器，回家自动把需要的电器打开。这种你到哪，场景会发生改变的感觉，真的让人感觉挺有惊喜和满足感的。

最后，一些题外话。之后我计划用iBeacon做一些智能家居相关的联动，我是一个喜欢创造一些小玩意儿的人，想想自己整个学生生涯最开心的时刻，不是考上了大学，不是期末考了第一，而是第一次在实验室用手机蓝牙点亮一盏LED灯的那一刻，第一次在实验室用天猫精灵点亮一盏220V电灯的那一刻。最好的科技，是让你感受不到科技的存在。当你用一些私人定制化的开发，让你摆脱手机APP和重复呼唤某某同学的束缚，所到之处，周围的环境按照你的喜好，恰到好处的做出相应的反应，有了一丝灵气，这才是智能家居该有的样子吧。不然，二十年前，楼道的声控灯，也是智能家居，它不也是人来灯开，人走灯灭嘛？

