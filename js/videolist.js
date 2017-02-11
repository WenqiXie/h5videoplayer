"use strict"
// const request = require('request')
// const cheerio = require('cheerio')
const path = require('path')

const ModelFiles = function(parsedpath) {
	this.name = parsedpath.base
	this.dir = parsedpath.dir
}

var arr = []

var ul = e('.videoList>ul')


var newItem = ``

// localStorage.ModelFiles 的初始化
if (localStorage.ModelFiles == undefined) {
	localStorage.ModelFiles = '[]'
}

const appendNewItem = function(ul, arr, i) {
	log('arr appendNewItem', arr)
	log('i appendNewItem ', i)
	var name = arr[i].name
	newItem = `
	<li data-i="${i}">${name}<img src="icon/close.png" alt=""></li>
	`
	ul.insertAdjacentHTML('beforeend', newItem)
}

const showList = function() {
	// 加载播放列表
	// console.log('createWindow')
	var mfjson = localStorage.ModelFiles
	arr = JSON.parse(mfjson)
	log('arr showList', arr)
	var al = arr.length
	// log('ul', ul)
	ul.innerHTML = ''
	for (var i = 0; i < al; i++) {
		log('showList i', i)

		appendNewItem(ul, arr, i)
	}
}

// ***********官方 doc抄来的文件拖拽
const holder = document.getElementById('holder')
holder.ondragover = () => {
	return false;
}

holder.ondragleave = holder.ondragend = () => {
	return false;
}

holder.ondrop = (e) => {
	e.preventDefault()
	// log('DragEvent', e)
	// for (let f of e.dataTransfer.files) {
	var flength =  e.dataTransfer.files.length
	console.log("flength", flength)
	arr = JSON.parse(localStorage.ModelFiles)
	for (var i = 0; i < flength; i++) {
		log('flength i', i)
		console.log("flength", flength)
		var f = e.dataTransfer.files[i]
		var file_path = f.path
		// console.log("file_path", file_path)
		// C:\Users\qiqi\Documents\前端\过年小项目\视频播放器\video\媚妆.mp4
		var parsedpath = path.parse(file_path)
		// log("parsedpath", parsedpath)
		// 信息如下
		// Object {
		// 	root: "C:\",
		// 	dir: "C:\Users\qiqi\Documents\前端\过年小项目\视频播放器\video",
		// 	base: "媚妆.mp4",
		// 	ext: ".mp4",
		// 	name: "媚妆"
		// }
		// 用 video 的信息新建一个对象
		var mf = new ModelFiles(parsedpath)
		// 设置新数据的 id
		var d = arr[arr.length - 1]
		// log('d', d)
		if (d == undefined) {
			mf.id = 0
		} else {
			mf.id = d.id + 1
		}
		// log('mf', mf)
		// 格式如下
		// {
		// 	dir:"C:\Users\qiqi\Documents\前端\过年小项目\视频播放器\video"
		// 	name:"媚妆.mp4"
		// }
		// 要把之前的 localStorage.ModelFiles 取出来，赋值给 arr
		arr.push(mf)
		// log('arr2 ondrop', arr)
		var iii = mf.id
		log('iii', iii)
		appendNewItem(ul, arr, iii)
		if (i == 0) {
			log('iii', iii)
			var firstLi = document.querySelector(`li[data-i="${iii}"]`)
			firstLi.classList.add('active')
			// var ppp = firstLi.parentElement
			log('firstLi', firstLi)
			// log('ppp', ppp)
			var v = document.querySelector('video')
			v.dataset.i = iii
			v.src = file_path
			var playButtons = es(".playButtons > img")
			v.play()
	    playButtons[1].classList.remove('none')
	    playButtons[0].classList.add('none')
			// firstLi.click()
			// firstLi.click()
			if (e.target.tagName == "VIDEO") {
				log('e.target.tagName == "VIDEO"，播放第一个视频')
			}
		}
		// // 把 数据 加入 this.data 数组
		// this.data.push(m)
		// // 把 最新数据 保存到文件中
		// this.save()
		// // 返回新建的数据
		// return m
		//
		// fs.append
	}
	var mfjson = JSON.stringify(arr)
	log('mfjson 保存到本地', mfjson)
	localStorage.ModelFiles = mfjson
	return false;
}

var ul = e('.videoList>ul')
//
const deleteItem = function(itemId) {
	arr = JSON.parse(localStorage.ModelFiles)
	// log('itemId', itemId)
	// let i = Number(itemId)
	// log('i', i)
	if (itemId != arr.length-1) {
		// localStorage.ModelFiles = '[]'
		// 要删除的元素不是最后一个元素，与最后一个调换，但 ID 不能变
		// log('deleteItem arr', arr)
		// log('itemId', typeof(itemId))
		log('arr[itemId]', arr[itemId])
		// log('arr[itemId].id', arr[itemId].id)
		// log('arr[arr.length-1].id', arr[arr.length-1].id)
		log('arr[arr.length-1]', arr[arr.length-1])
		// log('arr.length-1', arr.length-1)
		// var lastId = arr[arr.length-1].id
		// log('lastId', lastId)
		// log('arr[arr.length-1]', arr[arr.length-1])
		arr[itemId] = arr[arr.length-1]
		arr[itemId].id = Number(itemId)
		// [arr[itemId].id, arr[arr.length-1].id] = [lastId, arr[itemId].id]
	}
	// 出栈操作
	arr.pop()
	// delete arr[itemId]
	// log('arr[itemId]', arr[itemId])
	log('arr_d', arr)
	localStorage.ModelFiles = JSON.stringify(arr)
}

// 单击 x 删除当前条目
bindEvent(ul, "click", function(event) {
	var target = event.target
	// log("target_i", target)
	// log("target.tagName", target.tagName)
	// log("event_i", event)
	if (target.tagName == 'IMG') {
		log('删除当前条目')
		let parent = target.parentElement
		// log("target.parentElement", target.parentElement)
		let itemId = parent.dataset.i
		log("itemId 删除", itemId)
		deleteItem(itemId)
		parent.remove()
	}
})

showList()
