import * as ifs from "./interfaces";
import {Arr} from "./arr";
import {Geom, GeomPath} from "./geom";
import {Point,Polyline,Polymesh} from "./entities";
import {Vertex, Edge, Wire, Face} from "./topos";
import {Group} from "./groups";

// Attrib class
export class Attrib implements ifs.IAttrib {
    private model:ifs.IModel;
    private name:string;
    private attrib_type:ifs.EGeomType;
    private data_type:ifs.EDataType;
    private values_map:any[];
    private values:any[];
    constructor(model:ifs.IModel, name:string, attrib_type:ifs.EGeomType, data_type:ifs.EDataType, values_map?:any[], values?:any[]) {
        this.model = model;
        this.name = name;
        this.attrib_type = attrib_type;
        this.data_type = data_type;
        if (values_map) {
            this.values_map = values_map;
        } else {
            this.values_map = this.model.getGeom().getAttribTemplate(this.attrib_type);
        }
        if (values) {
            this.values = values;
        } else {
            this.values = [null];//first value in the list is always null
        }
    }
    public getName():string {
        return this.name;
    }
    public setName(name:string):string {
        let old_name:string = this.name;
        this.name = name;
        return old_name;
    }
    public getGeomType():ifs.EGeomType {
        return this.attrib_type;
    }
    public getDataType():ifs.EDataType {
        return this.data_type;
    }
    //Attrib Values
    public getValue(path:ifs.IGeomPath):any {
        let index:number;
        switch (this.attrib_type) {
            case ifs.EGeomType.points: case ifs.EGeomType.objs:
                index = this.values_map[path.id];
                break;
            case ifs.EGeomType.wires: case ifs.EGeomType.faces:
                index = this.values_map[path.id][path.ti];
                break;
            case ifs.EGeomType.vertices: case ifs.EGeomType.edges:
                index = this.values_map[path.id][path.ti][path.si];
                break;
        }
        return this.values[index];
    }
    public setValue(path:ifs.IGeomPath, value:any):any {
        let index:number = Arr.indexOf(value, this.values);
        if (index == -1) {
            index = this.values.push(value) - 1;
        }
        let old_value:any;
        switch (this.attrib_type) {
            case ifs.EGeomType.points: case ifs.EGeomType.objs:
                old_value = this.values_map[path.id];
                this.values_map[path.id] = index;
                break;
            case ifs.EGeomType.wires: case ifs.EGeomType.faces:
                old_value = this.values_map[path.id][path.ti];
                this.values_map[path.id][path.ti] = index;
                break;
            case ifs.EGeomType.vertices: case ifs.EGeomType.edges:
                old_value = this.values_map[path.id][path.ti][path.si]
                this.values_map[path.id][path.ti][path.si] = index;
                break;
        }
        return old_value;
    }
    public count():number  {
        return this.values_map.length;
    }
}