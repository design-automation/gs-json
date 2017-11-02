// interfaces for js-GSON

export interface IMetadata {
    filetype: "mobius";
    version: number;
    crs: any;
    location: string;
}
export interface IEntity {
    [index: number]: number|number[]|number[][];
}
export interface IAttribute {
    name: string;
    topology: "points"|"vertices"|"edges"|"wires"|"faces"|"shells";
    values: any[];
    map: number[]|number[][]|number[][][];
}
export interface ICollection {
    name: string;
    entities?: IEntity[];
    collections?: string[];
    properties?: { key: string, value: any };
}
export interface ISkin {
    images: string[];
    textures: string[];
    materials: any[];
}
export interface IgsJSON {
    metadata: IMetadata;
    geometry?: IEntity[];
    attributes?: IAttribute[];
    collections?: ICollection[];
    skins?: ISkin[];
}
