"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const groups_1 = require("./groups");
const attrib_topoattrib_1 = require("./attrib_topoattrib");
const entity_obj_cast_1 = require("./entity_obj_cast");
/**
 * Topo class.
 * An abstrcat class that is the superclass for all topo components:
 * vertices, edges, wires, and faces.
 */
class Topo {
    /**
     * Creates an instance of one of the subclasses of Topo.
     * The entity must already exists in the geometry.
     * You should not create new topo components using this constructor.
     * Topology will be created for you when you create geometric objects, such as polylines and polymeshes.
     * @param geom The Geom object to which the topo belongs.
     * @param path The path of the entity. This path must already exist in the geometry.
     * @return The Topo object.
     */
    constructor(kernel, path) {
        this._kernel = kernel;
        this._path = path;
    }
    /**
     * Check if this entity exists in the model. (i.e has it been deleted?)
     * @return The entity ID number.
     */
    exists() {
        return this._kernel.geomHasTopo(this._path);
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
    //  This topo ----------------------------------------------------------------------------------
    /**
     * Get the ID of the object to which this topo component belongs.
     * @return The object ID number.
     */
    getObjID() {
        return this._path.id;
    }
    /**
     * Get the ID of the object to which this topo component belongs.
     * @return The object ID number.
     */
    getObj() {
        return entity_obj_cast_1._castToObjType(this._kernel, this._path.id);
    }
    /**
     * Get the geometry type for this topo component.
     * This method mst be overridden by the sub-classes.
     * @return The geometry type.
     */
    getGeomType() {
        // Do not implement this method.
        throw new Error("Method to be overridden by subclass.");
    }
    /**
     * Get the geometry path for this topo component.
     * @return The geometry path.
     */
    getTopoPath() {
        return this._path;
    }
    /**
     * Get a compact string representation of the geometry path for this topo component.
     * @return The geometry path str.
     */
    getTopoPathStr() {
        // Do not implement this method.
        throw new Error("Method to be overridden by subclass.");
    }
    /**
     * Get the label of this topo.
     * @return The xyz of the centroid.
     */
    getLabel() {
        return this.getTopoPathStr();
    }
    /**
     * Get the label centroid of this topo.
     * This is calculated as the average of the point positions for all points in the topo.
     * @return The xyz of the centroid.
     */
    getLabelCentroid() {
        // Do not implement this method.
        throw new Error("Method to be overridden by subclass.");
    }
    //  Attributes ---------------------------------------------------------------------------------
    /**
     * Get the attributes for this topo component.
     * @return The array of attribute names.
     */
    getAttribs() {
        const geom_type = this.getGeomType();
        const names = this._kernel.attribGetNames(this.getGeomType());
        return names.map((name) => new attrib_topoattrib_1.TopoAttrib(this._kernel, name, geom_type));
    }
    /**
     * Get an attribute value for this topo component.
     * @param attrib The topo attribute.
     * @return The attribute value.
     */
    getAttribValue(attrib) {
        if (attrib.getGeomType() !== this.getGeomType()) {
            return null;
        }
        return this._kernel.topoAttribGetValue(attrib.getName(), attrib.getGeomType(), this._path);
    }
    /**
     * Set an attribute value for this topo component.
     * @param attrib The topo attribute.
     * @param value The new attribute value.
     * @return The old attribute value.
     */
    setAttribValue(attrib, value) {
        if (attrib.getGeomType() !== this.getGeomType()) {
            return null;
        }
        return this._kernel.topoAttribSetValue(attrib.getName(), attrib.getGeomType(), this._path, value);
    }
    //  Groups -------------------------------------------------------------------------------------
    /**
     * Get the groups for which this topo component is a member.
     * @return The array of groups.
     */
    getGroups() {
        const names = this._kernel.topoGetGroups(this._path);
        return names.map((name) => new groups_1.Group(this._kernel, name));
    }
    /**
     * Add this topo to a group.
     * @param group The group.
     * @return True if the topo was added, False is the topo was already in the group.
     */
    addToGroup(group) {
        // return this._kernel.groupAddTopo(group.getName(), this._path);
        // TODO
        throw new Error("Method not implemented");
    }
}
exports.Topo = Topo;
//# sourceMappingURL=topo.js.map