import * as three from "three";
import * as gs from "../../_export";
/**
 * Utility functions for threejs.
 */
export declare function multVectorMatrix(v: three.Vector3, m: three.Matrix4): three.Vector3;
export declare function multXYZMatrix(xyz: gs.XYZ, m: three.Matrix4): gs.XYZ;
export declare function xformMatrix(o: three.Vector3, x: three.Vector3, y: three.Vector3, z: three.Vector3): three.Matrix4;
export declare function xformMatrixFromXYZs(o: gs.XYZ, axes: [gs.XYZ, gs.XYZ, gs.XYZ]): three.Matrix4;
export declare function matrixInv(m: three.Matrix4): three.Matrix4;
export declare function vectorsFromVertices(vertices: gs.IVertex[]): three.Vector3[];
export declare function vectorsFromPoints(points: gs.IPoint[]): three.Vector3[];
export declare function subVectors(v1: three.Vector3, v2: three.Vector3, norm?: boolean): three.Vector3;
export declare function addVectors(v1: three.Vector3, v2: three.Vector3, norm?: boolean): three.Vector3;
export declare function crossVectors(v1: three.Vector3, v2: three.Vector3, norm?: boolean): three.Vector3;
export declare function vectorFromPointsAtoB(a: gs.IPoint, b: gs.IPoint, norm?: boolean): three.Vector3;
export declare function vectorFromVerticesAtoB(a: gs.IVertex, b: gs.IVertex, norm?: boolean): three.Vector3;
export declare function subXYZs(xyz1: gs.XYZ, xyz2: gs.XYZ, norm?: boolean): gs.XYZ;
export declare function addXYZs(xyz1: gs.XYZ, xyz2: gs.XYZ, norm?: boolean): gs.XYZ;
export declare function crossXYZs(xyz1: gs.XYZ, xyz2: gs.XYZ, norm?: boolean): gs.XYZ;
export declare function normalizeXYZ(xyz: gs.XYZ): gs.XYZ;
export declare function lengthXYZ(xyz: gs.XYZ): number;
export declare function setLengthXYZ(xyz: gs.XYZ, length: number): gs.XYZ;
export declare function makeXYZOrthogonal(xyz1: gs.XYZ, xyz2: gs.XYZ, normalize: boolean): [gs.XYZ, gs.XYZ, gs.XYZ];
export declare function subPoints(p1: gs.IPoint, p2: gs.IPoint, norm?: boolean): gs.XYZ;
export declare function addPoints(p1: gs.IPoint, p2: gs.IPoint, norm?: boolean): gs.XYZ;
export declare function subVertices(v1: gs.IVertex, v2: gs.IVertex, norm?: boolean): gs.XYZ;
export declare function addVertices(v1: gs.IVertex, v2: gs.IVertex, norm?: boolean): gs.XYZ;
/**
 * Function to transform a set of vertices in 3d space onto the xy plane. This function assumes that the vertices
 * are co-planar. Returns a set of three Vectors that represent points on the xy plane.
 */
export declare function makeVertices2D(vertices: gs.IVertex[]): three.Vector3[];
export declare function triangulate2D(vertices: gs.IVertex[], verts_indexes: number[]): number[];
