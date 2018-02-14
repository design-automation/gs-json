import {IEllipse, IPolyline, IGeom, IPoint, IModel} from "../ifaces_gs";
import * as three from "three";

/*
*
* Function which creates a set of 50 points and polyline to the geometry from a 3D Ellipse
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
    const N: number = 200;
    const d_theta: number = (angle1-angle0)/(N-1)*(2*Math.PI)/360;
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
