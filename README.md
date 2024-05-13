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

#### 通过鼠标控制

1.添加点击事件
2.获取点击坐标
3.转换为 canvas 坐标
4.转换为 webgl 坐标
5.绘图

#### 修改点的颜色

使用 uniform 变量

添加 uniorm 变量，设置到颜色上

获取 uniform 变量存储地址

``` JAVASCRIPT
const uColor = gl.getUniformLocation(program, 'uColor')
```

program: 包含顶点和片元着色器的程序对象
name: uniform 变量的名称

给 uniform 变量赋值

``` JAVASCRIPT
gl.uniform4f(uColor, 1.0, 0.0, 0.0, 1.0)
```

location: 指定 uniform 的存储地址
v0,v1,v2,v3:第 1，2,3,4 分量的值。

uniform 使用的时候必须要设置精度

设置精度：

``` JAVASCRIPT
precision mediump float 
```

高精度: highp, 低精度: lowp

使用 uniform 流程

1.获取 canvas 元素
2.获取 webgl 绘图上下文
3.初始化顶点着色器源程序
4.初始化片元着色器源程序
5.创建顶点着色器
6.创建片元着色器
7.关联着色器和着色器源码
8.编译着色器
9.创建 program
10.关联着色器和program
11.使用program
12.获取uniform变量
13.给uniform变量赋值
14.绘图

### 多图形绘制和动画

#### 缓冲区对象

缓冲区对象是 WEBGL 系统中的一块内存区域，可以一次性地向缓冲区对象中填充大量的顶点数据，然后将这些数据保存在其中，供顶点着色器使用。

类型化数组: Float32Array

在 webgl 中，需要处理大量的相同类型数据，所以引入类型化数组，这样程序就可以预知到数组中的数据类型，提高性能。

``` JAVASCRIPT
const points = new Float32Array([
    -0.5, -0.5,
    0.5, -0.5,
    0.0, 0.5
])
```

类型化数组有：Int8Array: 8位整型，UInt8Array:8位无符号整型，Int16Array:16位整型，UInt16Array:16 位无符号整型，Int32Array:32位整型，UInt32Array:32位无符号整型，Float32Array:单精度32位浮点型，Float64Array:双精度64位浮点型。

创建缓冲区对象

``` JAVASCRIPT
const buffer = gl.createBuffer();
```

``` JAVASCRIPT
gl.bindBuffer(target, buffer)
//    buffer: 已经创建好的缓冲区对象
//    target: 可以是如下两种 -> 
//    gl.ARRAY_BUFFER:表示缓冲区存储的是顶点的数据。
//    gl.ELEMENT_ARRAY_BUFFER:表示缓冲区存储的是顶点的索引值。
```

``` JAVASCRIPT
gl.bufferData(target, data, type)
//    target: 类型同 gl.bindBuffer 中的 target
//    data: 写入缓冲区的顶点数据，如程序中的 points
//    type: 表示如何使用缓冲区对象中的数据，分为以下几类
//    gl.STATIC_DRAW: 写入一次，多次绘制
//    gl.STREAM_DRAW: 写入一次，绘制若干次
//    gl.DYNAMIC_DRAW: 写入多次，绘制多次
```

``` JAVASCRIPT
gl.vertextAttribPointer(location, size, type, normalized, stride, offset)
//    location: attribute变量的存储位置
//    size: 指定每个顶点所使用数据的个数
//    type: 指定数据格式 gl.FLOAT: 浮点型、gl.UNSIGNED_BYTE:无符号字节、gl.SHORT:短整型、gl.UNSIGNED_SHORT:无符号短整型、gl.INT:整型、gl.UNSIGNED_INT:无符号整型
//    normalized: 表示是否将数据归一化到[0,1][-1,1]这个区间
//    stride: 两个相邻顶点之间的字节数
//    offset: 数据偏移量
```

``` JAVASCRIPT
gl.enableVertexAttribArray(location)
//    location: attribute 变量的存储地址
//    gl.disableVertexAttribArray(aPosition);使用此方法禁用

```

缓冲区使用流程

获取 canvas 元素 - 初始化程序对象
创建顶点数据
创建缓冲区对象
绑定缓冲区对象
将数据写入缓冲区对象
将缓冲区对象分配给一个 attribute 变量
开启 attribute 变量
绘图

#### 多缓冲区和数据偏移

```JAVASCRIPT
const ctx = document.getElementById('canvas')
const gl = ctx.getContext('webgl')
/// 着色器
/// 创建着色器源码
const VERTEX_SHADER_SOURCE = `
    attribute vec4 aPosition;
    attribute float aPointSize;
    void main() {
        gl_Position = aPosition;
        gl_PointSize = aPointSize;
    }
