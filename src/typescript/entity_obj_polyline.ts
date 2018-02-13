import {Arr} from "./libs/arr/arr";
import {ITopoPathData} from "./ifaces_json";
import {XYZ, IPoint, IVertex, IEdge, IWire, IFace, IPolyline} from "./ifaces_gs";
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
     * Sets if the polyline is closed.
     * @param is_closed Ture if closed, false if open.
     * @return Return the old value for is_closed.
     */
    public setIsClosed(is_closed: boolean): boolean {
        const path: ITopoPathData = this.getWires()[0].getTopoPath();
        return this._kernel.topoSetIsClosed(path, is_closed);
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
        const new_edge_path: ITopoPathData = this._kernel.edgeSplit(path, point.getID());
        return new Vertex(this._kernel, new_edge_path);
    }

    /**
     * Add n extra vertex to the start or end.
     * @return The new vertex.
     */
    public addVertex(point: IPoint, to_start: boolean): IVertex {
        const path: ITopoPathData = this.getWires()[0].getTopoPath();
        this._kernel.topoAddVertex(path, point.getID(), to_start);
        const new_vertex_path: ITopoPathData = this._kernel.edgeSplit(path, point.getID());
        return new Vertex(this._kernel, new_vertex_path);
    }

    /**
     * Delete a vertex.
     * @return The next vertex that replaces it, or null if it was teh last vertex of an open polyline.
     */
    public delVertex(vertex: IVertex): IVertex {
        throw new Error("Method not implemented.");
    }

}
