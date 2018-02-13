import { XYZ, IPlane, IPoint } from "./ifaces_gs";
import { EObjType } from "./enums";
import { Obj } from "./entity_obj";
/**
 * Class Plane.
 * A plane is displayed as two wires showing x and y axes. TODO
 * The wire has two vertices, the square face has four vertices.
 * A ray may be part of a group and may have attributes.
 */
export declare class Plane extends Obj implements IPlane {
    /**
     * Get the object type: "plane".
     * @return Plane object type.
     */
    getObjType(): EObjType;
    /**
     * Get the origin of the plane.
     * @return Plane object type.
     */
    getOrigin(): IPoint;
    /**
     * Get the x and y vectors  of the plane.
     * @return Plane object type.
     */
    getAxes(): [XYZ, XYZ, XYZ];
    /**
     * Returns the x and y vectors of this curve. The length of the x vector defines the radius of the circle.
     * @return The x and y vectors.
     */
    getNormal(): XYZ;
    /**
     * Sets the x and y vectors of this curve. The length of the x vector defines the radius of the circle.
     * @param x_vec Vector, the x axis
     * @param vec vector, in the plane
     */
    setOrientation(x_vec: XYZ, vec: XYZ): void;
    /**
     * Get the 4 cartesian coefficient of a plan, especially usefull for distance calculations.
     * In 3 dimensions, a cartesian equation of a 2D plan is: a.x + b.y + c.z + d = 0 ;
     * @return Returns an array that contains the x, y, z coordinates of a point which belongs to
     * the plan as well as a normal vector
     * @return Array of real numbers: [a,b,c,d] (where a,b,c is a triplet set such as (a,b,c) !=== (0,0,0))
     */
    getCartesians(): number[];
}
