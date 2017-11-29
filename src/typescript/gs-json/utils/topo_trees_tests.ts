import {Arr} from "./arr";
import * as ifs from "./ifaces_gs";
import {IModelData, IAttribData, IGroupData, ISkinData} from "./ifaces_json";
import {EGeomType, EDataType, EObjType, mapGeomTypeToNumber} from "./enums";
import {Geom, GeomPath} from "./geom";
import {Point,Polyline,Polymesh} from "./entities";
import {Vertex, Edge, Wire, Face} from "./topos";
import {Attrib} from "./attribs";
import {TopoTree} from "./topo_trees";
import {Model} from "./model";
import * as td from "./test_data";


// Tests for Class TopoTree
export function test_TopoTree_constructor(): boolean {
	let m:Model = new Model();
	// let grp:ifs.IGroup = m.addGroup("test1");
	// if(!Arr.equal(grp.getTopos(),[])){return false;}
	let t:ifs.ITopoTree = new TopoTree(m);	
	return true;}

export function test_TopoTree_hasTopo(): boolean{
		let m:Model = new Model(td.open_box());
			let g:ifs.IGroup = m.addGroup("Box");
				let f1:ifs.IFace = m.getGeom().getObj(0).getFaces()[0];
					let f2:ifs.IFace = m.getGeom().getObj(0).getFaces()[1];
						let f3:ifs.IFace = m.getGeom().getObj(0).getFaces()[2];
							let w1:ifs.IWire = m.getGeom().getObj(0).getWires()[0];
									if(	(g.getTopoTree().hasTopo(f1) == true || g.getTopoTree().hasTopo(f2) == true
										 || g.getTopoTree().hasTopo(f3) == true || g.getTopoTree().hasTopo(w1) == true)
										){return false;}
													g.addTopos([f1,f2,f3,w1]);
									if(	!(g.getTopoTree().hasTopo(f1) == true || g.getTopoTree().hasTopo(f2) == true
										 || g.getTopoTree().hasTopo(f3) == true || g.getTopoTree().hasTopo(w1) == true)
										){return false;}
	return true;}

export function test_TopoTree_addTopo(): boolean{
		let m:Model = new Model(td.open_box());
		let g:ifs.IGroup = m.addGroup("Box");
	let t:ifs.ITopoTree = g.getTopoTree();
			let f1:ifs.IFace = m.getGeom().getObj(0).getFaces()[0];
			if(t.hasTopo(f1) == true) {return false;}
		t.addTopo(f1);
			if(!(t.hasTopo(f1) == true)) {return false;}
	return true;}

export function test_TopoTree_removeTopo(): boolean{
		let m:Model = new Model(td.open_box());
		let g:ifs.IGroup = m.addGroup("Box");
	let t:ifs.ITopoTree = g.getTopoTree();
			let f1:ifs.IFace = m.getGeom().getObj(0).getFaces()[0];
			if(t.hasTopo(f1) == true) {return false;}
		t.addTopo(f1);
			if(!(t.hasTopo(f1) == true)) {return false;}
		t.removeTopo(f1);
			if(t.hasTopo(f1) == true) {return false;}
	return true;}

export function test_TopoTree_getTopos():boolean{
		let MD1:Model = new Model(td.open_box());
			let G1:ifs.IGroup = MD1.addGroup("Box");
				let T1:ifs.ITopoTree = G1.getTopoTree();
		let MD2:Model = new Model(td.open_box());
			let G2:ifs.IGroup = MD1.addGroup("Box");
				let T2:ifs.ITopoTree = G1.getTopoTree();
		let f1:ifs.IFace = MD1.getGeom().getObj(0).getFaces()[0];
			let f2:ifs.IFace = MD1.getGeom().getObj(0).getFaces()[1];
				let f3:ifs.IFace = MD1.getGeom().getObj(0).getFaces()[2];
			let f4:ifs.IFace = MD1.getGeom().getObj(0).getFaces()[3];
		let f5:ifs.IFace = MD1.getGeom().getObj(0).getFaces()[4];
				T1.addTopo(f1);
					T1.addTopo(f2);
						T1.addTopo(f3);
					T1.addTopo(f4);
				T1.addTopo(f5);
	for(let k:number = 0 ; k<T1.getTopos().length ; k++){T2.addTopo(T1.getTopos()[k]);}
	if(	!(T2.hasTopo(f1) && T2.hasTopo(f2) && T2.hasTopo(f3) && T2.hasTopo(f4) && T2.hasTopo(f5)) ) {return false;}
	return true;}

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