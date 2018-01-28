import * as gs from "./_export";
import * as three from "three";
import * as earcut from "./extras/Earcut";

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

export function makeXYZOrthogonal(xyz1: gs.XYZ, xyz2: gs.XYZ, normalize:boolean): [gs.XYZ, gs.XYZ, gs.XYZ] {
    // create normalised vecors
    const vec1: three.Vector3 = new three.Vector3(...xyz1).normalize();
    const vec2: three.Vector3 = new three.Vector3(...xyz2).normalize();
    const vec_up: three.Vector3 = new three.Vector3();
    // set the x vector
    if (normalize) {
        xyz1 = vec1.toArray() as gs.XYZ;
    }
    // check if vec2 is already ortho
    vec_up.crossVectors(vec1, vec2).normalize();
    const abs_dot: number = Math.abs(vec1.dot(vec2));
    if ((1 - abs_dot) < EPS) {return null;}
    if (abs_dot < EPS) {
        return [
            xyz1,
            vec2.toArray() as gs.XYZ,
            vec_up.toArray() as gs.XYZ,
        ];
    }
    // make vec2 ortho
    const vec_ortho: three.Vector3 = new three.Vector3();
    vec_ortho.crossVectors(vec1, vec_up);
    return [
        xyz1,
        vec_ortho.toArray() as gs.XYZ,
        vec_up.toArray() as gs.XYZ,
    ];
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

//  3D to 2D ======================================================================================================

/**
 * Function to transform a set of vertices in 3d space onto the xy plane. This function assumes that the vertices
 * are co-planar. Returns a set of three Vectors that represent points on the xy plane.
 */
export function makeVertices2D(vertices: gs.IVertex[]): three.Vector3[] {
    const points: three.Vector3[] = vectorsFromVertices(vertices);
    const o: three.Vector3 = new three.Vector3();
    for (const v of points) {
        o.add(v);
    }
    o.divideScalar(points.length);
    let vx: three.Vector3;
    let vz: three.Vector3;
    let got_vx = false;
    for (let i=0;i<vertices.length;i++) {
        if (!got_vx) {
            vx =  subVectors(points[i], o).normalize();
            if (vx.lengthSq() !== 0) {got_vx = true;}
        } else {
            vz = crossVectors(vx, subVectors(points[i],o).normalize()).normalize();
            if (vz.lengthSq() !== 0) {break;}
        }
        if (i === vertices.length - 1) {throw new Error("Trinagulation found bad face.");}
    }
    const vy: three.Vector3 =  crossVectors(vz, vx);
    const m: three.Matrix4 = xformMatrix(o, vx, vy, vz);
    const points_2d: three.Vector3[] = points.map((v) => multVectorMatrix(v,m));
    // console.log(o, vx, vy, vz);
    // console.log(points_2d);
    return points_2d;
}

//  Triangulation =================================================================================================

export function triangulate2D(vertices: gs.IVertex[], verts_indexes: number[]): number[] {
    const points_2d: three.Vector3[] = makeVertices2D(vertices);
    const flat_vert_xyzs: number[] = gs.Arr.flatten(points_2d.map((v) => [v.x, v.y]));
    const tri_indexes: number[] = earcut.Earcut.triangulate(flat_vert_xyzs);
    return tri_indexes.map((v) => verts_indexes[v]);
}
