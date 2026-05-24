# WEBGL-Study

<p align="center">
  <img src="https://img.shields.io/badge/WebGL-990000?style=flat-square&logo=webgl&logoColor=white" alt="WebGL">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/OpenGL-5586A4?style=flat-square&logo=opengl&logoColor=white" alt="OpenGL">
  <img src="https://img.shields.io/badge/GLSL-5586A4?style=flat-square&logo=opengl&logoColor=white" alt="GLSL">
</p>

<p align="center">
  <b>WebGL 学习教程与示例代码库</b>
</p>

<p align="center">
  <a href="#项目简介">项目简介</a> •
  <a href="#功能特性">功能特性</a> •
  <a href="#技术栈">技术栈</a> •
  <a href="#项目结构">项目结构</a> •
  <a href="#快速开始">快速开始</a> •
  <a href="#详细教程">详细教程</a>
</p>

## 项目简介

WEBGL-Study 是一个系统性的 WebGL 学习教程仓库，从基础概念到高级应用，帮助开发者掌握 WebGL 图形编程技术。本仓库包含完整的示例代码、详细的注释说明和渐进式的学习路径，适合初学者入门和进阶开发者参考。

## 功能特性

- 完整的WebGL基础知识体系
- 丰富的示例代码和演示
- 详细的代码注释和说明
- 渐进式学习路径设计
- 涵盖2D/3D图形绘制
- 动画和交互实现
- 纹理映射技术
- 着色器编程详解

## 技术栈

| 技术 | 说明 | 版本 |
|------|------|------|
| WebGL | 图形渲染API | 1.0/2.0 |
| HTML5 Canvas | 绘图上下文 | - |
| JavaScript | 编程语言 | ES6+ |
| GLSL | 着色器语言 | ES 3.0 |
| OpenGL ES | 嵌入式OpenGL | 3.0 |

## 项目结构

```
WEBGL-Study/
├── README.md                          # 项目说明文档
├── assets/                            # 静态资源文件
│   └── images/                        # 图片资源
├── lib/                               # 工具库
│   └── webgl-utils.js                 # WebGL工具函数
├── WEBGL入门/                         # WebGL基础教程
│   ├── 01-绘制一个点.html              # 第一个WebGL程序
│   ├── 02-动态绘制点.html              # 交互式绘图
│   ├── 03-使用attribute变量.html       # 顶点属性
│   ├── 04-使用uniform变量.html         # 统一变量
│   └── ...
├── 多图形绘制和动画/                   # 图形绘制进阶
│   ├── 01-缓冲区对象.html              # 顶点缓冲区
│   ├── 02-多缓冲区.html                # 多属性数据
│   ├── 03-多种图形绘制.html            # 图形类型
│   ├── 04-图形平移.html                # 平移变换
│   ├── 05-图形旋转.html                # 旋转变换
│   ├── 06-图形缩放.html                # 缩放变换
│   └── 07-矩阵变换.html                # 矩阵运算
└── WEBGL颜色和纹理/                    # 颜色和纹理
    ├── 01-彩色三角形.html              # 顶点颜色
    ├── 02-纹理映射.html                # 图片纹理
    └── 03-多纹理.html                  # 多重纹理
```

## 快速开始

### 环境要求

- 现代浏览器（Chrome、Firefox、Safari、Edge）
- 支持 WebGL 的显卡
- 本地服务器（推荐 Live Server）

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/MoonStartMan/WEBGL-Study.git

# 进入项目目录
cd WEBGL-Study

# 使用 Live Server 启动（VS Code插件）
# 或使用 Python 简单HTTP服务器
python -m http.server 8000

# 打开浏览器访问
http://localhost:8000
```

### 第一个WebGL程序

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>第一个WebGL程序</title>
</head>
<body>
    <canvas id="canvas" width="400" height="400"></canvas>
    <script>
        // 获取canvas元素
        const canvas = document.getElementById('canvas');
        
        // 获取WebGL绘图上下文
        const gl = canvas.getContext('webgl');
        
        // 顶点着色器源码
        const VERTEX_SHADER_SOURCE = `
            void main() {
                gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
                gl_PointSize = 10.0;
            }
        `;
        
        // 片元着色器源码
        const FRAGMENT_SHADER_SOURCE = `
            void main() {
                gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            }
        `;
        
        // 初始化着色器程序
        const program = initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
        
        // 绘制一个点
        gl.drawArrays(gl.POINTS, 0, 1);
    </script>
</body>
</html>
```

## 详细教程

### 1. WebGL基础概念

#### 1.1 什么是WebGL
WebGL（Web Graphics Library）是一种在浏览器中渲染2D和3D图形的JavaScript API，无需安装任何插件。

#### 1.2 WebGL渲染管线
1. **顶点处理**：处理顶点坐标
2. **图元装配**：将顶点组装成图形
3. **光栅化**：将图形转换为片元
4. **片元处理**：计算每个像素的颜色
5. **帧缓冲**：输出到屏幕

#### 1.3 着色器（Shader）
着色器是用GLSL编写的运行在GPU上的小程序：

- **顶点着色器（Vertex Shader）**：处理顶点位置
- **片元着色器（Fragment Shader）**：处理像素颜色

### 2. 核心API详解

#### 2.1 获取WebGL上下文
```javascript
const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
```

