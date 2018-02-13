import * as three from "three";
import * as gs from "../../gs-json";

const EPS: number = 1e-6;
/**
 * Utility functions for threejs.
 */

 // Matrices ======================================================================================================

export function multVectorMatrix(v: three.Vector3, m: three.Matrix4): three.Vector3 {
    const v2: three.Vector3 = v.clone();
    v2.applyMatrix4(m);
    return v2;
}

export function multXYZMatrix(xyz: gs.XYZ, m: three.Matrix4): gs.XYZ {
    const v2: three.Vector3 = new three.Vector3(...xyz);
    v2.applyMatrix4(m);
    return v2.toArray().slice(0,3) as gs.XYZ;
}

export function xformMatrix(o: three.Vector3, x: three.Vector3, y: three.Vector3, z: three.Vector3): three.Matrix4 {
    x.normalize();
    y.normalize();
    z.normalize();
    const m1: three.Matrix4 = new three.Matrix4();
    const o_neg: three.Vector3 = o.clone().negate();
    m1.setPosition(o_neg);
    const m2: three.Matrix4 = new three.Matrix4();
    m2.makeBasis(x, y, z);
    m2.getInverse(m2);
    const m3: three.Matrix4 = new three.Matrix4();
    m3.multiplyMatrices(m2, m1);
    return m3;
}

export function xformMatrixFromXYZs(o: gs.XYZ, axes: [gs.XYZ, gs.XYZ, gs.XYZ]): three.Matrix4 {
    return xformMatrix(new three.Vector3(...o),
        new three.Vector3(...axes[0]),new three.Vector3(...axes[1]),new three.Vector3(...axes[2]));
}

export function matrixInv(m: three.Matrix4): three.Matrix4 {
    const m2: three.Matrix4 = new three.Matrix4();
    return m2.getInverse(m);
}

//  Vectors =======================================================================================================

export function vectorsFromVertices(vertices: gs.IVertex[]): three.Vector3[] {
    return vertices.map((v) => new three.Vector3(...v.getPoint().getPosition()));
}

export function vectorsFromPoints(points: gs.IPoint[]): three.Vector3[] {
    return points.map((p) => new three.Vector3(...p.getPosition()));
}

export function subVectors(v1: three.Vector3, v2: three.Vector3, norm: boolean = false): three.Vector3 {
    const v3: three.Vector3 = new three.Vector3();
    v3.subVectors(v1, v2);
    if (norm) {v3.normalize();}
    return v3;
}

export function addVectors(v1: three.Vector3, v2: three.Vector3, norm: boolean = false): three.Vector3 {
    const v3: three.Vector3 = new three.Vector3();
    v3.addVectors(v1, v2);
    if (norm) {v3.normalize();}
    return v3;
}

export function crossVectors(v1: three.Vector3, v2: three.Vector3, norm: boolean = false): three.Vector3 {
    const v3: three.Vector3 = new three.Vector3();
    v3.crossVectors(v1, v2);
    if (norm) {v3.normalize();}
    return v3;
}

export function vectorFromPointsAtoB(a: gs.IPoint, b: gs.IPoint, norm: boolean = false): three.Vector3 {
    const v: three.Vector3 = subVectors(new three.Vector3(...b.getPosition()),
        new three.Vector3(...a.getPosition()));
    if (norm) {v.normalize();}
    return v;
}

export function vectorFromVerticesAtoB(a: gs.IVertex, b: gs.IVertex, norm: boolean = false): three.Vector3 {
    const v: three.Vector3 = subVectors(new three.Vector3(...b.getPoint().getPosition()),
        new three.Vector3(...a.getPoint().getPosition()));
    if (norm) {v.normalize();}
    return v;
}

//  XYZ ===========================================================================================================

export function subXYZs(xyz1: gs.XYZ, xyz2: gs.XYZ, norm: boolean = false): gs.XYZ {
    return subVectors(new three.Vector3(...xyz1), new three.Vector3(...xyz2), norm).toArray().slice(0,3) as gs.XYZ;
}

