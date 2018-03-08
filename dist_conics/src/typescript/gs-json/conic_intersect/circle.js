"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ellipse_1 = require("./ellipse");
const three = require("three");
function circle_circle(circle1, circle2) {
    const v1_c1 = new three.Vector3(circle1.getAxes()[0][0], circle1.getAxes()[0][1], circle1.getAxes()[0][2]);
    const v2_c1 = new three.Vector3(circle1.getAxes()[1][0], circle1.getAxes()[1][1], circle1.getAxes()[1][2]);
    const r_c1 = 1;
    const ellipse1 = circle1.getGeom().addEllipse(circle1.getOrigin(), [r_c1 * v1_c1.x, r_c1 * v1_c1.y, r_c1 * v1_c1.z], [r_c1 * v2_c1.x, r_c1 * v2_c1.y, r_c1 * v2_c1.z], circle1.getAngles());
    const v1_c2 = new three.Vector3(circle2.getAxes()[0][0], circle2.getAxes()[0][1], circle2.getAxes()[0][2]);
    const v2_c2 = new three.Vector3(circle2.getAxes()[1][0], circle2.getAxes()[1][1], circle2.getAxes()[1][2]);
    const r_c2 = 1;
    const ellipse2 = circle2.getGeom().addEllipse(circle2.getOrigin(), [r_c2 * v1_c2.x, r_c2 * v1_c2.y, r_c2 * v1_c2.z], [r_c2 * v2_c2.x, r_c2 * v2_c2.y, r_c2 * v2_c2.z], circle2.getAngles());
    const results = ellipse_1.ellipse_ellipse(ellipse1, ellipse2);
    circle1.getGeom().delObj(ellipse1, false);
    circle1.getGeom().delObj(ellipse2, false);
    return results;
}
exports.circle_circle = circle_circle;
//# sourceMappingURL=circle.js.map