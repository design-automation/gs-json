import {IModel, IGeom, IAttrib, IEntAttrib, ITopoAttrib} from "./ifaces_gs";
import {Kernel} from "./kernel";
import {IModelData,  IAttribData} from "./ifaces_json";
import {EGeomType, EDataType, mapStringToGeomType} from "./enums";
import {Geom} from "./geom";
import {EntAttrib} from "./attrib_entattrib";
import {TopoAttrib} from "./attrib_topoattrib";
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
     * @return
     */
    public getGeom(): IGeom {
        return this._kernel.getGeom();
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

    //  Model --------------------------------------------------------------------------------------

    /**
     * Merege another model into this model. Only the data is copied. The other model is unaffected.
     * @param
     * @return
     */
    public merge(model: IModel):void {
        this._kernel.modelMerge(model.toModelData());
    }

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
     *  Convert the model to a data object of type IModelData.
     * @param
     * @return
     */
    public toModelData(): IModelData {
        return this._kernel.modelToModelData() as IModelData;
    }

    /**
     *  Convert the model to a JSON string.
     * @param
     * @return
     */
    public toJSON(): string {
        return this._kernel.modelToJSON();
    }

    /**
     *  Converts the model to a human readable string for printing.
     * @param
     * @return
     */
    public toString(): string {
        let rep: string = "";
        rep += "Num Points:" + this.getGeom().numPoints() + "\n";
        rep += "Num Objects:" + this.getGeom().numObjs() + "\n";
        for (const obj of this.getGeom().getAllObjs()) {
            rep += "   " + obj.toString() + "\n";
        }
        const attribs: [IEntAttrib[], ITopoAttrib[]] = this.getAllAttribs();
        rep += "Num Entity Attribs:" + attribs[0].length + "\n";
        for (const attrib of attribs[0]) {
            rep += "   " + attrib.toString() + "\n";
        }
        rep += "Num Topo Attribs:" + attribs[1].length + "\n";
        for (const attrib of attribs[1]) {
            rep += "   " + attrib.toString() + "\n";
        }
        return rep;
    }
}
