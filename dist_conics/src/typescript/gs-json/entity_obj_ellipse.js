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
class Ellipse extends entity_obj_1.Obj {
    /**
     * Get the object type: "circle".
     * @return ConicCurve object type.
     */
    getObjType() {
        return 4 /* ellipse */;
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
     * Returns the x and y radii of this curve.
     * @return The x and y radii.
     */
    getRadii() {
        return [
            threex.lengthXYZ(this._kernel.objGetParams(this._id)[1]),
            threex.lengthXYZ(this._kernel.objGetParams(this._id)[2]),
        ];
    }
    /**
     * Checks if the ellipse is closed.
     * @return True if the polyline is closed.
     */
    isClosed() {
        return (this._kernel.objGetParams(this._id)[4] === undefined);
    }
    /**
     * Get a set of equidistant points along the ellipse or arc.
     * @return An array of points.
     */
    equiPoints(num_points) {
        const length = math_conics.ellipseLength(this);
        const xyzs = [];
        for (let i = 0; i < num_points; i++) {
            xyzs.push(math_conics.ellipseEvaluate(this, i / (num_points - 1)));
        }
        return this._kernel.getGeom().addPoints(xyzs);
    }
}
exports.Ellipse = Ellipse;
//# sourceMappingURL=entity_obj_ellipse.js.map