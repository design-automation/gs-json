"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gs = require("./_export");
const gen = require("./generate/generate");
function test_Attrib_constructor() {
    const m = new gs.Model();
    const b = m.addEntAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
    return true;
}
exports.test_Attrib_constructor = test_Attrib_constructor;
function test_Attrib_getName() {
    const m = new gs.Model();
    const b = m.addEntAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
    if (b.getName() !== "test1") {
        return false;
    }
    return true;
}
exports.test_Attrib_getName = test_Attrib_getName;
function test_Attrib_setName() {
    const m = new gs.Model();
    const a = m.addEntAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
    a.setName("test2");
    if (a.getName() === "test1") {
        return false;
    }
    if (a.getName() !== "test2") {
        return false;
    }
    return true;
}
exports.test_Attrib_setName = test_Attrib_setName;
function test_Attrib_getGeomType() {
    const m = new gs.Model();
    const b = m.addEntAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
    if (b.getGeomType() !== gs.EGeomType.objs) {
        return false;
    }
    return true;
}
exports.test_Attrib_getGeomType = test_Attrib_getGeomType;
function test_Attrib_getObjDataType() {
    const m = new gs.Model();
    const b = m.addEntAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
    if (b.getDataType() !== gs.EDataType.type_num) {
        return false;
    }
    return true;
}
exports.test_Attrib_getObjDataType = test_Attrib_getObjDataType;
function test_Attrib_getValues() {
    const m = gen.genModelBoxWithAttribs();
    const g = m.getGeom();
    const ent_attribs = m.getAllEntAttribs();
    // test ent attrib
    const values1 = ent_attribs[0].getValues();
    g.addPoints([[1, 2, 3], [2, 3, 4], [3, 4, 5]]);
    const points = g.getAllPoints();
    g.delPoint(points[5]);
    const values2 = ent_attribs[0].getValues();
    if (values1.length !== 8) {
        return false;
    }
    if (values2.length !== 10) {
        return false;
    }
    // test topo attribs
    const topo_attribs = m.getAllTopoAttribs();
    const topo_values1 = topo_attribs[0].getValues();
    const topo_values2 = topo_attribs[1].getValues();
    const topo_values3 = topo_attribs[2].getValues();
    if (topo_values1.length !== 24) {
        return false;
    }
    if (topo_values2.length !== 24) {
        return false;
    }
    if (topo_values3.length !== 6) {
        return false;
    }
    return true;
}
exports.test_Attrib_getValues = test_Attrib_getValues;
function test_Attrib_getLabels() {
    const m = gen.genModelBoxWithAttribs();
    const g = m.getGeom();
    // test ent attrib
    const ent_attribs = m.getAllEntAttribs();
    const ent_labels = ent_attribs[0].getLabels();
    if (ent_labels.length !== 8) {
        return false;
    }
    // test topo attribs
    const topo_attribs = m.getAllTopoAttribs();
    const topo_labels1 = topo_attribs[0].getLabels();
    const topo_labels2 = topo_attribs[1].getLabels();
    const topo_labels3 = topo_attribs[2].getLabels();
    if (topo_labels1.length !== 24) {
        return false;
    }
    if (topo_labels2.length !== 24) {
        return false;
    }
    if (topo_labels3.length !== 6) {
        return false;
    }
    return true;
}
exports.test_Attrib_getLabels = test_Attrib_getLabels;
function test_Attrib_count() {
    const m = new gs.Model();
    const a1 = [Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    const a2 = [Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    const a3 = [Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    const a4 = [Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    // add 4 points
    m.getGeom().addPoint(a1);
    m.getGeom().addPoint(a2);
    m.getGeom().addPoint(a3);
    m.getGeom().addPoint(a4);
    // create a point attribute, all values should be null
    const b = m.addEntAttrib("Color of points", gs.EGeomType.points, gs.EDataType.type_str);
    // if (b.count() !== 4) {return false; }
    return true;
}
exports.test_Attrib_count = test_Attrib_count;
//# sourceMappingURL=_attrib_tests.js.map