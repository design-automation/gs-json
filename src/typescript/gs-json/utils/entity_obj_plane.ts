import {XYZ, IPlane, IPoint} from "./ifaces_gs";
import {EObjType} from "./enums";
import {Obj} from "./entity_obj";
import {Point} from "./entity_point";
import * as threex from "./three_utils";

/**
 * Class Plane.
 * A plane is displayed as two wires showing x and y axes. TODO
 * The wire has two vertices, the square face has four vertices.
 * A ray may be part of a group and may have attributes.
 */
export class Plane extends Obj implements IPlane {

    /**
     * Get the object type: "plane".
     * @return Plane object type.
     */
    public getObjType(): EObjType {
        return EObjType.plane;
    }

    /**
     * Get the origin of the plane.
     * @return Plane object type.
     */
    public getOrigin(): IPoint {
        return new Point(this._kernel, this._kernel.objGetOnePoint(this._id));
    }

    /**
     * Get the x and y vectors  of the plane.
     * @return Plane object type.
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
     * Get the 4 cartesian coefficient of a plan, especially usefull for distance calculations.
     * In 3 dimensions, a cartesian equation of a 2D plan is: a.x + b.y + c.z + d = 0 ;
     * @return Returns an array that contains the x, y, z coordinates of a point which belongs to
     * the plan as well as a normal vector
     * @return Array of real numbers: [a,b,c,d] (where a,b,c is a triplet set such as (a,b,c) !=== (0,0,0))
     */
    public getCartesians(): number[] {
        const origin_id: number = this._kernel.objGetOnePoint(this._id);
        const origin_xyz: XYZ = this._kernel.pointGetPosition(origin_id);
        const z_vec: XYZ = this._kernel.objGetParams(this._id)[3];
        const d: number = -(origin_xyz[0] * z_vec[0] + origin_xyz[1] * z_vec[1] + origin_xyz[2] * z_vec[2]);
        return [z_vec[0], z_vec[1], z_vec[2], d];
    }
}
