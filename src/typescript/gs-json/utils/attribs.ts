import * as ifs from "./interfaces";
import {Arr} from "./arr";
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
    private name:string;
    private attrib_type:ifs.EGeomType;
    private data_type:ifs.EDataType;
    private values:any[]; //values[0] is the map, values[1] is the array of unique values
    /**
    * Creates an instance of the Attrib class.
    * @param model The Model object in which this attribute will be created.
    * @param name The attribute name.
    * @param attrib_type The type of geometry to which the attribute will be attached. 
    * @param data_type The data type for the attribute values.
    * @param values_map A list of indexes point to values.
    * @param values A list of values, where the data type matches the data_type arg.
    * @return The Attrib object.
    */
    constructor(model:ifs.IModel, name:string, attrib_type:ifs.EGeomType, data_type:ifs.EDataType, values?:any[]) {
        this.model = model;
        this.name = name;
        this.attrib_type = attrib_type;
        this.data_type = data_type;
        if (values) {
            this.values = values;
        } else {
            this.values = [this.model.getGeom().getAttribTemplate(this.attrib_type), [null]];
        }
    }
    /**
    * Get the name of the attribute. 
    * @return The name.
    */
    public getName():string {
        return this.name;
    }
    /**
    * Set the name of the attribute. 
    * @param name The new name.
    * @return The old name.
    */
    public setName(name:string):string {
        let old_name:string = this.name;
        this.name = name;
        return old_name;
    }
    /**
    * Set the geometry type for the attribute. 
    * @return The geometry type.
    */
    public getGeomType():ifs.EGeomType {
        return this.attrib_type;
    }
    /**
    * Set the data type for the attribute values. 
    * @return The data type.
    */
    public getObjDataType():ifs.EDataType {
        return this.data_type;
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
        switch (this.attrib_type) {
            case ifs.EGeomType.points: case ifs.EGeomType.objs:
                path = path as number;
                return this.values[1][this.values[0][path]];//TODO check by reference or by value?
            case ifs.EGeomType.wires: case ifs.EGeomType.faces:
                path = path as ifs.IGeomPath;
                return this.values[1][this.values[0][path.id][path.ti]];
            case ifs.EGeomType.vertices: case ifs.EGeomType.edges:
                path = path as ifs.IGeomPath;
                return this.values[1][this.values[0][path.id][path.ti][path.si]];
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
        let index:number = Arr.indexOf(value, this.values);
        if (index == -1) {
            index = this.values.push(value) - 1;
        }
        let old_value:any;
        switch (this.attrib_type) {
            case ifs.EGeomType.points: case ifs.EGeomType.objs:
                path = path as number;
                old_value = this.values[1][this.values[0][path]];
                this.values[0][path] = index;
                return old_value;
            case ifs.EGeomType.wires: case ifs.EGeomType.faces:
                path = path as ifs.IGeomPath;
                old_value = this.values[1][this.values[0][path.id][path.ti]];
                this.values[0][path.id][path.ti] = index;
                return old_value;
            case ifs.EGeomType.vertices: case ifs.EGeomType.edges:
                path = path as ifs.IGeomPath;
                old_value = this.values[1][this.values[0][path.id][path.ti][path.si]];
                this.values[0][path.id][path.ti][path.si] = index;
                return old_value;
        }
    }
    /**
    * Get the number of attribute values. 
    * @return The number of attribute values.
    */
    public count():number  {
        return this.values[0].length;
    }
}