export class Vector2D extends Array {
    constructor(x = 1, y = 0) {
        super(x, y); // [x, y]
    }

    set x(v) {
        this[0] = v;
    }

    set y(v) {
        this[1] = v;
    }

    get x() {
        return this[0];
    }

    get y() {
        return this[1];
    }

    get length() {
        return Math.hypot(this.x, this.y);
    }

    get dir() {
        return Math.atan2(this.y, this.x);
    }

    copy() {
        return new Vector2D(this.x, this.y);
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    scale(a) {
        this.x *= a;
        this.y *= a;
        return this;
    }

    // 叉乘积
    cross(v) {
        return this.x * v.y - v.x *this.y;
    }

    // 点乘积
    dot(v) {
        return this.x * v.x + v.y * this.y;
    }

    // 归一化
    normalize() {
        return this.scale(1 / this.length);                    
    }

    // x = r*cos(A + B) = r(cosAcosB - sinAsinB) = x0cosB - y0sinB
    // y = r*sin(A + B) = r(sinAcosB + sinBCosA) = y0cosB + x0sinB
    rotate(rad) {
        const c = Math.cos(rad);
        const s = Math.sin(rad);

        const [x, y] = this;

        this.x = x * c - y * s;
        this.y = y * c + x * s;

        return this;
    }
}