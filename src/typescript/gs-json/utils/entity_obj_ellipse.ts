import {XYZ, IEllipse, IPoint} from "./ifaces_gs";
import {EObjType} from "./enums";
import {Obj} from "./entity_obj";
import {Point} from "./entity_point";
import * as threex from "./three_utils";
import * as three from "three";
/**
 * Class ConicCurve.
 */
export class Ellipse extends Obj implements IEllipse {
    /**
     * Get the object type: "ellipse".
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
     * Returns the x and y vectors of this curve. The length of these vectors define the x and y
     * radii for the ellipse.
     * @return The x and y vectors.
     */
    public getVectors(): XYZ[] {
        // param are [type, x_vec, y_vec, z_vec, angles]
        return this._kernel.objGetParams(this._id).slice(2,4);
    }

    /**
     * Sets the x and y vectors of this curve. The length of these vectors define the x and y
     * radii for the ellipse.
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

    /**
     * @return Returns a Vector of length x, along the first unitary vector of the ellipse
     */
    public get_U1(): XYZ {
        // return new three.Vector3(this._kernel.objGetParams(this._id)[1][0],
        //     this._kernel.objGetParams(this._id)[1][1],
        //     this._kernel.objGetParams(this._id)[1][2]);
        return [this._kernel.objGetParams(this._id)[1][0],
            this._kernel.objGetParams(this._id)[1][1],
            this._kernel.objGetParams(this._id)[1][2]];
    }

    /**
     * @return Returns a Vector of length x, along the first unitary vector of the ellipse
     */
    public get_V1(): XYZ {
        // return new three.Vector3(this._kernel.objGetParams(this._id)[2][0],
        //     this._kernel.objGetParams(this._id)[2][1],
        //     this._kernel.objGetParams(this._id)[2][2]);
        return [this._kernel.objGetParams(this._id)[2][0],
            this._kernel.objGetParams(this._id)[2][1],
            this._kernel.objGetParams(this._id)[2][2]]
            ;}
}
