"use strict"
// const request = require('request')
// const cheerio = require('cheerio')
const path = require('path')

const ModelFiles = function(parsedpath) {
	this.name = parsedpath.base
	this.dir = parsedpath.dir
}

var arr = []


// localStorage.ModelFiles 的初始化
if (localStorage.ModelFiles == undefined) {
	localStorage.ModelFiles = '[]'
}

var ul = e('.videoList>ul')

// 面向对象的改造
var vl = function() {
	this.arr = JSON.parse(localStorage.ModelFiles)
}





// 拖拽时，添加新项目
const appendNewItem = function(ul, arr, i) {
	var name = arr[i].name
	let newItem = `
	<li data-i="${i}">${name}<img src="icon/close.png" alt=""></li>
	`
	ul.insertAdjacentHTML('beforeend', newItem)
}
// 修改播放列表
const showList = function() {
	// 加载播放列表
	arr = JSON.parse(localStorage.ModelFiles)
	// log('arr showList', arr)
	var al = arr.length
	// log('ul', ul)
	ul.innerHTML = ''
	for (var i = 0; i < al; i++) {
		appendNewItem(ul, arr, i)
	}
}

// ***********************拖拽事件start*************
const holder = document.getElementById('holder')
holder.ondragover = () => {
	return false;
}

holder.ondragleave = holder.ondragend = () => {
	return false;
}

holder.ondrop = (e) => {
	e.preventDefault()
	var flength =  e.dataTransfer.files.length
  log("flength", flength)
	arr = JSON.parse(localStorage.ModelFiles)
  // ********************拖拽添加到播放列表的操作
	for (var i = 0; i < flength; i++) {
		var f = e.dataTransfer.files[i]
		var parsedpath = path.parse(f.path)
		var mf = new ModelFiles(parsedpath)
		arr.push(mf)
    log("arr", arr)
		appendNewItem(ul, arr, arr.length-1)
    // 此处是否要关联播放功能呢
	}
  // 最后要保存到本地
	localStorage.ModelFiles = JSON.stringify(arr)
	return false;
}

// ***************单击 x 删除当前条目
const deleteItem = function(itemId) {
	arr = JSON.parse(localStorage.ModelFiles)
	if (itemId != arr.length-1) {
		// 要删除的元素不是最后一个元素
    let a1 = arr.slice(0, itemId)
    let nextItemId = Number(itemId) + 1
    let a2 = arr.slice(nextItemId)
    arr = a1.concat(a2)
	} else {
    // 出栈操作
    arr.pop()
	}
  // 修改存储，重新渲染页面
	localStorage.ModelFiles = JSON.stringify(arr)
  showList()
}

// 事件委托
bindEvent(ul, "click", function(event) {
	var target = event.target
	if (target.tagName == 'IMG') {
		log('删除当前条目')
		let parent = target.parentElement
		// log("target.parentElement", target.parentElement)
		let itemId = parent.dataset.i
		log("itemId 删除", itemId)
		deleteItem(itemId)
	}
})
// 在文档加载完成时加载页面
showList()
