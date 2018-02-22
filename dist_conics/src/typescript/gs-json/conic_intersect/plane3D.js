"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arr = require("../libs/arr/arr");
const three = require("three");
// export function plane3D_ellipse(): IPoint[] { throw new Error("Method not implemented");}
function plane3D_parabola(parabola, plane) {
    const m = parabola.getModel();
    const eps = 1e-7;
    if (plane.getModel() !== m) {
        throw new Error("Identical models are required for the parabola and the plane");
    }
    // get plane
    const PO = plane.getOrigin().getPosition();
    const n1 = [plane.getCartesians()[0], plane.getCartesians()[1], plane.getCartesians()[2]];
    // get circle
    const C0 = parabola.getOrigin().getPosition();
    const CA = parabola.getAxes();
    const U1 = new three.Vector3(...CA[0]).setLength(parabola.getRadii()[0]);
    const V1 = new three.Vector3(...CA[1]).setLength(parabola.getRadii()[1]);
    // const U1: three.Vector3 = new three.Vector3(...CA[0]);
    // const V1: three.Vector3 = new three.Vector3(...CA[1]).setLength(U1.length());
    const _n1 = new three.Vector3(n1[0], n1[1], n1[2]);
    // calculate t
    const A = n1[0] * (C0[0] - PO[0]) + n1[1] * (C0[1] - PO[1]) + n1[2] * (C0[2] - PO[2]);
    const B = n1[0] * U1.x + n1[1] * U1.y + n1[2] * U1.z;
    const C = n1[0] * V1.x + n1[1] * V1.y + n1[2] * V1.z;
    const _t = _solve_trigo(A, B, C);
    if (_t === null) {
        return [];
    }
    const result = [];
    for (const t of _t) {
        const point1 = new three.Vector3(C0[0] + Math.cos(t) * U1.x + Math.sin(t) * V1.x - PO[0], C0[1] + Math.cos(t) * U1.y + Math.sin(t) * V1.y - PO[1], C0[2] + Math.cos(t) * U1.z + Math.sin(t) * V1.z - PO[2]);
        if (Math.abs(_n1.dot(point1)) < eps) {
            const vec_point1 = new three.Vector3(Math.cos(t) * U1.x + Math.sin(t) * V1.x, Math.cos(t) * U1.y + Math.sin(t) * V1.y, Math.cos(t) * U1.z + Math.sin(t) * V1.z);
            let angle_point1 = Math.sign(crossVectors(U1, V1).dot(crossVectors(U1, vec_point1))) * vec_point1.angleTo(U1) * 180 / Math.PI;
            angle_point1 = (angle_point1 + 10 * 360) % 360;
            if (angle_point1 >= parabola.getAngles()[0] && angle_point1 <= parabola.getAngles()[1]) {
                result.push(m.getGeom().addPoint([
                    C0[0] + Math.cos(t) * U1.x + Math.sin(t) * V1.x,
                    C0[1] + Math.cos(t) * U1.y + Math.sin(t) * V1.y,
                    C0[2] + Math.cos(t) * U1.z + Math.sin(t) * V1.z
                ]));
            }
        }
        const point2 = new three.Vector3(C0[0] + Math.cos(t + Math.PI) * U1.x + Math.sin(t + Math.PI) * V1.x - PO[0], C0[1] + Math.cos(t + Math.PI) * U1.y + Math.sin(t + Math.PI) * V1.y - PO[1], C0[2] + Math.cos(t + Math.PI) * U1.z + Math.sin(t + Math.PI) * V1.z - PO[2]);
        if (Math.abs(_n1.dot(point2)) < eps) {
            const vec_point2 = new three.Vector3(Math.cos(t + Math.PI) * U1.x + Math.sin(t + Math.PI) * V1.x, Math.cos(t + Math.PI) * U1.y + Math.sin(t + Math.PI) * V1.y, Math.cos(t + Math.PI) * U1.z + Math.sin(t + Math.PI) * V1.z);
            let angle_point2 = Math.sign(crossVectors(U1, V1).dot(crossVectors(U1, vec_point2))) * vec_point2.angleTo(U1) * 180 / Math.PI;
            angle_point2 = (angle_point2 + 10 * 360) % 360;
            if (angle_point2 >= parabola.getAngles()[0] && angle_point2 <= parabola.getAngles()[1]) {
                result.push(m.getGeom().addPoint([
                    C0[0] + Math.cos(t + Math.PI) * U1.x + Math.sin(t + Math.PI) * V1.x,
                    C0[1] + Math.cos(t + Math.PI) * U1.y + Math.sin(t + Math.PI) * V1.y,
                    C0[2] + Math.cos(t + Math.PI) * U1.z + Math.sin(t + Math.PI) * V1.z
                ]));
            }
        }
    }
    return result;
}
exports.plane3D_parabola = plane3D_parabola;
function plane3D_hyperbola(hyperbola, plane) {
    const m = hyperbola.getModel();
    const eps = 1e-7;
    if (plane.getModel() !== m) {
        throw new Error("Identical models are required for the hyperbola and the plane");
    }
    // get plane
    const PO = plane.getOrigin().getPosition();
    const n1 = [plane.getCartesians()[0], plane.getCartesians()[1], plane.getCartesians()[2]];
    // get circle
    const C0 = hyperbola.getOrigin().getPosition();
    const CA = hyperbola.getAxes();
    const U1 = new three.Vector3(...CA[0]).setLength(hyperbola.getRadii()[0]);
    const V1 = new three.Vector3(...CA[1]).setLength(hyperbola.getRadii()[1]);
    // const U1: three.Vector3 = new three.Vector3(...CA[0]);
    // const V1: three.Vector3 = new three.Vector3(...CA[1]).setLength(U1.length());
    const _n1 = new three.Vector3(n1[0], n1[1], n1[2]);
    // calculate t
    const A = n1[0] * (C0[0] - PO[0]) + n1[1] * (C0[1] - PO[1]) + n1[2] * (C0[2] - PO[2]);
    const B = n1[0] * U1.x + n1[1] * U1.y + n1[2] * U1.z;
    const C = n1[0] * V1.x + n1[1] * V1.y + n1[2] * V1.z;
    const _t = _solve_trigo(A, B, C);
    if (_t === null) {
        return [];
    }
    const result = [];
    for (const t of _t) {
        const point1 = new three.Vector3(C0[0] + Math.cos(t) * U1.x + Math.sin(t) * V1.x - PO[0], C0[1] + Math.cos(t) * U1.y + Math.sin(t) * V1.y - PO[1], C0[2] + Math.cos(t) * U1.z + Math.sin(t) * V1.z - PO[2]);
        if (Math.abs(_n1.dot(point1)) < eps) {
            const vec_point1 = new three.Vector3(Math.cos(t) * U1.x + Math.sin(t) * V1.x, Math.cos(t) * U1.y + Math.sin(t) * V1.y, Math.cos(t) * U1.z + Math.sin(t) * V1.z);
            let angle_point1 = Math.sign(crossVectors(U1, V1).dot(crossVectors(U1, vec_point1))) * vec_point1.angleTo(U1) * 180 / Math.PI;
            angle_point1 = (angle_point1 + 10 * 360) % 360;
            if (angle_point1 >= hyperbola.getAngles()[0] && angle_point1 <= hyperbola.getAngles()[1]) {
                result.push(m.getGeom().addPoint([
                    C0[0] + Math.cos(t) * U1.x + Math.sin(t) * V1.x,
                    C0[1] + Math.cos(t) * U1.y + Math.sin(t) * V1.y,
                    C0[2] + Math.cos(t) * U1.z + Math.sin(t) * V1.z
                ]));
            }
        }
        const point2 = new three.Vector3(C0[0] + Math.cos(t + Math.PI) * U1.x + Math.sin(t + Math.PI) * V1.x - PO[0], C0[1] + Math.cos(t + Math.PI) * U1.y + Math.sin(t + Math.PI) * V1.y - PO[1], C0[2] + Math.cos(t + Math.PI) * U1.z + Math.sin(t + Math.PI) * V1.z - PO[2]);
        if (Math.abs(_n1.dot(point2)) < eps) {
            const vec_point2 = new three.Vector3(Math.cos(t + Math.PI) * U1.x + Math.sin(t + Math.PI) * V1.x, Math.cos(t + Math.PI) * U1.y + Math.sin(t + Math.PI) * V1.y, Math.cos(t + Math.PI) * U1.z + Math.sin(t + Math.PI) * V1.z);
            let angle_point2 = Math.sign(crossVectors(U1, V1).dot(crossVectors(U1, vec_point2))) * vec_point2.angleTo(U1) * 180 / Math.PI;
            angle_point2 = (angle_point2 + 10 * 360) % 360;
            if (angle_point2 >= hyperbola.getAngles()[0] && angle_point2 <= hyperbola.getAngles()[1]) {
                result.push(m.getGeom().addPoint([
                    C0[0] + Math.cos(t + Math.PI) * U1.x + Math.sin(t + Math.PI) * V1.x,
                    C0[1] + Math.cos(t + Math.PI) * U1.y + Math.sin(t + Math.PI) * V1.y,
                    C0[2] + Math.cos(t + Math.PI) * U1.z + Math.sin(t + Math.PI) * V1.z
                ]));
            }
        }
    }
    return result;
}
exports.plane3D_hyperbola = plane3D_hyperbola;
function plane3D_ellipse(ellipse, plane) {
    const m = ellipse.getModel();
    const eps = 1e-7;
    if (plane.getModel() !== m) {
        throw new Error("Identical models are required for the ellipse and the plane");
    }
    const PO = plane.getOrigin().getPosition();
    const n1 = [plane.getCartesians()[0], plane.getCartesians()[1], plane.getCartesians()[2]];
    const C0 = ellipse.getOrigin().getPosition();
    const CA = ellipse.getAxes();
    const U1 = new three.Vector3(...CA[0]).setLength(ellipse.getRadii()[0]);
    const V1 = new three.Vector3(...CA[1]).setLength(ellipse.getRadii()[1]);
    const _n1 = new three.Vector3(n1[0], n1[1], n1[2]);
    const A = n1[0] * (C0[0] - PO[0]) + n1[1] * (C0[1] - PO[1]) + n1[2] * (C0[2] - PO[2]);
    const B = n1[0] * U1.x + n1[1] * U1.y + n1[2] * U1.z;
    const C = n1[0] * V1.x + n1[1] * V1.y + n1[2] * V1.z;
    const _t = _solve_trigo(A, B, C);
    if (_t === null) {
        return [];
    }
    const result = [];
    const results_plane_ellipse = [];
    for (const t of _t) {
        const point1 = new three.Vector3(C0[0] + Math.cos(t) * U1.x + Math.sin(t) * V1.x - PO[0], C0[1] + Math.cos(t) * U1.y + Math.sin(t) * V1.y - PO[1], C0[2] + Math.cos(t) * U1.z + Math.sin(t) * V1.z - PO[2]);
        if (Math.abs(_n1.dot(point1)) < eps) {
            const vec_point1 = new three.Vector3(Math.cos(t) * U1.x + Math.sin(t) * V1.x, Math.cos(t) * U1.y + Math.sin(t) * V1.y, Math.cos(t) * U1.z + Math.sin(t) * V1.z);
            let angle_point1 = Math.sign(crossVectors(U1, V1).dot(crossVectors(U1, vec_point1))) * vec_point1.angleTo(U1) * 180 / Math.PI;
            angle_point1 = (angle_point1 + 10 * 360) % 360;
            results_plane_ellipse.push(new three.Vector3(C0[0] + Math.cos(t) * U1.x + Math.sin(t) * V1.x, C0[1] + Math.cos(t) * U1.y + Math.sin(t) * V1.y, C0[2] + Math.cos(t) * U1.z + Math.sin(t) * V1.z));
        }
        const point2 = new three.Vector3(C0[0] + Math.cos(t + Math.PI) * U1.x + Math.sin(t + Math.PI) * V1.x - PO[0], C0[1] + Math.cos(t + Math.PI) * U1.y + Math.sin(t + Math.PI) * V1.y - PO[1], C0[2] + Math.cos(t + Math.PI) * U1.z + Math.sin(t + Math.PI) * V1.z - PO[2]);
        if (Math.abs(_n1.dot(point2)) < eps) {
            const vec_point2 = new three.Vector3(Math.cos(t + Math.PI) * U1.x + Math.sin(t + Math.PI) * V1.x, Math.cos(t + Math.PI) * U1.y + Math.sin(t + Math.PI) * V1.y, Math.cos(t + Math.PI) * U1.z + Math.sin(t + Math.PI) * V1.z);
            let angle_point2 = Math.sign(crossVectors(U1, V1).dot(crossVectors(U1, vec_point2))) * vec_point2.angleTo(U1) * 180 / Math.PI;
            angle_point2 = (angle_point2 + 10 * 360) % 360;
            results_plane_ellipse.push(new three.Vector3(C0[0] + Math.cos(t + Math.PI) * U1.x + Math.sin(t + Math.PI) * V1.x, C0[1] + Math.cos(t + Math.PI) * U1.y + Math.sin(t + Math.PI) * V1.y, C0[2] + Math.cos(t + Math.PI) * U1.z + Math.sin(t + Math.PI) * V1.z));
        }
    }
    const results_plane_ellipse_copy = [];
    for (let point of results_plane_ellipse) {
        const data = arr.Arr.deepCopy([point.x, point.y, point.z]);
        results_plane_ellipse_copy.push(new three.Vector3(data[0], data[1], data[2]));
    }
    const original_angles_1 = arr.Arr.deepCopy(ellipse.getAngles());
    const C1 = new three.Vector3(...ellipse.getOrigin().getPosition());
    let angles1 = ellipse.getAngles();
    if (angles1 === undefined) {
        angles1 = [0, 360];
    }
    for (const point of results_plane_ellipse_copy) {
        const c1_to_point = new three.Vector3(point.x - C1.x, point.y - C1.y, point.z - C1.z);
        let angle_1 = U1.angleTo(c1_to_point) * 180 / Math.PI;
        if (crossVectors(U1, c1_to_point).dot(crossVectors(U1, V1)) < 0) {
            angle_1 = 360 - angle_1;
        }
        angle_1 = ((angle_1 % 360) + 360) % 360;
        angles1[0] = ((angles1[0] % 360) + 360) % 360;
        angles1[1] = ((angles1[1] % 360) + 360) % 360;
        if (original_angles_1[0] !== original_angles_1[1] && angles1[1] === angles1[0]) {
            angles1[1] = angles1[1] + 360;
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
        if (ok) {
            result.push(m.getGeom().addPoint([point.x, point.y, point.z]));
        }
    }
    return result;
}
exports.plane3D_ellipse = plane3D_ellipse;
function crossVectors(v1, v2, norm = false) {
    const v3 = new three.Vector3();
    v3.crossVectors(v1, v2);
    if (norm) {
        v3.normalize();
    }
    return v3;
}
exports.crossVectors = crossVectors;
function _solve_trigo(A, B, C) {
    const num1 = -A;
    const den1 = Math.sqrt(B * B + C * C);
    const num2 = B;
    const den2 = C;
    if (C === 0) {
        if (B === 0) {
            return null;
        }
        if (Math.abs(A / B) > 1) {
            return null;
        }
        return [(-Math.acos(-A / B)) % (2 * Math.PI), (Math.acos(-A / B)) % (2 * Math.PI)];
    }
    if (Math.abs(num1 / den1) > 1) {
        return null;
    }
    const t1 = Math.asin(num1 / den1) - Math.atan(num2 / den2);
    const t2 = Math.PI - Math.atan(num2 / den2) - Math.asin(num1 / den1);
    return [t1 % (2 * Math.PI), t2 % (2 * Math.PI)];
}
exports._solve_trigo = _solve_trigo;
//# sourceMappingURL=plane3D.js.map