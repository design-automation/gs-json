import * as three from "three";
import {XYZ, IEllipse, IPoint} from "./ifaces_gs";
import {EObjType} from "./enums";
import {Obj} from "./entity_obj";
import {Point} from "./entity_point";
import * as threex from "./libs/threex/threex";
import * as math_conics from "./libs/conics/conics";
import * as util from "./_utils";

/**
 * Class ConicCurve.
 */
export class Ellipse extends Obj implements IEllipse {

    /**
     * Get the object type: "circle".
     * @return ConicCurve object type.
     */
    public getObjType(): EObjType {
        return EObjType.ellipse;
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
    public getAxes(): [XYZ,XYZ,XYZ] {
        const params: any[] = this._kernel.objGetParams(this._id);
        return [params[1],params[2],params[3]];
    }

    /**
     * Returns the x and y vectors of this curve. The length of the x vector defines the radius of the circle.
     * @return The x and y vectors.
     */
    public getNormal(): XYZ {
        return this._kernel.objGetParams(this._id)[3];
    }

    /**
     * Sets the x and y vectors of this curve. The length of the x vector defines the radius of the circle.
     * @param x_vec Vector, the x axis
     * @param vec vector, in the plane
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
     * Returns the x and y radii of this curve.
     * @return The x and y radii.
     */
    public getRadii(): [number, number] {
        return [
            threex.lengthXYZ(this._kernel.objGetParams(this._id)[1]),
            threex.lengthXYZ(this._kernel.objGetParams(this._id)[2]),
        ];
    }

    /**
     * Checks if the ellipse is closed.
     * @return True if the polyline is closed.
     */
    public isClosed(): boolean {
        return (this._kernel.objGetParams(this._id)[4] === undefined);
    }
}
