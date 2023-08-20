<template>
	<view class="container" v-if="!isHide">
		<view class="contentLay">
			<view class="tip">
				<view class="tipTitle">
					选择{{max}}种风格
				</view>
				<view class="tipContent">
					(每个风格将为你生成{{count}}张照片)
				</view>
			</view>

			<view class="contentView">
				<uni-grid :column="3" :showBorder="false" class="nav-right-item" :highlight="false" :square="false">
					<block v-for="(item,index) in selectData" :key="index">
						<uni-grid-item class="gridItem">
							<view class="nav-image-lay">
								<view class="imageBg" :class="item.show?'imageView':''">
									<image class="nav-image" :class="item.show?'nav-imageSelect':''" :src="item.cover"
										mode="aspectFill" @click="select(item)" />
								</view>
								<view class="nameView">
									{{item.name}}
								</view>
							</view>
						</uni-grid-item>
					</block>
				</uni-grid>
			</view>
			<view class="bottomLay">
				<view class="bottomView" :class="nowSelect==max ? '' : 'stateIng'" @click="start">
					<text class="text_6">生成</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const confiObject = uniCloud.importObject('pageV2')
	export default {
		data() {
			return {
				itemSelect: [],
				height: 0,
				nowSelect: 0,
				max: 0,
				count: 0,
				selectData: [],
				isHide: true
			};
		},
		onLoad(e) {
			this.isHide=getApp().globalData.isTest
			confiObject.config(2,this.getAppId()).then(res => {
				console.log(res)
				let temp = []
				if (e.sex == 1) {
					temp = res[0]
				} else {
					temp = res[1]
				}
				this.max = res[2]
				this.count = res[3]
				temp.map(item => {
					item.show = false
					this.selectData.push(item)
				})
			})
		},
		onShareAppMessage() {
			console.log(getApp().globalData.share)
			return getApp().globalData.share
		},
		methods: {
			start() {
				let selectList = []
				this.selectData.map(item => {
					if (item.show) {
						selectList.push(item.id)
					}
				})
				if (selectList.length == 0) {
					return
				} else if (selectList.length != this.max) {
					uni.showToast({
						title: "请选择" + this.max + "种风格"
					})
					return
				}

			
				getApp().globalData.data = selectList
				uni.navigateTo({
					url: "/pages/index/pay"
				})
			},
			select: function(item, index) {
				if (!item.show) {
					let count = 0
					this.selectData.map(item => {
						if (item.show) {
							count++
						}
					})
					if (count >= this.max) {
						uni.showToast({
							icon: "fail",
							title: "最多只能选" + this.max + "种风格"
						})
						return
					}
					this.nowSelect++
				} else {
					this.nowSelect--
				}
				item.show = !item.show
			}
		}
	}
</script>

<style>
	.container {
		width: 750rpx;
		background: #EAECF0;

	}


	.contentLay {
		padding-bottom: 250rpx;
	}

	.tip {
		display: flex;
		flex-direction: row;
		padding-top: 46rpx;
		margin-left: 46rpx;
		align-items: center
	}

	.tipTitle {
		eight: 50rpx;
		font-size: 35rpx;
		font-family: Poppins-Medium, Poppins;
		font-weight: 500;
		color: #191919;
		line-height: 50rpx;
	}

	.tipContent {
		font-size: 23rpx;
		font-family: PingFangHK-Regular-Regular, PingFangHK-Regular;
		font-weight: 400;
		color: #191919;
		line-height: 35rpx;
		margin-left: 15rpx;
	}


	.contentView {
		display: flex;
		flex-direction: row;
	}

	.nav {
		display: flex;
		width: 100%;
	}

	.nav-right-item {
		width: 696rpx;
		margin-left: 26rpx;
	}

	.nav-image-lay {
		padding-left: 8rpx;
		padding-right: 8rpx;
		padding-top: 23rpx;
		padding-bottom: 23rpx;
	}

	.nav-image {
		width: 208rpx;
		height: 231rpx;
		border-radius: 38rpx;
		display: flex;
		border: 2rpx solid transparent;
	}

	.imageBg {
		border-radius: 38rpx;
		width: 220rpx;
		height: 243rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		
	}

	.imageView {
		background: #9CE02D;
	}

	.nav-imageSelect {
		border: 2rpx solid rgb(255, 255, 255, 0.7);
	}

	.nameView {
		height: 46rpx;
		font-size: 31rpx;
		font-family: PingFangHK-Regular-Regular, PingFangHK-Regular;
		font-weight: 400;
		color: #191919;
		line-height: 46rpx;
		margin-top: 19rpx;
		margin-left: auto;
		margin-right: auto;
		text-align: center;
	}



	.bottomLay {
		position: fixed;
		bottom: 0px;
		left: 0px;
		width: 750rpx;
		height: 208rpx;
		background: #ffffff;
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		opacity: 1;
		z-index: 2
	}


	.bottomLay image {
		width: 35rpx;
		height: 36rpx;
	}

	.bottomView {
		width: 635rpx;
		height: 96rpx;
		background: #9CE02D;
		border-radius: 38rpx 38rpx 38rpx 38rpx;
		margin-top: 15rpx;
		border: 4rpx solid #000000;
		margin-left: auto;
		margin-right: auto;

		justify-content: center;
		display: flex;
		align-items: center;
	}

	.bottomView text {
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
</style>