

var winWidth = window.innerWidth//窗口的宽
var winHeight = window.innerHeight//窗口的高
var w = e('.w')
var video = e('video')
var section = e('section')//播放列表区域
var header = e('header')//播放列表区域
var controls = e('.controls')//播放列表区域
var hiddenSection = e('.hiddenSection')
var hiddenImg = e('.hiddenSection > img')
var s_width = section.offsetWidth

// 尺寸初始化
w.style.cssText = `height:${winHeight}px;`
section.style.cssText = `height:${winHeight}px;`
w.style.width = `${winWidth - s_width}px`

var changeSize = function() {
  log("窗口大小改变")
  var winHeight = window.innerHeight//窗口的高
  var winWidth = window.innerWidth//section的宽
  var s_width = section.offsetWidth
  section.style.height = `${winHeight}px`
  w.style.height = `${winHeight}px`
  w.style.width = `${winWidth - s_width}px`
  // log('w.style.width', w.style.width)
  // header.style.cssText = `width:${winHeight}px;`
}

window.addEventListener("resize", changeSize)
bindEvent(hiddenSection, 'click', function() {
  if (section.classList[0] == 'none') {
    log('click,显示列表')
    section.classList.remove('none')
    changeSize()
    hiddenImg.style.transform = 'translate(-50%,-50%) rotate(180deg)'
  } else {
    log('click,隐藏列表')
    hiddenImg.style.transform = 'translate(-50%,-50%) rotate(0deg)'
    section.classList.add('none')
    w.style.width = window.innerWidth + "px"
  }
})

section.addEventListener('mouseover', function() {
  log("mouseover section")
  hiddenSection.style.opacity = ".8"
  log("hiddenSection.style.opacity", hiddenSection.style.opacity)
  // setTimeout('hiddenSection.style.opacity = "0"', 2000)
})
section.addEventListener('mouseout', function() {
  log("mouseout section")
  hiddenSection.style.opacity = "0"
  log("hiddenSection.style.opacity", hiddenSection.style.opacity)
  // setTimeout('hiddenSection.style.opacity = "0"', 2000)
})
hiddenSection.addEventListener('mouseover', function() {
  log("mouseover hiddenSection")
  hiddenSection.style.opacity = "0.6"
  log("hiddenSection.style.opacity", hiddenSection.style.opacity)
  // setTimeout('hiddenSection.style.opacity = "0"', 2000)
})
