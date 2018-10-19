import * as three from "three";
import * as gs from "../gs-json";
import * as arr from "../libs/arr/arr";
import * as threex from "../libs/threex/threex";
import {triangulate2D} from "../libs/triangulate/triangulate";

//  GENERAL ==================================================================================================

export interface IThreeData {
    xyzs_flat: number[];
    indexes: number[];
    reverse_map: Map<string|number, gs.ITopoPathData|number>;
}

/**
 * Get the points for the obj
 */
export function getPointsFromObjs(objs: gs.IObj[]): {xyzs: gs.XYZ[], id_map: Map<number, number>} {
    const points_set: Set<gs.IPoint> = new Set();
    for (const obj of objs) {
        for (const point of obj.getPointsSet()) {
            points_set.add(point);
        }
    }
    const points: gs.IPoint[] = Array.from(points_set);
    //  create xyzs arr.Array
    const xyzs: gs.XYZ[] = points.map((v) => v.getPosition());
    //  create map from point IDs to index number
    const id_map: Map<number, number> = new Map();
    points.forEach((point,i) => id_map.set(point.getID(), i));
    // create a map from index to face path
    return {xyzs, id_map};
}

//  FACES ====================================================================================================

/**
 * Get mesh data from multiple objs.
 */
export function getDataFromAllFaces(objs: gs.IObj[]): IThreeData {
    // filter
    const objs_filtered: gs.IPolymesh[] =
        objs.filter((obj) => obj.getObjType() === gs.EObjType.polymesh) as gs.IPolymesh[];
    // get the points
    const points = getPointsFromObjs(objs_filtered);
    // create a map from index to face path
    const reverse_map: Map<number, gs.ITopoPathData> = new Map();
    // get the faces
    const faces: gs.IFace[] = arr.Arr.flatten(objs_filtered.map((obj) => obj.getFaces()));
    //  create triangles data
    const traingles: number[][] = [];
    let tri_count: number = 0;
    for (const face of faces) {
        const verts: gs.IVertex[] = face.getVertices();
        const verts_indexes: number[] = verts.map((v) => points.id_map.get(v.getPoint().getID()));
        if (verts.length === 3) {
            traingles.push(verts_indexes);
            reverse_map.set(tri_count, face.getTopoPath());
            tri_count++;
        } else if (verts.length > 3) {
            const verts_tri: number[] = triangulate2D(verts, verts_indexes);
            traingles.push(verts_tri);
            for (let i = 0;i < verts_tri.length - 2; i = i + 3) {
                reverse_map.set(tri_count, face.getTopoPath());
                tri_count++;
            }
        }
    }
    return {xyzs_flat: arr.Arr.flatten(points.xyzs), indexes: arr.Arr.flatten(traingles), reverse_map: reverse_map};
}

//  WIRES ====================================================================================================

/**
 * Get line segments data from wires.
 */
export function getDataFromAllWires(objs: gs.IObj[]): IThreeData {
    // filter
    const objs_filtered: gs.IObj[] = objs.filter((obj) =>
        obj.getObjType() === gs.EObjType.polymesh ||
        obj.getObjType() === gs.EObjType.polyline);
    // get the wires
    const wires: gs.IWire[] = arr.Arr.flatten(objs_filtered.map((obj) => obj.getWires()));
    if (wires.length === 0) {return null;}
    const points = getPointsFromObjs(objs_filtered);
    // create a map from index to wire path
    const reverse_map: Map<number, gs.ITopoPathData> = new Map();
    // create line segments
    const indexes: number[][] = [];
    let seg_count: number = 0;
    for (const wire of wires) {
        const path: gs.ITopoPathData = wire.getTopoPath();
        for(const edge of wire.getEdges()) {
            const verts: gs.IVertex[] = edge.getVertices();
            const verts_indexes: number[] = verts.map((v) => points.id_map.get(v.getPoint().getID()));
            indexes.push(verts_indexes);
            reverse_map.set(seg_count, path);
            seg_count++;
        }
    }
    return {xyzs_flat: arr.Arr.flatten(points.xyzs), indexes: arr.Arr.flatten(indexes),  reverse_map: reverse_map};
}

//  EDGES ====================================================================================================

/**
 * Get line segment data from edges.
 */
export function getDataFromAllEdges(objs: gs.IObj[]): IThreeData {
    // filter
    const objs_filtered: gs.IObj[] = objs.filter((obj) =>
        obj.getObjType() === gs.EObjType.polymesh ||
        obj.getObjType() === gs.EObjType.polyline);
    // get the points
    const edges: gs.IEdge[] = arr.Arr.flatten(objs_filtered.map((obj) => obj.getEdges()));
    if (edges.length === 0) {return null;}
    const points = getPointsFromObjs(objs_filtered);
    // create a map from index to edge path
    const reverse_map: Map<number, gs.ITopoPathData> = new Map();
    // create line segments
    const indexes: number[][] = [];
    for (const [i, edge] of edges.entries()) {
        const verts: gs.IVertex[] = edge.getVertices();
        const verts_indexes: number[] = verts.map((v) => points.id_map.get(v.getPoint().getID()));
        indexes.push(verts_indexes);
        reverse_map.set(i, edge.getTopoPath());
    }
    return {xyzs_flat: arr.Arr.flatten(points.xyzs), indexes: arr.Arr.flatten(indexes),  reverse_map: reverse_map};
}

//  VERTICES ====================================================================================================

/**
 * Get vertex data.
 */
