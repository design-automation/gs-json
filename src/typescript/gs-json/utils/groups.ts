import * as ifs from "./interfaces";
import {Arr} from "./arr";
import {Geom, GeomPath} from "./geom";
import {Point,Polyline,Polymesh} from "./entities";
import {Vertex, Edge, Wire, Face} from "./topos";
import {Attrib} from "./attribs";

/**
* Group class.
*/
export class Group implements ifs.IGroup {
    private model:ifs.IModel;
    private _data:ifs.IGroupData;
    /**
    * to be completed
    * @param
    * @return
    */
    constructor(model:ifs.IModel, data:ifs.IGroupData) {
        this.model = model;
        this._data = data;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getName():string {
        return this._data.name;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public setName(name:string):string {
        let old_name:string = this._data.name;
        this._data.name = name;
        return old_name;
    }
    //Groups
    /**
    * to be completed
    * @param
    * @return
    */
    public getParentGroup():string {
        return this._data.parent;
    }  
    /**
    * to be completed
    * @param
    * @return
    */
    public setParentGroup(name:string):string{
        let old_parent_name:string = this._data.parent;
        this._data.parent = name;
        return old_parent_name;
    }
    /**
    * to be completed
    * @param
    * @return
    */ 
    public getChildGroups():string[] {
        return this.model.getGroups().filter((v)=>v.getParentGroup() == this._data.name).map((v,i)=>v.getName());
    }
    //Points in this group
    /**
    * to be completed
    * @param
    * @return
    */
    public getPointIDs():number[] {
        throw new Error ("Method not implemented.");
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public addPoint(point_id:number):boolean {
        throw new Error ("Method not implemented.");
    }
    /**
    * to be completed
    * @param
    * @return
    */    
    public addPoints(point_ids:number[]):boolean {
        throw new Error ("Method not implemented.");
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public removePoint(point_id:number):boolean {
        throw new Error ("Method not implemented.");
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public removePoints(point_ids:number[]):boolean {
        throw new Error ("Method not implemented.");
    }
    //Objs
    /**
    * to be completed
    * @param
    * @return
    */
    public getObjIDs(obj_type?:ifs.EObjType):number[] {
        throw new Error ("Method not implemented.");
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public addObj(obj_id:number):boolean {
        throw new Error ("Method not implemented.");
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public addObjs(obj_ids:number[]):boolean {
        throw new Error ("Method not implemented.");
    }
    /**
    * to be completed
    * @param
    * @return
    */    
    public removeObj(obj_id:number):boolean {
        throw new Error ("Method not implemented.");
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public removeObjs(obj_ids:number[]):boolean {
        throw new Error ("Method not implemented.");
    }
    //Properties
    /**
    * to be completed
    * @param
    * @return
    */
    public getPropeties():ifs.IDict[] {
        throw new Error ("Method not implemented.");
    }
}