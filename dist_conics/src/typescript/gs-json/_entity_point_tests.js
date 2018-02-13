"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arr_1 = require("./libs/arr/arr");
const gs = require("./_export");
const test_data = require("./test_data");
// Point tests, extends Entities by 4 complementary methods
function test_point_getGeomType() {
    const m = new gs.Model(test_data.box_with_groups());
    const geom = m.getGeom();
    const a1 = geom.getPoint(0);
    if (!(a1.getGeomType() === gs.EGeomType.points)) {
        return false;
    }
    return true;
}
exports.test_point_getGeomType = test_point_getGeomType;
function test_point_setPosition() {
    const model = new gs.Model();
    const point = model.getGeom().addPoint([11, 22, 33]);
    point.setPosition([4, 5, 6]);
    if ((arr_1.Arr.equal(point.getPosition(), [11, 22, 33]))) {
        return false;
    }
    if (!(arr_1.Arr.equal(point.getPosition(), [4, 5, 6]))) {
        return false;
    }
    // if(!(Arr.equal(point.getPosition(),null))) {return false;}
    // point.setPosition([1,2]); //what should this do?
    // point.setPosition([1,2,3,4]); //what should this do?
    // point.setPosition([1,,2]); //sparse array
    return true;
}
exports.test_point_setPosition = test_point_setPosition;
function test_point_getPosition() {
    const model = new gs.Model();
    const point = model.getGeom().addPoint([11, 22, 33]);
    point.setPosition([4, 5, 6]);
    const pos = point.getPosition();
    return arr_1.Arr.equal([4, 5, 6], pos);
}
exports.test_point_getPosition = test_point_getPosition;
function test_point_getVertices() {
    const m = new gs.Model(test_data.open_box());
    const geom = m.getGeom();
    const p0 = m.getGeom().getPoint(0);
    const p1 = m.getGeom().getPoint(1);
    const p2 = m.getGeom().getPoint(2);
    const p3 = m.getGeom().getPoint(3);
    const p4 = m.getGeom().getPoint(4);
    const p5 = m.getGeom().getPoint(5);
    const p6 = m.getGeom().getPoint(6);
    const p7 = m.getGeom().getPoint(7);
    if (!(p0.getVertices().length === 3)) {
        return false;
    }
    if (!(p0.getVertices()[0].getWireOrFace().getTopoPath().ti === 0)) {
        return false;
    }
    if (!(p0.getVertices()[0].getTopoPath().si === 0)) {
        return false;
    }
    if (!(p0.getVertices()[1].getTopoPath().ti === 0)) {
        return false;
    }
    if (!(p0.getVertices()[1].getTopoPath().si === 3)) {
        return false;
    }
    if (!(p0.getVertices()[2].getTopoPath().ti === 3)) {
        return false;
    }
    if (!(p0.getVertices()[2].getTopoPath().si === 0)) {
        return false;
    }
    if (!(p1.getVertices().length === 3)) {
        return false;
    }
    if (!(p2.getVertices().length === 3)) {
        return false;
    }
    if (!(p3.getVertices().length === 3)) {
        return false;
    }
    if (!(p4.getVertices().length === 3)) {
        return false;
    }
    if (!(p5.getVertices().length === 3)) {
        return false;
    }
    if (!(p6.getVertices().length === 3)) {
        return false;
    }
    if (!(p7.getVertices().length === 3)) {
        return false;
    }
    return true;
}
exports.test_point_getVertices = test_point_getVertices;
function test_point_exists() {
    const model = new gs.Model();
    const point = model.getGeom().addPoint([11, 22, 33]);
    if (!point.exists()) {
        return false;
    }
    return true;
}
exports.test_point_exists = test_point_exists;
//# sourceMappingURL=_entity_point_tests.js.map