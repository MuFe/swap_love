// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const createConfig = require('uni-config-center')
const manConfig = createConfig({ // 获取配置实例
	pluginId: 'man' // common/uni-config-center下的插件配置目录名
})
const man = manConfig.config() //
const womanConfig = createConfig({ // 获取配置实例
	pluginId: 'woman' // common/uni-config-center下的插件配置目录名
})
const woman = womanConfig.config() //


const adConfig = createConfig({ // 获取配置实例
	pluginId: 'ad' // common/uni-config-center下的插件配置目录名
})
const adList = adConfig.config() //

const saveConfig = createConfig({ // 获取配置实例
	pluginId: 'save' // common/uni-config-center下的插件配置目录名
})
const save = saveConfig.config() //
module.exports = {
	_before: function() { // 通用预处理器

	},
	async config(type,appId) {
		if (type == 1) {
			let list = [
				"https://image.aiimgs.com/10.png",
				"https://image.aiimgs.com/20.png",
				"https://image.aiimgs.com/30.png",
				"https://image.aiimgs.com/40.png",
				'https://image.aiimgs.com/50.png',
			]
			let list1 = [
				'https://image.aiimgs.com/11.png',
				'https://image.aiimgs.com/21.png',
				'https://image.aiimgs.com/31.jpg',
				'https://image.aiimgs.com/41.png',
				'https://image.aiimgs.com/51.png',
			]
			let list2 = [
				'https://image.aiimgs.com/12.jpg',
				'https://image.aiimgs.com/22.jpg',
				'https://image.aiimgs.com/32.jpg',
				'https://image.aiimgs.com/42.jpg',
				'https://image.aiimgs.com/52.jpg',
			]
			let share = ["https://image.aiimgs.com/share/share1.png",
				"https://image.aiimgs.com/share/share2.png",
				"https://image.aiimgs.com/share/share3.png",
				"https://image.aiimgs.com/share/share4.png"
			]
			let index = Math.floor(Math.random() * 3)
			const clientInfos = uniCloud.getClientInfos()
			let ad=["","",""]
			if (clientInfos[0].platform == "mp-weixin") {
				ad=adList[appId]
				if(ad==undefined){
					ad=["","",""]
				}
				console.log(ad)
			}
			return [list, list1, list2, {
				title: "完全免费，立等可取",
				path: "pages/index/index",
				imageUrl: share[index]
			},ad]
		} else if(type==2){
			return [woman, man,
				"https://image.aiimgs.com/temp/", "https://image.aiimgs.com/temp/"
			]
		}else {
			let temp=["","","",""]
			temp=save[appId]
			if(temp==undefined){
				temp=["","","",""]
			}
			return temp
		}
	},
	
	
}