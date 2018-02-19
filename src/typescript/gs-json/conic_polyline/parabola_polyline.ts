import {IParabola, IPolyline, IPoint, IModel, IGeom} from "../ifaces_gs";
import * as three from "three";

/*
*
* Function which creates a set of 50 points and polyline to the geometry from a 3D Parabola
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
    let theta: number = angle0 * (2*Math.PI)/360;
    let r: number;
    const N: number = 50;
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
