import * as ifs from "./interfaces";
import {Arr} from "./arr";
import {Geom, GeomPath} from "./geom";
import {Point,Polyline,Polymesh} from "./entities";
import {Topo} from "./topos";
import {Attrib} from "./attribs";
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
        this.attrib_types_dict = {objs:{}, points:{}, faces:{}, wires:{}, edges:{}, vertices:{} }
        this.attrib_types_dict.points = {
            position: new Attrib(this, "position", ifs.EGeomType.points, ifs.EDataType.type_num_arr)
        }
        //create empty groups dict
        this.groups_dict = {};
    }
    //Geom
    public getGeom():ifs.IGeom {
        return this.geom;
    }
    public setData(data:ifs.IModelData):void {
        this.geom = new Geom(this, data.points, data.objects);
        for (let attrib_data of data.attribs) {
            let geom_type:ifs.EGeomType = ifs.mapStringToAttribType[attrib_data.geom_type];
            let data_type:ifs.EDataType = ifs.mapStringToDataType[attrib_data.data_type];
            let attrib:Attrib = new Attrib(this, attrib_data.name, geom_type, data_type);
            this.attrib_types_dict[attrib_data.geom_type][attrib_data.name] = attrib;           
        }
        for (let group of data.groups) {
            this.attrib_types_dict[group.name] = null; //TODO
        }
    }
    //Attribs
    public getAttribs(attrib_type:ifs.EGeomType):ifs.IAttrib[] {
        let attrib_dict:ifs.IAttribDict =  this.attrib_types_dict[attrib_type];
        return Object.keys(attrib_dict).map(key=>attrib_dict[key]);
    }
    public getAttrib(name:string, attrib_type?:ifs.EGeomType):ifs.IAttrib {
        return this.attrib_types_dict[attrib_type][name];
    }
    public addAttrib(name:string, attrib_type:ifs.EGeomType, data_type:ifs.EDataType):ifs.IAttrib {
        let attrib:ifs.IAttrib = new Attrib(this, name, attrib_type, data_type);
        this.attrib_types_dict[attrib_type][name] = attrib;
        return attrib;
    }
    public delAttrib(name:string, attrib_type:ifs.EGeomType):boolean {
        return delete this.attrib_types_dict[attrib_type][name];
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
        throw new Error ("Method not implemented.");
    }
    public purgeNulls():number {
        throw new Error ("Method not implemented.");
    }
    //Runs some checks
    public validateModel():boolean {
        throw new Error ("Method not implemented.");
    }
}
