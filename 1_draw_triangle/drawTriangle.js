// 1. 创建WebGL上下文

const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');

/**
 * 2. 创建WebGL程序
 * 这里的WebGL程序是一个WebGLProgram对象，它是给GPU最终运行着色器的程序
*/

// 顶点着色器 -- 负责处理图形的顶点信息
const vertex = `
    attribute vec2 position;
    varying vec3 color;

    void main() {
        gl_PointSize = 1.0;
        color = vec3(0.5 + position * 0.5, 0.0);
        gl_Position = vec4(position * 0.5, 1.0, 1.0);
    }
`;

// 片元着色器 -- 负责处理图形的像素信息
const fragment = `
    precision mediump float;
    varying vec3 color;

    void main() {
        gl_FragColor = vec4(color, 1.0);
    }
`;

//  创建shader对象
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertex);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragment);
gl.compileShader(fragmentShader);

// 创建WebGLProgram对象
const program = gl.createProgram();
// 将两个shader关联到这个WebGL程序上
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
// 将这个WebGLProgram对象链接到WebGL上下文对象上
gl.linkProgram(program);

// 启用这个WebGLProgram对象
gl.useProgram(program);

// 定义三角形的三个顶点
const points = new Float32Array([
    -1, -1,
    0, 1,
    1, -1,
]);

// 3. 将定义好的数据写入WebGL的缓冲区

// 创建一个缓存对象
const bufferId = gl.createBuffer();
// 绑定为当前操作对象
gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
// 将当前的数据写入缓存对象
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);


// 4. 将缓冲区数据读取到GPU

// 获取顶点着色器中的position变量的地址
const vPosition = gl.getAttribLocation(program, 'position');
// 给变量设置长度和类型
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
// 激活这个变量
gl.enableVertexAttribArray(vPosition);

// 5. 执行着色器完成绘制

gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, points.length / 2);