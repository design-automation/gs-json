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
    const eps = 1e-9;
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
    const N = 80;
    const distances = [];
    let count = 0;
    const list = [];
    let k1 = undefined;
    let k2 = undefined;
    let k3 = undefined;
    let k4 = undefined;
    // First scan
    for (let k = -2; k < N + 2; k++) {
        center_ray2.setPosition([xyz[0] + ((k / N) * (d1 + d2) - d2) * U1.x,
            xyz[1] + ((k / N) * (d1 + d2) - d2) * U1.y,
            xyz[2] + ((k / N) * (d1 + d2) - d2) * U1.z]);
        // if( k === 0) {
        // center_ray2.setPosition([xyz[0] + ( (k/N)*(d1 + d2) - d2 + eps)*U1.x,
        //                           xyz[1] + ( (k/N)*(d1 + d2) - d2 + eps)*U1.y,
        //                           xyz[2] + ( (k/N)*(d1 + d2) - d2 + eps)*U1.z]);
        // }
        // if( k === N) {
        // center_ray2.setPosition([xyz[0] + ( (k/N)*(d1 + d2) - d2 - eps)*U1.x,
        //                           xyz[1] + ( (k/N)*(d1 + d2) - d2 - eps)*U1.y,
        //                           xyz[2] + ( (k/N)*(d1 + d2) - d2 - eps)*U1.z]);
        // }
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
            distances.push(d);
            const cond1 = (Math.abs(d) < 1)
                || (Math.abs(distances[distances.length - 2]) < 1)
                || (Math.abs(distances[distances.length - 3]) < 1);
            const e1 = d - distances[distances.length - 2];
            const e2 = distances[distances.length - 2] - distances[distances.length - 3];
            const e3 = Math.sign(e1) * Math.sign(e2);
            const cond2 = e3 === -1;
            // console.log("k " + k);
            // console.log("e1" + e1 +"\n");
            // console.log("e2" + e2 +"\n");
            // console.log("e3" + e3 +"\n");
            // console.log("d = " + d + "\n");
            // console.log("distances[distances.length - 1]) = " + distances[distances.length - 1] + "\n");
            // console.log("distances[distances.length - 2]) = " + distances[distances.length - 2] + "\n");
            // console.log("distances[distances.length - 3] = " + distances[distances.length - 3] + "\n");
            // console.log("\n");
            // console.log(cond1);
            // console.log(cond2);
            // console.log(cond3);
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
    // Exact identification ()
    // if(k1!== undefined) {
    // let init_k1: three.Vector3 = new three.Vector3(
    //     xyz[0] + ( (k1/N)*(d1 + d2) - d2)*U1.x,
    //     xyz[1] + ( (k1/N)*(d1 + d2) - d2)*U1.y,
    //     xyz[2] + ( (k1/N)*(d1 + d2) - d2)*U1.z);
    // let width_k1: number = (1/N)*(d1 + d2);
    // let distance_k1: number[] = [];
    // let d_k1: number;
    // center_ray2.setPosition([init_k1.x, init_k1.y, init_k1.z]);
    // const polyline3: IPolyline = rayTwo_polyline(ray2);
    // const points1: IPoint[] = rayTwo_parabola(ray2, parabola1);
    // for(const point of points1) {
    //     geom.addCircle(point, [0.05*U1.x,0.05*U1.y,0.05*U1.z],[0.05*V1.x,0.05*V1.y,0.05*V1.z]);
    // }
    // const points2: IPoint[] = rayTwo_parabola(ray2, parabola2);
    //     if( points2.length >=1 && points1.length >= 1) {
    //         switch(points2.length) {
    //             case 1: geom.addCircle(points2[0], [0.2*U1.x,0.2*U1.y,0.2*U1.z],[0.2*V1.x,0.2*V1.y,0.2*V1.z]);
    //                     d_k1 = vectorFromPointsAtoB(points1[0],points2[0],false).length();
    //                     break;
    //             case 2:
    //                     d_k1 = vectorFromPointsAtoB(points1[0],points2[0],false).length();
    //                     if( d_k1 <= vectorFromPointsAtoB(points1[0],points2[1],false).length()) {
    //                     geom.addCircle(points2[0], [0.2*U1.x,0.2*U1.y,0.2*U1.z],[0.2*V1.x,0.2*V1.y,0.2*V1.z]);
    //                     } else { geom.addCircle(points2[1], [0.2*U1.x,0.2*U1.y,0.2*U1.z],[0.2*V1.x,0.2*V1.y,0.2*V1.z]);
    //                     }
    //                     break;
    //             default: throw new Error("check parameters");
    //         }
    //         distance_k1.push(d_k1);
    //         const cond1: boolean = (Math.abs(d) < 1)
    //                                 || (Math.abs(distances[distances.length - 2]) < 1)
    //                                 || (Math.abs(distances[distances.length - 3]) < 1);
    //         const e1: number = d - distances[distances.length - 2];
    //         const e2: number = distances[distances.length - 2] - distances[distances.length - 3];
    //         const e3: number = Math.sign(e1) * Math.sign(e2);
    //         const cond2: boolean = e3 === -1;
    //         const ok: boolean = cond1 && cond2;
    //         if(ok) {
    //             switch(count) {
    //                 case 0:
    //                         k1 = k-1;
    //                         list.push(k-1);
    //                         count++;
    //                         break;
    //                 case 1:
    //                         k2 = k-1;
    //                         list.push(k-1);
    //                         count++;
    //                         break;
    //                 case 2:
    //                         k3 = k-1;
    //                         list.push(k-1);
    //                         count++;
    //                         break;
    //                 case 3:
    //                         k4 = k-1;
    //                         list.push(k-1);
    //                         count++;
    //                         break;
    //                 default:
    //                         list.push(k-1);
    //                         break;
    // //                throw new Error("check parameters");
    //             }
    //         }
    //     }
    //  }
    // if(k2!== undefined) { ;}
    // if(k3!== undefined) { ;}
    // if(k4!== undefined) { ;}
    const polyline1 = parabola_polyline.parabola_polyline_renderXYZ(parabola1);
    const polyline2 = parabola_polyline.parabola_polyline_renderXYZ(parabola2);
    geom.delObj(ray2, false);
    //console.log(distances);
    console.log("\n");
    console.log([k1, k2, k3, k4]);
    console.log("\n");
    console.log("list " + "\n" + list);
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