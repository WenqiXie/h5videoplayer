"use strict"
// const request = require('request')
// const cheerio = require('cheerio')
const path = require('path')

const ModelFiles = function(parsedpath) {
	this.name = parsedpath.base || ''
	this.dir = parsedpath.dir || ''
}

// 拖拽时，添加新项目
const appendNewItem = function(ul, arr, i) {
	var name = arr[i].name
	let newItem = `
	<li title="${name}" data-i="${i}">${name}<img src="icon/close.png" alt=""></li>
	`
	ul.insertAdjacentHTML('beforeend', newItem)
}


var arr = []

// localStorage.ModelFiles 的初始化
if (localStorage.ModelFiles == undefined) {
	console.log('localStorage.ModelFiles 初始化');
	localStorage.ModelFiles = '[]'
}

var ul = document.querySelector('.videoList>ul')

// 面向对象的改造

var loadList = function() {
	var arr = JSON.parse(localStorage.ModelFiles)
	return arr
}
// vl 是要输出的对象
var vl = {
	data : loadList()
}

vl.all = function() {
	// 加载播放列表
	arr = this.data
	// log('arr showList', arr)
	var al = arr.length
	// log('ul', ul)
	ul.innerHTML = ''
	for (var i = 0; i < al; i++) {
		appendNewItem(ul, arr, i)
	}
}

vl.new = function(e) {
	var flength =  e.dataTransfer.files.length
  log("flength", flength)
	arr = this.data
  // ********************拖拽添加到播放列表的操作
	for (var i = 0; i < flength; i++) {
		var f = e.dataTransfer.files[i]
		var parsedpath = path.parse(f.path)
		var mf = new ModelFiles(parsedpath)
		arr.push(mf)
    // log("arr", arr)
		appendNewItem(ul, arr, arr.length-1)
    // 此处是否要关联播放功能呢
		if (i == 0) {
			console.log('播放第一个');
		}
	}
  // 最后要保存到本地
	this.save(arr)
}

vl.save = function(arr) {
	localStorage.ModelFiles = JSON.stringify(arr)
	this.data = arr
}

vl.del = function(itemId) {
	arr = this.data
	if (itemId != arr.length-1) {
		// 要删除的元素不是最后一个元素
    let a1 = arr.slice(0, itemId)
    let nextItemId = Number(itemId) + 1
    let a2 = arr.slice(nextItemId)
		// console.log('a2', a2);
    arr = a1.concat(a2)
		// console.log('arr', arr);
	} else {
    // 出栈操作
    arr.pop()
	}
	// 修改存储，重新渲染页面
	this.save(arr)
	this.all()
}

// // 修改播放列表
// const showList = function() {
// 	// 加载播放列表
// 	arr = JSON.parse(localStorage.ModelFiles)
// 	// log('arr showList', arr)
// 	var al = arr.length
// 	// log('ul', ul)
// 	ul.innerHTML = ''
// 	for (var i = 0; i < al; i++) {
// 		appendNewItem(ul, arr, i)
// 	}
// }

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
	vl.new(e)
	return false;
}

// ***************单击 x 删除当前条目
// 事件委托
bindEvent(ul, "click", function(event) {
	var target = event.target
	if (target.tagName == 'IMG') {
		log('删除当前条目')
		let parent = target.parentElement
		// log("target.parentElement", target.parentElement)
		let itemId = parent.dataset.i
		log("itemId 删除", itemId)
		vl.del(itemId)
	}
})
// 在文档加载完成时加载页面
vl.all()
