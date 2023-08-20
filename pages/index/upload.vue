<template>
	<view v-if="!isHide" :style="hiddenStyle">
		<view class="container">
			<view class="tipView">
				<text class="tipTitle">添加照片</text>
			</view>
			<view class="content">
				<view class="setpLay">
					<text class="setpTitle">Step 1</text>
					<text class="setpContent">上传 3 张男性正脸的精致照片吧</text>
				</view>
				<view class="uploadView">
					<view v-for="(item,index) in getList(0,3)" class="upload" @click="choose(item.index)">
						<view v-if="!item.finish" class="uploadBg">
							<image src="@/static/upload_bg_tip.svg" />
						</view>
						<view v-if="item.finish" class="uploadImageView">
							<image class="uploadImage" :src="item.url" mode="aspectFill" />
							<view class="uploadClose" @click.stop="close(item.index)">
								<image src="@/static/close.svg" />
							</view>
						</view>
					</view>
				</view>
				<view class="setpLay">
					<text class="setpTitle">Step 2</text>
					<text class="setpContent">上传 3 张女性正脸的精致照片吧</text>
				</view>
				<view class="uploadView">
					<view v-for="(item,index) in getList(3,6)" class="upload" @click="choose(item.index)">
						<view v-if="!item.finish" class="uploadBg">
							<image src="@/static/upload_bg_tip.svg" />
						</view>
						<view v-if="item.finish" class="uploadImageView">
							<image class="uploadImage" :src="item.url" mode="aspectFill" />
							<view class="uploadClose" @click.stop="close(item.index)">
								<image src="@/static/close.svg" />
							</view>
						</view>
					</view>
				</view>

			</view>
			<view class="bottomLay" :style="'padding-bottom:'+bottom+'px'">
				<view class="privacyView" v-if="isShowPrivacy">
					<image v-if="!check" src="@/static/index_check.svg" @click="Startcheck" />
					<image v-if="check" src="@/static/index_check_p.svg" @click="Startcheck" />
					<text class="privacyViewText">我已阅读并同意</text>
					<text class="privacyViewText link" @click="goAgreement">《用户协议》</text>
					<text class="privacyViewText link" @click="goPrivacy">《隐私政策》</text>
				</view>
				<view class="bottomLayView" :class="isNext ? '' : 'stateIng'" @click="start">
					<text>下一步</text>
				</view>
			</view>
		</view>
		<view class="container1" :style="'height:'+height+'px;z-index:'+zIndex">
			<view class="cropper">
				<bt-cropper ref="croper" :ratio="ratio" :dWidth="400" :rotate="rotate" fileType="png" showGrid
					@change="onChange" :imageSrc="url" :mask="mask">
				</bt-cropper>
			</view>
			<view class="footer">
				<view class="btnGroup">
					<view class="btn choose" @click="cancel">
						取消
					</view>
					<view class="btn" @click="onCrop">
						确定
					</view>
				</view>
				<!-- <slider @changing="onRotate"></slider> -->
			</view>
		</view>
		<view class="fileView">
			<uni-file-picker limit="7" :auto-upload="false" @success="success" ref="files" @select="select"
				file-mediatype="image"></uni-file-picker>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popContent">
				<view class="popContentTitle">照片越满足要求，生成效果越好哦!</view>
				<view class="tip">
					<view />
					<text>正确实例</text>
					<view />
				</view>
				<view class="group_2">
					<image src="@/static/upload_tip.png" />
					<image src="@/static/upload_tip1.png" />
					<image src="@/static/upload_tip2.png" />
				</view>
				<view class="tipTextLay">
					<view class="tipTextContent">
						<image class="tipTextLayImage1" src="@/static/upload_check.png" />
						<view>证件照/自拍/半身/全身</view>
					</view>
					<view class="tipTextContent">
						<image class="tipTextLayImage" src="@/static/upload_check.png" />
						<view>清晰的正脸</view>
					</view>
					<view class="tipTextContent">
						<image class="tipTextLayImage1" src="@/static/upload_check.png" />
						<view>无刘海、无眼镜遮挡面部</view>
					</view>
				</view>
				<view class="tip">
					<view />
					<text>错误示例</text>
					<view />
				</view>
				<view class="group_2">
					<image src="@/static/upload_tip3.png" />
					<image src="@/static/upload_tip4.png" />
					<image src="@/static/upload_tip5.png" />
				</view>
				<view class="tipTextLay">
					<view class="tipTextContent">
						<image class="tipTextLayImage" src="@/static/upload_error.png" />
						<view>人物面部有遮挡</view>
					</view>
					<view class="tipTextContent">
						<image class="tipTextLayImage" src="@/static/upload_error.png" />
						<view>面部不清晰</view>
					</view>
					<view class="tipTextContent">
						<image class="tipTextLayImage" src="@/static/upload_error.png" />
						<view>非正脸</view>
					</view>
				</view>
				<view class="popBottomLayView" @click="popChoose">
					<text class="text_6">从相册上传</text>
				</view>
				<view class="popBottomLayViewCancel" @click="closePop">
					<text class="text_6">取消</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const checkObject = uniCloud.importObject('check')
	export default {
		data() {
			return {
				index: 1,
				bottom: 0,
				isNext: false,
				check: false,
				isShowPrivacy: false,
				upload: false,
				list: [{
						finish: false,
						url: '',
						index: 0
					}, {
						finish: false,
						url: '',
						index: 1
					}, {
						finish: false,
						url: '',
						index: 2
					},
					{
						finish: false,
						url: '',
						index: 3
					}, {
						finish: false,
						url: '',
						index: 4
					},
					{
						finish: false,
						url: '',
						index: 5
					}
				],
				url: '',
				hiddenStyle:'',
				nowSelect: 0,
				height: 2500,
				imageSrc: "",
				// 蒙版，非黑色区域会裁剪为透明
				// mask: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-a3b890b4-7cb2-4b29-aa78-e652572bdef6/d6bc69ee-cdc0-4a13-a744-d79db42e0dbe.png",
				mask: "",
				isHide: true,
				dWidth: 500,
				rotate: 0,
				zIndex: -1,
				// 输出的宽高比例
				// ratio: 3 / 2,
				ratio: 1 / 1,
				activeIndex: 0,
				ratioList: [{
					width: 1,
					height: 1,
				}, {
					width: 16,
					height: 9,
				}, {
					width: 9,
					height: 16,
				}, {
					width: 4,
					height: 3,
				}, {
					width: 3,
					height: 4,
				}, {
					width: 3,
					height: 2,
				}, {
					width: 2,
					height: 3,
				}],
			}
		},
		onLoad() {
			this.isHide = getApp().globalData.isTest
			if (getApp().globalData.privacy != "" && getApp().globalData.agreement != "") {
				this.isShowPrivacy = true
				this.check = true
			}
		},
		onReady() {
			let that = this
			uni.getSystemInfo({
				success: function(res) {
					that.height = res.windowHeight
					that.bottom = res.safeAreaInsets.bottom + that.rpxTopx(32)
				}
			});
		},
		methods: {
			getList: function(min, max) {
				return this.list.filter(item => item.index >= min && item.index < max)
			},
			Startcheck() {
				this.check = !this.check
			},
			closePop() {
				this.$refs.popup.close()
			},
			start() {
				if (!this.check) {
					uni.showToast({
						title: "请先阅读同意用户协议和隐私政策"
					})
				} else if (!this.isNext) {
					uni.showToast({
						icon: "error",
						title: "需上传6张照片，请上传清晰正面照片"
					})
				} else {
					if (this.upload) {
						uni.navigateTo({
							url: "/pages/index/uploads",
						})
					} else {
						//#ifdef MP-WEIXIN
						uni.showLoading({
							title: '上传中',
							mask: true
						})
						this.checkPhotos().then(res => {

						})
						// #endif
						//#ifndef MP-WEIXIN 
						this.$refs.files.upload()
						// #endif
					}

				}
			},
			async checkPhotos() {
				let contentList=[]
				for(let value of this.list){
					let content = await this.getImageContent(value.url)
					contentList.push({
						"content": content,
						"url": value.url
					})
				}
				
				checkObject.checkV2(contentList, this.getAppId()).then(res => {
					uni.hideLoading()
					if (res.code == 200) {
						getApp().globalData.upload = res.data
						this.upload = true
						uni.navigateTo({
							url: "/pages/index/uploads",
						})
					} else {

						uni.showToast({
							icon: "error",
							title: "图片存在风险，请重新上传"
						})
						this.list[res.data].url = ""
						this.list[res.data].finish = false
						this.$refs.files.delFile(res.data)

					}
				})
			},
			async checkPhoto(path) {
				let content = await this.getImageContent(path)
				if (content != '') {

				}
			},
			async getImageContent(url) {
				return new Promise((resolve, reject) => {
					uni.getFileSystemManager().readFile({
						filePath: url,
						encoding: 'base64',
						success(res) {
							resolve(res.data)
						},
						fail(res) {
							uni.hideLoading()
							uni.showToast({
								icon: "error",
								title: "上传失败，请上传正面清晰照片"
							})
							resolve("")
							console.error(res)
						}
					})

				})
			},
			onChange(ev) {
				console.log(ev)
			},
			chooseRatio(index) {
				this.activeIndex = index
				let item = this.ratioList[index]
				this.ratio = item.width / item.height
			},
			cancel() {
				this.showCutter = false
				this.hiddenStyle=''
				this.zIndex = -1
				this.list[this.nowSelect].url = ""
				this.list[this.nowSelect].finish = false
				this.url = "";
			},
			onCrop(cb) {
				let that = this
				this.$refs.croper.crop().then(path => {
					//#ifdef MP-WEIXIN
					that.$refs.files.files.map(item => {
						if (item.path === that.url) {
							that.list[that.nowSelect].url = item.path
							that.list[that.nowSelect].finish = true
							let next = true
							that.list.map(value => {
								if (!value.finish) {
									next = false
								}
							})
							that.isNext = next
							item.path = path
						}
					})
					that.showCutter = false
					that.hiddenStyle=''
					that.url = "";
					that.zIndex = -1
					// #endif
					//#ifndef MP-WEIXIN 
					uni.showLoading({
						title: '检测中'
					})
					that.checkPhoto(path).then(res => {
						uni.hideLoading()
					})
					// #endif

				})
			},
			popChoose() {
				this.$refs.popup.close()
				this.choose(this.nowSelect)
			},
			choose(index) {
				const va = uni.getStorageSync("noFirst")
				if (va != true) {
					this.$refs.popup.open('bottom')
					uni.setStorage({
						key: "noFirst",
						data: true,
						success: function() {
							console.log('success');
						}
					})
					this.nowSelect = index
				} else {
					this.nowSelect = index
					this.$refs.files.choose()
				}


			},
			// 获取上传状态
			select(e) {
				this.url = e.tempFilePaths[0]
				this.showCutter = true
				this.hiddenStyle='height:'+this.height+"px;overflow: hidden;"
				this.zIndex = 3
				console.log('选择文件：', e)
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				uni.hideLoading({

				})
				
				
			},

			// 上传失败
			fail(e) {
				uni.hideLoading({

				})
				uni.showToast({
					icon: "fail",
					title: "上传失败"
				})
				console.log('上传失败：', e)
			},
			close(e) {
				console.log(e)
				this.list[e].url = ""
				this.list[e].finish = false
				
				this.$refs.files.delFile(e)
				this.upload = false
				this.isNext = false
			},

			goPrivacy() {
				this.goUrl(getApp().globalData.privacy)
			},
			goAgreement() {
				this.goUrl(getApp().globalData.agreement)
			},
			goUrl(url) {
				uni.showLoading({
					title: "请稍等"
				})
				uni.downloadFile({
					url: url,
					success: (res) => {
						if (res.statusCode === 200) {
							uni.openDocument({
								filePath: res.tempFilePath,
								showMenu: false,
								success: function(e) {
									uni.hideLoading({

									})
								},
								fail: function() {
									uni.hideLoading({

									})
									uni.showToast({
										title: '暂不支持此类型',
										duration: 2000,
										icon: "none",
									});
								}
							})
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background: #EAECF0;
	}

	.tipView {
		display: flex;
		flex-direction: column;
		padding-top: 61rpx;
		align-items: center;
	}

	.tipTitle {
		height: 87rpx;
		font-size: 58rpx;
		font-family: Poppins-Medium, Poppins;
		font-weight: 500;
		color: #191919;
		line-height: 87rpx;
	}


	.setpLay {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 38rpx;
	}

	.setpTitle {
		height: 87rpx;
		font-size: 38rpx;
		font-family: Smiley Sans-Oblique-Regular, Smiley Sans-Oblique;
		font-weight: 400;
		color: #191919;
		line-height: 87rpx;
	}

	.setpContent {
		height: 50rpx;
		font-size: 35rpx;
		font-family: PingFang SC-Regular-Regular, PingFang SC-Regular;
		font-weight: 400;
		color: #191919;
		line-height: 50rpx;
	}


	.uploadView {
		display: flex;
		flex-direction: row;
		margin-top: 38rpx;
		justify-content: space-evenly;
	}

	.upload {
		width: 196rpx;
		height: 212rpx;
		background: #FFFFFF;
		border-radius: 38rpx 38rpx 38rpx 38rpx;
		opacity: 1;
		border: 2rpx dashed rgba(25, 25, 25, 0.2);
	}

	.uploadBg {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		height: 212rpx;
	}

	.uploadBg image {
		width: 53rpx;
		height: 53rpx;
	}


	.uploadImageView {
		margin-left: auto;
		margin-right: auto;
		align-items: center;
		display: flex;
		position: relative;

	}

	.uploadImage {
		width: 196rpx;
		height: 212rpx;
		border-radius: 38rpx;
	}

	.uploadClose {
		width: 46rpx;
		height: 46rpx;
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.uploadClose image {
		width: 31rpx;
		height: 31rpx;
	}



	.privacyView {
		display: flex;
		align-items: center;
		margin-left: 81rpx;
	}

	.privacyView image {
		margin-right: 15rpx;
	}

	.privacyViewText {
		font-size: 23rpx;
		font-family: PingFangHK-Regular-Regular, PingFangHK-Regular;
		font-weight: 400;
		color: #191919;
		line-height: 35rpx;
	}

	.link {
		color: #4197e2;
	}

	.bottomLay {
		margin-top: 38rpx;
	}

	.bottomLay image {
		width: 35rpx;
		height: 36rpx;
	}

	.bottomLayView {
		width: 612rpx;
		height: 96rpx;
		background: #9CE02D;
		border-radius: 38rpx 38rpx 38rpx 38rpx;
		opacity: 1;
		border: 4rpx solid #000000;
		margin-left: auto;
		margin-right: auto;
		z-index: 3;
		justify-content: center;
		display: flex;
		align-items: center;
		margin-top: 30rpx;

	}

	.bottomLayView text {
		height: 38rpx;
		font-size: 33rpx;
		font-family: PingFang SC-Regular-Regular, PingFang SC-Regular;
		font-weight: 400;
		color: #191919;
		line-height: 38rpx;
	}

	.stateIng {
		opacity: 0.4;
	}

	.popContent {
		background: #FFFFFF;
		border-radius: 58rpx 58rpx 0rpx 0rpx;
		opacity: 1;
		padding-bottom: 46rpx;
	}

	.popContentTitle {
		height: 50rpx;
		font-size: 35rpx;
		font-family: Poppins-Medium, Poppins;
		font-weight: 500;
		color: #191919;
		line-height: 50rpx;
		padding-top: 57rpx;
		text-align: center;
	}

	.tip {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 45rpx;
	}

	.tip view {
		width: 202rpx;
		height: rpx;
		opacity: 1;
		border: 1rpx solid #999999;
	}

	.tip text {
		height: 29rpx;
		font-size: 23rpx;
		font-family: PingFang SC-Regular-Regular, PingFang SC-Regular;
		font-weight: 400;
		color: #000000;
		line-height: 27rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
	}

	.group_2 {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-top: 23rpx;
	}

	.group_2 image {
		width: 204rpx;
		height: 204rpx;
		border-radius: 8rpx 8rpx 8rpx 8rpx;
		opacity: 1;
		margin-left: 5rpx;
		margin-right: 5rpx;
	}

	.tipTextLay {
		margin-top: 15rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;

	}

	.tipTextContent {
		display: flex;
		flex-direction: row;
	}

	.tipTextLay view {
		width: 204rpx;
		margin-left: 5rpx;
		margin-right: 5rpx;
		font-size: 23rpx;
		font-family: PingFang SC-Regular-Regular, PingFang SC-Regular;
		font-weight: 400;
		color: #000000;
		line-height: 27rpx;

	}

	.tipTextLay image {
		width: 19rpx;
		height: 15rpx;
		margin-right: 5rpx;
	}

	.tipTextLayImage {
		margin-top: 6rpx;
	}

	.tipTextLayImage1 {
		margin-top: 20rpx;
	}

	.popBottomLayView {
		width: 635rpx;
		height: 96rpx;
		background: #9CE02D;
		border-radius: 38rpx 38rpx 38rpx 38rpx;
		opacity: 1;
		border: 4rpx solid #000000;
		margin-top: 57rpx;
		margin-left: auto;
		margin-right: auto;
		justify-content: center;
		display: flex;
		align-items: center;
	}

	.popBottomLayView text {
		height: 38rpx;
		font-size: 33rpx;
		font-family: PingFang SC-Regular-Regular, PingFang SC-Regular;
		font-weight: 400;
		color: #191919;
		line-height: 38rpx;
	}

	.popBottomLayViewCancel {
		width: 635rpx;
		height: 96rpx;
		background: #EAECF0;
		border-radius: 38rpx 38rpx 38rpx 38rpx;
		opacity: 1;
		margin-top: 23rpx;
		margin-left: auto;
		margin-right: auto;
		justify-content: center;
		display: flex;
		align-items: center;
	}

	.popBottomLayViewCancel text {
		height: 38rpx;
		font-size: 33rpx;
		font-family: PingFang SC-Regular-Regular, PingFang SC-Regular;
		font-weight: 400;
		color: rgba(25, 25, 25, 0.65);
		line-height: 38rpx;
	}


	.container1 {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		background-color: #000;
		position: absolute;
		top: 0rpx;
		width: 750rpx;
overflow: hidden;
		.cropper {
			flex: 1;
		}
	}

	uni-page-body {
		height: 100%;
	}

	.footer {
		.scroller {
			// align-items: center;
			width: 100vw;
			height: 100rpx;
			touch-action: none;

			.scrollerContainer {
				display: flex;
				flex-wrap: nowrap;
				height: 100rpx;
				align-items: center;
			}

			.item {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-left: 40rpx;
				width: 70rpx;
				height: 70rpx;
				flex-shrink: 0;
				color: #FFFFFF;

				&.active {
					color: #0070F3;

					.itemContent {
						border: 1px solid #0070F3;
					}
				}

				.itemContent {
					border-radius: 10rpx;
					padding: 10rpx;
					border: 1px solid #FFFFFF;
					font-size: 16rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					white-space: nowrap;
				}

				.ratio-1-1 {
					width: 70%;
					height: 70%;
				}

				.ratio-16-9 {
					width: 100%;
					height: 56.25%;
				}

				.ratio-9-16 {
					width: 56.25%;
					height: 100%;
				}

				.ratio-4-3 {
					width: 100%;
					height: 75%;
				}

				.ratio-3-4 {
					width: 75%;
					height: 100%;
				}

				.ratio-3-2 {
					width: 100%;
					height: 66.6%;
				}

				.ratio-2-3 {
					width: 66.6%;
					height: 100%;
				}
			}
		}

		.btnGroup {
			display: flex;
			align-items: center;
			justify-content: space-around;
			background-color: #000000;
			height: calc(100rpx + env(safe-area-inset-bottom));
			padding-bottom: 20rpx;
			padding-top: 20rpx;
			width: 100%;

			.btn {
				width: 300rpx;
				background-color: #007AFF;
				color: #FFFFFF;
				border-radius: 99px;
				text-align: center;
				color: #FFFFFF;
				line-height: 70rpx;

				&.choose {
					margin-right: 20rpx;
					background-color: #F0AD4E;
				}
			}
		}
	}

	.fileView {
		display: none;
	}
</style>