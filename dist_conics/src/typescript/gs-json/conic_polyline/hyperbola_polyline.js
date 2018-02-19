"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three = require("three");
/*
*
* Function which creates a set of 50 points and polyline to the geometry from a 3D Hyperbola
*
*/
function hyperbola_polyline(hyperbola) {
    const points = [];
    const polyline = [];
    const model = hyperbola.getModel();
    const geometry = model.getGeom();
    const a = new three.Vector3(hyperbola.getAxes()[1][0], hyperbola.getAxes()[1][1], hyperbola.getAxes()[1][2]).length();
    const b = new three.Vector3(hyperbola.getAxes()[0][0], hyperbola.getAxes()[0][1], hyperbola.getAxes()[0][2]).length();
    const e = Math.sqrt(1 + (b / a) * (b / a));
    const c = Math.sqrt(a * a - b * b);
    const param = (b * b) / Math.sqrt(a * a + b * b);
    const angle0 = ((hyperbola.getAngles()[0] % 360) + 360) % 360;
    let angle1 = (((hyperbola.getAngles()[1] % 360) + 360) % 360);
    if (angle1 < angle0) {
        angle1 = angle1 + 360;
    }
    const U1 = new three.Vector3(hyperbola.getAxes()[0][0], hyperbola.getAxes()[0][1], hyperbola.getAxes()[0][2]).normalize();
    const V1 = new three.Vector3(hyperbola.getAxes()[1][0], hyperbola.getAxes()[1][1], hyperbola.getAxes()[1][2]).normalize();
    const center = new three.Vector3(hyperbola.getOrigin().getPosition()[0], hyperbola.getOrigin().getPosition()[1], hyperbola.getOrigin().getPosition()[2]);
    let theta = angle0 * (2 * Math.PI) / 360;
    let r;
    const N = 50;
    const d_theta = (((((angle1 - angle0) % 360) + 360) % 360) / N * (2 * Math.PI) / 360);
    for (let k = 0; k < N; k++) {
        r = param / (1 + e * Math.cos(theta - (Math.PI / 2)));
        const value = (1 + e * Math.cos(theta - (Math.PI / 2)));
        const angle_value = (theta * 180 / Math.PI) % 360;
        const point = new three.Vector3(center.x + r * Math.cos(theta) * U1.x + r * Math.sin(theta) * V1.x, center.y + r * Math.cos(theta) * U1.y + r * Math.sin(theta) * V1.y, center.z + r * Math.cos(theta) * U1.z + r * Math.sin(theta) * V1.z);
        points.push(geometry.addPoint([point.x, point.y, point.z]));
        theta = theta + d_theta;
    }
    return geometry.addPolyline(points, false);
}
exports.hyperbola_polyline = hyperbola_polyline;
//# sourceMappingURL=hyperbola_polyline.js.map