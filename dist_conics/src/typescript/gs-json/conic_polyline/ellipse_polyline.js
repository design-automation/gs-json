"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three = require("three");
/*
*
* Function which creates a set of 50 points and polyline to the geometry from a 3D Ellipse
*
*/
function ellipse_polyline(ellipse) {
    // To test
    const points = [];
    const polyline = [];
    const model = ellipse.getModel();
    const geometry = model.getGeom();
    const a = new three.Vector3(ellipse.getAxes()[0][0], ellipse.getAxes()[0][1], ellipse.getAxes()[0][2]).length();
    const b = new three.Vector3(ellipse.getAxes()[1][0], ellipse.getAxes()[1][1], ellipse.getAxes()[1][2]).length();
    if (a < b) {
        throw new Error("Enter a>=b");
    }
    const e = Math.sqrt(1 - (b / a) * (b / a));
    const c = Math.sqrt(a * a - b * b);
    const param = b * b / a;
    const angle0 = ((ellipse.getAngles()[0] % 360) + 360) % 360;
    const angle1 = ((ellipse.getAngles()[1] % 360) + 360) % 360;
    const U1 = new three.Vector3(ellipse.getAxes()[0][0], ellipse.getAxes()[0][1], ellipse.getAxes()[0][2]).normalize();
    const V1 = new three.Vector3(ellipse.getAxes()[1][0], ellipse.getAxes()[1][1], ellipse.getAxes()[1][2]).normalize();
    const focal = new three.Vector3(ellipse.getOrigin().getPosition()[0] + c * U1.x, ellipse.getOrigin().getPosition()[1] + c * U1.y, ellipse.getOrigin().getPosition()[2] + c * U1.z);
    let theta = angle0 * (2 * Math.PI) / 360;
    let r;
    const N = 200;
    const d_theta = (((((angle1 - angle0) % 360) + 360) % 360) / (N - 1)) * (2 * Math.PI) / 360;
    for (let k = 0; k < N; k++) {
        r = param / (1 + e * Math.cos(theta));
        const point = new three.Vector3(focal.x + r * Math.cos(theta) * U1.x + r * Math.sin(theta) * V1.x, focal.y + r * Math.cos(theta) * U1.y + r * Math.sin(theta) * V1.y, focal.z + r * Math.cos(theta) * U1.z + r * Math.sin(theta) * V1.z);
        points.push(geometry.addPoint([point.x, point.y, point.z]));
        theta = theta + d_theta;
        // console.log([point.x,point.y,point.z]);
        // console.log("r = " + r)
        // console.log("focal = " + [focal.x,focal.y,focal.z])
        // console.log("theta = " + theta);
    }
    return geometry.addPolyline(points, false);
}
exports.ellipse_polyline = ellipse_polyline;
//# sourceMappingURL=ellipse_polyline.js.map