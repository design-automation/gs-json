import * as gs from "./gs-json";
import * as td from "./test_data";
import {Arr} from "./arr";

// Testing methods the Groups Class, composed of 1 constructor and 17 methods
export function test_Groups_constructor():boolean{
	let m:gs.Model = new gs.Model(td.box_with_groups);
	return true;
}
export function test_Groups_getName():boolean{
	let m:gs.Model = new gs.Model();
	let grp:gs.IGroup = m.addGroup("test");
	if (grp.getName() != "test") {return false;}
	return true;
}
export function test_Groups_setName():boolean{
	let m:gs.Model = new gs.Model();
	let grp:gs.IGroup = m.addGroup("test1");
	grp.setName("test2");
	if (grp.getName() != "test2") {return false;}
	//if (m.getGroup("test2").getName() != "test2") {return false;} //FAILS, because:
	if (m.getGroup("test1").getName() != "test2") {return false;} //intial key test1 is required to access the latest group name.
	return true;
}
export function test_Groups_getParentGroup():boolean{
	let m:gs.Model = new gs.Model();
	let grp1:gs.IGroup = m.addGroup("test1");
	let grp2:gs.IGroup = m.addGroup("test2", "test1");
	if (grp2.getParentGroup() != "test1") {return false;}
	let grp3:gs.IGroup = m.addGroup("test3");
	let grp4:gs.IGroup = m.addGroup("test4", "test1");			
		if (grp1.getParentGroup() != null) {return false;}	
		if (grp2.getParentGroup() != "test1") {return false;}
		if (grp3.getParentGroup() != null) {return false;}
		if (grp4.getParentGroup() != "test1") {return false;}
	return true;
}
export function test_Groups_getChildGroups():boolean{
	let m:gs.Model = new gs.Model();
		let grp1:gs.IGroup = m.addGroup("test1");
			let grp2:gs.IGroup = m.addGroup("test2", "test1");
				let grp3:gs.IGroup = m.addGroup("test3");
					let grp4:gs.IGroup = m.addGroup("test4", "test1");			
	if (!Arr.equal(grp1.getChildGroups() , [grp2.getName(),grp4.getName()])){return false;}	
		if (!Arr.equal(grp2.getChildGroups() , [])){return false;}
			if (!Arr.equal(grp3.getChildGroups() , [])){return false;}
				if (!Arr.equal(grp4.getChildGroups() , [])){return false;}
	return true;
}
export function test_Groups_setParentGroup():boolean{
	let m:gs.Model = new gs.Model();
		let grp1:gs.IGroup = m.addGroup("test1");
			let grp2:gs.IGroup = m.addGroup("test2");
	grp2.setParentGroup("test1");
		if (grp2.getParentGroup() != "test1") {return false;}
	return true;
}
export function test_Groups_removeParentGroup():boolean{
	let m:gs.Model = new gs.Model();
		let grp1:gs.IGroup = m.addGroup("test1");
			let grp2:gs.IGroup = m.addGroup("test2");
	if (grp2.getParentGroup() != null) {return false;}
		grp2.setParentGroup("test1");
	if (grp2.getParentGroup() != "test1") {return false;}
		grp2.setParentGroup("test2");
	if (grp2.getParentGroup() != "test2") {return false;}
		grp2.removeParentGroup()
	if (grp2.getParentGroup() != null) {return false;}
	return true;
}

