<template>
	<view class="container" v-if="!isHide">
		<view class="contentLay">
			<kong-swiper ref="swiper" class="swiper" :swiperList="list" next-margin="46rpx" previous-margin="46rpx"
				space-between="20rpx" :scale="0.8" duration="200" interval="200" circular @change="change">
			</kong-swiper>
			<view class="originalView" v-if="bottom!=0":style="'bottom:'+bottom+'px'">
				<image class="original" v-if="show" v-for="item in dataList" :src="item.url" mode="aspectFill"/>
				<view>
					<image v-if="show" class="originalIcon" src="@/static/retract.svg" mode="heightFix"/>
					<text class="originalText" @click="clickShow">{{show?'收起':'原图'}}</text>
				</view>
			</view>
			<view class="name">
				左右滑动查看更多
			</view>
			<view class="bottom">
				<view class="text-wrapper_2" @click="save">
					<view>
						<image src="@/static/save.svg" />
						<text class="text_6">保存</text>
					</view>
				</view>
				<view class="text-wrapper_2 shareLay">
					<view>
						<image src="@/static/share.svg" />
						<text class="text_6">分享</text>
					</view>
					<button class="shareLayBtn" open-type="share"></button>
				</view>
			</view>
		</view>
		<canvas v-show="startCanvas" canvas-id="canvas"
			style="margin-top:500rpx;width:750rpx;height: 1232rpx;"></canvas>
	</view>
</template>

