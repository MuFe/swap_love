<h3 align="center" style="margin:30px 0 30px;font-weight: bold;font-size:32px;">hx-lottie 使用说明</h3>

## 预览
[![L8dXn0.gif](https://s1.ax1x.com/2022/04/15/L8dXn0.gif)](https://imgtu.com/i/L8dXn0)

[![L8wmND.gif](https://s1.ax1x.com/2022/04/15/L8wmND.gif)](https://imgtu.com/i/L8wmND)

## 使用说明

* 引入使用

    ``` html
      <!-- options 动画参数 -->
      <hx-lottie :options="options" ref="lottie">  
    
    ```

* 参数说明


    | 属性值      | 参数说明                      |
    |----------|---------------------------|
    | loop     | 是否循环播放动画（Boolean 默认 true） |
    | autoplay | 是否自动播放（Boolean 默认 true）   |
    | data     | 动画数据（Object）              |
    | path     | 动画网络路径 （String）           |

* 方法说名 `组件内方法统一使用 call(funName, args) 调用
`
    1. 使用示例 
    
        ```js     
            // 播放动画
            this.$refs.lottie.call('play')
            // 暂停动画
            this.$refs.lottie.call('pause')
        ```
    
    1. 说明  `方法与lottie-web 方法保持一致`  [详情可参考](http://airbnb.io/lottie/#/web?id=usage)
        
        | 方法名      | 说明                  |
        |----------|---------------------|
        | play     | 播放动画                |
        | pause    | 暂停动画                |
        | stop     | 停止动画                |
        | setSpeed | 设置动画速度，args = speed |
        | …        | ...                 |
