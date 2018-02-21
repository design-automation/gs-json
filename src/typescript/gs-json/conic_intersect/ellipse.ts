import {IEllipse, IPolyline, IGeom, IPoint, IModel, XYZ} from "../ifaces_gs";
import * as three from "three";
import * as util from "../_utils";
import * as kld from "kld-intersections";
import * as arr from "../libs/arr/arr";

export function ellipse_ellipse(ellipse1: IEllipse, ellipse2: IEllipse): IPoint[] {
    const m: IModel = ellipse1.getModel();
    const v1: [XYZ, XYZ, XYZ] = ellipse1.getAxes();
    const v2: [XYZ, XYZ, XYZ] = ellipse2.getAxes();
    if(!planesAreCoplanar(ellipse1.getOrigin(), v1[2], ellipse2.getOrigin(), v2[2])) {
        throw new Error("Entities must be coplanar.");}
    const g: IGeom = m.getGeom();
    const rx1: three.Vector3 = new three.Vector3(v1[0][0],v1[0][1],v1[0][2]);
    const ry1: three.Vector3 = new three.Vector3(v1[1][0],v1[1][1],v1[1][2]);
    const rx2: three.Vector3 = new three.Vector3(v2[0][0],v2[0][1],v2[0][2]);
    const ry2: three.Vector3 = new three.Vector3(v2[1][0],v2[1][1],v2[1][2]);
    const r: number = Math.max(rx1.length(), ry1.length()) + Math.max(rx2.length(), ry2.length());
    const O1O2: three.Vector3 = vectorFromPointsAtoB(ellipse1.getOrigin(),ellipse2.getOrigin(),false);
    if (O1O2.length() > r ) {return null;}
    const O1: three.Vector3 = new three.Vector3(0,0,0);
    const e1: three.Vector3 = new three.Vector3(1,0,0);
    const e2: three.Vector3 = new three.Vector3(0,1,0);
    const e3: three.Vector3 = new three.Vector3(0,0,1);
    const C1: three.Vector3 = new three.Vector3(...ellipse1.getOrigin().getPosition());
    const U1: three.Vector3 = new three.Vector3(...v1[0]).normalize();
    const V1: three.Vector3 = new three.Vector3(...v1[1]).normalize();
    const W1: three.Vector3 = crossVectors(U1,V1,true);
    let angles1: [number, number] = ellipse1.getAngles();
    if (angles1 === undefined) {angles1 = [0,360];}
    const angles_circle_1: number = angles1[1]-angles1[0];
    const C2: three.Vector3 = new three.Vector3(...ellipse2.getOrigin().getPosition());
    const U2: three.Vector3 = new three.Vector3(...v2[0]).normalize();
    const V2: three.Vector3 = new three.Vector3(...v2[1]).normalize();
    const W2: three.Vector3 = crossVectors(U2,V2,true);
    let angles2: [number, number] = ellipse2.getAngles();
    if (angles2 === undefined) {angles2 = [0,360];}
    const angles_circle_2: number = angles2[1]-angles2[0];
    const C1O1: three.Vector3 = subVectors(O1,C1,false);
    const vec_O_1: three.Vector3 = new three.Vector3(
        dotVectors(C1O1,U1),
        dotVectors(C1O1,V1),
        dotVectors(C1O1,W1),
        );
    const x1: three.Vector3 = new three.Vector3(
        dotVectors(e1,U1),
        dotVectors(e1,V1),
        dotVectors(e1,W1),
        );
    const y1: three.Vector3 = new three.Vector3(
        dotVectors(e2,U1),
        dotVectors(e2,V1),
        dotVectors(e2,W1),
        );
    const rotation1: three.Matrix4 = xformMatrix(vec_O_1,x1,y1);
    const O1C1: three.Vector3 = subVectors(C1,O1,false);
    const init_vec_O_1: three.Vector3 = new three.Vector3(
        dotVectors(O1C1,e1),
        dotVectors(O1C1,e2),
        dotVectors(O1C1,e3),
        );
    const init_x1: three.Vector3 = new three.Vector3(
        dotVectors(U1,e1),
        dotVectors(U1,e2),
        dotVectors(U1,e3),
        );
    const init_y1: three.Vector3 = new three.Vector3(
        dotVectors(V1,e1),
        dotVectors(V1,e2),
        dotVectors(V1,e3),
        );
    const init_rotation1: three.Matrix4 = xformMatrix(init_vec_O_1,init_x1,init_y1);
    const a: three.Vector3 = multVectorMatrix(C1,init_rotation1);
    const b: three.Vector3 = multVectorMatrix(C2,init_rotation1);
    const ellipse_1 = {
        center: new kld.Point2D(a.x,a.y),
        rx: rx1.length(),
        ry: ry1.length(),
    };
    const ellipse_2 = {
        center: new kld.Point2D(b.x,b.y),
        rx: rx2.length(),
        ry: ry2.length(),
    };
    const result: kld.Intersection = kld.Intersection.intersectEllipseEllipse(ellipse_1.center, ellipse_1.rx,
        ellipse_1.ry, ellipse_2.center, ellipse_2.rx, ellipse_2.ry);
    const results: three.Vector3[] = [];
    for (const point of result.points) {
        results.push(new three.Vector3(point.x,point.y,0));
    }
    const results_c1: three.Vector3[] = [];
    for (const point of results) {
        results_c1.push(multVectorMatrix(point,rotation1));
    }    
    const points: IPoint[] = [];
    const original_angles_1: number[] = arr.Arr.deepCopy(ellipse1.getAngles());
    const original_angles_2: number[] = arr.Arr.deepCopy(ellipse2.getAngles());
    for(const point of results_c1) {
        const c1_to_point: three.Vector3 = new three.Vector3(point.x - C1.x,point.y - C1.y,point.z - C1.z);
        const c2_to_point: three.Vector3 = new three.Vector3(point.x - C2.x,point.y - C2.y,point.z - C2.z);
        let angle_1: number = U1.angleTo(c1_to_point) * 180/Math.PI;
        if( crossVectors(U1, c1_to_point).dot(crossVectors(U1,V1)) < 0 ) {angle_1 = 360 - angle_1;}
        angle_1 =  ((angle_1 %360) + 360) %360;
        let angle_2: number = U2.angleTo(c2_to_point) * 180/Math.PI;
        if( crossVectors(U2, c2_to_point).dot(crossVectors(U2,V2)) < 0 ) {angle_2 = 360 - angle_2;}
        angle_2 =  ((angle_2 %360) + 360) %360;
        angles1[0] =  ((angles1[0] %360) + 360) %360;
        angles1[1] =  ((angles1[1] %360) + 360) %360;
        if(original_angles_1[0] !== original_angles_1[1] && angles1[1] === angles1[0]) {
        angles1[1] = angles1[1] + 360;}
        angles2[0] =  ((angles2[0] %360) + 360) %360;
        angles2[1] =  ((angles2[1] %360) + 360) %360;
        if( original_angles_2[0] !== original_angles_2[1] && angles2[1] === angles2[0]) {
        angles2[1] = angles2[1] + 360;}
        let ok: boolean = true;
        if(angles1[1] > angles1[0]) {
            if( (angle_1 < angles1[0] && angle_1 >= 0 ) || (angle_1 > angles1[1] && angle_1 <= 360)) {
                ok = false;
            }
        }
        if(angles1[0] > angles1[1]) {
            if( angle_1 > angles1[1] && angle_1 < angles1[0] ) {ok = false;
            }
        }
        if(angles2[1] > angles2[0]) {
            if( (angle_2 < angles2[0] && angle_2 >= 0)|| (angle_2 > angles2[1] && angle_2 <= 360)) {ok = false;
            }
        }
        if(angles2[0] > angles2[1]) {
            if( angle_2 > angles2[1] && angle_2 < angles2[0] ) {ok = false;
            }
        }
        if(ok) {points.push(g.addPoint([point.x,point.y,point.z]));}
        }
    return points;
        }
