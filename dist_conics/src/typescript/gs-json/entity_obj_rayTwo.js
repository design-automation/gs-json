"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_obj_1 = require("./entity_obj");
const entity_point_1 = require("./entity_point");
/**
 * Class Ray2, a Ray2 is Ray which goes in both directions.
 */
class RayTwo extends entity_obj_1.Obj {
    /**
     * Get the object type: "line".
     * @return Ray object type.
     */
    getObjType() {
        return 11 /* rayTwo */;
    }
    /**
     * Get the origin of the ray.
     * @return Plane object type.
     */
    getOrigin() {
        return new entity_point_1.Point(this._kernel, this._kernel.objGetOnePoint(this._id));
    }
    /**
     * Gets the direction vector for this ray.
     * @return Return the xyz.
     */
    getVector() {
        return this._kernel.objGetParams(this._id)[1];
    }
}
exports.RayTwo = RayTwo;
//# sourceMappingURL=entity_obj_rayTwo.js.map