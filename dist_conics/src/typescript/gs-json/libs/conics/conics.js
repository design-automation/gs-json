"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gs = require("../../_export");
const threex = require("../threex/threex");
const three = require("three");
const utils = require("../../_utils");
/**
 * Calculate a set of xyz position on the circle/arc ir ellipse/arc. The number of points = length / resolution.
 * With resolution from 0.0001 to 0.5, 0.0001 being a higher resolution than 0.5
 */
function getRenderXYZs(obj, resolution) {
    switch (obj.getObjType()) {
        case 3 /* circle */:
            return circleGetRenderXYZs(obj, resolution);
        case 4 /* ellipse */:
            return ellipseGetRenderXYZs(obj, resolution);
        default:
            throw new Error("Invalid object type.");
    }
}
exports.getRenderXYZs = getRenderXYZs;
/**
 * Calculate the length of the circle or arc.
 */
function circleLength(circle) {
    const rad = circle.getRadius();
    const angles = circle.getAngles();
    // calculate the angle of the arc
    let arc_angle;
    if (angles === undefined) {
        return 2 * Math.PI * rad;
    }
    else if (angles[0] < angles[1]) {
        arc_angle = (angles[1] - angles[0]);
    }
    else {
        arc_angle = (angles[0] - angles[1]);
    }
    return 2 * Math.PI * rad * (arc_angle / 360);
}
exports.circleLength = circleLength;
/**
 * Calculate the xyz position at parameter t on the circle or arc. The t parameter range is from 0 to 1.
 */
function circleEvaluate(circle, t) {
    const rad = circle.getRadius();
    const angles = circle.getAngles();
    // calculat the arc start angle
    let arc_start;
    if (angles === undefined || angles === null) {
        arc_start = 0;
    }
    else if (angles[0] < angles[1]) {
        arc_start = angles[0] * (Math.PI / 180);
    }
    else {
        arc_start = angles[1] * (Math.PI / 180);
    }
    // calculate the angle of the arc
    let arc_angle;
    if (angles === undefined) {
        arc_angle = 2 * Math.PI;
    }
    else if (angles[0] < angles[1]) {
        arc_angle = (angles[1] - angles[0]) * (Math.PI / 180);
    }
    else {
        arc_angle = (angles[0] - angles[1]) * (Math.PI / 180);
    }
    // create matrix to map from XY plane into the 3D plane for circle
    const matrix_inv = threex.matrixInv(threex.xformMatrixFromXYZs(circle.getOrigin().getPosition(), circle.getAxes()));
    // calculate the point
    const alpha = arc_start + (t * arc_angle);
    const point = new three.Vector3(rad * Math.cos(alpha), rad * Math.sin(alpha), 0);
    point.applyMatrix4(matrix_inv);
    // return the points
    return point.toArray();
}
exports.circleEvaluate = circleEvaluate;
/**
 * Calculate a set of xyz position on the circle or arc. The number of points = length / resolution.
 * With resolution from 0.0001 to 0.5, 0.0001 being a higher resolution than 0.5
 */
function circleGetRenderXYZs(circle, resolution) {
    const rad = circle.getRadius();
    const angles = circle.getAngles();
    // calculat the arc start angle
    let arc_start;
    if (angles === undefined) {
        arc_start = 0;
    }
    else {
        arc_start = angles[0] * (Math.PI / 180);
    }
    // calculate the angle of the arc
    let arc_angle;
    if (angles === undefined) {
        arc_angle = 2 * Math.PI;
    }
    else if (angles[0] < angles[1]) {
        arc_angle = (angles[1] - angles[0]) * (Math.PI / 180);
    }
    else {
        arc_angle = (angles[0] - angles[1]) * (Math.PI / 180);
    }
    // calculate number of points
    let N = Math.floor(arc_angle / (Math.PI / 36));
    if (N < 3) {
        N = 3;
    }
    // create matrix to map from XY plane into the 3D plane for circle
    const matrix_inv = threex.matrixInv(threex.xformMatrixFromXYZs(circle.getOrigin().getPosition(), circle.getAxes()));
    // main loop to create points
    const xyz_points = [];
    for (let k = 0; k < N; k++) {
        const t = k / (N - 1);
        const alpha = arc_start + (t * arc_angle);
        const point = new three.Vector3(rad * Math.cos(alpha), rad * Math.sin(alpha), 0);
        point.applyMatrix4(matrix_inv);
        xyz_points.push(point.toArray());
    }
    // return the points
    return xyz_points;
}
exports.circleGetRenderXYZs = circleGetRenderXYZs;
/**
 * Calculate the length of the conic curve.
 */
