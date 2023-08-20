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
			if (appId == 'wx85a0fc1aabd815c6') {
				return [start, 1692705600000 + 5 * 86400 * 1000]
			}
			if (appId == 'wx7ae054f57bd117e9') {
				return [start, 1692705600000 + 5 * 86400 * 1000]
			}
			return [start, 1692561600000 - 5 * 86400 * 1000]
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
			} else if (appId == 'wx85a0fc1aabd815c6') {
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
					}
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
					}, privacy, agreement,
					"https://mp-1941b3c4-65fa-4422-a644-62ccdcf2d855.cdn.bspapp.com/bg_home.png"
				]
			} else if (appId == 'wx7ae054f57bd117e9') {
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
					}
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
					}, privacy, agreement,
					"https://mp-1941b3c4-65fa-4422-a644-62ccdcf2d855.cdn.bspapp.com/bg_home1.png"
				]
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
			let w = []
			for (const value of woman) {
				w.push({
					cover: "https://image1.aiimgs.com/" + value.cover,
					name: value.name,
					id: value.id
				})
			}
			let m = []
			for (const value of man) {
				m.push({
					cover: "https://image1.aiimgs.com/" + value.cover,
					name: value.name,
					id: value.id
				})
			}
			return [w, m, 4, 4]
		} else if (type == 3) {
			let temp = ["", "", "", ""]
			temp = save[appId]
			if (temp == undefined) {
				temp = ["", "", "", ""]
			}
			return temp
		} else {
			if (appId == 'wx85a0fc1aabd815c6') {
				return [{
						size: 16,
						price: 0.01,
						original: 1,
						total: 1
					}, {
						size: 32,
						price: 29.9,
						original: 39.9,
						total: 2990
					},
					[]
				]
			} else if (appId == 'wx7ae054f57bd117e9') {
				return [{
						size: 16,
						price: 0.01,
						original: 1,
						total: 1
					},
					[]
				]

			} else if (appId == 'wxaef005c800edcef8') {
				return ["https://image.aiimgs.com/resoure/pay_tip.png", 990, 4, 4, 10, []]
			} else if (appId == 'wxa774e1f482e2ed58') {
				return ["https://image.aiimgs.com/resoure/pay_tip.png", 990, 4, 4, 10]
			} else {
				return ["https://image.aiimgs.com/resoure/pay_tip.png", 1, 4, 4, 10]
			}

		}
	}
}