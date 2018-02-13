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
    const curve = g.addCircle(pt, [1, 0, 0], [0, 1, 0], [45, 135]);
    if (curve.getObjType() !== 3 /* circle */) {
        return false;
    }
    return true;
}
exports.test_getObjType = test_getObjType;
function test_getOrigin() {
    const m = new gs.Model();
    const g = m.getGeom();
    const pt = g.addPoint([0, 0, 0]);
    const curve = g.addCircle(pt, [1, 0, 0], [0, 1, 0], [45, 135]);
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
    const vector_x = [1, 0, 0];
    const vector_y = [0, 1, 0];
    const curve = g.addCircle(pt, [1, 0, 0], [0, 1, 0], [45, 135]);
    if (!arr_1.Arr.equal(curve.getAxes()[0], vector_x)) {
        return false;
    }
    return true;
}
exports.test_getAxes = test_getAxes;
function test_setOrientation() {
    const m = new gs.Model();
    const g = m.getGeom();
    const pt = g.addPoint([0, 0, 0]);
    const vector_x = [1, 0, 0];
    const vector_y = [0, 1, 0];
    const vector_x_new = [0, 1, 0];
    const vector_y_new = [-1, 0, 0];
    const curve = g.addCircle(pt, vector_x, vector_y, [45, 135]);
    curve.setOrientation(vector_x_new, vector_y_new);
    if (!arr_1.Arr.equal(curve.getAxes()[0], vector_x_new)) {
        return false;
    }
    return true;
}
exports.test_setOrientation = test_setOrientation;
function test_getAngles() {
    const m = new gs.Model();
    const g = m.getGeom();
    const pt = g.addPoint([0, 0, 0]);
    const angle_1 = 140;
    const angle_2 = 145;
    const curve = g.addCircle(pt, [1, 0, 0], [0, 1, 0], [angle_1, angle_2]);
    if (!arr_1.Arr.equal(curve.getAngles(), [angle_1, angle_2])) {
        return false;
    }
    return true;
}
exports.test_getAngles = test_getAngles;
function test_setAngles() {
    const m = new gs.Model();
    const g = m.getGeom();
    const pt = g.addPoint([0, 0, 0]);
    const angle_1 = 140;
    const angle_2 = 145;
    const angle_1_new = 135;
    const angle_2_new = 150;
    const curve = g.addCircle(pt, [1, 0, 0], [0, 1, 0], [angle_1, angle_2]);
    curve.setAngles([angle_1_new, angle_2_new]);
    if (!arr_1.Arr.equal(curve.getAngles(), [angle_1_new, angle_2_new])) {
        return false;
    }
    return true;
}
exports.test_setAngles = test_setAngles;
function test_getRadius() {
    const m = new gs.Model();
    const g = m.getGeom();
    const radius = 1.23;
    const pt = g.addPoint([5, 6, 7]);
    const curve = g.addCircle(pt, [radius, 0, 0], [0, 1, 0], [45, 135]);
    if (curve.getRadius() !== radius) {
        return false;
    }
    return true;
}
exports.test_getRadius = test_getRadius;
function test_setRadius() {
    const m = new gs.Model();
    const g = m.getGeom();
    const radius = 1.23;
    const pt = g.addPoint([5, 6, 7]);
    const curve = g.addCircle(pt, [radius, 0, 0], [0, 1, 0], [45, 135]);
    curve.setRadius(123);
    if (curve.getRadius() !== 123) {
        return false;
    }
    return true;
}
exports.test_setRadius = test_setRadius;
function test_isClosed() {
    const m = new gs.Model();
    const g = m.getGeom();
    const pt = g.addPoint([0, 0, 0]);
    const angle_1 = 0;
    const angle_2 = 180;
    const angle_3 = 360;
    const curve1 = g.addCircle(pt, [1, 0, 0], [0, 1, 0], [angle_1, angle_2]);
    const curve2 = g.addCircle(pt, [1, 0, 0], [0, 1, 0], [angle_1, angle_3]);
    if (curve1.isClosed() === true) {
        return false;
    }
    return curve2.isClosed();
}
exports.test_isClosed = test_isClosed;
function test_length() {
    const m = new gs.Model();
    const g = m.getGeom();
    const pt = g.addPoint([0, 0, 0]);
    const angle_1 = 0;
    const angle_2 = 180;
    const angle_3 = 360;
    const curve1 = g.addCircle(pt, [1, 0, 0], [0, 1, 0], [10, 200]);
    if (curve1.length() < 0) {
        return false;
    }
    return true;
}
exports.test_length = test_length;
function test_eval() {
    const m = new gs.Model();
    const g = m.getGeom();
    const pt = g.addPoint([0, 0, 0]);
    const angle_1 = 0;
    const angle_2 = 180;
    const angle_3 = 360;
    const curve1 = g.addCircle(pt, [1, 0, 0], [0, 1, 0], [10, 200]);
    const point = curve1.evalParam(0.3);
    return true;
}
exports.test_eval = test_eval;
function test_equiPoints() {
    const m = new gs.Model();
    const g = m.getGeom();
    const pt = g.addPoint([0, 0, 0]);
    const angle_1 = 0;
    const angle_2 = 180;
    const angle_3 = 360;
    const curve1 = g.addCircle(pt, [1, 0, 0], [0, 1, 0], [10, 200]);
    const points = curve1.equiPoints(20);
    if (points.length !== 20) {
        return false;
    }
    return true;
}
exports.test_equiPoints = test_equiPoints;
//# sourceMappingURL=_entity_obj_circle_tests.js.map