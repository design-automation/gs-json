import * as gs from "./gs-json";
import * as test_data from "./test_data";

export function test_setData2(url: string): boolean {
    const xmlhttp = new XMLHttpRequest();
    let data: gs.IModelData;
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            data = JSON.parse(this.responseText);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    return true;
}

export function test_Model_constructor(): boolean {
    let model: gs.IModel ;
    model = new gs.Model(test_data.open_box());

    // model with no attribs
    if (model.getGeom().numObjs() !== 1) {return false; }
    if (model.getGeom().numPoints() !== 8) {return false; }
    if (model.getGeom().getObj(0).numFaces() !== 5) {return false; }
    if (! gs.Arr.equal(
    model.getGeom().getObj(0).getFaces()[4].getVertices().
    map((v, i) => v.getPoint().getID()), [5, 6, 7, 4])) {return false; }
    // model with attribs
    model = new gs.Model(test_data.box_with_attribs());
    const attribs: gs.IAttrib[] = model.getAttribs(gs.EGeomType.vertices);
    if (attribs[0].getName() !== "test2") {return false; }
    if (model.getGeom().getObj(0).getFaces()[0].getAttribValue("test3") !== 2.0) {return false; }

    // model with groups
    model = new gs.Model(test_data.box_with_groups());
    model.getGroups();
    const grp: gs.IGroup = model.getGroup("building_obj");
    return true;
}

export function test_Model_getGeom(): boolean {
    const m: gs.Model = new gs.Model(test_data.open_box());
    const g: gs.IGroup = m.addGroup("Box");
    const f1: gs.IFace = m.getGeom().getObj(0).getFaces()[0];
    if (f1.getObjID() !== 0) {return false;}
    return true;
}

export function test_Model_getAttribs(): boolean {
    const m: gs.Model = new gs.Model(test_data.box_with_attribs());

    const e1: Array<gs.IEntAttrib|gs.ITopoAttrib> = m.getAttribs(gs.EGeomType.points);
    const e2: Array<gs.IEntAttrib|gs.ITopoAttrib> = m.getAttribs(gs.EGeomType.vertices);
    const e3: Array<gs.IEntAttrib|gs.ITopoAttrib> = m.getAttribs(gs.EGeomType.faces);
    const e4: Array<gs.IEntAttrib|gs.ITopoAttrib> = m.getAttribs(gs.EGeomType.wires);
    const e5: Array<gs.IEntAttrib|gs.ITopoAttrib> = m.getAttribs(gs.EGeomType.edges);
    const e6: Array<gs.IEntAttrib|gs.ITopoAttrib> = m.getAttribs(gs.EGeomType.objs);

    if (!(e1[0].getName() === "test1")) {return false; }
    if (!(e2[0].getName() === "test2")) {return false; }
    if (!(e3[0].getName() === "faces_id")) {return false; }
    if (!(e3[1].getName() === "test3")) {return false; }
    if (!(e4[0].getName() === "wires_id")) {return false; }
    if (!(e5[0].getName() === "edge_id")) {return false; }
    if (!(e6[0].getName() === "obj_id")) {return false; }

    return true;
}

export function test_Model_getAttrib(): boolean {
    const m: gs.Model = new gs.Model(test_data.box_with_attribs());

    const e1: gs.IEntAttrib|gs.ITopoAttrib = m.getAttrib("test1", gs.EGeomType.points);
    const e2: gs.IEntAttrib|gs.ITopoAttrib = m.getAttrib("test2", gs.EGeomType.vertices);
    const e3: gs.IEntAttrib|gs.ITopoAttrib = m.getAttrib("faces_id", gs.EGeomType.faces);
    const e3bis: gs.IEntAttrib|gs.ITopoAttrib = m.getAttrib("test3", gs.EGeomType.faces);
    const e4: gs.IEntAttrib|gs.ITopoAttrib = m.getAttrib("wires_id", gs.EGeomType.wires);
    const e5: gs.IEntAttrib|gs.ITopoAttrib = m.getAttrib("edge_id", gs.EGeomType.edges);
    const e6: gs.IEntAttrib|gs.ITopoAttrib = m.getAttrib("obj_id", gs.EGeomType.objs);

    if (!(e1.getName() === "test1")) {return false; }
    if (!(e2.getName() === "test2")) {return false; }
    if (!(e3.getName() === "faces_id")) {return false; }
    if (!(e3bis.getName() === "test3")) {return false; }
    if (!(e4.getName() === "wires_id")) {return false; }
    if (!(e5.getName() === "edge_id")) {return false; }
    if (!(e6.getName() === "obj_id")) {return false; }

    return true;
}

