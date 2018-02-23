
import {IRayTwo, IPolyline, IGeom, IPoint, IModel, XYZ} from "../ifaces_gs";
import * as three from "three";
import * as util from "../_utils";

export function rayTwo_polyline(ray2: IRayTwo): IPolyline {
    const points: IPoint[] = [];
    const vect_ray2: three.Vector3 = new three.Vector3(
        ray2.getVector()[0],
        ray2.getVector()[1],
        ray2.getVector()[2]).normalize();
    for (let k=0; k<50; k++) {
        points.push(ray2.getGeom().addPoint(
            [
            ray2.getOrigin().getPosition()[0] + (-50 + k) * vect_ray2.x,
            ray2.getOrigin().getPosition()[1] + (-50 + k) * vect_ray2.y,
            ray2.getOrigin().getPosition()[2] + (-50 + k) * vect_ray2.z]));
    };
    for (let k=0; k<50; k++) {
        points.push(ray2.getGeom().addPoint(
            [
            ray2.getOrigin().getPosition()[0] + (k) * vect_ray2.x,
            ray2.getOrigin().getPosition()[1] + (k) * vect_ray2.y,
            ray2.getOrigin().getPosition()[2] + (k) * vect_ray2.z]));
    };
    const polyline: IPolyline = ray2.getGeom().addPolyline(points, false);
    return polyline;
}
