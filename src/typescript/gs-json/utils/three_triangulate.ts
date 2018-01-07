import * as gs from "./gs-json";
import * as three from "three";
import * as earcut from "./extras/Earcut";
import * as threex from "./three_utils";

function makeVertices2D(vertices: gs.IVertex[]): three.Vector3[] {
    const points: three.Vector3[] = threex.makeVectorsFromVertices(vertices);
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
            vx =  threex.subVectors(points[i], o).normalize();
            if (vx.lengthSq() !== 0) {got_vx = true;}
        } else {
            vz = threex.crossVectors(vx, threex.subVectors(points[i],o).normalize()).normalize();
            if (vz.lengthSq() !== 0) {break;}
        }
        if (i === vertices.length - 1) {throw new Error("Trinagulation found bad face.");}
    }
    const vy: three.Vector3 =  threex.crossVectors(vz, vx);
    const m: three.Matrix4 = threex.xformMatrix(o, vx, vy, vz);
    const points_2d: three.Vector3[] = points.map((v) => threex.multVectorMatrix(v,m));
    // console.log(o, vx, vy, vz);
    // console.log(points_2d);
    return points_2d;
}

 export function triangulate2D(vertices: gs.IVertex[], verts_indexes: number[]): number[] {
    const points_2d: three.Vector3[] = makeVertices2D(vertices);
    const flat_vert_xyzs: number[] = gs.Arr.flatten(points_2d.map((v) => [v.x, v.y]));
    const tri_indexes: number[] = earcut.Earcut.triangulate(flat_vert_xyzs);
    return tri_indexes.map((v) => verts_indexes[v]);
}
