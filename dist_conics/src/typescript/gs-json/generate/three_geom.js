"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three = require("three");
const arr = require("../libs/arr/arr");
const threex = require("../libs/threex/threex");
const math_conics = require("../libs/conics/conics");
/**
 * Get the points for the obj
 */
function getPointsFromObjs(objs) {
    const points_set = new Set();
    for (const obj of objs) {
        for (const point of obj.getPointsSet()) {
            points_set.add(point);
        }
    }
    const points = Array.from(points_set);
    //  create xyzs arr.Array
    const xyzs = points.map((v) => v.getPosition());
    //  create map from point IDs to index number
    const id_map = new Map();
    points.forEach((point, i) => id_map.set(point.getID(), i));
    // create a map from index to face path
    return { xyzs, id_map };
}
exports.getPointsFromObjs = getPointsFromObjs;
//  FACES ====================================================================================================
/**
 * Get mesh data from multiple objs.
 */
function getDataFromAllFaces(objs) {
    // filter
    const objs_filtered = objs.filter((obj) => obj.getObjType() === 200 /* polymesh */);
    // get the points
    const points = getPointsFromObjs(objs_filtered);
    // create a map from index to face path
    const reverse_map = new Map();
    // get the faces
    const faces = arr.Arr.flatten(objs_filtered.map((obj) => obj.getFaces()));
    //  create triangles data
    const traingles = [];
    let tri_count = 0;
    for (const face of faces) {
        const verts = face.getVertices();
        const verts_indexes = verts.map((v) => points.id_map.get(v.getPoint().getID()));
        if (verts.length === 3) {
            traingles.push(verts_indexes);
            reverse_map.set(tri_count, face.getTopoPath());
            tri_count++;
        }
        else if (verts.length > 3) {
            const verts_tri = threex.triangulate2D(verts, verts_indexes);
            traingles.push(verts_tri);
            for (let i = 0; i < verts_tri.length - 3; i = i + 3) {
                reverse_map.set(tri_count, face.getTopoPath());
                tri_count++;
            }
        }
    }
    return { xyzs_flat: arr.Arr.flatten(points.xyzs), indexes: arr.Arr.flatten(traingles), reverse_map: reverse_map };
}
exports.getDataFromAllFaces = getDataFromAllFaces;
//  WIRES ====================================================================================================
/**
 * Get line segments data from wires.
 */
function getDataFromAllWires(objs) {
    // filter
    const objs_filtered = objs.filter((obj) => obj.getObjType() === 200 /* polymesh */ ||
        obj.getObjType() === 100 /* polyline */);
    // get the wires
    const wires = arr.Arr.flatten(objs_filtered.map((obj) => obj.getWires()));
    if (wires.length === 0) {
        return null;
    }
    const points = getPointsFromObjs(objs_filtered);
    // create a map from index to wire path
    const reverse_map = new Map();
    // create line segments
    const indexes = [];
    let seg_count = 0;
    for (const wire of wires) {
        const path = wire.getTopoPath();
        for (const edge of wire.getEdges()) {
            const verts = edge.getVertices();
            const verts_indexes = verts.map((v) => points.id_map.get(v.getPoint().getID()));
            indexes.push(verts_indexes);
            reverse_map.set(seg_count, path);
            seg_count++;
        }
    }
    return { xyzs_flat: arr.Arr.flatten(points.xyzs), indexes: arr.Arr.flatten(indexes), reverse_map: reverse_map };
}
exports.getDataFromAllWires = getDataFromAllWires;
//  EDGES ====================================================================================================
/**
 * Get line segment data from edges.
 */
function getDataFromAllEdges(objs) {
    // filter
    const objs_filtered = objs.filter((obj) => obj.getObjType() === 200 /* polymesh */ ||
        obj.getObjType() === 100 /* polyline */);
    // get the points
    const edges = arr.Arr.flatten(objs_filtered.map((obj) => obj.getEdges()));
    if (edges.length === 0) {
        return null;
    }
    const points = getPointsFromObjs(objs_filtered);
    // create a map from index to edge path
    const reverse_map = new Map();
    // create line segments
    const indexes = [];
    for (const [i, edge] of edges.entries()) {
        const verts = edge.getVertices();
        const verts_indexes = verts.map((v) => points.id_map.get(v.getPoint().getID()));
        indexes.push(verts_indexes);
        reverse_map.set(i, edge.getTopoPath());
    }
    return { xyzs_flat: arr.Arr.flatten(points.xyzs), indexes: arr.Arr.flatten(indexes), reverse_map: reverse_map };
}
exports.getDataFromAllEdges = getDataFromAllEdges;
//  VERTICES ====================================================================================================
/**
 * Get vertex data.
 */