`; // 顶点着色器
const FRAGMENT_SHADER_SOURCE = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`; // 片元着色器
const program = initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE)
const aPosition = gl.getAttribLocation(program, 'aPosition');
const aPointSize = gl.getAttribLocation(program, 'aPointSize');
const points = new Float32Array([
    -0.5, -0.5, 10.0,
    0.5, -0.5, 20.0,
    0.0, 0.5, 30.0
])
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
const BYTES = points.BYTES_PER_ELEMENT;
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, BYTES * 3, 0);
gl.enableVertexAttribArray(aPosition);
gl.vertexAttribPointer(aPointSize, 1, gl.FLOAT, false, BYTES * 3, BYTES * 2);
gl.enableVertexAttribArray(aPointSize);
gl.drawArrays(gl.POINTS, 0, 3);
```

#### 多种图形绘制

| 值 | 作用 | 说明 |
| :-: | :- | :- |
| gl.POINTS | 点 | 一列系点 |
| gl.LINES | 线段 | 一系列单独的线段，如果顶点是奇数，最后一个会被忽略 |
| gl.LINE_LOOP | 闭合线 | 一系列连接的线段，结束时，会闭合终点和起点 |
| gl.LINE_STRIP | 线条 | 一系列连接的线段，不会闭合终点和起点 |
| gl.TRIANGLES | 三角形 | 一系列单独的三角形 |
| gl.TRIANGLE_STRIP | 三角形 | 一系列条带状的三角形 |
| gl.TRIANGLE_FAN | 三角形 | 飘带状三角形 |

#### 图形平移 - 着色器

``` JAVASCRIPT
const ctx = document.getElementById('canvas')
const gl = ctx.getContext('webgl')
const VERTEX_SHADER_SOURCE = `
    attribute vec4 aPosition;
    attribute float aTranslate;
    void main() {
        gl_Position = vec4(aPosition.x + aTranslate, aPosition.y, aPosition.z, 1.0);
        gl_PointSize = 10.0;
    }
`;
const FRAGMENT_SHADER_SOURCE = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;
const program = initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE)
const aPosition = gl.getAttribLocation(program, 'aPosition')
const aTranslate = gl.getAttribLocation(program, 'aTranslate')
const points = new Float32Array([
    -0.5, -0.5,
    0.5, -0.5,
    0.0, 0.5
])
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aPosition);
let x = -1;
setInterval(() => {
    x += 0.01;
    if (x > 1) {
        x = -1;
    }
    gl.vertexAttrib1f(aTranslate, x);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}, 60)
```

#### 图形缩放-着色器

``` JAVASCRIPT
const ctx = document.getElementById('canvas')
const gl = ctx.getContext('webgl')
const VERTEX_SHADER_SOURCE = `
    attribute vec4 aPosition;
    attribute float aScale;
    void main() {
        gl_Position = vec4(aPosition.x, aPosition.y * aScale , aPosition.z, 1.0);
        gl_PointSize = 10.0;
    }
`;
const FRAGMENT_SHADER_SOURCE = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;
const program = initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE)
const aPosition = gl.getAttribLocation(program, 'aPosition')
const aScale = gl.getAttribLocation(program, 'aScale')
const points = new Float32Array([
    -0.5, -0.5,
    0.5, -0.5,
    0.0, 0.5
])
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aPosition);
let x = 1;
setInterval(() => {
    x += 0.01;
    if (x > 2) {
        x = 1;
    }
    gl.vertexAttrib1f(aScale, x);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}, 60)
```

#### 图形旋转-着色器

``` JAVASCRIPT
const ctx = document.getElementById('canvas')
const gl = ctx.getContext('webgl')
const VERTEX_SHADER_SOURCE = `
    attribute vec4 aPosition;
    attribute float deg;
    void main() {
        gl_Position.x = aPosition.x * cos(deg) - aPosition.y * sin(deg);
        gl_Position.y = aPosition.x * sin(deg) + aPosition.y * cos(deg);
        gl_Position.z = aPosition.z;
        gl_Position.w = aPosition.w;
    }
`;
const FRAGMENT_SHADER_SOURCE = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;
const program = initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE)
const aPosition = gl.getAttribLocation(program, 'aPosition')
const deg = gl.getAttribLocation(program, 'deg')
const points = new Float32Array([
    -0.5, -0.5,
    0.5, -0.5,
    0.0, 0.5
])
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aPosition);
let x = 1;
function animation() {
    x += -0.01;
    gl.vertexAttrib1f(deg, x);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    requestAnimationFrame(animation)
}
animation();
```

#### 图形平移-平移矩阵

gl.uniformMatrix4fv(location, transpose, array)

location: 指定 uniform 变量的存储位置
transpose: 在 webgl 中恒位 false
array: 矩阵数组

#### 图形缩放-缩放矩阵

``` JAVASCRIPT
const ctx = document.getElementById('canvas')
const gl = ctx.getContext('webgl')
/// 着色器
/// 创建着色器源码
const VERTEX_SHADER_SOURCE = `
    attribute vec4 aPosition;
    uniform mat4 mat;
    void main() {
        gl_Position = mat * aPosition;
        gl_PointSize = 10.0;
    }
`; // 顶点着色器
const FRAGMENT_SHADER_SOURCE = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`; // 片元着色器
const program = initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE)
const aPosition = gl.getAttribLocation(program, 'aPosition')
const mat = gl.getUniformLocation(program, 'mat')
function getScaleMatrix(x = 1, y = 1, z = 1) {
    return new Float32Array([
        x  , 0.0, 0.0, 0.0,
        0.0, y  , 0.0, 0.0,
        0.0, 0.0, z  , 0.0,
        0.0, 0.0, 0.0,   1,
    ])
}
const points = new Float32Array([
    -0.5, -0.5,
    0.5, -0.5,
    0.0, 0.5
])
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aPosition);
let x = 0.1;
function animation() {
    x += 0.01;
    if (x > 1.5) {
        x = 0.1;
    }
    const matrix = getScaleMatrix(x, x);
    gl.uniformMatrix4fv(mat, false, matrix);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    requestAnimationFrame(animation)
}
animation()
```

#### 图形旋转-旋转矩阵

``` JAVASCRIPT
//  绕z轴旋转的旋转矩阵
function getRotateMatrix(deg) {
    return new Float32Array([
         Math.cos(deg),  Math.sin(deg), 0.0, 0.0,
        -Math.sin(deg), -Math.cos(deg), 0.0, 0.0,
        0.0,             0.0,           0.0, 0.0,
        0.0,             0.0,           0.0, 1,
    ])
}
```

#### 图形复合变换-矩阵组合

