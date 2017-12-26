import {ITopoAttrib} from "./ifaces_gs";
import {Kernel} from "./kernel";
import {ITopoPathData} from "./ifaces_json";
import {EGeomType, EDataType} from "./enums";
import {Attrib} from "./attrib";

/**
 * TopoAttrib class for topos (vertices, edges, wires, and faces).
 * Semantic attributes that are attached to points or objects.
 * An instance of this class stores a list of attributes values.
 */
export class TopoAttrib extends Attrib implements ITopoAttrib {

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
