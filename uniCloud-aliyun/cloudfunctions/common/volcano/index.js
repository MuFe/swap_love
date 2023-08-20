async function volcano(image, url, log=false) {
	const {
		sign
	} = require('volc')
	
	let data = {
		"image_url": image,
		"template_url": url,
		"action_id": "faceswap",
		"version": "2.0",
		"do_risk": false,
	}
	const now = new Date();
	const dateTime = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
	const signParams = {
		headers: {
			// x-date header 是必传的
			["X-Date"]: dateTime,
		},
		method: "POST",
		query: {
			Action: "FaceSwap",
			Version: "2020-08-26",
		},
		log: log,
		accessKeyId: "AKLTYWJjMmQwNzU0N2ExNDk3MWFmMDUxN2Y0MGNjZDdmZmE",
		secretAccessKey: "TnpWa09ETTRaakExWkdWbU5EZGhPRGc0WkdReE5HWXlZamxrTm1VeVlqVQ==",
		serviceName: "cv",
		region: "cn-beijing",
		data: data,
	};
	// 正规化 query object， 防止串化后出现 query 值为 undefined 情况
	for (const [key, val] of Object.entries(signParams.query)) {
		if (val === undefined || val === null) {
			signParams.query[key] = "";
		}
	}
	let info = await sign(signParams)
	if (log) {
		console.log(info)
	}
	console.log("volcano")
	const sendres = await uniCloud.httpclient.request(
		'https://visual.volcengineapi.com/?Action=FaceSwap&Version=2020-08-26', {
			headers: {
				...signParams.headers,
				"Authorization": info, // 鉴权获得的内容
			},
			timeout:20000,
			data: data, // 未鉴权的参数
			method: 'POST',
			dataType: "json",
		})
	
	console.log("volcano")
	
	if (sendres.data.code == 10000) {
		return {
			code: 200,
			data: sendres.data.data.image,
		}
	} else {
		console.log(1112222)
		return {
			code: 201,
			msg: sendres,
		}
	}
}

module.exports = {
	volcano
}