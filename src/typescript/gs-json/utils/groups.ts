import * as ifs from "./interfaces";
import {Arr} from "./arr";
import {Geom, GeomPath} from "./geom";
import {Point,Polyline,Polymesh} from "./entities";
import {Topo} from "./topos";
import {Attrib} from "./attribs";

//Groups class
export class Group implements ifs.IGroup {
    private model:ifs.IModel;
    private name:string;
    constructor(model:ifs.IModel, name:string) {
        this.model = model;
        this.name = name;
    }
    public getName():string {
        return this.name;
    }
    public setName(name:string):string {
        let old_name:string = this.name;
        this.name = name;
        return old_name;
    }
    //Groups
    public getParentGroup():ifs.IGroup {
        throw new Error ("Method not implemented.");
    }   
    public getChildGroups():ifs.IGroup[] {
        throw new Error ("Method not implemented.");
    }
    public setParentGroup(group:ifs.IGroup):boolean{
        throw new Error ("Method not implemented.");
    }
    public removeParentGroup(group:ifs.IGroup):boolean{
        throw new Error ("Method not implemented.");
    }
    //Points in this group
    public getPointIDs():number[] {
        throw new Error ("Method not implemented.");
    }
    public addPoint(point_id:number):boolean {
        throw new Error ("Method not implemented.");
    }
    public addPoints(point_ids:number[]):boolean {
        throw new Error ("Method not implemented.");
    }
    public removePoint(point_id:number):boolean {
        throw new Error ("Method not implemented.");
    }
    public removePoints(point_ids:number[]):boolean {
        throw new Error ("Method not implemented.");
    }
    //Objs
    public getObjIDs(obj_type?:ifs.EObjType):number[] {
        throw new Error ("Method not implemented.");
    }
    public addObj(obj_id:number):boolean {
        throw new Error ("Method not implemented.");
    }
    public addObjs(obj_ids:number[]):boolean {
        throw new Error ("Method not implemented.");
    }
    public removeObj(obj_id:number):boolean {
        throw new Error ("Method not implemented.");
    }
    public removeObjs(obj_ids:number[]):boolean {
        throw new Error ("Method not implemented.");
    }
    //Properties
    public getPropeties():ifs.IDict[] {
        throw new Error ("Method not implemented.");
    }
}
