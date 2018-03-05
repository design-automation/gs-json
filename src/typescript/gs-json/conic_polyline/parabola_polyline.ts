import {IParabola, IPolyline, IPoint, IModel, IGeom, XYZ} from "../ifaces_gs";
import * as three from "three";
import * as util from "../_utils";

/*
*
* Function which creates a set of 250 points and polyline to the geometry from a 3D Parabola
*
*/
export function parabola_polyline(parabola: IParabola): IPolyline {
    const points: IPoint[] = [];
    const polyline: IPolyline[] =[];
    const model: IModel = parabola.getModel();
    const geometry: IGeom = model.getGeom();
    const p: number = new three.Vector3(parabola.getAxes()[0][0],
                                        parabola.getAxes()[0][1],
                                        parabola.getAxes()[0][2]).length();
    const angle0: number = ((parabola.getAngles()[0] %360) + 360) %360;
    let angle1: number = (((parabola.getAngles()[1] %360) + 360) %360);
    if(angle1<angle0) {angle1 = angle1 + 360;}
    const U1: three.Vector3 = new three.Vector3(parabola.getAxes()[0][0],
                                                parabola.getAxes()[0][1],
                                                parabola.getAxes()[0][2]).normalize();
    const V1: three.Vector3 = new three.Vector3(parabola.getAxes()[1][0],
                                                parabola.getAxes()[1][1],
                                                parabola.getAxes()[1][2]).normalize();
    const center: three.Vector3 = new three.Vector3(parabola.getOrigin().getPosition()[0],
                                                   parabola.getOrigin().getPosition()[1],
                                                   parabola.getOrigin().getPosition()[2]);
    let theta: number = angle0*(2*Math.PI)/360;
    let r: number;
    const N: number = 500;
    const d_theta: number = (angle1-angle0)/N*2*Math.PI/360;

    for(let k: number = 0;k<N;k++) {
        r = p / (1 + Math.cos(theta - (Math.PI/2)));
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

export function Function_F(x: number): number {
    let y: number = null;
    const t1: number = Math.sqrt(1 + x*x);
    y = (1/2)* ( x*t1 + Math.log( x + t1 )  );
    return y;
}

export function parabola_length(curve: IParabola): number {
    const p: number = curve.getRadii()[0];
    const angles: number[] = util.checkParabolaAngles(curve.getAngles());
    const x0: number = ( p / (1 + Math.cos((angles[0]*(2*Math.PI)/360)
        - (Math.PI/2))) ) *Math.sin((angles[0]*(2*Math.PI)/360) - (Math.PI/2));
    const x1: number = ( p / (1 + Math.cos((angles[1]*(2*Math.PI)/360)
        - (Math.PI/2))) ) *Math.sin((angles[1]*(2*Math.PI)/360) - (Math.PI/2));
    return Math.abs(p*(Function_F(x1/p) - Function_F(x0/p)));
}

export function parabola_find_angle(curve: IParabola, length: number) {
     //Approx 1
    const angles: [number,number] = curve.getAngles();
    let alpha_0: number = angles[0];
    let eps: number = -1;
    while (eps <0) {
        curve.setAngles([angles[0], alpha_0]);
        eps = parabola_length(curve) - length;
        alpha_0 = alpha_0 + 0.01;
    }
    curve.setAngles(angles);
    return alpha_0;
}
export function parabola_evaluate(curve: IParabola, t: number): XYZ {
    if( t<0 || t>1) {throw new Error("Set t in range [0;1]");}
    const l: number = parabola_length(curve);
    const len: number = t*l;
    const alpha: number = parabola_find_angle(curve, len);
    const U1: three.Vector3 = new three.Vector3(curve.getAxes()[0][0],
                                                curve.getAxes()[0][1],
                                                curve.getAxes()[0][2]).normalize();
    const V1: three.Vector3 = new three.Vector3(curve.getAxes()[1][0],
                                                curve.getAxes()[1][1],
                                                curve.getAxes()[1][2]).normalize();
    const center: three.Vector3 = new three.Vector3(curve.getOrigin().getPosition()[0],
                                                   curve.getOrigin().getPosition()[1],
                                                   curve.getOrigin().getPosition()[2]);
    const p: number = new three.Vector3(curve.getAxes()[0][0],
                                        curve.getAxes()[0][1],
                                        curve.getAxes()[0][2]).length();

    const r: number = p / (1 + Math.cos(alpha *Math.PI/180 - (Math.PI/2)));
    const point: three.Vector3 = new three.Vector3(
        center.x + r*Math.cos(alpha *Math.PI/180)*U1.x + r*Math.sin(alpha *Math.PI/180)*V1.x,
        center.y + r*Math.cos(alpha *Math.PI/180)*U1.y + r*Math.sin(alpha *Math.PI/180)*V1.y,
        center.z + r*Math.cos(alpha *Math.PI/180)*U1.z + r*Math.sin(alpha *Math.PI/180)*V1.z,
        );
    return [point.x,point.y,point.z];
}

export function parabola_renderXYZ(curve: IParabola, resolution): XYZ[] {
    const N: number = Math.floor(1/resolution);
    const render_XYZ: XYZ[] = [];
    let t: number = 0;
    const dk: number = 1/N;
    for (let k: number = 0; k<N; k++) {
        render_XYZ.push(parabola_evaluate(curve, t));
        t = t + dk;
    }
    return render_XYZ;
}

export function parabola_polyline_renderXYZ(curve: IParabola) {
    const resolution: number = 0.01;
    const points: IPoint[] = curve.getGeom().addPoints(parabola_renderXYZ(curve, resolution));
    const pline: IPolyline = curve.getGeom().addPolyline(points, false);
    return pline;
}

