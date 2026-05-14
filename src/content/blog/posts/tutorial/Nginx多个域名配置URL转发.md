---
title: Nginx多个域名配置URL转发
date: '2021-06-07 18:30:41'
abbrlink: 4056508e
tags:
  - 教程
categories:
  - 教程
  - 建站
math: false
toc: true
---

# 摘要

本文介绍了在Ubuntu上用Nginx，通过配置URL转发，实现多个域名根据访问目的域名不同，将根域名重定向到www域名的教程。

<!-- more -->

# 缘由

我目前注册了两个网站，为了备案，买了腾讯云的轻量应用服务器，整体部署的架构如下所示：

<center>    <img style="border-radius: 0.3125em;    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);zoom:60%;"     src="https://pic.gaficat.com/default/当前网站的结构.jpg">    <br>    <div style="color:orange; border-bottom: 1px solid #d9d9d9;    display: inline-block;    color: #999;    padding: 2px;">当前网站的结构</div></br> </center>

我的网站用到了两家的云服务。腾讯云的域名解析，又拍云的云存储（又拍云的对象存储、CDN和边缘规则做了深度整合，实际上统一对外称作云存储。这里为了表达清楚架构，画图的时候分开了）。我每次更新文章时，用hexo生成网站丢到又拍云的对象存储就完事大吉了，也不需要自己去跑Nginx或者Apache。而两家云服务做了如下配置：

- 又拍云
  - CDN：绑定域名，配置好HTTPS。用于加快网站的访问速度。
  - 边缘规则：**设置好边缘规则（URL转发）**。用于将根域名跳转到www域名，即访客访问`gaficat.com`将会跳转到`www.gaficat.com`，更有利于SEO和统计访客数量。
- 腾讯云
  - 域名解析：**域名解析到又拍云的CDN**（根域名：gaficat.com，www域名：`www.gaficat.com`）

这时候就有充满大智慧的小伙伴问了：为啥要用又拍云的对象存储，不自己在服务器上部署网站？为啥不把网站直接放到github，然后再加CDN？其实有下面几个原因：

- 安全。因为我本身从事网络安全的蜜罐方向，看到了太多的攻击，真怕自己在服务器上部署网站被打了没能力维护，所以不太愿意自己在服务器上部署网站。
- 速度。github+CDN呢？不用自己在服务器部署网站呀？实际上，虽然CDN会加速网站的静态资源，但回源速度也会影响网站的实际访问速度。经过我实际测试，github+CDN，在刷新了CDN缓存后，访问速度也感人。
- 省事儿。又拍云的云存储真的做的不错，对象存储、CDN和边缘规则做了整合，更新网站往对象存储一丢就完事。如果使用其他云服务商，对象存储、CDN以及边缘规则配置起来还是挺繁琐的。当然了，又拍云的边缘规则设置URL跳转是真挺好用的，能让我把对根域名的访问跳转到www的域名下。
- 便宜。我加入了又拍云联盟，免费的额度真香！

总之呢，上述的方案稳定运营了一年半了，唯独有一个隐患，备案。可以看到整个结构中，我在腾讯云备案，却把根域名解析到了又拍云。果然，可能是我网站运营的时间比较长了，最近接到了腾讯云客服的电话，要求我将根域名解析到腾讯云备案的服务器上，分析一下腾讯云的要求，解决的办法很简单：

- 保留又拍云的云存储服务，腾讯云上www域名解析到又拍云，根域名解析到腾讯云的轻量应用服务器，轻量应用服务器上部一个Nginx或者Apache，设置根域名跳转到www域名即可（其实就是不用又拍云的边缘规则了，这个过程放到轻量应用服务器上了）。

那么问题来了，**根域名解析到腾讯云的轻量应用服务器上以后，怎么跳转到www域名呢？**

# Todo

总体上，步骤可以分为以下几步：

1. 安装Nginx或者Apache（我最终选择了Nginx，Nginx的配置文件看起来比较简单~）
2. 单个域名配置根域名转发（HTTP）
3. 单个域名配置HTTPS访问，并设置HTTPS访问的根域名转发
4. 配置多个域名，域名不同，目的域名不同