export function test_Model_addAttrib(): boolean {
    const m1: gs.Model = new gs.Model(test_data.box_with_attribs());
    const e1: gs.IEntAttrib|gs.ITopoAttrib = m1.getAttrib("test1", gs.EGeomType.points);
    const m2: gs.Model = new gs.Model();
    const e2: gs.IEntAttrib|gs.ITopoAttrib = m2.addAttrib(e1.getName(), e1.getGeomType(), e1.getDataType());
    if (!(e2.getName() === e1.getName())) {return false; }
    return true;
}

export function test_Model_delAttrib(): boolean {
    const m1: gs.Model = new gs.Model(test_data.box_with_attribs());
    const e1: gs.IEntAttrib|gs.ITopoAttrib = m1.getAttrib("test1", gs.EGeomType.points);
    const m2: gs.Model = new gs.Model();
    const e2: gs.IEntAttrib|gs.ITopoAttrib = m2.addAttrib(e1.getName(), e1.getGeomType(), e1.getDataType());
    if (!(e2.getName() === e1.getName())) {return false; }
    const eType: gs.EGeomType = e1.getGeomType();
    m2.delAttrib(e1.getName(), e1.getGeomType());
    if (!(gs.Arr.equal(m2.getAttribs(eType), []))) {return false; }
    return true;
}

export function test_Model_getGroups(): boolean {
    const m: gs.Model = new gs.Model();
    if (!(gs.Arr.equal(m.getGroups(), []))) {return false; }
    const g1: gs.IGroup = m.addGroup("G1");
    const g2: gs.IGroup = m.addGroup("G2");
    const g3: gs.IGroup = m.addGroup("G3");
    const G: gs.IGroup[] = [g1, g2, g3];
    if (!(m.getGroups()[0] === G[0])) {return false; }
    if (!(m.getGroups()[1] === G[1])) {return false; }
    if (!(m.getGroups()[2] === G[2])) {return false; }
    return true;
}

export function test_Model_getGroup(): boolean {
    const m: gs.Model = new gs.Model(test_data.open_box());
    const g: gs.IGroup = m.addGroup("Box"); // No group in Box
    if (!( m.getGroup("Alpha") === undefined)) {return false; }
    if (!( m.getGroup("Box") === g)) {return false; }
    return true;
}

export function test_Model_addGroup(): boolean {
    const m: gs.Model = new gs.Model();
    if (!( m.getGroup("Group1") === undefined)) {return false; }
    const g: gs.IGroup = m.addGroup("Group1");
    if (!( m.getGroup("Group1") === g)) {return false; }
    return true;
}

export function test_Model_hasGroup(): boolean {
    const m: gs.Model = new gs.Model();
    if (m.hasGroup("First_Group")) {return false; }
    m.addGroup("First_Group");
    if (!m.hasGroup("First_Group")) {return false; }
    return true;
}

export function test_Model_delGroup(): boolean {
    const m: gs.Model = new gs.Model();
    if (m.hasGroup("First_Group")) {return false; }
    m.addGroup("First_Group");
    if (!m.hasGroup("First_Group")) {return false; }
    m.delGroup("First_Group");
    if (m.hasGroup("First_Group")) {return false; }
    if (!( m.getGroup("First_Group") === undefined)) {return false; }
    return true;
}

export function test_Model_purgePoints(): boolean { // OPTIONAL testing as of now
    return true;
}

export function test_Model_purgeNulls(): boolean { // OPTIONAL testing as of now
    return true;
}

export function test_Model_validateModel(): boolean { // OPTIONAL testing as of now
    return true;
}
