import {XYZ, ICircle, IPoint} from "./ifaces_gs";
import {EObjType} from "./enums";
import {Obj} from "./entity_obj";
import {Point} from "./entity_point";
import * as threex from "./three_utils";
import * as math_conics from "./math_conics";

/**
 * Class ConicCurve.
 */
export class Circle extends Obj implements ICircle {

    /**
     * Get the object type: "circle".
     * @return ConicCurve object type.
     */
    public getObjType(): EObjType {
        return EObjType.circle;
    }

    /**
     * Get the origin of the ellipse.
     * @return Plane object type.
     */
    public getOrigin(): IPoint {
        return new Point(this._kernel, this._kernel.objGetOnePoint(this._id));
    }

    /**
     * Returns the x and y vectors of this curve. The length of the x vector defines the radius of the circle.
     * @return The x and y vectors.
     */
    public getVectors(): XYZ[] {
        // param are [type, x_vec, y_vec, z_vec, angles]
        // return this._kernel.objGetParams(this._id).slice(2,4);
        // Slight modification in getVectors(), used [] instead of .slice();
        return [this._kernel.objGetParams(this._id)[1],this._kernel.objGetParams(this._id)[2]];
    }

    /**
     * Sets the x and y vectors of this curve. The length of the x vector defines the radius of the circle.
     * @return The x and y vectors.
     */
    public setVectors(x_vec: XYZ, y_vec: XYZ): void {
        // param are [type, x_vec, y_vec, z_vec, angles]
        this._kernel.objGetParams(this._id)[1] = x_vec;
        this._kernel.objGetParams(this._id)[2] = y_vec;
        this._kernel.objGetParams(this._id)[3] = threex.crossXYZs(x_vec, y_vec, true);
    }

    /**
     * Returns the Alpha and Beta angles of this curve.
     * @return The Alpha and Beta angles.
     */
    public getAngles(): [number, number] {
        // param are [type, x_vec, y_vec, z_vec, angles]
        return this._kernel.objGetParams(this._id)[4];
    }

    /**
     * Returns the Alpha and Beta angles of this curve.
     * @return The Alpha and Beta angles.
     */
    public setAngles(angles: [number, number]): void {
        // param are [type, x_vec, y_vec, z_vec, angles]
        this._kernel.objGetParams(this._id)[4] = angles;
    }

    /**
     * Returns the radius of this curve (the length of the x vector).
     * @return Tthe radius.
     */
    public getRadius(): number  {
        return threex.lengthXYZ(this._kernel.objGetParams(this._id)[1]);
    }

    /**
     * Checks if the circle is closed.
     * @return True if the polyline is closed.
     */
    public isClosed(): boolean {
        const angles: [number, number] = this._kernel.objGetParams(this._id)[4];
        if (angles === undefined) {return true;}
        if ((angles[1] - angles[0]) === 360) {return true;}
        return false;
    }

    /**
     * Get the length of the circle or arc.
     * @return The length.
     */
    public length(): number {
        return math_conics.circleLength(this);
    }

    /**
     * Get the length of the circle or arc.
     * @return The length.
     */
    public evalParam(t: number): IPoint {
        const xyz: XYZ = math_conics.circleEvaluate(this, t);
        return this._kernel.getGeom().addPoint(xyz);
    }

    /**
     * Get a set of equidistant points along the circle or arc.
     * @return An array of points.
     */
    public equiPoints(num_points: number): IPoint[] {
        const length: number = math_conics.circleLength(this);
        const xyzs: XYZ[] = [];
        for (let i = 0; i < num_points; i++) {
            xyzs.push(math_conics.circleEvaluate(this, i/(num_points - 1)));
        }
        return this._kernel.getGeom().addPoints(xyzs);
    }

}
