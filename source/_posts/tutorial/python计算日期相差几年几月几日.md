---
title: python计算日期相差几年几月几日
date: '2020-03-17 11:41:38'
abbrlink: 7bb972e7
tags:
  - python
categories:
  - 教程
  - python
math: false
toc: true
---

# 背景

如何计算日期间隔的年份月份呢？之前写了一个程序，使用`datetime`计算和女票在一起多少天了，但是最近遇到了一个问题，随着时间的增长，我们需要计算日期间隔的年月日，毕竟1265天是几年呢？本来打算自己写一个，结果发现计算平年闰年，计算每个月多少天，真的是一个非常麻烦的事。于是面向搜索google，我发现中文根本搜不出来任何结果，最终借助google翻译，用英文瞎打误撞发现了`dateutil`这个模块非常好用。

# 计算日期间隔的年月日

`datetime`只能计算日期间隔了多少天，而`dateutil`则可以计算日期间隔了几年几月几日。

## 使用datetime

我在一开始使用了`datetime`，但是`datetime`模块只能计算天数，过程如下所示：

```python
Python 3.6.6 (v3.6.6:4cf1f54eb7, Jun 26 2018, 19:50:54) 
Type 'copyright', 'credits' or 'license' for more information
IPython 7.13.0 -- An enhanced Interactive Python. Type '?' for help.
PyDev console: using IPython 7.13.0

Python 3.6.6 (v3.6.6:4cf1f54eb7, Jun 26 2018, 19:50:54) 
[GCC 4.2.1 Compatible Apple LLVM 6.0 (clang-600.0.57)] on darwin
In[2]: from datetime import date
In[3]: today = date.today()
In[4]: date_first_chat = date(2019, 2, 21)
In[5]: (today - date_first_chat).days
Out[5]: 390
In[6]: (today - date_first_chat).months
Traceback (most recent call last):
  File "/Users/scarleast/PycharmProjects/weahter_forecast/venv/lib/python3.6/site-packages/IPython/core/interactiveshell.py", line 3331, in run_code
    exec(code_obj, self.user_global_ns, self.user_ns)
  File "<ipython-input-6-2de9a8b2ecb1>", line 1, in <module>
    (today - date_first_chat).months
AttributeError: 'datetime.timedelta' object has no attribute 'months'
In[7]: (today - date_first_chat).years
Traceback (most recent call last):
  File "/Users/scarleast/PycharmProjects/weahter_forecast/venv/lib/python3.6/site-packages/IPython/core/interactiveshell.py", line 3331, in run_code
    exec(code_obj, self.user_global_ns, self.user_ns)
  File "<ipython-input-7-2cf9a3422a44>", line 1, in <module>
    (today - date_first_chat).years
AttributeError: 'datetime.timedelta' object has no attribute 'years'
```

## 使用dateutil

使用`dateutil`可以计算出日期相隔的年月日：

```python
Python 3.6.6 (v3.6.6:4cf1f54eb7, Jun 26 2018, 19:50:54) 
Type 'copyright', 'credits' or 'license' for more information
IPython 7.13.0 -- An enhanced Interactive Python. Type '?' for help.
PyDev console: using IPython 7.13.0

Python 3.6.6 (v3.6.6:4cf1f54eb7, Jun 26 2018, 19:50:54) 
[GCC 4.2.1 Compatible Apple LLVM 6.0 (clang-600.0.57)] on darwin
In[2]: from datetime import date
In[3]: from dateutil.relativedelta import relativedelta
In[4]: today = date.today()
In[5]: date_first_chat = date(2019, 2, 21)
In[6]: diff = relativedelta(today, date_first_chat)
In[7]: diff.years
Out[7]: 1
In[8]: diff.months
Out[8]: 0
In[9]: diff.days
Out[9]: 25
```

# 从字符串中解析时间

`datetime`模块解析一个时间字符串非常复杂（需要自己写日期的格式规则），而`dateutil`则非常简单（不需要加一长串规则）。

## 使用datetime

```python
Python 3.6.6 (v3.6.6:4cf1f54eb7, Jun 26 2018, 19:50:54) 
Type 'copyright', 'credits' or 'license' for more information
IPython 7.13.0 -- An enhanced Interactive Python. Type '?' for help.
PyDev console: using IPython 7.13.0

Python 3.6.6 (v3.6.6:4cf1f54eb7, Jun 26 2018, 19:50:54) 
[GCC 4.2.1 Compatible Apple LLVM 6.0 (clang-600.0.57)] on darwin
In[2]: log_line = "INFO 2014-07-01T23:00:51 chat bot shutdown."
In[3]: date_str = "%Y-%m-%dT%H:%M:%S"
In[4]: import datetime
In[5]: datetime.datetime.strptime(log_line.split()[1], date_str)
Out[5]: datetime.datetime(2014, 7, 1, 23, 0, 51)
```

## 使用dateutil

```python
Python 3.6.6 (v3.6.6:4cf1f54eb7, Jun 26 2018, 19:50:54) 
Type 'copyright', 'credits' or 'license' for more information
IPython 7.13.0 -- An enhanced Interactive Python. Type '?' for help.
PyDev console: using IPython 7.13.0

Python 3.6.6 (v3.6.6:4cf1f54eb7, Jun 26 2018, 19:50:54) 
[GCC 4.2.1 Compatible Apple LLVM 6.0 (clang-600.0.57)] on darwin
In[2]: log_line = "INFO 2014-07-01T23:00:51 chat bot shutdown."
In[3]: from dateutil.parser import parse
In[4]: timestamp = parse(log_line, fuzzy=True)
In[5]: print(timestamp)
2014-07-01 23:00:51
```

# 计算时间列表

试想一下，今天是星期二，如果从今天开始往后10周，每周星期二我都需要听一节课，怎么计算我听课的日期？

```python
Python 3.6.6 (v3.6.6:4cf1f54eb7, Jun 26 2018, 19:50:54) 
Type 'copyright', 'credits' or 'license' for more information
IPython 7.13.0 -- An enhanced Interactive Python. Type '?' for help.
PyDev console: using IPython 7.13.0

Python 3.6.6 (v3.6.6:4cf1f54eb7, Jun 26 2018, 19:50:54) 
[GCC 4.2.1 Compatible Apple LLVM 6.0 (clang-600.0.57)] on darwin
In[2]: from dateutil.rrule import rrule, WEEKLY
In[3]: from datetime import date
In[4]: from pprint import pprint
In[5]: today = date.today()
In[6]: pprint(list(rrule(WEEKLY, count=10, dtstart=today)))
[datetime.datetime(2020, 3, 17, 0, 0),
 datetime.datetime(2020, 3, 24, 0, 0),
 datetime.datetime(2020, 3, 31, 0, 0),
 datetime.datetime(2020, 4, 7, 0, 0),
 datetime.datetime(2020, 4, 14, 0, 0),
 datetime.datetime(2020, 4, 21, 0, 0),
 datetime.datetime(2020, 4, 28, 0, 0),
 datetime.datetime(2020, 5, 5, 0, 0),
 datetime.datetime(2020, 5, 12, 0, 0),
 datetime.datetime(2020, 5, 19, 0, 0)]
```

# 最后

个人还是特别喜欢`dateutil`解析时间和计算日期间隔年月日的功能，真的省了我太多事了。

