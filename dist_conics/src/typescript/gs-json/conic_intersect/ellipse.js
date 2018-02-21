"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three = require("three");
const kld = require("kld-intersections");
const arr = require("../libs/arr/arr");
function ellipse_ellipse(ellipse1, ellipse2) {
    const m = ellipse1.getModel();
    const v1 = ellipse1.getAxes();
    const v2 = ellipse2.getAxes();
    if (!planesAreCoplanar(ellipse1.getOrigin(), v1[2], ellipse2.getOrigin(), v2[2])) {
        throw new Error("Entities must be coplanar.");
    }
    const g = m.getGeom();
    const rx1 = new three.Vector3(v1[0][0], v1[0][1], v1[0][2]);
    const ry1 = new three.Vector3(v1[1][0], v1[1][1], v1[1][2]);
    const rx2 = new three.Vector3(v2[0][0], v2[0][1], v2[0][2]);
    const ry2 = new three.Vector3(v2[1][0], v2[1][1], v2[1][2]);
    const r = Math.max(rx1.length(), ry1.length()) + Math.max(rx2.length(), ry2.length());
    const O1O2 = vectorFromPointsAtoB(ellipse1.getOrigin(), ellipse2.getOrigin(), false);
    if (O1O2.length() > r) {
        return null;
    }
    const O1 = new three.Vector3(0, 0, 0);
    const e1 = new three.Vector3(1, 0, 0);
    const e2 = new three.Vector3(0, 1, 0);
    const e3 = new three.Vector3(0, 0, 1);
    const C1 = new three.Vector3(...ellipse1.getOrigin().getPosition());
    const U1 = new three.Vector3(...v1[0]).normalize();
    const V1 = new three.Vector3(...v1[1]).normalize();
    const W1 = crossVectors(U1, V1, true);
    let angles1 = ellipse1.getAngles();
    if (angles1 === undefined) {
        angles1 = [0, 360];
    }
    const angles_circle_1 = angles1[1] - angles1[0];
    const C2 = new three.Vector3(...ellipse2.getOrigin().getPosition());
    const U2 = new three.Vector3(...v2[0]).normalize();
    const V2 = new three.Vector3(...v2[1]).normalize();
    const W2 = crossVectors(U2, V2, true);
    let angles2 = ellipse2.getAngles();
    if (angles2 === undefined) {
        angles2 = [0, 360];
    }
    const angles_circle_2 = angles2[1] - angles2[0];
    const C1O1 = subVectors(O1, C1, false);
    const vec_O_1 = new three.Vector3(dotVectors(C1O1, U1), dotVectors(C1O1, V1), dotVectors(C1O1, W1));
    const x1 = new three.Vector3(dotVectors(e1, U1), dotVectors(e1, V1), dotVectors(e1, W1));
    const y1 = new three.Vector3(dotVectors(e2, U1), dotVectors(e2, V1), dotVectors(e2, W1));
    const rotation1 = xformMatrix(vec_O_1, x1, y1);
    const O1C1 = subVectors(C1, O1, false);
    const init_vec_O_1 = new three.Vector3(dotVectors(O1C1, e1), dotVectors(O1C1, e2), dotVectors(O1C1, e3));
    const init_x1 = new three.Vector3(dotVectors(U1, e1), dotVectors(U1, e2), dotVectors(U1, e3));
    const init_y1 = new three.Vector3(dotVectors(V1, e1), dotVectors(V1, e2), dotVectors(V1, e3));
    const init_rotation1 = xformMatrix(init_vec_O_1, init_x1, init_y1);
    const a = multVectorMatrix(C1, init_rotation1);
    const b = multVectorMatrix(C2, init_rotation1);
    const ellipse_1 = {
        center: new kld.Point2D(a.x, a.y),
        rx: rx1.length(),
        ry: ry1.length(),
    };
    const ellipse_2 = {
        center: new kld.Point2D(b.x, b.y),
        rx: rx2.length(),
        ry: ry2.length(),
    };
    const result = kld.Intersection.intersectEllipseEllipse(ellipse_1.center, ellipse_1.rx, ellipse_1.ry, ellipse_2.center, ellipse_2.rx, ellipse_2.ry);
    const results = [];
    for (const point of result.points) {
        results.push(new three.Vector3(point.x, point.y, 0));
    }
    const results_c1 = [];
    for (const point of results) {
        results_c1.push(multVectorMatrix(point, rotation1));
    }
    const points = [];
    const original_angles_1 = arr.Arr.deepCopy(ellipse1.getAngles());
    const original_angles_2 = arr.Arr.deepCopy(ellipse2.getAngles());
    for (const point of results_c1) {
        const c1_to_point = new three.Vector3(point.x - C1.x, point.y - C1.y, point.z - C1.z);
        const c2_to_point = new three.Vector3(point.x - C2.x, point.y - C2.y, point.z - C2.z);
        let angle_1 = U1.angleTo(c1_to_point) * 180 / Math.PI;
        if (crossVectors(U1, c1_to_point).dot(crossVectors(U1, V1)) < 0) {
            angle_1 = 360 - angle_1;
        }
        angle_1 = ((angle_1 % 360) + 360) % 360;
        let angle_2 = U2.angleTo(c2_to_point) * 180 / Math.PI;
        if (crossVectors(U2, c2_to_point).dot(crossVectors(U2, V2)) < 0) {
            angle_2 = 360 - angle_2;
        }
        angle_2 = ((angle_2 % 360) + 360) % 360;
        angles1[0] = ((angles1[0] % 360) + 360) % 360;
        angles1[1] = ((angles1[1] % 360) + 360) % 360;
        if (original_angles_1[0] !== original_angles_1[1] && angles1[1] === angles1[0]) {
            angles1[1] = angles1[1] + 360;
        }
        angles2[0] = ((angles2[0] % 360) + 360) % 360;
        angles2[1] = ((angles2[1] % 360) + 360) % 360;
        if (original_angles_2[0] !== original_angles_2[1] && angles2[1] === angles2[0]) {
            angles2[1] = angles2[1] + 360;
        }
        let ok = true;
        if (angles1[1] > angles1[0]) {
            if ((angle_1 < angles1[0] && angle_1 >= 0) || (angle_1 > angles1[1] && angle_1 <= 360)) {
                ok = false;
            }
        }
        if (angles1[0] > angles1[1]) {
            if (angle_1 > angles1[1] && angle_1 < angles1[0]) {
                ok = false;
            }
        }
        if (angles2[1] > angles2[0]) {
            if ((angle_2 < angles2[0] && angle_2 >= 0) || (angle_2 > angles2[1] && angle_2 <= 360)) {
                ok = false;
            }
        }
        if (angles2[0] > angles2[1]) {
            if (angle_2 > angles2[1] && angle_2 < angles2[0]) {
                ok = false;
            }
        }
        if (ok) {
            points.push(g.addPoint([point.x, point.y, point.z]));
        }
    }
    return points;
}
exports.ellipse_ellipse = ellipse_ellipse;
const EPS = 1e-9;
function planesAreCoplanar(origin1, normal1, origin2, normal2) {
    const origin1_v = new three.Vector3(...origin1.getPosition());
    const normal1_v = new three.Vector3(...normal1).normalize();
    const origin2_v = new three.Vector3(...origin2.getPosition());
    const normal2_v = new three.Vector3(...normal2).normalize();
    if (Math.abs(dotVectors(subVectors(origin1_v, origin2_v), normal2_v)) > EPS) {
        return false;
    }
    if (Math.abs(1 - Math.abs(normal1_v.dot(normal2_v))) > EPS) {
        return false;
    } //fixed bug
    return true;
}
exports.planesAreCoplanar = planesAreCoplanar;
function subVectors(v1, v2, norm = false) {
    const v3 = new three.Vector3();
    v3.subVectors(v1, v2);
    if (norm) {
        v3.normalize();
    }
    return v3;
}
exports.subVectors = subVectors;
function crossVectors(v1, v2, norm = false) {
    const v3 = new three.Vector3();
    v3.crossVectors(v1, v2);
    if (norm) {
        v3.normalize();
    }
    return v3;
}
exports.crossVectors = crossVectors;
function dotVectors(v1, v2) {
    return v1.dot(v2);
}
exports.dotVectors = dotVectors;
function vectorFromPointsAtoB(a, b, norm = false) {
    const v = subVectors(new three.Vector3(...b.getPosition()), new three.Vector3(...a.getPosition()));
    if (norm) {
        v.normalize();
    }
    return v;
}
exports.vectorFromPointsAtoB = vectorFromPointsAtoB;
function multVectorMatrix(v, m) {
    const v2 = v.clone();
    v2.applyMatrix4(m);
    return v2;
}
exports.multVectorMatrix = multVectorMatrix;
function xformMatrix(o, x, y) {
    const m1 = new three.Matrix4();
    const o_neg = o.clone().negate();
    m1.setPosition(o_neg);
    const m2 = new three.Matrix4();
    m2.makeBasis(x.normalize(), y.normalize(), crossVectors(x, y, true));
    m2.getInverse(m2);
    const m3 = new three.Matrix4();
    m3.multiplyMatrices(m2, m1);
    return m3;
}
exports.xformMatrix = xformMatrix;
//# sourceMappingURL=ellipse.js.map