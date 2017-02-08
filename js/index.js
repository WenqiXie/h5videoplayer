var __main = function () {
  //  1. 给按钮绑定事件
  var v = e('video')
  var playButtons = es(".controls img")
  // log("playButtons", playButtons)
  var play = function() {
    // console.log("play video");
    v.play()
    playButtons[2].classList.remove('none')
    playButtons[1].classList.add('none')
  }
  var pause = function() {
    console.log("pause video");
    v.pause()
    playButtons[1].classList.remove('none')
    playButtons[2].classList.add('none')
  }
  bindEvent(playButtons[0], 'click', function() {
    log("上一个")
    playBefore()
  })
  bindEvent(playButtons[1], 'click', play)
  bindEvent(playButtons[2], 'click', pause)
  bindEvent(playButtons[3], 'click', function() {
    log("下一个")
    playNext()
  })

  // 2. 控件切换视频的js
  // 得到当前的视频序号 i
  // 下一个视频序号 i + 1
  // var vs = e("source")
  // log("vs", vs)

  var changeVideo = function(i, name) {
    var videoName = "video/" + name
    // log("videoName", videoName)
    v.dataset.i = i
    v.src = videoName
    // 改变 src 后不会马上播放视频，要跟一个 play 操作
    play()
  }

  var videoList = es("li")
  var playBefore = function() {
    // i 是当前序号
    var i = v.dataset.i
    log("i", i)
    // n 是视频数量
    var n = videoList.length
    // log("n", n)
    var nextVideoItem = (i + n - 1)%n
    log("nextVideoItem", nextVideoItem)
    var name = videoList[nextVideoItem].innerHTML
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
    log("nextVideoItem", nextVideoItem)
    var name = videoList[nextVideoItem].innerHTML
    changeVideo(nextVideoItem, name)
  }
   // 3. 鼠标点击切换 video
   // 4. 并且给正在播放的视频加上选项卡效果
  bindAll("li", "click", function(event) {
    var target = event.target
    var target_i = target.dataset.i
    var target_name = target.innerHTML
    log("target_i", target_i)
    log("target_name", target_name)
    changeVideo(target_i, target_name)
    removeClassAll("active")
    target.classList.add("active")
    // log("target", target)
  })

  // 在播放列表的位置，加一个鼠标悬停显示文字的功能
  var span = e(".videoList span")
  // log("span", span)
  bindAll("li", "mouseover", function(event) {
    var target = event.target
    var target_name = target.innerHTML
    var mouseY = event.y
    var top = mouseY + 20
    // log("target_name", target_name)
    // log("mouseX mouseY", mouseX, mouseY)
    span.innerHTML = target_name
    span.style.cssText = `top:${top}px;display:inline;`
  })
  bindAll("li", "mouseout", function(event) {
    var target = event.target
    var target_name = target.innerHTML
    // log("target_name", target_name)
    span.innerHTML = ""
    span.style.cssText = `display:none;`
    // span.classList.add("none")
    // log("event", event)
  })

 // 实现播放时间的变化
  var timeTrans = function(time) {
    var minute = Math.floor(time / 60)
    var second = Math.floor(time % 60)
    var t = `${zfill(minute, 2)}:${zfill(second, 2)}`
    // log('t', t)
    return t
  }

  // ***********以下是控件的进度和时间部分************
  var range = e(".controls>input")
  var ctspan = e("#id-video-currentTime")// 这是当前时间的 span 标签
  // 滑块事件，这里用 change 来实现
  range.addEventListener("change", changeCurrentTime)
  function changeCurrentTime() {
    let rangeValue = range.value
    let timePercent = rangeValue/100
    // log("timePercent", timePercent)
    v.currentTime = v.duration * timePercent
    currentTime(ctspan)
  }

  var currentTime = function(ctspan) {
    // 当前时间的变化
    var currentTime = v.currentTime
    var dt = v.duration
    var ct = timeTrans(currentTime)
    // log('ct', ct)
    ctspan.innerHTML = ct
    // 同时改变进度条
    let percentTime = currentTime/dt
    range.value = percentTime * 100
    // log("dt", dt)
    // log("range.value", range.value)
  }
  var int1
  var durationTime = function() {
    // log("可播放，触发 canplay 事件")
    var dspan = e('#id-video-duration')
    var d = timeTrans(v.duration)
    // log('d', d)
    dspan.innerHTML = d
  }

  // 当可以播放的时候，触发 canplay 事件
  v.addEventListener("canplay", durationTime)

  // 当开始播放的时候，触发 play 事件
  v.addEventListener("play", function() {
    // log("触发 play 事件")
    // log("int1", int1)
    if (int1 !== undefined) {
      // log("int1有值")
      clearInterval(int1)
    }
    // 每隔 0.5s 更新一次当前时间
    int1 = setInterval(function() {
      currentTime(ctspan)
    }, 500)
  })

  // 当暂停的时候，触发 pause 事件
  v.addEventListener("pause", function() {
    // log("pause")
    // 每隔 0.5s 更新一次当前时间
    clearInterval(int1)
  })

  // 视频的时长已改变
  // v.addEventListener("durationchange", function() {
  //   log("视频的时长已改变")
  //   }
  // )
}

__main()
