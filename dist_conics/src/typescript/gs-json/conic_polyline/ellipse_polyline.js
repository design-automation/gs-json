"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three = require("three");
/*
*
* Function which creates a set of points and polyline to the geometry from a 3D Ellipse
*
*/
function ellipse_polyline(ellipse) {
    const points = [];
    const polyline = [];
    const model = ellipse.getModel();
    const geometry = model.getGeom();
    const a = new three.Vector3(ellipse.getAxes()[0][0], ellipse.getAxes()[0][1], ellipse.getAxes()[0][2]).length();
    const b = new three.Vector3(ellipse.getAxes()[1][0], ellipse.getAxes()[1][1], ellipse.getAxes()[1][2]).length();
    const angle0 = ((ellipse.getAngles()[0] % 360) + 360) % 360;
    let angle1 = (((ellipse.getAngles()[1] % 360) + 360) % 360);
    if (angle1 < angle0) {
        angle1 = angle1 + 360;
    }
    const U1 = new three.Vector3(ellipse.getAxes()[0][0], ellipse.getAxes()[0][1], ellipse.getAxes()[0][2]).normalize();
    const V1 = new three.Vector3(ellipse.getAxes()[1][0], ellipse.getAxes()[1][1], ellipse.getAxes()[1][2]).normalize();
    const center = new three.Vector3(ellipse.getOrigin().getPosition()[0], ellipse.getOrigin().getPosition()[1], ellipse.getOrigin().getPosition()[2]);
    let theta = angle0 * (2 * Math.PI) / 360;
    let r;
    const N = 50;
    const d_theta = (angle1 - angle0) / (N) * (2 * Math.PI) / 360;
    for (let k = 0; k < N; k++) {
        r = (a * b) / (Math.sqrt((b * Math.cos(theta)) * (b * Math.cos(theta)) + (a * Math.sin(theta)) * (a * Math.sin(theta))));
        const point = new three.Vector3(center.x + r * Math.cos(theta) * U1.x + r * Math.sin(theta) * V1.x, center.y + r * Math.cos(theta) * U1.y + r * Math.sin(theta) * V1.y, center.z + r * Math.cos(theta) * U1.z + r * Math.sin(theta) * V1.z);
        points.push(geometry.addPoint([point.x, point.y, point.z]));
        theta = theta + d_theta;
    }
    return geometry.addPolyline(points, false);
}
exports.ellipse_polyline = ellipse_polyline;
function circle_polyline(circle) {
    const points = [];
    const polyline = [];
    const model = circle.getModel();
    const geometry = model.getGeom();
    const a = new three.Vector3(circle.getAxes()[0][0], circle.getAxes()[0][1], circle.getAxes()[0][2]).length();
    const b = new three.Vector3(circle.getAxes()[1][0], circle.getAxes()[1][1], circle.getAxes()[1][2]).length();
    const angle0 = ((circle.getAngles()[0] % 360) + 360) % 360;
    let angle1 = (((circle.getAngles()[1] % 360) + 360) % 360);
    if (angle1 < angle0) {
        angle1 = angle1 + 360;
    }
    const U1 = new three.Vector3(circle.getAxes()[0][0], circle.getAxes()[0][1], circle.getAxes()[0][2]).normalize();
    const V1 = new three.Vector3(circle.getAxes()[1][0], circle.getAxes()[1][1], circle.getAxes()[1][2]).normalize();
    const center = new three.Vector3(circle.getOrigin().getPosition()[0], circle.getOrigin().getPosition()[1], circle.getOrigin().getPosition()[2]);
    let theta = angle0 * (2 * Math.PI) / 360;
    let r;
    const N = 50;
    const d_theta = (angle1 - angle0) / (N) * (2 * Math.PI) / 360;
    for (let k = 0; k < N; k++) {
        r = (a * b) / (Math.sqrt((b * Math.cos(theta)) * (b * Math.cos(theta)) + (a * Math.sin(theta)) * (a * Math.sin(theta))));
        const point = new three.Vector3(center.x + r * Math.cos(theta) * U1.x + r * Math.sin(theta) * V1.x, center.y + r * Math.cos(theta) * U1.y + r * Math.sin(theta) * V1.y, center.z + r * Math.cos(theta) * U1.z + r * Math.sin(theta) * V1.z);
        points.push(geometry.addPoint([point.x, point.y, point.z]));
        theta = theta + d_theta;
    }
    return geometry.addPolyline(points, false);
}
exports.circle_polyline = circle_polyline;
function ellipse_length(curve, subdivision) {
    // Approx 1.1
    const a = new three.Vector3(curve.getAxes()[0][0], curve.getAxes()[0][1], curve.getAxes()[0][2]).length();
    const b = new three.Vector3(curve.getAxes()[1][0], curve.getAxes()[1][1], curve.getAxes()[1][2]).length();
    const angle0 = ((curve.getAngles()[0] % 360) + 360) % 360;
    let angle1 = (((curve.getAngles()[1] % 360) + 360) % 360);
    if (angle1 < angle0) {
        angle1 = angle1 + 360;
    }
    if (curve.getAngles()[0] !== curve.getAngles()[1] && angle1 === angle0) {
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
    return distance;
}
exports.ellipse_length = ellipse_length;
function ellipse_find_angle(curve, length, subdivision) {
    // Approx 1.2
    const angles = curve.getAngles();
    let alpha_0 = angles[0];
    let eps = -1;
    while (eps < 0) {
        curve.setAngles([angles[0], alpha_0]);
        eps = ellipse_length(curve, subdivision) - length;
        alpha_0 = alpha_0 + 0.01;
    }
    curve.setAngles(angles);
    alpha_0 = ((alpha_0 % 360) + 360) % 360;
    return alpha_0;
}
exports.ellipse_find_angle = ellipse_find_angle;
function ellipse_evaluate(curve, t, subdivision) {
    if (t < 0 || t > 1) {
        throw new Error("Set t in range [0;1]");
    }
    const l = ellipse_length(curve, subdivision);
    const len = t * l;
    const alpha = ellipse_find_angle(curve, len, subdivision);
    const U1 = new three.Vector3(curve.getAxes()[0][0], curve.getAxes()[0][1], curve.getAxes()[0][2]).normalize();
    const V1 = new three.Vector3(curve.getAxes()[1][0], curve.getAxes()[1][1], curve.getAxes()[1][2]).normalize();
    const center = new three.Vector3(curve.getOrigin().getPosition()[0], curve.getOrigin().getPosition()[1], curve.getOrigin().getPosition()[2]);
    const a = new three.Vector3(curve.getAxes()[0][0], curve.getAxes()[0][1], curve.getAxes()[0][2]).length();
    const b = new three.Vector3(curve.getAxes()[1][0], curve.getAxes()[1][1], curve.getAxes()[1][2]).length();
    const r = (a * b) / (Math.sqrt((b * Math.cos(alpha * Math.PI / 180)) * (b * Math.cos(alpha * Math.PI / 180)) +
        (a * Math.sin(alpha * Math.PI / 180)) * (a * Math.sin(alpha * Math.PI / 180))));
    const point = new three.Vector3(center.x + r * Math.cos(alpha * Math.PI / 180) * U1.x + r * Math.sin(alpha * Math.PI / 180) * V1.x, center.y + r * Math.cos(alpha * Math.PI / 180) * U1.y + r * Math.sin(alpha * Math.PI / 180) * V1.y, center.z + r * Math.cos(alpha * Math.PI / 180) * U1.z + r * Math.sin(alpha * Math.PI / 180) * V1.z);
    return [point.x, point.y, point.z];
}
exports.ellipse_evaluate = ellipse_evaluate;
function ellipse_renderXYZ(curve, resolution) {
    const N = Math.floor(1 / resolution);
    const render_XYZ = [];
    let t = 0;
    const dk = 1 / N;
    for (let k = 0; k < N; k++) {
        render_XYZ.push(ellipse_evaluate(curve, Math.min(t, 1), 0.01));
        t = t + dk;
    }
    return render_XYZ;
}
exports.ellipse_renderXYZ = ellipse_renderXYZ;
function ellipse_polyline_renderXYZ(curve) {
    const resolution = 0.02;
    const points = curve.getGeom().addPoints(ellipse_renderXYZ(curve, resolution));
    const pline = curve.getGeom().addPolyline(points, false);
    return pline;
}
exports.ellipse_polyline_renderXYZ = ellipse_polyline_renderXYZ;
//# sourceMappingURL=ellipse_polyline.js.map