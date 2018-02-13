import {IEllipse, IPolyline, IGeom, IPoint, IModel} from "../ifaces_gs";
import * as three from "three";

/*
*
* Function which creates a set of 50 points and polyline to the geometry from a 3D Ellipse
*
*/
export function ellipse_polyline(ellipse: IEllipse): IPolyline {
    // To test
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
    if(a<b) {throw new Error("Enter a>=b");}
    const e: number = Math.sqrt(1 - (b/a)*(b/a));
    const c: number = Math.sqrt(a*a - b*b);
    const param: number = b*b/a;
    const angle0: number = ((ellipse.getAngles()[0] %360) + 360) %360;
    const angle1: number = ((ellipse.getAngles()[1] %360) + 360) %360;
    const U1: three.Vector3 = new three.Vector3(ellipse.getAxes()[0][0],
                                                ellipse.getAxes()[0][1],
                                                ellipse.getAxes()[0][2]).normalize();
    const V1: three.Vector3 = new three.Vector3(ellipse.getAxes()[1][0],
                                                ellipse.getAxes()[1][1],
                                                ellipse.getAxes()[1][2]).normalize();
    const focal: three.Vector3 = new three.Vector3(ellipse.getOrigin().getPosition()[0] + c * U1.x,
                                                   ellipse.getOrigin().getPosition()[1] + c * U1.y,
                                                   ellipse.getOrigin().getPosition()[2] + c * U1.z);
    let theta: number = angle0 * (2*Math.PI)/360;
    let r: number;
    const N: number = 50;
    const d_theta: number = (((((angle1 - angle0) %360) + 360) %360) / (N-1)) * (2*Math.PI)/360;
    for(let k: number = 0;k<N;k++) {
        r = param / (1 + e*Math.cos(theta));
        const point: three.Vector3 = new three.Vector3(
            focal.x + r*Math.cos(theta)*U1.x + r*Math.sin(theta)*V1.x,
            focal.y + r*Math.cos(theta)*U1.y + r*Math.sin(theta)*V1.y,
            focal.z + r*Math.cos(theta)*U1.z + r*Math.sin(theta)*V1.z,
            );
        points.push(geometry.addPoint([point.x,point.y,point.z]));
        theta = theta + d_theta;
    }
    return geometry.addPolyline(points,false);
    }
