import {IEllipse, IPolyline, IGeom, IPoint, IModel, XYZ} from "../ifaces_gs";
import * as three from "three";
import * as util from "../_utils";

/*
*
* Function which creates a set of points and polyline to the geometry from a 3D Ellipse
*
*/
export function ellipse_polyline(ellipse: IEllipse): IPolyline {
    const points: IPoint[] = [];
    const polyline: IPolyline[] =[];
    const model: IModel = ellipse.getModel();
    const geometry: IGeom = model.getGeom();
    const a: number = new three.Vector3(ellipse.getAxes()[0][0],
                                        ellipse.getAxes()[0][1],
                                        ellipse.getAxes()[0][2]).length();
    const b: number = new three.Vector3(ellipse.getAxes()[1][0],
                                        ellipse.getAxes()[1][1],
                                        ellipse.getAxes()[1][2]).length();
    const angle0: number = ((ellipse.getAngles()[0] %360) + 360) %360;
    let angle1: number = (((ellipse.getAngles()[1] %360) + 360) %360);
    if(angle1<angle0) {angle1 = angle1 + 360;}
    const U1: three.Vector3 = new three.Vector3(ellipse.getAxes()[0][0],
                                                ellipse.getAxes()[0][1],
                                                ellipse.getAxes()[0][2]).normalize();
    const V1: three.Vector3 = new three.Vector3(ellipse.getAxes()[1][0],
                                                ellipse.getAxes()[1][1],
                                                ellipse.getAxes()[1][2]).normalize();
    const center: three.Vector3 = new three.Vector3(ellipse.getOrigin().getPosition()[0],
                                                   ellipse.getOrigin().getPosition()[1],
                                                   ellipse.getOrigin().getPosition()[2]);
    let theta: number = angle0 * (2*Math.PI)/360;
    let r: number;
    const N: number = 50;
    const d_theta: number = (angle1-angle0)/(N)*(2*Math.PI)/360;
    for(let k: number = 0;k<N;k++) {
        r = (a*b)/(Math.sqrt((b*Math.cos(theta))*(b*Math.cos(theta))+(a*Math.sin(theta))*(a*Math.sin(theta))));
        const point: three.Vector3 = new three.Vector3(
            center.x + r*Math.cos(theta)*U1.x + r*Math.sin(theta)*V1.x,
            center.y + r*Math.cos(theta)*U1.y + r*Math.sin(theta)*V1.y,
            center.z + r*Math.cos(theta)*U1.z + r*Math.sin(theta)*V1.z,
            );
        points.push(geometry.addPoint([point.x,point.y,point.z]));
        theta = theta + d_theta;
    }
    return geometry.addPolyline(points,false);
    }
export function ellipse_length(curve: IEllipse, subdivision: number): number {
    // Approx 1.1
    const a: number = new three.Vector3(curve.getAxes()[0][0],
                                        curve.getAxes()[0][1],
                                        curve.getAxes()[0][2]).length();
    const b: number = new three.Vector3(curve.getAxes()[1][0],
                                        curve.getAxes()[1][1],
                                        curve.getAxes()[1][2]).length();
    const angle0: number = ((curve.getAngles()[0] %360) + 360) %360;
    let angle1: number = (((curve.getAngles()[1] %360) + 360) %360);
    if(angle1 < angle0) {angle1 = angle1 + 360;}
    if( curve.getAngles()[0] !== curve.getAngles()[1] && angle1 === angle0) {angle1 = angle1 + 360;}
    const U1: three.Vector3 = new three.Vector3(curve.getAxes()[0][0],
                                                curve.getAxes()[0][1],
                                                curve.getAxes()[0][2]).normalize();
    const V1: three.Vector3 = new three.Vector3(curve.getAxes()[1][0],
                                                curve.getAxes()[1][1],
                                                curve.getAxes()[1][2]).normalize();
    let theta: number = angle0 * (2*Math.PI)/360;
    let r: number;
    const N: number = subdivision;
    const d_theta: number = ((angle1-angle0)/N)*(2*Math.PI)/360;
    let distance: number = 0;
    for(let k: number = 0;k<N;k++) {
        r = (a*b)/(Math.sqrt((b*Math.cos(theta))*(b*Math.cos(theta))+(a*Math.sin(theta))*(a*Math.sin(theta))));
        const vector_point: three.Vector3 = new three.Vector3(
            r*Math.cos(theta)*U1.x + r*Math.sin(theta)*V1.x,
            r*Math.cos(theta)*U1.y + r*Math.sin(theta)*V1.y,
            r*Math.cos(theta)*U1.z + r*Math.sin(theta)*V1.z,
            );
        distance = distance + vector_point.length()*d_theta;
        theta = theta + d_theta;
    }
    return distance;
}

