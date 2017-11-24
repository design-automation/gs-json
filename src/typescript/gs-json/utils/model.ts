import * as ifs from "./ifaces_gs";
import {IModelData, IAttribData, IGroupData, ISkinData} from "./ifaces_json";
import {Arr} from "./arr";
import {EGeomType, EDataType, EObjType, mapStringToGeomType, attribTypeStrings, mapStringToDataType} from "./enums";
import {Geom, GeomPath} from "./geom";
import {Point, Polyline, Polymesh} from "./entities";
import {Vertex, Edge, Wire, Face} from "./topos";
import {Attrib} from "./attribs";
import {Group} from "./groups";

//model class
/**
* Model Class
*/
export class Model implements ifs.IModel{
    private _empty_model_data:IModelData  = {
        "metadata": {"filetype":"gs-json","version": "0.1.1"},
        "geom": {"points":[[],[]], "objs":[]}, 
        "attribs":{"points": [],"vertices": [],"edges": [],"wires": [],"faces": [],"objs": []}, 
        "groups":[]}

    private _data:IModelData;
    private geom:ifs.IGeom;
    /**
    * to be completed
    * @param
    * @return
    */
    constructor() {
        this._data = this._empty_model_data;
        //create an empty geometry array
        this.geom = new Geom(this);
    }
    //Geom
    /**
    * to be completed
    * @param
    * @return
    */
    public getGeom():ifs.IGeom {
        return this.geom;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public setData(model_data:IModelData):void {
        Object.assign(this._data,model_data);
        this.geom = new Geom(this, model_data.geom.points, model_data.geom.objs);
    }
    //Attribs
    /**
    * to be completed
    * @param
    * @return
    */
    public getAttribs(geom_type?:EGeomType):ifs.IAttrib[] {
        if (!this._data.attribs[geom_type]) {return null;}
        return this._data.attribs[geom_type].filter((v)=>v != undefined).map((v,i)=>new Attrib(this, v));
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getAttrib(name:string, geom_type?:EGeomType):ifs.IAttrib {
        let data:IAttribData = 
            this._data.attribs[geom_type].filter((v)=>v != undefined).find((v) => (v.name == name));
        if (data) {return new Attrib(this, data);}
        return null;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public addAttrib(name:string, geom_type:EGeomType, data_type:EDataType):ifs.IAttrib {
        if (this._data.attribs[geom_type].filter((v)=>v != undefined).find((v) => (v.name == name))) 
            { return null ;}
        let data:IAttribData = {name:name, geom_type:geom_type, data_type:data_type, 
            values:[this.geom.getAttribTemplate(geom_type),[null]]};
        this._data.attribs[geom_type].push(data);
        return new Attrib(this, data);
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public delAttrib(name:string, geom_type:EGeomType):boolean {
        let index:number;
        this._data.attribs[geom_type].forEach((v,i) => (v.name == name) && (index = i));
        if (index) {delete this._data.attribs[geom_type][index]; return true;}
        return false;
    }
    //Groups
    /**
    * to be completed
    * @param
    * @return
    */
    public getGroups():ifs.IGroup[] {
        if (!this._data.groups) {return null;}
        return this._data.groups.filter((v)=>v != undefined).map((v,i)=>new Group(this, v));
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getGroup(name:string):ifs.IGroup {
        console.log(this._data.groups);
        let data:IGroupData = 
            this._data.groups.filter((v)=>v != undefined).find((v) => v.name == name);
        console.log(data);
        if (data) {return new Group(this, data);}
        return null;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public addGroup(name:string):ifs.IGroup {
        if (this._data.groups.filter((v)=>v != undefined).find((v) => (v.name == name))) 
            { return null ;}
        let data:IGroupData = {name:name};
        this._data.groups.push(data);
        return new Group(this, data);
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public delGroup(name:string):boolean {
        let index:number;
        this._data.groups.forEach((v,i) => (v.name == name) && (index = i));
        if (index) {delete this._data.groups[index]; return true;}
        return false;
    }
    //Clean up nulls and unused points
    /**
    * to be completed
    * @param
    * @return
    */
    public purgePoints():number {
        throw new Error ("Method not implemented.");
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public purgeNulls():number {
        throw new Error ("Method not implemented.");
    }
    //Runs some checks
    /**
    * to be completed
    * @param
    * @return
    */
    public validateModel():boolean {
        //check that the attributes match the geometry
        let num_points = this.geom.numPoints();
        let num_objs = this.geom.numObjs();
       
        //TODO


        return true;
    }
}
