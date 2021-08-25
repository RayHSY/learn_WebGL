// 判断线段A1B1与A2B2的关系
// 关系有： 1. 平行， 2. 垂直 3. 既不平行也不垂直

import { TVector, TLine, DotFunction, LengthFunction } from './type';

const getLength: LengthFunction = (vector) => {
    return Math.hypot(vector.x, vector.y);
}

const dot: DotFunction = (v1, v2) => {
    return v1.x * v2.x + v1.y * v2.y;
}

function getRelationship(L1: TLine, L2: TLine): string {
    const [ [x11, y11], [x12, y12] ] = L1;
    const [ [x21, y21], [x22, y22] ] = L2;
    const A1B1: TVector = { x: x12 - x11, y: y12 - y11 };
    const A2B2: TVector = { x: x22 - x21, y: y22 - y21 };
    const A1A2: TVector = { x: x11 - x21, y: y11 - y21 };

    // 判断是否垂直
    if (getLength(A1B1) * getLength(A2B2) === 0) return '无法判断';
    else if (dot(A1B1, A2B2) === 0) return '垂直';
    else if (dot(A1B1, A2B2) === getLength(A1B1) * getLength(A2B2) && dot(A1A2, A2B2) !== getLength(A1A2) * getLength(A2B2)) return '平行';
    return '既不平行也不垂直'
}

console.log(getRelationship([[0, 0], [1, 0]], [[0, 1], [1, 1]]));