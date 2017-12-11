import * as gs from "./gs-json";
import * as td from "./test_data";

export function test_Attrib_constructor(): boolean {
    const m: gs.IModel = new gs.Model();
    const b: gs.IAttrib = m.addAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
    return true;
}

export function test_Attrib_getName(): boolean {
    const m: gs.IModel = new gs.Model();
    const b: gs.IAttrib = m.addAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
    if (b.getName() !== "test1" ) {return false; }
    return true;
}

export function test_Attrib_setName(): boolean {
    const m: gs.IModel = new gs.Model();
    const a: gs.IAttrib = m.addAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);

    a.setName("test2");
    if (a.getName() === "test1" ) {return false; }
    if (a.getName() !== "test2" ) {return false; }
    return true;
}

export function test_Attrib_getGeomType(): boolean {
    const m: gs.IModel = new gs.Model();
    const b: gs.IAttrib = m.addAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
    if (b.getGeomType() !== gs.EGeomType.objs) {return false; }
    return true;
}

export function test_Attrib_getObjDataType(): boolean {
    const m: gs.IModel = new gs.Model();
    const b: gs.IAttrib = m.addAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
    if (b.getDataType() !== gs.EDataType.type_num) {return false; }
    return true;
}

export function test_Attrib_getValue(): boolean {
    const m: gs.IModel = new gs.Model(td.box_with_attribs());
    const faces: gs.IFace[] = m.getGeom().getObj(0).getFaces();
    const attrib: gs.ITopoAttrib = m.getAttrib("test3", gs.EGeomType.faces) as gs.ITopoAttrib;
    if (attrib.getValue(faces[2].getTopoPath()) !== 22.0) {return false; }
    return true;
}

export function test_Attrib_setValue(): boolean {
    const m: gs.IModel = new gs.Model(td.box_with_attribs());
    const faces: gs.IFace[] = m.getGeom().getObj(0).getFaces();
    const attrib: gs.ITopoAttrib = m.getAttrib("faces_id", gs.EGeomType.faces) as gs.ITopoAttrib;
    attrib.setValue(faces[3].getTopoPath(), 1234);
    if (attrib.getValue(faces[3].getTopoPath()) !== 1234) {return false; }
    return true;
}

export function test_Attrib_count(): boolean {
    const m: gs.IModel = new gs.Model();
    const a1: number[] = [Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    const a2: number[] = [Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    const a3: number[] = [Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    const a4: number[] = [Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    // add 4 points
    m.getGeom().addPoint(a1);
    m.getGeom().addPoint(a2);
    m.getGeom().addPoint(a3);
    m.getGeom().addPoint(a4);
    // create a point attribute, all values should be null
    const b: gs.IAttrib = m.addAttrib("Color of points", gs.EGeomType.points, gs.EDataType.type_str);
    //if (b.count() !== 4) {return false; }
    return true;
}
