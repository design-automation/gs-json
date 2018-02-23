import {IEllipse, ICircle, IParabola,
    IHyperbola, IPlane, IPolyline, IGeom, IPoint, IModel, XYZ, IRayTwo} from "../ifaces_gs";
import * as three from "three";
import * as util from "../_utils";
import * as plane3D from "./plane3D";

export function rayTwo_circle(rayTwo: IRayTwo, circle: ICircle): IPoint[] {

    const v1: three.Vector3 = new three.Vector3(circle.getAxes()[0][0],
                                                circle.getAxes()[0][1],
                                                circle.getAxes()[0][2]);
    const v2: three.Vector3 = new three.Vector3(circle.getAxes()[1][0],
                                                circle.getAxes()[1][1],
                                                circle.getAxes()[1][2]);
    // const r: number = circle.getRadius();
    const r: number = 1;
    const ellipse: IEllipse = rayTwo.getGeom().addEllipse(circle.getOrigin(),
        [r*v1.x,r*v1.y,r*v1.z], [r*v2.x,r*v2.y,r*v2.z]);
    const points: IPoint[] = rayTwo_ellipse(rayTwo, ellipse);
    rayTwo.getGeom().delObj(ellipse,false);
    return points;

    // const v1: three.Vector3 = new three.Vector3(rayTwo.getVector()[0],
    //                                             rayTwo.getVector()[1],
    //                                             rayTwo.getVector()[2]);
    // const v2: three.Vector3 = new three.Vector3(circle.getAxes()[0][0],
    //                                             circle.getAxes()[0][1],
    //                                             circle.getAxes()[0][2]);
    // const v3: three.Vector3 = new three.Vector3(circle.getAxes()[1][0],
    //                                             circle.getAxes()[1][1],
    //                                             circle.getAxes()[1][2]);
    // let ortho_rC: three.Vector3 = new three.Vector3();
    // const EPS: number = 1e-4;
    // if(orthoVectors(v1,v2).length() > EPS) {ortho_rC = orthoVectors(v1,v2);}
    // if(orthoVectors(v1,v3).length() > EPS) {ortho_rC = orthoVectors(v1,v3);}
    // if(!planesAreCoplanar(circle.getOrigin(), circle.getAxes()[2], rayTwo.getOrigin(),
    //     [ortho_rC.x,ortho_rC.y,ortho_rC.z])) { throw new Error("Entities must be coplanar.");}
    // const plane: IPlane = circle.getGeom().addPlane(rayTwo.getOrigin(), rayTwo.getVector(), circle.getAxes()[2]);
    // const points = plane3D.plane3D_circle2D(circle,plane);
    // circle.getGeom().delObj(plane, false);
    // circle.getGeom().delObj(circle, false);
    // return points;
}

export function rayTwo_ellipse(rayTwo: IRayTwo, ellipse: IEllipse): IPoint[] {
    const v1: three.Vector3 = new three.Vector3(rayTwo.getVector()[0],
                                                rayTwo.getVector()[1],
                                                rayTwo.getVector()[2]);
    const v2: three.Vector3 = new three.Vector3(ellipse.getAxes()[0][0],
                                                ellipse.getAxes()[0][1],
                                                ellipse.getAxes()[0][2]);
    const v3: three.Vector3 = new three.Vector3(ellipse.getAxes()[1][0],
                                                ellipse.getAxes()[1][1],
                                                ellipse.getAxes()[1][2]);
    let ortho_rC: three.Vector3 = new three.Vector3();
    const EPS: number = 1e-4;
    if(orthoVectors(v1,v2).length() > EPS) {ortho_rC = orthoVectors(v1,v2);}
    if(orthoVectors(v1,v3).length() > EPS) {ortho_rC = orthoVectors(v1,v3);}

    // console.log();
    // if(!planesAreCoplanar(ellipse.getOrigin(), ellipse.getAxes()[2], rayTwo.getOrigin(),
    //     [ortho_rC.x,ortho_rC.y,ortho_rC.z])) {
    //     throw new Error("Entities must be coplanar.");}
    const plane: IPlane = ellipse.getGeom().addPlane(rayTwo.getOrigin(), rayTwo.getVector(), ellipse.getAxes()[2]);
    const points = plane3D.plane3D_ellipse2D(ellipse,plane);
    ellipse.getGeom().delObj(plane, false);
    return points;
}

