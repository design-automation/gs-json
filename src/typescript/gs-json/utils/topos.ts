import * as ifs from "./ifaces_gs";
import {Kernel} from "./kernel";
import {ITopoPathData} from "./ifaces_json";
import {EGeomType} from "./enums";
import {Point} from "./entities";
import {Group} from "./groups";

//  ================================================================================================

/**
 * Topo class.
 * An abstrcat class that is the superclass for all topological components:
 * vertices, edges, wires, and faces.
 */
export abstract class Topo implements ifs.ITopo {
    protected _kernel: Kernel;
    protected _path: ITopoPathData;
    /**
     * Creates an instance of one of the subclasses of Topo.
     * The entity must already exists in the geometry.
     * In general, you do not need to create topological components.
     * Topology will be created for you when you create geometric objects.
     * @param geom The Geom object to which the topo belongs.
     * @param path The path of the entity. This path must already exist in the geometry.
     * @return The Topo object.
     */
    constructor(kernel: Kernel, path: ITopoPathData) {
        this._kernel = kernel;
        this._path = path;
    }

    //  This topo ----------------------------------------------------------------------------------

    /**
     * Get the ID of the object to which this topological component belongs.
     * @return The object ID number.
     */
    public getObjID(): number {
        return this._path.id;
    }

    /**
     * Get the geometry type for this topological component.
     * This method mst be overridden by the sub-classes.
     * @return The geometry type.
     */
    public getGeomType(): EGeomType {
        // Do not implement this method.
        throw new Error ("Method to be overridden by subclass.");
    }

    /**
     * Get the geometry path for this topological component.
     * @return The geometry path.
     */
    public getTopoPath(): ITopoPathData {
        return this._path;
    }

    //  Attributes ---------------------------------------------------------------------------------

    /**
     * Get the attribute names for this topological component.
     * @return The array of attribute names.
     */
    public getAttribNames(): string[] {
        return this._kernel.attribGetNames(this.getGeomType());
    }

    /**
     * Get an attribute value for this topological component.
     * @param name The attribute name.
     * @return The attribute value.
     */
    public getAttribValue(name: string): any {
        return this._kernel.topoAttribGetValue(name, this.getGeomType(), this._path);
    }

    /**
     * Set an attribute value for this topological component.
     * @param name The attribute name.
     * @param value The new attribute value.
     * @return The old attribute value.
     */
    public setAttribValue(name: string, value: any): any {
        return this._kernel.topoAttribSetValue(name, this.getGeomType(), this._path, value);
    }

    //  Groups -------------------------------------------------------------------------------------

    /**
     * Get the group names for all the groups for which this topological component is a member.
     * @return The array of groups.
     */
    public getGroups(): ifs.IGroup[] {
        const names: string[] = this._kernel.topoGetGroups(this._path);
        return names.map((name) => new Group(this._kernel, name));
    }
}

//  ================================================================================================

/**
 * Vertex class.
 */
export class Vertex extends Topo implements ifs.IVertex {
    /**
     * Get the geometry type: "vertices".
     * This method overrides the method in the Topo class.
     * @return The topo type.
     */
    public getGeomType(): EGeomType {
        return EGeomType.vertices;
    }

    /**
     * Get the point associated with this vertex.
     * @return The point object.
     */
    public getPoint(): ifs.IPoint {
        const id: number = this._kernel.vertexGetPoint(this._path);
        return new Point(this._kernel, id);
    }

    /**
     * Get the edge for which this is the start vertex.
     * @return The edge object.
     */
    public getEdge(): ifs.IEdge {
        const path: ITopoPathData = this._kernel.vertexGetEdge(this._path);
        return new Edge(this._kernel, path);
    }
    /**
     * Get the wire or face to which this vertex belongs.
     * @return The wire or face object.
     */
    public getWireOrFace(): ifs.IWire|ifs.IFace {
        const path: ITopoPathData = this._kernel.vertexGetTopo(this._path);
        if (path.tt === 0) { // wire
            return new Wire(this._kernel, path);
        } else {
            return new Face(this._kernel, path);
        }
    }
    /**
     * Find the next vertex in the sequence of vertices in the wire or face.
     * @return The next vertex object.
     */
    public next(): ifs.IVertex {
        const path: ITopoPathData = this._kernel.vertexNext(this._path);
        if (path === null) {return null;}
        return new Vertex(this._kernel, path);
    }
    /**
     * Find the previous vertex in the sequence of vertices in the wire or face.
     * @return The previous vertex object.
     */
    public previous(): ifs.IVertex {
        const path: ITopoPathData = this._kernel.vertexPrevious(this._path);
        if (path === null) {return null;}
        return new Vertex(this._kernel, path);
    }
    /**
     * Within the parent object, find all vertices with the same point.
     * Returns an array containing two sub-arrays.
     * 1) The wire vertices, and 2) the face vertices.
     * @return An array containing the two sub-arrays of vertices.
     */
    public verticesSharedPoint(): ifs.IVertex[][] {
        const paths: ITopoPathData[][] = this._kernel.geomFindVerticesSharedPoint(this._path);
        return [
            paths[0].map((path) => new Vertex(this._kernel, path)), // wires
            paths[1].map((path) => new Vertex(this._kernel, path)), // faces
        ];
    }
    /**
     * Within the parent object, find all vertices with the same point position.
     * Returns an array containing two sub-arrays.
     * 1) The wire vertices, and 2) the face vertices.
     * @return An array containing the two sub-arrays of vertices.
     */
    public verticesSamePosition(): ifs.IVertex[][] {
        const paths: ITopoPathData[][] = this._kernel.geomFindVerticesSamePosition(this._path);
        return [
            paths[0].map((path) => new Vertex(this._kernel, path)), // wires
            paths[1].map((path) => new Vertex(this._kernel, path)), // faces
        ];
    }
}

