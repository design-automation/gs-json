"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three = require("three");
const util = require("../_utils");
/*
*
* Function which creates a set of 250 points and polyline to the geometry from a 3D Parabola
*
*/
function parabola_polyline(parabola) {
    const points = [];
    const polyline = [];
    const model = parabola.getModel();
    const geometry = model.getGeom();
    const p = new three.Vector3(parabola.getAxes()[0][0], parabola.getAxes()[0][1], parabola.getAxes()[0][2]).length();
    const angle0 = ((parabola.getAngles()[0] % 360) + 360) % 360;
    let angle1 = (((parabola.getAngles()[1] % 360) + 360) % 360);
    if (angle1 < angle0) {
        angle1 = angle1 + 360;
    }
    const U1 = new three.Vector3(parabola.getAxes()[0][0], parabola.getAxes()[0][1], parabola.getAxes()[0][2]).normalize();
    const V1 = new three.Vector3(parabola.getAxes()[1][0], parabola.getAxes()[1][1], parabola.getAxes()[1][2]).normalize();
    const center = new three.Vector3(parabola.getOrigin().getPosition()[0], parabola.getOrigin().getPosition()[1], parabola.getOrigin().getPosition()[2]);
    let theta = angle0 * (2 * Math.PI) / 360;
    let r;
    const N = 500;
    const d_theta = (angle1 - angle0) / N * 2 * Math.PI / 360;
    for (let k = 0; k < N; k++) {
        r = p / (1 + Math.cos(theta - (Math.PI / 2)));
        const point = new three.Vector3(center.x + r * Math.cos(theta) * U1.x + r * Math.sin(theta) * V1.x, center.y + r * Math.cos(theta) * U1.y + r * Math.sin(theta) * V1.y, center.z + r * Math.cos(theta) * U1.z + r * Math.sin(theta) * V1.z);
        points.push(geometry.addPoint([point.x, point.y, point.z]));
        theta = theta + d_theta;
    }
    return geometry.addPolyline(points, false);
}
exports.parabola_polyline = parabola_polyline;
function Function_F(x) {
    let y = null;
    const t1 = Math.sqrt(1 + x * x);
    y = (1 / 2) * (x * t1 + Math.log(x + t1));
    return y;
}
exports.Function_F = Function_F;
function parabola_length(curve) {
    const p = curve.getRadii()[0];
    const angles = util.checkParabolaAngles(curve.getAngles());
    const x0 = (p / (1 + Math.cos((angles[0] * (2 * Math.PI) / 360)
        - (Math.PI / 2)))) * Math.sin((angles[0] * (2 * Math.PI) / 360) - (Math.PI / 2));
    const x1 = (p / (1 + Math.cos((angles[1] * (2 * Math.PI) / 360)
        - (Math.PI / 2)))) * Math.sin((angles[1] * (2 * Math.PI) / 360) - (Math.PI / 2));
    return Math.abs(p * (Function_F(x1 / p) - Function_F(x0 / p)));
}
exports.parabola_length = parabola_length;
function parabola_find_angle(curve, length) {
    //Approx 1
    const angles = curve.getAngles();
    let alpha_0 = angles[0];
    let eps = -1;
    while (eps < 0) {
        curve.setAngles([angles[0], alpha_0]);
        eps = parabola_length(curve) - length;
        alpha_0 = alpha_0 + 0.01;
    }
    curve.setAngles(angles);
    return alpha_0;
}
exports.parabola_find_angle = parabola_find_angle;
function parabola_evaluate(curve, t) {
    if (t < 0 || t > 1) {
        throw new Error("Set t in range [0;1]");
    }
    const l = parabola_length(curve);
    const len = t * l;
    const alpha = parabola_find_angle(curve, len);
    const U1 = new three.Vector3(curve.getAxes()[0][0], curve.getAxes()[0][1], curve.getAxes()[0][2]).normalize();
    const V1 = new three.Vector3(curve.getAxes()[1][0], curve.getAxes()[1][1], curve.getAxes()[1][2]).normalize();
    const center = new three.Vector3(curve.getOrigin().getPosition()[0], curve.getOrigin().getPosition()[1], curve.getOrigin().getPosition()[2]);
    const p = new three.Vector3(curve.getAxes()[0][0], curve.getAxes()[0][1], curve.getAxes()[0][2]).length();
    const r = p / (1 + Math.cos(alpha * Math.PI / 180 - (Math.PI / 2)));
    const point = new three.Vector3(center.x + r * Math.cos(alpha * Math.PI / 180) * U1.x + r * Math.sin(alpha * Math.PI / 180) * V1.x, center.y + r * Math.cos(alpha * Math.PI / 180) * U1.y + r * Math.sin(alpha * Math.PI / 180) * V1.y, center.z + r * Math.cos(alpha * Math.PI / 180) * U1.z + r * Math.sin(alpha * Math.PI / 180) * V1.z);
    return [point.x, point.y, point.z];
}
exports.parabola_evaluate = parabola_evaluate;
function parabola_renderXYZ(curve, resolution) {
    const N = Math.floor(1 / resolution);
    const render_XYZ = [];
    let t = 0;
    const dk = 1 / N;
    for (let k = 0; k < N; k++) {
        render_XYZ.push(parabola_evaluate(curve, t));
        t = t + dk;
    }
    return render_XYZ;
}
exports.parabola_renderXYZ = parabola_renderXYZ;
function parabola_polyline_renderXYZ(curve) {
    const resolution = 0.01;
    const points = curve.getGeom().addPoints(parabola_renderXYZ(curve, resolution));
    const pline = curve.getGeom().addPolyline(points, false);
    return pline;
}
exports.parabola_polyline_renderXYZ = parabola_polyline_renderXYZ;
//# sourceMappingURL=parabola_polyline.js.map