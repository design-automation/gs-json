import { XYZ, IRay, IPoint } from "./ifaces_gs";
import { EObjType } from "./enums";
import { Obj } from "./entity_obj";
/**
 * Class Ray.
 * A ray is displayed as one wire and no faces.
 * The wire has two vertices.
 * A ray may be part of a group and may have attributes.
 */
export declare class Ray extends Obj implements IRay {
    /**
     * Get the object type: "ray".
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