//  ================================================================================================

/**
 * Edge class.
 */
export class Edge extends Topo implements ifs.IEdge {
    /**
     * Get the geometry type: "edges".
     * This method overrides the method in the Topo class.
     * @return The topo type.
     */
    public getGeomType(): EGeomType {
        return EGeomType.edges;
    }

    /**
     * Get the two vertices for this edge.
     * @return An array of two edges.
     */
    public getVertices(): ifs.IVertex[] {
        const paths: ITopoPathData[] = this._kernel.edgeGetVertices(this._path);
        return paths.map((path) => new Vertex(this._kernel, path));
    }

    /**
     * Get the wire or face to which this edge belongs.
     * @return The wire or face.
     */
    public getWireOrFace(): ifs.IWire|ifs.IFace {
        const path: ITopoPathData = this._kernel.edgeGetTopo(this._path);
        if (path.tt === 0) { // wire
            return new Wire(this._kernel, path);
        } else {
            return new Face(this._kernel, path);
        }
    }

    /**
     * Find the next edge in the sequence of edges in the wire or face.
     * @return The next edge object.
     */
    public next(): ifs.IEdge {
        const path: ITopoPathData = this._kernel.edgeNext(this._path);
        if (path === null) {return null;}
        return new Edge(this._kernel, path);
    }

    /**
     * Find the previous edge in the sequence of edges in the wire or face.
     * @return The previous edge object.
     */
    public previous(): ifs.IEdge {
        const path: ITopoPathData = this._kernel.edgePrevious(this._path);
        if (path === null) {return null;}
        return new Edge(this._kernel, path);
    }

    /**
     * Within the parent object, find all edges with the same two points as this edge.
     * The order of the points is ignored.
     * Returns an array containing two sub-arrays.
     * 1) The wire edges, and 2) the face edges.
     * @return An array containing the two sub-arrays of edges.
     */
    public edgesSharedPoints(): ifs.IEdge[][] {
        const paths: ITopoPathData[][] = this._kernel.geomFindEdgesSharedPoints(this._path);
        return [
            paths[0].map((path) => new Edge(this._kernel, path)), // wires
            paths[1].map((path) => new Edge(this._kernel, path)), // faces
        ];
    }
}

//  ================================================================================================

/**
 * Wire class
 */
export class Wire extends Topo implements ifs.IWire {
    /**
     * Get the geometry type: "wires".
     * This method overrides the method in the Topo class.
     * @return The topo type.
     */
    public getGeomType(): EGeomType {
        return EGeomType.wires;
    }

    /**
     * Get the vertices for this wire.
     * @return An array of vertices.
     */
    public getVertices(): ifs.IVertex[] {
        const paths: ITopoPathData[] = this._kernel.topoGetVertices(this._path);
        return paths.map((path) => new Vertex(this._kernel, path));
    }

    /**
     * Get the edges for this wire.
     * @return An array of edges.
     */
    public getEdges(): ifs.IEdge[] {
        const paths: ITopoPathData[] = this._kernel.topoGetEdges(this._path);
        return paths.map((path) => new Edge(this._kernel, path));
    }

    /**
     * Get the number of vertices in this wire.
     * @return The number of vertices.
     */
    public numVertices(): number {
        return this._kernel.topoNumVertices(this._path);
    }

    /**
     * Get the number of edges in this wire.
     * @return The number of edges.
     */
    public numEdges(): number {
        return this._kernel.topoNumEdges(this._path);
    }

    /**
     * Return true if this wire is closed.
     * @return boolean
     */
    public isClosed(): boolean {
        return this._kernel.topoIsClosed(this._path);
    }

    /**
     * Within the parent object, find all wires that share at least n points.
     * @return An array of wires.
     */
    public wiresSharedPoints(num_shared_points?: number): ifs.IWire[] {
        const paths: ITopoPathData[] = this._kernel.geomFindTopoSharedPoints(this._path);
        return paths.map((path) => new Wire(this._kernel, path));
    }
}

//  ================================================================================================

/**
 * Face class
 */
export class Face extends Topo implements ifs.IFace {
    /**
     * Get the geometry type: "faces".
     * This method overrides the method in the Topo class.
     * @return The topo type.
     */
    public getGeomType(): EGeomType {
        return EGeomType.faces;
    }

    /**
     * Get the vertices for this wire.
     * @return An array of vertices.
     */
    public getVertices(): ifs.IVertex[] {
        const paths: ITopoPathData[] = this._kernel.topoGetVertices(this._path);
        return paths.map((path) => new Vertex(this._kernel, path));
    }

    /**
     * Get the edges for this wire.
     * @return An array of edges.
     */
    public getEdges(): ifs.IEdge[] {
        const paths: ITopoPathData[] = this._kernel.topoGetEdges(this._path);
        return paths.map((path) => new Edge(this._kernel, path));
    }

    /**
     * Get the number of vertices in this face.
     * This is the same as numEdges().
     * @return The number of vertices.
     */
    public numVertices(): number {
        return this._kernel.topoNumVertices(this._path);
    }

    /**
     * Get the number of edged in this face.
     * This is the same as numVertices().
     * @return The number of edges.
     */
    public numEdges(): number {
        return this._kernel.topoNumEdges(this._path);
    }

    /**
     * Return true, since a face is always closed.
     * @return boolean
     */
    public isClosed(): boolean {
        return true;
    }

    /**
     * Within the parent object, find all faces that share at least n points.
     * @return An array of faces.
     */
    public facesSharedPoints(num_shared_points?: number): ifs.IFace[] {
        const paths: ITopoPathData[] = this._kernel.geomFindTopoSharedPoints(this._path);
        return paths.map((path) => new Face(this._kernel, path));
    }
}
