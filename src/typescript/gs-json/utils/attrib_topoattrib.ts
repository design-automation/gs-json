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

    /**
     * Get all paths for this attribute.
     * @return An array of paths.
     */
    public getPaths(): any {
        return this._kernel.topoAttribGetPaths(this._name, this._geom_type);
    }

    /**
     * Get all labels for this attribute.
     * @return An array of labels.
     */
    public getLabels(): string[] {
        switch (this._geom_type) {
            case EGeomType.vertices:
                return this.getPaths().map(
                    (path) => "o" + path.id + ":" + ["w","f"][path.tt] + path.ti + ":v" + path.si);
            case EGeomType.edges:
                return this.getPaths().map(
                    (path) => "o" + path.id + ":" + ["w","f"][path.tt] + path.ti + ":e" + path.si);
            case EGeomType.wires:
                return this.getPaths().map(
                    (path) => "o" + path.id + ":w" + path.ti);
            case EGeomType.faces:
                return this.getPaths().map(
                    (path) => "o" + path.id + ":f" + path.ti);
        }
    }
}
