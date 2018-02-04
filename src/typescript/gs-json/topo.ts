import {XYZ, IModel, IGeom, IObj, ITopo, ITopoAttrib, IGroup} from "./ifaces_gs";
import {Kernel} from "./kernel";
import {ITopoPathData} from "./ifaces_json";
import {EGeomType} from "./enums";
import {Group} from "./groups";
import {TopoAttrib} from "./attrib_topoattrib";
import {_castToObjType} from "./entity_obj_cast";

/**
 * Topo class.
 * An abstrcat class that is the superclass for all topo components:
 * vertices, edges, wires, and faces.
 */
export abstract class Topo implements ITopo {
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
    constructor(kernel: Kernel, path: ITopoPathData) {
        this._kernel = kernel;
        this._path = path;
    }

    /**
     * Check if this entity exists in the model. (i.e has it been deleted?)
     * @return The entity ID number.
     */
    public exists(): boolean {
        return this._kernel.geomHasTopo(this._path);
    }

    /**
     * Get the model to which this group belongs.
     * @return The model
     */
    public getModel(): IModel {
        return this._kernel.getModel();
    }

    /**
     * Get the Geom object
     * @return The Model object
     */
    public getGeom(): IGeom {
        return this._kernel.getGeom();
    }

    //  This topo ----------------------------------------------------------------------------------

    /**
     * Get the ID of the object to which this topo component belongs.
     * @return The object ID number.
     */
    public getObjID(): number {
        return this._path.id;
    }

    /**
     * Get the ID of the object to which this topo component belongs.
     * @return The object ID number.
     */
    public getObj(): IObj {
        return _castToObjType(this._kernel, this._path.id);
    }

    /**
     * Get the geometry type for this topo component.
     * This method mst be overridden by the sub-classes.
     * @return The geometry type.
     */
    public getGeomType(): EGeomType {
        // Do not implement this method.
        throw new Error ("Method to be overridden by subclass.");
    }

    /**
     * Get the geometry path for this topo component.
     * @return The geometry path.
     */
    public getTopoPath(): ITopoPathData {
        return this._path;
    }

    /**
     * Get a compact string representation of the geometry path for this topo component.
     * @return The geometry path str.
     */
    public getTopoPathStr(): string {
        // Do not implement this method.
        throw new Error ("Method to be overridden by subclass.");
    }

    /**
     * Get the label of this topo.
     * @return The xyz of the centroid.
     */
    public getLabel(): string {
        return this.getTopoPathStr();
    }

    /**
     * Get the label centroid of this topo.
     * This is calculated as the average of the point positions for all points in the topo.
     * @return The xyz of the centroid.
     */
    public getLabelCentroid(): XYZ {
        // Do not implement this method.
        throw new Error ("Method to be overridden by subclass.");
    }

    //  Attributes ---------------------------------------------------------------------------------

    /**
     * Get the attributes for this topo component.
     * @return The array of attribute names.
     */
    public getAttribs(): ITopoAttrib[] {
        const geom_type: EGeomType = this.getGeomType();
        const names: string[] = this._kernel.attribGetNames(this.getGeomType());
        return names.map((name) => new TopoAttrib(this._kernel, name, geom_type));
    }

    /**
     * Get an attribute value for this topo component.
     * @param attrib The topo attribute.
     * @return The attribute value.
     */
    public getAttribValue(attrib: ITopoAttrib): any {
        if (attrib.getGeomType() !== this.getGeomType()) {return null;}
        return this._kernel.topoAttribGetValue(attrib.getName(), attrib.getGeomType(), this._path);
    }

    /**
     * Set an attribute value for this topo component.
     * @param attrib The topo attribute.
     * @param value The new attribute value.
     * @return The old attribute value.
     */
    public setAttribValue(attrib: ITopoAttrib, value: any): any {
        if (attrib.getGeomType() !== this.getGeomType()) {return null;}
        return this._kernel.topoAttribSetValue(attrib.getName(), attrib.getGeomType(), this._path, value);
    }

    //  Groups -------------------------------------------------------------------------------------

    /**
     * Get the groups for which this topo component is a member.
     * @return The array of groups.
     */
    public getGroups(): IGroup[] {
        const names: string[] = this._kernel.topoGetGroups(this._path);
        return names.map((name) => new Group(this._kernel, name));
    }

    /**
     * Add this topo to a group.
     * @param group The group.
     * @return True if the topo was added, False is the topo was already in the group.
     */
    public addToGroup(group: IGroup): boolean {
        // return this._kernel.groupAddTopo(group.getName(), this._path);
        // TODO
        throw new Error("Method not implemented");
    }
}
