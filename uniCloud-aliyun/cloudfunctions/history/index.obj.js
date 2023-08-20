// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
	_before: function () { // 通用预处理器

	},
	async history(openId,appId,status=1){
		const db = uniCloud.database();
		const dbCmd = db.command
		const collection = db.collection('history')
		let res = await collection.where({
			appId: appId,
			uid:openId,
		}).get()
		let list=[]
		if(appId=="wxaef005c800edcef8"){
			res.data.map(item=>{
				let tempList=[]
				item.list.map(value=>{
					if(value.list.length>0){
						tempList.push(value.list[0])
					}
				})
				list.push({
					"url":tempList,
					"time":item.time,
					"job":item.job,
				})
				
			})
		}else{
			res.data.map(item=>{
				item.list.map(value=>{
					if(value.first==''){
						list.push({
							"name":value.name,
							"url":value.first,
							"time":item.time,
							"job":item.job,
						})
					}else{
						list.push({
							"name":value.name,
							"url":value.list[0],
							"time":item.time,
							"job":item.job,
						})
					}
				})
			})
		}
		return list
	},
	async result(job){
		const db = uniCloud.database();
		const dbCmd = db.command
		const collection = db.collection('history')
		let res = await collection.where({
			job: job,
		}).get()
		let list=[]
		res.data.map(item=>{
			item.list.map(value=>{
				list.push({
					"name":value.name,
					"list":value.list,
					"original":[{
						"url":item.first
					},{
						"url":item.second
					}]
				})
			})
		})
		return list
	},
	async user(openId,appId){
		const db = uniCloud.database();
		const dbCmd = db.command
		const collection = db.collection('history')
		let res = await collection.where({
			appId: appId,
			uid:openId,
		}).orderBy("time", "desc").get()
		let doing = ''
		let finish = ''
		res.data.map(item=>{
			if(item.list.length>0){
				let value=item.list[0]
				if(value.list.length>0){
					console.log(value)
					finish=value.list[0]
				}
			}
		})
		let list = []
		for(var i=0;i<17;i++){
			list.push(
			{
				"image":"https://image1.aiimgs.com/resource/head/image"+i+".png",
				"name":"咔嚓一下",
			})
		}
		let index = Math.floor(Math.random() * 17)
		return [doing,finish,'',list[index]]
	}
}