export function rayTwo_parabola(rayTwo: IRayTwo, parabola: IParabola): IPoint[] {
    // Being developed;
    const v1: three.Vector3 = new three.Vector3(rayTwo.getVector()[0],
                                                rayTwo.getVector()[1],
                                                rayTwo.getVector()[2]);
    const v2: three.Vector3 = new three.Vector3(parabola.getAxes()[0][0],
                                                parabola.getAxes()[0][1],
                                                parabola.getAxes()[0][2]);
    const v3: three.Vector3 = new three.Vector3(parabola.getAxes()[1][0],
                                                parabola.getAxes()[1][1],
                                                parabola.getAxes()[1][2]);
    let ortho_rC: three.Vector3 = new three.Vector3();
    const EPS: number = 1e-4;
    if(orthoVectors(v1,v2).length() > EPS) {ortho_rC = orthoVectors(v1,v2);}
    if(orthoVectors(v1,v3).length() > EPS) {ortho_rC = orthoVectors(v1,v3);}
    if(!planesAreCoplanar(parabola.getOrigin(), parabola.getAxes()[2],
    rayTwo.getOrigin(), [ortho_rC.x,ortho_rC.y,ortho_rC.z])) {
        throw new Error("Entities must be coplanar.");}

    const plane: IPlane = parabola.getGeom().addPlane(rayTwo.getOrigin(), rayTwo.getVector(), parabola.getAxes()[2]);
    const points = plane3D.plane3D_parabola(parabola,plane);
    parabola.getGeom().delObj(plane, false);
    return points;
}

export function rayTwo_hyperbola(rayTwo: IRayTwo, hyperbola: IHyperbola): IPoint[] {
    // Being developed;
    const v1: three.Vector3 = new three.Vector3(rayTwo.getVector()[0],
                                                rayTwo.getVector()[1],
                                                rayTwo.getVector()[2]);
    const v2: three.Vector3 = new three.Vector3(hyperbola.getAxes()[0][0],
                                                hyperbola.getAxes()[0][1],
                                                hyperbola.getAxes()[0][2]);
    const v3: three.Vector3 = new three.Vector3(hyperbola.getAxes()[1][0],
                                                hyperbola.getAxes()[1][1],
                                                hyperbola.getAxes()[1][2]);
    let ortho_rC: three.Vector3 = new three.Vector3();
    const EPS: number = 1e-4;
    if(orthoVectors(v1,v2).length() > EPS) {ortho_rC = orthoVectors(v1,v2);}
    if(orthoVectors(v1,v3).length() > EPS) {ortho_rC = orthoVectors(v1,v3);}
    if(!planesAreCoplanar(hyperbola.getOrigin(), hyperbola.getAxes()[2], rayTwo.getOrigin(),
        [ortho_rC.x,ortho_rC.y,ortho_rC.z])) {
        throw new Error("Entities must be coplanar.");}

    const plane: IPlane = hyperbola.getGeom().addPlane(rayTwo.getOrigin(), rayTwo.getVector(), hyperbola.getAxes()[2]);
    const points = plane3D.plane3D_hyperbola(hyperbola,plane);
    hyperbola.getGeom().delObj(plane, false);
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
    if (Math.abs(1- Math.abs(normal1_v.dot(normal2_v))) > EPS) {return false; } // fixed bug
    return true;
}
export function dotVectors(v1: three.Vector3, v2: three.Vector3): number {
    return v1.dot(v2);
}
export function subVectors(v1: three.Vector3, v2: three.Vector3, norm: boolean = false): three.Vector3 {
    const v3: three.Vector3 = new three.Vector3();
    v3.subVectors(v1, v2);
    if (norm) {v3.normalize();}
    return v3;
}
export function orthoVectors(vector1: three.Vector3, vector2: three.Vector3): three.Vector3 {
    return crossVectors(vector1, vector2).cross(vector1);
}
export function crossVectors(v1: three.Vector3, v2: three.Vector3, norm: boolean = false): three.Vector3 {
    const v3: three.Vector3 = new three.Vector3();
    v3.crossVectors(v1, v2);
    if (norm) {v3.normalize();}
    return v3;
}
