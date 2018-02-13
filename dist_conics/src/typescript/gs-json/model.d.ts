import { IModel, IGeom, IGroup, IAttrib, IEntAttrib, ITopoAttrib } from "./ifaces_gs";
import { IModelData } from "./ifaces_json";
import { EGeomType, EDataType } from "./enums";
/**
 * Model Class
 */
export declare class Model implements IModel {
    private _kernel;
    /**
     * Creates a new model.
     * @param
     * @return
     */
    constructor(data?: IModelData);
    /**
     * Get the geom objct from the model.
     * @return
     */
    getGeom(): IGeom;
    /**
     * Find all attributes in the model for a geom_type.
     * @param
     * @return
     */
    findAttribs(geom_type: EGeomType): IEntAttrib[] | ITopoAttrib[];
    /**
     * Returns all attributes in the model. A nested array is return containing
     * an array of entity attributes, and
     * an array of topo attributes
     * @param
     * @return
     */
    getAllAttribs(): [IEntAttrib[], ITopoAttrib[]];
    /**
     * Returns one entity attribute in the model, or null if it does not exist.
     * @param
     * @return
     */
    getEntAttrib(name: string, geom_type: EGeomType): IEntAttrib;
    /**
     * Returns all entity attributes in the model.
     * @param
     * @return
     */
    getAllEntAttribs(): IEntAttrib[];
    /**
     * Add a new entity attribute to the model.
     * If the attribute already exists, then return the existing attribute.
     * @param
     * @return
     */
    addEntAttrib(name: string, geom_type: EGeomType, data_type: EDataType): IEntAttrib;
    /**
     * Returns one entity attribute in the model, or null if it does not exist.
     * @param
     * @return
     */
    getTopoAttrib(name: string, geom_type?: EGeomType): ITopoAttrib;
    /**
     * Returns all topo attributes in the model.
     * @param
     * @return
     */
    getAllTopoAttribs(): ITopoAttrib[];
    /**
     * Add a new topo attribute to the model.
     * If the attribute already exists, then return the existing attribute.
     * @param
     * @return
     */
    addTopoAttrib(name: string, geom_type: EGeomType, data_type: EDataType): ITopoAttrib;
    /**
     * Delete an attribute from the model. Return ture if successful, false otherwise.
     * @param
     * @return
     */
    delAttrib(attrib: IAttrib): boolean;
    /**
     * Checks if the model has an attribute.
     * @param
     * @return
     */
    hasAttrib(attrib: IAttrib): boolean;
    /**
     * Rename an attribute.
     * @param
     * @return
     */
    setAttribName(attrib: IAttrib, new_name: string): boolean;
    /**
     * Get all the groups in a model.
     * @param
     * @return
     */
    getAllGroups(): IGroup[];
    /**
     * Get one group from the model.
     * @param
     * @return
     */
    getGroup(name: string): IGroup;
    /**
     * Add a group to the model.
     * If the parent name is given and does not exist, then an error will be thrown.
     * @param
     * @return
     */
    addGroup(name: string, parent?: IGroup): IGroup;
    /**
     * Delete a group i the model. Returns true if successful.
     * @param
     * @return
     */
    delGroup(group: IGroup): boolean;
    /**
     * Checks if the group exists in the model.
     * @param
     * @return
     */
    hasGroup(group: IGroup): boolean;
    /**
     * Renames the group.
     * @param
     * @return
     */
    setGroupName(group: IGroup, new_name: any): boolean;
    /**
     * Removes empty elements in sparse arrays.
     * @param
     * @return
     */
    purge(): void;
    /**
     * Run some checks
     * @param
     * @return
     */
    validate(): boolean;
    /**
     *  Save the model as  file
     * @param
     * @return
     */
    toJSON(): string;
    /**
     *  Save the model as  file
     * @param
     * @return
     */
    toString(): string;
}
