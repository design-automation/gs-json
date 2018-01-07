import {IModel, IGeom, IGroup, IAttrib, IEntAttrib, ITopoAttrib} from "./ifaces_gs";
import {Kernel} from "./kernel";
import {IModelData,  IAttribData, IGroupData} from "./ifaces_json";
import {EGeomType, EDataType, mapStringToGeomType} from "./enums";
import {Geom} from "./geom";
import {EntAttrib} from "./attrib_entattrib";
import {TopoAttrib} from "./attrib_topoattrib";
import {Group} from "./groups";
/**
 * Model Class
 */
export class Model implements IModel {
    private _kernel: Kernel;

    /**
     * Creates a new model.
     * @param
     * @return
     */
    constructor(data?: IModelData) {
        this._kernel = new Kernel(this, data);
    }

    //  Geom ---------------------------------------------------------------------------------------

    /**
     * Get the geom objct from the model.
     * @param
     * @return
     */
    public getGeom(): IGeom {
        return new Geom(this._kernel);
    }

    //  Attributes ---------------------------------------------------------------------------------

    /**
     * Find all attributes in the model for a geom_type.
     * @param
     * @return
     */
    public findAttribs(geom_type: EGeomType): IEntAttrib[]|ITopoAttrib[] {
        const attribs_data: IAttribData[] = this._kernel.modelFindAttribs(geom_type);
        switch (geom_type) {
            case EGeomType.points: case EGeomType.objs:
                const ent_attribs: IEntAttrib[] = [];
                for (const data of attribs_data) {
                    ent_attribs.push(new EntAttrib(this._kernel, data.name, geom_type));
                }
                return ent_attribs;
            default: // topo attribs
                const topo_attribs: ITopoAttrib[] = [];
                for (const data of attribs_data) {
                    topo_attribs.push(new TopoAttrib(this._kernel, data.name, geom_type));
                }
                return topo_attribs;
        }
    }

    /**
     * Returns all attributes in the model. A nested array is return containing
     * an array of entity attributes, and
     * an array of topo attributes
     * @param
     * @return
     */
    public getAllAttribs(): [IEntAttrib[],ITopoAttrib[]]  {
        return [this.getAllEntAttribs(), this.getAllTopoAttribs()];
    }

    /**
     * Returns one entity attribute in the model, or null if it does not exist.
     * @param
     * @return
     */
    public getEntAttrib(name: string, geom_type: EGeomType): IEntAttrib {
        if (geom_type !== EGeomType.points && geom_type !== EGeomType.objs) {return null;}
        if (this._kernel.modelHasAttrib(name, geom_type)) {
            return new EntAttrib(this._kernel, name, geom_type);
        }
        return null;
    }

    /**
     * Returns all entity attributes in the model.
     * @param
     * @return
     */
    public getAllEntAttribs(): IEntAttrib[] {
        const ent_attribs: IEntAttrib[] = [];
        for (const attrib_data of this._kernel.modelGetAllEntAttribs()) {
            const geom_type: EGeomType = mapStringToGeomType.get(attrib_data.geom_type);
            ent_attribs.push(new EntAttrib(this._kernel, attrib_data.name, geom_type));
        }
        return ent_attribs;
    }

    /**
     * Add a new entity attribute to the model.
     * If the attribute already exists, then return the existing attribute.
     * @param
     * @return
     */
    public addEntAttrib(name: string, geom_type: EGeomType, data_type: EDataType): IEntAttrib {
        name = name.replace(/\s/g, "_");
        if (geom_type !== EGeomType.points && geom_type !== EGeomType.objs) {return null;}
        this._kernel.modelAddAttrib(name, geom_type, data_type);
        return this.getEntAttrib(name, geom_type);
    }

    /**
     * Returns one entity attribute in the model, or null if it does not exist.
     * @param
     * @return
     */
    public getTopoAttrib(name: string, geom_type?: EGeomType): ITopoAttrib {
        if (geom_type === EGeomType.points || geom_type === EGeomType.objs) {return null;}
        if (this._kernel.modelHasAttrib(name, geom_type)) {
            return new TopoAttrib(this._kernel, name, geom_type);
        }
        return null;
    }

