<template>
	<view class="container" v-if="!isHide">
		<view class="top">
			<image class="head" :src="head" />
			<view class="info">
				<view class="name">
					{{name}}
				</view>
			</view>
		</view>
		<view class="content">
			<view v-if="haveNoFinish" class="contentItem">
				<hx-lottie :options="options" ref="lottie" />
				<text>正在生成中...</text>
			</view>

			<uni-badge :is-dot="true" :text="value" absolute="rightTop" size="small" class="finish" :offset="offset" :class="haveNoFinish?'haveNoFinish':''">
				<view class="finish" @click="goHistory">
					<view v-if="finish!=''" class="finishView">
						<image class="finishBg" src="@/static/user_finish_bg.svg" />
						<image class="finishImage" :src="finish" mode="aspectFill" />
						
					</view>
					<view v-if="finish==''" class="finishView">
						<image  class="finishImage" src="@/static/user_finish_de.svg" />
					</view>
					<text>已生成的头像</text>
				</view>
			</uni-badge>
		</view>
		<view class="item" @click="goAi">
			<image class="itemIcon" src="@/static/user_ai.svg" mode="widthFix"/>
			<text>生图攻略</text>
			<image class="itemArrow" src="@/static/arrow.svg" mode="heightFix" />
		</view>
		<view class="item">
			<image class="itemIcon" src="@/static/user_service.svg" />
			<text>联系客服</text>
			<image class="itemArrow" src="@/static/arrow.svg" mode="heightFix" />
		</view>
	</view>
</template>

<script>
	const historyObject = uniCloud.importObject('history')
	export default {
		data() {
			return {
				head: '',
				name: '',
				value:'',
				options: {
					data: require("@/static/lottie.json"),
					width: 115,
					height: 115,
				},
				finish: '',
				haveNoFinish:false,
				offset: [0, 0],
				isHide: true,
			}
		},
		onLoad() {
			this.isHide=getApp().globalData.isTest
			this.offset = [this.rpxTopx(30), 0]
		},
		onShow() {
			historyObject.user(getApp().globalData.uid, this.getAppId()).then(res => {
				this.finish = res[1]
				if(res[0]!=''){
					this.haveNoFinish=true
				}else{
					this.haveNoFinish=false
				}
				this.value=res[2]
				this.name =res[3].name
				this.head =res[3].image
			})
			
		},
		onShareAppMessage() {
			console.log(getApp().globalData.share)
			return getApp().globalData.share
		},
		methods: {
			goAi() {
				uni.navigateTo({
					url: "/pages/index/ai"
				})
			},
			goHistory() {
				uni.navigateTo({
					url: "/pages/index/history"
				})
			}
		}
	}
</script>

<style>
	page {
		background: #EAECF0;
	}



	.top {
		display: flex;
		flex-direction: row;
		margin-top: 64rpx;
		margin-left: 32rpx;
	}

	.head {
		width: 128rpx;
		height: 128rpx;
		border-radius: 64rpx;

	}

	.info {
		margin-left: 48rpx;
		display: flex;
		align-items: center;
	}

	.name {
		height: 42rpx;
		font-size: 35rpx;
		font-family: PingFang-SC-Regular-Regular, PingFang-SC-Regular;
		font-weight: 400;
		color: #000000;
		line-height: 40rpx;
	}

	.content {
		padding-left: 34rpx;
		padding-right: 34rpx;
		display: flex;
		margin-top: 57rpx;
		margin-bottom: 16rpx;
	}

	.contentItem {
		width: 323rpx;
		height: 265rpx;
		background: #FFFFFF;
		box-shadow: inset 2rpx -4rpx 0rpx 0rpx rgba(111, 126, 164, 0.15), 0rpx 2rpx 6rpx 0rpx rgba(159, 165, 182, 0.1), inset 1rpx -2rpx 0rpx 0rpx rgba(39, 62, 108, 0.1);
		border-radius: 38rpx 38rpx 38rpx 38rpx;
		display: flex;
		flex-direction: column;

	}

	.finishImage {
		width: 115rpx;
		height: 115rpx;
		border-radius: 15rpx 15rpx 15rpx 15rpx;
		opacity: 1;
		position: absolute;
	}


	.finish {
		width: 323rpx;
		height: 265rpx;
		background: #FFFFFF;
		box-shadow: inset 2rpx -4rpx 0rpx 0rpx rgba(111, 126, 164, 0.15), 0rpx 2rpx 6rpx 0rpx rgba(159, 165, 182, 0.1), inset 1rpx -2rpx 0rpx 0rpx rgba(39, 62, 108, 0.1);
		border-radius: 38rpx 38rpx 38rpx 38rpx;
		display: flex;
		flex-direction: column;
	}
	
	.haveNoFinish{
		margin-left: auto;
	}
	
	.finishView {
		position: relative;
		margin-left: 30rpx;
		margin-top: 30rpx;
		height: 115rpx;
	}

	.finishBg {
		position: absolute;
		left: 56rpx;
		width:103rpx;
		height: 91rpx;
		top:12rpx;
	}

	.contentItem view {
		width: 115rpx;
		height: 115rpx;
		margin-left: 30rpx;
		margin-top: 30rpx;
	}

	.content text {
		margin-left: 30rpx;
		margin-top: 34rpx;
		height: 46rpx;
		font-size: 31rpx;
		font-family: PingFangHK-Regular-Regular, PingFangHK-Regular;
		font-weight: 400;
		color: #191919;
		line-height: 46rpx;
	}


	.item {
		width: 673rpx;
		height: 115rpx;
		background: #FFFFFF;
		border-radius: 38rpx 38rpx 38rpx 38rpx;
		opacity: 1;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		margin-top: 30rpx;
	}

	.item text {
		height: 46rpx;
		font-size: 31rpx;
		font-family: PingFangHK-Regular-Regular, PingFangHK-Regular;
		font-weight: 400;
		color: #191919;
		line-height: 46rpx;
		margin-left: 31rpx;
	}

	.itemArrow {
		margin-left: auto;
		margin-right: 38rpx;
		height: 31rpx;
	}

	.itemIcon {
		width: 62rpx;
		height: 62rpx;
		margin-left: 40rpx;
	}
</style>