---
title: 如何将docker容器打包成镜像？
date: '2019-11-28 00:13:24'
abbrlink: 4e31e6d1
tags:
  - docker
categories:
  - 教程
  - docker
math: false
toc: true
---

# 摘要

本文记录了一种不使用`Dockerfile`，将docker容器打包镜像的方法，番外篇讲解了给使用`PPA`安装了python的镜像安装第三方包的方法。

# 开头先交代背景

写这篇文章的原因，是我从事蜜罐制作有很长的时间了，制作蜜罐时，需要将做好的蜜罐程序打包成docker镜像交付。通常，打包docker镜像的过程就是编写一个`Dockerfile`，之后通过`docker build`命令就可以打包一个镜像了。

> PS: `Dockerfile`的编写，可以理解为编写一堆命令，这堆命令做的事，就是基于一个基础镜像（这个镜像通常是选择官方的镜像），跑一个临时的容器，然后将代码添加到临时容器中并安装运行代码所需要的环境，最后将这个临时的容器打包成新的镜像，删除这个临时的镜像。

这种方式就容易出现一个问题，`docker`官方的`ubuntu:16.04`镜像并没有带`python3.6`的环境，这使得我每次更新镜像时，都需要在`Dockerfile`中写相关的命令，安装一遍`python3.6`环境。但是`docker`官方的`ubuntu:16.04`镜像源在国外，由于网络的原因，国内访问经常超时，我们肯定第一时间想到更换源，但是官方的镜像极度精简，替换源会出现一系列问题，至少折腾了半天我是不想折腾了。所以为了不出现因为网络的原因，一个`Dockerfile`跑10分钟，结果超时了，又需要重新跑一次的蛋疼局面，**我总结了可以直接将一个安装好环境的容器打包成镜像的方法**。

那么以向官方的`ubuntu`镜像中安装`python3.6`为例，使用`Dockerfile`打包镜像和将容器打包成镜像的区别如何？

- 通过`Dockerfile`
  - 基于官方`ubuntu`镜像，将安装`python3.6`的命令写入`Dockerfile`，任何一步超时了就从头再跑一遍。
- 将容器打包成镜像
  - 运行一个容器
  - 在容器中安装`python3.6`，哪一步超时了，重复哪一步的过程即可。
  - 打包成镜像

无论使用哪种方式，我都强烈建议阅读文章的您，维护一个属于自己，具备自己程序所需环境的基础镜像，这样每次提交代码时，编写`Dockerfile`只需基于基础镜像，拷贝相关程序即可，非常节约时间。

# 打包镜像的全过程（所有命令一行一行复制运行）

本文以安装`python3.6`为例，讲述将容器打包成镜像的过程。在安装`python3.6`有两种思路：

- 源码编译安装的方式
- 通过`PPA`(Personal Package Archive)的apt工具包安装

我们打包、制作基础镜像的原则，是要保证镜像体积尽可能少，因为docker是分层的结构，基础镜像大了，即使`Dockerfile`中删除了一些包，最终镜像的体积也不会减小。在我实际测试的过程中，编译安装`python3.6`打包后的镜像体积会比通过`PPA`的apt工具包安装大三分之一左右，有可能是编译所需的环境没有卸载干净，但是也不重要了。 

## 镜像制作过程

**有条件的，请全程使用代理或者使用国外的`VPS`。`docker`官方`ubuntu:16.04`镜像经过专门的精简，其源国内访问有问题，替换源会导致一系列问题**

1. 在**宿主机**上运行一个容器

   ```bash
   docker run -it ubuntu:16.04
   ```

   

2. 在**容器内**更新源

   ```bash
   apt-get update
   ```

3. 在**容器内**安装`PPA`：

   ```bash
   apt-get install software-properties-common
   ```

4. 在**容器内**安装`python3.6`并验证安装结果：

   ```bash
   add-apt-repository ppa:jonathonf/python-3.6
   apt-get update
   apt-get install python3.6
   python3.6 -V
   ```

5. 在**容器内**卸载`PPA`，缩小镜像体积：

   ```
   apt-get remove --purge software-properties-common
   apt-get autoremove
   apt-get autoclean
   dpkg -l |grep ^rc|awk '{print $2}' |xargs dpkg -P
   ```

6. 退出容器，**在容器内**输入命令

   ```bash
   exit
   ```

