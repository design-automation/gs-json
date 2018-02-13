"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three = require("three");
/*
*
* Function which creates a set of 50 points and polyline to the geometry from a 3D Hyperbola
*
*/
function hyperbola_polyline(hyperbola) {
    // To test
    const points = [];
    const polyline = [];
    const model = hyperbola.getModel();
    const geometry = model.getGeom();
    const a = new three.Vector3(hyperbola.getAxes()[0][0], hyperbola.getAxes()[0][1], hyperbola.getAxes()[0][2]).length();
    const b = new three.Vector3(hyperbola.getAxes()[1][0], hyperbola.getAxes()[1][1], hyperbola.getAxes()[1][2]).length();
    const e = Math.sqrt(1 + (b / a) * (b / a));
    const c = Math.sqrt(a * a - b * b);
    const param = (b * b) / Math.sqrt(a * a + b * b);
    const angle0 = ((hyperbola.getAngles()[0] % 360) + 360) % 360;
    const angle1 = ((hyperbola.getAngles()[1] % 360) + 360) % 360;
    if (angle0 > angle1) {
        throw new Error("Swap angles");
    }
    const U1 = new three.Vector3(hyperbola.getAxes()[0][0], hyperbola.getAxes()[0][1], hyperbola.getAxes()[0][2]).normalize();
    const V1 = new three.Vector3(hyperbola.getAxes()[1][0], hyperbola.getAxes()[1][1], hyperbola.getAxes()[1][2]).normalize();
    const focal = new three.Vector3(hyperbola.getOrigin().getPosition()[0] + c * U1.x, hyperbola.getOrigin().getPosition()[1] + c * U1.y, hyperbola.getOrigin().getPosition()[2] + c * U1.z);
    let theta = angle0 * (2 * Math.PI) / 360;
    let r;
    const N = 50;
    const d_theta = (((((angle1 - angle0) % 360) + 360) % 360) / (N - 1)) * (2 * Math.PI) / 360;
    for (let k = 0; k < N; k++) {
        r = param / (1 + e * Math.cos(theta - (Math.PI / 2)));
        const point = new three.Vector3(focal.x + r * Math.cos(theta) * U1.x + r * Math.sin(theta) * V1.x, focal.y + r * Math.cos(theta) * U1.y + r * Math.sin(theta) * V1.y, focal.z + r * Math.cos(theta) * U1.z + r * Math.sin(theta) * V1.z);
        points.push(geometry.addPoint([point.x, point.y, point.z]));
        theta = theta + d_theta;
    }
    return geometry.addPolyline(points, false);
}
exports.hyperbola_polyline = hyperbola_polyline;
//# sourceMappingURL=hyperbola_polyline.js.map