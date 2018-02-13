import { IEntAttrib, IObj, IPoint } from "./ifaces_gs";
import { Attrib } from "./attrib";
/**
 * EntAttrib class for entities (points and objects).
 * An class that represents a semantic attribute that is attached to a point or object.
 * An instance of this class stores a list of attributes values.
 */
export declare class EntAttrib extends Attrib implements IEntAttrib {
    /**
     * Get all IDs for this attribute. These can be either point IDs or object IDs.
     * @return An array of IDs.
     */
    getIDs(): number[];
    /**
     * Get all entities for this attribute. These can be either points or objects.
     * @return An array of IDs.
     */
    getEnts(): IPoint[] | IObj[];
    /**
     * Get all labels for this attribute.
     * @return An array of labels.
     */
    getLabels(): string[];
}