export function ellipse_find_angle(curve: IEllipse, length: number, subdivision: number) {
    // Approx 1.2
    const angles: [number,number] = curve.getAngles();
    let alpha_0: number = angles[0];
    let eps: number = -1;
    while (eps <0) {
        curve.setAngles([angles[0], alpha_0]);
        eps = ellipse_length(curve, subdivision) - length;
        alpha_0 = alpha_0 + 0.01;
    }
    curve.setAngles(angles);
    alpha_0 = ((alpha_0 %360) + 360) %360;
    return alpha_0;
}
export function ellipse_evaluate(curve: IEllipse, t: number, subdivision: number): XYZ {
    if( t<0 || t>1) {throw new Error("Set t in range [0;1]");}
    const l: number = ellipse_length(curve, subdivision);
    const len: number = t*l;
    const alpha: number = ellipse_find_angle(curve, len, subdivision);
    const U1: three.Vector3 = new three.Vector3(curve.getAxes()[0][0],
                                                curve.getAxes()[0][1],
                                                curve.getAxes()[0][2]).normalize();
    const V1: three.Vector3 = new three.Vector3(curve.getAxes()[1][0],
                                                curve.getAxes()[1][1],
                                                curve.getAxes()[1][2]).normalize();
    const center: three.Vector3 = new three.Vector3(curve.getOrigin().getPosition()[0],
                                                   curve.getOrigin().getPosition()[1],
                                                   curve.getOrigin().getPosition()[2]);
    const a: number = new three.Vector3(curve.getAxes()[0][0],
                                        curve.getAxes()[0][1],
                                        curve.getAxes()[0][2]).length();
    const b: number = new three.Vector3(curve.getAxes()[1][0],
                                        curve.getAxes()[1][1],
                                        curve.getAxes()[1][2]).length();
    const r = (a*b)/(Math.sqrt((b*Math.cos(alpha *Math.PI/180))*(b*Math.cos(alpha *Math.PI/180))+
              (a*Math.sin(alpha *Math.PI/180))*(a*Math.sin(alpha *Math.PI/180))));
    const point: three.Vector3 = new three.Vector3(
        center.x + r*Math.cos(alpha *Math.PI/180)*U1.x + r*Math.sin(alpha *Math.PI/180)*V1.x,
        center.y + r*Math.cos(alpha *Math.PI/180)*U1.y + r*Math.sin(alpha *Math.PI/180)*V1.y,
        center.z + r*Math.cos(alpha *Math.PI/180)*U1.z + r*Math.sin(alpha *Math.PI/180)*V1.z,
        );
    return [point.x,point.y,point.z];
}
export function ellipse_renderXYZ(curve: IEllipse, resolution): XYZ[] {
    const N: number = Math.floor(1/resolution);
    const render_XYZ: XYZ[] = [];
    let t: number = 0;
    const dk: number = 1/N;
    for (let k: number = 0; k<N; k++) {
        render_XYZ.push(ellipse_evaluate(curve, Math.min(t,1), 0.01));
        t = t + dk;
    }
    return render_XYZ;
}
export function ellipse_polyline_renderXYZ(curve: IEllipse) {
    const resolution: number = 0.02;
    const points: IPoint[] = curve.getGeom().addPoints(ellipse_renderXYZ(curve, resolution));
    const pline: IPolyline = curve.getGeom().addPolyline(points, false);
    return pline;
}
