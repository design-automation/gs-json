import * as ifs from "./interfaces";
import {Arr} from "./arr";
import {Geom} from "./geom";
import {Entity,Point,Obj,Polyline,Polymesh} from "./entities";
import {Topo} from "./topos";
import {Attrib, Path} from "./attribs";

//Groups class
export class Group implements ifs.IGroup {
    private model:ifs.IModel;
    private name:string;
    constructor(model:ifs.IModel, name:string) {
        this.model = model;
        this.name = name;
    }
    public getName():string {
        return this.name
    }
    public setName(name:string):void {
        this.name = name
    }
    //Groups
    public getParentGroups():ifs.IGroup[] {
        console.log("not implemented");
        return [];
    }
    public getChildGroups():ifs.IGroup[] {
        console.log("not implemented");
        return [];
    }
    public addChildGroup(obj:ifs.IGroup):boolean {
        console.log("not implemented");
        return false;
    }
    public removeChildGroup(obj:ifs.IGroup):boolean {
        console.log("not implemented");
        return false;
    }
    //Objs
    public getEntitieIDs(obj_type?:ifs.EObjType):number[] {
        console.log("not implemented");
        return [];
    }
    public addObj(obj_id:number):boolean {
        console.log("not implemented");
        return false;
    }
    public addObjs(obj_ids:number[]):boolean {
        console.log("not implemented");
        return false;
    }
    public removeObj(obj_id:number):boolean {
        console.log("not implemented");
        return false;
    }
    public removeObjs(obj_ids:number[]):boolean {
        console.log("not implemented");
        return false;
    }
    //Properties
    public getPropeties():ifs.IDict[] {
        console.log("not implemented");
        return [];
    }
}
