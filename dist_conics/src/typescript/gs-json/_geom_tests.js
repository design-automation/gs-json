"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arr_1 = require("./libs/arr/arr");
const gs = require("./_export");
const td = require("./test_data");
function test_Geom_copyRayFromModel() {
    const m1 = new gs.Model();
    const g1 = m1.getGeom();
    const p1 = g1.addPoint([0.1234, 0.44566, 0.345778]);
    const ray1 = g1.addRay(p1, [1, 2, 3]);
    const m2 = new gs.Model();
    const g2 = m2.getGeom();
    const ray2 = g2.copyRayFromModel(ray1);
    if (g2.numObjs() !== 1) {
        return false;
    }
    if (g2.numPoints() !== 1) {
        return false;
    }
    if (ray1.getOrigin()[2] !== ray2.getOrigin()[2]) {
        return false;
    }
    return true;
}
exports.test_Geom_copyRayFromModel = test_Geom_copyRayFromModel;
function test_Geom_copyPlaneFromModel() {
    const m1 = new gs.Model();
    const g1 = m1.getGeom();
    const p = g1.addPoint([0.1234, 0.44566, 0.345778]);
    const pl1 = g1.addPlane(p, [1, 2, 3], [7, 2, 5]);
    const m2 = new gs.Model();
    const g2 = m2.getGeom();
    const pl2 = g2.copyPlaneFromModel(pl1);
    if (g2.numObjs() !== 1) {
        return false;
    }
    if (g2.numPoints() !== 1) {
        return false;
    }
    if (pl1.getOrigin()[2] !== pl2.getOrigin()[2]) {
        return false;
    }
    return true;
}
exports.test_Geom_copyPlaneFromModel = test_Geom_copyPlaneFromModel;
function test_Geom_copyCircleFromModel() {
    const m1 = new gs.Model();
    const g1 = m1.getGeom();
    const p = g1.addPoint([0.1234, 0.44566, 0.345778]);
    const cir1 = g1.addCircle(p, [1, 2, 3], [7, 2, 5]);
    const m2 = new gs.Model();
    const g2 = m2.getGeom();
    const cir2 = g2.copyCircleFromModel(cir1);
    if (g2.numObjs() !== 1) {
        return false;
    }
    if (g2.numPoints() !== 1) {
        return false;
    }
    if (cir1.getOrigin()[2] !== cir2.getOrigin()[2]) {
        return false;
    }
    return true;
}
exports.test_Geom_copyCircleFromModel = test_Geom_copyCircleFromModel;
function test_Geom_copyObjFromModel() {
    const m1 = new gs.Model();
    const g1 = m1.getGeom();
    const p1 = g1.addPoint([0.1234, 0.44566, 0.345778]);
    const ray1 = g1.addRay(p1, [1, 2, 3]);
    const pl1 = g1.addPlane(p1, [1, 2, 3], [7, 2, 5]);
    const cir1 = g1.addCircle(p1, [1, 2, 3], [7, 2, 5]);
    const m2 = new gs.Model();
    const g2 = m2.getGeom();
    // copy three objects
    const ray2 = g2.copyRayFromModel(ray1);
    const pl2 = g2.copyPlaneFromModel(pl1);
    const cir2 = g2.copyObjFromModel(cir1);
    if (g2.numObjs() !== 3) {
        return false;
    }
    if (g2.numPoints() !== 3) {
        return false;
    }
    if (cir1.getOrigin()[2] !== cir2.getOrigin()[2]) {
        return false;
    }
    return true;
}
exports.test_Geom_copyObjFromModel = test_Geom_copyObjFromModel;
function test_Geom_createPoint() {
    const m = new gs.Model();
    const g = m.getGeom();
    const p1 = g.addPoint([1, 2, 3]);
    const p2 = g.addPoint([0, 0, 0]);
    const p3 = g.addPoint([0.1234, 0.44566, 0.345778]);
    if (g.numPoints() !== 3) {
        return false;
    }
    if (!arr_1.Arr.equal(g.getAllPoints()[1].getPosition(), [0, 0, 0])) {
        return false;
    }
    return true;
}
exports.test_Geom_createPoint = test_Geom_createPoint;
// Geom constructor and its 19 public methods are tested
function test_Geom_constructor() {
    const m1 = new gs.Model();
    const a = [1, 2, 3];
    m1.getGeom().addPoint(a);
    // TODO
    // if(!(Arr.equal(m1.getGeom().getPointData(0)[1],a))) {return false;}
    return true;
}
exports.test_Geom_constructor = test_Geom_constructor;
function test_Geom_addPoint() {
    const model = new gs.Model();
    const p1 = [4, 8, 6];
    let num_Point = 1;
    // for (let k:number = 0 ; 10 ; k++){a[k] = Math.floor(Math.random() * 10);} (this line crashes Karma)
    model.getGeom().addPoint(p1);
    // test 1.1
    if (model.getGeom().numPoints() !== num_Point) {
        return false;
    }
    // test 1.2
    for (let j = 0; j < model.getGeom().numPoints(); j++) {
        for (const k of p1) {
            // TODO
            // if(model.getGeom().getPointData(j)[1][k] !== p1[k] ) {return false;}
        }
    }
    //
    const p2 = [4, 2, 8];
    num_Point = num_Point + 1;
    model.getGeom().addPoint(p2);
    // test 2.1
    if (model.getGeom().numPoints() !== num_Point) {
        return false;
    }
    // test 2.2
    for (const k of p2) {
        // TODO
        // if(model.getGeom().getPointData(1)[1][k] !== p2[k] ) {return false;}
    }
    ////
    const p3 = [6, 1, 7];
    num_Point = num_Point + 1;
    model.getGeom().addPoint(p3);
    // test 3.1
    if (model.getGeom().numPoints() !== num_Point) {
        return false;
    }
    // test 3.2
    for (const k of p3) {
        // TODO
        // if(model.getGeom().getPointData(2)[1][k] !== p3[k] ) {return false;}
    }
    return true;
}
exports.test_Geom_addPoint = test_Geom_addPoint;
function test_Geom_addPolyline() {
    const m = new gs.Model();
    const g = m.getGeom();
    const p1 = g.addPoint([0, 0, 0]);
    const p2 = g.addPoint([2, 0, 0]);
    const p3 = g.addPoint([3, 6, 0]);
    const p4 = g.addPoint([7, 4, 9]);
    const pline1 = g.addPolyline([p1, p2, p3, p4], true);
    const pline2 = g.addPolyline([p1, p2, p3], false);
    if (g.numObjs() !== 2) {
        return false;
    }
    if (pline1.numFaces() !== 0) {
        return false;
    }
    if (pline1.numWires() !== 1) {
        return false;
    }
    if (pline2.numFaces() !== 0) {
        return false;
    }
    if (pline2.numWires() !== 1) {
        return false;
    }
    return true;
}
exports.test_Geom_addPolyline = test_Geom_addPolyline;
function test_Geom_addPolymesh() {
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
    if (g.numObjs() !== 1) {
        return false;
    }
    if (pmesh1.numFaces() !== 2) {
        return false;
    }
    if (pmesh1.numWires() !== 1) {
        return false;
    }
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
    if (g.numObjs() !== 2) {
        return false;
    }
    if (pmesh2.numFaces() !== 6) {
        return false;
    }
    if (pmesh2.numWires() !== 0) {
        return false;
    }
    const pmesh3 = g.addPolymesh([
        [p13, p12, p11, p10],
        [p10, p11, p15, p14],
        [p13, p10, p14, p17],
        [p14, p15, p16, p17],
    ]);
    if (g.numObjs() !== 3) {
        return false;
    }
    if (pmesh3.numFaces() !== 4) {
        return false;
    }
    if (pmesh3.numWires() !== 1) {
        return false;
    }
    return true;
}
exports.test_Geom_addPolymesh = test_Geom_addPolymesh;
function test_Geom_getPoints() {
    const m = new gs.Model();
    const g1 = m.getGeom();
    const p1 = [1, 3, 9];
    g1.addPoint(p1);
    const p2 = [2, 1, 6];
    g1.addPoint(p2);
    const p3 = [4, 9, 2];
    g1.addPoint(p3);
    const p4 = [2, 3, 4];
    g1.addPoint(p4);
    const p5 = [8, 4, 3];
    g1.addPoint(p5);
    const p6 = [6, 1, 7];
    g1.addPoint(p6);
    const p7 = [9, 0, 4];
    g1.addPoint(p7);
    const p8 = [4, 0, 8];
    g1.addPoint(p8);
    const test8 = g1.getAllPoints()[7].getPosition();
    if (!arr_1.Arr.equal(test8, p8)) {
        return false;
    }
    return true;
}
exports.test_Geom_getPoints = test_Geom_getPoints;
function test_Geom_getPoint() {
    const m = new gs.Model();
    const geom = m.getGeom();
    const p1 = geom.addPoint([1, 3, 8]);
    const p2 = geom.addPoint([6, 4, 3]);
    const p3 = geom.addPoint([8, 8, 8]);
    const p4 = geom.addPoint([3, 4, 5]);
    const p5 = geom.addPoint([2, 3, 5]);
    const p6 = geom.addPoint([1, 5, 2]);
    if (!(arr_1.Arr.equal(geom.getPoint(0).getPosition(), p1.getPosition()))) {
        return false;
    }
    if (!(arr_1.Arr.equal(geom.getPoint(1).getPosition(), p2.getPosition()))) {
        return false;
    }
    if (!(arr_1.Arr.equal(geom.getPoint(2).getPosition(), p3.getPosition()))) {
        return false;
    }
    if (!(arr_1.Arr.equal(geom.getPoint(3).getPosition(), p4.getPosition()))) {
        return false;
    }
    if (!(arr_1.Arr.equal(geom.getPoint(4).getPosition(), p5.getPosition()))) {
        return false;
    }
    if (!(arr_1.Arr.equal(geom.getPoint(5).getPosition(), p6.getPosition()))) {
        return false;
    }
    return true;
}
exports.test_Geom_getPoint = test_Geom_getPoint;
function test_Geom_delPoint() {
    const m = new gs.Model();
    const g = m.getGeom();
    const p0 = g.addPoint([1, 2, 3]);
    const p1 = g.addPoint([0, 0, 0]);
    const p2 = g.addPoint([4, 5, 6]);
    if (!g.delPoint(p1)) {
        return false;
    }
    if (g.numPoints() !== 2) {
        return false;
    }
    if (!arr_1.Arr.equal(g.getPoint(2).getPosition(), [4, 5, 6])) {
        return false;
    }
    if (!g.delPoint(p2)) {
        return false;
    }
    if (g.numPoints() !== 1) {
        return false;
    }
    if (!arr_1.Arr.equal(g.getPoint(0).getPosition(), [1, 2, 3])) {
        return false;
    }
    if (!g.delPoint(p0)) {
        return false;
    }
    if (g.numPoints() !== 0) {
        return false;
    }
    return true;
}
exports.test_Geom_delPoint = test_Geom_delPoint;
function test_Geom_numPoints() {
    const m = new gs.Model();
    const geom = m.getGeom();
    if (!(geom.numPoints() === 0)) {
        return false;
    }
    geom.addPoint([1, 3, 8]);
    if (!(geom.numPoints() === 1)) {
        return false;
    }
    geom.addPoint([8, 8, 8]);
    if (!(geom.numPoints() === 2)) {
        return false;
    }
    geom.addPoint([3, 4, 5]);
    if (!(geom.numPoints() === 3)) {
        return false;
    }
    geom.addPoint([2, 3, 5]);
    if (!(geom.numPoints() === 4)) {
        return false;
    }
    geom.addPoint([1, 5, 2]);
    if (!(geom.numPoints() === 5)) {
        return false;
    }
    return true;
}
exports.test_Geom_numPoints = test_Geom_numPoints;
function test_Geom_mergePoints() {
    const m = new gs.Model();
    const geom = m.getGeom();
    for (let i = 0; i < 1000; i++) {
        geom.addPoint([Math.random(), Math.random(), Math.random()]);
    }
    for (let i = 0; i < 1000; i++) {
        if (Math.random() > 0.5) {
            geom.delPoint(geom.getPoint(i));
        }
    }
    geom.mergeAllPoints(0.2);
    if (geom.numPoints() === 1000) {
        return false;
    }
    const m2 = new gs.Model();
    const g2 = m2.getGeom();
    const p1 = g2.addPoint([10, 0, 0]);
    const p2 = g2.addPoint([20, 0, 0]);
    const new_points = g2.mergePoints([p1, p2]);
    if (new_points.length !== 1) {
        return false;
    }
    if (new_points[0].getPosition()[0] !== 15) {
        return false;
    }
    return true;
}
exports.test_Geom_mergePoints = test_Geom_mergePoints;
function test_Geom_getObjs() {
    const m = new gs.Model(td.open_box());
    const geom = m.getGeom();
    const p1 = geom.addPoint([0, 0, 0]);
    const p2 = geom.addPoint([2, 0, 0]);
    const p3 = geom.addPoint([3, 6, 0]);
    const p4 = geom.addPoint([7, 4, 9]);
    const pline1 = geom.addPolyline([p1, p2, p3, p4], true);
    const pline2 = geom.addPolyline([p1, p2, p3], false);
    const pline3 = geom.addPolyline([p1, p3, p4], false);
    if (!(arr_1.Arr.equal([geom.getAllObjs()[0].getObjType()], [200]))) {
        return false;
    }
    if (!(arr_1.Arr.equal([geom.getAllObjs()[1].getObjType()], [100]))) {
        return false;
    }
    if (!(arr_1.Arr.equal([geom.getAllObjs()[2].getObjType()], [100]))) {
        return false;
    }
    return true;
}
exports.test_Geom_getObjs = test_Geom_getObjs;
function test_Geom_getObj() {
    const m = new gs.Model(td.open_box());
    const geom = m.getGeom();
    const polymesh = geom.getObj(0);
    if (!(arr_1.Arr.equal([polymesh.getObjType()], [200]))) {
        return false;
    }
    return true;
}
exports.test_Geom_getObj = test_Geom_getObj;
function test_Geom_delObj() {
    const m = new gs.Model(td.open_box());
    const g = m.getGeom();
    const p1 = g.addPoint([0, 0, 0]);
    const p2 = g.addPoint([2, 0, 0]);
    const p3 = g.addPoint([3, 6, 0]);
    const p4 = g.addPoint([7, 4, 9]);
    const p5 = g.addPoint([1, 2, 6]);
    const p6 = g.addPoint([7, 8, 99]);
    const box = g.getObj(0);
    const pline1 = g.addPolyline([p1, p2, p3, p4, p5, p6], true);
    const pline2 = g.addPolyline([p1, p2, p3], false);
    const pline3 = g.addPolyline([p1, p3, p4], false);
    // delete some stuff
    if (g.numObjs() !== 4) {
        return false;
    }
    g.delObj(box, false);
    if (g.numObjs() !== 3) {
        return false;
    }
    g.delObjs([pline1, pline3], false);
    if (g.numObjs() !== 1) {
        return false;
    }
    // create some attribs
    const p_att = m.addEntAttrib("test0", gs.EGeomType.points, gs.EDataType.type_str);
    const o_att = m.addEntAttrib("test1", gs.EGeomType.objs, gs.EDataType.type_num);
    const e_att = m.addTopoAttrib("test2", gs.EGeomType.edges, gs.EDataType.type_num);
    const w_att = m.addTopoAttrib("test3", gs.EGeomType.wires, gs.EDataType.type_num);
    // set attribs
    p1.setAttribValue(p_att, "jshjdhjh");
    pline2.setAttribValue(o_att, 12234456);
    // now delete some more stuff
    g.delObj(pline2, true);
    if (g.numObjs() !== 0) {
        return false;
    }
    // now check if attributes are updated
    //console.log(m);
    return true;
}
exports.test_Geom_delObj = test_Geom_delObj;
function test_Geom_numObjs() {
    const m = new gs.Model(td.open_box());
    const geom = m.getGeom();
    // numObjs no longer allos you to specify EObjType
    if (!(geom.numObjs() === 1)) {
        return false;
    }
    const p1 = geom.addPoint([0, 0, 0]);
    const p2 = geom.addPoint([2, 0, 0]);
    const p3 = geom.addPoint([3, 6, 0]);
    const p4 = geom.addPoint([7, 4, 9]);
    const pline1 = geom.addPolyline([p1, p2, p3, p4], true);
    if (!(geom.numObjs() === 2)) {
        return false;
    }
    const pline2 = geom.addPolyline([p1, p2, p3], false);
    if (!(geom.numObjs() === 3)) {
        return false;
    }
    const pline3 = geom.addPolyline([p1, p3, p4], false);
    if (!(geom.numObjs() === 4)) {
        return false;
    }
    return true;
}
exports.test_Geom_numObjs = test_Geom_numObjs;
function test_Geom_getTopo() {
    const m = new gs.Model(td.open_box());
    const geom = m.getGeom();
    const face = geom.getTopo({ id: 0, tt: 1, ti: 1 });
    const wire = geom.getTopo({ id: 0, tt: 0, ti: 0 });
    const face_edge = geom.getTopo({ id: 0, tt: 1, ti: 0, st: 1, si: 0 });
    const wire_edge = geom.getTopo({ id: 0, tt: 0, ti: 0, st: 1, si: 0 });
    const face_vertex = geom.getTopo({ id: 0, tt: 1, ti: 0, st: 0, si: 0 });
    const wire_vertex = geom.getTopo({ id: 0, tt: 0, ti: 0, st: 0, si: 0 });
    if (face.getGeomType() !== gs.EGeomType.faces) {
        return false;
    }
    if (wire.getGeomType() !== gs.EGeomType.wires) {
        return false;
    }
    if (face_edge.getGeomType() !== gs.EGeomType.edges) {
        return false;
    }
    if (wire_edge.getGeomType() !== gs.EGeomType.edges) {
        return false;
    }
    if (face_vertex.getGeomType() !== gs.EGeomType.vertices) {
        return false;
    }
    if (wire_vertex.getGeomType() !== gs.EGeomType.vertices) {
        return false;
    }
    return true;
}
exports.test_Geom_getTopo = test_Geom_getTopo;
function test_Geom_getTopoFromLabel() {
    const m = new gs.Model(td.open_box());
    const geom = m.getGeom();
    const face = geom.getTopoFromLabel("o0:f1");
    const wire = geom.getTopoFromLabel("o0:w0");
    const face_edge = geom.getTopoFromLabel("o0:f1:e1");
    const wire_edge = geom.getTopoFromLabel("o0:w0:e2");
    const face_vertex = geom.getTopoFromLabel("o0:f1:v2");
    const wire_vertex = geom.getTopoFromLabel("o0:w0:v2");
    if (face.getGeomType() !== gs.EGeomType.faces) {
        return false;
    }
    if (wire.getGeomType() !== gs.EGeomType.wires) {
        return false;
    }
    if (face_edge.getGeomType() !== gs.EGeomType.edges) {
        return false;
    }
    if (wire_edge.getGeomType() !== gs.EGeomType.edges) {
        return false;
    }
    if (face_vertex.getGeomType() !== gs.EGeomType.vertices) {
        return false;
    }
    if (wire_vertex.getGeomType() !== gs.EGeomType.vertices) {
        return false;
    }
    return true;
}
exports.test_Geom_getTopoFromLabel = test_Geom_getTopoFromLabel;
function test_Geom_getTopos() {
    const m = new gs.Model(td.open_box());
    const geom = m.getGeom();
    if (!(geom.getTopos(gs.EGeomType.edges).length === geom.numTopos(gs.EGeomType.edges))) {
        return false;
    }
    if (!(geom.getTopos(gs.EGeomType.vertices).length === geom.numTopos(gs.EGeomType.vertices))) {
        return false;
    }
    if (!(geom.getTopos(gs.EGeomType.faces).length === geom.numTopos(gs.EGeomType.faces))) {
        return false;
    }
    if (!(geom.getTopos(gs.EGeomType.wires).length === geom.numTopos(gs.EGeomType.wires))) {
        return false;
    }
    return true;
}
exports.test_Geom_getTopos = test_Geom_getTopos;
function test_Geom_numTopos() {
    const m = new gs.Model(td.box_with_attribs());
    const geom = m.getGeom();
    if (!(geom.getTopos(gs.EGeomType.edges).length === geom.numTopos(gs.EGeomType.edges))) {
        return false;
    }
    if (!(geom.getTopos(gs.EGeomType.vertices).length === geom.numTopos(gs.EGeomType.vertices))) {
        return false;
    }
    if (!(geom.getTopos(gs.EGeomType.faces).length === geom.numTopos(gs.EGeomType.faces))) {
        return false;
    }
    if (!(geom.getTopos(gs.EGeomType.wires).length === geom.numTopos(gs.EGeomType.wires))) {
        return false;
    }
    return true;
}
exports.test_Geom_numTopos = test_Geom_numTopos;
//# sourceMappingURL=_geom_tests.js.map