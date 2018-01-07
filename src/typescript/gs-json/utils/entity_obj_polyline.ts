import {Arr} from "./arr";
import {IPoint, IVertex, IEdge, IWire, IFace, IPolyline} from "./ifaces_gs";
import {EGeomType, EObjType} from "./enums";
import {Obj} from "./entity_obj";
/**
 * Class Polyline.
 * A polyline consists of one wire and no faces.
 * The wire has a sequence of vertices.
 * The wire may be open or closed.
 * A polyline may be part of a group and may have attributes.
 */
export class Polyline extends Obj implements IPolyline {
    /**
     * Get the object type: "polyline".
     * @return Polyline object type.
     */
    public getObjType(): EObjType {
        return EObjType.polyline;
    }

    /**
     * Checks if the polyline is closed.
     * @return Return true if the polyline is closed.
     */
    public isClosed(): boolean {
        return this.getWires()[0].isClosed();
    }

    /**
     * Returns the number of vertices in this polyline.
     * @return Return the number of vertices.
     */
    public numVertices(): number {
        return this.getWires()[0].numVertices();
    }

    /**
     * Returns the number of edges in this polyline.
     * @return Return the number of edges.
     */
    public numEdges(): number {
        return this.getWires()[0].numEdges();
    }
}
