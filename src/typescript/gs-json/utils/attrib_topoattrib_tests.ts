import * as gs from "./gs-json";
import * as td from "./test_data";

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
