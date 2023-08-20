<template>
	<view class="container" :style="'height:'+height+'px'" v-if="!isHide">
		<image class="bg" :src="bg" mode="widthFix" />
		<image class="icon1" src="@/static/index_icon1.png" />
		<view class="content" :style="'margin-bottom:'+bottom+'px'">
			<scroll-view class="scroll-view" scroll-x="true">
				<view class="mid">
					<image v-for="(item,index) in list" class="midImage" :class="'image'+index" :src="item.url"
						mode="widthFix" />

					<image class="icon2" src="@/static/index_icon2.png" />
					<image class="icon3" src="@/static/index_icon3.png" />
					<image class="icon4" src="@/static/index_icon4.png" />
				</view>
			</scroll-view>
			<view class="bottom" @click="start">
				<view>一键生成</view>
			</view>
		</view>
		<swap-pay ref="uniPay" @openId="getOpenId" />
	</view>
</template>

<script>
	const pageObject = uniCloud.importObject('pageV2', {
		customUI: true
	})
	import util from '@/image.js'
	export default {
		data() {
			return {
				list: [],
				height: 0,
				bottom: 0,
				bg: '',
				isHide: true,
			}
		},
		onShareAppMessage() {
			return getApp().globalData.share
		},
		onLoad() {
			this.isHide = getApp().globalData.isTest
			let that = this;
			pageObject.config(1, this.getAppId()).then(res => {
				res[0].map(item => {
					this.list.push({
						image: item.image,
						url: ''
					})
				})
				this.loadImage(this.list)
				getApp().globalData.privacy = res[2]
				getApp().globalData.agreement = res[3]
				getApp().globalData.share = res[1]
				if (res[5]) {
					uni.setStorageSync("test", true);
				}
				util.loadImage(res[4]).then(res1 => {
					console.log(res1)
					that.bg = res1.path
				})
			})

			uni.getSystemInfo({
				success(res) {
					console.log(res)
					that.height = res.windowHeight; //data中 声明 top_height:0 
					that.bottom = res.safeAreaInsets.bottom + that.rpxTopx(32)
				}
			});
		},
		methods: {
			getOpenId(e) {
				getApp().globalData.uid = e
				console.log(getApp().globalData.uid)
			},
			loadImage(urlList) {
				urlList.map(item => {
					item.url = ""
					util.loadImage(item.image).then(res => {
						urlList.map(value => {
							if (value.image == res.url) {
								value.url = res.path
							}
						})
					})
				})
			},
			start() {
				uni.navigateTo({
					url: "/pages/index/upload"
				})
			}
		}
	}
</script>

<style>
	.container {
		width: 750rpx;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}

	.bg {
		width: 750rpx;
		position: fixed;
		top: 0px;
		height: 100%;
	}

	.content {
		width: 750rpx;
		display: flex;
		flex-direction: column;
	}

	.mid {
		position: relative;
		height: 750rpx;
	}

	.scroll-view {
		white-space: nowrap;
		display: flex;

	}

	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}

	.midImage {
		width: 288rpx;
		height: 365rpx;
		position: absolute;
	}

	.image0 {
		margin-top: 128rpx;
		z-index: 2
	}

	.image1 {
		margin-left: 234rpx;
		z-index: 3
	}

	.image2 {
		margin-top: 383rpx;
		margin-left: 136rpx;
		z-index: 0
	}

	.image3 {
		margin-top: 186rpx;
		margin-left: 455rpx;
		z-index: 0
	}

	.image4 {
		margin-top: 30rpx;
		margin-left: 668rpx;
		z-index: 1
	}

	.image5 {
		margin-top: 288rpx;
		margin-left: 818rpx;
		z-index: 0
	}

	.icon1 {
		width: 148rpx;
		height: 154rpx;
		z-index: 3;
		position: fixed;
		left: 203rpx;
		top: 50rpx;
	}

	.icon2 {
		width: 142rpx;
		height: 142rpx;
		z-index: 3;
		position: absolute;
		top: 480rpx;
	}

	.icon3 {
		width: 175rpx;
		height: 180rpx;
		z-index: 3;
		position: absolute;
		top: 627rpx;
		left: 560rpx;
	}

	.icon4 {
		width: 108rpx;
		height: 112rpx;
		z-index: 3;
		position: absolute;
		top: 51rpx;
		left: 545rpx;
	}




	.bottom {
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
		margin-top: 71rpx;
	}

	.bottom view {
		height: 38rpx;
		font-size: 33rpx;
		font-family: PingFang SC-Regular-Regular, PingFang SC-Regular;
		font-weight: 400;
		color: #191919;
		line-height: 38rpx;
		-webkit-text-size-adjust: none;
	}
</style>