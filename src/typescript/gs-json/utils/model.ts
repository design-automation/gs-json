import * as ifs from "./ifaces_gs";
import {Kernel} from "./kernel";
import {IModelData,  IAttribData, IGroupData} from "./ifaces_json";
import {EGeomType, EDataType, mapStringToGeomType} from "./enums";
import {Geom} from "./geom";
import {EntAttrib, TopoAttrib} from "./attribs";
import {Group} from "./groups";
/**
 * Model Class
 */
export class Model implements ifs.IModel {
    private _kernel: Kernel;

    /**
     * to be completed
     * @param
     * @return
     */
    constructor(data?: IModelData) {
        this._kernel = new Kernel(data);
    }

    //  Geom ---------------------------------------------------------------------------------------

    /**
     * to be completed
     * @param
     * @return
     */
    public getGeom(): ifs.IGeom {
        return new Geom(this._kernel);
    }

    //  Attributes ---------------------------------------------------------------------------------

    /**
     * to be completed
     * @param
     * @return
     */
    public getAttribs(geom_type?: EGeomType): Array<ifs.IEntAttrib|ifs.ITopoAttrib> {
        const attribs_data: IAttribData[] = this._kernel.modelGetAttribs(geom_type);
        const attribs: Array<ifs.IEntAttrib|ifs.ITopoAttrib> = [];
        for (const data of attribs_data) {
            const geom_type: EGeomType = mapStringToGeomType.get(data.geom_type);
            switch (geom_type) {
                case EGeomType.points: case EGeomType.objs:
                    attribs.push(new EntAttrib(this._kernel, data.name, geom_type));
                    break;
                default: // topo attribs
                    attribs.push(new TopoAttrib(this._kernel, data.name, geom_type));
                    break;
            }

        }
        return attribs;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public getAttrib(name: string, geom_type?: EGeomType): ifs.IEntAttrib|ifs.ITopoAttrib {
        const data: IAttribData = this._kernel.modelGetAttrib(name, geom_type);
        if (data === undefined) {return null;}
        switch (geom_type) {
            case EGeomType.points: case EGeomType.objs:
                return new EntAttrib(this._kernel, data.name, geom_type);
            default: // topo attribs
                return new TopoAttrib(this._kernel, data.name, geom_type);
        }
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public addAttrib(name: string, geom_type: EGeomType, data_type: EDataType): ifs.IEntAttrib|ifs.ITopoAttrib {
        name = name.replace(/\s/g, "_");
        const data: IAttribData = this._kernel.modelAddAttrib(name, geom_type, data_type);
        switch (geom_type) {
            case EGeomType.points: case EGeomType.objs:
                return new EntAttrib(this._kernel, data.name, geom_type);
            default: // topo attribs
                return new TopoAttrib(this._kernel, data.name, geom_type);
        }
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public delAttrib(name: string, geom_type: EGeomType): boolean {
        return this._kernel.modelDelAttrib(name, geom_type);
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public setAttribName(old_name, new_name, geom_type: EGeomType): boolean {
        return this._kernel.attribSetName(old_name, new_name, geom_type);
    }

    //  Groups -------------------------------------------------------------------------------------

    /**
     * to be completed
     * @param
     * @return
     */
    public getGroups(): ifs.IGroup[] {
        const groups_data: IGroupData[] = this._kernel.modelGetGroups();
        return groups_data.map((v) => new Group(this._kernel, v.name));
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public getGroup(name: string): ifs.IGroup {
        const data: IGroupData = this._kernel.modelGetGroup(name);
        if (data === undefined) {return null;}
        return new Group(this._kernel, data.name);
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public addGroup(name: string, parent?: string): ifs.IGroup {
        const data: IGroupData = this._kernel.modelAddGroup(name, parent);
        return new Group(this._kernel, data.name);
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public delGroup(name: string): boolean {
        return this._kernel.modelDelGroup(name);
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public hasGroup(name: string): boolean {
        return this._kernel.modelHasGroup(name);
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public setGroupName(old_name, new_name): boolean {
        return this._kernel.groupSetName(old_name, new_name);
    }

    //  Model --------------------------------------------------------------------------------------

    /**
     * to be completed
     * @param
     * @return
     */
    public purge(): number {
        return this._kernel.modelPurge();
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
