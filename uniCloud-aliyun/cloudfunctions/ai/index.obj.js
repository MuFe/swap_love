// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129

module.exports = {
	_before: function() { // 通用预处理器

	},
	async swap(image, selectData) {
		const db = uniCloud.database();
		const dbCmd = db.command
		const collection = db.collection('swap')
		let count = await collection.where({
			type: 1,
			time: dbCmd.gte(new Date(new Date().toLocaleDateString()).getTime())
		}).count()
		// const {
		// 	native
		// } = require('native')
		return return {
			code:201,
			msg:""
		}
	},
	async swaps(image, selectData,isSupport=false) {
		const db = uniCloud.database();
		const dbCmd = db.command
		const collection = db.collection('swap')
		let count = await collection.where({
			type: 1,
			time: dbCmd.gte(new Date(new Date().toLocaleDateString()).getTime())
		}).count()
		const clientInfos = uniCloud.getClientInfos()
		let isT=false
		console.log(count)
		if(isSupport){
			isT=true
		} else if (clientInfos[0].platform == "mp-toutiao") {
			isT=true
		}else if (count.total > 2000) {
			isT=true
		}  
		return return {
			code:201,
			msg:""
		}
	}
}