import * as ifs from "./ifaces_gs";
import {Arr} from "./arr";
import {IAttribData} from "./ifaces_json";
import {EGeomType, EDataType, mapStringToGeomType, mapStringToDataType} from "./enums";
/**
 * Attrib abstract class.
 * An class that represents a semantic attribute.
 * An attribute is data that is attached to either:
 * entities (points and objects) or
 * topological components (vertices, edges, wires, faces).
 * An instance of this class stores a list of attributes values.
 */
export abstract class Attrib implements ifs.IAttrib {
    protected _model: ifs.IModel;
    protected _name: string;
    protected _geom_type: EGeomType;
    protected _data_type: EDataType;
    protected _values: any[]; // values[0] is the map, values[1] is the array of unique values
    /**
     * Creates an instance of the Attrib class.
     * The attribute data must already exists in the model.
     * Do not use this constructor if you want to add a new attribute to the model.
     * Instead, you should use the "addAttrib()" methdod in the model class.
     * @param model The Model object in which this attribute will be created.
     * @param data The attribute data in the model.
     * @return The Attrib object.
     */
    constructor(model: ifs.IModel, data: IAttribData) {
        this._model = model;
        if (data === undefined) {
            throw new Error("Data must be defined.");
        }
        if (data.name !== undefined) {
            this._name = data.name;
        } else {
            throw new Error("Attribute name must be defined.");
        }
        if (data.geom_type !== undefined) {
            this._geom_type = mapStringToGeomType.get(data.geom_type); // data.geom_type is a str
        } else {
            throw new Error("Geometry type must be defined.");
        }
        if (data.data_type !== undefined) {
            this._data_type =  mapStringToDataType.get(data.data_type); // data.geom_type is a str
        } else {
            throw new Error("Data type must be defined.");
        }
        if (data.values !== undefined) {
            this._values = data.values;
        } else {
            this._values = [this._model.getGeom().getAttribTemplate(this._geom_type), [null]];
        }
    }
    /**
     * Get the name of the attribute.
     * @return The name.
     */
    public getName(): string {
        return this._name;
    }
    /**
     * Set the name of the attribute.
     * @param name The new name.
     * @return The old name.
     */
    public setName(name: string): string {
        const old_name: string = this._name;
        this._model.setAttribName(old_name, name, this._geom_type);
        this._name = name;
        return old_name;
    }
    /**
     * Set the geometry type for the attribute.
     * @return The geometry type.
     */
    public getGeomType(): EGeomType {
        return this._geom_type;
    }
    /**
     * Set the data type for the attribute values.
     * @return The data type.
     */
    public getDataType(): EDataType {
        return this._data_type;
    }

    /**
     * Get the number of attribute values.
     * @return The number of attribute values.
     */
    public count(): number  {
        return this._values[0].length;
    }
}

/**
 * EntAttrib class for entities (points and objects).
 * An class that represents a semantic attribute that is attached to a point or object.
 * An instance of this class stores a list of attributes values.
 */
export class EntAttrib extends Attrib implements ifs.IEntAttrib {
    /**
     * Get a single attribute value.
     * The data type of the attribute value can be found using the getDataType() method.
     * @param id The id of a geometric entity.
     * @return The value.
     */
    public getValue(id: number): any {
        return this._values[1][this._values[0][id]]; // TODO check by reference or by value?
    }
    /**
     * Set a single attribute value.
     * The data type of the attribute value can be found using the getDataType() method.
     * @param id The id of a geometric entity.
     * @param value The new value.
     * @return The old value.
     */
    public setValue(id: number, value: any): any {
        let index: number = Arr.indexOf(value, this._values);
        if (index === -1) {
            index = this._values[1].push(value) - 1;
        }
        let old_value: any;
        old_value = this._values[1][this._values[0][id]];
        this._values[0][id] = index;
        return old_value;
    }
    /**
     * Add an attributes value.
     * @param id The id of a geometric entity.
     * @return True if the id does not exist.
     */
    public addValue(id: number): boolean  {
        if (this._values[0][id] !== undefined) {return false; }
        this._values[0][id] = 0;
        return true;

    }
    /**
     * Delete an attribute value.
     * @param id The id of a geometric entity.
     * @return The attribute value.
     */
    public delValue(id: number): any  {
        let old_value: any;
        old_value = this._values[1][this._values[0][id]];
        delete this._values[0][id];
        return old_value;
    }
    /**
     * Add a set of attributes values for one object.
     * @param id The id of the object.
     * @return True if attribute values for the bject do not exist.
     */
    public addObjValues(id: number): boolean  {
        if (this._values[1][id] !== undefined) {return false; }
        switch (this._geom_type) {
            case EGeomType.points:
                break;
            case EGeomType.objs:
                this.addValue(id);
                break;
        }
        return true;
    }
    /**
     * Delete a set of attributes values for one object.
     * @param id The id of the object.
     * @return False if attribute values for the object do not exist.
     */
    public delObjValues(id: number): boolean  {
        if (this._values[1][id] === undefined) {return false; }
        switch (this._geom_type) {
            case EGeomType.points:
                break;
            case EGeomType.objs:
                this.delValue(id);
                break;
        }
        return true;
    }
}

/**
 * TopoAttrib class for topos (vertices, edges, wires, and faces).
 * Semantic attributes that are attached to points or objects.
 * An instance of this class stores a list of attributes values.
 */
