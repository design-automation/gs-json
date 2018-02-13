import * as three from "three";
import { XYZ, IPoint, IVertex, IGroup } from "./ifaces_gs";
import { EGeomType } from "./enums";
import { Ent } from "./entity";
/**
 * Class Point.
 * A point with x, y, z coordinates.
 * A point may be part of a group and may have attributes.
 */
export declare class Point extends Ent implements IPoint {
    /**
     * Check if this entity exists in the model. (i.e has it been deleted?)
     * @return The entity ID number.
     */
    exists(): boolean;
    /**
     * Get the geometry type for this entity.
     * This method overrides the method in the Ent class.
     * @return The geometry type.
     */
    getGeomType(): EGeomType;
    /**
     * Set the cartesian x,y,z coordinates of a point.
     * @param xyz Cartesian coordinates
     * @return Arrays of pre-defined coordinates
     */
    setPosition(xyz: XYZ): XYZ;
    /**
     * Get the cartesian x, y, z coordinates of a point.
     * @return Returns an array that contains the x, y, z coordinates
     */
    getPosition(): XYZ;
    /**
     * Get all the vertices linked to a point or a set of points.
     * @return Returns the array of vertices.
     */
    getVertices(): IVertex[];
    /**
     * Get the label of this point.
     * @return The xyz of the centroid.
     */
    getLabel(): string;
    /**
     * Get the label centroid of this points.
     * @return The xyz of the label.
     */
    getLabelCentroid(): XYZ;
    /**
     * Make a copy of this entity.
     * This method must be overridden by the sub-classes.
     * @return The geometry type.
     */
    copy(copy_attribs?: boolean): IPoint;
    /**
     * Transform the points for this object.
     * @param matrix The xform matrix.
     */
    xform(matrix: three.Matrix4): void;
    /**
     * Get the group names for all the groups for which this entity is a member.
     * @return The array of group names.
     */
    getGroups(): IGroup[];
    /**
     * Add this entity to a group.
     * @param name The group name.
     * @return True if the entity was added, False is the entity was already in the group.
     */
    addToGroup(group: IGroup): boolean;
    /**
     * Create s string representation of this point.
     * @return String
     */
    toString(): string;
}
