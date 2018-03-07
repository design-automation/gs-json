import {IParabola, IPolyline, IGeom, IPoint, IModel, XYZ, IRayTwo} from "../ifaces_gs";
import * as three from "three";
import * as util from "../_utils";
import * as plane3D from "./plane3D";
import * as its from "./rayTwo";
import {Arr} from "../libs/arr/arr";
import {EObjType} from "../enums";
import * as parabola_polyline from "../conic_polyline/parabola_polyline";
import {rayTwo_polyline} from "../conic_polyline/rayTwo_polyline";
import {rayTwo_parabola} from "../conic_intersect/rayTwo";

export function parabola_parabola(parabola1: IParabola, parabola2: IParabola): IPoint[] {
const result: IPoint[] = [];
const xyz_results: XYZ[] = [];
const geom: IGeom =parabola1.getGeom();
const eps: number = 1e-300;
const threshold: number = 1e-4;
const angle0_p1: number = ((parabola1.getAngles()[0] %360) + 360) %360;
const angle1_p1: number = (((parabola1.getAngles()[1] %360) + 360) %360);
const U1: three.Vector3 = new three.Vector3(parabola1.getAxes()[0][0],
                                            parabola1.getAxes()[0][1],
                                            parabola1.getAxes()[0][2]).normalize();
const V1: three.Vector3 = new three.Vector3(parabola1.getAxes()[1][0],
                                            parabola1.getAxes()[1][1],
                                            parabola1.getAxes()[1][2]).normalize();
const p: number = new three.Vector3(parabola1.getAxes()[0][0],
                            parabola1.getAxes()[0][1],
                            parabola1.getAxes()[0][2]).length();
const r1: number = p / (1 + Math.cos(angle0_p1*(2*Math.PI/360) - (Math.PI/2)));
const r2: number = p / (1 + Math.cos(angle1_p1*(2*Math.PI/360) - (Math.PI/2)));
const d1: number = Math.abs(r1 * Math.cos(angle0_p1*(2*Math.PI/360)));
const d2: number = Math.abs(r2 * Math.cos(angle1_p1*(2*Math.PI/360)));
const xyz: any[] = Arr.deepCopy(parabola1.getOrigin().getPosition());
const center_ray2: IPoint = geom.addPoint([xyz[0],xyz[1],xyz[2]]);


const p2: number = new three.Vector3(parabola2.getAxes()[0][0],
                            parabola2.getAxes()[0][1],
                            parabola2.getAxes()[0][2]).length();
// const numb: number = p/p2;
// console.log("numb = " + numb)
const N: number = (p/p2) * 20;
const inside_dichotomie: number = 2;
const distances: number[] = [];
let count: number = 0;
let list: number[] = [];
let precision: number[] = [];
for (let k = -2; k<N+2 ; k++) {
    center_ray2.setPosition([xyz[0] + ( (k/N)*(d1 + d2) - d2)*U1.x,
                              xyz[1] + ( (k/N)*(d1 + d2) - d2)*U1.y,
                              xyz[2] + ( (k/N)*(d1 + d2) - d2)*U1.z]);
    const ray2: IRayTwo = geom.addRayTwo(center_ray2, parabola1.getAxes()[1]);
    const points1: IPoint[] = rayTwo_parabola(ray2, parabola1);
    const points2: IPoint[] = rayTwo_parabola(ray2, parabola2);
    geom.delObj(ray2, false);
    geom.delPoint(center_ray2);
    let d: number = 0;
    if( points2.length >=1 && points1.length >= 1) {
        switch(points2.length) {
            case 1: d = vectorFromPointsAtoB(points1[0],points2[0],false).length();
                    break;
            case 2: d = vectorFromPointsAtoB(points1[0],points2[0],false).length();
                    if( d > vectorFromPointsAtoB(points1[0],points2[1],false).length()) {
                    d = vectorFromPointsAtoB(points1[0],points2[1],false).length();
                    }
                    break;
            default: throw new Error("check parameters");
        }
        geom.delPoints(points1);
        geom.delPoints(points2);
        distances.push(d);
        const cond1: boolean = (Math.abs(d) < 1)
            || (Math.abs(distances[distances.length - 2]) < 1)
            || (Math.abs(distances[distances.length - 3]) < 1);
        const e1: number = d - distances[distances.length - 2];
        const e2: number = distances[distances.length - 2] - distances[distances.length - 3];
        const e3: number = Math.sign(e1) * Math.sign(e2);
        const cond2: boolean = e3 === -1;
        const ok: boolean = cond1 && cond2;
        if(ok) { list.push(k-1);
        }
    }
    geom.delPoints(points1);
    geom.delPoints(points2);
}
let total: number = 0;
for( const k of list) {
    if(k!== undefined) {
    let init_k1_x: number = xyz[0] + ( (k/N)*(d1 + d2) - d2)*U1.x;
    let init_k1_y: number = xyz[1] + ( (k/N)*(d1 + d2) - d2)*U1.y;
    let init_k1_z: number = xyz[2] + ( (k/N)*(d1 + d2) - d2)*U1.z;
    let width_k1: number = (1/N)*(d1 + d2);
    const distance_k1: number[] = [];
    let d_k1: number = 4;
    let d: number = 4;
    let slope: number;
    const eps_k1: number = eps;
    let count_while_1: number = 0;
    let count_while_2: number = 0;
    let xyz_result: XYZ;
        do {
        let cond_k1: boolean = true;
        let OK_: boolean = false;
        init_k1_x +=  count_while_2*(width_k1)*U1.x;
        init_k1_y +=  count_while_2*(width_k1)*U1.y;
        init_k1_z +=  count_while_2*(width_k1)*U1.z;
        count_while_2 = 0;
                do {
                center_ray2.setPosition([init_k1_x + count_while_2*(width_k1)*U1.x,
                init_k1_y + count_while_2*(width_k1)*U1.y,
                init_k1_z + count_while_2*(width_k1)*U1.z]);
                let ray2: IRayTwo = geom.addRay(center_ray2, parabola1.getAxes()[1]);
                if(count_while_1 === 1){
                }
                const points1: IPoint[] = rayTwo_parabola(ray2, parabola1);
                const points2: IPoint[] = rayTwo_parabola(ray2, parabola2);
                geom.delObj(ray2, false);
                geom.delPoint(center_ray2);
                d = vectorFromPointsAtoB(points1[0],points2[0],false).length();
                if( points2.length === 2 && d > vectorFromPointsAtoB(points1[0],points2[1],false).length()) {
                d = vectorFromPointsAtoB(points1[0],points2[1],false).length();}
                geom.delPoints(points1);
                geom.delPoints(points2);                
                distance_k1.push(d);
                if( distance_k1.length >= 2) {
                    const num: number = distance_k1[distance_k1.length - 1] -  distance_k1[distance_k1.length - 2];
                    if(distance_k1[distance_k1.length - 1] >  distance_k1[distance_k1.length - 2]) {
                        total++;
                        let increasing_slope: boolean = true;
                        let count_slope: number = 0;
                        do {
                            let next_init_k1_x: number = init_k1_x + count_while_2*(width_k1)*U1.x;
                            let next_init_k1_y: number = init_k1_y + count_while_2*(width_k1)*U1.y;
                            let next_init_k1_z: number = init_k1_z + count_while_2*(width_k1)*U1.z;
                            let next_width_k1: number = width_k1/inside_dichotomie;
                            center_ray2.setPosition([next_init_k1_x, next_init_k1_y, next_init_k1_z]);
                            ray2 = geom.addRay(center_ray2, parabola1.getAxes()[1]);
                            const points10: IPoint[] = rayTwo_parabola(ray2, parabola1);
                            xyz_result = points10[0].getPosition();
                            const points20: IPoint[] = rayTwo_parabola(ray2, parabola2);
                            geom.delObj(ray2, false);
                            geom.delPoint(center_ray2);
                            let d0: number = vectorFromPointsAtoB(points10[0],points20[0],false).length();
                            if( points20.length === 2 && d0 > vectorFromPointsAtoB(points10[0],points20[1],false).length()) {
                            d0 = vectorFromPointsAtoB(points10[0],points20[1],false).length();}
                            geom.delPoints(points10);
                            geom.delPoints(points20);
                            center_ray2.setPosition([next_init_k1_x + next_width_k1*U1.x,
                                                     next_init_k1_y + next_width_k1*U1.y,
                                                     next_init_k1_z + next_width_k1*U1.z]);
                            ray2 = geom.addRay(center_ray2, parabola1.getAxes()[1]);
                            const points11: IPoint[] = rayTwo_parabola(ray2, parabola1);
                            const points21: IPoint[] = rayTwo_parabola(ray2, parabola2);
                            geom.delObj(ray2, false);
                            geom.delPoint(center_ray2);
                            let d1: number = vectorFromPointsAtoB(points11[0],points21[0],false).length();
                            if( points21.length === 2 && d1 > vectorFromPointsAtoB(points11[0],points21[1],false).length()) {
                            d1 = vectorFromPointsAtoB(points11[0],points21[1],false).length();}
                            slope = d1 - d0;
                            geom.delPoints(points11);
                            geom.delPoints(points21);                        
                            if (d1 < d0 ) {increasing_slope = false ;}
                            if(!increasing_slope) {
                                OK_ = true;
                                geom.delPoints(points11);
                                geom.delPoints(points21);
                                geom.delPoints(points1);
                                geom.delPoints(points2);                                        
                                geom.delObj(ray2, false);                        
                                break}
                            count_while_2 --
                        count_slope++;
                        if( slope === 0) {
                                geom.delPoints(points11);
                                geom.delPoints(points21);
                                geom.delPoints(points1);
                                geom.delPoints(points2);                                        
                                geom.delObj(ray2, false);                        
                                break;}
                        } while(increasing_slope)
                        init_k1_x +=  count_while_2*(width_k1)*U1.x;
                        init_k1_y +=  count_while_2*(width_k1)*U1.y;
                        init_k1_z +=  count_while_2*(width_k1)*U1.z;
                        if( OK_) {break;}
                        cond_k1 = distance_k1[distance_k1.length - 1] <  distance_k1[distance_k1.length - 2];}
                    }
                    geom.delPoints(points1);
                    geom.delPoints(points2);                                        
                    count_while_2++;
                    geom.delObj(ray2, false);
                    geom.delPoint(center_ray2);
                    if( slope === 0) {
                        break;}
                }  while(cond_k1)
        width_k1 = width_k1/inside_dichotomie;
        count_while_2 = 0;
        count_while_1++;
        d_k1 = d;
        if(d_k1 <= eps_k1 || slope === 0) {
            let check_double: boolean = false;
            for(const check_xyz of xyz_results){
                const A: three.Vector3 = new three.Vector3(check_xyz[0],check_xyz[1],check_xyz[2]);
                const B: three.Vector3 = new three.Vector3(xyz_result[0],xyz_result[1],xyz_result[2]);
                const C: three.Vector3 = subVectors(A,B,false);
                    if(C.length() < threshold) { check_double = true;}                    
            }
            if(!check_double){
               xyz_results.push(xyz_result);}
            precision.push(d_k1);}
        if( slope === 0) {break;}
        } while( d_k1 > eps_k1 )
    }
}
geom.delPoint(center_ray2);
if(xyz_results.length >= 1) {
        for(const xyz of xyz_results){
            result.push(geom.addPoint(xyz))
            }
}
return result;
}

export function vectorFromPointsAtoB(a: IPoint, b: IPoint, norm: boolean = false): three.Vector3 {
    const v: three.Vector3 = subVectors(new three.Vector3(...b.getPosition()),
        new three.Vector3(...a.getPosition()));
    if (norm) {v.normalize();}
    return v;
}

export function subVectors(v1: three.Vector3, v2: three.Vector3, norm: boolean = false): three.Vector3 {
    const v3: three.Vector3 = new three.Vector3();
    v3.subVectors(v1, v2);
    if (norm) {v3.normalize();}
    return v3;
}
