import * as gs from "./_export";
import * as three from "three";
import * as threex from "./three_utils";
import * as math_conics from "./math_conics";

//  OPT ===================================================================================================

/**
 * Get mesh data from multiple objs.
 */
export function getMeshFromAllMeshes(objs: gs.IObj[]): {xyzs_flat: number[], indexes: number[]} {
    const points: gs.IPoint[] = gs.Arr.flatten(objs.map((obj) => obj.getPointsSet()));
    const faces: gs.IFace[] = gs.Arr.flatten(objs.map((obj) => obj.getFaces()));
    //  create xyzs gs.Array
    const xyzs: gs.XYZ[] = points.map((v) => v.getPosition());
    //  create triangles data
    const id_to_i: Map<number, number> = new Map();
    points.forEach((v,i) => id_to_i.set(v.getID(), i));
    const traingles: number[][] = [];
    for (const face of faces) {
        const verts: gs.IVertex[] = face.getVertices();
        const verts_indexes: number[] = verts.map((v) => id_to_i.get(v.getPoint().getID()));
        if (verts.length === 3) {
            traingles.push(verts_indexes);
        } else if (verts.length > 3) {
            traingles.push(threex.triangulate2D(verts, verts_indexes));
            // traingles.push([verts_indexes[0], verts_indexes[1], verts_indexes[2]]);
            // traingles.push([verts_indexes[0], verts_indexes[2], verts_indexes[3]]); //TODO this is a temporary fix
        }
    }
    return {xyzs_flat: gs.Arr.flatten(xyzs), indexes: gs.Arr.flatten(traingles)};
}

/**
 * Get line segment data from objs  unique edges.
 */
export function getLineSegmentsFromAllEdges(objs: gs.IObj[]): number[] {
    const face_edges: gs.IEdge[] = gs.Arr.flatten(objs.map((obj) => obj.getEdges()[1]));
    const wire_edges: gs.IEdge[] = gs.Arr.flatten(objs.map((obj) => obj.getEdges()[0]));
    // create an array of wire paths, so they can be excluded, i.e. "123_456", is the edge from 123 to 456
    const edge_paths: string[] = [];
    for (const edge of wire_edges) {
        const points: gs.IPoint[] = edge.getVertices().map((v) => v.getPoint());
        const ids = points.map((v) => v.getID()).sort();
        edge_paths.push(ids[0] + "_" + ids[1]);
    }
    // get all unique face edges
    const edge_xyzs: gs.XYZ[] = [];
    for (const edge of face_edges) {
        const points: gs.IPoint[] = edge.getVertices().map((v) => v.getPoint());
        const ids = points.map((v) => v.getID()).sort();
        const path: string = ids[0] + "_" + ids[1];
        if (edge_paths.indexOf(path) === -1) {
            edge_paths.push(path);
            edge_xyzs.push(points[0].getPosition());
            edge_xyzs.push(points[1].getPosition());
        }
    }
    return gs.Arr.flatten(edge_xyzs);
}

/**
 * Get line segments data from wires.
 */
export function getLineSegmentsFromAllWires(objs: gs.IObj[]): number[] {
    const wire_edges: gs.IEdge[] = gs.Arr.flatten(objs.map((obj) => obj.getEdges()[0]));
    const edge_xyzs: gs.XYZ[] = [];
    for (const edge of wire_edges) {
        const points: gs.IPoint[] = edge.getVertices().map((v) => v.getPoint());
        edge_xyzs.push(points[0].getPosition());
        edge_xyzs.push(points[1].getPosition());
    }
    return gs.Arr.flatten(edge_xyzs);
}

//  MESHES ===================================================================================================

/**
 * Get mesh data from obj faces.
 */
export function getMeshFromFaces(obj: gs.IObj): {xyzs_flat: number[], indexes: number[]} {
    const points: gs.IPoint[] = obj.getPointsSet();
    const faces: gs.IFace[] = obj.getFaces();
    //  create xyzs gs.Array
    const xyzs: gs.XYZ[] = points.map((v) => v.getPosition());
    //  create triangles data
    const id_to_i: Map<number, number> = new Map();
    points.forEach((v,i) => id_to_i.set(v.getID(), i));
    const traingles: number[][] = [];
    for (const face of faces) {
        const verts: gs.IVertex[] = face.getVertices();
        const verts_indexes: number[] = verts.map((v) => id_to_i.get(v.getPoint().getID()));
        if (verts.length === 3) {
            traingles.push(verts_indexes);
        } else if (verts.length > 3) {
            traingles.push(threex.triangulate2D(verts, verts_indexes));
            // traingles.push([verts_indexes[0], verts_indexes[1], verts_indexes[2]]);
            // traingles.push([verts_indexes[0], verts_indexes[2], verts_indexes[3]]); //TODO this is a temporary fix
        }
    }
    return {xyzs_flat: gs.Arr.flatten(xyzs), indexes: gs.Arr.flatten(traingles)};
}

//  LINES ==================================================================================================

/**
 * Get line segment data from obj unique edges.
 */
