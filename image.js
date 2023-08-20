const fs = uni.getFileSystemManager();
 
//入口方法
function loadImage(data) {
    return new Promise((resolve, reject) => {
        let imgStor = uni.getStorageSync('imgStor') || [];
        let aIndex = imgStor.findIndex((item) => {
            return item.url == data;
        })
        if (aIndex == -1) { //没找到
            isOver(data).then((res) => {
				resolve(res);
                let imgStor = uni.getStorageSync('imgStor') || [];
                imgStor.push(res);
                uni.setStorageSync("imgStor", imgStor);
            })
        } else { //找到了
			isHave(imgStor[aIndex]).then(res=>{
				if(res){
					resolve(imgStor[aIndex]);  
				}else{
					isOver(data).then((res) => {
						resolve(res);
						imgStor[aIndex].path=res.path
					    uni.setStorageSync("imgStor", imgStor);
					})
				}
			})
           
        }
    })
}
 
 
// 先看缓存是否快满了，快满了去删；不然去下载
function isOver(data) {
    return new Promise((resolve, reject) => {
        fs.getSavedFileList({
            success(res) {
                res = res.fileList;
                let size = 0;
                for (let index = 0; index < res.length; index++) {
                    size += res[index].size;
                }
                size = size / 1048576; //字节转成MB
                console.log(size);
                if (size > 170) {
                    delimgstor(res, data).then((res)=>{
                        resolve(res);
                    })
                } else {
                    downloadImg(data).then((res => { //去下载
                        resolve(res);
                    }))
                }
            }
        })
    })
}

function isHave(data){
	return new Promise((resolve, reject) => {
	    fs.getSavedFileList({
	        success(res) {
				let have=false
				res.fileList.map(item=>{
					if(item.filePath===data.path){
						have=true
					}
				})
	            resolve(have)
	        }
	    })
	})
}
 
// 删除前四分之一
function delimgstor(res, data) {
    let bimgStor = uni.getStorageSync('imgStor') || [];
    let num = Math.floor(bimgStor.length / 4);
    let promiseList = []
    return new Promise((resolve, reject) => {
        for(let i = 0; i < num; i++){
           promiseList.push(new Promise((resol, reje) => {
               fs.removeSavedFile({
                   filePath: bimgStor[i].path,
                   success(res) {
                       resol(i)
                       console.log(res, 'rrrr')
                   },
                   fail(res) {
                       console.log(res, 'eeee')
                       resol(i)
                   }
               })
           }))
        }
        Promise.all(promiseList).then((res) => {
            let delarr = unique(res);
            let cimgStor = uni.getStorageSync('imgStor') || [];
            for(let i=0;i<delarr.length;i++){
                cimgStor.splice(i,1)
            }
            uni.setStorageSync("imgStor", cimgStor);
            downloadImg(data).then((ress => {
                resolve(ress);
            }))
        })
    })
}
function unique (arr) {
    return Array.from(new Set(arr))
}
// 下载图片
async function downloadImg(data) { 
       return await downloadImg2(data);    
}
 
function downloadImg2(item){
   return new Promise(function (resolve, reject) {
        console.log("我要开始下载了+"+item);
        uni.downloadFile({
            url: item,
            success: function (res) {
                if (res.statusCode === 200) {
                    fs.saveFile({
                        tempFilePath: res.tempFilePath,
                        success(r) {
                            let obj = {
                                url: item,
                                path:r.savedFilePath
                            } 
                            resolve(obj)
                        }
                    })
                }
            }
        })
    })
}
 
 
module.exports = {
    loadImage
}