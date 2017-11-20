import * as gsj from "./gs-json";
import {Model} from "./model";
import {Geom} from "./geom";
import * as ifs from "./interfaces";
import {Attrib} from "./attribs";

export function test_xxx():boolean {
    return true;
}

export function test_constructor():boolean{
	let m:Model = new Model();
	let a:Geom = new Geom(m);
	let b:Attrib = new Attrib(m, "test1", ifs.EGeomType.objs, ifs.EDataType.type_num, [2,2,3], [4,4,6] );
	return true;
}

export function test_getName():boolean {
	let m:Model = new Model();
	let a:Geom = new Geom(m);
	let b:Attrib = new Attrib(m, "test1", ifs.EGeomType.objs, ifs.EDataType.type_num, [2,2,3], [4,4,6] );
	b.getName();
    return true;
}

export function test_setName():boolean {
	let m:Model = new Model();
	let a:Geom = new Geom(m);
	let b:Attrib = new Attrib(m, "test1", ifs.EGeomType.objs, ifs.EDataType.type_num, [2,2,3], [4,4,6] );
	b.setName('test2');
    return true;
}

export function test_getGeomType():boolean {
	let m:Model = new Model();
	let a:Geom = new Geom(m);
	let b:Attrib = new Attrib(m, "test1", ifs.EGeomType.objs, ifs.EDataType.type_num, [2,2,3], [4,4,6] );
	b.getGeomType();
    return true;
}

export function test_getDataType():boolean {
	let m:Model = new Model();
	let a:Geom = new Geom(m);
	let b:Attrib = new Attrib(m, "test1", ifs.EGeomType.objs, ifs.EDataType.type_num, [2,2,3], [4,4,6] );
	b.getDataType();
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
	let m:Model = new Model();
	let a:Geom = new Geom(m);
	let b:Attrib = new Attrib(m, "test1", ifs.EGeomType.objs, ifs.EDataType.type_num, [2,2,3], [4,4,6] );
	b.count();
    return true;
}

