"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three = require("three");
/*
*
* Function which creates a set of 50 points and polyline to the geometry from a 3D Parabola
*
*/
function parabola_polyline(parabola) {
    // To test
    const points = [];
    const polyline = [];
    const model = parabola.getModel();
    const geometry = model.getGeom();
    const p = new three.Vector3(parabola.getAxes()[0][0], parabola.getAxes()[0][1], parabola.getAxes()[0][2]).length();
    const param = p;
    const angle0 = ((parabola.getAngles()[0] % 360) + 360) % 360;
    const angle1 = ((parabola.getAngles()[1] % 360) + 360) % 360;
    if (angle0 > angle1) {
        throw new Error("Swap angles");
    }
    const U1 = new three.Vector3(parabola.getAxes()[0][0], parabola.getAxes()[0][1], parabola.getAxes()[0][2]).normalize();
    const V1 = new three.Vector3(parabola.getAxes()[1][0], parabola.getAxes()[1][1], parabola.getAxes()[1][2]).normalize();
    const focal = new three.Vector3(parabola.getOrigin().getPosition()[0], parabola.getOrigin().getPosition()[1], parabola.getOrigin().getPosition()[2]);
    let theta = angle0 * (2 * Math.PI) / 360;
    let r;
    const N = 50;
    const d_theta = (((((angle1 - angle0) % 360) + 360) % 360) / (N - 1)) * (2 * Math.PI) / 360;
    for (let k = 0; k < N; k++) {
        r = param / (1 + Math.cos(theta - (Math.PI / 2)));
        const point = new three.Vector3(focal.x + r * Math.cos(theta) * U1.x + r * Math.sin(theta) * V1.x, focal.y + r * Math.cos(theta) * U1.y + r * Math.sin(theta) * V1.y, focal.z + r * Math.cos(theta) * U1.z + r * Math.sin(theta) * V1.z);
        points.push(geometry.addPoint([point.x, point.y, point.z]));
        theta = theta + d_theta;
    }
    return geometry.addPolyline(points, false);
}
exports.parabola_polyline = parabola_polyline;
//# sourceMappingURL=parabola_polyline.js.map