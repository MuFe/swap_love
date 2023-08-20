<template>
	<view class="content" v-if="!isHide">
		<view class="custom_top" :style="'padding-top:'+top_height+'px'">
			<image src="@/static/back.svg" @click="back" mode="heightFix">
				<text>支付</text>
		</view>
		<view class="tipView">
			<text class="tipTitle">支付</text>
			<text class="tipContent">为您生成的{{priceFirst.size}}张不同风格的照片要消耗云计算资源，请购买后享用</text>
		</view>
		<view class="mid">
			<view class="imageParaent">
				<image class="image" :src="first" />
			</view>
			<view class="imageMask"/>
			<image class="imageBg" src="@/static/pay_tip.svg" />
		</view>
		<view class="bottom" :style="'bottom:'+bottom+'px'">
			<view class="bottomInfoLay">
				<view class="bottomPrice">
					<text class="price">￥{{priceFirst.price}}</text>
					<text class="size">({{priceFirst.size}}张)</text>
				</view>
				<view class="originalLay">
					<view class="original">原价</view>
					<view class="originalView">
						<view>￥{{priceFirst.original}}</view>
						<image class="line" src="@/static/slash.svg" mode="widthFix" />
					</view>
				</view>
				<image class="preferentialImage" src="@/static/pay_tip_bg.svg" />
				<text class="preferentialText">
					限时特惠
				</text>
			</view>
			<view class="bottomLayView" @click="pay">
				<text>购买</text>
			</view>
		</view>

		<swap-pay ref="uniPay" @openId="getOpenId" @fail="onFail" @success="onSuccess" @create="onCreate"/>
	</view>
</template>

