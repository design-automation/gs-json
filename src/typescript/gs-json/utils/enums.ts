/**
 * Enum, the different types of geometric elements.
 * Objects and Points are entities (see subclasses of the Ent class).
 * Faces, Wires, Edges, and Vertices are topological components (see subclasses of the Topo class).
 * Attributes can be attached to all these elements.
 */
export enum EGeomType {
    objs,
    faces,
    wires,
    edges,
    vertices,
    points,
}
/**
 * Enum, the different data types for attributes.
 */
export enum EDataType {
    type_str,
    type_num,
    type_bool,
    type_str_arr,
    type_num_arr,
    type_bool_arr,
}
/**
 * Enum, the different types of geometric objects (see the subclasses of the Obj class.)
 */
export const enum EObjType {
    acorn = 0,
    ray = 1,
    plane = 2,
    polyline = 100,
    nurbs_curve = 120,
    bezier_curve = 121,
    polymesh = 200,
    nurbs_surface = 220,
    bezier_surface = 221,
}

// =================== MAPS ===================
// mapStringToAttribType, mapStringToDataType
export type TGeomTypeStr = "points" | "vertices" | "edges" | "wires" | "faces" | "objs";
export type TDataTypeStr = "string"|"number"|"boolean"|"string[]"|"number[]"|"boolean[]";
/**
 * Map, from string to EGeomType.
 * This is used when parsing JSON.
 */
export let mapStringToGeomType = new Map<TGeomTypeStr, EGeomType> ([
    ["objs", EGeomType.objs],
    ["faces", EGeomType.faces],
    ["wires", EGeomType.wires],
    ["edges", EGeomType.edges],
    ["vertices", EGeomType.vertices],
    ["points", EGeomType.points],
]);
/**
 * Map, from EGeomType to string.
 * This is used when generating JSON.
 */
export let mapGeomTypeToString = new Map<EGeomType, TGeomTypeStr> ([
    [EGeomType.objs, "objs"],
    [EGeomType.faces, "faces"],
    [EGeomType.wires, "wires"],
    [EGeomType.edges, "edges"],
    [EGeomType.vertices, "vertices"],
    [EGeomType.points, "points"],
]);
/**
 * Map, from strings to DataType.
 * This is used when parsing JSON.
 */
export let mapStringToDataType = new Map<TDataTypeStr, EDataType> ([
    ["string", EDataType.type_str],
    ["number", EDataType.type_num],
    ["boolean", EDataType.type_bool],
    ["string[]", EDataType.type_str_arr],
    ["number[]", EDataType.type_num_arr],
    ["boolean[]", EDataType.type_bool_arr],
]);
/**
 * Map, from DataType to strings.
 * This is used when generating JSON.
 */
export let mapDataTypeToString = new Map<EDataType, TDataTypeStr> ([
    [EDataType.type_str, "string"],
    [EDataType.type_num, "number"],
    [EDataType.type_bool, "boolean"],
    [EDataType.type_str_arr, "string[]"],
    [EDataType.type_num_arr, "number[]"],
    [EDataType.type_bool_arr, "boolean[]"],
]);
/**
 * Map, from GeomType to int.
 * This is used when generating JSON.
 */
export let mapGeomTypeToTopoPathIndex = new Map<EGeomType, (0 | 1)> ([
    [EGeomType.faces, 1],
    [EGeomType.wires, 0],
    [EGeomType.edges, 1],
    [EGeomType.vertices, 0],
]);

export let mapTTPathIndexToGeomType = new Map<(0 | 1), EGeomType> ([
    [1, EGeomType.faces],
    [0, EGeomType.wires],
]);

export let mapSTPathIndexToGeomType = new Map<(0 | 1), EGeomType> ([
    [1, EGeomType.edges],
    [0, EGeomType.vertices],
]);
