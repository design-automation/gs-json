"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three = require("three");
const gs = require("../../_export");
const earcut = require("./earcut");
const EPS = 1e-6;
/**
 * Utility functions for threejs.
 */
// Matrices ======================================================================================================
function multVectorMatrix(v, m) {
    const v2 = v.clone();
    v2.applyMatrix4(m);
    return v2;
}
exports.multVectorMatrix = multVectorMatrix;
function multXYZMatrix(xyz, m) {
    const v2 = new three.Vector3(...xyz);
    v2.applyMatrix4(m);
    return v2.toArray().slice(0, 3);
}
exports.multXYZMatrix = multXYZMatrix;
function xformMatrix(o, x, y, z) {
    x.normalize();
    y.normalize();
    z.normalize();
    const m1 = new three.Matrix4();
    const o_neg = o.clone().negate();
    m1.setPosition(o_neg);
    const m2 = new three.Matrix4();
    m2.makeBasis(x, y, z);
    m2.getInverse(m2);
    const m3 = new three.Matrix4();
    m3.multiplyMatrices(m2, m1);
    return m3;
}
exports.xformMatrix = xformMatrix;
function xformMatrixFromXYZs(o, axes) {
    return xformMatrix(new three.Vector3(...o), new three.Vector3(...axes[0]), new three.Vector3(...axes[1]), new three.Vector3(...axes[2]));
}
exports.xformMatrixFromXYZs = xformMatrixFromXYZs;
function matrixInv(m) {
    const m2 = new three.Matrix4();
    return m2.getInverse(m);
}
exports.matrixInv = matrixInv;
//  Vectors =======================================================================================================
function vectorsFromVertices(vertices) {
    return vertices.map((v) => new three.Vector3(...v.getPoint().getPosition()));
}
exports.vectorsFromVertices = vectorsFromVertices;
function vectorsFromPoints(points) {
    return points.map((p) => new three.Vector3(...p.getPosition()));
}
exports.vectorsFromPoints = vectorsFromPoints;
function subVectors(v1, v2, norm = false) {
    const v3 = new three.Vector3();
    v3.subVectors(v1, v2);
    if (norm) {
        v3.normalize();
    }
    return v3;
}
exports.subVectors = subVectors;
function addVectors(v1, v2, norm = false) {
    const v3 = new three.Vector3();
    v3.addVectors(v1, v2);
    if (norm) {
        v3.normalize();
    }
    return v3;
}
exports.addVectors = addVectors;
function crossVectors(v1, v2, norm = false) {
    const v3 = new three.Vector3();
    v3.crossVectors(v1, v2);
    if (norm) {
        v3.normalize();
    }
    return v3;
}
exports.crossVectors = crossVectors;
function vectorFromPointsAtoB(a, b, norm = false) {
    const v = subVectors(new three.Vector3(...b.getPosition()), new three.Vector3(...a.getPosition()));
    if (norm) {
        v.normalize();
    }
    return v;
}
exports.vectorFromPointsAtoB = vectorFromPointsAtoB;
function vectorFromVerticesAtoB(a, b, norm = false) {
    const v = subVectors(new three.Vector3(...b.getPoint().getPosition()), new three.Vector3(...a.getPoint().getPosition()));
    if (norm) {
        v.normalize();
    }
    return v;
}
exports.vectorFromVerticesAtoB = vectorFromVerticesAtoB;
//  XYZ ===========================================================================================================
function subXYZs(xyz1, xyz2, norm = false) {
    return subVectors(new three.Vector3(...xyz1), new three.Vector3(...xyz2), norm).toArray().slice(0, 3);
}
exports.subXYZs = subXYZs;
function addXYZs(xyz1, xyz2, norm = false) {
    return addVectors(new three.Vector3(...xyz1), new three.Vector3(...xyz2), norm).toArray().slice(0, 3);
}
exports.addXYZs = addXYZs;
function crossXYZs(xyz1, xyz2, norm = false) {
    return crossVectors(new three.Vector3(...xyz1), new three.Vector3(...xyz2), norm).toArray().slice(0, 3);
}
exports.crossXYZs = crossXYZs;
function normalizeXYZ(xyz) {
    return new three.Vector3(...xyz).normalize().toArray().slice(0, 3);
}
exports.normalizeXYZ = normalizeXYZ;
function lengthXYZ(xyz) {
    return new three.Vector3(...xyz).length();
}
exports.lengthXYZ = lengthXYZ;
function setLengthXYZ(xyz, length) {
    return new three.Vector3(...xyz).setLength(length).toArray();
}
exports.setLengthXYZ = setLengthXYZ;
function makeXYZOrthogonal(xyz1, xyz2, normalize) {
    // create normalised vectors
    const vec_x = new three.Vector3(...xyz1);
    const len = vec_x.length();
    if (len < EPS) {
        return null;
    }
    vec_x.normalize();
    const vec2 = new three.Vector3(...xyz2).normalize();
    // check if vec1 and vec2 are parallel
    const abs_dot = Math.abs(vec_x.dot(vec2));
    if ((1 - abs_dot) < EPS) {
        return null;
    }
    // make vec_z
    const vec_z = new three.Vector3();
    vec_z.crossVectors(vec_x, vec2);
    // make vec_y
    const vec_y = new three.Vector3();
    vec_y.crossVectors(vec_z, vec_x);
    // return
    if (normalize) {
        return [
            vec_x.toArray(),
            vec_y.toArray(),
            vec_z.toArray(),
        ];
    }
    else {
        return [
            xyz1,
            vec_y.setLength(len).toArray(),
            vec_z.toArray(),
        ];
    }
}
exports.makeXYZOrthogonal = makeXYZOrthogonal;
//  Points ========================================================================================================
function subPoints(p1, p2, norm = false) {
    return subVectors(new three.Vector3(...p1.getPosition()), new three.Vector3(...p2.getPosition()), norm).toArray().slice(0, 3);
}
exports.subPoints = subPoints;
function addPoints(p1, p2, norm = false) {
    return addVectors(new three.Vector3(...p1.getPosition()), new three.Vector3(...p2.getPosition()), norm).toArray().slice(0, 3);
}
exports.addPoints = addPoints;
//  Vertices ======================================================================================================
function subVertices(v1, v2, norm = false) {
    return subVectors(new three.Vector3(...v1.getPoint().getPosition()), new three.Vector3(...v2.getPoint().getPosition()), norm).toArray().slice(0, 3);
}
exports.subVertices = subVertices;
function addVertices(v1, v2, norm = false) {
    return addVectors(new three.Vector3(...v1.getPoint().getPosition()), new three.Vector3(...v2.getPoint().getPosition()), norm).toArray().slice(0, 3);
}
exports.addVertices = addVertices;
//  3D to 2D ======================================================================================================
/**
 * Function to transform a set of vertices in 3d space onto the xy plane. This function assumes that the vertices
 * are co-planar. Returns a set of three Vectors that represent points on the xy plane.
 */
