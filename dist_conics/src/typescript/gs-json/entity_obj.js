"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arr_1 = require("./libs/arr/arr");
const enums_1 = require("./enums");
const topo_sub_1 = require("./topo_sub");
const entity_1 = require("./entity");
const entity_point_1 = require("./entity_point");
const groups_1 = require("./groups");
const entity_obj_cast_1 = require("./entity_obj_cast");
/**
 * Abstract class Obj.
 * The superclass for all geometric objects,
 * including Polyline and Polymesh.
 */
class Obj extends entity_1.Ent {
    /**
     * Get the geometry type.
     * This method overrides the method in the Ent class.
     * @return The geometry type.
     */
    getGeomType() {
        return enums_1.EGeomType.objs;
    }
    /**
     * Get the object type.
     * This method will be overridden by subclasses.
     * @return The object type.
     */
    getObjType() {
        throw new Error("Method to be overridden by subclass.");
    }
    /**
     * Check if this entity exists in the model. (i.e has it been deleted?)
     * @return The entity ID number.
     */
    exists() {
        return this._kernel.geomHasObj(this._id);
    }
    /**
     * Get the label for this object.
     * @return The xyz of the centroid.
     */
    getLabel() {
        return "o" + this._id;
    }
    /**
     * Get the label centroid for this object.
     * @return The xyz of the label.
     */
    getLabelCentroid() {
        const xyzs = this.getPointsSet().map((v) => v.getPosition());
        const centroid = [0, 0, 0];
        for (const xyz of xyzs) {
            centroid[0] += xyz[0];
            centroid[1] += xyz[1];
            centroid[2] += xyz[2];
        }
        const num_vertices = xyzs.length;
        return [centroid[0] / num_vertices, centroid[1] / num_vertices, centroid[2] / num_vertices];
    }
    /**
     * Make a copy of this entity.
     * This method must be overridden by the sub-classes.
     * @return The geometry type.
     */
    copy(copy_attribs) {
        return entity_obj_cast_1._castToObjType(this._kernel, this._kernel.geomCopyObj(this._id, copy_attribs));
    }
    /**
     * Transform the points for this object.
     * @param matrix The xform matrix.
     */
    xform(matrix) {
        return this._kernel.objXform(this._id, matrix);
    }
    //  Points -------------------------------------------------------------------------------------
    /**
     * Get the points for this object. If the point_type is not specified, then
     * points for both wires and faces are returned.
     * @return A nested array of points, with sub-arrays for wires and faces.
     */
    getPoints(point_type) {
        const ids = this._kernel.objGetPointIDs(this._id, point_type);
        switch (point_type) {
            case enums_1.EGeomType.wires:
                return [
                    ids[0].map((w) => w.map((id) => new entity_point_1.Point(this._kernel, id))),
                    [],
                ];
            case enums_1.EGeomType.faces:
                return [
                    [],
                    ids[1].map((f) => f.map((id) => new entity_point_1.Point(this._kernel, id))),
                ];
            default:
                return [
                    ids[0].map((w) => w.map((id) => new entity_point_1.Point(this._kernel, id))),
                    ids[1].map((f) => f.map((id) => new entity_point_1.Point(this._kernel, id))),
                ];
        }
    }
    /**
     * Get the points for this object. If the point_type is not specified, then
     * points for both wires and faces are returned.
     * @return A flat array of points.
     */
    getPointsArr() {
        return arr_1.Arr.flatten(this.getPoints());
    }
    /**
     * Get the set of unique points for this object.
     * @return The array of point IDs.
     */
    getPointsSet() {
        const exclude = [];
        const unique_points = [];
        for (const point of this.getPointsArr()) {
            const id = point.getID();
            if (exclude.indexOf(id) === -1) {
                exclude.push(id);
                unique_points.push(point);
            }
        }
        return unique_points;
    }
    //  Topos --------------------------------------------------------------------------------------
    /**
     * Get the vertices for this object. If the vertex_type is not specified, then
     * vertices for both wires and faces are returned.
     * @return The array of vertices.
     */
    getVertices(vertex_type) {
        const paths = this._kernel.objGetVertices(this._id, vertex_type);
        return [
            paths[0].map((w) => w.map((path) => new topo_sub_1.Vertex(this._kernel, path))),
            paths[1].map((f) => f.map((path) => new topo_sub_1.Vertex(this._kernel, path))),
        ];
    }
    /**
     * Get the edges for this object. If the edge_type is not specified, then
     * edges for both wires and faces are returned.
     * @return The array of edges.
     */
    getEdges(edge_type) {
        const paths = this._kernel.objGetEdges(this._id, edge_type);
        return [
            paths[0].map((w) => w.map((path) => new topo_sub_1.Edge(this._kernel, path))),
            paths[1].map((f) => f.map((path) => new topo_sub_1.Edge(this._kernel, path))),
        ];
    }
    /**
     * Get the wires for this object.
     * @return The array of wires.
     */
    getWires() {
        const paths = this._kernel.objGetWires(this._id);
        return paths.map((path) => new topo_sub_1.Wire(this._kernel, path));
    }
    /**
     * Get the faces for this object.
     * @return The array of faces.
     */
    getFaces() {
        const paths = this._kernel.objGetFaces(this._id);
        return paths.map((path) => new topo_sub_1.Face(this._kernel, path));
    }
    /**
     * Get the number of wires for this object.
     * @return The number of wires.
     */
    numWires() {
        return this._kernel.objNumWires(this._id);
    }
    /**
     * Get the number of faces for this object.
     * @return The number of faces.
     */
    numFaces() {
        return this._kernel.objNumFaces(this._id);
    }
    /**
     * Returns the number of vertices in this polymesh wires.
     * @return Return the number of vertices.
     */
    numWireVertices() {
        let count = 0;
        for (const wire of this.getWires()) {
            count += wire.numVertices();
        }
        return count;
    }
    /**
     * Returns the number of vertices in this polymesh faces.
     * @return Return the number of vertices.
     */
    numFaceVertices() {
        let count = 0;
        for (const face of this.getFaces()) {
            count += face.numVertices();
        }
        return count;
    }
    /**
     * Returns the number of edges in this polymesh wires.
     * @return Return the number of edges.
     */
    numWireEdges() {
        let count = 0;
        for (const wire of this.getWires()) {
            count += wire.numEdges();
        }
        return count;
    }
    /**
     * Returns the number of edges in this polymesh faces.
     * @return Return the number of edges.
     */
    numFaceEdges() {
        let count = 0;
        for (const face of this.getFaces()) {
            count += face.numEdges();
        }
        return count;
    }
    /**
     *
     * @return
     */
    getWirePoints() {
        const points = [];
        for (const wire of this.getWires()) {
            points.push(...wire.getVertices().map((v) => v.getPoint()));
        }
        return points;
    }
    /**
     *
     * @return
     */
    getFacePoints() {
        const points = [];
        for (const face of this.getFaces()) {
            points.push(...face.getVertices().map((v) => v.getPoint()));
        }
        return points;
    }
    //  Groups -------------------------------------------------------------------------------------
    /**
     * Get the group names for all the groups for which this entity is a member.
     * @return The array of group names.
     */
    getGroups() {
        return this._kernel.objGetGroups(this._id).map((v) => new groups_1.Group(this._kernel, v));
    }
    /**
     * Add this object to a group.
     * @param group The group.
     * @return True if the entity was added, False is the object was already in the group.
     */
    addToGroup(group) {
        return this._kernel.groupAddObj(group.getName(), this._id);
    }
    //  toString -------------------------------------------------------------------------------------
    /**
     * Create s string representation of this object.
     * @return Strig
     */
    toString() {
        return "Obj('" + this.getLabel() + "', " + enums_1.mapObjTypeToString.get(this.getObjType()) +
            ", faces:" + this.numFaces() + ", wires:" + this.numWires() +
            ", edges:" + (this.numFaceEdges() + this.numWireEdges()) +
            ", vertices:" + (this.numFaceVertices() + this.numWireVertices()) + ")";
    }
}
exports.Obj = Obj;
//# sourceMappingURL=entity_obj.js.map