进行下列步骤之前，一定首先保证www域名访问网站没有问题，我这里就是`www.gaficat.com`，否则跳转成功了，www域名挂了，你会来回找不到原因的。

## 安装Nginx

在开始之前，保证以 sudo 用户身份登录，或者保证后续操作能以sudo权限执行，并且你不能运行 Apache或者其他处理进程在80端口和443端口。

Ubuntu默认的源里面有Nginx，如下命令安装即可：

```bash
sudo apt update
sudo apt install nginx
```

安装完成后，可以验证是否安装成功：

```bash
sudo systemctl status nginx
```

如果出现下列信息，则说明安装成功：

```bash
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: en
   Active: active (running) since Thu 2021-05-27 18:30:55 CST; 1 weeks 3 days ag
     Docs: man:nginx(8)
  Process: 27330 ExecStop=/sbin/start-stop-daemon --quiet --stop --retry QUIT/5 
  Process: 27344 ExecStart=/usr/sbin/nginx -g daemon on; master_process on; (cod
  Process: 27333 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process
 Main PID: 27349 (nginx)
    Tasks: 2 (limit: 2122)
   CGroup: /system.slice/nginx.service
           ├─27349 nginx: master process /usr/sbin/nginx -g daemon on; master_pr
           └─27351 nginx: worker process
```

之后，到腾讯云的控制台，允许80和443端口的入站流量：

<center>    <img style="border-radius: 0.3125em;    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);zoom:60%;"     src="https://pic.gaficat.com/default/腾讯云配置防火墙.png">    <br>    <div style="color:orange; border-bottom: 1px solid #d9d9d9;    display: inline-block;    color: #999;    padding: 2px;">配置腾讯云防火墙</div></br> </center>

最后，直接在浏览器输入服务器IP，若弹出Nginx默认的页面，则说明安装过程搞定。

<center>    <img style="border-radius: 0.3125em;    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);zoom:60%;"     src="https://pic.gaficat.com/default/Nginx默认页面.png">    <br>    <div style="color:orange; border-bottom: 1px solid #d9d9d9;    display: inline-block;    color: #999;    padding: 2px;">Nginx默认页面</div></br> </center>

> 注：通过本方法安装的Nginx，配置文件在`/etc/nginx`下，默认的配置文件路径为`/etc/nginx/nginx.conf`。

## 单个域名配置根域名转发

Nginx的默认配置文件路径为`/etc/nginx/nginx.conf`，而默认配置文件又会导入`/etc/nginx/conf.d/*.conf`相关配置文件，默认"/etc/nginx/conf.d"下是没有任何配置的，我们首先创建一个空白的配置文件：

```bash
sudo touch /etc/nginx/conf.d/vhost.conf
```

之后，选择你熟悉的编辑器，在`/etc/nginx/conf.d/vhost.conf`文件中添入以下配置：

```bash
server {
    listen       80;
    server_name  gaficat.com;
    return       301 https://www.gaficat.com$request_uri;
}
```

- Listen：监听的端口
- server_name：本条规则的域名，替换成自己的根域名
- return：server_name对应的域名，最终返回什么内容，这里需要替换成你希望重定向到的目标域名

> 上述配置文件的意思是，监听80端口，若收到目标为`gaficat.com`域名的请求，则返回301重定向的相应，到`https://www.gaficat.com$request_uri`。

完成后，配置完成后，可以通过`sudo nginx -t`测试配置是否正确，若出现以下信息，则说明配置无误：

```bash
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

最后，重启Nginx服务：`sudo systemctl status nginx`，在域名解析的供应商上，将根域名解析到服务器的IP，在浏览器输入`http://gaficat.com`，即可看到已经自动跳转到了`https://www.gaficat.com`。

> 注意，浏览器一定要`http://`打头。

## 单个域名配置HTTPS访问，并设置HTTPS访问的根域名转发

若完成了上个步骤，你会发现，当我们输入`http://gaficat.com`，则可以正常转发到`https://www.gaficat.com`，但是直接在浏览器输入域名`gaficat.com`则无法完成转发。造成这种现象的原因是，若直接输入域名（`gaficat.com`），现在的浏览器默认访问`https://gaficat.com`，但是我们之前的配置并没有针对HTTPS，所以无法访问，那么，现在解决HTTPS访问的问题吧。