function makeVertices2D(vertices) {
    const points = vectorsFromVertices(vertices);
    const o = new three.Vector3();
    for (const v of points) {
        o.add(v);
    }
    o.divideScalar(points.length);
    let vx;
    let vz;
    let got_vx = false;
    for (let i = 0; i < vertices.length; i++) {
        if (!got_vx) {
            vx = subVectors(points[i], o).normalize();
            if (vx.lengthSq() !== 0) {
                got_vx = true;
            }
        }
        else {
            vz = crossVectors(vx, subVectors(points[i], o).normalize()).normalize();
            if (vz.lengthSq() !== 0) {
                break;
            }
        }
        if (i === vertices.length - 1) {
            throw new Error("Trinagulation found bad face.");
        }
    }
    const vy = crossVectors(vz, vx);
    const m = xformMatrix(o, vx, vy, vz);
    const points_2d = points.map((v) => multVectorMatrix(v, m));
    // console.log(o, vx, vy, vz);
    // console.log(points_2d);
    return points_2d;
}
exports.makeVertices2D = makeVertices2D;
//  Triangulation =================================================================================================
function triangulate2D(vertices, verts_indexes) {
    const points_2d = makeVertices2D(vertices);
    const flat_vert_xyzs = gs.Arr.flatten(points_2d.map((v) => [v.x, v.y]));
    const tri_indexes = earcut.Earcut.triangulate(flat_vert_xyzs);
    return tri_indexes.map((v) => verts_indexes[v]);
}
exports.triangulate2D = triangulate2D;
//# sourceMappingURL=threex.js.map