import * as gs from "./gs-json";
import * as td from "./test_data";

import {Attrib} from "./attribs";


export function test_Attrib_constructor():boolean{
	let m:gs.IModel = new gs.Model();	
	let b:gs.IAttrib = m.addAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);	
	return true;
}

export function test_Attrib_getName():boolean {
	let m:gs.IModel = new gs.Model();
	let b:gs.IAttrib = m.addAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
	if (b.getName() != "test1" ) {return false;}
    return true;
}

export function test_Attrib_setName():boolean {
	let m:gs.IModel = new gs.Model();
	let a:gs.IAttrib = m.addAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
	a.setName('test2');
	if (a.getName() == "test1" ) {return false;}
	if (a.getName() != "test2" ) {return false;}
    return true;
}

export function test_Attrib_getGeomType():boolean {
	let m:gs.IModel = new gs.Model();
	let b:gs.IAttrib = m.addAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
	if(b.getGeomType() != gs.EGeomType.objs) {return false;}
    return true;
}

export function test_Attrib_getObjDataType():boolean {
	let m:gs.IModel = new gs.Model();
	let b:gs.IAttrib = m.addAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
	if(b.getObjDataType() != gs.EDataType.type_num) {return false;};
    return true;
}

export function test_Attrib_getValue():boolean {
	let m:gs.IModel = new gs.Model(td.box_with_attribs());
	let faces:gs.IFace[] = m.getGeom().getObj(0).getFaces();
	if (m.getAttrib("test3", gs.EGeomType.faces).getValue(faces[2].getGeomPath()) != 22.0) {return false;}
    return true;
}

export function test_Attrib_setValue():boolean {
	let m:gs.IModel = new gs.Model(td.box_with_attribs());
	let faces:gs.IFace[] = m.getGeom().getObj(0).getFaces();
	m.getAttrib("shell_id", gs.EGeomType.faces).setValue(faces[3].getGeomPath(), 1234);
	if (m.getAttrib("shell_id", gs.EGeomType.faces).getValue(faces[3].getGeomPath()) != 1234) {return false;}
    return true;
}

export function test_Attrib_count():boolean {
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