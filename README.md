## 使用其他语言阅读： 简体中文 | [English](./README_en.md)


## 简介

`tv-remote-control` 是一个提供给开发者在电脑上实现电视遥控的模拟器，通过它，你可以非常简单地操控连接到电脑上的安卓电视（或其他安卓设备），不再需要输入繁琐的adb指令啦！



![logo](./images/logo.jpg)


## 安装

按下`Shift + command + p (macOS)` 或者`shift + ctrl+ P (Windows)`即可打开命令面板，然后输入`tv-remote-control`，会出现电视遥控器的模拟界面。


## 使用说明

首先确保已经打开设备的开发者模式，然后将设备与电脑连接，可以在`terminal`中输入`adb devices`确定电脑与设备是否连接成功。

```shell
$ adb devices
List of devices attached
emulator-5554 offline   # Google emulator
14ed2fcc device         # Physical device
```

从右边那列列表看到device说明你的设备已经连接成功，请注意一次只能连接一个设备。

如果电脑与设备连接成功，那么就可以通过点击页面上的的按键或者操作键盘，模拟遥控交互，操作连接在电脑上的电视或其它设备，下表是指令的具体说明。

| 按钮  | 键盘键位 | 电视遥控指令 |
| ----- | -------- | ------------ |
| up    | 上       | 上           |
| left  | 左       | 左           |
| right | 右       | 右           |
| down  | 下       | 下           |
| ok    | enter    | 确认         |
| menu  | shift    | 菜单         |
| back  | B        | 返回         |