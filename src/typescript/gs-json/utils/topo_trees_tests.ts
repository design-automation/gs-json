import {Arr} from "./arr";
import * as ifs from "./ifaces_gs";
import {IModelData, IAttribData, IGroupData, ISkinData} from "./ifaces_json";
import {EGeomType, EDataType, EObjType, mapGeomTypeToNumber} from "./enums";
import {Geom, GeomPath} from "./geom";
import {Point,Polyline,Polymesh} from "./entities";
import {Vertex, Edge, Wire, Face} from "./topos";
import {Attrib} from "./attribs";

// Tests for Class TopoTree
export function test_TopoTree_constructor(): boolean {return true;}
export function test_TopoTree_hasTopo(): boolean{return true;}
export function test_TopoTree_addTopo(): boolean{return true;}
export function test_TopoTree_removeTopo(): boolean{return true;}
export function test_TopoTree_getTopos():boolean{return true;}
export function test_TopoTree_toArray():boolean{return true;}
export function test_TopoTree_fromArray():boolean{return true;}

// Tests for Class TopoTreeBranch
export function test_TopoTreeBranch_constructor():boolean{return true;}
export function test_TopoTreeBranch_has():boolean{return true;}
export function test_TopoTreeBranch_add():boolean{return true;}
export function test_TopoTreeBranch_remove():boolean{return true;}
export function test_TopoTreeBranch_toPaths():boolean{return true;}
export function test_TopoTreeBranch_toArray():boolean{return true;}
export function test_TopoTreeBranch_fromArray():boolean{return true;}

// Tests for Class SubtopoTreeBranch
export function test_SubtopoTreeBranch_constructor():boolean{return true;}
export function test_SubtopoTreeBranch_has():boolean{return true;}
export function test_SubtopoTreeBranch_add():boolean{return true;}
export function test_SubtopoTreeBranch_remove():boolean{return true;}
export function test_SubtopoTreeBranch_toPaths():boolean{return true;}
export function test_SubtopoTreeBranch_toArray():boolean{return true;}
export function test_SubtopoTreeBranch_fromArray():boolean{return true;}

// // Tests for Class TopoTree
// export function test_TopoTree_constructor(model:ifs.IModel, data?:(number[][]|number[][][])[]) {return true;}
// export function test_TopoTree_hasTopo(topo:ifs.ITopo): boolean{return true;}
// export function test_TopoTree_addTopo(topo:ifs.ITopo): boolean{return true;}
// export function test_TopoTree_removeTopo(topo:ifs.ITopo): boolean{return true;}
// export function test_TopoTree_getTopos(geom_type?:EGeomType):boolean{return true;}
// export function test_TopoTree_toArray():boolean{return true;}
// export function test_TopoTree_fromArray(data:(number[][]|number[][][])[]):boolean{return true;}

// // Tests for Class TopoTreeBranch
// export function test_TopoTreeBranch_constructor(data?:number[][]):boolean{return true;}
// export function test_TopoTreeBranch_has(id:number, ti:number):boolean{return true;}
// export function test_TopoTreeBranch_add(id:number, ti:number):boolean{return true;}
// export function test_TopoTreeBranch_remove(id:number, ti:number):boolean{return true;}
// export function test_TopoTreeBranch_toPaths(tt:EGeomType.wires|EGeomType.faces):boolean{return true;}
// export function test_TopoTreeBranch_toArray():boolean{return true;}
// export function test_TopoTreeBranch_fromArray(arr1:number[][]):boolean{return true;}

// // Tests for Class SubtopoTreeBranch
// export function test_SubtopoTreeBranch_constructor(data?:number[][][]):boolean{return true;}
// export function test_SubtopoTreeBranch_has(id:number, ti:number, si:number):boolean{return true;}
// export function test_SubtopoTreeBranch_add(id:number, ti:number, si:number):boolean{return true;}
// export function test_SubtopoTreeBranch_remove(id:number, ti:number, si:number):boolean{return true;}
// export function test_SubtopoTreeBranch_toPaths(tt:EGeomType.wires|EGeomType.faces, st:EGeomType.vertices|EGeomType.edges):boolean{return true;}
// export function test_SubtopoTreeBranch_toArray():boolean{return true;}
// export function test_SubtopoTreeBranch_fromArray(arr1:number[][][]):boolean{return true;}