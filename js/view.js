

var winWidth = window.innerWidth//窗口的宽
var winHeight = window.innerHeight//窗口的高
var w = e('.w')
var video = e('video')
var section = e('section')//播放列表区域
var header = e('header')//播放列表区域
w.style.cssText = `height:${winHeight}px;`
section.style.cssText = `height:${winHeight}px;`

window.addEventListener("resize", function() {
  log("窗口大小改变")
  var winHeight = window.innerHeight//窗口的高
  log('winHeight', winHeight)
  section.style.cssText = `height:${winHeight}px;`
  w.style.cssText = `height:${winHeight}px;`
  // header.style.cssText = `width:${winHeight}px;`
})
