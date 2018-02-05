import {XYZ, ILine, IPoint} from "./ifaces_gs";
import {EObjType} from "./enums";
import {Obj} from "./entity_obj";
import {Point} from "./entity_point";
import * as threex from "./libs/threex/threex";
import * as math_conics from "./libs/conics/conics";
import * as three from "three";
import * as util from "./_utils";

/**
 * Class Line, a Line is supposed to be infinite in the both directions.
 */
export class Line extends Obj implements ILine {
    /**
     * Get the object type: "line".
     * @return Ray object type.
     */
    public getObjType(): EObjType {
        return EObjType.line;
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
