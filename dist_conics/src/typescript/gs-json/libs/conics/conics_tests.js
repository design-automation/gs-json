"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cs = require("./conics");
const gs = require("../../_export");
/**
 * Series of tests to verify Mathematic Conics implemented methods
 */
function test_circleLength() {
    const m = new gs.Model();
    const g = m.getGeom();
    const pt = g.addPoint([1, 2, 9]);
    const angle_1 = 45;
    const angle_2 = 145;
    const radius = 400;
    const threshold = 1e-6;
    let circle = null;
    for (let k = 1; k < 100; k++) {
        circle = g.addCircle(pt, [radius, 0, 0], [0, radius, 0], [Math.min(angle_1, angle_2 / k), Math.max(angle_1, angle_2 / k)]);
        if (Math.abs(cs.circleLength(circle)
            - radius * Math.abs(angle_2 / k - angle_1) * 2 * Math.PI / 360) > threshold) {
            return false;
        }
    }
    return true;
}
exports.test_circleLength = test_circleLength;
function test_circleEvaluate() {
    const m = new gs.Model();
    const g = m.getGeom();
    const pt = g.addPoint([1, 2, 9]);
    const angle_1 = 0;
    const angle_2 = 360;
    const vector_x = [0, 4, 0];
    const vector_y = [-4, 0, 0];
    const circle = g.addCircle(pt, vector_x, vector_y, [angle_1, angle_2]);
    const threshold = 1e-6;
    let xyz = null;
    let theta = null;
    let x = null;
    let y = null;
    let z = null;
    const init_angle = Math.PI / 2;
    // Evaluation on 99 points on the circle
    for (let k = 1; k < 100; k++) {
        xyz = cs.circleEvaluate(circle, 1 / k);
        theta = (circle.getAngles()[0] + (circle.getAngles()[1] - circle.getAngles()[0]) / k) * 2 * Math.PI / 360;
        x = circle.getRadius() * Math.cos(theta + init_angle) + circle.getOrigin().getPosition()[0];
        y = circle.getRadius() * Math.sin(theta + init_angle) + circle.getOrigin().getPosition()[1];
        z = circle.getOrigin().getPosition()[2];
        if (Math.abs(xyz[0] - x) > threshold) {
            return false;
        }
        if (Math.abs(xyz[1] - y) > threshold) {
            return false;
        }
        if (Math.abs(xyz[2] - z) > threshold) {
            return false;
        }
    }
    const t = 0;
    xyz = cs.circleEvaluate(circle, t);
    theta = (circle.getAngles()[0] + (circle.getAngles()[1] - circle.getAngles()[0]) * t) * 2 * Math.PI / 360;
    // const init_angle: number = Math.PI/2;
    x = circle.getRadius() * Math.cos(theta + init_angle) + circle.getOrigin().getPosition()[0];
    y = circle.getRadius() * Math.sin(theta + init_angle) + circle.getOrigin().getPosition()[1];
    z = circle.getOrigin().getPosition()[2];
    if (Math.abs(xyz[0] - x) > threshold) {
        return false;
    }
    if (Math.abs(xyz[1] - y) > threshold) {
        return false;
    }
    if (Math.abs(xyz[2] - z) > threshold) {
        return false;
    }
    return true;
}
exports.test_circleEvaluate = test_circleEvaluate;
function test_circleGetRenderXYZs() {
    const m = new gs.Model();
    const g = m.getGeom();
    // [0,x,y]
    const center1 = g.addPoint([1, 1, 0]);
    const circle1 = g.addCircle(center1, [1, 0, 0], [0, 1, 0], [0, 90]);
    //    console.log(cs.circleGetRenderXYZs(circle1,0.1));
    // Valid
    // [0,x,z]
    const center2 = g.addPoint([1, 2, 3]);
    const circle2 = g.addCircle(center2, [1, 0, 0], [0, 0, 1], [0, 90]);
    //    console.log(cs.circleGetRenderXYZs(circle2,0.1));
    // Valid
    // [0,y,z]
    const center3 = g.addPoint([0, 1, 2]);
    const circle3 = g.addCircle(center3, [0, 1, 0], [0, 0, 1], [0, 90]);
    //    console.log(cs.circleGetRenderXYZs(circle3,0.1));
    // Valid
    // [0,x,(y+z).normalize()]
    const center4 = g.addPoint([0, Math.sqrt(2) / 2, Math.sqrt(2) / 2]);
    const circle4 = g.addCircle(center4, [1, 0, 0], [0, Math.sqrt(2) / 2, Math.sqrt(2) / 2], [0, 90]);
    //    console.log(cs.circleGetRenderXYZs(circle4,0.1));
    // Valid
    // [0,(x+z).normalize()),y]
    const center5 = g.addPoint([Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2]);
    const circle5 = g.addCircle(center5, [Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2], [0, 1, 0], [0, 90]);
    //    console.log(cs.circleGetRenderXYZs(circle5,0.1));
    // Valid
    // In [0,-y,x] Plan
    const center6 = g.addPoint([0, -1, 0]);
    const circle6 = g.addCircle(center6, [0, -1, 0], [1, 0, 0], [0, 90]);
    // console.log(cs.circleGetRenderXYZs(circle6,0.1));
    // Valid
    return true;
}
exports.test_circleGetRenderXYZs = test_circleGetRenderXYZs;
function test_ellipseLength() {
    return true;
}
exports.test_ellipseLength = test_ellipseLength;
function test_ellipseEvaluate() {
    return true;
}
exports.test_ellipseEvaluate = test_ellipseEvaluate;
function test_ellipseGetRenderXYZs() {
    const m = new gs.Model();
    const g = m.getGeom();
    // [0,x,y]
    const center1 = g.addPoint([0, 0, 0]);
    const ellipse1 = g.addCircle(center1, [1, 0, 0], [0, 1, 0], [0, 360]);
    // console.log(cs.ellipseGetRenderXYZs(ellipse1,0.01));
    // Valid
    // [0,x,y]
    const center2 = g.addPoint([0, 0, 0]);
    const ellipse2 = g.addCircle(center2, [4, 0, 0], [0, 6, 0], [0, 360]);
    // console.log(cs.ellipseGetRenderXYZs(ellipse2,0.05));
    // // [0,x,z]
    // const center2: gs.IPoint = g.addPoint([0,0,0]);
    // const ellipse2: gs.IEllipse = g.addEllipse(center2,[0,4,0],[0,0,1],[0,90]);
    // console.log(cs.ellipseGetRenderXYZs(ellipse2,0.05));
    // // [0,y,z]
    // const center3: gs.IPoint = g.addPoint([0,0,0]);
    // const ellipse3: gs.IEllipse = g.addEllipse(center3,[0,1,0],[0,0,1],[0,90]);
    // // console.log(cs.ellipseGetRenderXYZs(ellipse3,0.05));
    return true;
}
exports.test_ellipseGetRenderXYZs = test_ellipseGetRenderXYZs;
//# sourceMappingURL=conics_tests.js.map