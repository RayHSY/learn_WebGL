export type TPoint = [number, number];
export type TVector = {
    x: number;
    y: number;
};
export type TLine = [TPoint, TPoint];

export type DotFunction = (v1: TVector, v2: TVector) => number;
export type CrossFunction = (v1: TVector, v2: TVector) => number;
export type LengthFunction = (v: TVector) => number;