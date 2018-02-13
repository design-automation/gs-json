import { ITopoAttrib, IVertex, IEdge, IWire, IFace } from "./ifaces_gs";
import { ITopoPathData } from "./ifaces_json";
import { Attrib } from "./attrib";
/**
 * TopoAttrib class for topos (vertices, edges, wires, and faces).
 * Semantic attributes that are attached to points or objects.
 * An instance of this class stores a list of attributes values.
 */
export declare class TopoAttrib extends Attrib implements ITopoAttrib {
    /**
     * Get all paths for this attribute.
     * @return An array of paths.
     */
    getPaths(): ITopoPathData[];
    /**
     * Get all topos for this attribute.
     * @return An array of paths.
     */
    getTopos(): IVertex[] | IEdge[] | IWire[] | IFace[];
    /**
     * Get all labels for this attribute.
     * @return An array of labels.
     */
    getLabels(): string[];
}
