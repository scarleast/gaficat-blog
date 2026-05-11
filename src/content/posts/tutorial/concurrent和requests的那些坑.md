---
title: concurrent和requests的那些坑
date: '2020-08-11 18:55:52'
abbrlink: f471d42d
tags:
  - python
categories:
  - 教程
  - python
math: false
toc: true
---

# 摘要

这篇文章记录了一下python concurrent.future和requests的一些坑，不是程序猿的铁子们直接关掉吧。

# 起因

最近在写一个爬虫，需要爬5000000个IP，待爬的IP以`IP,PORT`的形式存储在一个100Mb的文件中。这么粗略算一下，一秒钟一个IP，5000000个IP需要差不多57天，这肯定不行啊，得用多线程。但是使用的过程中，发现还是遇到了很多坑，这里分享出来，以免其他小伙伴踩我踩过的坑吧。

# 先说结论

节约大家时间，先说结论吧！我遇到了以下几个坑：

- **不要一次将大文件的内容读到一个列表中**。5000000个IP，虽然文件看起来只有100Mb，但程序直接怼到列表中，内存爆了。尽量读一行处理一行，即使用以下的形式读文件：

  ```python
  with open("file") as f:
  		for f in line:
  				print(f)
  ```

  

- **使用多线程时，处理函数一定一定一定一定不要阻塞，concurrent.futures只有当所有子线程运行结束后，才会释放资源**。

- **requests库在处理某些请求时会阻塞卡死。**上面刚说多线程不要阻塞，这里就阻塞了。实际上是这次我爬取的过程中，发现了部分奇葩的IP，使用requests的timeout参数对它们无效，会始终阻塞。

- **可以了解一下eventlet库的Timeout**。如果实在无法解决某些处理流程中（比如上面requests）的阻塞，建议使用eventlet库的Timeout。

# 曲折历程

## 读IP干爆内存

一开始要做这个爬虫的时候，我想要用多线程，自然而然想到了`concurrent.futures`，参考说明文档的示例，我写了**第一版程序**：

```python
import concurrent.futures
import requests


def get_url(ip, port):
    try:
        r = requests.get("http://{}:{}/path".foramt(ip, port), timeout=3)
        return r.text
    except:
        return ""


def main():
    with concurrent.futures.ThreadPoolExecutor(max_workers=100) as executor:
        with open("123.txt") as f:
            # submit所有IP
            future_dict = {executor.submit(get_url, line.strip().split(",")[0], line.strip().split(",")[1]): line.strip().split(",") for line in f}
            print(len(future_dict))
            
        # 等待所有线程执行完毕
        for future in concurrent.futures.as_completed(future_dict):
            ip_port = future_dict[future]
            try:
                data = future.result()
            except Exception as exc:
                print('%r generated an exception: %s' % (ip_port, exc))
            else:
                # print(data)
                pass

if __name__ == "__main__":
    main()
```

我当时发现，内存直接被干爆了。为什么？其实程序中的**18行**已经有答案了。`concurrent.future`官方的示例中，会将所有`future`对象存到一个字典中，然后再等待所有线程执行完毕。虽然用了`for line in f`这种形式迭代，但5000000的`future`对象，还是太大了。

那咋办嘛？就控制`future_dict`的长度呗，规定一个长度，执行完毕直接释放内存，所以我使用了`Queue`，保证传入`future_dict`的内容大小始终可控，**第二版代码**如下：

```python
import requests
import concurrent.futures
import queue
import json
from time import ctime

ip_queue = queue.Queue(100)


def get_url(ip, port):
    try:

        r = requests.get("http://{}:{}/path_info".format(ip, port),
                         timeout=5)
        return r.text
    except Exception as e:
        return e


def main():
    future_dict = {}
    with open("./ipfile") as f:
        for line in f:
            if not ip_queue.full():
                ip_queue.put(line.strip().split(","))
            else:
                with concurrent.futures.ThreadPoolExecutor(max_workers=100) as executor:
                    while not ip_queue.empty():
                        try:
                            ip_port = ip_queue.get(block=False)
                            future_dict[executor.submit(get_url, ip_port[0], ip_port[1])] = ip_port
                        except Exception as e:
                            print(e)

                    for future in concurrent.futures.as_completed(future_dict, timeout=30):
                        ip_port = future_dict[future]
                        try:
                            data = future.result()
                        except Exception as exc:
                            print('%r generated an exception: %s' % (ip_port, exc))
                        else:
                            print(data)
                    future_dict.clear()

    print("finish")


if __name__ == "__main__":
    main()

```

## 跑着跑着就被系统kill了

就像预期的，上面第二版的程序在刚开始运行的时候可以正常跑，但是跑一段时间后，会没有任何提示，直接被系统kill掉。为什么呢？通过`htop`监控程序运行过程中的状态，我发现内存会明显随着运行时间的边长也增大。

既然使用了`Queue`，程序中该清理释放内存的地方（比如`future_dict`都做了相应的的处理），那为什么内存还会出问题呢？其实，有两点：**`concurrent.future`的内存释放机制和卡死的requests请求。**

### concurrent.future的内存释放机制

第二版有一个**致命**的地方：**我们使用了with的方式开了一个`Executor`，第35行虽然设置了超时，但是concurrent.future只会等所有子线程执行完成后才会`return`并释放内存，可以仔细读一下下图的相关说明。**

<center><img src="https://pic.gaficat.com/default/concurrent内存清理机制.png" alt="concurrent内存清理机制" style="zoom: 50%;" /></center>

