"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three = require("three");
const arr_1 = require("../libs/arr/arr");
const rayTwo_1 = require("../conic_intersect/rayTwo");
function parabola_parabola(parabola1, parabola2) {
    const result = [];
    const geom = parabola1.getGeom();
    // for(const point of geom.getAllPoints()) {
    // console.log( "Point num = " + point.getID())
    // // if(obj.getObjType() === EObjType.rayTwo || obj.getObjType() === EObjType.ray) { geom.delObj(obj, false)}
    // }
    const eps = 1e-14;
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
    const N = 80;
    const distances = [];
    let count = 0;
    const list = [];
    let k1 = undefined;
    let k2 = undefined;
    let k3 = undefined;
    let k4 = undefined;
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
                switch (count) {
                    case 0:
                        k1 = k - 1;
                        list.push(k - 1);
                        count++;
                        break;
                    case 1:
                        k2 = k - 1;
                        list.push(k - 1);
                        count++;
                        break;
                    case 2:
                        k3 = k - 1;
                        list.push(k - 1);
                        count++;
                        break;
                    case 3:
                        k4 = k - 1;
                        list.push(k - 1);
                        count++;
                        break;
                    default:
                        list.push(k - 1);
                        break;
                }
            }
        }
    }
    for (const k of [k1, k2, k3, k4]) {
        // if(k1!== undefined) {
        // let init_k1_x: number = xyz[0] + ( (k1/N)*(d1 + d2) - d2)*U1.x;
        // let init_k1_y: number = xyz[1] + ( (k1/N)*(d1 + d2) - d2)*U1.y;
        // let init_k1_z: number = xyz[2] + ( (k1/N)*(d1 + d2) - d2)*U1.z;
        if (k !== undefined) {
            let init_k1_x = xyz[0] + ((k / N) * (d1 + d2) - d2) * U1.x;
            let init_k1_y = xyz[1] + ((k / N) * (d1 + d2) - d2) * U1.y;
            let init_k1_z = xyz[2] + ((k / N) * (d1 + d2) - d2) * U1.z;
            let width_k1 = (1 / N) * (d1 + d2);
            const distance_k1 = [];
            let d_k1 = 4;
            let d = 4;
            const eps_k1 = 1e-7;
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
                    d = vectorFromPointsAtoB(points1[0], points2[0], false).length();
                    if (points2.length === 2 && d > vectorFromPointsAtoB(points1[0], points2[1], false).length()) {
                        d = vectorFromPointsAtoB(points1[0], points2[1], false).length();
                    }
                    distance_k1.push(d);
                    if (distance_k1.length >= 2) {
                        const num = distance_k1[distance_k1.length - 1] - distance_k1[distance_k1.length - 2];
                        if (distance_k1[distance_k1.length - 1] > distance_k1[distance_k1.length - 2]) {
                            let increasing_slope = true;
                            do {
                                let next_init_k1_x = init_k1_x + count_while_2 * (width_k1) * U1.x;
                                let next_init_k1_y = init_k1_y + count_while_2 * (width_k1) * U1.y;
                                let next_init_k1_z = init_k1_z + count_while_2 * (width_k1) * U1.z;
                                let next_width_k1 = width_k1 / N;
                                center_ray2.setPosition([next_init_k1_x, next_init_k1_y, next_init_k1_z]);
                                ray2 = geom.addRay(center_ray2, parabola1.getAxes()[1]);
                                const points10 = rayTwo_1.rayTwo_parabola(ray2, parabola1);
                                xyz_result = points10[0].getPosition();
                                const points20 = rayTwo_1.rayTwo_parabola(ray2, parabola2);
                                geom.delObj(ray2, false);
                                geom.delPoint(center_ray2);
                                let d0 = vectorFromPointsAtoB(points10[0], points20[0], false).length();
                                if (points20.length === 2 && d0 > vectorFromPointsAtoB(points10[0], points20[1], false).length()) {
                                    d0 = vectorFromPointsAtoB(points10[0], points20[1], false).length();
                                }
                                center_ray2.setPosition([next_init_k1_x + next_width_k1 * U1.x,
                                    next_init_k1_y + next_width_k1 * U1.y,
                                    next_init_k1_z + next_width_k1 * U1.z]);
                                ray2 = geom.addRay(center_ray2, parabola1.getAxes()[1]);
                                const points11 = rayTwo_1.rayTwo_parabola(ray2, parabola1);
                                const points21 = rayTwo_1.rayTwo_parabola(ray2, parabola2);
                                geom.delObj(ray2, false);
                                geom.delPoint(center_ray2);
                                let d1 = vectorFromPointsAtoB(points11[0], points21[0], false).length();
                                if (points21.length === 2 && d1 > vectorFromPointsAtoB(points11[0], points21[1], false).length()) {
                                    d1 = vectorFromPointsAtoB(points11[0], points21[1], false).length();
                                }
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
                                count_while_2--;
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
                    console.log("count_while_2 = " + count_while_2);
                    geom.delObj(ray2, false);
                    geom.delPoint(center_ray2);
                    // if(count_while_2 === 800) {break;}
                } while (cond_k1);
                width_k1 = width_k1 / N;
                count_while_2 = 0;
                count_while_1++;
                d_k1 = d;
                console.log("d = " + d);
                console.log("count_while_1 = " + count_while_1 + "\n");
                // if(count_while_1 === 8) {break;}
                if (d_k1 <= eps_k1) {
                    result.push(geom.addPoint(xyz_result));
                }
            } while (d_k1 > eps_k1);
        }
    }
    // const polyline1: IPolyline = parabola_polyline.parabola_polyline_renderXYZ(parabola1);
    // const polyline2: IPolyline = parabola_polyline.parabola_polyline_renderXYZ(parabola2);
    console.log("\n");
    console.log([k1, k2, k3, k4]);
    console.log("\n");
    // for(const point of result) {
    //     geom.addCircle(point,
    //         [U1.setLength(0.08).x,U1.setLength(0.08).y,U1.setLength(0.08).z],
    //         [V1.setLength(0.08).x,V1.setLength(0.08).y,V1.setLength(0.08).z])
    // }
    // for(const obj of geom.getAllObjs()) {
    //     console.log( "type of = " + obj.getObjType())
    //     // if(obj.getObjType() === EObjType.rayTwo || obj.getObjType() === EObjType.ray) { geom.delObj(obj, false)}
    // }
    // for(const point of geom.getAllPoints()) {
    //     console.log( "Point num = " + point.getID())
    //     // if(obj.getObjType() === EObjType.rayTwo || obj.getObjType() === EObjType.ray) { geom.delObj(obj, false)}
    // }
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