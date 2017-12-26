import {IGroup, ITopo} from "./ifaces_gs";
import {Kernel} from "./kernel";
import {ITopoPathData} from "./ifaces_json";
import {EGeomType, EObjType} from "./enums";
import {Vertex, Edge, Wire, Face} from "./topo_sub";
import {mapSTPathIndexToGeomType, mapTTPathIndexToGeomType} from "./enums";

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

    //  This group ---------------------------------------------------------------------------------

    /**
     * to be completed
     * @param
     * @return
     */
    public getName(): string {
        return this._name;
    }

    /**
     * to be completed
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
     * to be completed
     * @param
     * @return
     */
    public getParentGroup(): string {
        return this._kernel.groupGetParent(this._name);
    }
    /**
     * to be completed
     * @param
     * @return
     */
    public setParentGroup(name: string): string {
        return this._kernel.groupSetParent(this._name, name);
    }
    /**
     * to be completed
     * @param
     * @return
     */
    public removeParentGroup(): string {
        return this._kernel.groupSetParent(this._name, null);
    }
    /**
     * to be completed
     * @param
     * @return
     */
    public getChildGroups(): string[] {
        return this._kernel.groupGetChildren(this._name);
    }

    //  Objs ---------------------------------------------------------------------------------------

    /**
     * to be completed
     * @param
     * @return
     */
    public getObjIDs(obj_type?: EObjType): number[] {
        return this._kernel.groupGetObjIDs(this._name, obj_type);
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public addObj(id: number): boolean {
        return this._kernel.groupAddObj(this._name, id);
    }

    /**
     * to be completed
     *
     * @param
     * @return Returns true if all obj IDs were added, false otherwise.
     */
    public addObjs(ids: number[]): boolean {
        return this._kernel.groupAddObjs(this._name, ids);
    }
    /**
     * to be completed
     * @param
     * @return
     */
    public removeObj(id: number): boolean {
        return this._kernel.groupRemoveObj(this._name, id);
    }
    /**
     * to be completed
     * @param
     * @return
     */
    public removeObjs(ids: number[]): boolean {
        return this._kernel.groupRemoveObjs(this._name, ids);
    }
    /**
     * to be completed
     * @param
     * @return
     */
    public hasObj(id: number): boolean {
        return this._kernel.groupHasObj(this._name, id);
    }

    //  Topos --------------------------------------------------------------------------------------

    /**
     * to be completed
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
     * to be completed
     * @param
     * @return
     */
    public addTopo(topo: ITopo): void {
        const path: ITopoPathData = topo.getTopoPath(); // TODO
        return this._kernel.groupAddTopo(this._name, path);
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public addTopos(topos: ITopo[]): void {
        const paths: ITopoPathData[] = topos.map((p) => p.getTopoPath()); // TODO
        return this._kernel.groupAddTopos(this._name, paths);
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public removeTopo(topo: ITopo): boolean {
        const path: ITopoPathData = topo.getTopoPath(); // TODO
        return this._kernel.groupRemoveTopo(this._name, path);
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public removeTopos(topos: ITopo[]): boolean {
        const paths: ITopoPathData[] = topos.map((p) => p.getTopoPath()); // TODO
        return this._kernel.groupRemoveTopos(this._name, paths);
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public hasTopo(topo: ITopo): boolean {
        const path: ITopoPathData = topo.getTopoPath(); // TODO
        return this._kernel.groupHasTopo(this._name, path);
    }

    //  Points in this group -----------------------------------------------------------------------

    /**
     * to be completed
     * @param
     * @return
     */
    public getPointIDs(): number[] {
        return this._kernel.groupGetPointIDs(this._name);
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public addPoint(id: number): boolean {
        return this._kernel.groupAddPoint(this._name, id);
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public addPoints(ids: number[]): boolean {
        return this._kernel.groupAddPoints(this._name, ids);
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public removePoint(id: number): boolean {
        return this._kernel.groupRemovePoint(this._name, id);
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public removePoints(ids: number[]): boolean {
        return this._kernel.groupRemovePoints(this._name, ids);
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public hasPoint(id: number): boolean {
        return this._kernel.groupHasPoint(this._name, id);
    }

    //  Properties ---------------------------------------------------------------------------------

    /**
     * to be completed
     * @param
     * @return
     */
     // Map<string, any> { // TODO
    public getProps(): Array<[string, any]> {
        return this._kernel.groupGetProps(this._name);
    }

    /**
     * to be completed
     * @param
     * @return
     */
     // Map<string, any>): Map<string, any> { // TODO
    public setProps(props: Array<[string, any]>): Array<[string, any]> {
        return this._kernel.groupSetProps(this._name, props);
    }
}
