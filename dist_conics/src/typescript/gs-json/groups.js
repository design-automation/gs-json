"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
const topo_sub_1 = require("./topo_sub");
const enums_2 = require("./enums");
const entity_point_1 = require("./entity_point");
const entity_obj_cast_1 = require("./entity_obj_cast");
/**
 * Group class.
 */
class Group {
    /**
     * Creates an instance of the Group class.
     * The group data must already exists in the model.
     * Do not use this constructor if you want to add a new group to the model.
     * Instead, you should use the "addGroup()" methdod in the model class.
     * @param model The Model object in which this attribute will be created.
     * @param data The attribute data in the model.
     * @return The Group object.
     */
    constructor(kernel, name) {
        this._kernel = kernel;
        this._name = name;
    }
    /**
     * Check if this group exists
     * @return The model
     */
    exists() {
        return this._kernel.modelGetGroup(this._name) === undefined;
    }
    /**
     * Get the model to which this group belongs.
     * @return The model
     */
    getModel() {
        return this._kernel.getModel();
    }
    /**
     * Get the Geom object
     * @return The Model object
     */
    getGeom() {
        return this._kernel.getGeom();
    }
    //  This group ---------------------------------------------------------------------------------
    /**
     * Get the group name, which is its main identifier. Kust be unque.
     * @param
     * @return
     */
    getName() {
        return this._name;
    }
    /**
     * Rename the group.
     * @param
     * @return
     */
    setName(name) {
        const old_name = this._name;
        this._kernel.groupSetName(old_name, name);
        this._name = name;
        return old_name;
    }
    /**
     * Ge the parent group of this group. Each group can only have one parent.
     * @param
     * @return
     */
    getParentGroup() {
        const name = this._kernel.groupGetParent(this._name);
        return new Group(this._kernel, name);
    }
    /**
     * Set teh parent groupof this group.
     * @param
     * @return
     */
    setParentGroup(group) {
        const name = this._kernel.groupSetParent(this._name, group.getName());
        return new Group(this._kernel, name);
    }
    /**
     * Remove the parent group of this group. This will result in this group having no parent.
     * A group with no parent is a top level group
     * @param
     * @return
     */
    removeParentGroup() {
        const name = this._kernel.groupSetParent(this._name, null);
        return new Group(this._kernel, name);
    }
    /**
     * Get the children groups of this group.
     * Each group can have multiple chilren groups.
     * @param
     * @return
     */
    getChildGroups() {
        return this._kernel.groupGetChildren(this._name).map((v) => new Group(this._kernel, v));
    }
    //  Objs ---------------------------------------------------------------------------------------
    /**
     * Get the number of objs in this group.
     * @param
     * @return
     */
    getNumObjs(obj_type) {
        return this._kernel.groupGetNumObjs(this._name, obj_type);
    }
    /**
     * Get the object in this group.
     * @param
     * @return
     */
    getObjs(obj_type) {
        return this._kernel.groupGetObjIDs(this._name, obj_type).map((id) => entity_obj_cast_1._castToObjType(this._kernel, id));
    }
    /**
     * Add an object to this group.
     * @param
     * @return
     */
    addObj(obj) {
        return this._kernel.groupAddObj(this._name, obj.getID());
    }
    /**
     * Add multiple object to this group.
     *
     * @param
     * @return Returns true if all obj IDs were added, false otherwise.
     */
    addObjs(objs) {
        return this._kernel.groupAddObjs(this._name, objs.map((v) => v.getID()));
    }
    /**
     * Remove an object from this group.
     * @param
     * @return
     */
    removeObj(obj) {
        return this._kernel.groupRemoveObj(this._name, obj.getID());
    }
    /**
     * Remove multiple objects from this group.
     * @param
     * @return
     */
    removeObjs(objs) {
        return this._kernel.groupRemoveObjs(this._name, objs.map((v) => v.getID()));
    }
    /**
     * Check if an object is in this group.
     * @param
     * @return
     */
    hasObj(obj) {
        return this._kernel.groupHasObj(this._name, obj.getID());
    }
    //  Topos --------------------------------------------------------------------------------------
    /**
     * Get the number of topos in this group.
     * @param
     * @return
     */
    getNumTopos(geom_type) {
        return this._kernel.groupGetNumTopos(this._name, geom_type);
    }
    /**
     * Get the topos in this group. (Vertices, edges, wires, faces.)
     * @param
     * @return
     */
    getTopos(geom_type) {
        const paths = this._kernel.groupGetTopos(this._name, geom_type);
        const topos = [];
        for (const path of paths) {
            const path_tt = enums_2.mapTTPathIndexToGeomType.get(path.tt);
            const path_st = enums_2.mapSTPathIndexToGeomType.get(path.st);
            switch (path_st) {
                case enums_1.EGeomType.vertices:
                    topos.push(new topo_sub_1.Vertex(this._kernel, path));
                    break;
                case enums_1.EGeomType.edges:
                    topos.push(new topo_sub_1.Edge(this._kernel, path));
                    break;
                default:
                    switch (path_tt) {
                        case enums_1.EGeomType.wires:
                            topos.push(new topo_sub_1.Wire(this._kernel, path));
                            break;
                        case enums_1.EGeomType.faces:
                            topos.push(new topo_sub_1.Face(this._kernel, path));
                            break;
                    }
                    break;
            }
        }
        return topos;
    }
    /**
     * Add a topo to this group. (Vertices, edges, wires, faces.)
     * @param
     * @return
     */
    addTopo(topo) {
        const path = topo.getTopoPath(); // TODO
        return this._kernel.groupAddTopo(this._name, path);
    }
    /**
     * Add multiple topos to this group. (Vertices, edges, wires, faces.)
     * @param
     * @return
     */
    addTopos(topos) {
        const paths = topos.map((p) => p.getTopoPath()); // TODO
        return this._kernel.groupAddTopos(this._name, paths);
    }
    /**
     * Remove a topo from this group. (Vertices, edges, wires, faces.)
     * @param
     * @return
     */
    removeTopo(topo) {
        const path = topo.getTopoPath(); // TODO
        return this._kernel.groupRemoveTopo(this._name, path);
    }
    /**
     * Remove multiple topos from this group. (Vertices, edges, wires, faces.)
     * @param
     * @return
     */
    removeTopos(topos) {
        const paths = topos.map((p) => p.getTopoPath()); // TODO
        return this._kernel.groupRemoveTopos(this._name, paths);
    }
    /**
     * Check if a topo is in this group. (Vertices, edges, wires, faces.)
     * @param
     * @return
     */
    hasTopo(topo) {
        const path = topo.getTopoPath(); // TODO
        return this._kernel.groupHasTopo(this._name, path);
    }
    //  Points in this group -----------------------------------------------------------------------
    /**
     * Get the number of points in this group.
     * @param
     * @return
     */
    getNumPoints() {
        return this._kernel.groupGetNumPoints(this._name);
    }
    /**
     * Get the points in this group.
     * @param
     * @return
     */
    getPoints() {
        return this._kernel.groupGetPointIDs(this._name).map((v) => new entity_point_1.Point(this._kernel, v));
    }
    /**
     * Add a point to this group.
     * @param
     * @return
     */
    addPoint(point) {
        return this._kernel.groupAddPoint(this._name, point.getID());
    }
    /**
     * Add multiple points to this group.
     * @param
     * @return
     */
    addPoints(points) {
        return this._kernel.groupAddPoints(this._name, points.map((v) => v.getID()));
    }
    /**
     * Remove a point from this group.
     * @param
     * @return
     */
    removePoint(point) {
        return this._kernel.groupRemovePoint(this._name, point.getID());
    }
    /**
     * Remove multiple points from this group.
     * @param
     * @return
     */
    removePoints(points) {
        return this._kernel.groupRemovePoints(this._name, points.map((v) => v.getID()));
    }
    /**
     * Check if a point is in this group.
     * @param
     * @return
     */
    hasPoint(point) {
        return this._kernel.groupHasPoint(this._name, point.getID());
    }
    //  Properties ---------------------------------------------------------------------------------
    /**
     * Get the properties of this group. This returns an array of key: value pairs.
     * @param
     * @return
     */
    // Map<string, any> { // TODO
    getProps() {
        return this._kernel.groupGetProps(this._name);
    }
    /**
     * Set the properties of this group. The value must be an array of key: value pairs.
     * @param
     * @return
     */
    // Map<string, any>): Map<string, any> { // TODO
    setProps(props) {
        return this._kernel.groupSetProps(this._name, props);
    }
    //  toString -------------------------------------------------------------------------------------
    /**
     * Create s string representation of this point.
     * @return String
     */
    toString() {
        return "Group('" + this.getName() +
            "', parent: " + this.getParentGroup().getName() +
            ", num objs: " + this.getNumObjs() +
            ", num faces: " + this.getNumTopos(enums_1.EGeomType.faces) +
            ", num wires: " + this.getNumTopos(enums_1.EGeomType.faces) +
            ", num edges: " + this.getNumTopos(enums_1.EGeomType.faces) +
            ", num vertices: " + this.getNumTopos(enums_1.EGeomType.faces) +
            ", num points: " + this.getNumPoints() + ")";
    }
}
exports.Group = Group;
//# sourceMappingURL=groups.js.map