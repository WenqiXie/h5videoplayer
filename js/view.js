

var winWidth = window.innerWidth//窗口的宽
var winHeight = window.innerHeight//窗口的高
var section = e('section')//播放列表区域
log('winHeight', winHeight)
section.style.cssText = `height:${winHeight}px;`
