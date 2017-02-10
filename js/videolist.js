"use strict"
// const request = require('request')
// const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

const ModelFiles = function(parsedpath) {
	this.name = parsedpath.base
	this.dir = parsedpath.dir
}

var arr = []

var newItem = function(i, name) {
	return `
	<li data-i="${i}">${name}</li>
	`
}

// localStorage.ModelFiles 的初始化
if (localStorage.ModelFiles == undefined) {
	localStorage.ModelFiles = '[]'
}

const showList = function() {
	// 加载播放列表
	// console.log('createWindow')
	var mfjson = localStorage.ModelFiles
	var arr = JSON.parse(mfjson)
	// log('arr0', arr)
	var al = arr.length
	var ul = e('.videoList>ul')
	// log('ul', ul)
	ul.innerHTML = ''
	for (var i = 0; i < al; i++) {
		let name = arr[i].name
		newItem = `
		<li data-i="${i}">${name}</li>
		`
		// log('newItem', newItem)
		ul.insertAdjacentHTML('beforeend', newItem)
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
	for (let f of e.dataTransfer.files) {
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
		// v.src = file_path
		// play()
		// 用 video 的信息新建一个对象
		var mf = new ModelFiles(parsedpath)
		// 设置新数据的 id
		var d = arr.length - 1
		// log('d', d)
		if (d == -1) {
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
		arr = arr = JSON.parse(localStorage.ModelFiles)
		arr.push(mf)
		// log('arr1', arr)
		var mfjson = JSON.stringify(arr)
		// log('mfjson', mfjson)
		localStorage.ModelFiles = mfjson
		showList()
		// // 把 数据 加入 this.data 数组
		// this.data.push(m)
		// // 把 最新数据 保存到文件中
		// this.save()
		// // 返回新建的数据
		// return m
		//
		// fs.append
	}
	return false;
}

showList()
