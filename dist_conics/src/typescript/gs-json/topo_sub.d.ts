import { XYZ, IPoint, IVertex, IEdge, IWire, IFace } from "./ifaces_gs";
import { Topo } from "./topo";
import { EGeomType } from "./enums";
/**
 * Vertex class.
 */
export declare class Vertex extends Topo implements IVertex {
    /**
     * Get the geometry type: "vertices".
     * This method overrides the method in the Topo class.
     * @return The topo type.
     */
    getGeomType(): EGeomType;
    /**
     * Get a compact string representation of the geometry path for this topological component, dtsrting with
     * the obj ID.
     * @return The geometry path str.
     */
    getTopoPathStr(): string;
    /**
     * Get the centroid of this topo. This is used for attaching labels.
     * @return The xyz of the centroid.
     */
    getLabelCentroid(): XYZ;
    /**
     * Get the point associated with this vertex.
     * @return The point object.
     */
    getPoint(): IPoint;
    /**
     * Get the edge for which this is the start vertex.
     * @return The edge object.
     */
    getEdge(): IEdge;
    /**
     * Get the wire or face to which this vertex belongs.
     * @return The wire or face object.
     */
    getWireOrFace(): IWire | IFace;
    /**
     * Find the next vertex in the sequence of vertices in the wire or face.
     * @return The next vertex object.
     */
    next(): IVertex;
    /**
     * Find the previous vertex in the sequence of vertices in the wire or face.
     * @return The previous vertex object.
     */
    previous(): IVertex;
    /**
     * Within the parent object, find all vertices with the same point.
     * Returns an array containing two sub-arrays.
     * 1) The wire vertices, and 2) the face vertices.
     * @return An array containing the two sub-arrays of vertices.
     */
    verticesSharedPoint(): IVertex[][];
    /**
     * Within the parent object, find all vertices with the same point position.
     * Returns an array containing two sub-arrays.
     * 1) The wire vertices, and 2) the face vertices.
     * @return An array containing the two sub-arrays of vertices.
     */
    verticesSamePosition(): IVertex[][];
}
/**
 * Edge class.
 */
export declare class Edge extends Topo implements IEdge {
    /**
     * Get the geometry type: "edges".
     * This method overrides the method in the Topo class.
     * @return The topo type.
     */
    getGeomType(): EGeomType;
    /**
     * Get a compact string representation of the geometry path for this topological component, dtsrting with
     * the obj ID.
     * @return The geometry path str.
     */
    getTopoPathStr(): string;
    /**
     * Get the centroid of this topo. This is used for attaching labels.
     * @return The xyz of the centroid.
     */
    getLabelCentroid(): XYZ;
    /**
     * Get the two vertices for this edge.
     * @return An array of two edges.
     */
    getVertices(): IVertex[];
    /**
     * Get the wire or face to which this edge belongs.
     * @return The wire or face.
     */
    getWireOrFace(): IWire | IFace;
    /**
     * Find the next edge in the sequence of edges in the wire or face.
     * @return The next edge object.
     */
    next(): IEdge;
    /**
     * Find the previous edge in the sequence of edges in the wire or face.
     * @return The previous edge object.
     */
    previous(): IEdge;
    /**
     * Within the parent object, find all edges with the same two points as this edge.
     * The order of the points is ignored.
     * Returns an array containing two sub-arrays.
     * 1) The wire edges, and 2) the face edges.
     * @return An array containing the two sub-arrays of edges.
     */
    edgesSharedPoints(): IEdge[][];
}
/**
 * Wire class
 */
export declare class Wire extends Topo implements IWire {
    /**
     * Get the geometry type: "wires".
     * This method overrides the method in the Topo class.
     * @return The topo type.
     */
    getGeomType(): EGeomType;
    /**
     * Get a compact string representation of the geometry path for this topological component, dtsrting with
     * the obj ID.
     * @return The geometry path str.
     */
    getTopoPathStr(): string;
    /**
     * Get the centroid of this topo. This is used for attaching labels.
     * @return The xyz of the centroid.
     */
    getLabelCentroid(): XYZ;
    /**
     * Get the vertices for this wire.
     * @return An array of vertices.
     */
    getVertices(): IVertex[];
    /**
     * Get the edges for this wire.
     * @return An array of edges.
     */
    getEdges(): IEdge[];
    /**
     * Get the number of vertices in this wire.
     * @return The number of vertices.
     */
    numVertices(): number;
    /**
     * Get the number of edges in this wire.
     * @return The number of edges.
     */
    numEdges(): number;
    /**
     * Return true if this wire is closed.
     * @return boolean
     */
    isClosed(): boolean;
    /**
     * Within the parent object, find all wires that share at least n points.
     * @return An array of wires.
     */
    wiresSharedPoints(num_shared_points?: number): IWire[];
}
/**
 * Face class
 */
export declare class Face extends Topo implements IFace {
    /**
     * Get the geometry type: "faces".
     * This method overrides the method in the Topo class.
     * @return The topo type.
     */
    getGeomType(): EGeomType;
    /**
     * Get a compact string representation of the geometry path for this topological component, dtsrting with
     * the obj ID.
     * @return The geometry path str.
     */
    getTopoPathStr(): string;
    /**
     * Get the centroid of this topo. This is used for attaching labels.
     * @return The xyz of the centroid.
     */
    getLabelCentroid(): XYZ;
    /**
     * Get the vertices for this wire.
     * @return An array of vertices.
     */
    getVertices(): IVertex[];
    /**
     * Get the edges for this wire.
     * @return An array of edges.
     */
    getEdges(): IEdge[];
    /**
     * Get the number of vertices in this face.
     * This is the same as numEdges().
     * @return The number of vertices.
     */
    numVertices(): number;
    /**
     * Get the number of edged in this face.
     * This is the same as numVertices().
     * @return The number of edges.
     */
    numEdges(): number;
    /**
     * Return true, since a face is always closed.
     * @return boolean
     */
    isClosed(): boolean;
    /**
     * Within the parent object, find all faces that share at least n points.
     * @return An array of faces.
     */
    facesSharedPoints(num_shared_points?: number): IFace[];
}
