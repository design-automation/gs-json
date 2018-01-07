import {IEntAttrib, IObj, IPoint} from "./ifaces_gs";
import {Kernel} from "./kernel";
import {ITopoPathData} from "./ifaces_json";
import {EGeomType, EDataType} from "./enums";
import {Attrib} from "./attrib";
import {Point} from "./entity_point";
import {_castToObjType} from "./entity_obj_cast";

/**
 * EntAttrib class for entities (points and objects).
 * An class that represents a semantic attribute that is attached to a point or object.
 * An instance of this class stores a list of attributes values.
 */
export class EntAttrib extends Attrib implements IEntAttrib {

    /**
     * Get all IDs for this attribute. These can be either point IDs or object IDs.
     * @return An array of IDs.
     */
    public getIDs(): number[] {
        return this._kernel.entAttribGetIDs(this._name, this._geom_type);
    }

    /**
     * Get all entities for this attribute. These can be either points or objects.
     * @return An array of IDs.
     */
    public getEnts(): IPoint[]|IObj[] {
        const ids: number[] = this._kernel.entAttribGetIDs(this._name, this._geom_type);
        switch (this._geom_type) {
            case EGeomType.points:
                return ids.map((id) => new Point(this._kernel, id));
            case EGeomType.points:
                return ids.map((id) => _castToObjType(this._kernel, id));
        }
    }

    /**
     * Get all labels for this attribute.
     * @return An array of labels.
     */
    public getLabels(): string[] {
        const ids: number[] = this._kernel.entAttribGetIDs(this._name, this._geom_type);
        switch (this._geom_type) {
            case EGeomType.points:
                return ids.map((v) => "p" + v);
            case EGeomType.objs:
                return ids.map((v) => "o" + v);
        }
    }
}