#### 2.2 创建着色器
```javascript
// 创建顶点着色器
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);

// 创建片元着色器
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);
```

#### 2.3 创建程序对象
```javascript
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);
```

#### 2.4 缓冲区操作
```javascript
// 创建缓冲区
const buffer = gl.createBuffer();

// 绑定缓冲区
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

// 写入数据
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

// 配置属性指针
gl.vertexAttribPointer(location, size, type, normalized, stride, offset);
gl.enableVertexAttribArray(location);
```

### 3. 图形绘制类型

| 类型 | 说明 | 示例 |
|------|------|------|
| `gl.POINTS` | 绘制点 | 一系列独立的点 |
| `gl.LINES` | 绘制线段 | 两两成对的线段 |
| `gl.LINE_LOOP` | 闭合线 | 首尾相连的闭合线 |
| `gl.LINE_STRIP` | 线条 | 连续但不闭合的线 |
| `gl.TRIANGLES` | 三角形 | 独立的三角形 |
| `gl.TRIANGLE_STRIP` | 三角带 | 条带状的三角形 |
| `gl.TRIANGLE_FAN` | 三角扇 | 扇形排列的三角形 |

### 4. 变换矩阵

#### 4.1 平移矩阵
```javascript
function getTranslateMatrix(x = 0, y = 0, z = 0) {
    return new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
          x,   y,   z, 1.0,
    ]);
}
```

#### 4.2 缩放矩阵
```javascript
function getScaleMatrix(x = 1, y = 1, z = 1) {
    return new Float32Array([
          x, 0.0, 0.0, 0.0,
        0.0,   y, 0.0, 0.0,
        0.0, 0.0,   z, 0.0,
        0.0, 0.0, 0.0,   1,
    ]);
}
```

#### 4.3 旋转矩阵（绕Z轴）
```javascript
function getRotateMatrix(deg) {
    return new Float32Array([
         Math.cos(deg),  Math.sin(deg), 0.0, 0.0,
        -Math.sin(deg),  Math.cos(deg), 0.0, 0.0,
        0.0,             0.0,           1.0, 0.0,
        0.0,             0.0,           0.0, 1.0,
    ]);
}
```

### 5. 纹理映射

```javascript
// 创建纹理对象
const texture = gl.createTexture();

// Y轴翻转
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

// 激活纹理单元
gl.activeTexture(gl.TEXTURE0);

// 绑定纹理
gl.bindTexture(gl.TEXTURE_2D, texture);

// 配置纹理参数
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

// 加载图片
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
```

### 6. GLSL语言基础

#### 6.1 数据类型
```glsl
// 标量
int a;      // 整数
float b;    // 浮点数
bool c;     // 布尔值

// 矢量
vec2 v2;    // 二维矢量
vec3 v3;    // 三维矢量
vec4 v4;    // 四维矢量

// 矩阵
mat2 m2;    // 2x2矩阵
mat3 m3;    // 3x3矩阵
mat4 m4;    // 4x4矩阵
```

#### 6.2 存储限定符
```glsl
attribute vec4 aPosition;   // 顶点属性（仅顶点着色器）
uniform mat4 uMatrix;       // 统一变量（顶点和片元着色器）
varying vec4 vColor;        // 易变变量（顶点传递到片元）
const float PI = 3.14159;   // 常量
```

#### 6.3 精度限定符
```glsl
// 顶点着色器默认高精度
precision highp float;

// 片元着色器需要显式指定
precision mediump float;
// 或 lowp float;
```

## 学习路径

```
1. WebGL入门
   ├── 绘制第一个点
   ├── 理解着色器
   ├── 使用attribute变量
   ├── 使用uniform变量
   └── 鼠标交互

2. 多图形绘制和动画
   ├── 缓冲区对象
   ├── 绘制多种图形
   ├── 图形变换（平移/旋转/缩放）
   └── 矩阵运算

3. 颜色和纹理
   ├── 顶点颜色
   ├── 纹理映射
   └── 多重纹理
```

## 常见问题

### Q: WebGL不工作怎么办？
A: 检查浏览器是否支持WebGL，访问 [get.webgl.org](https://get.webgl.org) 测试。

### Q: 着色器编译失败？
A: 使用 `gl.getShaderInfoLog(shader)` 查看编译错误信息。

### Q: 程序链接失败？
A: 使用 `gl.getProgramInfoLog(program)` 查看链接错误信息。

### Q: 黑屏无显示？
A: 检查：
1. 顶点坐标是否在裁剪空间内（-1到1）
2. 着色器是否正确编译链接
3. 缓冲区数据是否正确绑定

## 推荐资源

- [WebGL官方规范](https://www.khronos.org/webgl/)
- [WebGL Fundamentals](https://webglfundamentals.org/)
- [MDN WebGL教程](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API/Tutorial)
- 《WebGL编程指南》

## 贡献指南

欢迎提交Issue和Pull Request！

### 提交规范
- 代码示例需包含完整HTML文件
- 添加详细的注释说明
- 遵循现有代码风格
- 更新README相关章节

## 许可证

本项目采用 [MIT License](LICENSE) 开源许可证。

## 作者

- **MoonStartMan**
- GitHub: [https://github.com/MoonStartMan](https://github.com/MoonStartMan)

---

<p align="center">
  如果本项目对您有帮助，请给个 Star ⭐
</p>