首先，申请HTTPS证书，无论是直接去腾讯云、阿里云之类的云服务商申请，还是自己去申请Let's Encrypt DV SSL 单域名证书，总之搞到HTTPS的证书，上传到服务器上。我习惯于把它放到`/etc/nginx/crt/`下，并以不同的域名做区分，比如`/etc/nginx/crt/gaficat.com/`下存放所有`gaficat.com`的证书。

之后选择你熟悉的编辑器，在`/etc/nginx/conf.d/vhost.conf`文件中添入以下配置：

```bash
server {
    listen       443 ssl http2;
    server_name  gaficat.com;

    ssl_certificate /etc/nginx/crt/gaficat.com/1_gaficat.com_bundle.crt;
    ssl_certificate_key /etc/nginx/crt/gaficat.com/2_gaficat.com.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;
    ssl_trusted_certificate /etc/nginx/crt/gaficat.com/1_root_bundle.crt;
    return       301 https://www.gaficat.com$request_uri;
}
```

- listen：监听的端口（这里Nginx版本不同，配置不太一样，我的版本为：`nginx version: nginx/1.14.0 (Ubuntu)`）
- server_name：本条规则的域名，替换成自己的根域名
- ssl_certificate：证书的crt文件路径
- ssl_certificate_key：证书key的路径
- ssl_session_timeout：超时时间
- ssl_protocols：SSL支持的协议
- ssl_ciphers：我也不懂，这么填吧
- ssl_prefer_server_ciphers：我也不懂，这么填吧
- ssl_trusted_certificate：我也不懂，这么填吧
- return：server_name对应的域名，最终返回什么内容，这里需要替换成你希望重定向到的目标域名

>  关于HTTPS的配置可以参考[Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org/)，我也是照着这里抄的。

最后通过`sudo nginx -t`测试配置是否正确，重启Nginx服务：`sudo systemctl status nginx`，在浏览器直接输入`gaficat.com`就可以看到能正常跳转了。

## 配置多个域名，域名不同，目的域名不同

通过上述的配置，我们已经在`/etc/nginx/conf.d/vhost.conf`中添加了80端口和443端口的规则，那么问题来了，怎么在一台ubuntu上，一个端口上，配置多个域名的URL转发呢？如，请求的域名为`gaficat.com`就转发到`www.gaficat.com`，请求的域名为`lovefeng.vip`就转发到`www.lovefeng.vip`上。

其实，Nginx的配置文件，里面的内容是一条一条的规则，每一个`{}`就是一条规则，多个域名配置多条规则就行了，比如我有两个域名，我的`/etc/nginx/conf.d/vhost.conf`文件内容如下：

```bash
server {
    listen       80;
    server_name  gaficat.com;
    return       301 https://www.gaficat.com$request_uri;
}

server {
    listen       443 ssl http2;
    server_name  gaficat.com;

    ssl_certificate /etc/nginx/crt/gaficat.com/1_gaficat.com_bundle.crt;
    ssl_certificate_key /etc/nginx/crt/gaficat.com/2_gaficat.com.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;
    ssl_trusted_certificate /etc/nginx/crt/gaficat.com/1_root_bundle.crt;
    return       301 https://www.gaficat.com$request_uri;
}

server {
    listen       80;
    server_name  lovefeng.vip;
    return       301 https://www.lovefeng.vip$request_uri;
}

server {
    listen       443 ssl http2;
    server_name  lovefeng.vip;

    ssl_certificate /etc/nginx/crt/lovefeng.vip/1_lovefeng.vip_bundle.crt;
    ssl_certificate_key /etc/nginx/crt/lovefeng.vip/2_lovefeng.vip.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;
    ssl_trusted_certificate /etc/nginx/crt/lovefeng.vip/1_root_bundle.crt;
    return       301 https://www.lovefeng.vip$request_uri;
}
```

最后通过`sudo nginx -t`测试配置是否正确，重启Nginx服务：`sudo systemctl status nginx`，在浏览器分别输入`gaficat.com`和`lovefeng.vip`，就会发现不同域名已经能正常转发了。

# 尾巴

本来是一个挺简单的问题，但也折腾了一下午，主要是网络上没有看到比较详细的中文文章，希望能帮到需要的人吧。