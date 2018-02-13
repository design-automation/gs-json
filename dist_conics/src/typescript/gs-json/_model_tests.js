"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gs = require("./_export");
const arr_1 = require("./libs/arr/arr");
const td = require("./test_data");
function test_Model_constructor() {
    let model = new gs.Model(td.open_box());
    // model with no attribs
    if (model.getGeom().numObjs() !== 1) {
        return false;
    }
    if (model.getGeom().numPoints() !== 8) {
        return false;
    }
    if (model.getGeom().getObj(0).numFaces() !== 5) {
        return false;
    }
    if (!arr_1.Arr.equal(model.getGeom().getObj(0).getFaces()[4].getVertices().map((v, i) => v.getPoint().getID()), [5, 6, 7, 4])) {
        return false;
    }
    // model with attribs
    model = new gs.Model(td.box_with_attribs());
    const attribs = model.findAttribs(gs.EGeomType.vertices);
    if (attribs[0].getName() !== "test2") {
        return false;
    }
    const test3 = model.getTopoAttrib("test3", gs.EGeomType.faces);
    if (model.getGeom().getObj(0).getFaces()[0].getAttribValue(test3) !== 2.0) {
        return false;
    }
    // model with groups
    model = new gs.Model(td.box_with_groups());
    model.getAllGroups();
    const grp = model.getGroup("building_obj");
    // save the data to JSON, the read it back again
    const my_model = new gs.Model();
    const group = my_model.addGroup("test");
    const myg = my_model.getGeom();
    const p1 = myg.addPoint([1, 2, 3]);
    const p2 = myg.addPoint([4, 5, 6]);
    const p3 = myg.addPoint([6, 2, 9]);
    const p4 = myg.addPoint([1, 2, 7]);
    const p5 = myg.addPoint([5, 6, 3]);
    p1.addToGroup(group);
    group.addPoints([p3, p4]);
    const pline = myg.addPolyline([p1, p2, p3, p4, p5], false);
    group.addObj(pline);
    const model_string = my_model.toJSON();
    const model_data = JSON.parse(model_string);
    //console.log("TEST", model_data);
    let model2 = new gs.Model(model_data);
    const group2 = model2.getGroup("test");
    if (group2 === undefined) {
        return false;
    }
    if (group2.getPoints().length !== 3) {
        return false;
    }
    if (group2.getObjs().length !== 1) {
        return false;
    }
    //console.log("TEST2", model2);
    return true;
}
exports.test_Model_constructor = test_Model_constructor;
function test_Model_getGeom() {
    const m = new gs.Model(td.open_box());
    const g = m.addGroup("Box");
    const f1 = m.getGeom().getObj(0).getFaces()[0];
    if (f1.getObjID() !== 0) {
        return false;
    }
    return true;
}
exports.test_Model_getGeom = test_Model_getGeom;
function test_Model_findAttribs() {
    const m = new gs.Model(td.box_with_attribs());
    const e1 = m.findAttribs(gs.EGeomType.points);
    const e2 = m.findAttribs(gs.EGeomType.vertices);
    const e3 = m.findAttribs(gs.EGeomType.faces);
    const e4 = m.findAttribs(gs.EGeomType.wires);
    const e5 = m.findAttribs(gs.EGeomType.edges);
    const e6 = m.findAttribs(gs.EGeomType.objs);
    if (!(e1[0].getName() === "test1")) {
        return false;
    }
    if (!(e2[0].getName() === "test2")) {
        return false;
    }
    if (!(e3[0].getName() === "faces_id")) {
        return false;
    }
    if (!(e3[1].getName() === "test3")) {
        return false;
    }
    if (!(e4[0].getName() === "wires_id")) {
        return false;
    }
    if (!(e5[0].getName() === "edge_id")) {
        return false;
    }
    if (!(e6[0].getName() === "obj_id")) {
        return false;
    }
    return true;
}
exports.test_Model_findAttribs = test_Model_findAttribs;
function test_Model_getAttrib() {
    const m = new gs.Model(td.box_with_attribs());
    const e1 = m.getEntAttrib("test1", gs.EGeomType.points);
    const e2 = m.getTopoAttrib("test2", gs.EGeomType.vertices);
    const e3 = m.getTopoAttrib("faces_id", gs.EGeomType.faces);
    const e3bis = m.getTopoAttrib("test3", gs.EGeomType.faces);
    const e4 = m.getTopoAttrib("wires_id", gs.EGeomType.wires);
    const e5 = m.getTopoAttrib("edge_id", gs.EGeomType.edges);
    const e6 = m.getEntAttrib("obj_id", gs.EGeomType.objs);
    if (!(e1.getName() === "test1")) {
        return false;
    }
    if (!(e2.getName() === "test2")) {
        return false;
    }
    if (!(e3.getName() === "faces_id")) {
        return false;
    }
    if (!(e3bis.getName() === "test3")) {
        return false;
    }
    if (!(e4.getName() === "wires_id")) {
        return false;
    }
    if (!(e5.getName() === "edge_id")) {
        return false;
    }
    if (!(e6.getName() === "obj_id")) {
        return false;
    }
    return true;
}
exports.test_Model_getAttrib = test_Model_getAttrib;
function test_Model_addAttrib() {
    const m1 = new gs.Model(td.box_with_attribs());
    const e1 = m1.getEntAttrib("test1", gs.EGeomType.points);
    const m2 = new gs.Model();
    const e2 = m2.addEntAttrib(e1.getName(), e1.getGeomType(), e1.getDataType());
    if (!(e2.getName() === e1.getName())) {
        return false;
    }
    return true;
}
exports.test_Model_addAttrib = test_Model_addAttrib;
function test_Model_delAttrib() {
    const m1 = new gs.Model(td.box_with_attribs());
    const a1 = m1.getEntAttrib("test1", gs.EGeomType.points);
    if (a1.getName() !== "test1") {
        return false;
    }
    if (!m1.delAttrib(a1)) {
        return false;
    }
    if (m1.hasAttrib(a1)) {
        return false;
    }
    return true;
}
exports.test_Model_delAttrib = test_Model_delAttrib;
function test_Model_getGroups() {
    const m = new gs.Model();
    if (!(arr_1.Arr.equal(m.getAllGroups(), []))) {
        return false;
    }
    const g1 = m.addGroup("G1");
    const g2 = m.addGroup("G2");
    const g3 = m.addGroup("G3");
    const G = [g1, g2, g3];
    if (m.getAllGroups()[0].getName() !== G[0].getName()) {
        return false;
    }
    if (m.getAllGroups()[1].getName() !== G[1].getName()) {
        return false;
    }
    if (m.getAllGroups()[2].getName() !== G[2].getName()) {
        return false;
    }
    return true;
}
exports.test_Model_getGroups = test_Model_getGroups;
function test_Model_getGroup() {
    const m = new gs.Model(td.open_box());
    const g = m.addGroup("Box"); // No group in Box
    if (!(m.getGroup("Alpha") === null)) {
        return false;
    }
    if (!(m.getGroup("Box").getName() === "Box")) {
        return false;
    }
    return true;
}
exports.test_Model_getGroup = test_Model_getGroup;
function test_Model_addGroup() {
    const m = new gs.Model();
    if (!(m.getGroup("Group1") === null)) {
        return false;
    }
    const g = m.addGroup("Group1");
    if (!(m.getGroup("Group1").getName() === "Group1")) {
        return false;
    }
    return true;
}
exports.test_Model_addGroup = test_Model_addGroup;
function test_Model_hasGroup() {
    const m = new gs.Model();
    const g1 = m.addGroup("First_Group");
    if (!m.hasGroup(g1)) {
        return false;
    }
    m.delGroup(g1);
    if (m.hasGroup(g1)) {
        return false;
    }
    return true;
}
exports.test_Model_hasGroup = test_Model_hasGroup;
function test_Model_delGroup() {
    const m = new gs.Model();
    const g1 = m.addGroup("First_Group");
    if (!m.hasGroup(g1)) {
        return false;
    }
    m.delGroup(g1);
    if (m.hasGroup(g1)) {
        return false;
    }
    return true;
}
exports.test_Model_delGroup = test_Model_delGroup;
function test_Model_purgePoints() {
    //TODO
    return true;
}
exports.test_Model_purgePoints = test_Model_purgePoints;
function test_Model_purgeNulls() {
    //TODO
    return true;
}
exports.test_Model_purgeNulls = test_Model_purgeNulls;
function test_Model_validateModel() {
    //TODO
    return true;
}
exports.test_Model_validateModel = test_Model_validateModel;
function test_Model_toJSON() {
    const m = new gs.Model(td.open_box());
    m.toJSON();
    return true;
}
exports.test_Model_toJSON = test_Model_toJSON;
//# sourceMappingURL=_model_tests.js.map