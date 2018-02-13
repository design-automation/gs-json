"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gs = require("./_export");
const three = require("three");
function test_Polyline_getObjType() {
    const m = new gs.Model();
    const g = m.getGeom();
    const p1 = g.addPoint([0, 0, 0]);
    const p2 = g.addPoint([2, 0, 0]);
    const p3 = g.addPoint([3, 6, 0]);
    const p4 = g.addPoint([7, 4, 9]);
    const pline1 = g.addPolyline([p1, p2, p3, p4], true);
    const pline2 = g.addPolyline([p1, p2, p3], false);
    if (!(pline1.getObjType() === 100)) {
        return false;
    }
    if (!(pline2.getObjType() === 100)) {
        return false;
    }
    return true;
}
exports.test_Polyline_getObjType = test_Polyline_getObjType;
function test_Polyline_setIsClosed() {
    const m = new gs.Model();
    const g = m.getGeom();
    const p1 = g.addPoint([0, 0, 0]);
    const p2 = g.addPoint([2, 0, 0]);
    const p3 = g.addPoint([3, 6, 0]);
    const p4 = g.addPoint([7, 4, 9]);
    const pline1 = g.addPolyline([p1, p2, p3, p4], false);
    if (pline1.numEdges() !== 3) {
        return false;
    }
    pline1.setIsClosed(true);
    if (!pline1.isClosed()) {
        return false;
    }
    if (pline1.numEdges() !== 4) {
        return false;
    }
    pline1.setIsClosed(false);
    if (pline1.isClosed()) {
        return false;
    }
    if (pline1.numEdges() !== 3) {
        return false;
    }
    return true;
}
exports.test_Polyline_setIsClosed = test_Polyline_setIsClosed;
function test_Polyline_insertVertex() {
    const m = new gs.Model();
    const g = m.getGeom();
    const p1 = g.addPoint([0, 0, 0]);
    const p2 = g.addPoint([2, 0, 0]);
    const p3 = g.addPoint([3, 6, 0]);
    const p4 = g.addPoint([7, 4, 9]);
    const pline1 = g.addPolyline([p1, p2, p3, p4], true);
    const edge = pline1.getEdges()[0][0][1];
    pline1.insertVertex(edge, g.addPoint([1, 1, 0]));
    return true;
}
exports.test_Polyline_insertVertex = test_Polyline_insertVertex;
function test_Polyline_xform() {
    const m = new gs.Model();
    const g = m.getGeom();
    const p1 = g.addPoint([0, 0, 0]);
    const p2 = g.addPoint([2, 0, 0]);
    const p3 = g.addPoint([3, 6, 0]);
    const p4 = g.addPoint([7, 4, 9]);
    const pline1 = g.addPolyline([p1, p2, p3, p4], true);
    const matrix = new three.Matrix4();
    matrix.setPosition(new three.Vector3(20, 10, 0));
    pline1.xform(matrix);
    //console.log("test_Polyline_xform", m);
    return true;
}
exports.test_Polyline_xform = test_Polyline_xform;
function test_Polyline_copy() {
    const m = new gs.Model();
    const g = m.getGeom();
    const p1 = g.addPoint([0, 0, 0]);
    const p2 = g.addPoint([2, 0, 0]);
    const p3 = g.addPoint([3, 6, 0]);
    const p4 = g.addPoint([7, 4, 9]);
    const pline1 = g.addPolyline([p1, p2, p3, p4], true);
    const matrix = new three.Matrix4();
    matrix.setPosition(new three.Vector3(20, 10, 0));
    pline1.copy(true).xform(matrix);
    matrix.setPosition(new three.Vector3(40, 10, 0));
    pline1.copy(true).xform(matrix);
    matrix.setPosition(new three.Vector3(60, 10, 0));
    pline1.copy(true).xform(matrix);
    //console.log("test_Polyline_copy", m);
    return true;
}
exports.test_Polyline_copy = test_Polyline_copy;
function test_Polyline_toString() {
    const m = new gs.Model();
    const g = m.getGeom();
    const p1 = g.addPoint([0, 0, 0]);
    const p2 = g.addPoint([2, 0, 0]);
    const p3 = g.addPoint([3, 6, 0]);
    const p4 = g.addPoint([7, 4, 9]);
    const pline1 = g.addPolyline([p1, p2, p3, p4], true);
    if (pline1.toString() === undefined) {
        return false;
    }
    return true;
}
exports.test_Polyline_toString = test_Polyline_toString;
//# sourceMappingURL=_entity_obj_polyline_tests.js.map