import * as three from "three";
import * as gs from "../../gs-json";
import * as threex from "../threex/threex";

/**
 * Calculate a set of xyz position on the circle/arc ir ellipse/arc. The number of points = length / resolution.
 * With resolution from 0.0001 to 0.5, 0.0001 being a higher resolution than 0.5
 */
export function getRenderXYZs(obj: gs.IObj, resolution: number): gs.XYZ[] {
    switch (obj.getObjType()) {
        case gs.EObjType.circle:
            return circleGetRenderXYZs(obj as gs.ICircle, resolution);
        default:
            throw new Error("Invalid object type.");
    }
}

/**
 * Calculate the length of the circle or arc.
 */
export function circleLength(circle: gs.ICircle): number {
    const rad: number = circle.getRadius();
    const angles: number[] = circle.getAngles();
    // calculate the angle of the arc
    let arc_angle: number;
    if (angles === undefined) {
        return 2 * Math.PI * rad;
    } else if (angles[0] < angles[1]) {
        arc_angle = (angles[1]-angles[0]);
    } else {
        arc_angle = (angles[0]-angles[1]);
    }
    return 2 * Math.PI * rad * (arc_angle / 360);
}

/**
 * Calculate the xyz position at parameter t on the circle or arc. The t parameter range is from 0 to 1.
 */
export function circleEvaluate(circle: gs.ICircle, t: number): gs.XYZ {
    const rad: number = circle.getRadius();
    const angles: number[] = circle.getAngles();
    // set arc start and arc end angles, in radians
    let ang_start: number;
    let ang_end: number;
    if (angles === null) {
        ang_start = 0;
        ang_end = Math.PI * 2;
    } else {
        ang_start = angles[0] * (Math.PI / 180);
        ang_end = angles[1] * (Math.PI / 180);
    }
    // calculate the angle of the arc
    let arc_angle: number;
    if (ang_start < ang_end) {
        arc_angle = ang_end - ang_start;
    } else {
        arc_angle = ((Math.PI * 2) - ang_start) + ang_end;
    }
    // create matrix to map from XY plane into the 3D plane for circle
    const matrix_inv: three.Matrix4 =
        threex.matrixInv(threex.xformMatrixFromXYZs(circle.getOrigin().getPosition(), circle.getAxes()));
    // calculate the point
    const alpha: number = ang_start + (t * arc_angle);
    const point: three.Vector3 = new three.Vector3(rad * Math.cos(alpha), rad * Math.sin(alpha), 0);
    point.applyMatrix4(matrix_inv);
    // return the points
    return point.toArray() as gs.XYZ;
}

/**
 * Project a point on a circle, and calculate the parameter t.
 */
export function circleEvaluatePoint(circle: gs.ICircle, point: gs.IPoint): number {
    const angles: number[] = circle.getAngles();
    // create matrix to map from the 3D plane for circle into the XY plane
    const matrix: three.Matrix4 =
        threex.xformMatrixFromXYZs(circle.getOrigin().getPosition(), circle.getAxes());
    // map the point onto the XY plane
    const xyz_2d: gs.XYZ = threex.multXYZMatrix(point.getPosition(), matrix);
    // calculate the angle between the point vector and the x axis, in radians
    let point_angle = Math.atan2(xyz_2d[1], xyz_2d[0]);
    if (point_angle < 0) {point_angle += (2 * Math.PI); }
    // calculate t for a closed circle
    if (angles === null) {
        return point_angle / (2 * Math.PI);
    }
    // convert angles to radians
    const ang_start: number = angles[0] * (Math.PI / 180);
    const ang_end: number = angles[1] * (Math.PI / 180);
    // calculate t for an arc
    if (ang_start < ang_end) {
        // calc arc angle
        const arc_angle: number = ang_end - ang_start;
        // the point is on the arc
        if ((point_angle >= ang_start) && (point_angle <= ang_end)) {
            return (point_angle - ang_start) / arc_angle;
        }
        // the point is not on the arc, so it must be at an end point
        else {
            let rotated: number = point_angle - (ang_start + (arc_angle / 2));
            if (rotated < 0) {rotated = rotated + (Math.PI * 2); }
            if (rotated > Math.PI) {
                return 0;
            } else {
                return 1;
            }
        }
    } else {
        // calc arc angle
        const arc_angle_lower: number = ((Math.PI * 2) - ang_start);
        const arc_angle_upper: number = ang_end;
        const arc_angle: number = arc_angle_lower + arc_angle_upper;
        //  the point is on the outer arc, below the x axis
        if (point_angle >= ang_start) {
            return (point_angle - ang_start) / arc_angle;
        }
        // the point is on the outer arc, above the x axis
        else if (point_angle <= ang_end) {
            return (arc_angle_lower + point_angle) / arc_angle;
        }
        // the point is not on the outside arc, so it must be at an end point
        else {
            const rotated: number = point_angle + ((arc_angle / 2) - ang_end);
            if (rotated > Math.PI) {
                return 0;
            } else {
                return 1;
            }
        }
    }
}


/**
 * Calculate a set of xyz position on the circle or arc. The number of points = length / resolution.
 * With resolution from 0.0001 to 0.5, 0.0001 being a higher resolution than 0.5
 */
export function circleGetRenderXYZs(circle: gs.ICircle, resolution: number): gs.XYZ[] { // TODO remove resolution
    const rad: number = circle.getRadius();
    const angles: number[] = circle.getAngles();
    // calculat the arc start angle
    let arc_start: number;
    if (angles === null) {
        arc_start = 0;
    } else {
        arc_start = angles[0] * (Math.PI / 180);
    }
    // calculate the angle of the arc
    let arc_angle: number;
    if (angles === null) {
        arc_angle = 2 * Math.PI;
    } else if (angles[0] < angles[1]) {
        arc_angle = (angles[1]-angles[0]) * (Math.PI / 180);
    } else {
        arc_angle = (angles[0]-angles[1]) * (Math.PI / 180);
    }
    // calculate number of points
    let N: number = Math.floor(arc_angle / (Math.PI/ 36));
    if (N < 3) {N = 3;}
    // create matrix to map from XY plane into the 3D plane for circle
    const matrix_inv: three.Matrix4 =
        threex.matrixInv(threex.xformMatrixFromXYZs(circle.getOrigin().getPosition(), circle.getAxes()));
    // main loop to create points
    const xyz_points: gs.XYZ[] = [];
    for(let k = 0; k < N; k++) {
        const t: number = k/(N - 1);
        const alpha: number = arc_start + (t * arc_angle);
        const point: three.Vector3 = new three.Vector3(rad * Math.cos(alpha), rad * Math.sin(alpha), 0);
        point.applyMatrix4(matrix_inv);
        xyz_points.push(point.toArray() as gs.XYZ);
    }
    // return the points
    return xyz_points;
}
