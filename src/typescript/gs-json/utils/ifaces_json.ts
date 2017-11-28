/**
* Types, for parsing gs-json data.
*/
export type TPosData = [number,number]; //can be xy or xyz
export type TObjData = [number[][],number[][],any[]];
export type TTree2Data = [number, number[]][]; // obj_id, [ti]
export type TTree3Data = [number, TTree2Data][];// obj_id, [ti, [si]]
export type TTreeData = (TTree2Data|TTree3Data)[];
/**
* Interface, for parsing JSON ModelData.
*/
export interface IModelData {
    metadata:IMetadata;
    geom: IGeomData;
    attribs?: IAttribsData,
    groups?: IGroupData[];
    skins?: ISkinData[];
}

export interface IMetadata {
    filetype: "gs-json";
    version: string;
    crs?: any;
    location?: string;
}

export interface IGeomData {
    points?: [number[],number[][]];
    objs?: TObjData[];
}

export interface IAttribsData {
    points?: IAttribData[];
    vertices?: IAttribData[];
    edges?: IAttribData[];
    wires?: IAttribData[];
    faces?: IAttribData[];
    objs?: IAttribData[];
}

export interface IAttribData {
    name: string;
    geom_type: "points" | "vertices" | "edges" | "wires" | "faces" | "objs";
    data_type: "string"|"number"|"boolean"|"string[]"|"number[]"|"boolean[]";
    values?: any[];//TODO
}

export interface IGroupData {
    name: string;
    parent?:string;
    objs?: number[];
    topos?:TTreeData;
    points?:number[];
    props?: [string, any][];
}


export interface ISkinData {
    images: string[];
    textures: string[];
    materials: any[];
}
