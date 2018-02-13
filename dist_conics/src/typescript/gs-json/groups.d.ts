import { IModel, IGeom, IGroup, ITopo, IPoint, IObj } from "./ifaces_gs";
import { Kernel } from "./kernel";
import { EGeomType, EObjType } from "./enums";
/**
 * Group class.
 */
export declare class Group implements IGroup {
    private _kernel;
    private _name;
    /**
     * Creates an instance of the Group class.
     * The group data must already exists in the model.
     * Do not use this constructor if you want to add a new group to the model.
     * Instead, you should use the "addGroup()" methdod in the model class.
     * @param model The Model object in which this attribute will be created.
     * @param data The attribute data in the model.
     * @return The Group object.
     */
    constructor(kernel: Kernel, name: string);
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
     * Get the group name, which is its main identifier. Kust be unque.
     * @param
     * @return
     */
    getName(): string;
    /**
     * Rename the group.
     * @param
     * @return
     */
    setName(name: string): string;
    /**
     * Ge the parent group of this group. Each group can only have one parent.
     * @param
     * @return
     */
    getParentGroup(): IGroup;
    /**
     * Set teh parent groupof this group.
     * @param
     * @return
     */
    setParentGroup(group: IGroup): IGroup;
    /**
     * Remove the parent group of this group. This will result in this group having no parent.
     * A group with no parent is a top level group
     * @param
     * @return
     */
    removeParentGroup(): IGroup;
    /**
     * Get the children groups of this group.
     * Each group can have multiple chilren groups.
     * @param
     * @return
     */
    getChildGroups(): IGroup[];
    /**
     * Get the number of objs in this group.
     * @param
     * @return
     */
    getNumObjs(obj_type?: EObjType): number;
    /**
     * Get the object in this group.
     * @param
     * @return
     */
    getObjs(obj_type?: EObjType): IObj[];
    /**
     * Add an object to this group.
     * @param
     * @return
     */
    addObj(obj: IObj): boolean;
    /**
     * Add multiple object to this group.
     *
     * @param
     * @return Returns true if all obj IDs were added, false otherwise.
     */
    addObjs(objs: IObj[]): boolean;
    /**
     * Remove an object from this group.
     * @param
     * @return
     */
    removeObj(obj: IObj): boolean;
    /**
     * Remove multiple objects from this group.
     * @param
     * @return
     */
    removeObjs(objs: IObj[]): boolean;
    /**
     * Check if an object is in this group.
     * @param
     * @return
     */
    hasObj(obj: IObj): boolean;
    /**
     * Get the number of topos in this group.
     * @param
     * @return
     */
    getNumTopos(geom_type?: EGeomType): number;
    /**
     * Get the topos in this group. (Vertices, edges, wires, faces.)
     * @param
     * @return
     */
    getTopos(geom_type?: EGeomType): ITopo[];
    /**
     * Add a topo to this group. (Vertices, edges, wires, faces.)
     * @param
     * @return
     */
    addTopo(topo: ITopo): boolean;
    /**
     * Add multiple topos to this group. (Vertices, edges, wires, faces.)
     * @param
     * @return
     */
    addTopos(topos: ITopo[]): boolean;
    /**
     * Remove a topo from this group. (Vertices, edges, wires, faces.)
     * @param
     * @return
     */
    removeTopo(topo: ITopo): boolean;
    /**
     * Remove multiple topos from this group. (Vertices, edges, wires, faces.)
     * @param
     * @return
     */
    removeTopos(topos: ITopo[]): boolean;
    /**
     * Check if a topo is in this group. (Vertices, edges, wires, faces.)
     * @param
     * @return
     */
    hasTopo(topo: ITopo): boolean;
    /**
     * Get the number of points in this group.
     * @param
     * @return
     */
    getNumPoints(): number;
    /**
     * Get the points in this group.
     * @param
     * @return
     */
    getPoints(): IPoint[];
    /**
     * Add a point to this group.
     * @param
     * @return
     */
    addPoint(point: IPoint): boolean;
    /**
     * Add multiple points to this group.
     * @param
     * @return
     */
    addPoints(points: IPoint[]): boolean;
    /**
     * Remove a point from this group.
     * @param
     * @return
     */
    removePoint(point: IPoint): boolean;
    /**
     * Remove multiple points from this group.
     * @param
     * @return
     */
    removePoints(points: IPoint[]): boolean;
    /**
     * Check if a point is in this group.
     * @param
     * @return
     */
    hasPoint(point: IPoint): boolean;
    /**
     * Get the properties of this group. This returns an array of key: value pairs.
     * @param
     * @return
     */
    getProps(): Array<[string, any]>;
    /**
     * Set the properties of this group. The value must be an array of key: value pairs.
     * @param
     * @return
     */
    setProps(props: Array<[string, any]>): Array<[string, any]>;
    /**
     * Create s string representation of this point.
     * @return String
     */
    toString(): string;
}