function ellipseLength(curve) {
    // ConicCurve assumed to be an ellipse or circle;
    const vector_x = curve.getAxes()[0];
    const vector_y = curve.getAxes()[1];
    // Initial vector_x and vector_y require to be (almost) orthogonal
    const threshold = 1e-6;
    if (Math.abs(vector_x[0] * vector_y[0] + vector_x[1] * vector_y[1] + vector_x[2] * vector_y[2]) >= threshold) {
        throw new Error("Orthogonal vectors are required for that Ellipse / Conic length calculation");
    }
    const a = Math.sqrt(vector_x[0] * vector_x[0] + vector_x[1] * vector_x[1] + vector_x[2] * vector_x[2]);
    const b = Math.sqrt(vector_y[0] * vector_y[0] + vector_y[1] * vector_y[1] + vector_y[2] * vector_y[2]);
    const u = [a, 0];
    const v = [0, b];
    const angle_1 = curve.getAngles()[0] * (2 * Math.PI) / 360;
    const angle_2 = curve.getAngles()[1] * (2 * Math.PI) / 360;
    // Radians, although input angles are expected in Degrees
    if (Math.abs(a - b) < threshold) {
        return a * Math.abs(angle_2 - angle_1);
    }
    // Range [x1,x2] for length calculation would provide 2 circle arcs,
    // Whereas Angle_1 / Angle_2 provide a unique circle arc.
    let eccentricity = null;
    if (a > b) {
        eccentricity = Math.sqrt(1 - (b / a) * (b / a));
    }
    if (b > a) {
        eccentricity = Math.sqrt(1 - (a / b) * (a / b));
    }
    const K = 1000;
    let theta = null;
    const d_th = (angle_2 - angle_1) / K;
    let distance = 0;
    for (let k = 0; k < K; k++) {
        theta = angle_1 + k * (angle_2 - angle_1) / K;
        distance = distance + d_th *
            Math.sqrt(1 - eccentricity * Math.sin(theta) * eccentricity * Math.sin(theta));
        // distance along the curve assessed and updated at each timestep;
    }
    distance = Math.max(a, b) * distance;
    return distance;
}
exports.ellipseLength = ellipseLength;
/**
 * Calculate the xyz position at parameter t. The t parameter range is from 0 to 1.
 */
function ellipseEvaluate(curve, t) {
    // ConicCurve assumed to be an ellipse or circle;
    const vector_x = curve.getAxes()[0];
    const vector_y = curve.getAxes()[1];
    // Initial vector_x and vector_y require to be (almost) orthogonal
    const threshold = 1e-6;
    if (Math.abs(vector_x[0] * vector_y[0] + vector_x[1] * vector_y[1] + vector_x[2] * vector_y[2])
        >= threshold) {
        throw new Error("Orthogonal vectors are required for that Ellipse / Conic length calculation");
    }
    const a = Math.sqrt(vector_x[0] * vector_x[0] + vector_x[1] * vector_x[1] + vector_x[2] * vector_x[2]);
    const b = Math.sqrt(vector_y[0] * vector_y[0] + vector_y[1] * vector_y[1] + vector_y[2] * vector_y[2]);
    const u = [a, 0];
    const v = [0, b];
    const z_uv = [0, 0, u[0] * v[1] - u[1] * v[0]]; // cross product
    const angle_1 = curve.getAngles()[0] * (2 * Math.PI) / 360;
    const angle_2 = curve.getAngles()[1] * (2 * Math.PI) / 360;
    const l = ellipseLength(curve);
    let epsilon = 1;
    let theta = null;
    const K = 1000; // Does this not depend on the length of the ellipse?
    let x = null;
    let y = null;
    let r = null;
    let theta_t = null;
    const param = b * b / a;
    const m = new gs.Model();
    const g = m.getGeom();
    const pt = g.addPoint([0, 0, 0]);
    let curve_theta = null;
    for (let k = 0; k < K; k++) { // This loops 1000 x 1000 times !
        while (epsilon >= 0) {
            theta = (angle_1 + k * (angle_2 - angle_1) / K);
            curve_theta = g.addEllipse(curve.getOrigin(), curve.getAxes()[0], curve.getAxes()[1], [curve.getAngles()[0], theta]); // Why is this adding ellipses to the model?
            epsilon = t * l - ellipseLength(curve_theta);
            if (epsilon < 0) {
                theta_t = theta;
            }
        }
    }
    let eccentricity = null;
    if (a > b) {
        eccentricity = Math.sqrt(1 - (b / a) * (b / a));
    }
    if (b > a) {
        eccentricity = Math.sqrt(1 - (a / b) * (a / b));
    }
    r = param / (1 + eccentricity * Math.cos(theta_t));
    x = r * Math.cos(theta_t); // expressed in the plan inferred by (u,v)
    y = r * Math.sin(theta_t); // expressed in the plan inferred by (u,v)
    const U1 = new three.Vector3(curve.getAxes()[0][0], curve.getAxes()[0][1], curve.getAxes()[0][2]);
    const V1 = new three.Vector3(curve.getAxes()[1][0], curve.getAxes()[1][1], curve.getAxes()[1][2]);
    U1.normalize();
    V1.normalize();
    const O1O2 = new three.Vector3(curve.getOrigin()[0], curve.getOrigin()[1], curve.getOrigin()[2]);
    const O2P = threex.addVectors(U1.multiplyScalar(x), V1.multiplyScalar(y));
    const O1P = threex.addVectors(O1O2, O2P);
    return [O1P.x, O1P.y, O1P.z]; // Should work..
}
exports.ellipseEvaluate = ellipseEvaluate;
/**
 * Calculate a set of xyz position on the ellipse. The number of points = length / resolution.
 */