    /**
     * Returns all topo attributes in the model.
     * @param
     * @return
     */
    public getAllTopoAttribs(): ITopoAttrib[] {
        const topo_attribs: ITopoAttrib[] = [];
        for (const attrib_data of this._kernel.modelGetAllTopoAttribs()) {
            const geom_type: EGeomType = mapStringToGeomType.get(attrib_data.geom_type);
            topo_attribs.push(new TopoAttrib(this._kernel, attrib_data.name, geom_type));
        }
        return topo_attribs;
    }

    /**
     * Add a new topo attribute to the model.
     * If the attribute already exists, then return the existing attribute.
     * @param
     * @return
     */
    public addTopoAttrib(name: string, geom_type: EGeomType, data_type: EDataType): ITopoAttrib {
        name = name.replace(/\s/g, "_");
        if (geom_type === EGeomType.points || geom_type === EGeomType.objs) {return null;}
        this._kernel.modelAddAttrib(name, geom_type, data_type);
        return this.getTopoAttrib(name, geom_type);
    }

    /**
     * Delete an attribute from the model. Return ture if successful, false otherwise.
     * @param
     * @return
     */
    public delAttrib(attrib: IAttrib): boolean {
        return this._kernel.modelDelAttrib(attrib.getName(), attrib.getGeomType());
    }

    /**
     * Checks if the model has an attribute.
     * @param
     * @return
     */
    public hasAttrib(attrib: IAttrib): boolean {
        return this._kernel.modelHasAttrib(attrib.getName(), attrib.getGeomType());
    }

    /**
     * Rename an attribute.
     * @param
     * @return
     */
    public setAttribName(attrib: IAttrib, new_name: string): boolean {
        return this._kernel.attribSetName(attrib.getName(), new_name, attrib.getGeomType());
    }

    //  Groups -------------------------------------------------------------------------------------

    /**
     * Get all the groups in a model.
     * @param
     * @return
     */
    public getAllGroups(): IGroup[] {
        const groups_data: IGroupData[] = this._kernel.modelGetAllGroups();
        return groups_data.map((v) => new Group(this._kernel, v.name));
    }

    /**
     * Get one group from the model.
     * @param
     * @return
     */
    public getGroup(name: string): IGroup {
        const data: IGroupData = this._kernel.modelGetGroup(name);
        if (data === undefined) {return null;}
        return new Group(this._kernel, data.name);
    }

    /**
     * Add a group to the model.
     * If the parent name is given and does not exist, then an error will be thrown.
     * @param
     * @return
     */
    public addGroup(name: string, parent?: IGroup): IGroup {
        if (parent !== undefined) {
            this._kernel.modelAddGroup(name, parent.getName());
        } else {
            this._kernel.modelAddGroup(name);
        }
        return this.getGroup(name);
    }

    /**
     * Delete a group i the model. Returns true if successful.
     * @param
     * @return
     */
    public delGroup(group: IGroup): boolean {
        return this._kernel.modelDelGroup(group.getName());
    }

    /**
     * Checks if the group exists in the model.
     * @param
     * @return
     */
    public hasGroup(group: IGroup): boolean {
        return this._kernel.modelHasGroup(group.getName());
    }

    /**
     * Renames the group.
     * @param
     * @return
     */
    public setGroupName(group: IGroup, new_name): boolean {
        return this._kernel.groupSetName(group.getName(), new_name);
    }

    //  Model --------------------------------------------------------------------------------------

    /**
     * Removes empty elements in sparse arrays.
     * @param
     * @return
     */
    public purge(): void {
        this._kernel.modelPurge();
    }

    /**
     * Run some checks
     * @param
     * @return
     */
    public validate(): boolean {
        return this._kernel.modelValidate();
    }

    /**
     *  Save the model as  file
     * @param
     * @return
     */
    public toJSON(): string {
        return this._kernel.modelToJSON();
    }
}
