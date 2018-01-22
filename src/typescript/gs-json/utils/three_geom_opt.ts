import * as gs from "./_export";
import * as three from "three";
import * as threex from "./three_utils";
import * as math_conics from "./math_conics";

//  GENERAL ==================================================================================================

export interface IThreeData {
    xyzs_flat: number[];
    indexes: number[];
    reverse_map: Map<string|number, gs.ITopoPathData>;
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
    //  create xyzs gs.Array
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
    const objs_filtered: gs.IPolymesh[] = objs.filter((obj) => obj.getObjType() === gs.EObjType.polymesh);
    // get the points
    const points = getPointsFromObjs(objs_filtered);
    // create a map from index to face path
    const reverse_map: Map<number, gs.ITopoPathData> = new Map();
    // get the faces
    const faces: gs.IFace[] = gs.Arr.flatten(objs_filtered.map((obj) => obj.getFaces()));
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
            const verts_tri: number[] = threex.triangulate2D(verts, verts_indexes);
            traingles.push(verts_tri);
            for (let i = 0;i < verts_tri.length - 3; i = i + 3) {
                reverse_map.set(tri_count, face.getTopoPath());
                tri_count++;
            }
        }
    }
    return {xyzs_flat: gs.Arr.flatten(points.xyzs), indexes: gs.Arr.flatten(traingles), reverse_map: reverse_map};
}

//  WIRES ====================================================================================================

/**
 * Get line segments data from wires.
 */
export function getDataFromAllWires(objs: gs.IObj[]): IThreeData {
    // filter
    const objs_filtered: Array<gs.IPolymesh|gs.IPolyline> = objs.filter((obj) =>
        obj.getObjType() === gs.EObjType.polymesh ||
        obj.getObjType() === gs.EObjType.polyline);
    // get the wires
    const wires: gs.IWire[] = gs.Arr.flatten(objs_filtered.map((obj) => obj.getWires()));
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
    return {xyzs_flat: gs.Arr.flatten(points.xyzs), indexes: gs.Arr.flatten(indexes),  reverse_map: reverse_map};
}

//  EDGES ====================================================================================================

/**
 * Get line segment data from edges.
 */
export function getDataFromAllEdges(objs: gs.IObj[]): IThreeData {
    // filter
    const objs_filtered: Array<gs.IPolymesh|gs.IPolyline> = objs.filter((obj) =>
        obj.getObjType() === gs.EObjType.polymesh ||
        obj.getObjType() === gs.EObjType.polyline);
    // get the points
    const edges: gs.IEdge[] = gs.Arr.flatten(objs_filtered.map((obj) => obj.getEdges()));
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
    return {xyzs_flat: gs.Arr.flatten(points.xyzs), indexes: gs.Arr.flatten(indexes),  reverse_map: reverse_map};
}

//  VERTICES ====================================================================================================

/**
 * Get vertex data.
 */
export function getDataFromAllVertices(objs: gs.IObj[]): IThreeData {
    // filter, no need
    // get the points
    const vertices: gs.IVertex[] = gs.Arr.flatten(objs.map((obj) => obj.getVertices()));
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
    return {xyzs_flat: gs.Arr.flatten(points.xyzs), indexes: indexes,  reverse_map: reverse_map};
}

//  OTHERS ====================================================================================================

/**
 * Get vertex data.
 */
export function getDataAllOtherLines(objs: gs.IObj[]): IThreeData {
    // filter
    const objs_filtered: Array<gs.IPolymesh|gs.IPolyline> = objs.filter((obj) =>
        obj.getObjType() === gs.EObjType.circle ||
        obj.getObjType() === gs.EObjType.ellipse);
    // create points
    const indexes: number[] = [];
    const xyzs: gs.XYZ[][] = [];
    let index_counter: number = 0;
    for (const [i, obj] of objs_filtered.entries()) {
        const obj_render_xyzs: gs.XYZ[] = math_conics.getRenderXYZs(obj, 1);
        xyzs.push(obj_render_xyzs);
        for (let j = 0; j < obj_render_xyzs.length - 1; j++) {
            indexes.push(index_counter);
            indexes.push(++index_counter);
        }
        index_counter++;
    }
    // return the data
    return {xyzs_flat: gs.Arr.flatten(xyzs), indexes: indexes,  reverse_map: null};
}
