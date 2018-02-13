"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_obj_1 = require("./entity_obj");
const entity_point_1 = require("./entity_point");
const threex = require("./libs/threex/threex");
const math_conics = require("./libs/conics/conics");
const util = require("./_utils");
/**
 * Class ConicCurve.
 */
class Circle extends entity_obj_1.Obj {
    /**
     * Get the object type: "circle".
     * @return ConicCurve object type.
     */
    getObjType() {
        return 3 /* circle */;
    }
    /**
     * Get the origin of the ellipse.
     * @return Plane object type.
     */
    getOrigin() {
        return new entity_point_1.Point(this._kernel, this._kernel.objGetOnePoint(this._id));
    }
    /**
     * Returns the x and y vectors of this curve. The length of the x vector defines the radius of the circle.
     * @return The x and y vectors.
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
     * Returns the Alpha and Beta angles of this curve.
     * @return The Alpha and Beta angles.
     */
    getAngles() {
        return this._kernel.objGetParams(this._id)[4];
    }
    /**
     * Returns the Alpha and Beta angles of this curve.
     * @return The Alpha and Beta angles.
     */
    setAngles(angles) {
        // make sure the angles are ok
        angles = util.checkCircleAngles(angles);
        this._kernel.objGetParams(this._id)[4] = angles;
    }
    /**
     * Returns the radius of this circle (the length of the x vector).
     * @return Tthe radius.
     */
    getRadius() {
        return threex.lengthXYZ(this._kernel.objGetParams(this._id)[1]);
    }
    /**
     * Set the radius of this circle (the length of the x vector).
     * @return The old radius.
     */
    setRadius(radius) {
        const x_vec = this._kernel.objGetParams(this._id)[3];
        const old_radius = threex.lengthXYZ(x_vec);
        this._kernel.objGetParams(this._id)[3] = threex.setLengthXYZ(x_vec, radius);
        return old_radius;
    }
    /**
     * Checks if the circle is closed.
     * @return True if the polyline is closed.
     */
    isClosed() {
        const angles = this._kernel.objGetParams(this._id)[4];
        if (angles === undefined) {
            return true;
        }
        if ((angles[1] - angles[0]) === 360) {
            return true;
        }
        return false;
    }
    /**
     * Get the length of the circle or arc.
     * @return The length.
     */
    length() {
        return math_conics.circleLength(this);
    }
    /**
     * Get the length of the circle or arc.
     * @return The length.
     */
    evalParam(t) {
        const xyz = math_conics.circleEvaluate(this, t);
        return this._kernel.getGeom().addPoint(xyz);
    }
    /**
     * Get a set of equidistant points along the circle or arc.
     * @return An array of points.
     */
    equiPoints(num_points) {
        const length = math_conics.circleLength(this);
        const xyzs = [];
        for (let i = 0; i < num_points; i++) {
            xyzs.push(math_conics.circleEvaluate(this, i / (num_points - 1)));
        }
        return this._kernel.getGeom().addPoints(xyzs);
    }
}
exports.Circle = Circle;
//# sourceMappingURL=entity_obj_circle.js.map