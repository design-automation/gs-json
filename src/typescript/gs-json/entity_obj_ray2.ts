import {XYZ, IRayTwo, IPoint} from "./ifaces_gs";
import {EObjType} from "./enums";
import {Obj} from "./entity_obj";
import {Point} from "./entity_point";
import * as threex from "./libs/threex/threex";
import * as math_conics from "./libs/conics/conics";
import * as three from "three";
import * as util from "./_utils";

/**
 * Class Ray2, a Ray2 is Ray which goes in both directions.
 */
export class RayTwo extends Obj implements IRayTwo {
    /**
     * Get the object type: "line".
     * @return Ray object type.
     */
    public getObjType(): EObjType {
        return EObjType.rayTwo;
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
