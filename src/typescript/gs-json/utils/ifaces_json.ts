import {EGeomType, EObjType, EDataType} from "./enums";

/**
 * Types, for parsing gs-json data.
 */
export type TPointsData = [number[], number[][]]; // can be xy or xyz
export type TObjData = [number[][], number[][], any[]];
export type TTree2Data = Array<[number, number[]]>; // obj_id, [ti]
export type TTree3Data = Array<[number, TTree2Data]>; // obj_id, [ti, [si]]
export type TTreeData = Array<TTree2Data|TTree3Data>;
/**
 * Interface, for parsing JSON ModelData.
 */
export interface IModelData {
    metadata: IMetadata;
    geom: IGeomData;
    attribs?: IAttribsData;
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
    points?: TPointsData;
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
    values?: any[]; // TODO
}

export interface IGroupData {
    name: string;
    parent?: string;
    objs?: number[];
    topos?: TTreeData;
    points?: number[];
    props?: Array<[string, any]>;
}

export interface ISkinData {
    images: string[];
    textures: string[];
    materials: any[];
}

export interface ITopoPathData {
    id: number;             // obj id
    tt: 0 | 1;              // topo type
    ti?: number;             // topo index
    st?: 0 | 1;              // sub topo-type
    si?: number;             // subtopo index
}

export interface IPointData {
    id: number;
    x: number;
    y: number;
    z: number;
}

export interface ITopoTree2 {
// constructor(model: ifs.IModel, data?: (number[][]|number[][][]); []);
    hasTopo(topo: ITopoPathData): boolean ;
    addTopo(topo: ITopoPathData): void ;
    removeTopo(topo: ITopoPathData): boolean ;
    removeObj(id: number): boolean;
    getTopos(geom_type?: EGeomType): ITopoPathData[] ;
    toArray(): TTreeData;
    fromArray(data: TTreeData): void ;
}
