import {IModel, IGeom, IGroup, ITopo, IPoint, IObj} from "./ifaces_gs";
import {Kernel} from "./kernel";
import {ITopoPathData} from "./ifaces_json";
import {EGeomType, EObjType} from "./enums";
import {Vertex, Edge, Wire, Face} from "./topo_sub";
import {mapSTPathIndexToGeomType, mapTTPathIndexToGeomType} from "./enums";
import {Point} from "./entity_point";
import {_castToObjType} from "./entity_obj_cast";
/**
 * Group class.
 */
export class Group implements IGroup {
    private _kernel: Kernel;
    private _name: string;

    /**
     * Creates an instance of the Group class.
     * The group data must already exists in the model.
     * Do not use this constructor if you want to add a new group to the model.
     * Instead, you should use the "addGroup()" methdod in the model class.
     * @param model The Model object in which this attribute will be created.
     * @param data The attribute data in the model.
     * @return The Group object.
     */
    constructor(kernel: Kernel, name: string) {
        this._kernel = kernel;
        this._name = name;
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

    //  This group ---------------------------------------------------------------------------------

    /**
     * Get the group name, which is its main identifier. Kust be unque.
     * @param
     * @return
     */
    public getName(): string {
        return this._name;
    }

    /**
     * Rename the group.
     * @param
     * @return
     */
    public setName(name: string): string {
        const old_name: string = this._name;
        this._kernel.groupSetName(old_name, name);
        this._name = name;
        return old_name;
    }

    /**
     * Ge the parent group of this group. Each group can only have one parent.
     * @param
     * @return
     */
    public getParentGroup(): IGroup {
        const name: string = this._kernel.groupGetParent(this._name);
        return new Group(this._kernel, name);
    }
    /**
     * Set teh parent groupof this group.
     * @param
     * @return
     */
    public setParentGroup(group: IGroup): IGroup {
        const name: string = this._kernel.groupSetParent(this._name, group.getName());
        return new Group(this._kernel, name);
    }
    /**
     * Remove the parent group of this group. This will result in this group having no parent.
     * A group with no parent is a top level group
     * @param
     * @return
     */
    public removeParentGroup(): IGroup {
        const name: string = this._kernel.groupSetParent(this._name, null);
        return new Group(this._kernel, name);
    }
    /**
     * Get the children groups of this group.
     * Each group can have multiple chilren groups.
     * @param
     * @return
     */
    public getChildGroups(): IGroup[] {
        return this._kernel.groupGetChildren(this._name).map((v) => new Group(this._kernel, v));
    }

    //  Objs ---------------------------------------------------------------------------------------

    /**
     * Get the object in this group.
     * @param
     * @return
     */
    public getObjs(obj_type?: EObjType): IObj[] {
        return this._kernel.groupGetObjIDs(this._name, obj_type).map((id) => _castToObjType(this._kernel, id));
    }

    /**
     * Add an object to this group.
     * @param
     * @return
     */
    public addObj(obj: IObj): boolean {
        return this._kernel.groupAddObj(this._name, obj.getID());
    }

    /**
     * Add multiple object to this group.
     *
     * @param
     * @return Returns true if all obj IDs were added, false otherwise.
     */
    public addObjs(objs: IObj[]): boolean {
        return this._kernel.groupAddObjs(this._name, objs.map((v) => v.getID()));
    }
    /**
     * Remove an object from this group.
     * @param
     * @return
     */
    public removeObj(obj: IObj): boolean {
        return this._kernel.groupRemoveObj(this._name, obj.getID());
    }
    /**
     * Remove multiple objects from this group.
     * @param
     * @return
     */
    public removeObjs(objs: IObj[]): boolean {
        return this._kernel.groupRemoveObjs(this._name, objs.map((v) => v.getID()));
    }
    /**
     * Check if an object is in this group.
     * @param
     * @return
     */
    public hasObj(obj: IObj): boolean {
        return this._kernel.groupHasObj(this._name, obj.getID());
    }

    //  Topos --------------------------------------------------------------------------------------

    /**
     * Get the topos in this group. (Vertices, edges, wires, faces.)
     * @param
     * @return
     */
    public getTopos(geom_type?: EGeomType): ITopo[] {
        const paths: ITopoPathData[] = this._kernel.groupGetTopos(this._name, geom_type);
        const topos: ITopo[] = [];
        for (const path of paths) {
            const path_tt = mapTTPathIndexToGeomType.get(path.tt);
            const path_st = mapSTPathIndexToGeomType.get(path.st);
            switch (path_st) {
                case EGeomType.vertices:
                    topos.push(new Vertex(this._kernel, path));
                    break;
                case EGeomType.edges:
                    topos.push(new Edge(this._kernel, path));
                    break;
                default:
                    switch (path_tt) {
                        case EGeomType.wires:
                            topos.push(new Wire(this._kernel, path));
                            break;
                        case EGeomType.faces:
                            topos.push(new Face(this._kernel, path));
                            break;
                    }
                    break;
            }
        }
        return topos;
    }

    /**
     * Add a topo to this group. (Vertices, edges, wires, faces.)
     * @param
     * @return
     */
    public addTopo(topo: ITopo): void {
        const path: ITopoPathData = topo.getTopoPath(); // TODO
        return this._kernel.groupAddTopo(this._name, path);
    }

    /**
     * Add multiple topos to this group. (Vertices, edges, wires, faces.)
     * @param
     * @return
     */
    public addTopos(topos: ITopo[]): void {
        const paths: ITopoPathData[] = topos.map((p) => p.getTopoPath()); // TODO
        return this._kernel.groupAddTopos(this._name, paths);
    }

    /**
     * Remove a topo from this group. (Vertices, edges, wires, faces.)
     * @param
     * @return
     */
    public removeTopo(topo: ITopo): boolean {
        const path: ITopoPathData = topo.getTopoPath(); // TODO
        return this._kernel.groupRemoveTopo(this._name, path);
    }

    /**
     * Remove multiple topos from this group. (Vertices, edges, wires, faces.)
     * @param
     * @return
     */
    public removeTopos(topos: ITopo[]): boolean {
        const paths: ITopoPathData[] = topos.map((p) => p.getTopoPath()); // TODO
        return this._kernel.groupRemoveTopos(this._name, paths);
    }

    /**
     * Check if a topo is in this group. (Vertices, edges, wires, faces.)
     * @param
     * @return
     */
    public hasTopo(topo: ITopo): boolean {
        const path: ITopoPathData = topo.getTopoPath(); // TODO
        return this._kernel.groupHasTopo(this._name, path);
    }

    //  Points in this group -----------------------------------------------------------------------

    /**
     * Get the points in this group.
     * @param
     * @return
     */
    public getPoints(): IPoint[] {
        return this._kernel.groupGetPointIDs(this._name).map((v) => new Point(this._kernel, v));
    }

    /**
     * Add a point to this group.
     * @param
     * @return
     */
    public addPoint(point: IPoint): boolean {
        return this._kernel.groupAddPoint(this._name, point.getID());
    }

    /**
     * Add multiple points to this group.
     * @param
     * @return
     */
    public addPoints(points: IPoint[]): boolean {
        return this._kernel.groupAddPoints(this._name, points.map((v) => v.getID()));
    }

    /**
     * Remove a point from this group.
     * @param
     * @return
     */
    public removePoint(point: IPoint): boolean {
        return this._kernel.groupRemovePoint(this._name, point.getID());
    }

    /**
     * Remove multiple points from this group.
     * @param
     * @return
     */
    public removePoints(points: IPoint[]): boolean {
        return this._kernel.groupRemovePoints(this._name, points.map((v) => v.getID()));
    }

    /**
     * Check if a point is in this group.
     * @param
     * @return
     */
    public hasPoint(point: IPoint): boolean {
        return this._kernel.groupHasPoint(this._name, point.getID());
    }

    //  Properties ---------------------------------------------------------------------------------

    /**
     * Get the properties of this group. This returns an array of key: value pairs.
     * @param
     * @return
     */
     // Map<string, any> { // TODO
    public getProps(): Array<[string, any]> {
        return this._kernel.groupGetProps(this._name);
    }

    /**
     * Set the properties of this group. The value must be an array of key: value pairs.
     * @param
     * @return
     */
     // Map<string, any>): Map<string, any> { // TODO
    public setProps(props: Array<[string, any]>): Array<[string, any]> {
        return this._kernel.groupSetProps(this._name, props);
    }
}
