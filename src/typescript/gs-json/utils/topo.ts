import {ITopo, IGroup} from "./ifaces_gs";
import {Kernel} from "./kernel";
import {ITopoPathData} from "./ifaces_json";
import {EGeomType} from "./enums";
import {Group} from "./groups";

/**
 * Topo class.
 * An abstrcat class that is the superclass for all topological components:
 * vertices, edges, wires, and faces.
 */
export abstract class Topo implements ITopo {
    protected _kernel: Kernel;
    protected _path: ITopoPathData;
    /**
     * Creates an instance of one of the subclasses of Topo.
     * The entity must already exists in the geometry.
     * In general, you do not need to create topological components.
     * Topology will be created for you when you create geometric objects.
     * @param geom The Geom object to which the topo belongs.
     * @param path The path of the entity. This path must already exist in the geometry.
     * @return The Topo object.
     */
    constructor(kernel: Kernel, path: ITopoPathData) {
        this._kernel = kernel;
        this._path = path;
    }

    //  This topo ----------------------------------------------------------------------------------

    /**
     * Get the ID of the object to which this topological component belongs.
     * @return The object ID number.
     */
    public getObjID(): number {
        return this._path.id;
    }

    /**
     * Get the geometry type for this topological component.
     * This method mst be overridden by the sub-classes.
     * @return The geometry type.
     */
    public getGeomType(): EGeomType {
        // Do not implement this method.
        throw new Error ("Method to be overridden by subclass.");
    }

    /**
     * Get the geometry path for this topological component.
     * @return The geometry path.
     */
    public getTopoPath(): ITopoPathData {
        return this._path;
    }

    /**
     * Get a compact string representation of the geometry path for this topological component.
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
     * This is calculated as the average of the point positions.
     * @return The xyz of the centroid.
     */
    public getLabelCentroid(): number[] {
        // Do not implement this method.
        throw new Error ("Method to be overridden by subclass.");
    }

    //  Attributes ---------------------------------------------------------------------------------

    /**
     * Get the attribute names for this topological component.
     * @return The array of attribute names.
     */
    public getAttribNames(): string[] {
        return this._kernel.attribGetNames(this.getGeomType());
    }

    /**
     * Get an attribute value for this topological component.
     * @param name The attribute name.
     * @return The attribute value.
     */
    public getAttribValue(name: string): any {
        return this._kernel.topoAttribGetValue(name, this.getGeomType(), this._path);
    }

    /**
     * Set an attribute value for this topological component.
     * @param name The attribute name.
     * @param value The new attribute value.
     * @return The old attribute value.
     */
    public setAttribValue(name: string, value: any): any {
        return this._kernel.topoAttribSetValue(name, this.getGeomType(), this._path, value);
    }

    //  Groups -------------------------------------------------------------------------------------

    /**
     * Get the group names for all the groups for which this topological component is a member.
     * @return The array of groups.
     */
    public getGroups(): IGroup[] {
        const names: string[] = this._kernel.topoGetGroups(this._path);
        return names.map((name) => new Group(this._kernel, name));
    }
}
