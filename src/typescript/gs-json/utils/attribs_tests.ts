import * as gs from "./gs-json";
import {Attrib} from "./attribs";

export function test_xxx():boolean {
    return true;
}
export function test_constructor():boolean{
	let m:gs.IModel = new gs.Model();	
	let b:gs.IAttrib = m.addAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);	
	return true;
}

export function test_getName():boolean {
	let m:gs.IModel = new gs.Model();
	let b:gs.IAttrib = m.addAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
	if (b.getName() != "test1" ) {return false;};
    return true;
}

export function test_setName():boolean {
	let m:gs.IModel = new gs.Model();
	let a:gs.IAttrib = m.addAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
	a.setName('test2');
	if (a.getName() == "test1" ) {return false;};
	if (a.getName() != "test2" ) {return false;};
    return true;
}

export function test_getGeomType():boolean {
	let m:gs.IModel = new gs.Model();
	let b:gs.IAttrib = m.addAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
	// if(b.getGeomType() == null) {return false;};
	// if(b.getGeomType() != gs.EGeomType.objs) {return false;};
	// To redefine by taking in consideration the split off;
    return true;
}

export function test_getObjDataType():boolean {
	let m:gs.IModel = new gs.Model();
	let b:gs.IAttrib = m.addAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
	// if(b.getObjDataType() == null) {return false;};
	// if(b.getObjDataType() != gs.EDataType.type_num) {return false;};
	// To redefine by taking in consideration the split off;
    return true;
}

export function test_getValue():boolean {
	//console.log("to be implemented");
    return true;
}

export function test_setValue():boolean {
	//console.log("to be implemented");
    return true;
}

export function test_count():boolean {
	let m:gs.IModel = new gs.Model();
	let a1:number[] = [Math.floor(Math.random()*10),Math.floor(Math.random()*10),Math.floor(Math.random()*10)] ;
	let a2:number[] = [Math.floor(Math.random()*10),Math.floor(Math.random()*10),Math.floor(Math.random()*10)] ;
	let a3:number[] = [Math.floor(Math.random()*10),Math.floor(Math.random()*10),Math.floor(Math.random()*10)] ;
	let a4:number[] = [Math.floor(Math.random()*10),Math.floor(Math.random()*10),Math.floor(Math.random()*10)] ;
	//add 4 points
	m.getGeom().addPoint(a1);
	m.getGeom().addPoint(a2);
	m.getGeom().addPoint(a3);
	m.getGeom().addPoint(a4);
	//create a point attribute, all values should be null
	let b:gs.IAttrib = m.addAttrib("Color of points", gs.EGeomType.points, gs.EDataType.type_str);
	if(b.count() != 4){return false;}
    return true;
}