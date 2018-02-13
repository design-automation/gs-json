import { IModel, IGeom, IAttrib } from "./ifaces_gs";
import { Kernel } from "./kernel";
import { EGeomType, EDataType } from "./enums";
/**
 * Attrib abstract class.
 * An class that represents a semantic attribute.
 * An attribute is data that is attached to either:
 * entities (points and objects) or
 * topological components (vertices, edges, wires, faces).
 * An instance of this class stores a list of attributes values.
 */
export declare abstract class Attrib implements IAttrib {
    protected _kernel: Kernel;
    protected _name: string;
    protected _geom_type: EGeomType;
    /**
     * Creates an instance of the Attrib class.
     * The attribute data must already exists in the model.
     * Do not use this constructor if you want to add a new attribute to the model.
     * Instead, you should use the "addAttrib()" methdod in the model class.
     * @param model The Model object in which this attribute will be created.
     * @param data The attribute data in the model.
     * @return The Attrib object.
     */
    constructor(kernel: Kernel, name: string, geom_type: EGeomType);
    /**
     * Check if this group exists
     * @return The model
     */
    exists(): boolean;
    /**
     * Get the model to which this group belongs.
     * @return The model
     */
    getModel(): IModel;
    /**
     * Get the Geom object
     * @return The Model object
     */
    getGeom(): IGeom;
    /**
     * Get the name of the attribute.
     * @return The name.
     */
    getName(): string;
    /**
     * Set the geometry type for the attribute.
     * @return The geometry type.
     */
    getGeomType(): EGeomType;
    /**
     * Set the name of the attribute.
     * @param name The new name.
     * @return The old name.
     */
    setName(name: string): string;
    /**
     * Set the data type for the attribute values.
     * @return The data type.
     */
    getDataType(): EDataType;
    /**
     * Get all the attribute values for this attribte.
     * @return The array of attribute values.
     */
    getValues(): any[];
    /**
     * Get all the attribute labels for this attribte.
     * @return The array of attribute labels.
     */
    getLabels(): string[];
    /**
     * Get the number of attribute values.
     * @return The number of attribute values.
     */
    count(): number;
}
