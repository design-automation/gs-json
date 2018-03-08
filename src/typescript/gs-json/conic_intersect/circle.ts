import {IEllipse, ICircle, IGeom, IPoint, IModel, XYZ} from "../ifaces_gs";
import {ellipse_ellipse} from "./ellipse";
import * as three from "three";

export function circle_circle(circle1: ICircle, circle2: ICircle): IPoint[] {
const v1_c1: three.Vector3 = new three.Vector3(circle1.getAxes()[0][0],
                                            circle1.getAxes()[0][1],
                                            circle1.getAxes()[0][2]);
const v2_c1: three.Vector3 = new three.Vector3(circle1.getAxes()[1][0],
                                            circle1.getAxes()[1][1],
                                            circle1.getAxes()[1][2]);
const r_c1: number = 1;
const ellipse1: IEllipse = circle1.getGeom().addEllipse(circle1.getOrigin(),
    [r_c1*v1_c1.x,r_c1*v1_c1.y,r_c1*v1_c1.z],
    [r_c1*v2_c1.x,r_c1*v2_c1.y,r_c1*v2_c1.z],
    circle1.getAngles());
const v1_c2: three.Vector3 = new three.Vector3(circle2.getAxes()[0][0],
                                            circle2.getAxes()[0][1],
                                            circle2.getAxes()[0][2]);
const v2_c2: three.Vector3 = new three.Vector3(circle2.getAxes()[1][0],
                                            circle2.getAxes()[1][1],
                                            circle2.getAxes()[1][2]);
const r_c2: number = 1;
const ellipse2: IEllipse = circle2.getGeom().addEllipse(circle2.getOrigin(),
    [r_c2*v1_c2.x,r_c2*v1_c2.y,r_c2*v1_c2.z],
    [r_c2*v2_c2.x,r_c2*v2_c2.y,r_c2*v2_c2.z],
    circle2.getAngles());
const results: IPoint[] = ellipse_ellipse(ellipse1, ellipse2);
circle1.getGeom().delObj(ellipse1, false);
circle1.getGeom().delObj(ellipse2, false);
return results;
}