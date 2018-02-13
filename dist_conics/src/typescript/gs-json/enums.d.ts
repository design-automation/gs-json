/**
 * Enum, the different types of geometric elements.
 * Objects and Points are entities (see subclasses of the Ent class).
 * Faces, Wires, Edges, and Vertices are topological components (see subclasses of the Topo class).
 * Attributes can be attached to all these elements.
 */
export declare enum EGeomType {
    points = 0,
    vertices = 1,
    edges = 2,
    wires = 3,
    faces = 4,
    objs = 5,
}
/**
 * Enum, the different data types for attributes.
 */
export declare enum EDataType {
    type_str = 0,
    type_num = 1,
    type_bool = 2,
    type_str_arr = 3,
    type_num_arr = 4,
    type_bool_arr = 5,
}
/**
 * Enum, the different types of geometric objects (see the subclasses of the Obj class.)
 */
export declare const enum EObjType {
    acorn = 0,
    ray = 1,
    rayTwo = 11,
    plane = 2,
    circle = 3,
    ellipse = 4,
    parabola = 5,
    hyperbola = 6,
    polyline = 100,
    line = 101,
    nurbs_curve = 120,
    bezier_curve = 121,
    polymesh = 200,
    nurbs_surface = 220,
    bezier_surface = 221,
}
/**
 * Map, from EObjType to string.
 * This is used when generating string representations of objects.
 */
export declare let mapObjTypeToString: Map<EObjType, string>;
export declare type TGeomTypeStr = "points" | "vertices" | "edges" | "wires" | "faces" | "objs";
export declare type TDataTypeStr = "string" | "number" | "boolean" | "string[]" | "number[]" | "boolean[]";
/**
 * Map, from string to EGeomType.
 * This is used when parsing JSON.
 */
export declare let mapStringToGeomType: Map<TGeomTypeStr, EGeomType>;
/**
 * Map, from EGeomType to string.
 * This is used when generating JSON.
 */
export declare let mapGeomTypeToString: Map<EGeomType, TGeomTypeStr>;
/**
 * Map, from strings to DataType.
 * This is used when parsing JSON.
 */
export declare let mapStringToDataType: Map<TDataTypeStr, EDataType>;
/**
 * Map, from DataType to strings.
 * This is used when generating JSON.
 */
export declare let mapDataTypeToString: Map<EDataType, TDataTypeStr>;
/**
 * Map, from GeomType to int.
 * This is used when generating JSON.
 */
export declare let mapGeomTypeToTopoPathIndex: Map<EGeomType, 0 | 1>;
export declare let mapTTPathIndexToGeomType: Map<0 | 1, EGeomType>;
export declare let mapSTPathIndexToGeomType: Map<0 | 1, EGeomType>;
