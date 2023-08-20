<template>
	<view class="content" v-if="!isHide">
		<view v-if="state==2">
			<view v-for="(item,index) in list" class="item" @click="clickItem(item)">
				<view class="itiemView">
					<view class="titleView">
						<text>{{item.time}}</text>
						<image src="@/static/arrow.svg" />
					</view>
					<scroll-view class="scroll-view" scroll-x="true">
						<view class="imageView">
							<image class="image" v-for="value in item.url" :src="value" mode="aspectFill"/>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<view v-if="state==1" class="emptyView">
			<image class="empty"src="@/static/empty.svg"/>
			<view class="emptyTip">你还没有生成过头像, 快去试试吧</view>
			<view class="emptyBtn" @click="goUpload">
				<text>一键生成</text>
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
				state:0,
				isHide:true,
			}
		},
		onLoad() {
			this.isHide=getApp().globalData.isTest
		},
		onShow() {
			historyObject.history(getApp().globalData.uid, this.getAppId()).then(res => {
				console.log(res)
				this.list = res
				this.list.map(value => {
					value.time = this.parseTime(value.time,'{y}-{m}-{d} {h}:{i}')
				})
				if(this.list.length>0) {
					this.state=2
				}else{
					this.state=1
				}
			})
		},
		onShareAppMessage() {
			console.log(getApp().globalData.share)
			return getApp().globalData.share
		},
		methods: {
			clickItem(item) {
				uni.navigateTo({
					url: "/pages/index/finish?id=" + item.job
				})
			},
			goUpload(){
				uni.redirectTo({
					url:"/pages/index/upload"
				})
			}
		}
	}
</script>

<style>
	page {
		background: #EAECF0;
	}

	.content {
		display: flex;
		flex-direction: column;
		padding-top: 30rpx;
	}

	.item {
		margin-right: auto;
		width: 673rpx;
		background: #FFFFFF;
		border-radius: 38rpx 38rpx 38rpx 38rpx;
		opacity: 1;
		margin-left: auto;
		margin-top: 15rpx;
		margin-bottom: 15rpx;

	}

	.itiemView {
		margin-left: 14rpx;
		margin-right: 14rpx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.titleView {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 30rpx;
		margin-top: 23rpx;
		margin-bottom: 20rpx;
		margin-right: 30rpx;
	}

	.titleView image {
		width: 31rpx;
		height: 31rpx;
	}

	.itiemView text {
		height: 35rpx;
		font-size: 23rpx;
		font-family: PingFangHK-Regular-Regular, PingFangHK-Regular;
		font-weight: 400;
		color: #191919;
		line-height: 35rpx;


	}

	.scroll-view {
		white-space: nowrap;
		margin-bottom: 15rpx
	}

	.imageView {
		
	}

	.image {
		width: 208rpx;
		height: 231rpx;
		border-radius: 38rpx;
		opacity: 1;
		margin-left: 6.5rpx;
		margin-right: 6.5rpx;
	}
	.emptyView{
		display: flex;
		    flex-direction: column
	}
	.empty{
		margin-top: 210rpx;
		margin-left: auto;
		margin-right: auto;
		width: 115rpx;
		height: 115rpx
	}
	.emptyTip{
		margin-top: 46rpx;
		font-size: 31rpx;
		font-family: PingFangHK-Regular-Regular, PingFangHK-Regular;
		font-weight: 400;
		color: #191919;
		line-height: 46rpx;
		    margin-left: auto;
		    margin-right: auto;
			opacity: 0.6;
	}
	.emptyBtn{
		width: 612rpx;
		height: 96rpx;
		background: #9CE02D;
		border-radius: 38rpx 38rpx 38rpx 38rpx;
		opacity: 1;
		border: 4rpx solid #000000;
		align-items: center;
		display: flex;
		justify-content: center;
		margin-top: 92rpx;
		margin-left: auto;
		    margin-right: auto
	}
	.emptyBtn text{
		height: 38rpx;
		font-size: 33rpx;
		font-family: PingFang SC-Regular-Regular, PingFang SC-Regular;
		font-weight: 400;
		color: #191919;
		line-height: 38rpx;
	}
</style>