const EPS: number = 1e-9;
export function planesAreCoplanar(origin1: IPoint, normal1: XYZ,
                                  origin2: IPoint, normal2: XYZ): boolean {
    const origin1_v  = new three.Vector3(...origin1.getPosition());
    const normal1_v  = new three.Vector3(...normal1).normalize();
    const origin2_v  = new three.Vector3(...origin2.getPosition());
    const normal2_v  = new three.Vector3(...normal2).normalize();
    if (Math.abs(dotVectors(subVectors(origin1_v, origin2_v), normal2_v)) > EPS) {return false;}
    if (Math.abs(1- Math.abs(normal1_v.dot(normal2_v))) > EPS) {return false; } //fixed bug
    return true;
}
export function subVectors(v1: three.Vector3, v2: three.Vector3, norm: boolean = false): three.Vector3 {
    const v3: three.Vector3 = new three.Vector3();
    v3.subVectors(v1, v2);
    if (norm) {v3.normalize();}
    return v3;
}
export function crossVectors(v1: three.Vector3, v2: three.Vector3, norm: boolean = false): three.Vector3 {
    const v3: three.Vector3 = new three.Vector3();
    v3.crossVectors(v1, v2);
    if (norm) {v3.normalize();}
    return v3;
}
export function dotVectors(v1: three.Vector3, v2: three.Vector3): number {
    return v1.dot(v2);
}
export function vectorFromPointsAtoB(a: IPoint, b: IPoint, norm: boolean = false): three.Vector3 {
    const v: three.Vector3 = subVectors(new three.Vector3(...b.getPosition()),
        new three.Vector3(...a.getPosition()));
    if (norm) {v.normalize();}
    return v;
}
export function multVectorMatrix(v: three.Vector3, m: three.Matrix4): three.Vector3 {
    const v2: three.Vector3 = v.clone();
    v2.applyMatrix4(m);
    return v2;
}
export function xformMatrix(o: three.Vector3, x: three.Vector3, y: three.Vector3): three.Matrix4 {
    const m1: three.Matrix4 = new three.Matrix4();
    const o_neg: three.Vector3 = o.clone().negate();
    m1.setPosition(o_neg);
    const m2: three.Matrix4 = new three.Matrix4();
    m2.makeBasis(x.normalize(), y.normalize(), crossVectors(x,y,true));
    m2.getInverse(m2);
    const m3: three.Matrix4 = new three.Matrix4();
    m3.multiplyMatrices(m2, m1);
    return m3;
}
