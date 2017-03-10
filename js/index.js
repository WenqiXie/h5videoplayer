var __main = function () {
  //  1. 给按钮绑定事件
  var v = e('video')
  var play_before_button = e('#id-img-before')
  var play_next_button = e('#id-img-next')
  var playButtons = es(".playButtons > img")
  var volumeButtons = es(".volume_icon > img")

  bindEvent(play_before_button, 'click', function() {
    log("上一个")
    playBefore()
  })

  // log('playButtons', playButtons)
  bindEvent(playButtons[0], 'click', function() {
    v.play()
  })

  bindEvent(playButtons[1], 'click', function() {
    v.pause()
  })

  bindEvent(play_next_button, 'click', function() {
    log("下一个")
    playNext()
  })

  // 点击视频区域可以暂停或播放
  bindEvent(v, 'click', function(event) {
    if (v.paused == true) {
      log("已暂停")
      v.play()
    } else {
      v.pause()
    }
  })

  // 停止视频播放
  var stopImg = e('#id-img-stop')
  stopImg.addEventListener('click', function() {
    v.src = ''
    var title = e('title')
    title.innerHTML = 'HTML5桌面播放器'
    var progressDiv = e('.progress_bar')
    progressDiv.classList.add('none')
  })



  // 2. 控件切换视频的js
  // 得到当前的视频序号 i
  // 下一个视频序号 i + 1
  // var vs = e("source")
  // log("vs", vs)
  var changeVideo = function(i, name) {
    // 这里需要取得 id
    var arr = JSON.parse(localStorage.ModelFiles)
    // log('arr[i].dir', arr[i].dir)
    var pathdir = arr[i].dir
    var videoSrc = pathdir + '\\' + name
    // log("videoName", videoName)
    v.dataset.i = i
    // log("i", i)
    v.src = videoSrc
    v.play()
    // 改变 src 后再改变播放列表的样式
    removeClassAll("active")
    var target = e(`li[data-i="${i}"]`)
    target.classList.add("active")
  }

  var videoList = es("li")

  var playBefore = function() {
    // i 是当前序号
    var i = v.dataset.i
    // n 是视频数量
    var n = videoList.length
    // log("n", n)
    var nextVideoItem = (i + n - 1)%n
    // log("nextVideoItem", nextVideoItem)
    var name = videoList[nextVideoItem].textContent
    changeVideo(nextVideoItem, name)
  }

  var playNext = function() {
    // i 是当前序号
    var i = v.dataset.i
    log("i", i)
    // n 是视频数量
    var n = videoList.length
    // log("n", n)
    var nextVideoItem = (i + 1)%n
    // log("nextVideoItem", nextVideoItem)
    var name = videoList[nextVideoItem].textContent
    changeVideo(nextVideoItem, name)
  }


   // 3. 鼠标双击切换 video
   // 4. 并且给正在播放的视频加上选项卡效果
  var ul = e('.videoList>ul')

  bindEvent(ul, "dblclick", function(event) {
    // var target = event.target.parentElement
    var target = event.target
    log("target", target)
    var target_i = target.dataset.i
    var target_name = target.textContent
    changeVideo(target_i, target_name)
  })
  // 需要优化一下，双击会选中文字


  // ***********以下是控件的进度和时间部分************
  // 播放速率
  var rateRange = e('#id-video-playbackRate')
  rateRange.addEventListener("change", function() {
    log('rateRange.value', rateRange.value)
    v.playbackRate = rateRange.value
    var rateSpan = e('#id-span-playbackRate')
    rateSpan.innerText = rateRange.value
  })

  // 播放进度
  var progress = e("input#id-input-progress_bar")
  // 滑块事件，这里用 change 来实现
  progress.addEventListener("change", changeCurrentTime)
  function changeCurrentTime() {
    let progressValue = progress.value
    let timePercent = progressValue/100
    // log("timePercent", timePercent)
    v.currentTime = v.duration * timePercent
  }


  // ******音量部分******
  var volume_range = e('input.volume_range')
  // log('volume_range', volume_range)
  bindEvent(v, 'volumechange', function() {
    // 当音量进度条的值改变的时候，音量的大小改变
    // log("volumechange")
    volume_range.value = v.volume*100
    if (v.volume == 0) {
      volume_off()
    } else {
      volumeButtons[0].classList.remove('none')
      volumeButtons[1].classList.add('none')
    }
  })
  bindEvent(volume_range, 'change', function() {
    // 当音量进度条的值改变的时候，音量的大小改变
    // log("volume_range change")
    v.volume = volume_range.value/100
  })

  // 音量图标 img
  var volume_off = function() {
    log('静音')
    volumeButtons[1].classList.remove('none')
    volumeButtons[0].classList.add('none')
    v.volume = 0
  }

  bindEvent(volumeButtons[0], 'click', volume_off)

  bindEvent(volumeButtons[1], 'click', function() {
    volumeButtons[0].classList.remove('none')
    volumeButtons[1].classList.add('none')
    log('取消静音')
    v.volume = .8
  })

  // 目前没有直接全屏的方法，但 electron 有
  var fullscreen_button = e('#id-img-fullscreen')
  bindEvent(fullscreen_button, 'click', function() {
    document.body.webkitRequestFullScreen()
    // document.webkitCancelFullScreen(); 取消全屏，下次加上
  })

}

__main()
