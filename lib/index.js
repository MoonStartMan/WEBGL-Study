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

//  平移矩阵
function getTranslateMatrix(x = 0, y = 0, z = 0) {
    return new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        x,   y,   z,   1,
    ])
}

//  缩放矩阵
function getScaleMatrix(x = 1, y = 1, z = 1) {
    return new Float32Array([
        x  , 0.0, 0.0, 0.0,
        0.0, y  , 0.0, 0.0,
        0.0, 0.0, z  , 0.0,
        0.0, 0.0, 0.0,   1,
    ])
}

//  绕z轴旋转的旋转矩阵
function getRotateMatrix(deg) {
    return new Float32Array([
         Math.cos(deg),  Math.sin(deg), 0.0, 0.0,
        -Math.sin(deg), -Math.cos(deg), 0.0, 0.0,
        0.0,             0.0,           0.0, 0.0,
        0.0,             0.0,           0.0, 1,
    ])
}

//  矩阵复合函数
function mixMatrix(A, B) {
    if (A.length < 16 || B.length < 16) {
        return null;
    }
    const result = new Float32Array(16);
    for (let i = 0; i < 4; i++) {
        result[i] = A[i] * B[0] + A[i + 4] * B[1] + A[i + 8] * B[2] + A[i + 12] * B[3]
        result[i + 4] = A[i] * B[4] + A[i + 4] * B[5] + A[i + 8] * B[6] + A[i + 12] * B[7]
        result[i + 8] = A[i] * B[8] + A[i + 4] * B[9] + A[i + 8] * B[10] + A[i + 12] * B[11]
        result[i + 12] = A[i] * B[12] + A[i + 4] * B[13] + A[i + 8] * B[14] + A[i + 12] * B[15]
    }
    return result;
}