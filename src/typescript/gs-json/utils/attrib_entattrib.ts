import {IEntAttrib} from "./ifaces_gs";
import {Kernel} from "./kernel";
import {ITopoPathData} from "./ifaces_json";
import {EGeomType, EDataType} from "./enums";
import {Attrib} from "./attrib";

/**
 * EntAttrib class for entities (points and objects).
 * An class that represents a semantic attribute that is attached to a point or object.
 * An instance of this class stores a list of attributes values.
 */
export class EntAttrib extends Attrib implements IEntAttrib {
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

    /**
     * Get all IDs for this attribute. These can be either point IDs or object IDs.
     * @return An array of IDs.
     */
    public getIDs(): number[] {
        return this._kernel.entAttribGetIDs(this._name, this._geom_type);
    }

    /**
     * Get all labels for this attribute.
     * @return An array of labels.
     */
    public getLabels(): string[] {
        switch (this._geom_type) {
            case EGeomType.points:
                return this.getIDs().map((v) => "p" + v);
            case EGeomType.objs:
                return this.getIDs().map((v) => "o" + v);
        }
    }
}
