import { XYZ, IModel, IGeom, IObj, ITopo, ITopoAttrib, IGroup } from "./ifaces_gs";
import { Kernel } from "./kernel";
import { ITopoPathData } from "./ifaces_json";
import { EGeomType } from "./enums";
/**
 * Topo class.
 * An abstrcat class that is the superclass for all topo components:
 * vertices, edges, wires, and faces.
 */
export declare abstract class Topo implements ITopo {
    protected _kernel: Kernel;
    protected _path: ITopoPathData;
    /**
     * Creates an instance of one of the subclasses of Topo.
     * The entity must already exists in the geometry.
     * You should not create new topo components using this constructor.
     * Topology will be created for you when you create geometric objects, such as polylines and polymeshes.
     * @param geom The Geom object to which the topo belongs.
     * @param path The path of the entity. This path must already exist in the geometry.
     * @return The Topo object.
     */
    constructor(kernel: Kernel, path: ITopoPathData);
    /**
     * Check if this entity exists in the model. (i.e has it been deleted?)
     * @return The entity ID number.
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
     * Get the ID of the object to which this topo component belongs.
     * @return The object ID number.
     */
    getObjID(): number;
    /**
     * Get the ID of the object to which this topo component belongs.
     * @return The object ID number.
     */
    getObj(): IObj;
    /**
     * Get the geometry type for this topo component.
     * This method mst be overridden by the sub-classes.
     * @return The geometry type.
     */
    getGeomType(): EGeomType;
    /**
     * Get the geometry path for this topo component.
     * @return The geometry path.
     */
    getTopoPath(): ITopoPathData;
    /**
     * Get a compact string representation of the geometry path for this topo component.
     * @return The geometry path str.
     */
    getTopoPathStr(): string;
    /**
     * Get the label of this topo.
     * @return The xyz of the centroid.
     */
    getLabel(): string;
    /**
     * Get the label centroid of this topo.
     * This is calculated as the average of the point positions for all points in the topo.
     * @return The xyz of the centroid.
     */
    getLabelCentroid(): XYZ;
    /**
     * Get the attributes for this topo component.
     * @return The array of attribute names.
     */
    getAttribs(): ITopoAttrib[];
    /**
     * Get an attribute value for this topo component.
     * @param attrib The topo attribute.
     * @return The attribute value.
     */
    getAttribValue(attrib: ITopoAttrib): any;
    /**
     * Set an attribute value for this topo component.
     * @param attrib The topo attribute.
     * @param value The new attribute value.
     * @return The old attribute value.
     */
    setAttribValue(attrib: ITopoAttrib, value: any): any;
    /**
     * Get the groups for which this topo component is a member.
     * @return The array of groups.
     */
    getGroups(): IGroup[];
    /**
     * Add this topo to a group.
     * @param group The group.
     * @return True if the topo was added, False is the topo was already in the group.
     */
    addToGroup(group: IGroup): boolean;
}
