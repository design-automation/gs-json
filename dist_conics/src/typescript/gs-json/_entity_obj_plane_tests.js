"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gs = require("./_export");
function test_Plane_getCartesians() {
    const m = new gs.Model();
    const g = m.getGeom();
    const origin = g.addPoint([0, 0, 0]);
    const plane = g.addPlane(origin, [0, 0, 1], [0, 1, 0]);
    const cart = plane.getCartesians();
    return true;
}
exports.test_Plane_getCartesians = test_Plane_getCartesians;
function test_Plane_getAxes() {
    const m = new gs.Model();
    const g = m.getGeom();
    const origin = g.addPoint([0, 0, 0]);
    const plane = g.addPlane(origin, [1, 2, 3], [4, 5, 6]);
    const vectors = plane.getAxes();
    const plane2 = g.addPlane(origin, vectors[0], vectors[1]);
    return true;
}
exports.test_Plane_getAxes = test_Plane_getAxes;
//# sourceMappingURL=_entity_obj_plane_tests.js.map