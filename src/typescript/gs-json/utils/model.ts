import * as ifs from "./interfaces";
import {Arr} from "./arr";
import {Geom} from "./geom";
import {Entity,Point,Obj,Polyline,Polymesh} from "./entities";
import {Topo} from "./topos";
import {Attrib, Path} from "./attribs";
import {Group} from "./groups";

//model class
export class Model implements ifs.IModel{
    private metadata:ifs.IMetadata;
    private geom:ifs.IGeom;
    private attrib_types_dict:ifs.IAttribTypesDict;
    private groups_dict:ifs.IGroupsDict;
    constructor() {
        //create default metadata
        this.metadata = {filetype: "mobius", version:  0.1, crs:{"epsg":3857}, location: "+0-0"}
        //create an empty geometry array
        this.geom = new Geom(this);
        //create one attrib, called "position"
        this.attrib_types_dict = {points:{}, vertices:{}, edges:{}, wires:{}, faces:{}, shells:{}}
        this.attrib_types_dict.points = {
            position: new Attrib(this, "position", ifs.ETopoType.points, ifs.EDataType.type_num_arr)
        }
        //create empty groups dict
        this.groups_dict = {};
    }
    // Set data for the model
    public setData(data:ifs.IModelData):void {
        this.geom = new Geom(this, data.geometry);
        for (let attrib_data of data.attribs) {
            let topo_type:ifs.ETopoType = ifs.ETopoType[attrib_data.topo_type];
            let data_type:ifs.EDataType = ifs.ETopoType[attrib_data.data_type];
            let attrib:Attrib = new Attrib(this, attrib_data.name, topo_type, data_type);
            this.attrib_types_dict[attrib_data.topo_type][attrib_data.name] = attrib;           
        }
        for (let group of data.groups) {
            this.attrib_types_dict[group.name] = null; //TODO
        }
    }
    //Creation
    public createPoint(xyz:number[]):ifs.IPoint {
        let point:Point = new Point(this.geom);
        point.setPosition(xyz);
        return point;
    }
    public createPolyline(wire_points:ifs.IPoint[]):ifs.IObj {
        console.log("not implemented");
        return null;
    }
    public createPolymesh(wire_points:ifs.IPoint[], face_points:ifs.IFace[]):ifs.IObj {
        console.log("not implemented");
        return null;
    }
    //Geom
    public getGeom():ifs.IGeom {
        return this.geom;
    }
    //Attribs
    public getAttribs(topo_type:ifs.ETopoType):ifs.IAttrib[] {
        let attrib_dict:ifs.IAttribDict =  this.attrib_types_dict[topo_type];
        return Object.keys(attrib_dict).map(key=>attrib_dict[key]);
    }
    public getAttrib(name:string, topo_type?:ifs.ETopoType):ifs.IAttrib {
        return this.attrib_types_dict[topo_type][name];
    }
    public addAttrib(name:string, topo_type:ifs.ETopoType, data_type:ifs.EDataType):ifs.IAttrib {
        let attrib:Attrib = new Attrib(this, name, topo_type, data_type);
        this.attrib_types_dict[topo_type][name] = attrib;
        return attrib;
    }
    public delAttrib(name:string, topo_type:ifs.ETopoType):boolean {
        return delete this.attrib_types_dict[topo_type][name];
    }
    //Groups
    public getGroups():ifs.IGroup[] {
        return Object.keys(this.groups_dict).map(key=>this.groups_dict[key]);
    }
    public getGroup(name:string):ifs.IGroup {;
        return this.groups_dict[name];
    }
    public addGroup(name:string):ifs.IGroup {
        this.groups_dict[name] = new Group(this, name);
        return this.groups_dict[name];
    }
    public delGroup(name:string):boolean {
        return delete this.groups_dict[name];
    }
    //Clean up nulls and unused points
    public purgePoints():number {
        console.log("not implemented");
        return -1;
    }
    public purgeNulls():number {
        console.log("not implemented");
        return -1;
    }
    //Runs some checks
    public validateModel():boolean {
        console.log("not implemented");
        return false;
    }
}
