"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gs = require("./_export");
const td = require("./generate/generate");
// Polymesh test, extend Obj by 1 method
function test_Polymesh_getObjType() {
    const m = new gs.Model();
    const g = m.getGeom();
    const p1 = g.addPoint([0, 0, 0]);
    const p2 = g.addPoint([2, 0, 0]);
    const p3 = g.addPoint([2, 7, 0]);
    const p4 = g.addPoint([7, 7, 2]);
    const pmesh1 = g.addPolymesh([
        [p1, p2, p3],
        [p2, p4, p3],
    ]);
    const p10 = g.addPoint([-5, -3, -2]);
    const p11 = g.addPoint([5, -3, -2]);
    const p12 = g.addPoint([5, 3, -2]);
    const p13 = g.addPoint([-5, 3, -2]);
    const p14 = g.addPoint([-5, -3, 2]);
    const p15 = g.addPoint([5, -3, 2]);
    const p16 = g.addPoint([5, 3, 2]);
    const p17 = g.addPoint([-5, 3, 2]);
    const pmesh2 = g.addPolymesh([
        [p13, p12, p11, p10],
        [p10, p11, p15, p14],
        [p11, p12, p16, p15],
        [p12, p13, p17, p16],
        [p13, p10, p14, p17],
        [p14, p15, p16, p17],
    ]);
    const pmesh3 = g.addPolymesh([
        [p13, p12, p11, p10],
        [p10, p11, p15, p14],
        [p13, p10, p14, p17],
        [p14, p15, p16, p17],
    ]);
    if (!(pmesh1.getObjType() === 200)) {
        return false;
    }
    if (!(pmesh2.getObjType() === 200)) {
        return false;
    }
    if (!(pmesh3.getObjType() === 200)) {
        return false;
    }
    const m2 = td.genModelBox();
    const box2 = m2.getGeom().getObj(0);
    if (box2.numWires() !== 0) {
        return false;
    }
    const m3 = td.genModelBoxOpen1();
    const box3 = m3.getGeom().getObj(0);
    if (box3.numWires() !== 1) {
        return false;
    }
    const m4 = td.genModelBoxOpen2();
    const box4 = m4.getGeom().getObj(0);
    if (box4.numWires() !== 1) {
        return false;
    }
    const m5 = td.genModelBoxOpen2Disjoint();
    const box5 = m5.getGeom().getObj(0);
    if (box5.numWires() !== 2) {
        return false;
    }
    const m6 = td.genModelTwoBoxesOpen();
    const box6 = m6.getGeom().getObj(0);
    if (m6.getGeom().getObj(0).numWires() !== 1) {
        return false;
    }
    if (m6.getGeom().getObj(1).numWires() !== 2) {
        return false;
    }
    return true;
}
exports.test_Polymesh_getObjType = test_Polymesh_getObjType;
//# sourceMappingURL=_entity_obj_polymesh_tests.js.map