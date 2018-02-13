import { IPoint, IVertex, IEdge, IPolyline } from "./ifaces_gs";
import { EObjType } from "./enums";
import { Obj } from "./entity_obj";
/**
 * Class Polyline.
 * A polyline consists of one wire and no faces.
 * The wire has a sequence of vertices.
 * The wire may be open or closed.
 * A polyline may be part of a group and may have attributes.
 */
export declare class Polyline extends Obj implements IPolyline {
    /**
     * Get the object type: "polyline".
     * @return Polyline object type.
     */
    getObjType(): EObjType;
    /**
     * Checks if the polyline is closed.
     * @return Return true if the polyline is closed.
     */
    isClosed(): boolean;
    /**
     * Sets if the polyline is closed.
     * @param is_closed Ture if closed, false if open.
     * @return Return the old value for is_closed.
     */
    setIsClosed(is_closed: boolean): boolean;
    /**
     * Returns the number of vertices in this polyline.
     * @return Return the number of vertices.
     */
    numVertices(): number;
    /**
     * Returns the number of edges in this polyline.
     * @return Return the number of edges.
     */
    numEdges(): number;
    /**
     * Insert an extra vertex.
     * @return The new vertex.
     */
    insertVertex(edge: IEdge, point: IPoint): IVertex;
    /**
     * Add n extra vertex to the start or end.
     * @return The new vertex.
     */
    addVertex(point: IPoint, to_start: boolean): IVertex;
    /**
     * Delete a vertex.
     * @return The next vertex that replaces it, or null if it was teh last vertex of an open polyline.
     */
    delVertex(vertex: IVertex): IVertex;
}
