---
title: 如何STM32duino中使用多个串口？
date: '2021-01-05 23:42:53'
abbrlink: db9a01ad
tags:
  - 电子设计
  - STM32duino
categories:
  - 电子设计
  - STM32duino
math: false
toc: true
---

# 摘要

如何在STM32duino中使用多个串口。

<!-- more -->

# 背景

最近在制作涂鸦智能TVOC传感器的过程中，需要使用多个串口。但STM32duino默认定义了Serial可以直接使用，但如果需要串口2、串口3应该怎么使用呢？

# 示例代码

我查阅了STM32duino官方的[Wiki](https://github.com/stm32duino/wiki/wiki/API#hardwareserial)，发现是可以直接使用HardwareSerial的：

```cpp
HardwareSerial mySerial(PA3, PA2); // RX, TX

void setup() {
  // put your setup code here, to run once:
  mySerial.begin(115200);     // 软件串口初始化
  mySerial.println("myserial init successful!");
  Serial.begin(115200);     // PA3 RX   PA2 TX
  Serial.println("serial init successful!");
}

void loop() {
  // put your main code here, to run repeatedly:

}
```

可以看到，直接使用HardwareSerial创建一个串口对象就行了，其中的两个参数，分别是RX和TX（实际使用中，可以根据情况，选择芯片串口对应的引脚填入，映射的引脚也是可以的哦），之后就与原生的串口对象使用无异了。

当然了，Arduino的示例代码中，还有SoftwareSerial的使用方法，二选一就可以了。

```cpp
/*
  Software serial multple serial test

 Receives from the hardware serial, sends to software serial.
 Receives from software serial, sends to hardware serial.

 The circuit:
 * RX is digital pin 10 (connect to TX of other device)
 * TX is digital pin 11 (connect to RX of other device)

 created back in the mists of time
 modified 25 May 2012
 by Tom Igoe
 based on Mikal Hart's example

 This example code is in the public domain.

 */
#include <SoftwareSerial.h>

SoftwareSerial mySerial(10, 11); // RX, TX

void setup() {
  // Open serial communications and wait for port to open:
  Serial.begin(57600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  Serial.println("Goodnight moon!");

  // set the data rate for the SoftwareSerial port
  mySerial.begin(4800);
  mySerial.println("Hello, world?");
}

void loop() { // run over and over
  if (mySerial.available()) {
    Serial.write(mySerial.read());
  }
  if (Serial.available()) {
    mySerial.write(Serial.read());
  }
}
```

