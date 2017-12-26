import {IConicCurve} from "./ifaces_gs";
import {EObjType} from "./enums";
import {Obj} from "./entity_obj";
//import {Vector3} from "three";

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
     * Returns the origin of this curve.
     * @return Return the origin.
     */
    public getOrigin(): number[] {
        return this._kernel.objGetParams(this._id)[1];
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
     * Returns the x and y radii of this curve.
     * @return Return the x and y radii.
     */
    public getRadii(): number[] {
        //return this._kernel.objGetParams(this._id).slice(2,4).map((v) => new Vector3(...v).length);
        throw new Error("Method not implemented.");
    }

    /**
     * Checks if the conic curve is closed.
     * @return Return true if the polyline is closed.
     */
    public isClosed(): boolean {
        return (this._kernel.objGetParams(this._id)[4] === undefined);//TODO what about parabola, hyperbola
    }

    /**
     * Returns the length of this curve.
     * @return Return the x and y radii.
     */
    public length(): number {
        throw new Error("Method not implemented."); //TODO
    }

    /**
     * Returns a set of xyz values for rendering this object.
     * @return Return a list of lists of xyz values.
     */
    public render(resolution: number): number[][][] {
        throw new Error("Method not implemented."); //TODO
    }

}
