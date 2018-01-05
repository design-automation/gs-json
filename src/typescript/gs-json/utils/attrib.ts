import {IAttrib} from "./ifaces_gs";
import {Kernel} from "./kernel";
import {ITopoPathData} from "./ifaces_json";
import {EGeomType, EDataType} from "./enums";

/**
 * Attrib abstract class.
 * An class that represents a semantic attribute.
 * An attribute is data that is attached to either:
 * entities (points and objects) or
 * topological components (vertices, edges, wires, faces).
 * An instance of this class stores a list of attributes values.
 */
export abstract class Attrib implements IAttrib {
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
    constructor(kernel: Kernel, name: string, geom_type: EGeomType) {
        this._kernel = kernel;
        this._name = name;
        this._geom_type = geom_type;
    }

    //  This attribute -----------------------------------------------------------------------------

    /**
     * Get the name of the attribute.
     * @return The name.
     */
    public getName(): string {
        return this._name;
    }

    /**
     * Set the geometry type for the attribute.
     * @return The geometry type.
     */
    public getGeomType(): EGeomType {
        return this._geom_type;
    }

    /**
     * Set the name of the attribute.
     * @param name The new name.
     * @return The old name.
     */
    public setName(name: string): string {
        const old_name: string = this._name;
        this._kernel.attribSetName(old_name, name, this._geom_type);
        this._name = name;
        return old_name;
    }

    /**
     * Set the data type for the attribute values.
     * @return The data type.
     */
    public getDataType(): EDataType {
        return this._kernel.attribGetDataType(this._name, this._geom_type);
    }

    /**
     * Get all the attribute values for this attribte.
     * @return The array of attribute values.
     */
    public getValues(): any[] {
        return this._kernel.attribGetValues(this._name, this._geom_type);
    }

    /**
     * Get all the attribute labels for this attribte.
     * @return The array of attribute labels.
     */
    public getLabels(): string[] {
        // Do not implement this method.
        throw new Error ("Method to be overridden by subclass.");
    }

    /**
     * Get the number of attribute values.
     * @return The number of attribute values.
     */
    public count(): number  {
        return this._kernel.attribCount(this._name, this._geom_type);
    }
}

