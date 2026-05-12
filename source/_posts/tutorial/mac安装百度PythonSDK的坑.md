---
title: 'mac安装百度Python SDK的坑'
date: '2019-12-16 18:17:50'
abbrlink: 8e6e40dc
tags:
  - 教程
categories:
  - 教程
  - 其他
math: false
toc: true
---

# 摘要

本文记录了`macOS Catalina`安装baidu Python SDK的坑，主要是安装`pycrypto`坑太深了，折腾了好久。

# 系统

`macOS Catalina`版本10.15.2

# 出问题的关键点

查看了百度的[文档](https://cloud.baidu.com/doc/CDN/s/tjwvye2cy)，说需要先安装依赖——**`pycrypto`**，就是这个东西其坑无比。上来不管三七二十一，直接pip安装pycrypto，结果一大堆报错，然后直接去google pycrypto mac，安装了什么gmp之类的，结果牛头不对马嘴，问题还是没有解决，最后还是返回去看一大堆报错，报错中如下信息比较重要：

```bash
checking for gcc... gcc
    checking whether the C compiler works... no
    configure: error: in `/private/tmp/pip-install-rixi56fh/pycrypto':
    configure: error: C compiler cannot create executables
```

直觉上觉得是gcc有问题，于是通过`brew`安装gcc：

```bash
scarleastdeMacBook-Pro:hexo_auto scarleast$ brew install gcc
Updating Homebrew...
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
Error: The following formula
  gcc
cannot be installed as binary package and must be built from source.
Install the Command Line Tools:
  xcode-select --install

```

真的，看到又出错，真的冒火，索性log里面直接有提示，需要安装xcode，如下安装xcode即可：

```bash
scarleastdeMacBook-Pro:hexo_auto scarleast$ xcode-select --install
xcode-select: note: install requested for command line developer tools
```

输入`xcode-select --install`后，会弹出图形界面，按照提示安装就行了，安装完成查看gcc版本：

```bash
scarleastdeMacBook-Pro:hexo_auto scarleast$ gcc -v
Configured with: --prefix=/Library/Developer/CommandLineTools/usr --with-gxx-include-dir=/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/usr/include/c++/4.2.1
Apple clang version 11.0.0 (clang-1100.0.33.8)
Target: x86_64-apple-darwin19.2.0
Thread model: posix
InstalledDir: /Library/Developer/CommandLineTools/usr/bin
```

其实发现并不是gcc，是clang，不过不影响接下来安装`pycrypto`了。

# 安装SDK过程

安装了`xcode`后就可以正常安装SDK了：

- 安装pycrypto

  ```bash
  scarleastdeMacBook-Pro:hexo_auto scarleast$ pip3.6  install pycrypto
  Collecting pycrypto
    Using cached https://files.pythonhosted.org/packages/60/db/645aa9af249f059cc3a368b118de33889219e0362141e75d4eaf6f80f163/pycrypto-2.6.1.tar.gz
  Installing collected packages: pycrypto
    Running setup.py install for pycrypto ... done
  Successfully installed pycrypto-2.6.1
  You are using pip version 10.0.1, however version 19.3.1 is available.
  You should consider upgrading via the 'pip install --upgrade pip' command.
  ```

- 安装百度SDK

  ```bash
  scarleastdeMacBook-Pro:hexo_auto scarleast$ pip3.6 install bce-python-sdk
  Collecting bce-python-sdk
    Using cached https://files.pythonhosted.org/packages/04/a6/72a4bbe372de7438978f5dd976f3a4981cd245d7995112b31bb77aa41656/bce_python_sdk-0.8.32-py2.py3-none-any.whl
  Collecting six>=1.4.0 (from bce-python-sdk)
    Using cached https://files.pythonhosted.org/packages/65/26/32b8464df2a97e6dd1b656ed26b2c194606c16fe163c695a992b36c11cdf/six-1.13.0-py2.py3-none-any.whl
  Requirement already satisfied: future>=0.6.0 in /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages (from bce-python-sdk) (0.18.2)
  Requirement already satisfied: pycrypto>=2.4 in /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages (from bce-python-sdk) (2.6.1)
  Installing collected packages: six, bce-python-sdk
  Successfully installed bce-python-sdk-0.8.32 six-1.13.0
  You are using pip version 10.0.1, however version 19.3.1 is available.
  You should consider upgrading via the 'pip install --upgrade pip' command.
  ```

  

# 尾巴

哎，现在搞得人有点冒火，最后因为xcode的问题，没办法编译，导致的报错。还是那句话吧，出问题了**先看日志，先看日志，先看日志！！！！**