function ellipseGetRenderXYZs(curve, resolution) {
    const O = curve.getOrigin().getPosition();
    const renderingXYZs = [];
    const renderXYZs = [];
    let r = null;
    let theta = 0;
    let d_theta = 0;
    const U1 = new three.Vector3(...curve.getAxes()[0]).normalize();
    const V1 = new three.Vector3(...curve.getAxes()[1]).normalize();
    const a = new three.Vector3(...curve.getAxes()[0]).length();
    const b = new three.Vector3(...curve.getAxes()[1]).length();
    const L = Math.PI * Math.sqrt(2 * (a * a + b * b) - (a - b) * (a - b) / 2);
    const l = L * resolution;
    const param = b * b / a;
    const c = Math.sqrt(Math.abs(a * a - b * b));
    if (a >= b) {
        const e = Math.sqrt(1 - b * b / (a * a));
        let N = 0;
        let eps = 1;
        while (eps > 0) {
            theta = theta + d_theta;
            eps = Math.PI * 2 - theta;
            N++;
            r = param / (1 + e * Math.cos(theta));
            d_theta = l / r;
        }
        N--;
        theta = 0;
        d_theta = 0;
        for (let k = 0; k < N; k++) {
            theta = theta + d_theta;
            r = param / (1 + e * Math.cos(theta));
            d_theta = l / r;
            renderingXYZs.push([(r * Math.cos(theta)) + c, r * Math.sin(theta), 0]);
        }
    }
    if (b > a) {
        const e = Math.sqrt(1 - a * a / (b * b));
        let N = 0;
        let eps = 1;
        while (eps > 0) {
            theta = theta + d_theta;
            eps = Math.PI * 2 - theta;
            N++;
            r = param / (1 + e * Math.cos(theta));
            d_theta = l / r;
        }
        N--;
        theta = 0;
        d_theta = 0;
        for (let k = 0; k < N; k++) {
            theta = theta + d_theta;
            r = param / (1 + e * Math.cos(theta));
            d_theta = l / r;
            renderingXYZs.push([r * Math.cos(theta), (r * Math.sin(theta)) + c, 0]);
        }
    }
    const results = [];
    for (const point of renderingXYZs) {
        results.push(new three.Vector3(point[0], point[1], point[2]));
    }
    const O1 = new three.Vector3(0, 0, 0);
    const e1 = new three.Vector3(1, 0, 0);
    const e2 = new three.Vector3(0, 1, 0);
    const e3 = new three.Vector3(0, 0, 1);
    const C1 = new three.Vector3(curve.getOrigin().getPosition()[0], curve.getOrigin().getPosition()[1], curve.getOrigin().getPosition()[2]);
    const W1 = threex.crossVectors(U1, V1, true);
    const C1O1 = threex.subVectors(O1, C1, false);
    const vec_O_1 = new three.Vector3(C1O1.dot(U1), C1O1.dot(V1), C1O1.dot(W1));
    const x1 = new three.Vector3(e1.dot(U1), e1.dot(V1), e1.dot(W1));
    const y1 = new three.Vector3(e2.dot(U1), e2.dot(V1), e2.dot(W1));
    let z1 = new three.Vector3();
    z1 = z1.crossVectors(x1, y1);
    const m1 = new three.Matrix4();
    const o_neg = vec_O_1.clone().negate();
    m1.setPosition(o_neg);
    let m2 = new three.Matrix4();
    m2 = m2.makeBasis(x1.normalize(), y1.normalize(), z1.normalize());
    m2 = m2.getInverse(m2);
    const m3 = new three.Matrix4();
    const rotation1 = m3.multiplyMatrices(m2, m1);
    const results_c1 = [];
    for (const point of results) {
        results_c1.push(threex.multVectorMatrix(point, rotation1));
    }
    for (const point of results_c1) {
        renderXYZs.push([point.x, point.y, point.z]);
    }
    return renderXYZs;
}
exports.ellipseGetRenderXYZs = ellipseGetRenderXYZs;
/**
 * Calculate a set of xyz positions on the Parabola. The number of points = diff_angles() / resolution.
 */
