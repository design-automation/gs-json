import * as gs from "./gs-json";

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
	b.getName();
    return true;
}

export function test_setName():boolean {
	let m:gs.IModel = new gs.Model();
	let a:gs.IAttrib = m.addAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
	a.setName('test2');
    return true;
}

export function test_getGeomType():boolean {
	let m:gs.IModel = new gs.Model();
	let b:gs.IAttrib = m.addAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
	b.getGeomType();
    return true;
}

export function test_getObjDataType():boolean {
	let m:gs.IModel = new gs.Model();
	let b:gs.IAttrib = m.addAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
	b.getObjDataType();
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
	let b:gs.IAttrib = m.addAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
	b.count();
    return true;
}

