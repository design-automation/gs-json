"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_obj_1 = require("./entity_obj");
const entity_point_1 = require("./entity_point");
const threex = require("./libs/threex/threex");
/**
 * Class ConicCurve.
 */
class Parabola extends entity_obj_1.Obj {
    /**
     * Get the object type: "hyperbola".
     * @return ConicCurve object type.
     */
    getObjType() {
        return 5 /* parabola */;
    }
    /**
     * Get the origin of the hyperbola.
     * @return Plane object type.
     */
    getOrigin() {
        return new entity_point_1.Point(this._kernel, this._kernel.objGetOnePoint(this._id));
    }
    /**
     * Returns the x and y vectors of this curve.
     * @return The x and y vectors.
     */
    getAxes() {
        const params = this._kernel.objGetParams(this._id);
        return [params[1], params[2], params[3]];
    }
    /**
     * Returns the x and y vectors of this curve. The length of the x vector
     * defines the a,b parameters of the hyperbola.
     * @return The x and y vectors.
     */
    getVectors() {
        return [this._kernel.objGetParams(this._id)[1], this._kernel.objGetParams(this._id)[2]];
    }
    /**
     * Sets the x and y vectors of this curve. The length of the x,y vectors
     * defines the a,b parameters of the hyperbola.
     * @return The x and y vectors.
     */
    setVectors(x_vec, y_vec) {
        // param are [type, x_vec, y_vec, z_vec, angles]
        this._kernel.objGetParams(this._id)[1] = x_vec;
        this._kernel.objGetParams(this._id)[2] = y_vec;
        this._kernel.objGetParams(this._id)[3] = threex.crossXYZs(x_vec, y_vec, true);
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
        this._kernel.objGetParams(this._id)[4] = angles;
    }
    /**
     * Returns the radii of this curve (the lengths of the x,y vectors).
     * @return The radii.
     */
    getRadii() {
        return [threex.lengthXYZ(this._kernel.objGetParams(this._id)[1]),
            threex.lengthXYZ(this._kernel.objGetParams(this._id)[2])];
    }
    /**
     * Get the length of the circle or arc.
     * @return The length.
     */
    length() {
        throw new Error("method not implemented");
        // return math_conics.hyperbolaLength(this);
    }
    /**
     * Get a point located at t% of the hyperbola length.
     * @return A Point.
     */
    evalParam(t) {
        throw new Error("method not implemented");
        // const xyz: XYZ = math_conics.hyperbolaEvaluate(this, t);
        // return this._kernel.getGeom().addPoint(xyz);
    }
    /**
     * Get a set of equidistant points along the arc of hyperbola.
     * @return An array of points.
     */
    equiPoints(num_points) {
        throw new Error("method not implemented");
        // const length: number = math_conics.hyperbolaLength(this);
        // const xyzs: XYZ[] = [];
        // for (let i = 0; i < num_points; i++) {
        //     xyzs.push(math_conics.hyperbolaEvaluate(this, i/(num_points - 1)));
        // }
        // return this._kernel.getGeom().addPoints(xyzs);
    }
}
exports.Parabola = Parabola;
//# sourceMappingURL=entity_obj_parabola.js.map