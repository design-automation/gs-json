"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arr_1 = require("./libs/arr/arr");
const gs = require("./_export");
const td = require("./test_data");
// Testing methods the Groups Class, composed of 1 constructor and 17 methods
function test_Groups_constructor() {
    const m = new gs.Model(td.box_with_groups());
    return true;
}
exports.test_Groups_constructor = test_Groups_constructor;
function test_Groups_getName() {
    const m = new gs.Model();
    const grp = m.addGroup("test");
    if (grp.getName() !== "test") {
        return false;
    }
    return true;
}
exports.test_Groups_getName = test_Groups_getName;
function test_Groups_setName() {
    const m = new gs.Model();
    const grp = m.addGroup("test1");
    grp.setName("test2");
    if (grp.getName() !== "test2") {
        return false;
    }
    // if (m.getGroup("test2").getName() !== "test2") {return false; }
    return true;
}
exports.test_Groups_setName = test_Groups_setName;
function test_Groups_getParentGroup() {
    const m = new gs.Model();
    const grp1 = m.addGroup("test1");
    const grp2 = m.addGroup("test2", grp1);
    // if (grp2.getParentGroup() !== "test1") {return false; }
    // const grp3: gs.IGroup = m.addGroup("test3");
    // const grp4: gs.IGroup = m.addGroup("test4", grp1);
    // if (grp1.getParentGroup() !== null) {return false; }
    // if (grp2.getParentGroup() !== "test1") {return false; }
    // if (grp3.getParentGroup() !== null) {return false; }
    // if (grp4.getParentGroup() !== "test1") {return false; }
    return true;
}
exports.test_Groups_getParentGroup = test_Groups_getParentGroup;
function test_Groups_getChildGroups() {
    const m = new gs.Model();
    const grp1 = m.addGroup("test1");
    const grp2 = m.addGroup("test2", grp1);
    const grp3 = m.addGroup("test3");
    const grp4 = m.addGroup("test4", grp1);
    const grp1_children = grp1.getChildGroups();
    if (grp1_children[0].getName() !== "test2") {
        return false;
    }
    if (grp1_children[1].getName() !== "test4") {
        return false;
    }
    if (!arr_1.Arr.equal(grp2.getChildGroups(), [])) {
        return false;
    }
    if (!arr_1.Arr.equal(grp3.getChildGroups(), [])) {
        return false;
    }
    if (!arr_1.Arr.equal(grp4.getChildGroups(), [])) {
        return false;
    }
    return true;
}
exports.test_Groups_getChildGroups = test_Groups_getChildGroups;
function test_Groups_setParentGroup() {
    const m = new gs.Model();
    const grp1 = m.addGroup("test1");
    const grp2 = m.addGroup("test2");
    // grp2.setParentGroup("test1");
    // if (grp2.getParentGroup() !== "test1") {return false; }
    return true;
}
exports.test_Groups_setParentGroup = test_Groups_setParentGroup;
function test_Groups_removeParentGroup() {
    const m = new gs.Model();
    const grp1 = m.addGroup("test1");
    const grp2 = m.addGroup("test2");
    // if (grp2.getParentGroup() !== null) {return false; }
    // grp2.setParentGroup("test1");
    // if (grp2.getParentGroup() !== "test1") {return false; }
    // grp2.setParentGroup("test2");
    // if (grp2.getParentGroup() !== "test2") {return false; }
    // grp2.removeParentGroup();
    // if (grp2.getParentGroup() !== null) {return false; }
    return true;
}
exports.test_Groups_removeParentGroup = test_Groups_removeParentGroup;
function test_Groups_getObjIDs() {
    const m = new gs.Model();
    const grp = m.addGroup("Group1");
    // grp.addObjs([4, 2, 9, 8]);
    // if (!Arr.equal([4, 2, 9, 8], grp.getObjIDs())) {return false;}
    return true;
}
exports.test_Groups_getObjIDs = test_Groups_getObjIDs;
function test_Groups_addObj() {
    const m = new gs.Model();
    const grp = m.addGroup("Group1");
    // if (!Arr.equal([], grp.getObjIDs())) {return false;}
    // grp.addObj(4);
    // if (!Arr.equal([4], grp.getObjIDs())) {return false;}
    // grp.addObj(2);
    // if (!Arr.equal([4, 2], grp.getObjIDs())) {return false;}
    // grp.addObj(9);
    // if (!Arr.equal([4, 2, 9], grp.getObjIDs())) {return false;}
    // grp.addObj(8);
    // if (!Arr.equal([4, 2, 9, 8], grp.getObjIDs())) {return false;}
    // grp.addObj(8);
    // grp.addObj(8);
    // grp.addObj(8);
    return true;
}
exports.test_Groups_addObj = test_Groups_addObj;
function test_Groups_addObjs() {
    const m = new gs.Model();
    const grp = m.addGroup("Group1");
    // if (!Arr.equal([], grp.getObjIDs())) {return false;}
    // grp.addObj(4);
    // if (!Arr.equal([4], grp.getObjIDs())) {return false;}
    // grp.addObjs([2, 9, 8]);
    // if (!Arr.equal([4, 2, 9, 8], grp.getObjIDs())) {return false;}
    return true;
}
exports.test_Groups_addObjs = test_Groups_addObjs;
function test_Groups_removeObj() {
    const m = new gs.Model();
    const grp = m.addGroup("Group1");
    // if (!Arr.equal([], grp.getObjIDs())) {return false;}
    // grp.addObjs([4, 2, 9, 8]);
    // if (!Arr.equal([4, 2, 9, 8], grp.getObjIDs())) {return false;}
    // grp.removeObj(2);
    // if (!Arr.equal([4, 9, 8], grp.getObjIDs())) {return false;}
    // grp.removeObj(9);
    // if (!Arr.equal([4, 8], grp.getObjIDs())) {return false;}
    return true;
}
exports.test_Groups_removeObj = test_Groups_removeObj;
function test_Groups_removeObjs() {
    const m = new gs.Model();
    const grp = m.addGroup("Group1");
    // if (!Arr.equal([], grp.getObjIDs())) {return false;}
    // grp.addObjs([4, 2, 9, 8]);
    // if (!Arr.equal([4, 2, 9, 8], grp.getObjIDs())) {return false;}
    // grp.removeObjs([4, 9]);
    // if (!Arr.equal([2, 8], grp.getObjIDs())) {return false;}
    return true;
}
exports.test_Groups_removeObjs = test_Groups_removeObjs;
function test_Groups_getTopos() {
    const m = new gs.Model(td.open_box());
    const g1 = m.addGroup("Box");
    const g2 = m.addGroup("Box2");
    if (!arr_1.Arr.equal(g1.getTopos(), [])) {
        return false;
    }
    g1.addTopo(m.getGeom().getObj(0).getFaces()[0]);
    if (arr_1.Arr.equal(g1.getTopos(), [])) {
        return false;
    }
    if (!arr_1.Arr.equal(g2.getTopos(), [])) {
        return false;
    }
    g2.addTopo(m.getGeom().getObj(0).getWires()[0]);
    if (arr_1.Arr.equal(g2.getTopos(), [])) {
        return false;
    }
    return true;
}
exports.test_Groups_getTopos = test_Groups_getTopos;
function test_Groups_addTopo() {
    const m = new gs.Model(td.open_box());
    const g = m.addGroup("Group");
    if (!arr_1.Arr.equal(g.getTopos(), [])) {
        return false;
    }
    g.addTopo(m.getGeom().getObj(0).getFaces()[0]);
    if (arr_1.Arr.equal(g.getTopos(), [])) {
        return false;
    }
    return true;
}
exports.test_Groups_addTopo = test_Groups_addTopo;
function test_Groups_addTopos() {
    const m = new gs.Model(td.open_box());
    const g = m.addGroup("Box");
    if (!arr_1.Arr.equal(g.getTopos(), [])) {
        return false;
    }
    const f1 = m.getGeom().getObj(0).getFaces()[0];
    const f2 = m.getGeom().getObj(0).getFaces()[1];
    const f3 = m.getGeom().getObj(0).getFaces()[2];
    const w1 = m.getGeom().getObj(0).getWires()[0];
    g.addTopos([f1]);
    if (!g.hasTopo(f1) || g.hasTopo(f2)
        || g.hasTopo(f3) || g.hasTopo(w1)) {
        return false;
    }
    g.addTopos([f2, f3, w1]);
    if (!g.hasTopo(f1) || !g.hasTopo(f2)
        || !g.hasTopo(f3) || !g.hasTopo(w1)) {
        return false;
    }
    return true;
}
exports.test_Groups_addTopos = test_Groups_addTopos;
function test_Groups_removeTopo() {
    const m = new gs.Model(td.open_box());
    const g = m.addGroup("Box");
    const f1 = m.getGeom().getObj(0).getFaces()[0];
    const f2 = m.getGeom().getObj(0).getFaces()[1];
    const f3 = m.getGeom().getObj(0).getFaces()[2];
    const w1 = m.getGeom().getObj(0).getWires()[0];
    if (!arr_1.Arr.equal(g.getTopos(), [])) {
        return false;
    }
    g.addTopos([f1, f2, f3, w1]);
    if (!g.hasTopo(f1) || !g.hasTopo(f2)
        || !g.hasTopo(f3) || !g.hasTopo(w1)) {
        return false;
    }
    g.removeTopo(f1);
    if (g.hasTopo(f1) || !g.hasTopo(f2)
        || !g.hasTopo(f3) || !g.hasTopo(w1)) {
        return false;
    }
    return true;
}
exports.test_Groups_removeTopo = test_Groups_removeTopo;
function test_Groups_removeTopos() {
    const m = new gs.Model(td.open_box());
    const g = m.addGroup("Box");
    const f1 = m.getGeom().getObj(0).getFaces()[0];
    const f2 = m.getGeom().getObj(0).getFaces()[1];
    const f3 = m.getGeom().getObj(0).getFaces()[2];
    const w1 = m.getGeom().getObj(0).getWires()[0];
    if (!arr_1.Arr.equal(g.getTopos(), [])) {
        return false;
    }
    g.addTopos([f1, f2, f3, w1]);
    if (!g.hasTopo(f1) || !g.hasTopo(f2)
        || !g.hasTopo(f3) || !g.hasTopo(w1)) {
        return false;
    }
    g.removeTopos([f2, f3, w1]);
    if (!g.hasTopo(f1) || g.hasTopo(f2)
        || g.hasTopo(f3) || g.hasTopo(w1)) {
        return false;
    }
    return true;
}
exports.test_Groups_removeTopos = test_Groups_removeTopos;
function test_Groups_getPointIDs() {
    const m = new gs.Model(td.open_box());
    const g = m.addGroup("Box");
    // g.addPoints([0, 2, 4]);
    // if (g.getPointIDs()[1] !== 2) {return false; }
    return true;
}
exports.test_Groups_getPointIDs = test_Groups_getPointIDs;
function test_Groups_addPoint() {
    const m = new gs.Model(td.open_box());
    const g = m.addGroup("Box");
    const point = m.getGeom().addPoint([11, 22, 33]);
    // g.addPoint(point.getID());
    // if (!(m.getGeom().numPoints() - g.getPointIDs()[0] === 1)) {return false; }
    return true;
}
exports.test_Groups_addPoint = test_Groups_addPoint;
function test_Groups_addPoints() {
    const m = new gs.Model(td.open_box());
    const g1 = m.addGroup("Box1");
    const g2 = m.addGroup("Box2");
    const point1 = m.getGeom().addPoint([11, 22, 36]);
    const point2 = m.getGeom().addPoint([12, 22, 23]);
    const point3 = m.getGeom().addPoint([14, 32, 33]);
    // g2.addPoints([point1.getID(), point2.getID(), point3.getID()]);
    // if ((g2.getPointIDs().length - g1.getPointIDs().length) !== 3) {return false; }
    return true;
}
exports.test_Groups_addPoints = test_Groups_addPoints;
function test_Groups_removePoint() {
    const m = new gs.Model(td.open_box());
    const g1 = m.addGroup("Box");
    const g2 = m.addGroup("Box");
    const point1 = m.getGeom().addPoint([11, 22, 36]);
    const point2 = m.getGeom().addPoint([12, 22, 23]);
    const point3 = m.getGeom().addPoint([194, 32, 33]);
    const point4 = m.getGeom().addPoint([12, 229, 23]);
    const point5 = m.getGeom().addPoint([11, 22, 369]);
    // g2.addPoints([point1.getID(), point2.getID(), point3.getID(), point4.getID(), point5.getID()]);
    // if (!(g2.getPointIDs().length === 5)) {return false; }
    // g2.removePoint(point2.getID());
    // if (!(g2.getPointIDs().length === 4)) {return false; }
    // g2.removePoint(point3.getID());
    // if (!(g2.getPointIDs().length === 3)) {return false; }
    return true;
}
exports.test_Groups_removePoint = test_Groups_removePoint;
function test_Groups_removePoints() {
    const m = new gs.Model(td.open_box());
    const g = m.addGroup("Box");
    const point1 = m.getGeom().addPoint([11, 22, 36]);
    const point2 = m.getGeom().addPoint([12, 22, 23]);
    const point3 = m.getGeom().addPoint([194, 32, 33]);
    const point4 = m.getGeom().addPoint([12, 229, 23]);
    const point5 = m.getGeom().addPoint([11, 22, 369]);
    // g.addPoints([point1.getID(), point2.getID(), point3.getID(), point4.getID(), point5.getID()]);
    // if (!(g.getPointIDs().length === 5)) {return false; }
    // g.removePoints([point2.getID(), point4.getID(), point5.getID()]);
    // if (!(g.getPointIDs().length === 2)) {return false; }
    return true;
}
exports.test_Groups_removePoints = test_Groups_removePoints;
function test_Groups_getProps() {
    const m = new gs.Model(td.open_box());
    const g = m.addGroup("Box");
    return true;
}
exports.test_Groups_getProps = test_Groups_getProps;
function test_Groups_setProps() {
    const m = new gs.Model(td.open_box());
    const g = m.addGroup("Box");
    const a = new Map();
    if (!g.getProps() === undefined) {
        return false;
    }
    // a.set("one", 1); //TODO
    // a.set("two", 2);
    // a.set("three", 3);
    // a.set("four", 4);
    // g.setProps(a);
    // if (!(g.getProps() === a)) {return false; }
    return true;
}
exports.test_Groups_setProps = test_Groups_setProps;
function test_Groups_toJson() {
    const m1 = new gs.Model();
    const g = m1.addGroup("mygrp");
    g.setProps([["testing", [123, 456, 789]]]);
    const j1 = m1.toJSON();
    const m2 = new gs.Model(JSON.parse(j1));
    const j2 = m2.toJSON();
    const m3 = new gs.Model(JSON.parse(j2));
    if (m3.getGroup("mygrp").getProps()[0][0] !== "testing") {
        return false;
    }
    console.log(g.toString());
    return true;
}
exports.test_Groups_toJson = test_Groups_toJson;
//# sourceMappingURL=_groups_tests.js.map