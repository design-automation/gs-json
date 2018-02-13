"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gs = require("./_export");
const test_data = require("./test_data");
// Object tests, extends Entities by 6 complementary methods
function test_obj_getGeomType() {
    const m = new gs.Model(test_data.box_with_groups());
    const geom = m.getGeom();
    const a1 = geom.getObj(0);
    if (!(a1.getGeomType() === gs.EGeomType.objs)) {
        return false;
    }
    return true;
}
exports.test_obj_getGeomType = test_obj_getGeomType;
function test_obj_getObjType() {
    const m = new gs.Model(test_data.box_with_groups());
    const geom = m.getGeom();
    const a1 = geom.getObj(0);
    if (!(a1.getObjType() === 200 /* polymesh */)) {
        return false;
    }
    return true;
}
exports.test_obj_getObjType = test_obj_getObjType;
function test_obj_getPoints() {
    //const m: gs.IModel = new gs.Model(test_data.box_with_groups());
    const m = new gs.Model(test_data.mixed());
    const geom = m.getGeom();
    const a1 = geom.getObj(0);
    const wires = a1.getPoints()[0];
    const faces = a1.getPoints()[1];
    if (!(wires.length === 1)) {
        return false;
    }
    if (!(faces.length === 0)) {
        return false;
    }
    return true;
}
exports.test_obj_getPoints = test_obj_getPoints;
function test_obj_getVertices() {
    const m = new gs.Model(test_data.open_box());
    const geom = m.getGeom();
    const a1 = geom.getObj(0);
    const path1 = a1.getVertices()[0][0][0].getTopoPath();
    geom.numTopos(gs.EGeomType.vertices);
    a1.getVertices(); // Looks fine
    return true;
}
exports.test_obj_getVertices = test_obj_getVertices;
function test_obj_getEdges() {
    const m = new gs.Model(test_data.open_box());
    const geom = m.getGeom();
    const a1 = geom.getObj(0);
    const path1 = a1.getEdges()[0][0][0].getTopoPath();
    geom.numTopos(gs.EGeomType.edges);
    a1.getEdges(); // Looks fine
    return true;
}
exports.test_obj_getEdges = test_obj_getEdges;
function test_obj_getWires() {
    const m = new gs.Model(test_data.open_box());
    const geom = m.getGeom();
    const a1 = geom.getObj(0);
    const path1 = a1.getWires()[0].getTopoPath();
    geom.numTopos(gs.EGeomType.wires);
    // a1.getWires(); // Looks fine
    return true;
}
exports.test_obj_getWires = test_obj_getWires;
function test_obj_getFaces() {
    const m = new gs.Model(test_data.open_box());
    const geom = m.getGeom();
    const a1 = geom.getObj(0);
    const path1 = a1.getFaces()[0].getTopoPath();
    geom.numTopos(gs.EGeomType.faces);
    a1.getFaces(); // Looks fine
    return true;
}
exports.test_obj_getFaces = test_obj_getFaces;
function test_obj_getNumWires() {
    const m = new gs.Model(test_data.open_box());
    const obj = m.getGeom().getObj(0);
    if (obj.numWires() !== 1) {
        return false;
    }
    return true;
}
exports.test_obj_getNumWires = test_obj_getNumWires;
function test_obj_getNumFaces() {
    const m = new gs.Model(test_data.open_box());
    const obj = m.getGeom().getObj(0);
    if (obj.numFaces() !== 5) {
        return false;
    }
    return true;
}
exports.test_obj_getNumFaces = test_obj_getNumFaces;
//# sourceMappingURL=_entity_obj_tests.js.map