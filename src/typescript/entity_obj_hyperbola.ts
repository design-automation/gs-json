import * as three from "three";
import {XYZ, IHyperbola, IPoint} from "./ifaces_gs";
import {EObjType} from "./enums";
import {Obj} from "./entity_obj";
import {Point} from "./entity_point";
import * as threex from "./libs/threex/threex";
import * as math_conics from "./libs/conics/conics";

/**
 * Class ConicCurve.
 */
export class Hyperbola extends Obj implements IHyperbola {
    /**
     * Get the object type: "hyperbola".
     * @return ConicCurve object type.
     */
    public getObjType(): EObjType {
        return EObjType.hyperbola;
    }
    /**
     * Get the origin of the hyperbola.
     * @return Plane object type.
     */
    public getOrigin(): IPoint {
        return new Point(this._kernel, this._kernel.objGetOnePoint(this._id));
    }
    /**
     * Returns the x and y vectors of this curve. The length of the x vector
     * defines the a,b parameters of the hyperbola.
     * @return The x and y vectors.
     */
    public getVectors(): XYZ[] {
        return [this._kernel.objGetParams(this._id)[1],this._kernel.objGetParams(this._id)[2]];
    }
    /**
     * Sets the x and y vectors of this curve. The length of the x,y vectors
     * defines the a,b parameters of the hyperbola.
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
        return this._kernel.objGetParams(this._id)[4];
    }

    /**
     * Returns the Alpha and Beta angles of this curve.
     * @return The Alpha and Beta angles.
     */
    public setAngles(angles: [number, number]): void {
        this._kernel.objGetParams(this._id)[4] = angles;
    }

    /**
     * Returns the radii of this curve (the lengths of the x,y vectors).
     * @return The radii.
     */
    public getRadii(): [number, number]  {
        return [threex.lengthXYZ(this._kernel.objGetParams(this._id)[1]),
                threex.lengthXYZ(this._kernel.objGetParams(this._id)[2])];
    }
    /**
     * Get the length of the circle or arc.
     * @return The length.
     */
    public length(): number {
        throw new Error("method not implemented");
        // return math_conics.hyperbolaLength(this);
    }

    /**
     * Get a point located at t% of the hyperbola length.
     * @return A Point.
     */
    public evalParam(t: number): IPoint {
        throw new Error("method not implemented");
        // const xyz: XYZ = math_conics.hyperbolaEvaluate(this, t);
        // return this._kernel.getGeom().addPoint(xyz);
    }

    /**
     * Get a set of equidistant points along the arc of hyperbola.
     * @return An array of points.
     */
    public equiPoints(num_points: number): IPoint[] {
        throw new Error("method not implemented");
        // const length: number = math_conics.hyperbolaLength(this);
        // const xyzs: XYZ[] = [];
        // for (let i = 0; i < num_points; i++) {
        //     xyzs.push(math_conics.hyperbolaEvaluate(this, i/(num_points - 1)));
        // }
        // return this._kernel.getGeom().addPoints(xyzs);
    }
}
