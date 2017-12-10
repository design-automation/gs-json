import * as ifs from "./ifaces_gs";
import {Kernel} from "./kernel";
import {ITopoPathData} from "./ifaces_json";
import {EGeomType, EDataType} from "./enums";
/**
 * Attrib abstract class.
 * An class that represents a semantic attribute.
 * An attribute is data that is attached to either:
 * entities (points and objects) or
 * topological components (vertices, edges, wires, faces).
 * An instance of this class stores a list of attributes values.
 */
export abstract class Attrib implements ifs.IAttrib {
    protected _kernel: Kernel;
    protected _name: string;
    protected _geom_type: EGeomType;

    /**
     * Creates an instance of the Attrib class.
     * The attribute data must already exists in the model.
     * Do not use this constructor if you want to add a new attribute to the model.
     * Instead, you should use the "addAttrib()" methdod in the model class.
     * @param model The Model object in which this attribute will be created.
     * @param data The attribute data in the model.
     * @return The Attrib object.
     */
    constructor(kernel: Kernel, name: string, geom_type: EGeomType) {
        this._kernel = kernel;
        this._name = name;
        this._geom_type = geom_type;
    }

    //  This attribute -----------------------------------------------------------------------------

    /**
     * Get the name of the attribute.
     * @return The name.
     */
    public getName(): string {
        return this._name;
    }

    /**
     * Set the geometry type for the attribute.
     * @return The geometry type.
     */
    public getGeomType(): EGeomType {
        return this._geom_type;
    }

    /**
     * Set the name of the attribute.
     * @param name The new name.
     * @return The old name.
     */
    public setName(name: string): string {
        const old_name: string = this._name;
        this._kernel.attribSetName(old_name, name, this._geom_type);
        this._name = name;
        return old_name;
    }

    /**
     * Set the data type for the attribute values.
     * @return The data type.
     */
    public getDataType(): EDataType {
        return this._kernel.attribGetDataType(this._name, this._geom_type);
    }

    /**
     * Get the number of attribute values. DEPRECEATED.
     * @return The number of attribute values.
     */
    public count(): number  {
        //This is not so clear for toptos
        // This method in general does not make sense,
        // For points, it returns number of points
        // for object it returns number of objs
        // For topos, the return value has no clear meaning
        throw new Error("not implemented");
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
        return this._kernel.entAttribGetValue(this._name, this._geom_type, id);
    }

    /**
     * Set a single attribute value.
     * The data type of the attribute value can be found using the getDataType() method.
     * @param id The id of a geometric entity.
     * @param value The new value.
     * @return The old value.
     */
    public setValue(id: number, value: any): any {
        return this._kernel.entAttribSetValue(this._name, this._geom_type, id, value);
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
    public getValue(path: ITopoPathData): any {
        return this._kernel.topoAttribGetValue(this._name, this._geom_type, path);
    }

    /**
     * Set a single attribute value.
     * The data type of the attribute value can be found using the getDataType() method.
     * @param path The path to a topological component.
     * @param value The new value.
     * @return The old value.
     */
    public setValue(path: ITopoPathData, value: any): any {
        return this._kernel.topoAttribSetValue(this._name, this._geom_type, path, value);
    }
}
