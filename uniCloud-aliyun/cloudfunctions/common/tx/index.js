module.exports = function(image, selectData) {
	const {
		mainCodeV3
	} = require('v3')
	const url = "https://facefusion.tencentcloudapi.com/"
	let payload = {
		"ProjectId": "at_1683425403518345216",
		"ModelId": selectData.model,
		"RspImgType": "url",
		"MergeInfos": [{
			"Url": image,
			"TemplateFaceID": selectData.temp
		}],
		"LogoAdd": 0,
	}
	let info = await mainCodeV3(payload, "facefusion", "AKIDudAUpHao0BGBsOvITSM6b3MTO9nFfssi",
		"iBRUOErJZbO6e2FEzZzEG8FOPCnIbeTC")
	// 调用云开发的请求方法
	console.log(info)
	const sendres = await uniCloud.httpclient.request(url, {
		headers: {
			"Content-Type": "application/json",
			"Authorization": info.Authorization, // 鉴权获得的内容
			"Host": "facefusion.tencentcloudapi.com",
			"X-TC-Action": "FuseFace",
			"X-TC-Version": "2022-09-27",
			"X-TC-Timestamp": Number(info.time), // 封装函数获得的时间戳,一定要是Number类型
			"X-TC-Region": "ap-guangzhou"
		},
		data: payload, // 未鉴权的参数
		method: 'POST',
		dataType: "json",
	})
	let re = {
		code: 200,
		msg: ""
	}
	let addData = {
		job: sendres.data.Response.RequestId,
		url: "",
		type: 2,
		time: new Date().getTime(),
		msg: "",
		finish:new Date().getTime(),
	}
	if ("Error" in sendres.data.Response) {
		re.code = 200
		re.msg =  image
	} else {
		re.msg = sendres.data.Response.FusedImage
		addData.url = re.msg
		const db = uniCloud.database();
		const dbCmd = db.command
		const collection = db.collection('swap')
		let res = await collection.add(addData)
	}
	return re
}
