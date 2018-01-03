import {Arr} from "./arr";
import {IPoint, IVertex, IEdge, IWire, IFace, IPolymesh} from "./ifaces_gs";
import {EGeomType, EObjType} from "./enums";
import {Obj} from "./entity_obj";

/**
 * Class Polymesh.
 * A polymesh is defined by a set of polygonal faces.
 * These faces may have arbitrary number of vertices,
 * may be concave or convex, and may be planar or non-planar.
 * All faces are expected to be connected to one anoter, so that there are no disjoint parts.
 * The polymesh will have closed wires along all its naked edges.
 * The polymesh may include one or more holes.
 * The holes will result in additional naked edges, each with their own wire.
 * A polymesh may be part of a group and may have attributes.
 */
export class Polymesh extends Obj implements IPolymesh {

    /**
     * Get the object type: "polymesh".
     * @return The polymesh object type.
     */
    public getObjType(): EObjType {
        return EObjType.polymesh;
    }

}
