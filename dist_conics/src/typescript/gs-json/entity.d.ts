import { IEnt, IGeom, IModel, IEntAttrib, ITopoAttrib, IGroup, XYZ } from "./ifaces_gs";
import { Kernel } from "./kernel";
import { EGeomType } from "./enums";
import * as three from "three";
/**
 * Class Ent.
 * An abstrcat class that is the superclass for all geometric entities, both Point and Obj.
 * An entity may be part of a group and may have attributes.
 */
export declare abstract class Ent implements IEnt {
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
    constructor(kernel: Kernel, id: number);
    /**
     * Get the Model object that this entity belongs to.
     * @return A Model object.
     */
    getModel(): IModel;
    /**
     * Get the Geom object
     * @return The Model object
     */
    getGeom(): IGeom;
    /**
     * Get the ID number of this entity.
     * @return The entity ID number.
     */
    getID(): number;
    /**
     * Check if this entity exists in the model. (i.e has it been deleted?)
     * @return The entity ID number.
     */
    exists(): boolean;
    /**
     * Get the geometry type for this entity.
     * This method must be overridden by the sub-classes.
     * @return The geometry type.
     */
    getGeomType(): EGeomType;
    /**
     * Get the label for this entity.
     * This method must be overridden by the sub-classes.
     * @return The geometry type.
     */
    getLabel(): string;
    /**
     * Get the label centroid for this entity.
     * This method must be overridden by the sub-classes.
     * @return The geometry type.
     */
    getLabelCentroid(): XYZ;
    /**
     * Make a copy of this entity.
     * This method must be overridden by the sub-classes.
     * @return The geometry type.
     */
    copy(copy_attribs: boolean): IEnt;
    /**
     * Transform points.
     * This method must be overridden by the sub-classes.
     * @param matrix The xform matrix.
     */
    xform(matrix: three.Matrix4): void;
    /**
     * Get the attribute names for this entity.
     * @return The array of attribute names.
     */
    getAttribs(): IEntAttrib[] | ITopoAttrib[];
    /**
     * Get an attribute value for this entity.
     * @param attrib The attribute.
     * @return The attribute value.
     */
    getAttribValue(attrib: IEntAttrib): any;
    /**
     * Set an attribute value for this entity.
     * @param attrib The attribute.
     * @param value The new attribute value.
     * @return The old attribute value.
     */
    setAttribValue(attrib: IEntAttrib, value: any): any;
    /**
     * Get the groups for all the groups for which this entity is a member.
     * This method must be overridden by the sub-classes.
     * @return The array of group names.
     */
    getGroups(): IGroup[];
    /**
     * Add this object to a group.
     * This method must be overridden by the sub-classes.
     * @param group The group.
     * @return True if the entity was added, False is the object was already in the group.
     */
    addToGroup(group: IGroup): boolean;
    /**
     * Create s string representation of this object.
     * This method must be overridden by the sub-classes.
     * @return Strig
     */
    toString(): string;
}
