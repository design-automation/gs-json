import * as gs from "./_export";
import {Arr} from "./arr";
import * as td from "./test_data";


export function test_Model_constructor(): boolean {
    let model: gs.IModel = new gs.Model(td.open_box());
    // model with no attribs
    if (model.getGeom().numObjs() !== 1) {return false; }
    if (model.getGeom().numPoints() !== 8) {return false; }
    if (model.getGeom().getObj(0).numFaces() !== 5) {return false; }
    if (! Arr.equal(
            model.getGeom().getObj(0).getFaces()[4].getVertices().map((v, i) => v.getPoint().getID()),
            [5, 6, 7, 4])) {
        return false;
    }

    // model with attribs
    model = new gs.Model(td.box_with_attribs());
    const attribs: gs.IAttrib[] = model.findAttribs(gs.EGeomType.vertices);
    if (attribs[0].getName() !== "test2") {return false; }
    const test3: gs.ITopoAttrib = model.getTopoAttrib("test3", gs.EGeomType.faces);
    if (model.getGeom().getObj(0).getFaces()[0].getAttribValue(test3) !== 2.0) {return false; }

    // model with groups
    model = new gs.Model(td.box_with_groups());
    model.getAllGroups();
    const grp: gs.IGroup = model.getGroup("building_obj");

    // save the data to JSON, the read it back again
    const my_model: gs.IModel = new gs.Model();
    const group: gs.IGroup = my_model.addGroup("test");
    const myg: gs.IGeom = my_model.getGeom();
    const p1: gs.IPoint = myg.addPoint([1,2,3]);
    const p2: gs.IPoint = myg.addPoint([4,5,6]);
    const p3: gs.IPoint = myg.addPoint([6,2,9]);
    const p4: gs.IPoint = myg.addPoint([1,2,7]);
    const p5: gs.IPoint = myg.addPoint([5,6,3]);
    p1.addToGroup(group);
    group.addPoints([p3, p4]);
    const pline: gs.IPolyline  = myg.addPolyline([p1,p2,p3,p4,p5], false);
    group.addObj(pline);
    const model_string: string = my_model.toJSON();
    const model_data: gs.IModelData = JSON.parse(model_string) as gs.IModelData;
    //console.log("TEST", model_data);
    let model2: gs.IModel = new gs.Model(model_data);
    const group2: gs.IGroup = model2.getGroup("test");
    if (group2 === undefined) {return false;}
    if (group2.getPoints().length !== 3) {return false;}
    if (group2.getObjs().length !== 1) {return false;}
    //console.log("TEST2", model2);
    return true;
}

export function test_Model_getGeom(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    const g: gs.IGroup = m.addGroup("Box");
    const f1: gs.IFace = m.getGeom().getObj(0).getFaces()[0];
    if (f1.getObjID() !== 0) {return false;}
    return true;
}

