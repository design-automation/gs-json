/**
* Types, for parsing JSON ModelData.
*/
type UTGeomType = "points" | "vertices" | "edges" | "wires" | "faces" | "objs";
type UTDataType = "string"|"number"|"boolean"|"string[]"|"number[]"|"boolean[]";
type UT_v_or_e_subpath = [(0 | 1)] | [(0 | 1) | number] | [(0 | 1) | number | number[]];
type UT_v_or_e_path = [number] | [number, UT_v_or_e_subpath[]];
type UT_f_or_w_path = [number]|[number, number[]];
/**
* Interface, for parsing JSON ModelData.
*/
export interface IModelData {
    metadata: {
        filetype: "gs-json";
        version: string;
        crs?: any;
        location?: string;
    },
    geom: {
        points?: [number[],number[][]];
        objs?: [number[][],number[][],any[]][];
    },
    attribs?: {
        points?: IAttribData[];
        vertices?: IAttribData[];
        edges?: IAttribData[];
        wires?: IAttribData[];
        faces?: IAttribData[];
        objs?: IAttribData[];
    },
    groups?: IGroupData[];
    skins?: ISkinData[];
}
/**
* Interface, for parsing JSON AttribData.
*/
export interface IAttribData {
    name: string;
    geom_type: UTGeomType;
    data_type: UTDataType;
    values: any[];
}
/**
* Interface, for parsing JSON GroupData.
*/
export interface IGroupData {
    name: string;
    parent?:string;
    objs?: number[];
    faces?:UT_f_or_w_path[];
    wires?:UT_f_or_w_path[];
    edges?:UT_v_or_e_path[];
    vertices?:UT_v_or_e_path[];
    points?:number[];
    topos?:any[];
    props?: IPropData
}
/**
* Interface, for parsing JSON PropData.
*/
export interface IPropData { [key: string]: any }
/**
* Interface, for parsing JSON SkinData.
*/
export interface ISkinData {
    images: string[];
    textures: string[];
    materials: any[];
}
