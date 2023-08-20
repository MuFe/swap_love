// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const {
	mainCodeV3
} = require('v3')
const {
	oss
} = require('oss')
const path = require('path');
module.exports = {
	_before: function() { // 通用预处理器

	},
	async check(content, appId = '') {
		const clientInfos = uniCloud.getClientInfos()
		if (clientInfos[0].platform == "mp-toutiao") {

			const db = uniCloud.database();
			const collection = db.collection('token')
			let res = await collection.where({
				appid: appId,
			}).get()
			let isGetToken = false
			if (res.data.length == 0 || res.data[0].expires < new Date().getTime()) {
				isGetToken = true
			}
			let token = ''
			if (isGetToken) {
				const tokenUrl = "https://developer.toutiao.com/api/apps/v2/token"
				let sc = ''
				if (appId != 'tt3ecd4870a1f1dbea01') {
					sc = 'd221a884f90080db935b577c4c11b8ccbf2f7d12'
				} else {
					sc = '460db0a558d3bd04344f81cfeef86f16e505cecf'
				}
				const sendres = await uniCloud.httpclient.request(tokenUrl, {
					headers: {
						"Content-Type": "application/json",
					},
					data: {
						'appid': appId,
						'grant_type': 'client_credential',
						'secret': sc,
					}, // 未鉴权的参数
					method: 'POST',
					dataType: "json",
				})
				console.log('请求后的返回内容->', sendres.data.data);
				if (res.data.length == 0) {
					await collection.add({
						appid: appId,
						expires: sendres.data.data.expiresAt,
						token: sendres.data.data.access_token,
					})
				} else {
					await collection.where({
						appid: appId
					}).update({
						expires: sendres.data.data.expiresAt,
						token: sendres.data.data.access_token,
					})
				}
				token = sendres.data.data.access_token
			} else {
				token = res.data[0].token
			}
			const url = "https://developer.toutiao.com/api/apps/censor/image"
			let payload = {
				"image_data": content,
				"app_id": appId,
				"access_token": token,
			}
			// 调用云开发的请求方法
			const sendres = await uniCloud.httpclient.request(url, {
				headers: {
					"Content-Type": "application/json",
				},
				data: payload, // 未鉴权的参数
				method: 'POST',
				dataType: "json",
			})
			console.log('请求后的返回内容->', sendres.data.hit);
			if (sendres.data.hit) {
				return false
			} else {
				return true
			}
		} else {
			const url = "https://ims.tencentcloudapi.com/"
			let payload = {
				"FileContent": content, // phoneNum: 手机号 (String) 格式为 `+86${phoneNum}`
			}
			let info = await mainCodeV3(payload)
			// 调用云开发的请求方法
			const sendres = await uniCloud.httpclient.request(url, {
				headers: {
					"Content-Type": "application/json",
					"Authorization": info.Authorization, // 鉴权获得的内容
					"Host": "ims.tencentcloudapi.com",
					"X-TC-Action": "ImageModeration",
					"X-TC-Version": "2020-12-29",
					"X-TC-Timestamp": Number(info.time), // 封装函数获得的时间戳,一定要是Number类型
					"X-TC-Region": "ap-guangzhou"
				},
				data: payload, // 未鉴权的参数
				method: 'POST',
				dataType: "json",
			})
			console.log('请求后的返回内容->', sendres);
			if (sendres.data.Response.Suggestion == "Block") {
				return false
			} else {
				return true
			}
		}

	},
	async checkV2(list,appId = '') {
		const url = "https://ims.tencentcloudapi.com/"
		let index = 0
		let returnUrl=[]
		let host = "https://image1.aiimgs.com/"
		for(item of list){
			let payload = {
				"FileContent": item.content, // phoneNum: 手机号 (String) 格式为 `+86${phoneNum}`
			}
			let info = await mainCodeV3(payload)
			// 调用云开发的请求方法
			const sendres = await uniCloud.httpclient.request(url, {
				headers: {
					"Content-Type": "application/json",
					"Authorization": info.Authorization, // 鉴权获得的内容
					"Host": "ims.tencentcloudapi.com",
					"X-TC-Action": "ImageModeration",
					"X-TC-Version": "2020-12-29",
					"X-TC-Timestamp": Number(info.time), // 封装函数获得的时间戳,一定要是Number类型
					"X-TC-Region": "ap-guangzhou"
				},
				data: payload, // 未鉴权的参数
				method: 'POST',
				dataType: "json",
			})
			console.log('请求后的返回内容->', sendres);
			if (sendres.data.Response.Suggestion == "Block") {
				return {
					code:201,
					data:index,
				}
			} 
			index++
		}
		index=0
		for(item of list){
			let name = "result/" + new Date().getTime() + path.extname(item.url)
			su = await oss(item.content, name)
			if(su){
				returnUrl.push(host + name)
			}else{
				return {
					code:201,
					data:index,
				}
			}
			index++
		}
		return {
			code:200,
			data:returnUrl,
		}
	}
}