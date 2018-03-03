import {XYZ, ICircle, IPoint} from "./ifaces_gs";
import {EObjType} from "./enums";
import {Obj} from "./entity_obj";
import {Point} from "./entity_point";
import * as threex from "./libs/threex/threex";
import * as math_conics from "./libs/conics/circles";
import * as three from "three";
import * as util from "./_utils";

/**
 * Class Circle.
 */
export class Circle extends Obj implements ICircle {

    /**
     * Get the object type: "circle".
     * @return Circle object.
     */
    public getObjType(): EObjType {
        return EObjType.circle;
    }

    /**
     * Get the origin of the ellipse.
     * @return Point object.
     */
    public getOrigin(): IPoint {
        return new Point(this._kernel, this._kernel.objGetOnePoint(this._id));
    }

    /**
     * Returns the x and y vectors of this curve. The length of the x vector defines the radius of the circle.
     * @return An array of three XYZ vectors.
     */
    public getAxes(): [XYZ,XYZ,XYZ] {
        const params: any[] = this._kernel.objGetParams(this._id);
        return [params[1],params[2],params[3]];
    }

    /**
     * Returns the x and y vectors of this curve. The length of the x vector defines the radius of the circle.
     * @return XYZ vector
     */
    public getNormal(): XYZ {
        return this._kernel.objGetParams(this._id)[3];
    }

    /**
     * Sets the x and y vectors of this curve. The length of the x vector defines the radius of the circle.
     * @param x_vec XYZ vector, the x axis
     * @param vec XYZ vector, in the plane
     */
    public setOrientation(x_vec: XYZ, vec: XYZ): void {
        // param are [type, x_vec, y_vec, z_vec, angles]
        const vecs: XYZ[] = threex.makeXYZOrthogonal(x_vec, vec, false);
        const params: any[] = this._kernel.objGetParams(this._id);
        params[1] = vecs[0];
        params[2] = vecs[1];
        params[3] = vecs[2];
    }

    /**
     * Returns the Alpha and Beta angles of this curve.
     * @return The Alpha and Beta angles.
     */
    public getAngles(): [number, number] {
        return this._kernel.objGetParams(this._id)[4];
    }

    /**
     * Returns the Alpha and Beta angles of this curve.
     * @return The Alpha and Beta angles.
     */
    public setAngles(angles: [number, number]): void {
        // make sure the angles are ok
        angles = util.checkCircleAngles(angles);
        this._kernel.objGetParams(this._id)[4] = angles;
    }

    /**
     * Returns the radius of this circle (the length of the x vector).
     * @return Tthe radius.
     */
    public getRadius(): number  {
        return threex.lengthXYZ(this._kernel.objGetParams(this._id)[1]);
    }

    /**
     * Set the radius of this circle (the length of the x vector).
     * @return The old radius.
     */
    public setRadius(radius: number): number  {
        const x_vec: XYZ = this._kernel.objGetParams(this._id)[3];
        const old_radius: number = threex.lengthXYZ(x_vec);
        this._kernel.objGetParams(this._id)[3] = threex.setLengthXYZ(x_vec, radius);
        return old_radius;
    }

    /**
     * Checks if the circle is closed.
     * @return True if the polyline is closed.
     */
    public isClosed(): boolean {
        const angles: [number, number] = this._kernel.objGetParams(this._id)[4];
        if (angles === null) {return true;}
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
     * Get the t parameter on the circle or arc.
     * @return A point entity.
     */
    public evalParam(t: number): IPoint {
        const xyz: XYZ = math_conics.circleEvaluate(this, t);
        return this._kernel.getGeom().addPoint(xyz);
    }

    /**
     * Project a point onto the circle or arc, and return the t parameter.
     * @return t parameter value.
     */
    public evalPoint(point: IPoint): number {
        return math_conics.circleEvaluatePoint(this, point);
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
