"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attrib_cast_1 = require("./attrib_cast");
/**
 * Class Ent.
 * An abstrcat class that is the superclass for all geometric entities, both Point and Obj.
 * An entity may be part of a group and may have attributes.
 */
class Ent {
    /**
     * Creates an instance of one of the subclasses of Ent.
     * The entity must already exists in the geometry.
     * Do not use this constructor if you want to add a new entity to the geometry.
     * For that, you should use one of the 'add' methods in the geometry class.
     * @param geom The Geom object to which the point belongs.
     * @param id The ID of the entity. This ID must already exist in the geometry.
     * @return The Ent object.
     */
    constructor(kernel, id) {
        this._kernel = kernel;
        this._id = id;
    }
    /**
     * Get the Model object that this entity belongs to.
     * @return A Model object.
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
    //  This Entity --------------------------------------------------------------------------------
    /**
     * Get the ID number of this entity.
     * @return The entity ID number.
     */
    getID() {
        return this._id;
    }
    /**
     * Check if this entity exists in the model. (i.e has it been deleted?)
     * @return The entity ID number.
     */
    exists() {
        // Do not implement this method.
        throw new Error("Method to be overridden by subclass.");
    }
    /**
     * Get the geometry type for this entity.
     * This method must be overridden by the sub-classes.
     * @return The geometry type.
     */
    getGeomType() {
        // Do not implement this method.
        throw new Error("Method to be overridden by subclass.");
    }
    /**
     * Get the label for this entity.
     * This method must be overridden by the sub-classes.
     * @return The geometry type.
     */
    getLabel() {
        // Do not implement this method.
        throw new Error("Method to be overridden by subclass.");
    }
    /**
     * Get the label centroid for this entity.
     * This method must be overridden by the sub-classes.
     * @return The geometry type.
     */
    getLabelCentroid() {
        // Do not implement this method.
        throw new Error("Method to be overridden by subclass.");
    }
    /**
     * Make a copy of this entity.
     * This method must be overridden by the sub-classes.
     * @return The geometry type.
     */
    copy(copy_attribs) {
        // Do not implement this method.
        throw new Error("Method to be overridden by subclass.");
    }
    /**
     * Transform points.
     * This method must be overridden by the sub-classes.
     * @param matrix The xform matrix.
     */
    xform(matrix) {
        // Do not implement this method.
        throw new Error("Method to be overridden by subclass.");
    }
    //  Attributes ---------------------------------------------------------------------------------
    /**
     * Get the attribute names for this entity.
     * @return The array of attribute names.
     */
    getAttribs() {
        const geom_type = this.getGeomType();
        const names = this._kernel.attribGetNames(geom_type);
        return attrib_cast_1._castToAttribTypes(this._kernel, geom_type, names);
    }
    /**
     * Get an attribute value for this entity.
     * @param attrib The attribute.
     * @return The attribute value.
     */
    getAttribValue(attrib) {
        if (attrib.getGeomType() !== this.getGeomType()) {
            return null;
        }
        return this._kernel.entAttribGetValue(attrib.getName(), attrib.getGeomType(), this._id);
    }
    /**
     * Set an attribute value for this entity.
     * @param attrib The attribute.
     * @param value The new attribute value.
     * @return The old attribute value.
     */
    setAttribValue(attrib, value) {
        if (attrib.getGeomType() !== this.getGeomType()) {
            return null;
        }
        return this._kernel.entAttribSetValue(attrib.getName(), attrib.getGeomType(), this._id, value);
    }
    //  Groups -------------------------------------------------------------------------------------
    /**
     * Get the groups for all the groups for which this entity is a member.
     * This method must be overridden by the sub-classes.
     * @return The array of group names.
     */
    getGroups() {
        // Do not implement this method.
        throw new Error("Method to be overridden by subclass.");
    }
    /**
     * Add this object to a group.
     * This method must be overridden by the sub-classes.
     * @param group The group.
     * @return True if the entity was added, False is the object was already in the group.
     */
    addToGroup(group) {
        // Do not implement this method.
        throw new Error("Method to be overridden by subclass.");
    }
    //  toString -------------------------------------------------------------------------------------
    /**
     * Create s string representation of this object.
     * This method must be overridden by the sub-classes.
     * @return Strig
     */
    toString() {
        // Do not implement this method.
        throw new Error("Method to be overridden by subclass.");
    }
}
exports.Ent = Ent;
//# sourceMappingURL=entity.js.map