"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
const entity_point_1 = require("./entity_point");
const entity_obj_polyline_1 = require("./entity_obj_polyline");
const entity_obj_circle_1 = require("./entity_obj_circle");
const entity_obj_ellipse_1 = require("./entity_obj_ellipse");
const entity_obj_hyperbola_1 = require("./entity_obj_hyperbola");
const entity_obj_parabola_1 = require("./entity_obj_parabola");
const entity_obj_polymesh_1 = require("./entity_obj_polymesh");
const entity_obj_plane_1 = require("./entity_obj_plane");
const entity_obj_ray_1 = require("./entity_obj_ray");
const entity_obj_rayTwo_1 = require("./entity_obj_rayTwo");
const topo_sub_1 = require("./topo_sub");
const entity_obj_cast_1 = require("./entity_obj_cast");
const threex = require("./libs/threex/threex");
const util = require("./_utils");
const three = require("three");
/**
 * Class Geom
 */
class Geom {
    /**
     * Create a new Geom object from the Kernel.
     * @param
     * @return
     */
    constructor(kernel) {
        this._kernel = kernel;
    }
    //  Copy from model -----------------------------------------------------------------------------------
    /**
     * Copies a point from another model to thid model.
     * @param point The point to copy
     * @return A new point.
     */
    copyPointFromModel(point) {
        const id = this._kernel.geomAddPoint(point.getPosition());
        return new entity_point_1.Point(this._kernel, id);
    }
    /**
     * Copies a set of new points to the model, from an array of xyz coordinates.
     * @param points An array of points to copy.
     * @return An array of new points.
     */
    copyPointsFromModel(points) {
        return points.map((point) => this.addPoint(point.getPosition()));
    }
    /**
     * Copies a ray to the model.
     * @param ray The ray to copy.
     * @param ray_vec A vector defining the direction of the ray.
     * @return Object of type Ray
     */
    copyRayFromModel(ray) {
        // get the data
        const origin = ray.getOrigin();
        const vec = ray.getVector();
        // create the points
        const origin_id = this._kernel.geomAddPoint(origin.getPosition());
        // create the obj
        const id = this._kernel.geomAddRay(origin_id, vec);
        return new entity_obj_ray_1.Ray(this._kernel, id);
    }
    /**
     * Copies a plane to the model.
     * @param plane The plane to copy.
     * @return Object of type Plane
     */
    copyPlaneFromModel(plane) {
        // get the data
        const origin = plane.getOrigin();
        const axes = plane.getAxes();
        // create the points
        const origin_id = this._kernel.geomAddPoint(origin.getPosition());
        // create the obj
        const id = this._kernel.geomAddPlane(origin_id, axes);
        return new entity_obj_plane_1.Plane(this._kernel, id);
    }
    /**
     * Copies a circle to the model.
     * @param circle The circle to copy.
     * @return Object of type Circle
     */
    copyCircleFromModel(circle) {
        // get the data
        const origin = circle.getOrigin();
        const axes = circle.getAxes();
        const angles = circle.getAngles();
        // create the points
        const origin_id = this._kernel.geomAddPoint(origin.getPosition());
        // create the obj
        const id = this._kernel.geomAddCircle(origin_id, axes, angles);
        return new entity_obj_circle_1.Circle(this._kernel, id);
    }
    /**
     * Copies a polyline to the model.
     * @param circle The polyline to copy.
     * @return Object of type Polyline
     */
    copyPlineFromModel(pline) {
        //TODO copy polylines
        throw new Error("Method not implemented");
    }
    /**
     * Copies a polyline to the model.
     * @param circle The polyline to copy.
     * @return Object of type Polyline
     */
    copyPmeshFromModel(pline) {
        //TODO copy polymeshes
        throw new Error("Method not implemented");
    }
    /**
     * Copies an obj to the model.
     * @param obj The obj to copy.
     * @return Object
     */
    copyObjFromModel(obj) {
        switch (obj.getObjType()) {
            case 1 /* ray */:
                return this.copyRayFromModel(obj);
            case 2 /* plane */:
                return this.copyPlaneFromModel(obj);
            case 3 /* circle */:
                return this.copyCircleFromModel(obj);
            case 100 /* polyline */:
                return this.copyPlineFromModel(obj);
            case 200 /* polymesh */:
                return this.copyPmeshFromModel(obj);
            default:
                throw new Error("Object type not found:" + obj.getObjType());
        }
    }
    /**
     * Copies an array of objs to the model.
     * @param objs The objs to copy.
     * @return Object
     */
    copyObjsFromModel(objs) {
        //TODO copy objects with the shared points
        // The rtick here is tomake sure that points are still shared between the objects
        throw new Error("Method not implemented");
    }
    //  Creation -----------------------------------------------------------------------------------
    /**
     * Adds a new point to the model at position xyz.
     * @param xyz xyz coordinates are required to create a point
     * @return A point instance.
     */
    addPoint(xyz) {
        const id = this._kernel.geomAddPoint(xyz);
        return new entity_point_1.Point(this._kernel, id);
    }
    /**
     * Adds a set of new points to the model, from an array of xyz coordinates.
     * @param xyz An array of xyz coordinates.
     * @return An array Point instances.
     */
    addPoints(xyz_arr) {
        return xyz_arr.map((xyz) => this.addPoint(xyz));
    }
    /**
     * Adds a new ray to the model.
     * @param origin_point The ray origin point.
     * @param ray_vec A vector defining the direction of the ray.
     * @return Object of type Ray
     */
    addRay(origin_point, ray_vec) {
        const id = this._kernel.geomAddRay(origin_point.getID(), ray_vec);
        return new entity_obj_ray_1.Ray(this._kernel, id);
    }
    /**
     * Adds a new rayTwo to the model.
     * @param origin_point The rayTwo origin point.
     * @param ray_vec A vector defining the direction of the ray.
     * @return Object of type RayTwo, which is a ray that is defined in the two directions of the Ray.
     */
    addRayTwo(origin_point, ray_vec) {
        const id = this._kernel.geomAddRayTwo(origin_point.getID(), ray_vec);
        return new entity_obj_rayTwo_1.RayTwo(this._kernel, id);
    }
    /**
     * Adds a new plane to the model.
     * @param origin_point The plane origin point.
     * @param x_vec A vector defining the x axis.
     * @param vec A vector in the plane.
     * @return Object of type Plane
     */
    addPlane(origin_point, x_vec, vec) {
        // make three ortho vectors
        const axes = threex.makeXYZOrthogonal(x_vec, vec, false);
        if (axes === null) {
            throw new Error("Vectors cannot be parallel.");
        }
        // make the circle
        const id = this._kernel.geomAddPlane(origin_point.getID(), axes);
        return new entity_obj_plane_1.Plane(this._kernel, id);
    }
    /**
     * Adds a new circle to the model.
     * @param Origin The origin point.
     * @param x_vec A vector in the local x direction, also defines the raidus.
     * @param vec A vector in the plane
     * @param angles The angles, can be undefined, in which case a closed conic is generated.
     * @return Object of type Circle
     */
    addCircle(origin_point, x_vec, vec, angles) {
        // make the angles correct
        angles = util.checkCircleAngles(angles);
        // make three ortho vectors
        const axes = threex.makeXYZOrthogonal(x_vec, vec, false);
        if (axes === null) {
            throw new Error("Vectors cannot be parallel.");
        }
        // make the circle
        const id = this._kernel.geomAddCircle(origin_point.getID(), axes, angles);
        return new entity_obj_circle_1.Circle(this._kernel, id);
    }
    /**
     * Adds a new ellipse to the model.
     * @param Origin The origin point.
     * @param x_vec A vector defining the radius in the local x direction.
     * @param y_vec A vector defining the radius in the local y direction, must be orthogonal to x.
     * @param angles The angles, can be undefined, in which case a closed conic is generated.
     * @return Object of type Ellipse
     */
    addEllipse(origin_point, x_vec, vec, angles) {
        // make the angles correct
        angles = util.checkCircleAngles(angles);
        // make three ortho vectors
        const a = Math.sqrt(x_vec[0] * x_vec[0] + x_vec[1] * x_vec[1] + x_vec[2] * x_vec[2]); // Radius 1
        const b = Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2]); // Radius 2
        let axes = threex.makeXYZOrthogonal(x_vec, vec, false);
        let axesV3 = [new three.Vector3(axes[0][0], axes[0][1], axes[0][2]),
            new three.Vector3(axes[1][0], axes[1][1], axes[1][2]),
            new three.Vector3(axes[2][0], axes[2][1], axes[2][2]),
        ];
        axesV3 = [axesV3[0].setLength(a), axesV3[1].setLength(b), axesV3[2]];
        axes = [[axesV3[0].x, axesV3[0].y, axesV3[0].z],
            [axesV3[1].x, axesV3[1].y, axesV3[1].z],
            [axesV3[2].x, axesV3[2].y, axesV3[2].z]];
        if (axes === null) {
            throw new Error("Vectors cannot be parallel.");
        }
        // make the circle
        const id = this._kernel.geomAddEllipse(origin_point.getID(), axes, angles);
        return new entity_obj_ellipse_1.Ellipse(this._kernel, id);
    }
    /**
     * Adds a new Parabola to the model.
     * @param Origin The origin point.
     * @param x_vec A vector defining the length in the local x direction.
     * @param y_vec A vector defining the length in the local y direction, must be orthogonal to x.
     * @param angles The angles, can be undefined, in which case a closed conic is generated.
     * @return Object of type Parabola
     */
    addParabola(origin_point, x_vec, vec, angles) {
        // make the angles correct
        angles = util.checkParabolaAngles(angles);
        // make three ortho vectors
        const a = x_vec.length; // Radius 1
        const b = vec.length; // Radius 2
        let axes = threex.makeXYZOrthogonal(x_vec, vec, false);
        let axesV3 = [new three.Vector3(axes[0][0], axes[0][1], axes[0][2]),
            new three.Vector3(axes[1][0], axes[1][1], axes[1][2]),
            new three.Vector3(axes[2][0], axes[2][1], axes[2][2]),
        ];
        axesV3 = [axesV3[0].setLength(a), axesV3[1].setLength(b), axesV3[2]];
        axes = [[axesV3[0].x, axesV3[0].y, axesV3[0].z],
            [axesV3[1].x, axesV3[1].y, axesV3[1].z],
            [axesV3[2].x, axesV3[2].y, axesV3[2].z]];
        if (axes === null) {
            throw new Error("Vectors cannot be parallel.");
        }
        // make the Parabola
        const id = this._kernel.geomAddParabola(origin_point.getID(), axes, angles);
        return new entity_obj_parabola_1.Parabola(this._kernel, id);
    }
    /**
     * Adds a new Hyperbola to the model.
     * @param Origin The origin point.
     * @param x_vec A vector defining the radius in the local x direction.
     * @param y_vec A vector defining the radius in the local y direction, must be orthogonal to x.
     * @param angles The angles, can be undefined, in which case a closed conic is generated.
     * @return Object of type Hyperbola
     */
    addHyperbola(origin_point, x_vec, vec, angles) {
        // make the angles correct
        angles = util.checkHyperbolaAngles(angles);
        // make three ortho vectors
        const a = x_vec.length; // Length 1
        const b = vec.length; // Length 2
        let axes = threex.makeXYZOrthogonal(x_vec, vec, false);
        let axesV3 = [new three.Vector3(axes[0][0], axes[0][1], axes[0][2]),
            new three.Vector3(axes[1][0], axes[1][1], axes[1][2]),
            new three.Vector3(axes[2][0], axes[2][1], axes[2][2]),
        ];
        axesV3 = [axesV3[0].setLength(a), axesV3[1].setLength(b), axesV3[2]];
        axes = [[axesV3[0].x, axesV3[0].y, axesV3[0].z],
            [axesV3[1].x, axesV3[1].y, axesV3[1].z],
            [axesV3[2].x, axesV3[2].y, axesV3[2].z]];
        if (axes === null) {
            throw new Error("Vectors cannot be parallel.");
        }
        // make the Hyperbola
        const id = this._kernel.geomAddHyperbola(origin_point.getID(), axes, angles);
        return new entity_obj_hyperbola_1.Hyperbola(this._kernel, id);
    }
    /**
     * Adds a new polyline to the model.
     * @param points A collection of Points.
     * @param is_closed True if the polyline is closed.
     * @return Object of type Polyline
     */
    addPolyline(points, is_closed) {
        const point_ids = points.map((p) => p.getID());
        const id = this._kernel.geomAddPolyline(point_ids, is_closed);
        return new entity_obj_polyline_1.Polyline(this._kernel, id);
    }
    /**
     * Adds a new polymesh to the model.
     * @param face_points An array of arrays of points.
     * @return Object of type Polymesh
     */
    addPolymesh(face_points) {
        const point_ids = face_points.map((f) => f.map((p) => p.getID()));
        const id = this._kernel.geomAddPolymesh(point_ids);
        return new entity_obj_polymesh_1.Polymesh(this._kernel, id);
    }
    //  Points -------------------------------------------------------------------------------------
    /**
     * Get all the points in this model.
     * @param
     * @return
     */
    getAllPoints() {
        const ids = this._kernel.geomGetPointIDs();
        return ids.map((id) => new entity_point_1.Point(this._kernel, id));
    }
    /**
     * Get a set of points from an array of IDs.
     * @param
     * @return
     */
    getPoints(ids) {
        return ids.map((id) => new entity_point_1.Point(this._kernel, id));
    }
    /**
     * Get a single point from an ID.
     * @param
     * @return
     */
    getPoint(id) {
        return new entity_point_1.Point(this._kernel, id);
    }
    /**
     * Delete a set of points.
     * @param
     * @return
     */
    delPoints(points) {
        return this._kernel.geomDelPoints(points.map((point) => point.getID()));
    }
    /**
     * Delete a single point.
     * @param
     * @return
     */
    delPoint(point) {
        return this._kernel.geomDelPoint(point.getID());
    }
    /**
     * Get the number of points in the model.
     * @param
     * @return
     */
    numPoints() {
        return this._kernel.geomNumPoints();
    }
    /**
     * Merge points.
     * @param
     * @return
     */
    mergePoints(points, tolerance) {
        if (tolerance === undefined) {
            const id = this._kernel.geomMergePoints(points.map((point) => point.getID()));
            return [new entity_point_1.Point(this._kernel, id)];
        }
        return this._kernel.geomMergePointsByTol(points.map((point) => point.getID()), tolerance)
            .map((id) => new entity_point_1.Point(this._kernel, id));
    }
    /**
     * Merge all points.
     * @param
     * @return
     */
    mergeAllPoints(tolerance) {
        return this._kernel.geomMergeAllPoints(tolerance).map((id) => new entity_point_1.Point(this._kernel, id));
    }
    //  Objects ------------------------------------------------------------------------------------
    /**
     * Find certain types of objects in the model.
     * @param
     * @return
     */
    findObjs(obj_type) {
        throw new Error("Method not implemented");
    }
    /**
     * Get all the object in the model.
     * @param
     * @return
     */
    getAllObjs() {
        return this._kernel.geomGetObjIDs().map((id) => entity_obj_cast_1._castToObjType(this._kernel, id));
    }
    /**
     * Get an array of objects from an array of IDs.
     * @param
     * @return
     */
    getObjs(ids) {
        return ids.map((id) => entity_obj_cast_1._castToObjType(this._kernel, id));
    }
    /**
     * Get a single object from an ID.
     * @param
     * @return
     */
    getObj(id) {
        return entity_obj_cast_1._castToObjType(this._kernel, id);
    }
    /**
     * Delete an array of objects.
     * @param
     * @return
     */
    delObjs(objs, keep_points = true) {
        return this._kernel.geomDelObjs(objs.map((point) => point.getID()), keep_points);
    }
    /**
     * Delete a single object.
     * @param
     * @return
     */
    delObj(obj, keep_points = true) {
        return this._kernel.geomDelObj(obj.getID(), keep_points);
    }
    /**
     * Get the total number of objects in the model.
     * @param
     * @return
     */
    numObjs() {
        return this._kernel.geomNumObjs();
    }
    //  Topos --------------------------------------------------------------------------------------
    /**
     * Get all the topos in the model for a specific geom type. (Vertices, Edges, Wires, Faces.)
     * @param
     * @return
     */
    // public getTopos(geom_type: EGeomType): ITopo[] {
    getTopos(geom_type) {
        const paths = this._kernel.geomGetTopoPaths(geom_type);
        switch (geom_type) {
            case enums_1.EGeomType.vertices:
                return paths.map((p) => new topo_sub_1.Vertex(this._kernel, p));
            case enums_1.EGeomType.edges:
                return paths.map((p) => new topo_sub_1.Edge(this._kernel, p));
            case enums_1.EGeomType.wires:
                return paths.map((p) => new topo_sub_1.Wire(this._kernel, p));
            case enums_1.EGeomType.faces:
                return paths.map((p) => new topo_sub_1.Face(this._kernel, p));
        }
    }
    /**
     * Get a topo from a topo path. If the topo does not exist, then null is returned.
     * @param
     * @return
     */
    getTopo(path) {
        if (!this._kernel.geomHasTopo(path)) {
            return null;
        }
        if (path.st === undefined) {
            if (path.tt === 0) {
                return new topo_sub_1.Wire(this._kernel, path);
            }
            if (path.tt === 1) {
                return new topo_sub_1.Face(this._kernel, path);
            }
        }
        else {
            if (path.st === 0) {
                return new topo_sub_1.Vertex(this._kernel, path);
            }
            if (path.st === 1) {
                return new topo_sub_1.Edge(this._kernel, path);
            }
        }
    }
    /**
     * Get a topo from a topo label.
     * @param
     * @return
     */
    getTopoFromLabel(path_str) {
        // o2:f3:e1
        const parts = path_str.split(":").map((v) => [v.slice(0, 1), Number.parseInt(v.slice(1))]);
        if (parts.length !== 2 && parts.length !== 3) {
            return null;
        }
        if (parts[0][0] !== "o") {
            return null;
        }
        if (parts[1][0] !== "w" && parts[1][0] !== "f") {
            return null;
        }
        if (Number.isNaN(parts[0][1])) {
            return null;
        }
        if (Number.isNaN(parts[1][1])) {
            return null;
        }
        const id = parts[0][1];
        let tt;
        if (parts[1][0] === "w") {
            tt = 0;
        }
        else {
            tt = 1;
        }
        const ti = parts[1][1];
        const path = { id, tt, ti };
        if (parts.length === 3) {
            if (parts[2][0] !== "v" && parts[2][0] !== "e") {
                return null;
            }
            if (Number.isNaN(parts[2][1])) {
                return null;
            }
            let st;
            if (parts[2][0] === "v") {
                st = 0;
            }
            else {
                st = 1;
            }
            const si = parts[2][1];
            path.st = st;
            path.si = si;
        }
        return this.getTopo(path);
    }
    /**
     * Get the number of topos in the model for a specific geom type. (Vertices, Edges, Wires, Faces.)
     * @param
     * @return
     */
    numTopos(geom_type) {
        return this._kernel.geomNumTopos(geom_type);
    }
}
exports.Geom = Geom;
//# sourceMappingURL=geom.js.map