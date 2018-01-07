import * as gs from "./gs-json";
import * as three from "three";

/**
 * Utility function for threejs.
 */
export function multVectorMatrix(v: three.Vector3, m: three.Matrix4): three.Vector3 {
    const v2: three.Vector3 = v.clone();
    v2.applyMatrix4(m);
    return v2;
}

export function makeVectorsFromVertices(vertices: gs.IVertex[]): three.Vector3[] {
    const vectors: three.Vector3[] = [];
    for (const vertex of vertices) {
        const xyz: number[] = vertex.getPoint().getPosition();
        vectors.push(new three.Vector3(xyz[0], xyz[1], xyz[2]));
    }
    return vectors;
}

export function subVectors(v1: three.Vector3, v2: three.Vector3): three.Vector3 {
    const v3: three.Vector3 = new three.Vector3();
    return v3.subVectors(v1, v2);
}

export function addVectors(v1: three.Vector3, v2: three.Vector3): three.Vector3 {
    const v3: three.Vector3 = new three.Vector3();
    return v3.addVectors(v1, v2);
}

export function crossVectors(v1: three.Vector3, v2: three.Vector3): three.Vector3 {
    const v3: three.Vector3 = new three.Vector3();
    return v3.crossVectors(v1, v2);
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
