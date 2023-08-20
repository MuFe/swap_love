
async function oss(image, name,log=false) {
	const {
		ossSign1
	} = require('volc')

	const now = new Date();
	const dateTime = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
	const signParams = {
		headers: {
			// x-date header 是必传的
			["X-Tos-Date"]: dateTime,
			["Host"]: 'swap-resource.tos-cn-beijing.volces.com',
		},
		method: "PUT",
		pathName: '/' + name,
		needSignHeaderKeys:['X-Tos-Date'],
		host: 'swap-resource.tos-cn-beijing.volces.com',
		accessKeyId: "AKLTYWJjMmQwNzU0N2ExNDk3MWFmMDUxN2Y0MGNjZDdmZmE",
		secretAccessKey: "TnpWa09ETTRaakExWkdWbU5EZGhPRGc0WkdReE5HWXlZamxrTm1VeVlqVQ==",
		serviceName: "tos",
		region: "cn-beijing",
	};

	let info = await ossSign1(signParams)

	if(log){
		console.log(info)
	}
	const buffer = new Buffer.from(image, 'base64')
	const sendres = await uniCloud.httpclient.request(
		'https://swap-resource.tos-cn-beijing.volces.com/'+name, {
			headers: {
				...signParams.headers,
				'Content-length': image.length,
				'Date': dateTime,
				"Authorization": info, // 鉴权获得的内容
			},
			timeout:20000,
			data: buffer, // 未鉴权的参数
			method: 'PUT',
			dataType: "json",
		})
	if(log){
		console.log(sendres)
	}

	if (sendres.status == 200) {
		return true
	} else {
		return false
	}
}

module.exports = {
	oss
}