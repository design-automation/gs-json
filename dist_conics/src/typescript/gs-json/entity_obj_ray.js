"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_obj_1 = require("./entity_obj");
const entity_point_1 = require("./entity_point");
/**
 * Class Ray.
 * A ray is displayed as one wire and no faces.
 * The wire has two vertices.
 * A ray may be part of a group and may have attributes.
 */
class Ray extends entity_obj_1.Obj {
    /**
     * Get the object type: "ray".
     * @return Ray object type.
     */
    getObjType() {
        return 1 /* ray */;
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
exports.Ray = Ray;
//# sourceMappingURL=entity_obj_ray.js.map