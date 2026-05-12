---
title: 解决安装全局npm包提示权限错误
date: '2019-11-18 15:41:21'
abbrlink: b1e6cb6b
tags:
  - npm
categories:
  - 教程
  - npm
math: true
toc: true
---

# 起因

最近开始尝试使用hexo写一些博客全没有接触过Node.js，部署使用的netlify，但netlify的命令行工具也用node.js做的，安装的过程中出现了`npm WARN checkPermissions Missing write access to /usr/local/lib/node_modules`的报错，根据程序猿的直觉，推测可能是权限出了问题，一概使用`sudo`解决，后来看到Node.js官方不推荐使用`sudo`这种方式，便有了这篇文章，把折腾的过程记录了下来。

# 配置过程

1. 备份相关重要文件。
2. 命令行中，创建一个目录，用于一些全局包的安装：

```shell
mkdir ~/.npm-global
```

3. 设置npm使用新的目录：

```shell
npm config set prefix '~/.npm-glabal'
```

4. 设置环境变量：

```shell
export PATH="~/.npm-global/bin:$PATH"
```

> tips: 第四步的命令可以直接在命令行中使用，也可以写到命令行的配置文件中，mac推荐写到`~/.bash_profile`中，ubnuntu之类的推荐写到`~/.bashrc`中。之后通过`source ~/.bash_profile`或`source ~/.bashrc`生效即可。

5. 测试新的设置是否生效：

```shell
npm install -g jshint
```

> tips：测试完后，删除测试安装的包可以使用`npm uninstall -g jshint`。

另外，可以按照如下设置环境变量来替代2-4步中的配置过程：

```shell
NPM_CONFIG_PREFIX=~/.npm-global
```

# 扩展知识

npx：运行全局命令的替代方法

如果您使用的是npm5.2及以上的版本，则可以考虑使用npx作为运行全局命令的替代方法，尤其是在偶尔仅仅需要一个命令的情况下。

npx和npm的区别：

- npm将包安装到本地，不会执行包。
- npx将检查是否存在于`$PATH`或本地项目二进制文件中，并执行它。另外，npx可以执行本地没有安装的包。

# 参考链接

[1]: 解决权限问题的英文原文. https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally

[2]: npx的说明文档. https://www.npmjs.com/package/npx

