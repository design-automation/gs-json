import {IHyperbola, IPolyline, IModel, IGeom, IPoint} from "../ifaces_gs";
import * as three from "three";

/*
*
* Function which creates a set of 50 points and polyline to the geometry from a 3D Hyperbola
*
*/
export function hyperbola_polyline(hyperbola: IHyperbola): IPolyline {
    const points: IPoint[] = [];
    const polyline: IPolyline[] =[];
    const model: IModel = hyperbola.getModel();
    const geometry: IGeom = model.getGeom();
    const a: number = new three.Vector3(hyperbola.getAxes()[1][0],
                                        hyperbola.getAxes()[1][1],
                                        hyperbola.getAxes()[1][2]).length();
    const b: number = new three.Vector3(hyperbola.getAxes()[0][0],
                                        hyperbola.getAxes()[0][1],
                                        hyperbola.getAxes()[0][2]).length();
    const e: number = Math.sqrt(1 + (b/a)*(b/a));
    const c: number = Math.sqrt(a*a - b*b);
    const param: number = (b*b)/Math.sqrt(a*a + b*b);
    const angle0: number = ((hyperbola.getAngles()[0] %360) + 360) %360;
    let angle1: number = (((hyperbola.getAngles()[1] %360) + 360) %360);
    if(angle1<angle0) {angle1 = angle1 + 360;}
    const U1: three.Vector3 = new three.Vector3(hyperbola.getAxes()[0][0],
                                                hyperbola.getAxes()[0][1],
                                                hyperbola.getAxes()[0][2]).normalize();
    const V1: three.Vector3 = new three.Vector3(hyperbola.getAxes()[1][0],
                                                hyperbola.getAxes()[1][1],
                                                hyperbola.getAxes()[1][2]).normalize();
    const center: three.Vector3 = new three.Vector3(hyperbola.getOrigin().getPosition()[0],
                                                   hyperbola.getOrigin().getPosition()[1],
                                                   hyperbola.getOrigin().getPosition()[2]);
    let theta: number = angle0 * (2*Math.PI)/360;
    let r: number;
    const N: number = 50;
    const d_theta: number = (((((angle1 - angle0) %360) + 360) %360) / (N-1)) * (2*Math.PI)/360;
    for(let k: number = 0;k<N;k++) {
        r = param / (1 + e*Math.cos(theta - (Math.PI/2)));
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
