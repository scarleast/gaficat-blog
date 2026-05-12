---
title: Typora自定义命令自动上传图片
date: '2020-05-12 16:29:08'
abbrlink: 6f888707
tags:
  - 教程
categories:
  - 教程
  - typora
math: false
toc: true
---

# 背景

Typora是我非常喜欢的Markdown编辑器，之前的一个更新，Typora支持了“上传图像”的功能（即写文章时，插入图片自动将其上传至图床），我们可以直接借助IPic、uPic、PicGo等程序，配合Typora自动将图片上传至又拍云等对象存储平台。但是，官方的文档晦涩难懂，我尝试进行了一些配置，但始终还是不好使，那咋办嘛？

其实，将本地图片上传至图床，这个过程本质上来说就是一条HTTP请求，但是如果这个过程还需要在后台一直开着一个图床软件或者安装一些命令行工具（更何况很多工具也是收费的），代价就有些大了。庆幸的是，Typora支持不借助这些图床工具，通过自定义命令（脚本）的方式，完成自动上传图片的功能。

那么，能不能自己写一个十几行代码的脚本来适配Typora呢？当然可以了。

# 一起开始吧

以Typora自定义命令上传图片为例，当我们从我们插入一张图片时，发生了什么？我们在Typora插入一张本地的图片后，Typora会调用预先设置的自定义命令（通常是运行一个脚本）来上传图片，自定义命令（脚本）上传完图片后输出（注意这里有坑）相应的URL，Typora会读取该URL，并自动把本地图片地址替换为相应的URL。所以只要配置得当，我们在写作时，只需要准备好素材，直接对素材`command + c`、`command + v`了。

 <center><img src="https://pic.gaficat.com/default/Typora自定义命令上传图片的流程.jpg" alt="Typora自定义命令上传图片的流程" style="zoom: 50%;" /></center>

综上所述，如果我们要通过自定义命令来上传图片，只需要三步：

- 编写能够上传图片至相应的图床或者对象存储的脚本
- 在偏好设置中进行相应的设置
- 测试是否正常

## 编写脚本（上传至又拍云对象存储）

一开始我尝试使用Python实现，但是发现Typora的自定义脚本，似乎并不能完美的调用Python脚本（也可能是自己没处理好一些参数之类的东西）。无奈，面向搜索引擎，现学现卖，最终用shell脚本实现了通过REST API上传图片至又拍云对象存储的功能，结果发现代码量出奇的少，脚本如下所示。

```bash
#!/bin/bash

# 各类配置信息
bucket="sample" # 云存储服务的名称
remote_path="default/" # 上传默认的路径
auth="xxxxxxx" # 操作员名和操作员密码按照operator:password拼接Base64编码
base_url="https://xxx.xxx.xx/" # 对象存储绑定的域名

# 上传图片
for i in "$@"; do
    curl https://v0.api.upyun.com/"$bucket"/"$remote_path" -H "Authorization: Basic ""$auth" --upload-file "$i"
done

# 输出结果
echo "Upload Success:"
for file in "$@"; do
    IFS='/' read -r -a array <<< "$file"
    id="${#array[@]}"
    echo "$base_url""$remote_path""${array[$id-1]}"
done
```

脚本相对简单（具体API可以参考[又拍云官网](https://help.upyun.com/docs/storage/)），分为三部分：

- 各类配置信息。又拍云对象存储相关的信息。
- 上传图片。使用`curl`命令调用REST API上传图片。
- 输出结果。适配Typora，输出结果。

我们在写一个脚本的时候，大体上关注三部分内容，输入、处理过程和输出。处理过程是自己实现的所以还好，但Typora上传图片自定义命令的**传参和输出**是真的奇坑。

- 传参。Typora上传图片调用自定义命令时，会将待上传的图片作为命令行参数，传入脚本。如`bash upload.sh 1.jpg 2.jpg`，这里具体有几张待上传的图片不确定，所以参数长度是不固定的，你的脚本必须上传所有作为参数传入的图片。Typora并没有在文档中直接说明这一点（传参的方式、长度），真的给我坑坏了。

- 输出。事实上，Typora并不关心我们脚本中上传图片的具体过程如何，它只关心我们脚本的最终输出。Typora要求脚本输出结果的方式简单粗暴，直接`echo`（其他语言比如Python的`print`）。注意，直接`echo`也是有格式要求的，脚本需要首先输出`Upload Success:`，之后，一行对应一个URL，具体格式如下：

  ```
  Upload Success:
  https://sample.com/1.jpg
  https://sample.com/2.jpg
  ```

这里，我使用shell脚本，将图片上传至又拍云。事实上，你可以使用任何变成语言，上传图片至任意的平台。只要你脚本处理好传入的参数，上传完所有图片，最终的输出结果是上面的格式即可。

## 偏好设置

Typora上传脚本支持的自定义命令，可以在偏好设置中选择。上传服务选择Custom Command，自定义命令就是我们插入图片后，Typora调用的命令。如刚才我们的脚本名称为upload.sh，自定义命令就可以设为`bash upload.sh`，注意替换upload.sh的路径为绝对路径。

<center><img src="https://pic.gaficat.com/default/typora自定义图床偏好设置.png" alt="typora自定义图床偏好设置" style="zoom: 50%;" /></center>

## 测试是否正常

完成脚本和偏好设置后，就可以测试脚本是否正常了。打开偏好设置，直接点击`验证图片上传选项`。

<center><img src="https://pic.gaficat.com/default/typora验证图片上传选项.png" alt="typora验证图片上传选项" style="zoom:50%;" /></center>

如果你看到下面这个久违的画面后，那么恭喜你，万事大吉。

<center><img src="https://pic.gaficat.com/default/typora图片上传成功.png" alt="typora图片上传成功" style="zoom:50%;" /></center>

# 尾巴

市面上确实有很多功能丰富的Markdown编辑器，但所见即所得、小巧轻量的Typora依然是我最喜欢的。图片上传功能的加入，极大方便了写作的过程，想想之前，写文章需要手动将图片拖到图床APP，再把URL复制到文章中，就两个字，“繁琐”。

最后，用Typora写作，自定义命令上传图片，自己写一个脚本，十几行代码，卸载掉各种图床工具，插入图片直接`command + v`，写作原本就该这么简单嘛！

