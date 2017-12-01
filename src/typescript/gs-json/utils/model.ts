import * as ifs from "./ifaces_gs";
import {IMetadata, IModelData, IAttribData, IGroupData, ISkinData} from "./ifaces_json";
import {Arr} from "./arr";
import {EGeomType, EDataType, EObjType, mapStringToGeomType, attribTypeStrings, mapStringToDataType} from "./enums";
import {Geom} from "./geom";
import {Point, Polyline, Polymesh} from "./entities";
import {Vertex, Edge, Wire, Face, TopoPath} from "./topos";
import {EntAttrib, TopoAttrib} from "./attribs";
import {Group} from "./groups";
/**
* Model Class
*/
export class Model implements ifs.IModel{
    private _metadata:IMetadata;
    private _geom:ifs.IGeom;
    private _attribs:Map<string, Map<string, ifs.IEntAttrib|ifs.ITopoAttrib>>;
    private _groups:Map<string, ifs.IGroup>;
    /**
    * to be completed
    * @param
    * @return
    */
    constructor(data?:IModelData) {
        this._attribs = new Map();
        this._attribs.set("points", new Map());
        this._attribs.set("objs", new Map());
        this._attribs.set("vertices", new Map());
        this._attribs.set("edges", new Map());
        this._attribs.set("wires", new Map());
        this._attribs.set("faces", new Map());

        this._groups = new Map();
        //Metadata
        if (data && data.metadata != undefined) {
            this._metadata = data.metadata;
        } else {
            this._metadata = {"filetype":"gs-json","version": "0.1.1"};
        } 
        //Geom
        if (data && data.geom != undefined) {
            this._geom = new Geom(this, data.geom);
        } else {
            this._geom = new Geom(this, {"points":[[],[null]],"objs":[]});
        }
        //Attributes
        if (data && data.attribs && data.attribs.points != undefined) {
            for (let attrib_data of data.attribs.points) {
                this._attribs.get("points").set(attrib_data.name, new EntAttrib(this, attrib_data));
            }
        }
        if (data && data.attribs && data.attribs.objs != undefined) {
            for (let attrib_data of data.attribs.objs) {
                this._attribs.get("objects").set(attrib_data.name, new EntAttrib(this, attrib_data));
            }
        }
        if (data && data.attribs && data.attribs.vertices != undefined) {
            for (let attrib_data of data.attribs.vertices) {
                this._attribs.get("vertices").set(attrib_data.name, new TopoAttrib(this, attrib_data));
            }
        }
        if (data && data.attribs && data.attribs.edges != undefined) {
            for (let attrib_data of data.attribs.edges) {
                this._attribs.get("edges").set(attrib_data.name, new TopoAttrib(this, attrib_data));
            }
        }
        if (data && data.attribs && data.attribs.wires != undefined) {
            for (let attrib_data of data.attribs.wires) {
                this._attribs.get("wires").set(attrib_data.name, new TopoAttrib(this, attrib_data));
            }
        }
        if (data && data.attribs && data.attribs.faces != undefined) {
            for (let attrib_data of data.attribs.faces) {
                this._attribs.get("faces").set(attrib_data.name, new TopoAttrib(this, attrib_data));
            }
        }

        //Groups
        if (data && data.attribs && data.groups != undefined) {
            for (let group_data of data.groups) {
                this._groups.set(group_data.name, new Group(this, group_data));
            }
        }
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getGeom():ifs.IGeom {
        return this._geom;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getAttribs(geom_type?:EGeomType):(ifs.IEntAttrib|ifs.ITopoAttrib)[] {
        switch (geom_type) {
            case EGeomType.points: 
                return Array.from(this._attribs.get(geom_type).values()) as ifs.IEntAttrib[];
            case EGeomType.objs:
                return Array.from(this._attribs.get(geom_type).values()) as ifs.IEntAttrib[];
            case EGeomType.faces:
                return Array.from(this._attribs.get(geom_type).values()) as ifs.ITopoAttrib[];
            case EGeomType.wires:
                return Array.from(this._attribs.get(geom_type).values()) as ifs.ITopoAttrib[];
            case EGeomType.edges:
                return Array.from(this._attribs.get(geom_type).values()) as ifs.ITopoAttrib[];
            case EGeomType.vertices:
                return Array.from(this._attribs.get(geom_type).values()) as ifs.ITopoAttrib[];
            default:
                return [
                    ...this.getAttribs(EGeomType.points) as ifs.IEntAttrib[],
                    ...this.getAttribs(EGeomType.objs) as ifs.IEntAttrib[],
                    ...this.getAttribs(EGeomType.faces) as ifs.ITopoAttrib[],
                    ...this.getAttribs(EGeomType.wires) as ifs.ITopoAttrib[],
                    ...this.getAttribs(EGeomType.edges) as ifs.ITopoAttrib[],
                    ...this.getAttribs(EGeomType.vertices) as ifs.ITopoAttrib[]
                ]
        }
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getAttrib(name:string, geom_type?:EGeomType):ifs.IEntAttrib|ifs.ITopoAttrib {
        return this._attribs.get(geom_type).get(name);
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public addAttrib(name:string, geom_type:EGeomType, data_type:EDataType):ifs.IEntAttrib|ifs.ITopoAttrib {
        name = name.replace(/\s/g, "_");
        let data:IAttribData = {name:name, geom_type:geom_type, data_type:data_type};
        switch (geom_type) {
            case EGeomType.points: case EGeomType.objs:
                let ent_attrib:ifs.IEntAttrib = new EntAttrib(this, data);
                this._attribs.get(geom_type).set(name, ent_attrib);
                return ent_attrib;
            default://vertices, edges, wires, faces
                let topo_attrib:ifs.ITopoAttrib = new TopoAttrib(this, data);
                this._attribs.get(geom_type).set(name, topo_attrib);
                return topo_attrib;
        }
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public delAttrib(name:string, geom_type:EGeomType):boolean {
        return this._attribs.get(geom_type).delete(name);
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public setAttribName(old_name, new_name, geom_type:EGeomType):boolean {
        if (!this._attribs.get(geom_type).has(old_name)) {return false;}
        if (this._attribs.get(geom_type).has(new_name)) {return false;}
        this._attribs.get(geom_type).set(new_name, this._attribs.get(geom_type).get(old_name));
        this._attribs.get(geom_type).delete(old_name);
        return true;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getGroups():ifs.IGroup[] {
        return Array.from(this._groups.values());
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public getGroup(name:string):ifs.IGroup {
        return this._groups.get(name);
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public addGroup(name:string, parent?:string):ifs.IGroup {
        name = name.replace(/\s/g, "_");
        let data:IGroupData = {name:name};
        if (parent != undefined && this.hasGroup(parent)) {
            parent = parent.replace(/\s/g, "_");
            data = {name:name, parent:parent};
        }
        let new_group = new Group(this, data);
        this._groups.set(name, new_group);
        return new_group;
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public delGroup(name:string):boolean {
        return this._groups.delete(name);
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public hasGroup(name:string):boolean {
        return this._groups.has(name);
    }
    /**
    * to be completed
    * @param
    * @return
    */
    public setGroupName(old_name, new_name):boolean {
        if (!this._groups.has(old_name)) {return false;}
        if (this._groups.has(new_name)) {return false;}
        this._groups.set(new_name, this._groups.get(old_name));
        this._groups.delete(old_name);
        return true;
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
        let num_points = this._geom.numPoints();
        let num_objs = this._geom.numObjs();
       
        //TODO


        return true;
    }
}