export function test_Model_findAttribs(): boolean {
    const m: gs.Model = new gs.Model(td.box_with_attribs());
    const e1: gs.IEntAttrib[] = m.findAttribs(gs.EGeomType.points) as gs.IEntAttrib[];
    const e2: gs.ITopoAttrib[] = m.findAttribs(gs.EGeomType.vertices) as gs.ITopoAttrib[];
    const e3: gs.ITopoAttrib[] = m.findAttribs(gs.EGeomType.faces) as gs.ITopoAttrib[];
    const e4: gs.ITopoAttrib[] = m.findAttribs(gs.EGeomType.wires) as gs.ITopoAttrib[];
    const e5: gs.ITopoAttrib[] = m.findAttribs(gs.EGeomType.edges) as gs.ITopoAttrib[];
    const e6: gs.IEntAttrib[] = m.findAttribs(gs.EGeomType.objs) as gs.IEntAttrib[];
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
    const m: gs.Model = new gs.Model(td.box_with_attribs());
    const e1: gs.IEntAttrib = m.getEntAttrib("test1", gs.EGeomType.points);
    const e2: gs.ITopoAttrib = m.getTopoAttrib("test2", gs.EGeomType.vertices);
    const e3: gs.ITopoAttrib = m.getTopoAttrib("faces_id", gs.EGeomType.faces);
    const e3bis: gs.ITopoAttrib = m.getTopoAttrib("test3", gs.EGeomType.faces);
    const e4: gs.ITopoAttrib = m.getTopoAttrib("wires_id", gs.EGeomType.wires);
    const e5: gs.ITopoAttrib = m.getTopoAttrib("edge_id", gs.EGeomType.edges);
    const e6: gs.IEntAttrib = m.getEntAttrib("obj_id", gs.EGeomType.objs);
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
    const m1: gs.Model = new gs.Model(td.box_with_attribs());
    const e1: gs.IEntAttrib = m1.getEntAttrib("test1", gs.EGeomType.points);
    const m2: gs.Model = new gs.Model();
    const e2: gs.IEntAttrib = m2.addEntAttrib(e1.getName(), e1.getGeomType(), e1.getDataType());
    if (!(e2.getName() === e1.getName())) {return false; }
    return true;
}

export function test_Model_delAttrib(): boolean {
    const m1: gs.Model = new gs.Model(td.box_with_attribs());
    const a1: gs.IEntAttrib = m1.getEntAttrib("test1", gs.EGeomType.points);
    if (a1.getName() !== "test1") {return false; }
    if(!m1.delAttrib(a1)) {return false;}
    if(m1.hasAttrib(a1)) {return false;}
    return true;
}

export function test_Model_getGroups(): boolean {
    const m: gs.Model = new gs.Model();
    if (!(Arr.equal(m.getAllGroups(), []))) {return false; }
    const g1: gs.IGroup = m.addGroup("G1");
    const g2: gs.IGroup = m.addGroup("G2");
    const g3: gs.IGroup = m.addGroup("G3");
    const G: gs.IGroup[] = [g1, g2, g3];
    if (m.getAllGroups()[0].getName() !== G[0].getName()) {return false; }
    if (m.getAllGroups()[1].getName() !== G[1].getName()) {return false; }
    if (m.getAllGroups()[2].getName() !== G[2].getName()) {return false; }
    return true;
}

export function test_Model_getGroup(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    const g: gs.IGroup = m.addGroup("Box"); // No group in Box
    if (!( m.getGroup("Alpha") === null)) {return false; }
    if (!( m.getGroup("Box").getName() === "Box")) {return false; }
    return true;
}

export function test_Model_addGroup(): boolean {
    const m: gs.Model = new gs.Model();
    if (!( m.getGroup("Group1") === null)) {return false; }
    const g: gs.IGroup = m.addGroup("Group1");
    if (!( m.getGroup("Group1").getName() === "Group1")) {return false; }
    return true;
}

export function test_Model_hasGroup(): boolean {
    const m: gs.Model = new gs.Model();
    const g1: gs.IGroup = m.addGroup("First_Group");
    if (!m.hasGroup(g1)) {return false; }
    m.delGroup(g1);
    if (m.hasGroup(g1)) {return false; }
    return true;
}

export function test_Model_delGroup(): boolean {
    const m: gs.Model = new gs.Model();
    const g1: gs.IGroup = m.addGroup("First_Group");
    if (!m.hasGroup(g1)) {return false; }
    m.delGroup(g1);
    if (m.hasGroup(g1)) {return false; }
    return true;
}

export function test_Model_purgePoints(): boolean { // OPTIONAL testing as of now
    //TODO
    return true;
}

export function test_Model_purgeNulls(): boolean { // OPTIONAL testing as of now
    //TODO
    return true;
}

export function test_Model_validateModel(): boolean { // OPTIONAL testing as of now
    //TODO
    return true;
}

export function test_Model_toJSON(): boolean {
    const m: gs.Model = new gs.Model(td.open_box());
    m.toJSON();
    return true;
}
