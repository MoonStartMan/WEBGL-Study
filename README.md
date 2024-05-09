# WEBGL-Study

这是一个关于WEBGL学习的仓库，仓库内容如下

### 1.WEBGL简单应用

#### 最简单的绘制 WEBGL

``` JAVASCRIPT

const ctx = document.getElementById('canvas')
const gl = ctx.getContext('webgl')
gl.clearColor(1.0, 0.0, 0.0, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

```

上述代码的解释

gl.clearColor(): 指定清空<canvas>的颜色，接收四个参数(取值区间为0.0-1.0)

gl.clearColor(r, g, b, a) 
red 1.0, green 0.0, blue 0.0, alpha 0.0

gl.clear(): 清空 canvas 参数分为三项

+ gl.COLOR_BUFFER_BIT: 清空颜色缓存
+ gl.DEPTH_BUFFER_BIT: 清空深度缓冲区
+ gl.STENCIL_BUFFER_BIT: 清空模板缓冲区

注意事项：

gl.clear 需要和 gl.clearColor 提到的函数搭配使用

``` JAVASCRIPT
gl.clear(gl.COLOR_BUFFER_BIT) 和 gl.clearColor(0.0, 0.0, 0.0, 1.0)

gl.clear(gl.DEPTH_BUFFER_BIT) 和 gl.clearDepth(1.0)

gl.clear(gl.SEENCIL_BUFFER_BIT) 和 gl.clearStencil(0)

```