function parabolaGetRenderXYZs(curve, resolution) {
    const origin = curve.getOrigin().getPosition();
    const renderXYZs = [];
    const U1 = new three.Vector3(...curve.getAxes()[0]).normalize();
    const V1 = new three.Vector3(...curve.getAxes()[1]).normalize();
    const a = new three.Vector3(...curve.getAxes()[0]).length();
    const b = new three.Vector3(...curve.getAxes()[1]).length();
    const param = b * b / a;
    let r;
    const angles = utils.checkParabolaAngles([curve.getAngles()[0], curve.getAngles()[1]]);
    const N = Math.floor(1 / resolution);
    const d_theta = ((angles[1] - angles[0]) / (N - 1)) * (2 * Math.PI) / 360;
    let theta = angles[0] * (2 * Math.PI) / 360;
    for (let k = 0; k < N; k++) {
        r = param / (1 + Math.cos(theta));
        renderXYZs.push([
            origin[0] + r * Math.cos(theta) * U1.x + r * Math.sin(theta) * V1.x,
            origin[1] + r * Math.cos(theta) * U1.y + r * Math.sin(theta) * V1.y,
            origin[2] + r * Math.cos(theta) * U1.z + r * Math.sin(theta) * V1.z,
        ]);
        theta = theta + d_theta;
    }
    return renderXYZs;
}
exports.parabolaGetRenderXYZs = parabolaGetRenderXYZs;
/**
 * Calculate a set of xyz positions on the Hyperbola. The number of points = diff_angles() / resolution.
 */
function hyperbolaGetRenderXYZs(curve, resolution) {
    const origin = curve.getOrigin().getPosition();
    const renderXYZs = [];
    const U1 = new three.Vector3(...curve.getAxes()[0]).normalize();
    const V1 = new three.Vector3(...curve.getAxes()[1]).normalize();
    const a = new three.Vector3(...curve.getAxes()[0]).length();
    const b = new three.Vector3(...curve.getAxes()[1]).length();
    const param = 0; // to update
    const e = Math.sqrt(1 - (b / a) * (b / a)); // to update
    let r;
    const angles = utils.checkParabolaAngles([curve.getAngles()[0], curve.getAngles()[1]]);
    const N = Math.floor(1 / resolution);
    const d_theta = ((angles[1] - angles[0]) / (N - 1)) * (2 * Math.PI) / 360;
    let theta = angles[0] * (2 * Math.PI) / 360;
    for (let k = 0; k < N; k++) {
        r = param / (1 + e * Math.cos(theta));
        renderXYZs.push([
            origin[0] + r * Math.cos(theta) * U1.x + r * Math.sin(theta) * V1.x,
            origin[1] + r * Math.cos(theta) * U1.y + r * Math.sin(theta) * V1.y,
            origin[2] + r * Math.cos(theta) * U1.z + r * Math.sin(theta) * V1.z,
        ]);
        theta = theta + d_theta;
    }
    return renderXYZs;
}
exports.hyperbolaGetRenderXYZs = hyperbolaGetRenderXYZs;
//# sourceMappingURL=conics.js.map