export class TopoAttrib extends Attrib implements ifs.ITopoAttrib {
    /**
     * Get a single attribute value.
     * The data type of the attribute value can be found using the getDataType() method.
     * @param path The path to a topological component.
     * @return The value.
     */
    public getValue(path: ifs.ITopoPath): any {
        switch (this._geom_type) {
            case EGeomType.wires: case EGeomType.faces:
                path = path as ifs.ITopoPath;
                return this._values[1][this._values[0][path.id][path.ti]];
            case EGeomType.vertices: case EGeomType.edges:
                path = path as ifs.ITopoPath;
                return this._values[1][this._values[0][path.id][path.ti][path.si]];
        }
    }
    /**
     * Set a single attribute value.
     * The data type of the attribute value can be found using the getDataType() method.
     * @param path The path to a topological component.
     * @param value The new value.
     * @return The old value.
     */
    public setValue(path: ifs.ITopoPath, value: any): any {
        let index: number = Arr.indexOf(value, this._values);
        if (index === -1) {
            index = this._values[1].push(value) - 1;
        }
        let old_value: any;
        switch (this._geom_type) {
            case EGeomType.wires: case EGeomType.faces:
                path = path as ifs.ITopoPath;
                old_value = this._values[1][this._values[0][path.id][path.ti]];
                this._values[0][path.id][path.ti] = index;
                return old_value;
            case EGeomType.vertices: case EGeomType.edges:
                path = path as ifs.ITopoPath;
                old_value = this._values[1][this._values[0][path.id][path.ti][path.si]];
                this._values[0][path.id][path.ti][path.si] = index;
                return old_value;
        }
    }
    /**
     * Add an attributes value.
     * @param path The path to a geometric entity or topological component.
     * @return True if teh path does not exist.
     */
    public addValue(path: ifs.ITopoPath): boolean  {
        switch (this._geom_type) {
            case EGeomType.wires: case EGeomType.faces:
                path = path as ifs.ITopoPath;
                if (this._values[0][path.id] === undefined) {this._values[0][path.id] = []; }
                if (this._values[0][path.id][path.ti] !== undefined) {return false; }
                this._values[0][path.id][path.ti] = 0;
                return true;
            case EGeomType.vertices: case EGeomType.edges:
                path = path as ifs.ITopoPath;
                if (this._values[0][path.id] === undefined) {this._values[0][path.id] = []; }
                if (this._values[0][path.id][path.ti] === undefined) {this._values[0][path.id][path.ti] = []; }
                if (this._values[0][path.id][path.ti][path.si] !== undefined) {return false; }
                this._values[0][path.id][path.ti][path.si] = 0;
                return true;
        }
    }
    /**
     * Delete an attribute value.
     * @param path The path to a geometric entity or topological component.
     * @return The attribute value.
     */
    public delValue(path: ifs.ITopoPath): any  {
        let old_value: any;
        switch (this._geom_type) {
            case EGeomType.wires: case EGeomType.faces:
                path = path as ifs.ITopoPath;
                old_value = this._values[1][this._values[0][path.id][path.ti]];
                delete this._values[0][path.id][path.ti];
                return old_value;
            case EGeomType.vertices: case EGeomType.edges:
                path = path as ifs.ITopoPath;
                old_value = this._values[1][this._values[0][path.id][path.ti][path.si]];
                delete this._values[0][path.id][path.ti][path.si];
                return old_value;
        }
        return null;
    }
    /**
     * Add a set of attributes values for one object.
     * @param id The id of the object.
     * @return True if attribute values for the bject do not exist.
     */
    public addObjValues(id: number): boolean  {
        if (this._values[1][id] !== undefined) {return false; }
        switch (this._geom_type) {
            case EGeomType.faces:
                Arr.flatten(this._model.getGeom().getObj(id).getFaces()).forEach((v, i) =>
                    this.addValue(v.getTopoPath()));
                break;
            case EGeomType.wires:
                Arr.flatten(this._model.getGeom().getObj(id).getWires()).forEach((v, i) =>
                    this.addValue(v.getTopoPath()));
                break;
            case EGeomType.edges:
                Arr.flatten(this._model.getGeom().getObj(id).getEdges()).forEach((v, i) =>
                    this.addValue(v.getTopoPath()));
                break;
            case EGeomType.vertices:
                Arr.flatten(this._model.getGeom().getObj(id).getVertices()).forEach((v, i) =>
                    this.addValue(v.getTopoPath()));
                break;
        }
        return true;
    }
    /**
     * Delete a set of attributes values for one object.
     * @param id The id of the object.
     * @return False if attribute values for the object do not exist.
     */
    public delObjValues(id: number): boolean  {
        if (this._values[1][id] === undefined) {return false; }
        switch (this._geom_type) {
            case EGeomType.faces:
                Arr.flatten(this._model.getGeom().getObj(id).getFaces()).forEach((v, i) =>
                    this.delValue(v.getTopoPath()));
                break;
            case EGeomType.wires:
                Arr.flatten(this._model.getGeom().getObj(id).getWires()).forEach((v, i) =>
                    this.delValue(v.getTopoPath()));
                break;
            case EGeomType.edges:
                Arr.flatten(this._model.getGeom().getObj(id).getEdges()).forEach((v, i) =>
                    this.delValue(v.getTopoPath()));
                break;
            case EGeomType.vertices:
                Arr.flatten(this._model.getGeom().getObj(id).getVertices()).forEach((v, i) =>
                    this.delValue(v.getTopoPath()));
                break;
        }
        return true;
    }
}