export function getLineSegmentsFromEdges(obj: gs.IObj): number[] {
    const edges: gs.IEdge[][][] = obj.getEdges();
    //create an array of wire paths, so they can be excluded
    const wire_edges: gs.IEdge[] = gs.Arr.flatten(edges[0]);
    const edge_paths: string[] = [];
    for (const edge of wire_edges) {
        const points: gs.IPoint[] = edge.getVertices().map((v) => v.getPoint());
        const ids = points.map((v) => v.getID()).sort();
        edge_paths.push(ids[0] + "_" + ids[1]);
    }
    //get all unique face edges
    const edge_xyzs: gs.XYZ[] = [];
    for (const edge of gs.Arr.flatten(edges[1])) {
        const points: gs.IPoint[] = edge.getVertices().map((v) => v.getPoint());
        const ids = points.map((v) => v.getID()).sort();
        const path: string = ids[0] + "_" + ids[1];
        if (edge_paths.indexOf(path) === -1) {
            edge_paths.push(path);
            edge_xyzs.push(points[0].getPosition());
            edge_xyzs.push(points[1].getPosition());
        }
    }
    return gs.Arr.flatten(edge_xyzs);
}

/**
 * Get lines data from obj wires.
 */
export function getLinesFromWires(obj: gs.IObj): number[][] {
    const wires: gs.IWire[] = obj.getWires();
    const xyzs: number[][] = [];
    for (const wire of wires) {
        xyzs.push(gs.Arr.flatten(wire.getVertices().map((v) => v.getPoint().getPosition())));
    }
    return xyzs;
}

/**
 * Get lines data from circles.
 */
export function getLinesFromCircle(curve: gs.ICircle, resolution: number): number[][] {
    return math_conics.circleGetRenderXYZs(curve, resolution);
}

/**
 * Get lines data from ellipses.
 */
export function getLinesFromEllipse(curve: gs.IEllipse, resolution: number): number[][] {
    return math_conics.ellipseGetRenderXYZs(curve, resolution);
}

/**
 * Get lines data from plane.
 */
export function getLinesFromPlane(curve: gs.IPlane): number[][] {
    const o: gs.XYZ = curve.getOrigin().getPosition();
    const x_vec: gs.XYZ = curve.getVectors()[0];
    const y_vec: gs.XYZ = curve.getVectors()[1];
    const z_vec: gs.XYZ = curve.getVectors()[2];
    const x_end: gs.XYZ = [o[0] + x_vec[0], o[1] + x_vec[1], o[2] + x_vec[2]];
    const y_end: gs.XYZ = [o[0] + y_vec[0], o[1] + y_vec[1], o[2] + y_vec[2]];
    const z_end: gs.XYZ = [o[0] + z_vec[0], o[1] + z_vec[1], o[2] + z_vec[2]];
    return [[...o, ...x_end], [...o, ...y_end], [...o, ...z_end]];
}

/**
 * Get lines data from ray.
 */
export function getLinesFromRay(ray: gs.IRay): number[][] {
    const o: gs.XYZ = ray.getOrigin().getPosition();
    const z_vec: gs.XYZ = ray.getVector();
    const end_xyz: gs.XYZ = [o[0] + z_vec[0], o[1] + z_vec[1], o[2] + z_vec[2]];
    return [[...o, ...end_xyz]];
}

//  SPRITES ==================================================================================================

/**
 * Vertex sprites.
 */
export function getSpritesFromVertices(obj: gs.IObj): {label: string, xyz: gs.XYZ}[] {
    const vertices: gs.IVertex[] = gs.Arr.flatten(obj.getVertices());
    const sprites_data: {label: string, xyz: gs.XYZ}[] = [];
    for (const vertex of vertices) {
        sprites_data.push({label: vertex.getLabel(), xyz: vertex.getLabelCentroid()});
    }
    return sprites_data;
}

/**
 * Edge sprites.
 */
export function getSpritesFromEdges(obj: gs.IObj): {label: string, xyz: gs.XYZ}[] {
    const edges: gs.IEdge[] = gs.Arr.flatten(obj.getEdges());
    const sprites_data: {label: string, xyz: gs.XYZ}[] = [];
    for (const edge of edges) {
        sprites_data.push({label: edge.getLabel(), xyz: edge.getLabelCentroid()});
    }
    return sprites_data;
}

/**
 * Wire sprites.
 */
export function getSpritesFromWires(obj: gs.IObj): {label: string, xyz: gs.XYZ}[] {
    const wires: gs.IWire[] = gs.Arr.flatten(obj.getWires());
    const sprites_data: {label: string, xyz: gs.XYZ}[] = [];
    for (const wire of wires) {
        sprites_data.push({label: wire.getLabel(), xyz: wire.getLabelCentroid()});
    }
    return sprites_data;
}

/**
 * Face sprites.
 */
export function getSpritesFromFaces(obj: gs.IObj): {label: string, xyz: gs.XYZ}[] {
    const faces: gs.IFace[] = gs.Arr.flatten(obj.getFaces());
    const sprites_data: {label: string, xyz: gs.XYZ}[] = [];
    for (const face of faces) {
        sprites_data.push({label: face.getLabel(), xyz: face.getLabelCentroid()});
    }
    return sprites_data;
}

/**
 * Get sprites data fro Obj.
 */
export function getSpriteFromObj(obj: gs.IObj): {label: string, xyz: gs.XYZ} {
    const faces: gs.IFace[] = gs.Arr.flatten(obj.getFaces());
    return {label: obj.getLabel(), xyz: obj.getLabelCentroid()}
}
