// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const createConfig = require('uni-config-center')
const manConfig = createConfig({ // 获取配置实例
	pluginId: 'man1' // common/uni-config-center下的插件配置目录名
})
const man = manConfig.config() //
const womanConfig = createConfig({ // 获取配置实例
	pluginId: 'woman1' // common/uni-config-center下的插件配置目录名
})
const woman = womanConfig.config() //

const saveConfig = createConfig({ // 获取配置实例
	pluginId: 'save' // common/uni-config-center下的插件配置目录名
})

const save = saveConfig.config() //
const startConfig = createConfig({ // 获取配置实例
	pluginId: 'start' // common/uni-config-center下的插件配置目录名
})

const start = startConfig.config() //
module.exports = {
	_before: function() { // 通用预处理器

	},
	async config(type, appId) {
		if (type == 0) {
			return [start,1692561600000-5*86400*1000]
		} else if (type == 1) {
			if (appId == 'wxaef005c800edcef8') {
				let list = [{
						"image": "https://image1.aiimgs.com/resource/temp.png",
					},
					{
						"image": "https://image1.aiimgs.com/resource/temp.png",
					},
					{
						"image": "https://image1.aiimgs.com/resource/temp.png",
					},
					{
						"image": "https://image1.aiimgs.com/resource/temp.png",
					},
					{
						"image": "https://image1.aiimgs.com/resource/temp.png",
					},
					{
						"image": "https://image1.aiimgs.com/resource/temp.png",
					},
				]
				let share = ["https://image.aiimgs.com/share/share1.png",
					"https://image.aiimgs.com/share/share2.png",
					"https://image.aiimgs.com/share/share3.png",
					"https://image.aiimgs.com/share/share4.png"
				]
				let index = Math.floor(Math.random() * 3)
				let privacy = ""
				let agreement = ""
				privacy = "https://image1.aiimgs.com/resource/kaca_privacy.doc"
				agreement = "https://image1.aiimgs.com/resource/kaca_agreement.doc"

				return [list, {
					title: "完全免费，立等可取",
					path: "pages/index/index",
					imageUrl: share[index]
				}, privacy, agreement, "https://image1.aiimgs.com/resource/bg_home.png"]
			} else {
				let list = [{
						"image": "https://image1.aiimgs.com/real/cover/woman/4.png",
						"name": "夏日清凉"
					},
					{
						"image": "https://image1.aiimgs.com/real/cover/woman/5.png",
						"name": "情绪写真"
					},
					{
						"image": "https://image1.aiimgs.com/real/cover/woman/6.png",
						"name": "芭比之夜"
					},
					{
						"image": "https://image1.aiimgs.com/real/cover/woman/2.png",
						"name": "证件照"
					}
				]
				let share = ["https://image1.aiimgs.com/share/wxa774e1f482e2ed58/share1.jpeg",
					"https://image1.aiimgs.com/share/wxa774e1f482e2ed58/share2.jpeg",
					"https://image1.aiimgs.com/share/wxa774e1f482e2ed58/share3.jpeg",
					"https://image1.aiimgs.com/share/wxa774e1f482e2ed58/share4.jpeg",
					"https://image1.aiimgs.com/share/wxa774e1f482e2ed58/share5.jpeg",
					"https://image1.aiimgs.com/share/wxa774e1f482e2ed58/share6.jpeg"
				]
				let banner = ["https://image1.aiimgs.com/resource/banner1.png",
					"https://image1.aiimgs.com/resource/banner2.png",
					"https://image1.aiimgs.com/resource/banner4.png",
					"https://image1.aiimgs.com/resource/banner5.png",
					"https://image1.aiimgs.com/resource/banner6.png",
					"https://image1.aiimgs.com/resource/banner7.png",
					"https://image1.aiimgs.com/resource/banner8.png"
				]
				let index = Math.floor(Math.random() * 6)
				let privacy = ""
				let agreement = ""
				if (appId == "wx303e1c05cb60b18c") {
					privacy = "https://image1.aiimgs.com/resource/ning_privacy.docx"
					agreement = "https://image1.aiimgs.com/resource/ning_agreement.docx"
				}
				return [list, banner, {
					title: "完全免费，立等可取",
					path: "pages/index/start",
					imageUrl: share[index]
				}, privacy, agreement]
			}
		} else if (type == 2) {
			const res = await uniCloud.request({
				url: 'https://draw.aiimgs.com/api/style/getStyle/'+appId,
				method: 'POST',
				dataType: 'json' // 此处指定为json表示将此请求的返回值解析为json
			})
			let w=[]
			let m=[]
			if(res.statusCode==200&&res.data.code==0) {
				res.data.data.map(value=>{
					if(value.sex==true){
						w.push({
							cover: "https://image1.aiimgs.com/" + value.cover,
							name: value.name,
							id: value.id
						})
					}else{
						m.push({
							cover: "https://image1.aiimgs.com/" + value.cover,
							name: value.name,
							id: value.id
						})
					}
				})
			}
			return  [w, m, 4, 4]
		} else if (type == 3) {
			let temp = ["", "", "", ""]
			temp = save[appId]
			if (temp == undefined) {
				temp = ["", "", "", ""]
			}
			return temp
		} else {
			if (appId == 'wxaef005c800edcef8') {
				return ["https://image.aiimgs.com/resoure/pay_tip.png", 0, 4, 4, 10, []]
			} else if (appId == 'wxa774e1f482e2ed58') {
				return ["https://image.aiimgs.com/resoure/pay_tip.png", 990, 4, 4, 10]
			} else {
				return ["https://image.aiimgs.com/resoure/pay_tip.png", 1, 4, 4, 10]
			}

		}
	},
	async swap(first, second, uid, appId, selectData, channelInfo=undefined) {
		const selectList = []
		const db = uniCloud.database();
		const dbCmd = db.command
		const collection = db.collection('history')
		const uuid = this.getClientInfo().requestId
		let history = {
			"time": new Date().getTime(),
			"first":first,
			"second":second,
			"uid": uid,
			"job": uuid,
			"appId": appId,
			"list": []
		}
		const listRes = await uniCloud.request({
			url: 'https://draw.aiimgs.com/api/style/getStyle/'+appId,
			method: 'POST',
			dataType: 'json' // 此处指定为json表示将此请求的返回值解析为json
		})
		if(listRes.statusCode==200&&listRes.data.code==0) {
			listRes.data.data.map(value=>{
				selectData.map(item => {
					if (item == value.id) {
						selectList.push(value)
					}
				})
			})
		}
		for (const item of selectList) {
			console.log("start"+new Date().getTime())
			const res = await uniCloud.request({
				url: 'https://draw.aiimgs.com/api/draw/draw',
				method: 'POST',
				data:{
					"appId":appId,
					"faceImgs":[first,second],
					"styleId":item.id,
					"notifyUrl":"https://fc-mp-1941b3c4-65fa-4422-a644-62ccdcf2d855.next.bspapp.com/notifyV4"
				},
				dataType: 'json' // 此处指定为json表示将此请求的返回值解析为json
			})
			
			console.log("end"+new Date().getTime())
			console.log(res)
			let temp = {
				"name": item.name,
				"list": [],
				"msg": [],
				"job":""
			}
			if(res.statusCode==200&&res.data.code==0) {
				temp.job=res.data.data
			}
			history["list"].push(temp)
		}
		await collection.add(history)
		return {
			code: 201,
			data: uuid,
		}
	},
}