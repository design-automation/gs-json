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
    polyline = 100,
    nurbs_curve = 120,
    bezier_curve = 121,
    polymesh = 200,
    nurbs_surface = 220,
    bezier_surface = 221,
}

// =================== MAPS ===================
// mapStringToAttribType, mapStringToDataType
type geom_type_str = "points" | "vertices" | "edges" | "wires" | "faces" | "objs";
type data_type_Str = "string"|"number"|"boolean"|"string[]"|"number[]"|"boolean[]";
/**
 * Map, from string to EGeomType.
 * This is used when parsing JSON.
 */
export let mapStringToGeomType = new Map<geom_type_str, EGeomType> ([
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
export let mapGeomTypeToString = new Map<EGeomType, geom_type_str> ([
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
export let mapStringToDataType = new Map<data_type_Str, EDataType> ([
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
export let mapDataTypeToString = new Map<EDataType, data_type_Str> ([
    [EDataType.type_str, "string"],
    [EDataType.type_num, "number"],
    [EDataType.type_bool, "boolean"],
    [EDataType.type_str_arr, "string[]"],
    [EDataType.type_num_arr, "number[]"],
    [EDataType.type_bool_arr, "boolean[]"],
]);
