'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	
	const data = JSON.parse(event.body)

	const db = uniCloud.database();
	// 获取 `user` 集合的引用
	const collection = db.collection('swap');
	console.log(data)
	if(data.code==200){
		let res = await collection.where({
			job: data.jobId
		}).update({
			url: "https://image.aiimgs.com/"+data.imageUrl,
			finish: new Date().getTime(),
		})
	}else{
		let res = await collection.where({
			job: data.jobId
		}).update({
			msg: data.msg,
			finish: new Date().getTime(),
		})
	}
	let result = await uniCloud.deleteFile({
		fileList: ["https://mp-5425b592-0a98-417b-9d0d-14925995924d.cdn.bspapp.com/temp/" + data.jobId]
	});
	//返回数据给客户端
	return event
};