export function addXYZs(xyz1: gs.XYZ, xyz2: gs.XYZ, norm: boolean = false): gs.XYZ {
    return addVectors(new three.Vector3(...xyz1), new three.Vector3(...xyz2), norm).toArray().slice(0,3) as gs.XYZ;
}

export function crossXYZs(xyz1: gs.XYZ, xyz2: gs.XYZ, norm: boolean = false): gs.XYZ {
    return crossVectors(new three.Vector3(...xyz1), new three.Vector3(...xyz2), norm).toArray().slice(0,3) as gs.XYZ;
}

export function normalizeXYZ(xyz: gs.XYZ): gs.XYZ {
    return new three.Vector3(...xyz).normalize().toArray().slice(0,3) as gs.XYZ;
}

export function lengthXYZ(xyz: gs.XYZ): number {
    return new three.Vector3(...xyz).length();
}

export function setLengthXYZ(xyz: gs.XYZ, length: number): gs.XYZ {
    return new three.Vector3(...xyz).setLength(length).toArray() as gs.XYZ;
}

export function makeXYZOrthogonal(xyz1: gs.XYZ, xyz2: gs.XYZ, normalize: boolean): [gs.XYZ, gs.XYZ, gs.XYZ] {
    // create normalised vectors
    const vec_x: three.Vector3 = new three.Vector3(...xyz1);
    const len: number = vec_x.length();
    if (len < EPS) {return null;}
    vec_x.normalize();
    const vec2: three.Vector3 = new three.Vector3(...xyz2).normalize();
    // check if vec1 and vec2 are parallel
    const abs_dot: number = Math.abs(vec_x.dot(vec2));
    if ((1 - abs_dot) < EPS) {return null;}
    // make vec_z
    const vec_z: three.Vector3 = new three.Vector3();
    vec_z.crossVectors(vec_x, vec2);
    // make vec_y
    const vec_y: three.Vector3 = new three.Vector3();
    vec_y.crossVectors(vec_z, vec_x);
    // return
    if (normalize) {
        return [
            vec_x.toArray() as gs.XYZ,    // length 1
            vec_y.toArray() as gs.XYZ,    // length 1
            vec_z.toArray() as gs.XYZ,    // length 1
        ];
    } else {
        return [
            xyz1,                                         // length len
            vec_y.setLength(len).toArray() as gs.XYZ,     // length len
            vec_z.toArray() as gs.XYZ,                    // length 1
        ];
    }

}

//  Points ========================================================================================================

export function subPoints(p1: gs.IPoint, p2: gs.IPoint, norm: boolean = false): gs.XYZ  {
    return subVectors(new three.Vector3(...p1.getPosition()),
        new three.Vector3(...p2.getPosition()), norm).toArray().slice(0,3) as gs.XYZ;
}

export function addPoints(p1: gs.IPoint, p2: gs.IPoint, norm: boolean = false): gs.XYZ  {
    return addVectors(new three.Vector3(...p1.getPosition()),
        new three.Vector3(...p2.getPosition()), norm).toArray().slice(0,3) as gs.XYZ;
}

//  Vertices ======================================================================================================

export function subVertices(v1: gs.IVertex, v2: gs.IVertex, norm: boolean = false): gs.XYZ  {
    return subVectors(new three.Vector3(...v1.getPoint().getPosition()),
        new three.Vector3(...v2.getPoint().getPosition()), norm).toArray().slice(0,3) as gs.XYZ;
}

export function addVertices(v1: gs.IVertex, v2: gs.IVertex, norm: boolean = false): gs.XYZ  {
    return addVectors(new three.Vector3(...v1.getPoint().getPosition()),
        new three.Vector3(...v2.getPoint().getPosition()), norm).toArray().slice(0,3) as gs.XYZ;
}

