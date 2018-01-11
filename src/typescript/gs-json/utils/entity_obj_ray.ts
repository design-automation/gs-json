import {XYZ, IRay, IPoint} from "./ifaces_gs";
import {EObjType} from "./enums";
import {Obj} from "./entity_obj";
import {Point} from "./entity_point";
/**
 * Class Ray.
 * A ray is displayed as one wire and no faces.
 * The wire has two vertices.
 * A ray may be part of a group and may have attributes.
 */
export class Ray extends Obj implements IRay {
    /**
     * Get the object type: "ray".
     * @return Ray object type.
     */
    public getObjType(): EObjType {
        return EObjType.ray;
    }

    /**
     * Get the origin of the ray.
     * @return Plane object type.
     */
    public getOrigin(): IPoint {
        return new Point(this._kernel, this._kernel.objGetOnePoint(this._id));
    }

    /**
     * Gets the direction vector for this ray.
     * @return Return the xyz.
     */
    public getVector(): XYZ {
        return this._kernel.objGetParams(this._id)[1];
    }
}
