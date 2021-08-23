import { Vector2D } from "/lib/vector2d.js";
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// 将坐标原点从左上角移动到左下角
ctx.translate(0, canvas.height);
// 让y轴翻转为向上
ctx.scale(1, -1);
ctx.lineCap = 'round'; // 线段末端以圆形结束

/**
 * @param  {} context Canvas2D上下文
 * @param  {} v0 起始向量
 * @param  {} length 当前树枝的长度
 * @param  {} thickness 当前树枝的粗细
 * @param  {} dir 当前树枝的方向，用与x轴的夹角表示，单位是弧度
 * @param  {} bias 随机偏向因子，用来让树枝的朝向有一定的随机性
 */
function drawBranch(context, v0, length, thickness, dir, bias = 1) {
    const v = new Vector2D(1, 0).rotate(dir).scale(length);
    const v1 = v0.copy().add(v);

    context.lineWidth = thickness;
    context.beginPath();
    context.moveTo(...v0);
    context.lineTo(...v1);
    context.stroke();

    if (thickness > 2) {
        const left = Math.PI / 4 + 0.5 * (dir + 0.2) + bias * (Math.random() - 0.5);
        drawBranch(context, v1, length * 0.9, thickness * 0.8, left, bias * 0.9);
        const right = Math.PI / 4 + 0.5 * (dir - 0.2) + bias * (Math.random() - 0.5);
        drawBranch(context, v1, length * 0.9, thickness * 0.8, right, bias * 0.9);
    }

    if (thickness < 3 && Math.random() < 0.3) {
        context.save();
        context.strokeStyle = '#c72c35';
        const th = Math.random() * 6 + 3;
        context.lineWidth = th;
        context.beginPath();
        context.moveTo(...v1);
        context.lineTo(v1.x, v1.y - 2);
        context.stroke();
        context.restore();
    }
}

const v0 = new Vector2D(256, 0);
drawBranch(ctx, v0, 50, 10, Math.PI / 2, 3);