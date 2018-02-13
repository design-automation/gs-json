"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Attrib abstract class.
 * An class that represents a semantic attribute.
 * An attribute is data that is attached to either:
 * entities (points and objects) or
 * topological components (vertices, edges, wires, faces).
 * An instance of this class stores a list of attributes values.
 */
class Attrib {
    /**
     * Creates an instance of the Attrib class.
     * The attribute data must already exists in the model.
     * Do not use this constructor if you want to add a new attribute to the model.
     * Instead, you should use the "addAttrib()" methdod in the model class.
     * @param model The Model object in which this attribute will be created.
     * @param data The attribute data in the model.
     * @return The Attrib object.
     */
    constructor(kernel, name, geom_type) {
        this._kernel = kernel;
        this._name = name;
        this._geom_type = geom_type;
    }
    /**
     * Check if this group exists
     * @return The model
     */
    exists() {
        return this._kernel.modelGetAttrib(this._name, this._geom_type) === undefined;
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
    //  This attribute -----------------------------------------------------------------------------
    /**
     * Get the name of the attribute.
     * @return The name.
     */
    getName() {
        return this._name;
    }
    /**
     * Set the geometry type for the attribute.
     * @return The geometry type.
     */
    getGeomType() {
        return this._geom_type;
    }
    /**
     * Set the name of the attribute.
     * @param name The new name.
     * @return The old name.
     */
    setName(name) {
        const old_name = this._name;
        this._kernel.attribSetName(old_name, name, this._geom_type);
        this._name = name;
        return old_name;
    }
    /**
     * Set the data type for the attribute values.
     * @return The data type.
     */
    getDataType() {
        return this._kernel.attribGetDataType(this._name, this._geom_type);
    }
    /**
     * Get all the attribute values for this attribte.
     * @return The array of attribute values.
     */
    getValues() {
        return this._kernel.attribGetValues(this._name, this._geom_type);
    }
    /**
     * Get all the attribute labels for this attribte.
     * @return The array of attribute labels.
     */
    getLabels() {
        // Do not implement this method.
        throw new Error("Method to be overridden by subclass.");
    }
    /**
     * Get the number of attribute values.
     * @return The number of attribute values.
     */
    count() {
        return this._kernel.attribCount(this._name, this._geom_type);
    }
}
exports.Attrib = Attrib;
//# sourceMappingURL=attrib.js.map