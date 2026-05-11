---
title: auto.js短信通知转发器
date: '2022-11-21 11:27:39'
abbrlink: b0812c46
tags:
  - 教程
categories:
  - 教程
  - 其他
math: false
toc: true
---

最近用了4年的旧手机光荣退役，换了新手机以后才后知后觉，之前自己是怎么忍受手机放一晚上掉30%电的。新手机丝滑流畅之余，发现了一个问题，旧手机的短信怎么转发到新手机上？

<!-- more -->

## 需求分析

其实说起短信转发器，有相当多的实现方式，无论是使用Air780E+开发板做一个转发短信的小硬件，还是安卓的各种APP，亦或是tasker之类的自动化工具。不过对我来说，将短信交给第三方转发，实在是不太放心。Air780E之类的硬件方式当然也很好，但已经好久不折腾硬件了，反正有旧手机，加上之前为了实现自动打卡买过auto.js，索性用auto.js写一个脚本吧，一些前置的条件：

- 硬件：旧的安卓手机
- 软件：[Auto.js Pro (autojs.org)](https://pro.autojs.org/)
- 推送工具：[飞书自定义机器人](https://open.feishu.cn/document/ukTMukTMukTM/ucTM5YjL3ETO24yNxkjN?lang=zh-CN#4996824a)

## Todo

- 在auto.js中新建一个脚本，脚本地址：https://github.com/scarleast/notification_transponder.git

```javascript
var secret = ""
var lark_bot_url = ""


events.observeNotification();
events.on("notification", function(n){
    var package_name = n.getPackageName();
    if(package_name == "com.android.mms"){
        notify_to_lark("【短信通知】 " + n.getTitle(), n.getText());
    }else if(package_name == "com.tencent.mm"){
        notify_to_lark("【微信通知】 " + n.getTitle(), n.getText());
    }
    // 可以自行添加更多希望转发的app
    else{
        log("收到新通知:\n 标题: %s, 内容: %s, \n包名: %s", n.getTitle(), n.getText(), n.getPackageName());
    }
    n.delete();
});



function notify_to_lark(title, content){
    var timestamp = Math.floor(Date.now() / 1000);
    data = {
        "timestamp": timestamp,
        "sign": GenSign(secret, timestamp),
        "msg_type": "interactive",
        "card": {
            "config": {
            "wide_screen_mode": true
            },
            "elements": [
            {
                "tag": "div",
                "text": {
                "content": content,
                "tag": "lark_md"
                }
            },
            {
                "tag": "hr"
            }
            ],
            "header": {
            "template": "blue",
            "title": {
                "content": title,
                "tag": "plain_text"
            }
            }
        }
    };
    var res = http.postJson(lark_bot_url, data);
    if(res.statusCode != 200){
        log("请求失败: " + res.statusCode + " " + res.statusMessage);
    }else{
        log(res.body.json());
    }
}

importClass(javax.crypto.Mac);
importClass(javax.crypto.spec.SecretKeySpec);
importClass(java.nio.charset.StandardCharsets);

function GenSign(secret, timestamp){
    var stringToSign = new java.lang.String(timestamp + "\n" + secret)

    //使用HmacSHA256算法计算签名
    var mac = Mac.getInstance("HmacSHA256");        //HmacSHA256算法计算签名
    mac.init(new SecretKeySpec(stringToSign.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
    signData = mac.doFinal();   
    var sign = android.util.Base64.encodeToString(signData, 0)
	return sign.replace(/[\r\n]/g,"")
}

```

- 修改`secret`。`secret`为飞书机器人签名使用的secret
- 修改`lark_bot_url`。`lark_bot_url`为飞书机器人的url
- 运行后，试着发送微信或者短信看看效果吧

![autojs通知转发效果](https://pic.gaficat.com/default/autojs通知转发效果.png)

## 飞书自定义机器人

飞书官方的[文档](https://open.feishu.cn/document/ukTMukTMukTM/ucTM5YjL3ETO24yNxkjN?lang=zh-CN#4996824a)已经非常详细了，这里记录几个使用过程中的问题。

### auto.js实现hmac签名

飞书自定义机器人提供了三种安全机制：自定义关键词、IP白名单和签名校验。实际使用过程中，面对的主要安全问题是自定义机器人的URL无意间泄露了，导致其他人推送一些垃圾信息。这其实没有太大影响，删除机器人，重新添加一个就行了，不过既然飞书提供了三种安全机制，用上总是更安全的，三种安全方式的对比：

- **自定义关键词**：实现起来相对简单，发送的信息中包含相应的关键词即可。不过，我们在写推送的时候，还需要想一下关键词是什么，且关键词也存在泄露的风险，目前我没有使用这种方式。
- **IP白名单**：实现起来也相对简单，非常安全（除非运行推送脚本的服务器被黑），比较适合推送脚本在云服务器、有固定IP或者云厂商的函数计算的场景。不过，像是本文中提到的，推送的脚本在手机上，IP不确定的情况下，IP白名单显然不是很好用。
- **签名校验**：实现起来比较复杂，不过相对安全，适用的场景更多。签名校验实际上是使用当前的时间戳加secret，进行一个加密操作，将这个加密算出来的签名附加到参数中来保障安全。由于时间戳的参与，任意时刻的签名都是不同的。

飞书官方的文档中提供了python、go以及java的示例，但是auto.js使用的javascript，没有相关的示例，最终查了一些资料，了解到auto.js支持java，所以做了相应的更改：

```javascript
importClass(javax.crypto.Mac);
importClass(javax.crypto.spec.SecretKeySpec);
importClass(java.nio.charset.StandardCharsets);

function GenSign(secret, timestamp){
    var stringToSign = new java.lang.String(timestamp + "\n" + secret)

    //使用HmacSHA256算法计算签名
    var mac = Mac.getInstance("HmacSHA256");        //HmacSHA256算法计算签名
    mac.init(new SecretKeySpec(stringToSign.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
    signData = mac.doFinal();   
    var sign = android.util.Base64.encodeToString(signData, 0)
	return sign.replace(/[\r\n]/g,"")
}
```

其中比较坑的地方是，javascript和java的语法不太一样，比如变量，最坑的，莫过于最终生成的签名是以“\n”结尾的，打出来的日志不太容易注意到，这段代码结尾的`repalce`就是处理这个问题。

### 飞书自定义机器人的markdown信息

飞书机器人是支持markdown消息的，飞书机器人发送的消息分为以下几类：

- 文本消息：就是最淳朴的普通文本
- 富文本消息：可以在一条消息中同时支持文字、At、图片、超链接等元素，我个人不太喜欢用
- 群名片：这个没用
- 图片：图片不解释了
- 卡片消息：由按钮、图片以及文本等多种类型的组件组成，支持markdown

推送卡片消息是，post的data结构如下：

```JSON
data = {
        "timestamp": timestamp,
        "sign": GenSign(secret, timestamp),
        "msg_type": "interactive",
        "card": {
            "config": {
            "wide_screen_mode": true
            },
            "elements": [
            {
                "tag": "div",
                "text": {
                "content": content,
                "tag": "lark_md"
                }
            },
            {
                "tag": "hr"
            }
            ],
            "header": {
            "template": "blue",
            "title": {
                "content": title,
                "tag": "plain_text"
            }
            }
        }
    }
```

- timestamp：unix时间戳
- sign：hmac256的签名
- msg_type：消息的类型，interactive为卡片消息
- card：卡片消息的配置

飞书提供了卡片消息的设计工具：[消息卡片搭建工具 - 飞书开放平台 (feishu.cn)](https://open.feishu.cn/tool/cardbuilder?from=howtoguide)，我们搭建好自己喜欢的卡片消息样式后，将代码复制到`card`对应的`value`即可，可以注意到，`tag`中有lark_md，其实就是飞书机器人支持的markdown语法。

## 尾巴

这次换手机，让我意识到了一个问题，之前自己购买几千块钱电子产品的时候，会反复对比参数，选择“性价比”高的产品，当然了，买到自己精心挑选，认为性价比很高的产品也是一件很开心的事。

不过这次更换手机，我只有一个想法，我想买一个屏幕素质优秀，视频拍摄不要太拉胯的手机，我不在乎价格，最贵的iphone 14 pro max对我来说也就半个月工资不到。下订单的那一刻，我觉得自己变了，我们很多时候会嘲笑某些品牌，高价低配，但是你不理解的是，**他们可能不在乎这几千块钱，他们只是觉得，我只是希望它能满足我需求，这笔开销多一点没什么**。当然了，几千块的电子产品是这样，可能更大件的车、房、奢侈品，也随着收入的提升，都是同理吧。

我从来不是果粉，我是mac book pro的用户，但我没觉得macOS比windows 11快多少，和mac book pro同价位的windows笔记本也很流畅的，当然了，mac book pro有它的优点，足够轻薄，续航够长，屏幕优秀。我是ipad的用户，我也没觉得ipad有多么流畅，老型号的ipad，也会卡顿，充电速度奇慢无比。

最后，我现在是iphone用户，经历过在地库信号不行扫不了码，车扔收费出口，自己跑出地库交完费再跑回地库的尴尬。也经历了第一次拍视频，被如此明亮稳定的画面震撼的惊喜。也有启动app迅速，后台留存稳定的安心。没有一款产品是完美的，希望每个人都能选到让自己开心，满意的产品吧。