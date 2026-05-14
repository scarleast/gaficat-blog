---
title: 用telegram订阅twitter
date: '2020-12-02 15:15:02'
abbrlink: e857ecd7
tags:
  - 教程
categories:
  - 教程
  - 其他
math: false
toc: true
---

# 摘要

如何用telegram订阅twitter上某位用户的推文呢？借助IFTTT其实可以轻松实现！

<!-- more -->

# 背景

今年早些时候，我订阅了一个搬运王兴饭否的telegram频道，王兴有时候会分享一些东西，确实能拓宽眼界，现在还记得他之前分享的一句名言：“**坐而论道不如起而行之**”。

最近，之前订阅的telegram频道不更新了，找了一圈，在twitter上找到一个搬运工还在搬运王兴的饭否。但我几乎所有的消息都通过机器人推送到telegram上了，不太希望装太多APP。那么能否用telegram订阅twitter的某个用户呢？当然是可以的，不过需要用到一个第三方工具曲线救国——IFTTT。

说到telegram机器人，比如我使用阿里云的函数计算每天上午推送前一天的黄金价格；比如每次更新文章自动推送相关部署情况；大家感兴趣吗？感兴趣的话给自己埋一个坑。

<center>
  <img style="border-radius: 0.3125em;    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);zoom:80%;" src="https://pic.gaficat.com/default/telegram机器人推送消息示例.png"><br>
  <div style="color:orange; display:inline-block; color:#999; padding:1px;">telegram机器人推送消息</div></br> </center>

# ToDo

IFTTT是一个自动化的平台，简单来说，你可以通过APP和网页，设置**如果**`……`**然后就**`……`的自动化流程。比如某个RSS更新了，发送邮件通知自己；比如收到某一条webhook，然后做一些处理，总之，IFTTT有各式各样好玩的功能。

## 一、总体逻辑

本次我们利用IFTTT创建一个自动化流程：**如果**`twitter上的某人发送了推文`，**然后就**`把这条消息推送到telegram上`。

首先创建一个applet，在首页点击creat即可。

![创建IFTTT applets](https://pic.gaficat.com/default/IFTTT-创建applets.png)

之后，就来到IFTTT创建一个自动化流程的核心步骤了，在这个界面可以看到创建自动化流程的总体逻辑：**如果**`……`**然后就**`……`。还是比较简明的，我们点击`If This`后的`Add`，设置我们这个自动化流程的触发条件。

![IFTTT的整体逻辑](https://pic.gaficat.com/default/IFTTT-整体逻辑.png)

## 二、触发条件

我们的整体逻辑是：**如果**`twitter上的某人发送了推文`，**然后就**`把这条消息推送到telegram上`。那么我们的触发条件`If This`中的内容就应该选择Twitter相关的东西，我们直接搜索twitter，就能找到twitter组件了。

![IFTTT搜索twitter组件](https://pic.gaficat.com/default/IFTTT-搜索twitter.png)

进入Twitter组件后，可以看到有非常多的内容，这里我们选择`New tweet by a specific user`。

![IFTTT中twitter的功能](https://pic.gaficat.com/default/IFTTT-twitter触发条件.png)

紧接着，就需要输入我们希望订阅的twitter用户账号，这里我填入的是王兴饭否搬运工的账号（输入的用户账号下面可能会有一条红线，不太清楚原因，不过实际使用不影响）。

![IFTTT中设置twitter订阅目标用户](https://pic.gaficat.com/default/IFTTT-twitter订阅目标用户.png)

## 三、执行动作

设置完触发条件后，会回到IFTTT创建自动化流程的总体页面，就可以添加我们自动化任务需要执行的任务了，点击`Then That`后的`Add`即可。

![IFTTT Then That](https://pic.gaficat.com/default/IFTTT-THEN%20THAT.png)

因为我们希望执行的动作，是往telegram上推送内容，这里就可以直接搜索telegram，选定telegram，进行后续的配置。

![IFTTT搜索telegram组件](https://pic.gaficat.com/default/IFTTT-搜索telegram.png)

IFTTT的telegram组件支持多种执行的任务：发送文字、图片、视频和音乐，因为是订阅的twitter以文字和图片为主，这里我选择了图片（选择文字其实也没问题）。

![IFTTT中telegram的功能](https://pic.gaficat.com/default/IFTTT-telegram组件.png)

紧接着的配置相对简单，分别是：

- 推送到的目标：`Target chat`
- 照片的URL：`Photo URL`
- 说明：`caption`

> 需要额外说明的是，可以点击`Add ingredient`添加一些IFTTT内置的内容。

![IFTTT配置telegram组件](https://pic.gaficat.com/default/IFTTT-telegram配置.png)

## 四、最终确认

最后，我们需要确认创建的流程是否正确，如果发现有不太对的地方可以直接进行修改。我们这个流程里面可以看到，**IF**选择的触发条件是`New tweet by a specific user`，**Then**选择的是`Send photo`，没有问题，所以直接选择`Continue`。

![IFTTT创建applets整体确认](https://pic.gaficat.com/default/IFTTT-流程确认.png)

最后，可以对该自动化流程进行改名，这里我就默认不动了，直接点击`Finish`。

![IFTTT创建applets最终确认](https://pic.gaficat.com/default/IFTTT-总体确认.png)

# 实际效果和尾巴

等我们订阅的twitter用户更新了推文后，我们就可以在telegram上收到消息啦！

![telegram订阅twitter用户的效果](https://pic.gaficat.com/default/twitter2telegram效果.png)

免费用户，IFTTT支持创建四个自动化流程，如果订阅的数量少还好，超过四个就要掏钱了。