"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three = require("three");
const arr_1 = require("../libs/arr/arr");
const rayTwo_1 = require("../conic_intersect/rayTwo");
function parabola_parabola(parabola1, parabola2) {
    throw new Error("Under Implementation");
    // intial definitions
    const result = [];
    const xyz_results = [];
    const geom = parabola1.getGeom();
    const eps = 1e-300;
    const threshold = 1e-4;
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
    const p2 = new three.Vector3(parabola2.getAxes()[0][0], parabola2.getAxes()[0][1], parabola2.getAxes()[0][2]).length();
    const w1 = parabola_width(parabola1);
    const w2 = parabola_width(parabola2);
    const N = 80 * Math.max(1, w1 / w2);
    const inside_dichotomie = 2;
    const distances = [];
    let count = 0;
    let list = [];
    let precision = [];
    // First set of dichotomies (parallel rays, numbered as 80 per slimest parabola width )
    for (let k = -2; k < N + 2; k++) {
        center_ray2.setPosition([xyz[0] + ((k / N) * (d1 + d2) - d2) * U1.x,
            xyz[1] + ((k / N) * (d1 + d2) - d2) * U1.y,
            xyz[2] + ((k / N) * (d1 + d2) - d2) * U1.z]);
        const ray2 = geom.addRayTwo(center_ray2, parabola1.getAxes()[1]);
        const points1 = rayTwo_1.rayTwo_parabola(ray2, parabola1);
        const points2 = rayTwo_1.rayTwo_parabola(ray2, parabola2);
        geom.delObj(ray2, false);
        geom.delPoint(center_ray2);
        let d = 0;
        if (points2.length >= 1 && points1.length >= 1) {
            switch (points2.length) {
                case 1:
                    d = vectorFromPointsAtoB(points1[0], points2[0], false).length();
                    break;
                case 2:
                    d = vectorFromPointsAtoB(points1[0], points2[0], false).length();
                    if (d > vectorFromPointsAtoB(points1[0], points2[1], false).length()) {
                        d = vectorFromPointsAtoB(points1[0], points2[1], false).length();
                    }
                    break;
                default: throw new Error("check parameters");
            }
            geom.delPoints(points1);
            geom.delPoints(points2);
            distances.push(d);
            const cond1 = (Math.abs(d) < 1)
                || (Math.abs(distances[distances.length - 2]) < 1)
                || (Math.abs(distances[distances.length - 3]) < 1);
            const e1 = d - distances[distances.length - 2];
            const e2 = distances[distances.length - 2] - distances[distances.length - 3];
            const e3 = Math.sign(e1) * Math.sign(e2);
            const cond2 = e3 === -1;
            const ok = cond1 && cond2;
            if (ok) {
                list.push(k - 1);
            }
        }
        geom.delPoints(points1);
        geom.delPoints(points2);
    }
    // Dichotomie 1 sets a preliminary list
    // console.log("list = " + list);
    let total = 0;
    // The Dichotomie is then pursued for the given first list...
    for (const k of list) {
        if (k !== undefined) {
            let init_k1_x = xyz[0] + ((k / N) * (d1 + d2) - d2) * U1.x;
            let init_k1_y = xyz[1] + ((k / N) * (d1 + d2) - d2) * U1.y;
            let init_k1_z = xyz[2] + ((k / N) * (d1 + d2) - d2) * U1.z;
            let width_k1 = (1 / N) * (d1 + d2);
            const distance_k1 = [];
            let d_k1 = 4;
            let d = 4;
            let slope;
            const eps_k1 = eps;
            let count_while_1 = 0;
            let count_while_2 = 0;
            let xyz_result;
            do {
                let cond_k1 = true;
                let OK_ = false;
                init_k1_x += count_while_2 * (width_k1) * U1.x;
                init_k1_y += count_while_2 * (width_k1) * U1.y;
                init_k1_z += count_while_2 * (width_k1) * U1.z;
                count_while_2 = 0;
                do {
                    center_ray2.setPosition([init_k1_x + count_while_2 * (width_k1) * U1.x,
                        init_k1_y + count_while_2 * (width_k1) * U1.y,
                        init_k1_z + count_while_2 * (width_k1) * U1.z]);
                    let ray2 = geom.addRay(center_ray2, parabola1.getAxes()[1]);
                    if (count_while_1 === 1) {
                    }
                    const points1 = rayTwo_1.rayTwo_parabola(ray2, parabola1);
                    const points2 = rayTwo_1.rayTwo_parabola(ray2, parabola2);
                    geom.delObj(ray2, false);
                    geom.delPoint(center_ray2);
                    if (points1[0] !== undefined && points2[0] !== undefined) {
                        d = vectorFromPointsAtoB(points1[0], points2[0], false).length();
                        if (points2[1] != undefined) {
                            if (points2.length === 2 && d > vectorFromPointsAtoB(points1[0], points2[1], false).length()) {
                                d = vectorFromPointsAtoB(points1[0], points2[1], false).length();
                            }
                        }
                    }
                    geom.delPoints(points1);
                    geom.delPoints(points2);
                    distance_k1.push(d);
                    if (distance_k1.length >= 2) {
                        const num = distance_k1[distance_k1.length - 1] - distance_k1[distance_k1.length - 2];
                        if (distance_k1[distance_k1.length - 1] > distance_k1[distance_k1.length - 2]) {
                            total++;
                            let increasing_slope = true;
                            let count_slope = 0;
                            do {
                                let next_init_k1_x = init_k1_x + count_while_2 * (width_k1) * U1.x;
                                let next_init_k1_y = init_k1_y + count_while_2 * (width_k1) * U1.y;
                                let next_init_k1_z = init_k1_z + count_while_2 * (width_k1) * U1.z;
                                let next_width_k1 = width_k1 / inside_dichotomie;
                                center_ray2.setPosition([next_init_k1_x, next_init_k1_y, next_init_k1_z]);
                                ray2 = geom.addRay(center_ray2, parabola1.getAxes()[1]);
                                const points10 = rayTwo_1.rayTwo_parabola(ray2, parabola1);
                                const points20 = rayTwo_1.rayTwo_parabola(ray2, parabola2);
                                if (points10[0] !== undefined && points20[0] !== undefined) {
                                    xyz_result = points10[0].getPosition();
                                    geom.delObj(ray2, false);
                                    geom.delPoint(center_ray2);
                                    let d0 = vectorFromPointsAtoB(points10[0], points20[0], false).length();
                                    if (points20[1] !== undefined) {
                                        if (points20.length === 2 && d0 > vectorFromPointsAtoB(points10[0], points20[1], false).length()) {
                                            d0 = vectorFromPointsAtoB(points10[0], points20[1], false).length();
                                        }
                                    }
                                    geom.delPoints(points10);
                                    geom.delPoints(points20);
                                    center_ray2.setPosition([next_init_k1_x + next_width_k1 * U1.x,
                                        next_init_k1_y + next_width_k1 * U1.y,
                                        next_init_k1_z + next_width_k1 * U1.z]);
                                    ray2 = geom.addRay(center_ray2, parabola1.getAxes()[1]);
                                    const points11 = rayTwo_1.rayTwo_parabola(ray2, parabola1);
                                    const points21 = rayTwo_1.rayTwo_parabola(ray2, parabola2);
                                    geom.delObj(ray2, false);
                                    geom.delPoint(center_ray2);
                                    if (points11[0] !== undefined && points21[0] !== undefined) {
                                        let d1 = vectorFromPointsAtoB(points11[0], points21[0], false).length();
                                        if (points21[1] !== undefined) {
                                            if (points21.length === 2 && d1 > vectorFromPointsAtoB(points11[0], points21[1], false).length()) {
                                                d1 = vectorFromPointsAtoB(points11[0], points21[1], false).length();
                                            }
                                        }
                                    }
                                    slope = d1 - d0;
                                    geom.delPoints(points11);
                                    geom.delPoints(points21);
                                    if (d1 < d0) {
                                        increasing_slope = false;
                                    }
                                    if (!increasing_slope) {
                                        OK_ = true;
                                        geom.delPoints(points11);
                                        geom.delPoints(points21);
                                        geom.delPoints(points1);
                                        geom.delPoints(points2);
                                        geom.delObj(ray2, false);
                                        break;
                                    }
                                    // }
                                    count_while_2--;
                                    count_slope++;
                                    console.log("count_slope++ = " + count_slope++);
                                    if (slope === 0) {
                                        geom.delPoints(points11);
                                        geom.delPoints(points21);
                                        geom.delPoints(points1);
                                        geom.delPoints(points2);
                                        geom.delObj(ray2, false);
                                        break;
                                    }
                                }
                            } while (increasing_slope);
                            init_k1_x += count_while_2 * (width_k1) * U1.x;
                            init_k1_y += count_while_2 * (width_k1) * U1.y;
                            init_k1_z += count_while_2 * (width_k1) * U1.z;
                            if (OK_) {
                                break;
                            }
                            cond_k1 = distance_k1[distance_k1.length - 1] < distance_k1[distance_k1.length - 2];
                        }
                    }
                    geom.delPoints(points1);
                    geom.delPoints(points2);
                    count_while_2++;
                    geom.delObj(ray2, false);
                    geom.delPoint(center_ray2);
                    if (slope === 0) {
                        break;
                    }
                    console.log("count_while_2++ = " + count_while_2++);
                } while (cond_k1);
                width_k1 = width_k1 / inside_dichotomie;
                count_while_2 = 0;
                count_while_1++;
                console.log("count wh1 = " + count_while_1);
                d_k1 = d;
                if (d_k1 <= eps_k1 || slope === 0) {
                    let check_double = false;
                    for (const check_xyz of xyz_results) {
                        const A = new three.Vector3(check_xyz[0], check_xyz[1], check_xyz[2]);
                        const B = new three.Vector3(xyz_result[0], xyz_result[1], xyz_result[2]);
                        const C = subVectors(A, B, false);
                        if (C.length() < threshold) {
                            check_double = true;
                        }
                    }
                    if (!check_double) {
                        xyz_results.push(xyz_result);
                    }
                    precision.push(d_k1);
                    console.log("precision = " + "\n" + d);
                }
                if (slope === 0) {
                    break;
                }
            } while (d_k1 > eps_k1);
        }
    }
    // dichotomie done
    geom.delPoint(center_ray2);
    if (xyz_results.length >= 1) {
        for (const xyz of xyz_results) {
            result.push(geom.addPoint(xyz));
        }
    }
    // pops resulting points up
    // return result;
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
function parabola_width(parabola1) {
    const angle0_p1 = ((parabola1.getAngles()[0] % 360) + 360) % 360;
    const angle1_p1 = (((parabola1.getAngles()[1] % 360) + 360) % 360);
    const U1 = new three.Vector3(parabola1.getAxes()[0][0], parabola1.getAxes()[0][1], parabola1.getAxes()[0][2]).normalize();
    const V1 = new three.Vector3(parabola1.getAxes()[1][0], parabola1.getAxes()[1][1], parabola1.getAxes()[1][2]).normalize();
    const p = new three.Vector3(parabola1.getAxes()[0][0], parabola1.getAxes()[0][1], parabola1.getAxes()[0][2]).length();
    const r1 = p / (1 + Math.cos(angle0_p1 * (2 * Math.PI / 360) - (Math.PI / 2)));
    const r2 = p / (1 + Math.cos(angle1_p1 * (2 * Math.PI / 360) - (Math.PI / 2)));
    const x1 = r1 * Math.cos(angle0_p1 * (2 * Math.PI / 360));
    const x2 = r2 * Math.cos(angle1_p1 * (2 * Math.PI / 360));
    return (x1 - x2);
}
exports.parabola_width = parabola_width;
//# sourceMappingURL=parabola.js.map