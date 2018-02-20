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
function hyperbola_length(curve, subdivision) {
    // Approx 1.1
    const a = new three.Vector3(curve.getAxes()[0][0], curve.getAxes()[0][1], curve.getAxes()[0][2]).length();
    const b = new three.Vector3(curve.getAxes()[1][0], curve.getAxes()[1][1], curve.getAxes()[1][2]).length();
    const angle0 = ((curve.getAngles()[0] % 360) + 360) % 360;
    let angle1 = (((curve.getAngles()[1] % 360) + 360) % 360);
    if (angle1 < angle0) {
        angle1 = angle1 + 360;
    }
    const U1 = new three.Vector3(curve.getAxes()[0][0], curve.getAxes()[0][1], curve.getAxes()[0][2]).normalize();
    const V1 = new three.Vector3(curve.getAxes()[1][0], curve.getAxes()[1][1], curve.getAxes()[1][2]).normalize();
    let theta = angle0 * (2 * Math.PI) / 360;
    let r;
    const N = subdivision;
    const d_theta = ((angle1 - angle0) / N) * (2 * Math.PI) / 360;
    let distance = 0;
    for (let k = 0; k < N; k++) {
        r = (a * b) / (Math.sqrt((b * Math.cos(theta)) * (b * Math.cos(theta)) + (a * Math.sin(theta)) * (a * Math.sin(theta))));
        const vector_point = new three.Vector3(r * Math.cos(theta) * U1.x + r * Math.sin(theta) * V1.x, r * Math.cos(theta) * U1.y + r * Math.sin(theta) * V1.y, r * Math.cos(theta) * U1.z + r * Math.sin(theta) * V1.z);
        distance = distance + vector_point.length() * d_theta;
        theta = theta + d_theta;
    }
    // return distance;
    // Approx 1.2
    const pline = hyperbola_polyline(curve);
    const table = [];
    for (const point of pline.getPointsArr()) {
        table.push(new three.Vector3(point.getPosition()[0], point.getPosition()[1], point.getPosition()[2]));
    }
    let distance_2 = 0;
    for (let k = 0; k < table.length - 1; k++) {
        const line = new three.Vector3(table[k + 1].x - table[k].x, table[k + 1].y - table[k].y, table[k + 1].z - table[k].z);
        distance_2 = distance_2 + line.length();
    }
    return distance_2;
}
exports.hyperbola_length = hyperbola_length;
function hyperbola_find_angle(curve, length, subdivision) {
    //Approx 1.2
    const angles = curve.getAngles();
    let alpha_0 = angles[0];
    let eps = -1;
    while (eps < 0) {
        curve.setAngles([angles[0], alpha_0]);
        eps = hyperbola_length(curve, subdivision) - length;
        alpha_0 = alpha_0 + 0.01;
    }
    curve.setAngles(angles);
    alpha_0 = ((alpha_0 % 360) + 360) % 360;
    return alpha_0;
}
exports.hyperbola_find_angle = hyperbola_find_angle;
function hyperbola_evaluate(curve, t, subdivision) {
    if (t < 0 || t > 1) {
        throw new Error("Set t in range [0;1]");
    }
    const l = hyperbola_length(curve, subdivision);
    const len = t * l;
    const alpha = hyperbola_find_angle(curve, len, subdivision);
    const U1 = new three.Vector3(curve.getAxes()[0][0], curve.getAxes()[0][1], curve.getAxes()[0][2]).normalize();
    const V1 = new three.Vector3(curve.getAxes()[1][0], curve.getAxes()[1][1], curve.getAxes()[1][2]).normalize();
    const center = new three.Vector3(curve.getOrigin().getPosition()[0], curve.getOrigin().getPosition()[1], curve.getOrigin().getPosition()[2]);
    const a = new three.Vector3(curve.getAxes()[1][0], curve.getAxes()[1][1], curve.getAxes()[1][2]).length();
    const b = new three.Vector3(curve.getAxes()[0][0], curve.getAxes()[0][1], curve.getAxes()[0][2]).length();
    const e = Math.sqrt(1 + (b / a) * (b / a));
    const param = (b * b) / Math.sqrt(a * a + b * b);
    const r = param / (1 + e * Math.cos(alpha * Math.PI / 180 - (Math.PI / 2)));
    const point = new three.Vector3(center.x + r * Math.cos(alpha * Math.PI / 180) * U1.x + r * Math.sin(alpha * Math.PI / 180) * V1.x, center.y + r * Math.cos(alpha * Math.PI / 180) * U1.y + r * Math.sin(alpha * Math.PI / 180) * V1.y, center.z + r * Math.cos(alpha * Math.PI / 180) * U1.z + r * Math.sin(alpha * Math.PI / 180) * V1.z);
    return [point.x, point.y, point.z];
}
exports.hyperbola_evaluate = hyperbola_evaluate;
function hyperbola_renderXYZ(curve, resolution) {
    const N = Math.floor(1 / resolution);
    const render_XYZ = [];
    let t = 0;
    const dk = 1 / N;
    for (let k = 0; k < N; k++) {
        render_XYZ.push(hyperbola_evaluate(curve, Math.min(t, 1), 0.01));
        t = t + dk;
    }
    return render_XYZ;
}
exports.hyperbola_renderXYZ = hyperbola_renderXYZ;
function hyperbola_polyline_renderXYZ(curve) {
    const resolution = 0.02;
    const points = curve.getGeom().addPoints(hyperbola_renderXYZ(curve, resolution));
    const pline = curve.getGeom().addPolyline(points, false);
    return pline;
}
exports.hyperbola_polyline_renderXYZ = hyperbola_polyline_renderXYZ;
//# sourceMappingURL=hyperbola_polyline.js.map