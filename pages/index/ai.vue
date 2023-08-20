<template>
	<view class="popContent" v-if="!isHide">
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isHide: true
			}
		},
		onLoad() {
			this.isHide=getApp().globalData.isTest
		},
		onShareAppMessage() {
			console.log(getApp().globalData.share)
			return getApp().globalData.share
		},
		methods: {

		}
	}
</script>

<style>
	page {
		background: #EAECF0;
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
</style>