## h5videoplayer

一个基于 electron 的 HTML5 的视频播放器

于2月7日初步完成页面

目前实现的功能:播放、暂停，上一曲、下一曲

2月9日，界面优化，音量调节功能

2月10日，完成播放列表功能，拖拽文件可以添加到播放列表，我是采用localStorage存储列表

播放列表可以隐藏，点击画面可以播放、暂停

2月11日完成所有基本功能，调整了一些细节，播放速率、进度条等

2月13日，全屏功能目前使用的是 webkit 的 API，会只能使用其默认的播放控件

目前提供的是未打包的文件，可以看到源码，使用时需要 Electron 的运行环境

![image](https://github.com/VinciXie/h5videoplayer/tree/master/img/electron-h5videoplayer.png)


<!--
2月15日，增加需求：
- 暂停时显示一个弹出窗口
- 深色背景皮肤 -->
