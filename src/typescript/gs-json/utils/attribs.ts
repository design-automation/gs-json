import * as ifs from "./ifaces_gs";
import {Arr} from "./arr";
import {IModelData, IAttribData, IGroupData, ISkinData} from "./ifaces_json";
import {EGeomType, EDataType, EObjType, mapStringToGeomType, attribTypeStrings, mapStringToDataType} from "./enums";
import {Geom, GeomPath} from "./geom";
import {Point,Polyline,Polymesh} from "./entities";
import {Vertex, Edge, Wire, Face} from "./topos";
import {Group} from "./groups";
/**
 * Attrib class.
 * An class that represents a semantic attribute.
 * An attribute is data that is attached to a specific type of geometry.
 * The geometric types to which attributes can be attached are: 
 * "points", "vertices", "edges", "wires", "faces", and "objs".
 * An instance of this class stores a list of attributes values. 
 */
export class Attrib implements ifs.IAttrib {
    private model:ifs.IModel;
    private _data:IAttribData;
    // private name:string;
    // private attrib_type:EGeomType;
    // private data_type:EDataType;
    // private values:any[]; //values[0] is the map, values[1] is the array of unique values
    /**
    * Creates an instance of the Attrib class.
    * The attribute data must already exists in the model. 
    * Do not use this constructor if you want to add a new attribute to the model.
    * Instead, you should use the "addAttrib()" methdod in the model class.
    * @param model The Model object in which this attribute will be created.
    * @param data The attribute data in the model.
    * @return The Attrib object.
    */
    constructor(model:ifs.IModel, data:IAttribData) {
        this.model = model;
        this._data = data;


        // this._data_type = data_type;
        // if (values) {
        //     this.values = values;
        // } else {
        //     this.values = [this.model.getGeom().getAttribTemplate(this.attrib_type), [null]];
        // }
    }
    /**
    * Get the name of the attribute. 
    * @return The name.
    */
    public getName():string {
        return this._data.name;
    }
    /**
    * Set the name of the attribute. 
    * @param name The new name.
    * @return The old name.
    */
    public setName(name:string):string {
        let old_name:string = this._data.name;
        this._data.name = name;
        return old_name;
    }
    /**
    * Set the geometry type for the attribute. 
    * @return The geometry type.
    */
    public getGeomType():EGeomType {
        return mapStringToGeomType[this._data.geom_type];
    }
    /**
    * Set the data type for the attribute values. 
    * @return The data type.
    */
    public getObjDataType():EDataType {
        return mapStringToDataType[this._data.data_type];
    }
    /**
    * Get a single attribute value. 
    * The data type of the attribute value can be found using the getDataType() method.
    * If getGeomType() returns "points" or "objs", then path should be the entity id (a number).
    * If getGeomType() returns "vertices", "edges", "wires", or "faces",
    * then path should be a path to a topo component (an instance of GeomPath).
    * @param path The path to a geometric entity or topological component.
    * @return The value.
    */
    public getValue(path:number|ifs.IGeomPath):any {
        switch (this._data.geom_type) {
            case EGeomType.points: case EGeomType.objs:
                path = path as number;
                return this._data.values[1][this._data.values[0][path]];//TODO check by reference or by value?
            case EGeomType.wires: case EGeomType.faces:
                path = path as ifs.IGeomPath;
                return this._data.values[1][this._data.values[0][path.id][path.ti]];
            case EGeomType.vertices: case EGeomType.edges:
                path = path as ifs.IGeomPath;
                return this._data.values[1][this._data.values[0][path.id][path.ti][path.si]];
        }
    }
    /**
    * Set a single attribute value. 
    * The data type of the attribute value can be found using the getDataType() method.
    * If getGeomType() returns "points" or "objs", then path should be the entity id (a number).
    * If getGeomType() returns "vertices", "edges", "wires", or "faces",
    * then path should be a path to a topo component (an instance of GeomPath).
    * @param path The path to a geometric entity or topological component.
    * @param value The new value.
    * @return The old value.
    */
    public setValue(path:number|ifs.IGeomPath, value:any):any {
        let index:number = Arr.indexOf(value, this._data.values);
        if (index == -1) {
            index = this._data.values.push(value) - 1;
        }
        let old_value:any;
        switch (this._data.geom_type) {
            case EGeomType.points: case EGeomType.objs:
                path = path as number;
                old_value = this._data.values[1][this._data.values[0][path]];
                this._data.values[0][path] = index;
                return old_value;
            case EGeomType.wires: case EGeomType.faces:
                path = path as ifs.IGeomPath;
                old_value = this._data.values[1][this._data.values[0][path.id][path.ti]];
                this._data.values[0][path.id][path.ti] = index;
                return old_value;
            case EGeomType.vertices: case EGeomType.edges:
                path = path as ifs.IGeomPath;
                old_value = this._data.values[1][this._data.values[0][path.id][path.ti][path.si]];
                this._data.values[0][path.id][path.ti][path.si] = index;
                return old_value;
        }
    }
    /**
    * Get the number of attribute values. 
    * @return The number of attribute values.
    */
    public count():number  {
        return this._data.values[0].length;
    }
}