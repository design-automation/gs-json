/**
* Enum, the different types of geometric elements.
* Objects and Points are entities (see subclasses of the Ent class).
* Faces, Wires, Edges, and Vertices are topological components (see subclasses of the Topo class).
* Attributes can be attached to all these elements.
*/
export enum EGeomType {
    objs="objs",
    faces="faces",
    wires="wires", 
    edges="edges",
    vertices="vertices",
    points="points"
}
/**
* Enum, the different data types for attributes.
*/
export enum EDataType {
    type_str="string",
    type_num="number",
    type_bool="boolean",
    type_str_arr="string[]",
    type_num_arr="number[]",
    type_bool_arr="boolean[]",
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