7. 在**宿主机**上提交镜像至本地仓库

   ```bash
   sudo docker commit -m="ubuntu:16.04 with python3.6 env" 131123f077e9 myubuntu:test
   ```

	> 这里需要注意，`131123f077e9` 为刚才退出容器的ID，可以通过`docker ps -a`查看。

1. 在**宿主机**上查看提交到本地仓库的镜像

   ```bash
   docker images |grep myubuntu
   ```

# 番外篇：给使用PPA安装python的镜像安装第三方库

由于通过`PPA`(Personal Package Archive)的apt工具包安装python环境的缘故，导致上述基础镜像并没有安装pip工具，这也是一个大坑，所以安装第三方库时，有两种思路。

- 通过`pip`安装
  - 操作方便，但镜像体积略大
- 通过`setuptools`安装
  - 安装时依赖问题麻烦，能缩小10 MB左右的镜像体积

所以，希望方便还是希望缩小10 MB左右的镜像体积，可以自行考虑。

## 通过pip安装

这种思路，是在宿主机上下载好`pip`的安装脚本拷贝进容器，安装好`pip`工具后，借助`pip`安装第三方库。

1. 在**宿主机上**，启动一个容器：

   ```bash
   docker run --name silly_burnell -d myubuntu:test
   ```

2. 在**宿主机上**，下载安装脚本：

   ```bash
   curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
   ```

3. 在**宿主机上**，拷贝安装脚本到容器(`silly_burnell`是容器名)：

   ```bash
   docker cp get-pip.py silly_burnell:/tmp
   ```

4. 在**宿主机上**输入命令，进入容器：

   ```bash
   docker start silly_burnell
   docker attach silly_burnell
   ```

5. 在**容器内**，安装`pip`：

   ```bash
   cd /tmp
   python3.6 get-pip.py
   rm get-pip.py
   ```

6. 在**容器内**，安装第三方库(以requests为例)

   ```bash
   pip3.6 install requests
   ```

7. **在容器内**输入命令，退出容器

   ```bash
   exit
   ```

8. 在**宿主机**上，提交镜像：

   ```bash
   docker commit -m "ubuntu:16.04 with requests env" silly_burnell myubuntu:installed_requests
   docker rm silly_burnell
   ```

## 通过setuptools安装

通常，我们找到的第三方库，在`github`上都有源码， 其支持通过`setuptools`来安装第三方库，这种方法的好处在于，可以减少镜像的体积（实测缩小10 Mb左右吧），毕竟不需要安装pip了，但缺点是，有的库有依赖，一个一个找依赖的库也确实挺麻烦的。

1. 在**宿主机上**，启动一个容器：

   ```bash
   docker run --name silly_burnell -d myubuntu:test
   ```

2. 在**宿主机上**，下载`setuptools`及第三方库的源码：

   ```
   git clone https://github.com/pypa/setuptools.git
   git clone https://github.com/certifi/python-certifi.git
   git clone git://github.com/kennethreitz/requests.git
   
   ```

3. 在**宿主机上**，拷贝源码到容器(`silly_burnell`是容器名)：

   ```bash
   docker cp setuptools silly_burnell:/tmp
   docker cp python-certifi silly_burnell:/tmp
   docker cp requests silly_burnell:/tmp
   
   ```

4. 在**宿主机上**，输入命令进入容器：

   ```bash
   docker start silly_burnell
   docker attach silly_burnell
   
   ```

5. 在**容器内**，安装`setuptool`和第三方库：

   ```bash
   cd /tmp/setuptools
   python3.6 bootstrap.py
   python3.6 setup.py build
   python3.6 setup.py install
   cd /tmp/certifi
   python3.6 setup.py build
   python3.6 setup.py install
   cd /tmp/requests
   python3.6 setup.py build
   python3.6 setup.py install
   rm /tmp/* -rf
   ```

6. **在容器内**，输入命令，退出容器

   ```bash
   exit
   ```

7. 在**宿主机上**，退出容器，提交镜像：

   ```bash
   docker commit "ubuntu:16.04 with requests env" silly_burnell myubuntu:installed_requests
   docker rm silly_burnell
   ```

# 尾巴

`docker`官方的`ubuntu`镜像真的精简到有些病态的状态了，除了能跑起来，常用的`curl`、`nc`等等命令什么都没有，这种情况下，直接编写`Dockerfile`绝对是踩坑不断的。所以，自己跑一个容器，把环境安装好，重新打包成一个镜像备用，不失为一种良好的习惯。