// 已知线段[(x0, y0)、(x1, y1)]，以及一个点 (x2, y2)，怎么求点到线段的距离？

import { TVector, TLine, TPoint, CrossFunction, LengthFunction } from './type';

 const cross: CrossFunction = (v1, v2) => {
     return v1.x * v2.y - v2.x * v1.y;
 }

 const length: LengthFunction = (v) => {
     return Math.hypot(v.x, v.y);
 }

function getDistance(point: TPoint, line: TLine) {
    const [pointA, pointB] = line;
    const v1: TVector = { x: pointA[0] - pointB[0], y: pointA[1] - pointB[1] };
    const v2: TVector = { x: point[0] - pointA[0], y: point[1] - pointA[1] };

    return cross(v1, v2) / length(v1);
}

let point: TPoint = [2, 4];
let line: TLine = [[2, 4], [3, 5]];

console.log(getDistance(point, line));