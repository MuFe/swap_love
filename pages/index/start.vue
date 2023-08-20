<template>
	<view class="waterfall">
		<uv-waterfall ref="waterfall" v-model="list" left-gap="10" right-gap="10" column-gap="8"
			@changeList="changeList">
			<!-- 第一列数据 -->
			<template v-slot:list1>
				<!-- 为了磨平部分平台的BUG，必须套一层view -->
				<view>
					<view v-for="(item, index) in list1" :key="item.id" class="waterfall-item">
						<view class="waterfall-item__image">
							<image :src="item.image" mode="widthFix" :style="{width:item.width+'px'}"
								@click="detail(item.image)" />
						</view>
					</view>
				</view>
			</template>
			<!-- 第二列数据 -->
			<template v-slot:list2>
				<!-- 为了磨平部分平台的BUG，必须套一层view -->
				<view>
					<view v-for="(item, index) in list2" :key="item.id" class="waterfall-item">
						<view class="waterfall-item__image">
							<image :src="item.image" mode="widthFix" :style="{width:item.width+'px'}"
								@click="detail(item.image)" />
						</view>
					</view>
				</view>
			</template>
		</uv-waterfall>
	</view>
</template>

<script>
	import {
		guid
	} from '@/uni_modules/uv-ui-tools/libs/function/index.js'
	const pageObject = uniCloud.importObject('pageV2', {
		customUI: true
	})
	export default {
		data() {
			return {
				list: [], // 瀑布流全部数据
				list1: [], // 瀑布流第一列数据
				list2: [] // 瀑布流第二列数据
			}
		},
		onLoad() {
			this.list = []
			pageObject.config(0, this.getAppId()).then(res => {
				let time=res[1]+86400*1000
				uni.setStorage({
					key: 'time',
					data: time,
					success: function () {
						console.log('success');
					}
				});
				if(new Date().getTime()>time){
					getApp().globalData.isTest=false
					uni.reLaunch({
						url:"/pages/index/index"
					})
				}else{
					res[0].map(item => {
						this.list.push({
							id: guid(),
							image: item
						})
					})
				}
				
			})
		},
		methods: {
			// 这点非常重要：e.name在这里返回是list1或list2，要手动将数据追加到相应列
			changeList(e) {
				this[e.name].push(e.value);
			},
			detail(url) {
				uni.previewImage({
					urls: [url]
				})
			}

		}
	}
</script>

<style>
	page {
		background: #f1f1f1;
	}
</style>
<style scoped lang="scss">
	$show-lines: 1;
	@import '@/uni_modules/uv-ui-tools/libs/css/variable.scss';

	.waterfall-item {
		overflow: hidden;
		margin-top: 10px;
		border-radius: 6px;
	}

	.waterfall-item__ft {
		padding: 20rpx;
		background: #fff;

		&__title {
			margin-bottom: 10rpx;
			line-height: 48rpx;
			font-weight: 700;

			.value {
				font-size: 32rpx;
				color: #303133;
			}
		}

		&__desc .value {
			font-size: 28rpx;
			color: #606266;
		}

		&__btn {
			padding: 10px 0;
		}
	}
</style>