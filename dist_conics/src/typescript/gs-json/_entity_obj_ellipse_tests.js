"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gs = require("./_export");
const arr_1 = require("./libs/arr/arr");
/**
 * Series of tests to verify Entity Object Ellipse implemented methods
 */
function test_getObjType() {
    const m = new gs.Model();
    const g = m.getGeom();
    const pt = g.addPoint([0, 0, 0]);
    const curve = g.addEllipse(pt, [1, 0, 0], [0, 1, 0], [45, 135]);
    if (!(curve.getObjType() === 4 /* ellipse */)) {
        return false;
    }
    return true;
}
exports.test_getObjType = test_getObjType;
function test_isClosed() {
    const m = new gs.Model();
    const g = m.getGeom();
    const pt = g.addPoint([0, 0, 0]);
    const curve1 = g.addEllipse(pt, [1, 0, 0], [0, 1, 0], [45, 135]);
    if (curve1.isClosed()) {
        return false;
    }
    const curve2 = g.addEllipse(pt, [10, 0, 0], [0, 1, 0]);
    if (!curve2.isClosed()) {
        return false;
    }
    return true;
}
exports.test_isClosed = test_isClosed;
function test_getOrigin() {
    const m = new gs.Model();
    const g = m.getGeom();
    const pt = g.addPoint([0, 0, 0]);
    const curve = g.addEllipse(pt, [1, 0, 0], [0, 1, 0], [45, 135]);
    if (!arr_1.Arr.equal(curve.getOrigin().getPosition(), pt.getPosition())) {
        return false;
    }
    return true;
}
exports.test_getOrigin = test_getOrigin;
function test_getAxes() {
    const m = new gs.Model();
    const g = m.getGeom();
    const pt = g.addPoint([0, 0, 0]);
    const curve = g.addEllipse(pt, [1.123, 4, 6], [3, 1.456, 9], [45, 135]);
    console.log("curve.getAxes() = " + curve.getAxes());
    curve.getAxes();
    return true;
}
exports.test_getAxes = test_getAxes;
function test_getRadii() {
    const m = new gs.Model();
    const g = m.getGeom();
    const pt = g.addPoint([0, 0, 0]);
    const curve = g.addEllipse(pt, [1, 0, 0], [0, 1, 0], [45, 135]);
    curve.getRadii();
    return true;
}
exports.test_getRadii = test_getRadii;
function test_getAngles() {
    const m = new gs.Model();
    const g = m.getGeom();
    const pt = g.addPoint([0, 0, 0]);
    const curve = g.addEllipse(pt, [1, 0, 0], [0, 1, 0], [45, 135]);
    curve.getAngles();
    return true;
}
exports.test_getAngles = test_getAngles;
//# sourceMappingURL=_entity_obj_ellipse_tests.js.map