export function test_Groups_getObjIDs():boolean{
	let m:gs.Model = new gs.Model();
	let grp:gs.IGroup = m.addGroup("Group1");
				grp.addObjs([4,2,9,8]);
					if (!Arr.equal([4,2,9,8],grp.getObjIDs())){return false};
	return true;
}
export function test_Groups_addObj():boolean{
	let m:gs.Model = new gs.Model();
		let grp:gs.IGroup = m.addGroup("Group1");
			if (!Arr.equal([],grp.getObjIDs())){return false};
				grp.addObj(4);
					if (!Arr.equal([4],grp.getObjIDs())){return false};
					grp.addObj(2);
							if (!Arr.equal([4,2],grp.getObjIDs())){return false};
						grp.addObj(9);
								if (!Arr.equal([4,2,9],grp.getObjIDs())){return false};
							grp.addObj(8);
									if (!Arr.equal([4,2,9,8],grp.getObjIDs())){return false};
							grp.addObj(8);
							grp.addObj(8);
							grp.addObj(8);
							console.log(grp); // shows duplicates
	return true;
}
export function test_Groups_addObjs():boolean{
	let m:gs.Model = new gs.Model();
	let grp:gs.IGroup = m.addGroup("Group1");
			if (!Arr.equal([],grp.getObjIDs())){return false};
			grp.addObj(4);
				if (!Arr.equal([4],grp.getObjIDs())){return false};
				grp.addObjs([2,9,8]);
					if (!Arr.equal([4,2,9,8],grp.getObjIDs())){return false};				
	return true;
}
export function test_Groups_removeObj():boolean{
	let m:gs.Model = new gs.Model();
		let grp:gs.IGroup = m.addGroup("Group1");
			if (!Arr.equal([],grp.getObjIDs())){return false};
				grp.addObjs([4,2,9,8]);
					if (!Arr.equal([4,2,9,8],grp.getObjIDs())){return false};
						grp.removeObj(2);
							if (!Arr.equal([4,9,8],grp.getObjIDs())){return false};
							grp.removeObj(9);
								if (!Arr.equal([4,8],grp.getObjIDs())){return false};
	return true;
}
export function test_Groups_removeObjs():boolean{
	let m:gs.Model = new gs.Model();
		let grp:gs.IGroup = m.addGroup("Group1");
			if (!Arr.equal([],grp.getObjIDs())){return false};
				grp.addObjs([4,2,9,8]);
					if (!Arr.equal([4,2,9,8],grp.getObjIDs())){return false};
						grp.removeObjs([4,9]);
							if (!Arr.equal([2,8],grp.getObjIDs())){return false};
	return true;
}

export function test_Groups_getTopos():boolean{
	let m:gs.Model = new gs.Model(td.box);
	let g:gs.IGroup = m.addGroup("Box");
//	console.log(Arr.equal(g.getTopos(),[]));
		if(!Arr.equal(g.getTopos(),[])){return false;}
//
console.log(m.getGeom().getObj(0).getWires()[0].getGeomPath());
console.log(m.getGeom().getObj(0).getWires()[0].getGeom());
console.log(m.getGeom().getObj(0).getWires()[0].getGeomType());
	g.addTopo(m.getGeom().getObj(0).getWires()[0]);
//console.log(g);
	// console.log(m.getGeom().getObj(0).getWires()[0]);
	// console.log(g.getTopos(gs.EGeomType.wires));
	// g.addTopos(m.getGeom().getObj(0).getFaces());
//	console.log(g);	
	return true;
}
export function test_Groups_addTopo():boolean{
	let m:gs.Model = new gs.Model(td.box);
	let g:gs.IGroup = m.addGroup("test1");
	g.addTopo(m.getGeom().getObj(0).getWires()[0]);
	g.addTopos(m.getGeom().getObj(0).getFaces());

	// console.log("==================")
	// console.log(g)
	// console.log(g.topoToArray());
	return true;
}
export function test_Groups_addTopos():boolean{
	return true;
}
export function test_Groups_removeTopo():boolean{
	return true;
}
export function test_Groups_removeTopos():boolean{
	return true;
}


export function test_Groups_getPointIDs():boolean{
	return true;
}
export function test_Groups_addPoint():boolean{
	return true;
}
export function test_Groups_addPoints():boolean{
	return true;
}
export function test_Groups_removePoint():boolean{
	return true;
}
export function test_Groups_removePoints():boolean{
	return true;
}

export function test_Groups_getProps():boolean{
	return true;
}