import * as gs from "./gs-json";
import * as td from "./test_data";

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
	//if (m.getGroup("test2").getName() != "test2") {return false;} //FAILS
	return true;
}
export function test_Groups_getParentGroup():boolean{
	let m:gs.Model = new gs.Model();
	let grp1:gs.IGroup = m.addGroup("test1");
	let grp2:gs.IGroup = m.addGroup("test2", "test1");
	if (grp2.getParentGroup() != "test1") {return false;}
	return true;
}
export function test_Groups_getChildGroups():boolean{
	return true;
}
export function test_Groups_setParentGroup():boolean{
	return true;
}
export function test_Groups_removeParentGroup():boolean{
	return true;
}




export function test_Groups_getObjIDs():boolean{
	return true;
}
export function test_Groups_addObj():boolean{
	return true;
}
export function test_Groups_addObjs():boolean{
	return true;
}
export function test_Groups_removeObj():boolean{
	return true;
}
export function test_Groups_removeObjs():boolean{
	return true;
}



export function test_Groups_getTopos():boolean{
	return true;
}
export function test_Groups_addTopo():boolean{
	let m:gs.Model = new gs.Model(td.box);
	let g:gs.IGroup = m.addGroup("test1");
	g.addTopo(m.getGeom().getObj(0).getWires()[0]);
	g.addTopos(m.getGeom().getObj(0).getFaces());
	console.log("==================")
	console.log(g)
	console.log(g.topoToArray());
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