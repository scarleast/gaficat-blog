---
title: 记录chrome禁止cookie导致无法显示iframe的问题
date: '2020-09-21 15:17:09'
abbrlink: 1d5c6ccb
tags:
  - 教程
categories:
  - 教程
  - 其他
math: false
toc: true
---

# 摘要

这篇文章记录了因设置禁止chrome的cookie，导致部分iframe无法渲染显示（bilibili、网易云音乐等`iframe`分享无法显示）的问题。

<!-- more -->

# 起因

最近升级了一下hexo的版本，结果惊奇地发现我网站所有的bilibili、网易云`iframe`分享都不能显示了，在重新安装nodejs，hexo，重新安装各种插件，重新配置各种主题之后，问题依然没有解决，我以为是hexo升级炸了。

结果阴差阳错，用手机打开了自己的网站，发现都好使呢啊？加上想起来前两天用语雀，bilibili的视频也无法播放，直觉告诉我，应该不是hexo的锅，应该是chrome浏览器的锅，结果使用safari和firefox都能正常显示bilibili、网易云的`iframe`分享，确定，一定是chrome的问题。

# 原因

我在之前设置过chrome的cookie，禁止第三方cookie:

<center>    <img style="border-radius: 0.3125em;    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);zoom:40%;"     src="https://pic.gaficat.com/default/阻止cookie.png">    <br>    <div style="color:orange; border-bottom: 1px solid #d9d9d9;    display: inline-block;    color: #999;    padding: 2px;">阻止cookie的设置</div></br> </center>

就是这个设置，导致bilibili、网易云分享的`iframe`无法正常显示，不太清楚，为什么youtube是好使的。

> **这里的无法正常显示，只是我们自己的chrome浏览器无法正常显示，可以尝试使用其他浏览器或者使用手机的浏览器，在不是无痕模式的前提下访问试试看以定位问题。我当时真的坚定的认为是自己的hexo有问题，折腾了好长时间。**

# 解决办法

我们其实可以根据需要，允许一部分cookie，比如允许bilibili的播放器：

<center><img src="https://pic.gaficat.com/default/允许cookie.png" alt="允许cookie的设置" style="zoom:30%;" /><br>    <div style="color:orange; border-bottom: 1px solid #d9d9d9;    display: inline-block;    color: #999;    padding: 2px;">允许cookie的设置</div></br></center>

注意到地址栏的那个小眼睛图标了吗？当chrome浏览器禁止cookie之后，无法使用cookie的网站就会在地址栏出现那个小眼睛。点击那个小眼睛，就可以看到我们允许的cookie和禁止的cookie，bilibili的`iframe`播放器就是`player.bilibili.com`，允许它的cookie，我们的chrome就又能正常显示这些网站的`iframe`了。

# 尾巴

真是自己都记不得自己什么时候设置过cookie，可能一开始为了防止自己的隐私泄露吧。我真的一度认为是自己hexo出问题了或者我的chrome浏览器出问题了。一个小坑，分享给不知道的小伙伴吧。