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

#### WEBGL绘制一个点

通过 WEBGL 作绘图的时候所有图形的绘制操作都需要着色器来实现

着色器定义：让开发者自己去边写一段程序，用来代替固定渲染管线，来处理图像的渲染。

着色器分类：

1. 定点着色器：用来描述顶点的特性，通过计算获取位置信息
    顶点：是指二维三维空间中的一个点，可以理解为一个个坐标

2. 片元着色器：进行逐片元处理程序，通过计算获取颜色信息
    片元：可以理解为一个个像素

着色器工作流程：
1.获取canvas元素

``` JAVASCRIPT
    const ctx = document.getElementById('canvas')
```

2.获取 webgl 绘图上下文

``` JAVASCRIPT
    const gl = ctx.getContext('webgl')
```

3.初始化顶点着色器源程序

``` JAVASCRIPT
    const VERTEX_SHADER_SOURCE = `
        // 必须要存在 main 函数 (入口函数)
        void main() {
            //  要绘制的点的坐标
            //  vec4(0.0, 0.0, 0.0, 1.0)代表的是 x, y, z, w(齐次坐标)
            //  齐次坐标可以理解成(x/w, y/w, z/w)
            gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
            //  点的大小
            gl_PointSize = 30.0;
        }
    `; // 顶点着色器
```

注意事项：这里 void main 里面的分号不能省略，否则程序会报错

4.初始化片元着色器源程序

``` JAVASCRIPT
    const FRAGMENT_SHADER_SOURCE = `
        // 必须要存在 main 函数 (入口函数)
        void main() {
            //  绘制的点的颜色
            //  vec4(1.0, 0.0, 0.0, 1.0)代表的是r,g,b,a
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `; // 片元着色器
```

注意事项：这里 void main 里面的分号不能省略，否则程序会报错

5.创建顶点着色器

``` JAVASCRIPT
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
```

6.创建片元着色器

``` JAVASCRIPT
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
```

7.关联着色器和着色器源码

``` JAVASCRIPT
    gl.shaderSource(vertexShader, VERTEX_SHADER_SOURCE)
    gl.shaderSource(fragmentShader, FRAGMENT_SHADER_SOURCE)
```

8.编译着色器

``` JAVASCRIPT
    gl.compileShader(vertexShader)
    gl.compileShader(fragmentShader)
```

9.创建 program

``` JAVASCRIPT
    const program = gl.createProgram()
```

10.关联着色器 和 program

``` JAVASCRIPT
    //  关联着色器
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)

    //  关联程序
    gl.linkProgram(program)
```

11.使用 program

``` JAVASCRIPT
    gl.useProgram(program)
```

12.绘图

``` JAVASCRIPT
    gl.drawArrays(gl.POINTS, 0, 1)
```

对创建 Shader 部分进行一个封装

``` JAVASCRIPT
    function initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE) {
        //  创建着色器
        const vertexShader = gl.createShader(gl.VERTEX_SHADER)
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

        gl.shaderSource(vertexShader, VERTEX_SHADER_SOURCE) // 指定顶点着色器的源码
        gl.shaderSource(fragmentShader, FRAGMENT_SHADER_SOURCE) // 指定片元着色器的源码

        //  编译着色器
        gl.compileShader(vertexShader)
        gl.compileShader(fragmentShader)

        //  创建一个程序对象
        const program = gl.createProgram();

        gl.attachShader(program, vertexShader)
        gl.attachShader(program, fragmentShader)

        //  关联程序
        gl.linkProgram(program)
        
        //  使用程序
        gl.useProgram(program)

        return program;
    }
```

#### 获取 attribute 变量

``` JAVASCRIPT
const aPosition = gl.getAttribLocation(program, 'aPosition')
```

注意事项：获取 attribute 变量需要在 initShader 函数之后，因为会用到 program 这个程序对象。

gl.getAttribLocation: 作用于 program 程序对象，参数有 name和 attribute
其中 name 为指定想要获取存储地址的 attribute 为变量的名称
返回变量的存储地址

``` JAVASCRIPT
gl.vertexAttrib4f(location,v1,v2,v3,v4)
```

vertextAttrib3f()同族函数介绍

``` JAVASCRIPT
gl.vertexAttrib1f(location, v0)
gl.vertexAttrib2f(location, v0, v1)
gl.vertexAttrib3f(location, v0, v1, v2)
gl.vertexAttrib4f(location, v0, v1, v2, v3)
```

gl.vertexAttrib4f(location,v1,v2,v3,v4) location:指定 attribute 变量的存储位置 v0,v1,v2,v3:传入的四个分量的值

