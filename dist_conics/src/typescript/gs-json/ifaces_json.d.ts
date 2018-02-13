import { TGeomTypeStr, TDataTypeStr } from "./enums";
/**
 * Types, for parsing gs-json data.
 */
export declare type TPointsData = [number[], [number, number, number][]];
export declare type TObjData = [number[][], number[][], any[]];
export declare type TTree2Data = Array<[number, number[]]>;
export declare type TTree3Data = Array<[number, TTree2Data]>;
export declare type TTreeData = Array<TTree2Data | TTree3Data>;
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
    uuid: string;
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
    geom_type: TGeomTypeStr;
    data_type: TDataTypeStr;
    values: any[];
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
    id: number;
    tt: (0 | 1);
    ti?: number;
    st?: (0 | 1);
    si?: number;
}
export interface IPointData {
    id: number;
    x: number;
    y: number;
    z: number;
}