<script>
	const pageObject = uniCloud.importObject('pageV2', {
		customUI: true
	})
	export default {
		data() {
			return {
				priceFirst:{
					size:1,
					price:1,
					original:1,
				},
				bottom: 0,
				tmplIds:[],
				top_height: 0,
				isHide:true
			}
		},
		onShareAppMessage() {
			return getApp().globalData.share
		},
		onReady() {
			let that = this
			uni.getSystemInfo({
				success: function(res) {
					console.log(res)
					that.bottom = res.safeAreaInsets.bottom + that.rpxTopx(32)
				}
			});
		},
		onLoad(e) {
			this.isHide = getApp().globalData.isTest
			console.log(e)
			this.first = getApp().globalData.upload[0]
			pageObject.config(4, this.getAppId()).then(res => {
				this.priceFirst = res[0]
				this.tmplIds = res[1]
			})
			let that = this;
			uni.getSystemInfo({
				success(res) {
					console.log(res)
					that.top_height = res.statusBarHeight; //data中 声明 top_height:0 
				}
			});
		},
		methods: {
			getOpenId(e) {
				getApp().globalData.uid = e
				console.log(getApp().globalData.uid)
			},
			back() {
				uni.showModal({
					title: '确认返回？',
					content: '确认返回将中断正在进行的生成步骤，重新选择模板将继续生成',
					confirmText: "继续支付",
					cancelText: "重新选择",
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
							uni.navigateBack()
						}
					}
				});
			},
			onFail() {
				uni.showToast({
					icon: "fail",
					title: "支付失败，请重新支付后查看生成结果"
				})
			},
			onCreate(res) {
				console.log('create: ', res);
				// 如果只是想生成支付二维码，不需要组件自带的弹窗，则在这里可以获取到支付二维码 qr_code_image
			},
			// 监听事件 - 支付成功
			onSuccess(res) {
				console.log('success: ', res);
				if (res.user_order_success) {
					// 代表用户已付款，且你自己写的回调成功并正确执行了
					uni.redirectTo({
						url: "/pages/index/end",
					})
				} else {
					// 代表用户已付款，但你自己写的回调执行成功（通常是因为你的回调代码有问题）
				}
			},
			pay() {
				if(this.tmplIds.length>0){
					let that=this
					wx.requestSubscribeMessage({
					  tmplIds: this.tmplIds,
					  success (res) { 
						  that.goPay()
					  }
					})
				}else{
					this.goPay()
				}
				
			},
			goPay(){
				let total=this.priceFirst.total
				if (total > 0) {
					let order_no = new Date().getTime() + "";
					let out_trade_no = `${order_no}-1`;
					// 发起支付
					this.$refs.uniPay.createOrder({
						provider: "wxpay", // 支付供应商
						total_fee: total, // 支付金额，单位分 100 = 1元
						order_no: order_no, // 业务系统订单号（即你自己业务系统的订单表的订单号）
						out_trade_no: out_trade_no, // 插件支付单号
						description: "解锁", // 支付描述
						type: "notify", // 支付回调类型
					});
				} else {
					uni.redirectTo({
						url: "/pages/index/end",
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #EAECF0;
	}

	.custom_top {
		display: flex;
		height: 108rpx;
		align-items: center;
		background: white;

	}

	.custom_top image {
		margin-left: 34rpx;
		width: 18rpx;
		height: 34rpx;
		position: absolute;
	}

	.custom_top text {
		margin-left: auto;
		margin-right: auto;
		color: black;
	}

	.content {
		width: 750rpx;
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
		font-weight: 500;
		line-height: 87rpx;
	}

	.tipContent {
		width: 540rpx;

		font-size: 35rpx;
		font-family: Poppins-Medium, Poppins;

		color: #191919;
		line-height: 50rpx;
		margin-top: 15rpx;
		text-align: center;
	}

	.mid {
		width: 576rpx;
		height: 576rpx;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		position: relative;
		margin-top: 115rpx
	}

	.imageParaent {
		width: 294rpx;
		height: 317rpx;
		position: absolute;
		left: 142rpx;
		top: 130rpx;
		z-index: 1;
		opacity: 1;
		border: 4rpx solid #FFFFFF;
		border-radius: 38rpx;
		overflow: hidden;
	}

	.image {
		width: 294rpx;
		height: 317rpx;
		border-radius: 38rpx;
		filter: blur(25rpx);
	}
	.imageMask{
		width: 294rpx;
		height: 317rpx;
		position: absolute;
		left: 142rpx;
		top: 130rpx;
		z-index: 2;
		background: rgba(255, 255, 255,0.2);
	}
	.imageBg {
		width: 576rpx;
		height: 576rpx;
		position: absolute;
	}

	.bottom {
		position: absolute;
		display: flex;
		padding-left: 38rpx;
		width: 100%;
	}

	.bottomInfoLay {
		display: flex;
		flex-direction: column;
	}

	.bottomPrice {
		margin-top: 26rpx;
	}

	.preferentialImage {
		width: 114rpx;
		height: 34rpx;
		position: absolute;
		left: 100rpx
	}

	.preferentialText {
		width: 114rpx;
		position: absolute;
		font-size: 21rpx;
		font-family: ZillaSlab-Medium-Regular, ZillaSlab-Medium;
		font-weight: 400;
		line-height: 21rpx;
		left: 118rpx;
		top: 10rpx
	}

	.price {
		height: 50rpx;
		font-size: 46rpx;
		font-family: Poppins-Medium, Poppins;
		font-weight: 500;
		color: #191919;
		line-height: 50rpx;
	}

	.originalLay {
		display: flex;
		flex-direction: row;
		justify-content: center
	}

	.originalView {
		position: relative;
	}

	.originalView view {
		height: 35rpx;
		font-size: 23rpx;
		font-family: PingFangHK-Regular-Regular, PingFangHK-Regular;
		font-weight: 400;
		color: #191919;
		line-height: 35rpx;
		opacity: 0.6;
	}

	.original {
		height: 35rpx;
		font-size: 23rpx;
		font-family: PingFangHK-Regular-Regular, PingFangHK-Regular;
		font-weight: 400;
		color: #191919;
		line-height: 35rpx;
		opacity: 0.6;
	}

	.line {
		width: 61rpx;
		left: 0rpx;
		top: 10rpx;
		position: absolute;
	}

	.size {
		height: 35rpx;
		font-size: 23rpx;
		font-family: PingFangHK-Regular-Regular, PingFangHK-Regular;
		font-weight: 400;
		color: #191919;
		margin-left: 10rpx;
		line-height: 35rpx;
		opacity: 0.6;
	}

	.bottomLayView {
		justify-content: center;
		width: 425rpx;
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

	.bottomLayView text {
		height: 38rpx;
		font-size: 33rpx;
		font-family: PingFang SC-Regular-Regular, PingFang SC-Regular;
		font-weight: 400;
		color: #191919;
		line-height: 38rpx;
		-webkit-text-size-adjust: none;
	}
</style>