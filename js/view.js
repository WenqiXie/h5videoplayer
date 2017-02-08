

var winWidth = window.innerWidth//窗口的宽
var winHeight = window.innerHeight//窗口的高
var w = e('.w')
var video = e('video')
var section = e('section')//播放列表区域
var header = e('header')//播放列表区域
var controls = e('.controls')//播放列表区域

w.style.cssText = `height:${winHeight}px;`
section.style.cssText = `height:${winHeight}px;`

window.addEventListener("resize", function() {
  log("窗口大小改变")
  var winHeight = window.innerHeight//窗口的高
  var winWidth = window.innerWidth//section的宽
  var s_width = section.offsetWidth
  section.style.height = `${winHeight}px`
  w.style.height = `${winHeight}px`
  controls.style.width = `${winWidth - s_width}px`
  log('controls.style.width', controls.style.width)
  // header.style.cssText = `width:${winHeight}px;`
})
