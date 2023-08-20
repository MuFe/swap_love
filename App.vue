<script>
	
	export default {
		onLaunch: function() {
			const time=uni.getStorageSync("time")
			if(time==''){
				this.globalData.isTest=true
			}else{
				this.globalData.isTest=new Date().getTime()<time
				if(!this.globalData.isTest){
					uni.reLaunch({
						url:"/pages/index/index"
					})
				}
			}
			console.log(this.globalData.isTest)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
