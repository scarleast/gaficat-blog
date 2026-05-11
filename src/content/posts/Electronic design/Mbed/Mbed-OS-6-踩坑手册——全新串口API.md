---
title: 'Mbed OS 6踩坑手册——全新串口API'
date: '2020-06-14 00:09:55'
abbrlink: 6b047738
tags:
  - 电子设计
  - Mbed
categories:
  - 电子设计
  - Mbed
math: false
toc: true
---

# 哪来的坑？

前两天，Mbed OS 6发布了，在一脸期待的打开IDE，看看有什么好玩的东西后，我惊奇地发现：之前所有的工程一片红，所有串口程序，都跑不通了，`printf`也不好使了，`%f`打印不出小数（浮点数）了。

# Mbed OS 5串口程序

一个典型的Mbed OS 5的串口程序是这样的：

```c
#include "mbed.h"

Serial      pc(PA_9, PA_10); // TX, RX

int main() 
{  
    while(1) {
				pc.printf("float test:%f\\r\\n", 0.5);
				thread_sleep_for(1000);   // wait 200 millisecond
    }
}
```

> 参考文档：https://os.mbed.com/docs/mbed-os/v5.15/apis/serial.html

Mbed OS 5中，`printf`是使用的标准库的，所以我们按照C语言正常的写法，是没有任何问题的。

# Mbed OS 6 BufferedSerial And UnbufferedSerial

Mbed OS 6对串口部分的接口做了升级，分为[BufferedSerial]([]())和[UnbufferedSerial]([]())。

`BufferedSerial`的性能要优于`UnbufferedSerial`并具有较少的CPU负载和较少的延迟问题。只有RAM不足且无法承受缓冲或需要更多控制串行端口并从IRQ使用它的应用程序才应使用`UnbufferedSerial`。

这里我就用`BufferedSerial`做相关的示例：

```c
#include "mbed.h"

BufferedSerial      pc(PA_9, PA_10); // TX, RX

FileHandle *mbed::mbed_override_console(int fd)
{
    return &pc;
}

int main() 
{
		while(True){
				printf("%f\\r\\n", 0.1);
				thread_sleep_for(1000);  // wait 1000 millisecond
		}
}
```

我们的第一反应是，Mbed OS 6的串口接口变得更加复杂了，需要通过C++代码，将`BufferedSerial`的实例`pc`传递给系统I/O的重定向，之后才能调用`printf`，将希望的内容通过串口打印到控制台。

但是其实你会发现，上面的代码，打印不出小数了，会出现下面的状况：

```c
f
f
f
f
f
```

## 无法用`printf`打印小数原因

这个问题让我很抓狂，因为google直接搜索，搜不到相关的解释。于是开始研究官方的说明文档，最终下面三篇文档解决了我的疑惑：

- [Mbed 内存优化](https://os.mbed.com/docs/mbed-os/v5.15/tutorials/optimizing.html#printf-and-reducing-memory)
- [Mbed minimal-print](https://github.com/ARMmbed/mbed-os/tree/master/platform/source/minimal-printf#size-comparison)
- [Mbed 配置系统](https://os.mbed.com/docs/mbed-os/v6.0/program-setup/advanced-configuration.html#configuration-parameters-in-mbed-app-json-mbed-lib-json)

### Mbed OS 6开始默认使用`minimal-printf`

首先，我无意间看到[Mbed 内存优化]([]())的文档中提及，如果我们的程序不需要64位整数或浮点打印希望优化flash，Mbed OS提供了`minimal-printf`库。之后，出于随缘的好奇心，我查阅了[Mbed minimal-print]([]())的文档。

`minimal-printf`是Mbed为了减少flash的占用，提供的一个替代`printf`家族的库。它直接向串口/stdio输出而不使用`malloc`，所有的标志和精度修饰符都将被忽略。如果发生写入错误，没有对错误的处理。支持以下的格式化输出：

- %d: signed integer [h, hh, (none), l, ll, z, j, t].
- %i: signed integer [h, hh, (none), l, ll, z, j, t].
- %u: unsigned integer [h, hh, (none), l, ll, z, j, t].
- %x: unsigned integer [h, hh, (none), l, ll, z, j, t], printed as hexadecimal number (e.g., ff).
- %X: unsigned integer [h, hh, (none), l, ll, z, j, t], printed as hexadecimal number (e.g., FF).
- %f: floating point (**disabled by default**).
- %F: floating point (**disabled by default**, treated as %f).
- %g: floating point (**disabled by default**, treated as %f).
- %G: floating point (**disabled by default**, treated as %f).
- %c: character.
- %s: string.
- %p: pointer (e.g. 0x00123456).

注意上面的加粗，所有的浮点型数据默认都是禁用的。并且，Mbed OS 6为了尽可能减少对flash的占用，默认使用`minimal-printf`，

<center><img src="https://pic.gaficat.com/default/Mbed6默认minimal-printf.png" alt="Mbed6默认minimal-printf" style="zoom: 50%;" /></center>

## 如何启用对浮点数输出的功能？

[Mbed minimal-print]([]())的文档中提到了两种方法：

第一种配置`printf`家族的库为标准库。修改`mbed_app.json`文件中的应用程序配置，将`target.printf_lib`的值覆盖为`std`（即不使用`minimal-printf`，使用标准库），如下所示：

```json
"target_overrides": {
        "*": {
            "target.printf_lib": "std"
        }
    }
```

第二种方法是，启用`minimal-printf`对浮点数输出的功能，修改`mbed_app.json`文件：

```json
"target_overrides": {
        "*": {
            "target.printf_lib": "minimal-printf",
            "platform.minimal-printf-enable-floating-point": true,
            "platform.minimal-printf-set-floating-point-max-decimals": 6,
            "platform.minimal-printf-enable-64-bit": false
        }
    }
```

- platform.minimal-printf-enable-floating-point：是否启用浮点数输出
- platform.minimal-printf-set-floating-point-max-decimals：浮点数输出的精度
- platform.minimal-printf-enable-64-bit：是否启用64位长整数型输出

## 配置文件在哪？

我们知道了问题所在了，那就对配置文件做一些修改，但是，`mbed_app.json`这个配置文件在哪里？其实，[Mbed 配置系统]([]())的文档中有相关的说明：

我们可以在工程的根目录下，新建一个`mbed_app.json`文件，然后将上一小节所述的配置，写到`mbed_app.json`文件中，再次编译，bingo！

# 尾巴

其实，这个坑，一度想让我去官方的论坛留言，但还是有一些运气成分吧，还是搞明白了怎么回事。

当然还有一些遗憾，比如：如果我有多个串口，怎么让每个串口都能用printf呢？我完全不懂c++，所以这个问题，搭建感兴趣吗？感兴趣的话，就当是给自己埋的一个坑吧！之后搞明白了再继续更新。