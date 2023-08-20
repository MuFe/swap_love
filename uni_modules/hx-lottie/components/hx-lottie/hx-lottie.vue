<template>
  <view class="lottie" :options="options" :change:options="Lottie.optionsChange" :fun="fun" :change:fun="Lottie.funChange">
    <canvas :class="canvasId" :canvas-id="canvasId" type="2d" ref="lottie" :style="'width:'+options.width+'rpx;height:'+options.height+'rpx;'"></canvas>
  </view>
</template>
<script>
  import uuid from './uuid.js'
  // #ifdef MP-WEIXIN
  import { loadAnimation, setup } from './lottie-miniprogram.min.js'
  // #endif
  
  export default {
    props:{
      options:{
        type: Object,
        default:()=>{}
      }
    },
    options: {
      styleIsolation: "isolated", 
      addGlobalClass: true, 
      virtualHost: true, 
	  width:0,
	  height:0,
    },
    data(){
      return {
        canvasId: "canvasId",
        fun:{
          name: null,
          args: null
        },
      }
    },
    // #ifdef MP-WEIXIN
    watch: {
      // 微信小程序方法触发
      fun:{
        deep: true,
        handler(){
          let {name, args} = this.fun
          if(this?.lottie&&name) this.lottie[name](args)
        }
      },
      // 监听 options 变化
      options:{
        deep: true,
        handler(){
          // 停止上一次动画 destroy 报错,固先用stop
          this.lottie.stop()
          // 加载新动画数据
          this.loadData()
        }
      },
    },
    // #endif
    mounted(){
      // 检测配置参数,如果开启自动播放则标记
      this.fun.name = this.options?.autoplay??true?'play':null
      // #ifdef MP-WEIXIN
        this.$nextTick(function(){
          this.init()
        })
      // #endif
    },
    methods:{
      // lottie 相关方法
      call(name=null,args=null){
        if(name&&this.fun.name!=name) this.fun.name = name
        if(args&&this.fun.args!=args) this.fun.args = args
      },
      // #ifdef MP-WEIXIN
      init(){
		setTimeout(() => {
			const query = uni.createSelectorQuery().in(this);
			query.select(`.${this.canvasId}`).node(res => {
				console.log(res)
				this.canvas = res.node
				this.canvas.width = this.rpxTopx(this.options.width)
				this.canvas.height = this.rpxTopx(this.options.height)
				setup(this.canvas)
				this.loadData()
				
			}).exec()
		}, 500);
      },
      loadData(){
        this.lottie = loadAnimation({
        	//循环播放
        	loop: this.options?.autoplay??true, 
        	//自动播放
        	autoplay: this.options?.autoplay??true,
        	// 动画json的本地数据
        	animationData: this.options?.data, 
        	// 动画json的网络路径
          path: this.options?.path, 
        	rendererSettings: {
        		context: this.canvas.getContext('2d')
        	},
        })
      }
      // #endif
    }
  }
</script>
<script module="Lottie" lang="renderjs">
  // #ifdef APP-PLUS || H5
    import { loadAnimation } from './lottie-web.min.js'
    
    export default {
      data(){
        return {
          lottie: null,
        }
      },
      mounted() {
        this.init()
      },
      methods:{
        // 参数变化监听
        optionsChange(newValue, oldValue, ownerInstance, instance){
          // 销毁之前动画
          this.lottie?.destroy()
          this.init()
        },
        // 监听触发函数
        funChange(newValue, oldValue, ownerInstance, instance){
          let {name, args} = newValue
          this.lottie[name](args)
        },
        // lottie 动画初始化
        init(){
          this.lottie = loadAnimation({
            // 包含动画的dom元素
          	container: this.$refs.lottie.$el, 
            //渲染格式
          	renderer: this.options?.renderer??'canvas', 
            //循环播放
          	loop: this.options?.autoplay??true, 
            //自动播放
          	autoplay: this.options?.autoplay??true,
            // 动画json的本地数据
          	animationData: this.options?.data, 
            // 动画json的网络路径
          	path: this.options?.path
          });
        },
      }
    }
  // #endif
</script>
<style>
 
</style>
