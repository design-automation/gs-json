import { TTreeData, ITopoPathData } from "./ifaces_json";
import { EGeomType } from "./enums";
/**
 * Class for storing Topo in a tree data structure.
 * This class is only used by the Kernel class.
 */
export declare class TopoTree {
    private _faces;
    private _wires;
    private _face_edges;
    private _face_vertices;
    private _wire_edges;
    private _wire_vertices;
    constructor(data?: TTreeData);
    hasTopo(path: ITopoPathData): boolean;
    addTopo(path: ITopoPathData): boolean;
    removeTopo(path: ITopoPathData): boolean;
    removeObj(id: number): boolean;
    getNumTopos(geom_type?: EGeomType): number;
    getTopos(geom_type?: EGeomType): ITopoPathData[];
    toArray(): TTreeData;
    fromArray(data: TTreeData): void;
}