export function getDataFromAllVertices(objs: gs.IObj[]): IThreeData {
    // filter, no need
    // get the points
    const vertices: gs.IVertex[] = arr.Arr.flatten(objs.map((obj) => obj.getVertices()));
    if (vertices.length === 0) {return null;}
    const points = getPointsFromObjs(objs);
    // create a map from index to vertex path
    const reverse_map: Map<number, gs.ITopoPathData> = new Map();
    // create points
    const indexes: number[] = [];
    for (const [i, vertex] of vertices.entries()) {
        const vert_index: number = points.id_map.get(vertex.getPoint().getID());
        indexes.push(vert_index);
        reverse_map.set(i, vertex.getTopoPath());
    }
    // return the data
    return {xyzs_flat: arr.Arr.flatten(points.xyzs), indexes: indexes,  reverse_map: reverse_map};
}

//  OTHERS ====================================================================================================

/**
 * Get vertex data.
 */
export function getDataAllOtherLines(objs: gs.IObj[]): IThreeData {
    // filter
    //const objs_filtered: Array<gs.IRay|gs.IPlane|gs.ICircle> = objs.filter((obj) =>
    const objs_filtered = objs.filter((obj) =>
        obj.getObjType() === gs.EObjType.ray ||
        obj.getObjType() === gs.EObjType.plane);
    // create points
    const indexes: number[] = [];
    const xyzs: gs.XYZ[][] = [];
    let index_counter: number = 0;
    for (const [i, obj] of objs_filtered.entries()) {
        switch (obj.getObjType()) {
            case gs.EObjType.ray:
                const ray: gs.IRay = obj as gs.IRay;
                const ray_line: gs.XYZ[] = _renderRay(ray);
                xyzs.push(ray_line);
                indexes.push(index_counter);
                index_counter++;
                indexes.push(index_counter);
                index_counter++;
                break;
            case gs.EObjType.plane:
                const plane: gs.IPlane = obj as gs.IPlane;
                const p_faces: gs.XYZ[][] = _renderPlane(plane);
                for (const face of p_faces) {
                    xyzs.push(face);
                    for (let j = 0; j < face.length - 1; j++) {
                        indexes.push(index_counter);
                        indexes.push(++index_counter);
                    }
                    index_counter++;
                }
                break;
            default:
                // code...
                break;
        }
    }
    // return the data
    const xyzs_flat = arr.Arr.flatten(xyzs);
    return {xyzs_flat, indexes, reverse_map: null};
}

function _renderRay(ray: gs.IRay): gs.XYZ[] {
    const r_origin: gs.XYZ = ray.getOrigin().getPosition();
    const r_origin_vec: three.Vector3 = new three.Vector3(...r_origin);
    const r_dir: gs.XYZ = ray.getVector();
    const r_dir_vec: three.Vector3 = new three.Vector3(...r_dir);
    r_dir_vec.setLength(100);
    const r_end: gs.XYZ =  threex.addVectors(r_origin_vec, r_dir_vec).toArray() as gs.XYZ;
    return [r_origin, r_end];
}

function _renderPlane(plane: gs.IPlane): gs.XYZ[][] {
    const p_origin: gs.XYZ = plane.getOrigin().getPosition();
    const p_origin_vec: three.Vector3 = new three.Vector3(...p_origin);
    const p_axes: gs.XYZ[] = plane.getAxes();
    const x_axis: three.Vector3 = new three.Vector3(...p_axes[0]);
    x_axis.setLength(10);
    const y_axis: three.Vector3 = new three.Vector3(...p_axes[1]);
    y_axis.setLength(10);
    const f1_1: three.Vector3 =  threex.addVectors(p_origin_vec, x_axis);
    const f1_2: three.Vector3 =  threex.addVectors(f1_1, y_axis);
    const f1_3: three.Vector3 =  threex.addVectors(p_origin_vec, y_axis);
    const f1: gs.XYZ[] = [p_origin_vec, f1_1, f1_2, f1_3].map((v) => v.toArray() as gs.XYZ);
    const f2_1: three.Vector3 =  threex.addVectors(p_origin_vec, y_axis);
    const f2_2: three.Vector3 =  threex.subVectors(f2_1, x_axis);
    const f2_3: three.Vector3 =  threex.subVectors(p_origin_vec, x_axis);
    const f2: gs.XYZ[] = [p_origin_vec, f2_1, f2_2, f2_3].map((v) => v.toArray() as gs.XYZ);
    const f3_1: three.Vector3 =  threex.subVectors(p_origin_vec, x_axis);
    const f3_2: three.Vector3 =  threex.subVectors(f3_1, y_axis);
    const f3_3: three.Vector3 =  threex.subVectors(p_origin_vec, y_axis);
    const f3: gs.XYZ[] = [p_origin_vec, f3_1, f3_2, f3_3].map((v) => v.toArray() as gs.XYZ);
    const f4_1: three.Vector3 =  threex.subVectors(p_origin_vec, y_axis);
    const f4_2: three.Vector3 =  threex.addVectors(f4_1, x_axis);
    const f4_3: three.Vector3 =  threex.addVectors(p_origin_vec, x_axis);
    const f4: gs.XYZ[] = [p_origin_vec, f4_1, f4_2, f4_3].map((v) => v.toArray() as gs.XYZ);
    const p_faces: gs.XYZ[][] = [f1, f2, f3, f4];
    return p_faces;
}
//  POINTS ====================================================================================================

/**
 * Get point data.
 */
export function getDataFromAllPoints(points: gs.IPoint[]): IThreeData {
    // create a map from index to vertex path
    const reverse_map: Map<number, number> = new Map();
    // create points
    const indexes: number[] = [];
    const xyzs: gs.XYZ[] = [];
    for (const [i, point] of points.entries()) {
        xyzs.push(point.getPosition());
        indexes.push(i);
        reverse_map.set(i, point.getID());
    }
    // return the data
    return {xyzs_flat: arr.Arr.flatten(xyzs), indexes: indexes,  reverse_map: reverse_map};
}
