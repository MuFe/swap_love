// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const path = require('path');

const {
	volcano
} = require('volcano')
const {
	oss
} = require('oss')
const createConfig = require('uni-config-center')
const manConfig = createConfig({ // 获取配置实例
	pluginId: 'man1' // common/uni-config-center下的插件配置目录名
})
const man = manConfig.config() //
const womanConfig = createConfig({ // 获取配置实例
	pluginId: 'woman1' // common/uni-config-center下的插件配置目录名
})
const woman = womanConfig.config() //

module.exports = {
	_before: function() { // 通用预处理器

	},
	async swap(first, second, uid, appId, selectData, channelInfo=undefined) {
		const selectList = []
		let channel =undefined
		if(channelInfo!=undefined){
			channel = uniCloud.deserializeSSEChannel(channelInfo)
			await channel.write({
				progress: 10
			})
		}
		
		for (const value of woman) {
			selectData.map(item => {
				if (item == value.id) {
					selectList.push(value)
				}
			})
		}
		for (const value of man) {
			selectData.map(item => {
				if (item == value.id) {
					selectList.push(value)
				}
			})
		}
		if(channel!=undefined){
			await channel.write({
				progress: 20
			})
		}
		let host = "https://image1.aiimgs.com/"
		if(first==undefined||first=="undefined"){
			let url=selectList[0].list[0].url
			first=host + "real/" + url
			second=host + "real/" + url
		}
		
		const uuid = this.getClientInfo().requestId
		console.log(uuid)
		let history = {
			"time": new Date().getTime(),
			"first":first,
			"second":second,
			"uid": uid,
			"job": uuid,
			"appId": appId,
			"list": []
		}
		
		let index = 0
		for (const value1 of selectList) {
			if(channel!=undefined){
				await channel.write({
					progress: (20 + 80 * (index / selectList.length)).toFixed(0)
				})
			}
			const list = value1.list
			let temp = {
				"name": value1.name,
				"list": [],
				"msg": [],
			}
			history["list"].push(temp)
			if (list.length < 4) {

			} else {
				let url = list[0].url
				let name = "result/" + new Date().getTime() + path.extname(url)
				let data = await volcano(first, host + "real/" + url)
				let su = false

				if (data.code == 200) {
					su = await oss(data.data, name)
					if (su) {
						temp['list'].push(host + name)
					}
				} else {
					temp['msg'].push(data.msg)
				}
				url = list[1].url
				name = "result/" + new Date().getTime() + path.extname(url)
				data = await volcano(second, host + "real/" + url)
				if (data.code == 200) {
					su = await oss(data.data, name)
					if (su) {
						temp['list'].push(host + name)
					}
				} else {
					temp['msg'].push(data.msg)
				}
				url = list[2].url
				name = "result/" + new Date().getTime() + path.extname(url)
				data = await volcano(first, host + "real/" + url)
				if (data.code == 200) {
					su = await oss(data.data, name)
					if (su) {
						temp['list'].push(host + name)
					}
				} else {
					temp['msg'].push(data.msg)
				}
				url = list[3].url
				name = "result/" + new Date().getTime() + path.extname(url)
				data = await volcano(second, host + "real/" + url)
				if (data.code == 200) {
					su = await oss(data.data, name)
					if (su) {
						temp['list'].push(host + name)
					}
				} else {
					temp['msg'].push(data.msg)
				}
			}
			index++
		}
		const db = uniCloud.database();
		const dbCmd = db.command
		const collection = db.collection('history')
		await collection.add(history)
		if(channel!=undefined){
			await channel.end({
				progress: 100
			})
		}
		return {
			code: 200,
			data: uuid,
		}
	},
	async swapV2(list, uid, appId, selectData, channelInfo=undefined) {
		let first=list[0]
		let second=list[1]
		const selectList = []
		let channel =undefined
		if(channelInfo!=undefined){
			channel = uniCloud.deserializeSSEChannel(channelInfo)
			await channel.write({
				progress: 10
			})
		}
		
		for (const value of woman) {
			selectData.map(item => {
				if (item == value.id) {
					selectList.push(value)
				}
			})
		}
		for (const value of man) {
			selectData.map(item => {
				if (item == value.id) {
					selectList.push(value)
				}
			})
		}
		if(channel!=undefined){
			await channel.write({
				progress: 20
			})
		}
		let host = "https://image1.aiimgs.com/"
		if(first==undefined||first=="undefined"){
			let url=selectList[0].list[0].url
			first=host + "real/" + url
			second=host + "real/" + url
		}
		
		const uuid = this.getClientInfo().requestId
		console.log(uuid)
		let history = {
			"time": new Date().getTime(),
			"first":first,
			"second":second,
			"uid": uid,
			"job": uuid,
			"appId": appId,
			"list": []
		}
		
		let index = 0
		for (const value1 of selectList) {
			if(channel!=undefined){
				await channel.write({
					progress: (20 + 80 * (index / selectList.length)).toFixed(0)
				})
			}
			const list = value1.list
			let temp = {
				"name": value1.name,
				"list": [],
				"msg": [],
			}
			history["list"].push(temp)
			if (list.length < 4) {
	
			} else {
				let url = list[0].url
				let name = "result/" + new Date().getTime() + path.extname(url)
				let data = await volcano(first, host + "real/" + url)
				let su = false
	
				if (data.code == 200) {
					su = await oss(data.data, name)
					if (su) {
						temp['list'].push(host + name)
					}
				} else {
					temp['msg'].push(data.msg)
				}
				url = list[1].url
				name = "result/" + new Date().getTime() + path.extname(url)
				data = await volcano(second, host + "real/" + url)
				if (data.code == 200) {
					su = await oss(data.data, name)
					if (su) {
						temp['list'].push(host + name)
					}
				} else {
					temp['msg'].push(data.msg)
				}
				url = list[2].url
				name = "result/" + new Date().getTime() + path.extname(url)
				data = await volcano(first, host + "real/" + url)
				if (data.code == 200) {
					su = await oss(data.data, name)
					if (su) {
						temp['list'].push(host + name)
					}
				} else {
					temp['msg'].push(data.msg)
				}
				url = list[3].url
				name = "result/" + new Date().getTime() + path.extname(url)
				data = await volcano(second, host + "real/" + url)
				if (data.code == 200) {
					su = await oss(data.data, name)
					if (su) {
						temp['list'].push(host + name)
					}
				} else {
					temp['msg'].push(data.msg)
				}
			}
			index++
		}
		const db = uniCloud.database();
		const dbCmd = db.command
		const collection = db.collection('history')
		await collection.add(history)
		if(channel!=undefined){
			await channel.end({
				progress: 100
			})
		}
		return {
			code: 200,
			data: uuid,
		}
	},

}