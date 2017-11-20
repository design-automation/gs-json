import * as ifs from "./interfaces";
import {Arr} from "./arr";
import {Geom, GeomPath} from "./geom";
import {Point,Polyline,Polymesh} from "./entities";
import {Vertex, Edge, Wire, Face} from "./topos";
import {Attrib} from "./attribs";

//Groups class
    /**
    * to be completed
    */
export class Group implements ifs.IGroup {
    private model:ifs.IModel;
    private name:string;
        /**
    * to be completed
    * @param
    * @return
    */
    constructor(model:ifs.IModel, name:string) {
        this.model = model;
        this.name = name;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getName():string {
        return this.name;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public setName(name:string):string {
        let old_name:string = this.name;
        this.name = name;
        return old_name;
    }
    //Groups
    /**
    * to be completed
    * @param
    * @return
    */
    public getParentGroup():ifs.IGroup {
        throw new Error ("Method not implemented.");
    }  
    /**
    * to be completed
    * @param
    * @return
    */ 
    public getChildGroups():ifs.IGroup[] {
        throw new Error ("Method not implemented.");
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public setParentGroup(group:ifs.IGroup):boolean{
        throw new Error ("Method not implemented.");
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public removeParentGroup(group:ifs.IGroup):boolean{
        throw new Error ("Method not implemented.");
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