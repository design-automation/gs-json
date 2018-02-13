"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Enum, the different types of geometric elements.
 * Objects and Points are entities (see subclasses of the Ent class).
 * Faces, Wires, Edges, and Vertices are topological components (see subclasses of the Topo class).
 * Attributes can be attached to all these elements.
 */
var EGeomType;
(function (EGeomType) {
    EGeomType[EGeomType["points"] = 0] = "points";
    EGeomType[EGeomType["vertices"] = 1] = "vertices";
    EGeomType[EGeomType["edges"] = 2] = "edges";
    EGeomType[EGeomType["wires"] = 3] = "wires";
    EGeomType[EGeomType["faces"] = 4] = "faces";
    EGeomType[EGeomType["objs"] = 5] = "objs";
})(EGeomType = exports.EGeomType || (exports.EGeomType = {}));
/**
 * Enum, the different data types for attributes.
 */
var EDataType;
(function (EDataType) {
    EDataType[EDataType["type_str"] = 0] = "type_str";
    EDataType[EDataType["type_num"] = 1] = "type_num";
    EDataType[EDataType["type_bool"] = 2] = "type_bool";
    EDataType[EDataType["type_str_arr"] = 3] = "type_str_arr";
    EDataType[EDataType["type_num_arr"] = 4] = "type_num_arr";
    EDataType[EDataType["type_bool_arr"] = 5] = "type_bool_arr";
})(EDataType = exports.EDataType || (exports.EDataType = {}));
/**
 * Map, from EObjType to string.
 * This is used when generating string representations of objects.
 */
exports.mapObjTypeToString = new Map([
    [0 /* acorn */, "acorn"],
    [1 /* ray */, "ray"],
    [11 /* rayTwo */, "rayTwo"],
    [2 /* plane */, "plane"],
    [3 /* circle */, "circle"],
    [4 /* ellipse */, "ellipse"],
    [6 /* hyperbola */, "hyperbola"],
    [5 /* parabola */, "parabola"],
    [100 /* polyline */, "polyline"],
    [101 /* line */, "line"],
    [120 /* nurbs_curve */, "nurbs_curve"],
    [121 /* bezier_curve */, "bezier_curve"],
    [200 /* polymesh */, "polymesh"],
    [220 /* nurbs_surface */, "nurbs_surface"],
    [221 /* bezier_surface */, "bezier_surface"],
]);
/**
 * Map, from string to EGeomType.
 * This is used when parsing JSON.
 */
exports.mapStringToGeomType = new Map([
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
exports.mapGeomTypeToString = new Map([
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
exports.mapStringToDataType = new Map([
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
exports.mapDataTypeToString = new Map([
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
exports.mapGeomTypeToTopoPathIndex = new Map([
    [EGeomType.faces, 1],
    [EGeomType.wires, 0],
    [EGeomType.edges, 1],
    [EGeomType.vertices, 0],
]);
exports.mapTTPathIndexToGeomType = new Map([
    [1, EGeomType.faces],
    [0, EGeomType.wires],
]);
exports.mapSTPathIndexToGeomType = new Map([
    [1, EGeomType.edges],
    [0, EGeomType.vertices],
]);
//# sourceMappingURL=enums.js.map