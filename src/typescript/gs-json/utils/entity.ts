import {IEnt, IGeom, IModel} from "./ifaces_gs";
import {Kernel} from "./kernel";
import {EGeomType} from "./enums";

/**
 * Class Ent.
 * An abstrcat class that is the superclass for all geometric entities, both Point and Obj.
 * An entity may be part of a group and may have attributes.
 */
export abstract class Ent implements IEnt{
    protected _kernel: Kernel;
    protected _id: number;
    /**
     * Creates an instance of one of the subclasses of Ent.
     * The entity must already exists in the geometry.
     * Do not use this constructor if you want to add a new entity to the geometry.
     * For that, you should use one of the 'add' methods in the geometry class.
     * @param geom The Geom object to which the point belongs.
     * @param id The ID of the entity. This ID must already exist in the geometry.
     * @return The Ent object.
     */
    constructor(kernel: Kernel, id: number) {
        this._kernel = kernel;
        this._id = id;
    }

    //  This Entity --------------------------------------------------------------------------------

    /**
     * Get the ID number of this entity.
     * @return The entity ID number.
     */
    public getID(): number {
        return this._id;
    }

    /**
     * Get the Geom object that this entity belongs to.
     * @return A Geom object.
     */
    public getGeom(): IGeom {
        return this._kernel.getModel().getGeom();
    }

    /**
     * Get the Model object that this entity belongs to.
     * @return A Model object.
     */
    public getModel(): IModel {
        return this._kernel.getModel();
    }

    /**
     * Get the geometry type for this entity.
     * This method mst be overridden by the sub-classes.
     * @return The geometry type.
     */
    public getGeomType(): EGeomType {
        // Do not implement this method.
        throw new Error ("Method to be overridden by subclass.");
    }

    //  Attributes ---------------------------------------------------------------------------------

    /**
     * Get the attribute names for this entity.
     * @return The array of attribute names.
     */
    public getAttribNames(): string[] {
        return this._kernel.attribGetNames(this.getGeomType());
    }

    /**
     * Get an attribute value for this entity.
     * @param name The attribute name.
     * @return The attribute value.
     */
    public getAttribValue(name: string): any {
        return this._kernel.entAttribGetValue(name, this.getGeomType(), this._id);
    }

    /**
     * Set an attribute value for this entity.
     * @param name The attribute name.
     * @param value The new attribute value.
     * @return The old attribute value.
     */
    public setAttribValue(name: string, value: any): any {
        return this._kernel.entAttribSetValue(name, this.getGeomType(), this._id, value);
    }

}
