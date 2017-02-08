var log = function() {
  return console.log.apply(console, arguments)
}

var e = function (selector) {
  return document.querySelector(selector)
}

var es = function (selector) {
  return document.querySelectorAll(selector)
}

var zfill = function(n, width) {
    /*
    n 是 int 类型
    width 是 int 类型

    把 n 的位数变成 width 这么长，并在右对齐，不足部分用 0 补足并返回
    具体请看测试, 注意, 返回的是 string 类型

    返回 string 类型
    */
    var n1 = String(n)
    var l = n1.length
    var l1 = width - l
    if (l1 > 0) {
      for (var i = 0; i < l1; i++) {
        n1 = '0' + n1
      }
    }
    return n1
}

var bindEvent = function(element, eventName, callback) {
    /*
    element 是一个标签
    eventName 是一个 string, 表示事件的名字
    callback 是一个函数
    用法如下, 假设 button 是一个标签
    bindEvent(button, 'click', function(){
        log('click 事件')
    })
    */
    element.addEventListener(eventName, callback, false)
}

var bindAll = function(selector, eventName, callback) {
  var selectors = document.querySelectorAll(selector)
  for (var i = 0; i < selectors.length; i++) {
    selectors[i].addEventListener(eventName, callback)
    // log('selectors[i]', selectors[i])
  }
}

var finda = function (a, s) {
    // s 是一个字符串
    // a 是一个数组
    // 找 s 在 a 中的下标
    // 如果没找到，返回 -1
    var l = a.length
    for(var i = 0; i < l; i++){
        if(a[i] == s) {
            return i
        }
    }
    return -1
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

var appendHtmlBE = function(element, text) {
  return element.insertAdjacentHTML('beforeend', text);
}

var appendHtmlAB = function(element, text) {
  return element.insertAdjacentHTML('afterbegin', text);
}

//选项卡
var xxk = function(ele, className) {
  var element = e(ele)
  log('element', element)
  removeClassAll(className)
  element.classList.add(className)
}

var toggleClass = function(parentElement, className) {
  var p = parentElement
  if (p.classList.contains(className)) {
    p.classList.remove(className)
    p.querySelector('span').dataset.status = 'undone'
  } else {
    p.classList.add(className)
    p.querySelector('span').dataset.status = 'done'
  }
}
