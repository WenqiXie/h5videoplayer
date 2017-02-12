

// 绑定事件操作
// 测试事件发生的顺序
var v = e('video')
var bindV = function(eventName) {
  v.addEventListener(`${eventName}`, function() {
    console.log(`${eventName}`);
  })
}

// bindV('play')
// 可以开始播放的时候，就会触发
// bindV('durationchange')
// v.addEventListener('durationchange', function functionName() {
//   // 加载新视频的时候才触发的事件
//   console.log('v.readyState', v.readyState);
// })

// bindV('loadedmetadata')
// bindV('loadeddata')

// bindV('canplay')
// 当数据足够可以播放的时候，就可以出发 canplay
// 无论是刚刚加载还是跳跃操作

// bindV('playing')
// 进入播放状态的时候
// bindV('timeupdate')
// 当播放时间改变的时候，触发
// bindV('pause')
// bindV('ratechange')
// bindV('seeking')
// bindV('volumechange')


// 改变播放时间的显示
 var timeTrans = function(time) {
   var minute = Math.floor(time / 60)
   var second = Math.floor(time % 60)
   var t = `${zfill(minute, 2)}:${zfill(second, 2)}`
   // log('t', t)
   return t
 }

// 声明一个总时长的变量，有两个事件用到
var durationTime


// 加载新视频的时候才触发的事件
v.addEventListener('canplay', function functionName(event) {
  // console.log('v.readyState', v.readyState);
  // 时长和标题都会改变
  // console.log('event', event);
  var title = e('title')
  var activeli = e('li.active')
  // log('title', title)
  // log('li', li)
  title.innerHTML = activeli.textContent
  var dspan = e('#id-video-duration')
  durationTime = v.duration
  dspan.innerHTML = timeTrans(durationTime)
  var progressDiv = e('.progress_bar')
  progressDiv.classList.remove('none')
})


// 进入正在播放，播放按钮的显示会改变
var playButtons = es(".playButtons > img")

v.addEventListener('playing', function functionName() {
  playButtons[1].classList.remove('none')
  playButtons[0].classList.add('none')
})


// 播放进度
var progress = e("input#id-input-progress_bar")
var ctspan = e("#id-video-currentTime")// 这是当前时间的 span 标签

v.addEventListener('timeupdate', function functionName() {
  // 播放时间改变的时候，会随时间触发
  // 当前时间，进度条会改变
  var currentTime = v.currentTime
  var ct = timeTrans(currentTime)
  // log('ct', ct)
  ctspan.innerHTML = ct
  // 同时改变进度条
  let percentTime = currentTime/durationTime
  progress.value = percentTime * 100
})



// 进入暂停状态，播放按钮的显示会改变
v.addEventListener('pause', function functionName() {
  playButtons[0].classList.remove('none')
  playButtons[1].classList.add('none')
})