function getDataFromAllVertices(objs) {
    // filter, no need
    // get the points
    const vertices = arr.Arr.flatten(objs.map((obj) => obj.getVertices()));
    if (vertices.length === 0) {
        return null;
    }
    const points = getPointsFromObjs(objs);
    // create a map from index to vertex path
    const reverse_map = new Map();
    // create points
    const indexes = [];
    for (const [i, vertex] of vertices.entries()) {
        const vert_index = points.id_map.get(vertex.getPoint().getID());
        indexes.push(vert_index);
        reverse_map.set(i, vertex.getTopoPath());
    }
    // return the data
    return { xyzs_flat: arr.Arr.flatten(points.xyzs), indexes: indexes, reverse_map: reverse_map };
}
exports.getDataFromAllVertices = getDataFromAllVertices;
//  OTHERS ====================================================================================================
/**
 * Get vertex data.
 */
function getDataAllOtherLines(objs) {
    // filter
    //const objs_filtered: Array<gs.IRay|gs.IPlane|gs.ICircle> = objs.filter((obj) =>
    const objs_filtered = objs.filter((obj) => obj.getObjType() === 1 /* ray */ ||
        obj.getObjType() === 2 /* plane */ ||
        obj.getObjType() === 3 /* circle */);
    // create points
    const indexes = [];
    const xyzs = [];
    let index_counter = 0;
    for (const [i, obj] of objs_filtered.entries()) {
        switch (obj.getObjType()) {
            case 1 /* ray */:
                const ray = obj;
                const ray_line = _renderRay(ray);
                xyzs.push(ray_line);
                indexes.push(index_counter);
                index_counter++;
                indexes.push(index_counter);
                index_counter++;
                break;
            case 2 /* plane */:
                const plane = obj;
                const p_faces = _renderPlane(plane);
                for (const face of p_faces) {
                    xyzs.push(face);
                    for (let j = 0; j < face.length - 1; j++) {
                        indexes.push(index_counter);
                        indexes.push(++index_counter);
                    }
                    index_counter++;
                }
                break;
            case 3 /* circle */:
                const obj_render_xyzs = math_conics.getRenderXYZs(obj, 1);
                xyzs.push(obj_render_xyzs);
                for (let j = 0; j < obj_render_xyzs.length - 1; j++) {
                    indexes.push(index_counter);
                    indexes.push(++index_counter);
                }
                index_counter++;
                break;
            default:
                // code...
                break;
        }
    }
    // return the data
    const xyzs_flat = arr.Arr.flatten(xyzs);
    return { xyzs_flat, indexes, reverse_map: null };
}
exports.getDataAllOtherLines = getDataAllOtherLines;
function _renderRay(ray) {
    const r_origin = ray.getOrigin().getPosition();
    const r_origin_vec = new three.Vector3(...r_origin);
    const r_dir = ray.getVector();
    const r_dir_vec = new three.Vector3(...r_dir);
    r_dir_vec.setLength(100);
    const r_end = threex.addVectors(r_origin_vec, r_dir_vec).toArray();
    return [r_origin, r_end];
}
function _renderPlane(plane) {
    const p_origin = plane.getOrigin().getPosition();
    const p_origin_vec = new three.Vector3(...p_origin);
    const p_axes = plane.getAxes();
    const x_axis = new three.Vector3(...p_axes[0]);
    x_axis.setLength(10);
    const y_axis = new three.Vector3(...p_axes[1]);
    y_axis.setLength(10);
    const f1_1 = threex.addVectors(p_origin_vec, x_axis);
    const f1_2 = threex.addVectors(f1_1, y_axis);
    const f1_3 = threex.addVectors(p_origin_vec, y_axis);
    const f1 = [p_origin_vec, f1_1, f1_2, f1_3].map((v) => v.toArray());
    const f2_1 = threex.addVectors(p_origin_vec, y_axis);
    const f2_2 = threex.subVectors(f2_1, x_axis);
    const f2_3 = threex.subVectors(p_origin_vec, x_axis);
    const f2 = [p_origin_vec, f2_1, f2_2, f2_3].map((v) => v.toArray());
    const f3_1 = threex.subVectors(p_origin_vec, x_axis);
    const f3_2 = threex.subVectors(f3_1, y_axis);
    const f3_3 = threex.subVectors(p_origin_vec, y_axis);
    const f3 = [p_origin_vec, f3_1, f3_2, f3_3].map((v) => v.toArray());
    const f4_1 = threex.subVectors(p_origin_vec, y_axis);
    const f4_2 = threex.addVectors(f4_1, x_axis);
    const f4_3 = threex.addVectors(p_origin_vec, x_axis);
    const f4 = [p_origin_vec, f4_1, f4_2, f4_3].map((v) => v.toArray());
    const p_faces = [f1, f2, f3, f4];
    return p_faces;
}
//  POINTS ====================================================================================================
/**
 * Get point data.
 */
function getDataFromAllPoints(points) {
    // create a map from index to vertex path
    const reverse_map = new Map();
    // create points
    const indexes = [];
    const xyzs = [];
    for (const [i, point] of points.entries()) {
        xyzs.push(point.getPosition());
        indexes.push(i);
        reverse_map.set(i, point.getID());
    }
    // return the data
    return { xyzs_flat: arr.Arr.flatten(xyzs), indexes: indexes, reverse_map: reverse_map };
}
exports.getDataFromAllPoints = getDataFromAllPoints;
//# sourceMappingURL=three_geom.js.map