import { XYZ, IRayTwo, IPoint } from "./ifaces_gs";
import { EObjType } from "./enums";
import { Obj } from "./entity_obj";
/**
 * Class Ray2, a Ray2 is Ray which goes in both directions.
 */
export declare class RayTwo extends Obj implements IRayTwo {
    /**
     * Get the object type: "line".
     * @return Ray object type.
     */
    getObjType(): EObjType;
    /**
     * Get the origin of the ray.
     * @return Plane object type.
     */
    getOrigin(): IPoint;
    /**
     * Gets the direction vector for this ray.
     * @return Return the xyz.
     */
    getVector(): XYZ;
}
