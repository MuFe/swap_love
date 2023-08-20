<template>
	<view class="container" v-if="!isHide">
		<view class="tipView">
			<text class="tipTitle">生成中</text>
			<text class="tipContent">精心绘制中, 解释下为什么这么慢</text>
		</view>
		<view class="mid" :style="'height:'+height+'px'">
			<hx-lottie :options="options" ref="lottie" />
		</view>

		<view class="bottom" :style="'bottom:'+bottom+'px'">
			<view class="info">退出此页面后，可以通过 “我的 > 正在生成中”页面进行查看</view>
			<view class="bottomLayView" @click="back">
				<text>创建新的头像</text>
			</view>
		</view>
	</view>
</template>

<script>
	const swapObject = uniCloud.importObject('aiV2', {
		customUI: true
	})
	export default {
		data() {
			return {
				data: {},
				progress: 0,
				appId: "",
				height: 0,
				bottom: 0,
				isEnd:false,
				isHide:true,
				options: {
					data: require("@/static/lottie1.json"),
					width: 276,
					height: 276,
				}
			}
		},
		onLoad(e) {
			this.isHide=getApp().globalData.isTest
			swapObject.swapV2(getApp().globalData.upload, getApp().globalData.uid, this.getAppId(),  getApp().globalData.data).then(
				res => {
					if (res.code == 200&&!this.isEnd) {
						uni.redirectTo({
							url: "/pages/index/finish?finish=true&id=" + res.data
						})
					}
				})
		},
		onUnload() {
			this.isEnd=true
		},
		onReady() {
			let that = this
			uni.getSystemInfo({
				success: function(res) {
					console.log(res)
	
					that.bottom = res.safeAreaInsets.bottom + that.rpxTopx(32)
					that.height = res.windowHeight - (that.bottom + that.rpxTopx(350))
				}
			});
		},
		onShareAppMessage() {
			console.log(getApp().globalData.share)
			return getApp().globalData.share
		},
		methods: {
			back(){
				uni.navigateBack({
					delta:2,
				})
			}	
		}
	}
</script>

<style>
	page {
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
		color: #191919;
		line-height: 87rpx;
	}

	.tipContent {
		width: 540rpx;

		font-size: 35rpx;
		font-family: Poppins-Medium, Poppins;
		font-weight: 500;
		color: #191919;
		line-height: 50rpx;
		margin-top: 15rpx;
		text-align: center;
	}

	.mid {
		width: 276rpx;
		height: 100%;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		position: relative;
		flex-direction: row;
		align-items: center;
	}


	.info {
		height: 35rpx;
		font-size: 23rpx;
		font-family: PingFangHK-Regular-Regular, PingFangHK-Regular;
		font-weight: 400;
		color: #191919;
		line-height: 35rpx;
		margin-bottom: 46rpx;
	}

	.bottom {
		position: absolute;
		display: flex;
		flex-direction: column;
		text-align: center;
		justify-content: center;
		width: 100%;
	}

	.bottomLayView {
		justify-content: center;
		width: 635rpx;
		height: 96rpx;
		background: #9CE02D;
		border-radius: 38rpx 38rpx 38rpx 38rpx;
		opacity: 1;
		border: 4rpx solid #000000;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		align-items: center;
	}
</style>