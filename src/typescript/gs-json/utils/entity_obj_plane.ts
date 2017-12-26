import {IPlane} from "./ifaces_gs";
import {EObjType} from "./enums";
import {Obj} from "./entity_obj";

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

    public getOrigin(): number[] {
        return this._kernel.objGetParams(this._id)[1];
    }

    public getVectors(): number[][] {
        return this._kernel.objGetParams(this._id).slice(2,4);
    }

    /**
     * Get the 4 cartesian coefficient of a plan, especially usefull for distance calculations.
     * In 3 dimensions, a cartesian equation of a 2D plan is: a.x + b.y + c.z + d = 0 ;
     * @return Returns an array that contains the x, y, z coordinates of a point which belongs to
     * the plan as well as a normal vector
     * @return Array of real numbers: [a,b,c,d] (where a,b,c is a triplet set such as (a,b,c) !=== (0,0,0))
     */
    public getCartesians(): number[] {
        const origin: number[] = this._kernel.objGetParams(this._id)[1];
        const z_vec: number[] = this._kernel.objGetParams(this._id)[4];
        const d: number = -(origin[0] * z_vec[0] + origin[1] * z_vec[1] + origin[2] * z_vec[2]);
        return [z_vec[0], z_vec[1], z_vec[2], d];
    }

    /**
     * Returns a set of xyz values for rendering this object.
     * @return Return a list of lists of xyz values.
     */
    public render(scale: number): number[][][] {
        throw new Error("Method not implemented."); //TODO
    }
}
