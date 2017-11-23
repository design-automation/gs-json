import * as ifs from "./interfaces";
import {Arr} from "./arr";
import {Geom, GeomPath} from "./geom";
import {Point,Polyline,Polymesh} from "./entities";
import {Vertex, Edge, Wire, Face} from "./topos";
import {Group} from "./groups";
/**
 * Attrib class.
 * An class that represents a semantic attribute.
 * An attribute is data that is attached to a specific type of geometry, which includes
 * geometric entities and or topological component.
 * The geometric types are: "points", "vertices", "edges", "wires", "faces", and "objs".
 * An instance of this class stores a list of attributes values. 
 */
export class Attrib implements ifs.IAttrib {
    private model:ifs.IModel;
    private name:string;
    private attrib_type:ifs.EGeomType;
    private data_type:ifs.EDataType;
    private values_map:any[];
    private values:any[];
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
    * @param path The path to a geometric entity or topological component.
    * @return The value.
    */
    public getValue(path:ifs.IGeomPath):any {//TODO for points and objs, no path required
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
    /**
    * Set a single attribute value. 
    * The data type of the attribute value can be found using the getDataType() method.
    * @param path The path to a geometric entity or topological component.
    * @param value The new value.
    * @return The old value.
    */
    public setValue(path:ifs.IGeomPath, value:any):any {//TODO for points and objs, no path required
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
    /**
    * Get the number of attribute values. 
    * @return The number of attribute values.
    */
    public count():number  {
        return this.values_map.length;
    }
}