> 第二版程序的35行设置了超时，所以程序执行的逻辑是：`ip_queue`第一次满之后，开一个`executor`，对`ip_queue`中的ip进行处理，但由于一些未知的异常，导致某一些子线程没有在30秒的时间内执行完，这时主线程会报超时的错误，不等第一个`executor`所有的子线程执行完，释放内存，就直接进入下一轮。如果第一轮的子线程能处理好所有异常，在之后退出，那么不会有内存问题，因为虽然提前进入了第二轮，某个时段存在两个甚至多个`executor`，但前面的`executor`总会退出的，内存总会释放的，对吧。
>
> 但事实和我们想的不一样，子线程实际上是在执行`get_url()`函数，若`get_url()`函数本身逻辑有问题，没有办法处理所有的异常被挂起，那么就会有相当的`executor`挂着，不能释放，当内存占用到一定程度，操作系统自然就会kill掉我们的程序了。

### requests卡死？挂起？

正常来说，我们第二版的代码里面，`requests`是设了超时的，但为什么`get_url()`函数就卡死了呢？其实部分IP，可能它返回的内容非常大，requests默认的get，会将其临时保存在内存中，那假如我们爬虫同时遇到10个返回100Mb内容的IP，1个Gb的内容，1M的带宽，算算要多久才能下完？当然就卡住了。带宽越大，下得越快，线程越多，内存炸的也就更快。

咋办呢？其实requests提供了流的模式，使用方式参照官方的文档吧，这里贴一个官方例子：

```python
import json
import requests

r = requests.get('https://httpbin.org/stream/20', stream=True)

for line in r.iter_lines():

    # filter out keep-alive new lines
    if line:
        decoded_line = line.decode('utf-8')
        print(json.loads(decoded_line))
```

根据需求改动下，实时写入文件就行了。

## 设置子线程的超时异常？

上面分析了被系统kill的原因，实际上还是内存炸了，所以修改了代码，**第三版程序**如下：

```python
import requests
import concurrent.futures
import queue
import json
from time import ctime

ip_queue = queue.Queue(100)


def get_url(ip, port):
    try:

        r = requests.get("http://{}:{}/path_info".format(ip, port),
                         timeout=5, stream=True)
        return next(r.iter_lines())
    except Exception as e:
        return e


def main():
    future_dict = {}
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        with open("./ipfile") as f:  
            for line in f:
                if not ip_queue.full():
                    ip_queue.put(line.strip().split(","))
                else:
                    while not ip_queue.empty():
                        try:
                            ip_port = ip_queue.get(block=False)
                            future_dict[executor.submit(get_url, ip_port[0], ip_port[1])] = ip_port
                        except Exception as e:
                            print(e)

                    for future in concurrent.futures.as_completed(future_dict, timeout=30):
                        ip_port = future_dict[future]
                        try:
                            data = future.result()
                        except Exception as exc:
                            print('%r generated an exception: %s' % (ip_port, exc))
                        else:
                            print(data)
                    future_dict.clear()

    print("finish")


if __name__ == "__main__":
    main()

```

结果呢，还是没能如愿，程序依然会出现卡死的现象。后来我分析原因，是部分IP不太正常，会一直返回内容，类似摄像头，所以永远不可能接收完内容，那这个子线程就一直挂着了。咋办？我就想，能不能设置子线程的超时，后来发现了一个库：`eventlet`。

所以最终，**第四版程序**的样子：

```python
import requests
from requests.auth import HTTPBasicAuth
import concurrent.futures
import queue
import json
from time import ctime
import eventlet

eventlet.monkey_patch()

ip_queue = queue.Queue(200)


def get_url(ip, port):
    with eventlet.Timeout(20):
        with requests.Session() as s:
            try:
                r = s.get("http://{}:{}/path_info".format(ip, port),
                           timeout=(3, 3))
                s.close()
                return r.text
            except eventlet.timeout.Timeout as e:
                print("eventlet timeout:", e)
                s.close()
                return ""
            except Exception as e:
                s.close()
                return ""


def multithread_attach():
    future_dict = {}
    with concurrent.futures.ThreadPoolExecutor(max_workers=100) as executor:
        ip_port = ""
        while not ip_queue.empty():
            try:
                ip_port = ip_queue.get(block=False)
                # print(ip_port)
                future_dict[executor.submit(attach_tools, ip_port[0], ip_port[1])] = ip_port
            except Exception as e:
                print(e)
        print("time:{}".format(ctime()), "200", "start attach")
        print("last ip:", ip_port)

        for future in concurrent.futures.as_completed(future_dict):
            ip_port = future_dict[future]
            try:
                data = future.result()
            except Exception as exc:
                print('%r generated an exception: %s' % (ip_port, exc))
            else:
                pass
        print("time:{}".format(ctime()), "200", "finish attach")
        print("last ip:", ip_port, "\n")
    del future_dict


def main():
    with open("./ipfile") as f:
        for line in f:
            if not ip_queue.full():
                ip_queue.put(line.strip().split(","))
            else:
                multithread_attach()

    multithread_attach()
    print("finish")


if __name__ == "__main__":
    main()

```

# 最后

其实，收获最大的是concurrent.future的内存处理机制吧，这个坑肯定是不踩不知道的，python好像主动停止正在运行的子线程也比较麻烦，所以eventlet这个库，在某些场景给子线程设置超时也是一种挺好的方式。