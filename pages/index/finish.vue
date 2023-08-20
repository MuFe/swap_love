<template>
	<view class="container" v-if="!isHide">
		<view class="contentLay">
			<view class="parent">
				<view v-for="item in list">
					<view class="title">{{item.name}}</view>
					<scroll-view class="scroll-view_H" scroll-x="true">
						<view class="imageView" v-for="(value,index) in item.data" @click="see(index,item)">
							<image class="image" :src="value.url" mode="aspectFill" />
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const historyObject = uniCloud.importObject('history')
	export default {
		data() {
			return {
				list: [],
				isHide: true
			}
		},
		onLoad(e) {
			this.isHide=getApp().globalData.isTest
			historyObject.result(e.id).then(res => {
				console.log(res)
				res.map(item => {
					item.data = []
					item.list.map(value => {
						item.data.push({
							"url": value,
							"index": -1,
						})
					})
				})
				this.list = res
			})
		},
		onShareAppMessage() {
			console.log(getApp().globalData.share)
			return getApp().globalData.share
		},
		methods: {
			loadFinish(e) {
				console.log(e)
				e.index = 0
			},
			see(index, item) {
				console.log(item)
				getApp().globalData.detail = item
				uni.navigateTo({
					url: "/pages/index/detail?index=" + index
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #EAECF0;
	}

	.container {
		width: 750rpx;
		background-color: #EAECF0;

	}

	.parent {
		padding-left: 22rpx;
		padding-right: 22rpx;
	}

	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}

	.title {
		height: 46rpx;
		font-size: 31rpx;
		font-family: PingFangHK-Regular-Regular, PingFangHK-Regular;
		font-weight: 400;
		color: #191919;
		line-height: 46rpx;
		margin-bottom: 24rpx;
		margin-top: 32rpx;
		margin-left: 22rpx
	}

	.scroll-view_H {
		white-space: nowrap;
	}

	.imageView {
		width: 238rpx;
		height: 317rpx;
		display: inline-block;
		margin-left: 12rpx;
		margin-right: 12rpx;
	}

	.image {
		width: 238rpx;
		height: 317rpx;
		border-radius: 16rpx 16rpx 16rpx 16rpx;
	}

	.bottom {
		justify-content: space-between;
		margin-top: 46rpx;
		margin-left: 96rpx;
		margin-right: 96rpx;
		display: flex;
		position: fixed;
		z-index: 10;
	}

	.home {
		width: 262rpx;
		height: 112rpx;
		background: #FFFFFF;
		border-radius: 56rpx 56rpx 56rpx 56rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.home view {
		display: flex;
	}

	.home text {
		height: 38rpx;
		font-size: 32rpx;
		font-family: PingFang SC-Medium-Regular, PingFang SC-Medium;
		font-weight: 400;
		color: #080B13;
		line-height: 37rpx;
	}

	.bottom image {
		width: 35rpx;
		height: 38rpx;
		margin-right: 20rpx;
	}


	.shareLay {
		width: 348rpx;
		height: 112rpx;
		background: linear-gradient(309deg, #4A25E1 0%, #7B5AFF 93%, #7B5AFF 100%);
		border-radius: 56rpx 56rpx 56rpx 56rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 16rpx;
	}

	.shareLay view {
		display: flex;
	}

	.shareLay text {
		height: 38rpx;
		font-size: 32rpx;
		font-family: PingFang SC-Medium-Regular, PingFang SC-Medium;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 37rpx;

	}
</style>