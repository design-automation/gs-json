import {IConicCurve, IPoint} from "./ifaces_gs";
import {EObjType} from "./enums";
import {Obj} from "./entity_obj";
import {Point} from "./entity_point";

/**
 * Class ConicCurve.
 */
export class ConicCurve extends Obj implements IConicCurve {
    /**
     * Get the object type: "coniccurve".
     * @return ConicCurve object type.
     */
    public getObjType(): EObjType {
        return EObjType.conic_curve;
    }
    /**
     * Get the origin of the coniccurve.
     * @return Plane object type.
     */
    public getOrigin(): IPoint {
        return new Point(this._kernel, this._kernel.objGetOnePoint(this._id));
    }
    /**
     * Returns the x and y vectors of this curve. Th length of these vectors define the x and y
     * radii for the conic curve.
     * @return Return the x and y vectors.
     */
    public getVectors(): number[][] {
        return this._kernel.objGetParams(this._id).slice(2,4);
    }
    /**
     * Returns the Alpha and Beta angles of this curve.
     * @return Return the Alpha and Beta angles.
     */
    public getAngles(): number[] {
        return this._kernel.objGetParams(this._id).slice(5,2);
    }
    /**
     * Returns the x and y radii of this curve.
     * @return Return the x and y radii.
     */
    public getRadii(): number[] {
        // return this._kernel.objGetParams(this._id).slice(2,4).map((v) => new Vector3(...v).length);
        throw new Error("Method not implemented.");
    }
    /**
     * Checks if the conic curve is closed.
     * @return Return true if the polyline is closed.
     */
    public isClosed(): boolean {
        return (this._kernel.objGetParams(this._id)[4] === undefined);// TODO what about parabola, hyperbola
    }
}
