/**
* Types, for parsing JSON ModelData.
*/
type UTGeomType = "points" | "vertices" | "edges" | "wires" | "faces" | "objs";
type UTDataType = "string"|"number"|"boolean"|"string[]"|"number[]"|"boolean[]";
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
    objs?: [number[][],number[][],any[]][];
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
    geom_type: UTGeomType;
    data_type: UTDataType;
    values?: any[];
}

export interface IGroupData {
    name: string;
    parent?:string;
    objs?: number[];
    topos?:(number[][]|number[][][])[];
    points?:number[];
    props?: any[];
}


export interface ISkinData {
    images: string[];
    textures: string[];
    materials: any[];
}
