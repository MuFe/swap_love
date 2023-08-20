// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
	_before: function () { // 通用预处理器

	},
	async add(job) {
		const db = uniCloud.database();
		let res = await db.collection('swap').where({
			job: job,
		}).get()
		if (res.data.length == 0) {
			let buff = Buffer.from(job);
			let result = await uniCloud.uploadFile({
				cloudPath: "temp/" + job,
				fileContent: buff,
				cloudPathAsRealPath: true,
			})
			return result
		} else {
			return ""
		}
	},
	async get(job) {
		let result = await uniCloud.getFileInfo({
			fileList: ["https://mp-5425b592-0a98-417b-9d0d-14925995924d.cdn.bspapp.com/temp/" + job]
		});
		console.log(result)
		if ("size" in result.fileList[0]) {
			return ""
		} else {
			const db = uniCloud.database();
			let res = await db.collection('swap').where({
				job: job,
			}).get()
			console.log(res)
			if (res.data.length > 0) {
				return res.data[0].url
			} else {
				return ""
			}
		}
	}
}
