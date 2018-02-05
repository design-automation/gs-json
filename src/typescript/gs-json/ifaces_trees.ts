import {EGeomType} from "./enums";
import {TTreeData, TTree2Data, TTree3Data, ITopoPathData} from "./ifaces_json";

// =================== INTERFACES for TopoTree ===================
// ITopoTree, ITreeBranch2, ITreeBranch3

/**
 * Interface, for TopTree class.
 */

export interface ITopoTree {
    hasTopo(topo: ITopoPathData): boolean ;
    addTopo(topo: ITopoPathData): boolean ;
    removeTopo(topo: ITopoPathData): boolean ;
    removeObj(id: number): boolean;
    getNumTopos(geom_type?: EGeomType): number ;
    getTopos(geom_type?: EGeomType): ITopoPathData[] ;
    toArray(): TTreeData;
    fromArray(data: TTreeData): void ;
}

/**
 * Interface, for TopoTreeBranch class.
 */
export interface ITreeBranch2 {
    has(a: number, b: number): boolean;
    add(a: number, b: number): boolean;
    remove(a: number, b?: number): boolean;
    flatten(): number[][];
    toArray(): TTree2Data;
    fromArray(arr1: TTree2Data): void;
}

/**
 * Interface, for SubtopoTreeBranch class.
 */
export interface ITreeBranch3 {
    has(a: number, b: number, c: number): boolean;
    add(a: number, b: number, c: number): boolean;
    remove(a: number, b?: number, c?: number): boolean;
    flatten(): number[][];
    toArray(): TTree3Data;
    fromArray(arr: TTree3Data): void;
}