<script>
	const pageObject = uniCloud.importObject('pageV2', {
		customUI: true
	})

	export default {
		data() {
			return {
				appId: "",
				saveInfo: {},
				bottom: 0,
				list: [],
				dataList: [],
				current: 0,
				currentIndex: 0,
				total: 0,
				name: '',
				startCanvas: false,
				show:false,
				isHide: true
			}
		},
		onLoad(e) {
			this.isHide=getApp().globalData.isTest
			pageObject.config(3, this.getAppId()).then(res => {
				this.saveInfo = res
			})
			this.current=parseInt(e.index)
			this.list=getApp().globalData.detail.data
			this.dataList=getApp().globalData.detail.original
			this.total = this.list.length
			this.name = getApp().globalData.detail.name
		},
		onReady() {
			let that = this
			uni.getSystemInfo({
				success: function(res) {
					console.log(res)
					
					uni.createSelectorQuery().in(that).select(".swiper").boundingClientRect((rect) => {
						console.log(rect)
						that.bottom=res.windowHeight-rect.bottom+that.rpxTopx(15)
					}).exec()
				}
			})
			
		},
		onShareAppMessage() {
			console.log(getApp().globalData.share)
			return getApp().globalData.share
		},
		methods: {
			clickShow(){
					this.show=!this.show
			},
			change(e) {
				console.log(e.detail)
				this.current = e.detail.current
				
			},
			async creatCanvas() {
				let that = this
				let imgUrl = await this.urlTofile(this.list[this.current].url)
				let code=""
				if (this.saveInfo[0] != "") {
					code = await this.urlTofile(this.saveInfo[0])
				}
				let logo = ""
				if (this.saveInfo[3] != "") {
					logo = await this.urlTofile(this.saveInfo[3])
				}
				//创建canvas对象
				this.canvas = uni.createCanvasContext('canvas', this);
				//这里是我自己的方法下载图片
				//canvas中的插入的图片不能是网络地址只能是下载到本地的 
				this.canvas.setFillStyle('#ffffff'); // 默认白色
				this.canvas.fillRect(0, 0, this.rpxTopx(750), this.rpxTopx(1161))
				//将二维码插入到canvas中
				this.canvas.drawImage(imgUrl, this.rpxTopx(26), this.rpxTopx(61), this.rpxTopx(696), this
					.rpxTopx(928));
				if (code!=""){
					this.canvas.drawImage(code, this.rpxTopx(26), this.rpxTopx(1012), this.rpxTopx(137), this
						.rpxTopx(137));
				}
				if (logo != "") {
					this.canvas.drawImage(logo, this.rpxTopx(641), this.rpxTopx(1023), this.rpxTopx(81), this
						.rpxTopx(110));
				}
				this.canvas.setFontSize(this.rpxTopx(36)) // setFontSize() 设置字体字号
				this.canvas.setFillStyle('#000000');
				this.canvas.fillText(this.saveInfo[1], this.rpxTopx(177), this.rpxTopx(1079))
				this.canvas.setFontSize(this.rpxTopx(25)) // setFontSize() 设置字体字号
				this.canvas.globalAlpha = 0.6
				this.canvas.setFillStyle('#000000');
				this.canvas.fillText(this.saveInfo[2], this.rpxTopx(177), this.rpxTopx(1119))
				this.canvas.globalAlpha = 1
				//成功之后
				this.canvas.draw(true, res => {
					setTimeout(() => {
						//讲canvas转换成图片
						uni.canvasToTempFilePath({
							x: 0,
							y: 0,
							canvasId: 'canvas',
							fileType: 'png',
							quality: 1,
							success: success => {
								this.startCanvas = false
								// that.canvas.draw()
								uni.saveImageToPhotosAlbum({
									filePath: success.tempFilePath,
									success: () => {
										uni.hideLoading();
										uni.showToast({
											title: '保存成功',
											icon: 'success'
										})
										this.canvas.clearRect(0, 0, this
											.rpxTopx(750), this.rpxTopx(
												1161))
										this.canvas.draw()
									},
									fail: () => {
										uni.hideLoading();
									},
									complete: () => {
				
									}
								});
				
							}
						})
					}, 500)
				
				});
			},
			//下载图片
			urlTofile(url) {
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: url,
						success(res) {
							resolve(res.path)
						},
						fail(res) {
							console.log("fail -> res", res)
							uni.showToast({
								title: "图片下载异常",
								duration: 2000,
								icon: "none"
							})
						}
					})

				})
			},
			save() {
				uni.showLoading({
					icon: "loading",
					title: "图片生成中",
					mask:true
				})
				this.startCanvas = true
				this.creatCanvas().then(imgUrl => {
					
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #191919;
	}

	.container {
		width: 750rpx;
		background-color: #191919;
		padding-top: 111rpx;
		padding-bottom: 50rpx;
	}

	.swiper {
		height: 919rpx;
	}

	.image {
		width: 688rpx;
		height: 919rpx;
		margin-left: auto;
		margin-right: auto;
		display: flex;
	}
.originalView{
	position: absolute;
	    right: 46rpx;
	    
	    display: flex;
	    flex-direction: column
}
.original{
	width: 92rpx;
	height: 92rpx;
	margin-top: 8rpx;
	margin-bottom: 8rpx;
}
.originalView view{
	width: 92rpx;
	height: 92rpx;
	background: rgba(0,0,0,0.7);
	border-radius: 15rpx 15rpx 15rpx 15rpx;
	opacity: 1;
	margin-top: 8rpx;
	display: flex;
	    flex-direction: column;
	    justify-content: space-evenly;
	    align-items: center;
}
.originalIcon{
	
	height: 17rpx;
	    margin-top: 10rpx
}
.originalText{
	height: 38rpx;
	font-size: 27rpx;
	font-family: PingFang-SC-Regular-Regular, PingFang-SC-Regular;
	font-weight: 400;
	color: #FFFFFF;
	line-height: 38rpx;
}

	.name {
		height: 46rpx;
		font-size: 31rpx;
		font-family: PingFangHK-Regular-Regular, PingFangHK-Regular;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 46rpx;
		text-align: center;
		margin-top: 69rpx;
	}

	
	.text-wrapper_2 {
		width: 331rpx;
		height: 92rpx;
		background: #EAECF0;
		border-radius: 23rpx 23rpx 23rpx 23rpx;
		opacity: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.text-wrapper_2 view {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: center;
	}

	.text_6 {
		height: 46rpx;
		font-size: 31rpx;
		font-family: PingFangHK-Regular-Regular, PingFangHK-Regular;
		font-weight: 400;
		color: #000000;
	}

	.bottom {
		display: flex;
		justify-content: space-between;
		margin-top: 46rpx;
		margin-left: 96rpx;
		margin-right: 96rpx
	}

	.bottom image {
		width: 35rpx;
		height: 38rpx;
		margin-right: 20rpx;
	}

	.shareLay {
		background: #9CE02D;
		position: relative;
		margin-left: 26rpx;
	}

	.shareTipLay {
		position: absolute;
		width: 182rpx;
		height: 34rpx;
		background: linear-gradient(309deg, #4A25E1 0%, #7B5AFF 93%, #7B5AFF 100%);
		border-radius: 24rpx 24rpx 24rpx 24rpx;
		opacity: 1;
		top: -17rpx;
		left: 100rpx;
	}

	.shareTipLay text {
		width: 134rpx;
		height: 20rpx;
		font-size: 16rpx;
		font-family: PingFang-SC-Regular-Regular, PingFang-SC-Regular;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 19rpx;

	}

	.share {
		color: black;
		flex-direction: column;
		background: #FF577A;
		width: 100%;
		height: 122rpx;
		box-shadow: 0rpx 8rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
		border-radius: 87rpx 87rpx 87rpx 87rpx;
		display: flex;
		align-items: center;
		color: white
	}

	.shareLayBtn {

		background-color: transparent;
		position: absolute;
		top: 0%;
		height: 122rpx;
		width: 100%;

	}

	.shareLayBtn::after {
		border: none;
	}
</style>