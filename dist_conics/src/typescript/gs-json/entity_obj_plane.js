"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_obj_1 = require("./entity_obj");
const entity_point_1 = require("./entity_point");
const threex = require("./libs/threex/threex");
/**
 * Class Plane.
 * A plane is displayed as two wires showing x and y axes. TODO
 * The wire has two vertices, the square face has four vertices.
 * A ray may be part of a group and may have attributes.
 */
class Plane extends entity_obj_1.Obj {
    /**
     * Get the object type: "plane".
     * @return Plane object type.
     */
    getObjType() {
        return 2 /* plane */;
    }
    /**
     * Get the origin of the plane.
     * @return Plane object type.
     */
    getOrigin() {
        return new entity_point_1.Point(this._kernel, this._kernel.objGetOnePoint(this._id));
    }
    /**
     * Get the x and y vectors  of the plane.
     * @return Plane object type.
     */
    getAxes() {
        const params = this._kernel.objGetParams(this._id);
        return [params[1], params[2], params[3]];
    }
    /**
     * Returns the x and y vectors of this curve. The length of the x vector defines the radius of the circle.
     * @return The x and y vectors.
     */
    getNormal() {
        return this._kernel.objGetParams(this._id)[3];
    }
    /**
     * Sets the x and y vectors of this curve. The length of the x vector defines the radius of the circle.
     * @param x_vec Vector, the x axis
     * @param vec vector, in the plane
     */
    setOrientation(x_vec, vec) {
        // param are [type, x_vec, y_vec, z_vec, angles]
        const vecs = threex.makeXYZOrthogonal(x_vec, vec, false);
        const params = this._kernel.objGetParams(this._id);
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
    getCartesians() {
        const origin_id = this._kernel.objGetOnePoint(this._id);
        const origin_xyz = this._kernel.pointGetPosition(origin_id);
        const z_vec = this._kernel.objGetParams(this._id)[3];
        const d = -(origin_xyz[0] * z_vec[0] + origin_xyz[1] * z_vec[1] + origin_xyz[2] * z_vec[2]);
        return [z_vec[0], z_vec[1], z_vec[2], d];
    }
}
exports.Plane = Plane;
//# sourceMappingURL=entity_obj_plane.js.map