import {Arr} from "./arr";
import {ITopoPathData} from "./ifaces_json";
import {IPoint, IVertex, IEdge, IWire, IFace, IPolyline} from "./ifaces_gs";
import {EGeomType, EObjType} from "./enums";
import {Obj} from "./entity_obj";
import {Vertex} from "./topo_sub";

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

    /**
     * Insert an extra vertex.
     * @return The new vertex.
     */
    public insertVertex(edge: IEdge, point: IPoint): IVertex {
        if (edge.getObjID() !== this._id) {throw new Error("Edge must belong to polyline.");}
        const path: ITopoPathData = edge.getTopoPath();
        this._kernel.edgeSplit(path, point.getID());
        const new_path: ITopoPathData = {
            id: path.id, tt: path.tt, ti: path.ti, st: 0, si: path.si + 1};
        return new Vertex(this._kernel, new_path);
    }

    /**
     * Delete a vertex.
     * @return The next vertex that replaces it, or null if it was teh last vertex of an open polyline.
     */
    public delVertex(vertex: IVertex): IVertex {
        throw new Error("Method not implemented.");
    }

}
