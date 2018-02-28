"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three = require("three");
const arr_1 = require("../libs/arr/arr");
const parabola_polyline = require("../conic_polyline/parabola_polyline");
const rayTwo_polyline_1 = require("../conic_polyline/rayTwo_polyline");
const rayTwo_1 = require("../conic_intersect/rayTwo");
function parabola_parabola(parabola1, parabola2) {
    const result = [];
    const geom = parabola1.getGeom();
    // Case [330; 250]
    // Parabole 1
    const angle0_p1 = ((parabola1.getAngles()[0] % 360) + 360) % 360;
    const angle1_p1 = (((parabola1.getAngles()[1] % 360) + 360) % 360);
    const U1 = new three.Vector3(parabola1.getAxes()[0][0], parabola1.getAxes()[0][1], parabola1.getAxes()[0][2]).normalize();
    const V1 = new three.Vector3(parabola1.getAxes()[1][0], parabola1.getAxes()[1][1], parabola1.getAxes()[1][2]).normalize();
    const p = new three.Vector3(parabola1.getAxes()[0][0], parabola1.getAxes()[0][1], parabola1.getAxes()[0][2]).length();
    const r1 = p / (1 + Math.cos(angle0_p1 * (2 * Math.PI / 360) - (Math.PI / 2)));
    const r2 = p / (1 + Math.cos(angle1_p1 * (2 * Math.PI / 360) - (Math.PI / 2)));
    const d1 = Math.abs(r1 * Math.cos(angle0_p1 * (2 * Math.PI / 360)));
    const d2 = Math.abs(r2 * Math.cos(angle1_p1 * (2 * Math.PI / 360)));
    const xyz = arr_1.Arr.deepCopy(parabola1.getOrigin().getPosition());
    const center_ray2 = geom.addPoint([xyz[0], xyz[1], xyz[2]]);
    const ray2 = geom.addRay(center_ray2, parabola1.getAxes()[1]);
    const N = 1;
    for (let k = 0; k < N; k++) {
        k = 0;
        center_ray2.setPosition([xyz[0] + ((k / N) * (d1 + d2) - d1) * U1.x,
            xyz[1] + ((k / N) * (d1 + d2) - d1) * U1.y,
            xyz[2] + ((k / N) * (d1 + d2) - d1) * U1.z]);
        const polyline3 = rayTwo_polyline_1.rayTwo_polyline(ray2);
        const points1 = rayTwo_1.rayTwo_parabola(ray2, parabola1);
        for (const point of points1) {
            geom.addCircle(point, [0.2 * U1.x, 0.2 * U1.y, 0.2 * U1.z], [0.2 * V1.x, 0.2 * V1.y, 0.2 * V1.z]);
        }
        const points2 = rayTwo_1.rayTwo_parabola(ray2, parabola2);
        let d = 0;
        if (points2.length >= 1 && points1.length >= 1) {
            switch (points2.length) {
                case 1:
                    geom.addCircle(points2[0], [0.2 * U1.x, 0.2 * U1.y, 0.2 * U1.z], [0.2 * V1.x, 0.2 * V1.y, 0.2 * V1.z]);
                    d = vectorFromPointsAtoB(points1[0], points2[0], false).length();
                    break;
                case 2:
                    d = vectorFromPointsAtoB(points1[0], points2[0], false).length();
                    if (d <= vectorFromPointsAtoB(points1[0], points2[1], false).length()) {
                        geom.addCircle(points2[0], [0.2 * U1.x, 0.2 * U1.y, 0.2 * U1.z], [0.2 * V1.x, 0.2 * V1.y, 0.2 * V1.z]);
                    }
                    else {
                        geom.addCircle(points2[1], [0.2 * U1.x, 0.2 * U1.y, 0.2 * U1.z], [0.2 * V1.x, 0.2 * V1.y, 0.2 * V1.z]);
                    }
                    break;
                default: throw new Error("check parameters");
            }
        }
        // geom.delObj(ray2,true);
    }
    const polyline1 = parabola_polyline.parabola_polyline_renderXYZ(parabola1);
    const polyline2 = parabola_polyline.parabola_polyline_renderXYZ(parabola2);
    return result;
}
exports.parabola_parabola = parabola_parabola;
function vectorFromPointsAtoB(a, b, norm = false) {
    const v = subVectors(new three.Vector3(...b.getPosition()), new three.Vector3(...a.getPosition()));
    if (norm) {
        v.normalize();
    }
    return v;
}
exports.vectorFromPointsAtoB = vectorFromPointsAtoB;
function subVectors(v1, v2, norm = false) {
    const v3 = new three.Vector3();
    v3.subVectors(v1, v2);
    if (norm) {
        v3.normalize();
    }
    return v3;
}
exports.subVectors = subVectors;
//# sourceMappingURL=parabola.js.map