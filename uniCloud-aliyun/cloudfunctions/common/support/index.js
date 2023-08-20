async function support(image, selectData) {
	const res = await uniCloud.request({
		url: 'http://18.167.12.79/swap/swap',
		method: 'POST',
		data: {
			domain: "https://image.aiimgs.com/real/",
			style:selectData.url,
			url: image,
			notify: "https://fc-mp-5425b592-0a98-417b-9d0d-14925995924d.next.bspapp.com/notifyV3"
		}, // 请求内容
		dataType: 'json' // 此处指定为json表示将此请求的返回值解析为json
	})
	console.log("support")
	console.log(res)
	if (res.data.code == 200) {
		const db = uniCloud.database();
		const dbCmd = db.command
		const collection = db.collection('swap')
		await collection.add({
			job: res.data.data,
			url: "",
			type: 1,
			time: new Date().getTime(),
			msg: ""
		})
		return {
			code:202,
			msg:res.data.data
		}
	}else{
		return {
			code:201,
			msg:res.data.msg
		}
	}
}
module.exports = {
  support
}