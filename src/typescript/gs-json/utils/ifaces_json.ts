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
        objs?: any[];
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
    geom_type: "points" | "vertices" | "edges" | "wires" | "faces" | "objs"; //enum not working
    data_type: "string"|"number"|"boolean"|"string[]"|"number[]"|"boolean[]"; //enum not working
    values: any[];
}
/**
* Interface, for parsing JSON GroupData.
*/
export interface IGroupData {
    name: string;
    parent?:string;
    objs?: any[];
    props?: { key: string, value: any }
}
/**
* Interface, for parsing JSON SkinData.
*/
export interface ISkinData {
    images: string[];
    textures: string[];
    materials: any[];
}
