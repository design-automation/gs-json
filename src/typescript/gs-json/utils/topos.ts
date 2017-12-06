import * as ifs from "./ifaces_gs";
import {Arr} from "./arr";
import {EGeomType, mapGeomTypeToString} from "./enums";
import {Point} from "./entities";

/**
 * Topo class.
 * An abstrcat class that is the superclass for all topological components:
 * vertices, edges, wires, and faces.
 */
export abstract class Topo implements ifs.ITopo {
    protected geom: ifs.IGeom;
    protected path: ifs.ITopoPath;
    /**
     * Creates an instance of one of the subclasses of Topo.
     * The entity must already exists in the geometry.
     * In general, you do not need to create topological components.
     * Topology will be created for you when you create geometric objects.
     * @param geom The Geom object to which the topo belongs.
     * @param path The path of the entity. This path must already exist in the geometry.
     * @return The Topo object.
     */
    constructor(geom: ifs.IGeom, path: ifs.ITopoPath) {
        this.geom = geom;
        this.path = path;
    }
    /**
     * Get the ID of the object to which this topological component belongs.
     * @return The object ID number.
     */
    public getObjID(): number {
        return this.path.id;
    }
    /**
     * Get the geometry object to which this topological component belongs.
     * @return The Geom object.
     */
    public getGeom(): ifs.IGeom {
        return this.geom;
    }
    /**
     * Get the model object to which this topological component belongs.
     * @return The model object.
     */
    public getModel(): ifs.IModel {
        return this.geom.getModel();
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
    public getTopoPath(): ifs.ITopoPath {
        return this.path;
    }
    /**
     * Get the attribute names for this topological component.
     * @return The array of attribute names.
     */
    public getAttribNames(): string[] {
        const attribs: ifs.ITopoAttrib[] = this.getModel().getAttribs(this.getGeomType()) as ifs.ITopoAttrib[];
        return attribs.map((attrib) => attrib.getName());
    }
    /**
     * Get an attribute value for this topological component.
     * @param name The attribute name.
     * @return The attribute value.
     */
    public getAttribValue(name: string): any {
        const attrib: ifs.ITopoAttrib = this.getModel().getAttrib(name, this.getGeomType()) as ifs.ITopoAttrib;
        return attrib.getValue(this.path);
    }
    /**
     * Set an attribute value for this topological component.
     * @param name The attribute name.
     * @param value The new attribute value.
     * @return The old attribute value.
     */
    public setAttribValue(name: string, value: any): any {
        const attrib: ifs.ITopoAttrib = this.getModel().getAttrib(name, this.getGeomType()) as ifs.ITopoAttrib;
        return attrib.setValue(this.path, value);
    }
    /**
     * Get the group names for all the groups for which this topological component is a member.
     * @return The array of groups.
     */
    public getGroups(): ifs.IGroup[] {
        return this.getModel().getGroups().
            filter((v) => this.path.id in v.getObjIDs());
                // map((v, i) => v.getName());
    }
}

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
        const point_id: number = this.geom.getObjData(this.path) as number;
        switch (this.path.tt) {
            case EGeomType.wires:
                return new Point(this.geom, point_id);
            case EGeomType.faces:
                return new Point(this.geom, point_id);
        }
    }
    /**
     * Get the edge for which this is the start vertex.
     * @return The edge object.
     */
    public getEdge(): ifs.IEdge {
        let edge_index: number = this.path.si;
        if (edge_index > this.getWireOrFace().numEdges() - 1) {
            if (!this.getWireOrFace().isClosed()) {return null; }
            edge_index = 0;
        }
        return new Edge(this.geom,
            new TopoPath(this.path.id, this.path.tt, this.path.ti, EGeomType.edges, edge_index));
    }
    /**
     * Get the wire or face to which this vertex belongs.
     * @return The wire or face object.
     */
    public getWireOrFace(): ifs.IWire|ifs.IFace {
        switch (this.path.tt) {
            case EGeomType.wires:
                return new Wire(this.geom, new TopoPath(this.path.id, this.path.tt, this.path.ti));
            case EGeomType.faces:
                return new Face(this.geom, new TopoPath(this.path.id, this.path.tt, this.path.ti));
        }
    }
    /**
     * Find the next vertex in the sequence of vertices in the wire or face.
     * @return The next vertex object.
     */
    public next(): ifs.IVertex {
        let vertex_index: number = this.path.si + 1;
        if (vertex_index > this.getWireOrFace().numVertices() - 1) {
            if (!this.getWireOrFace().isClosed()) {return null; }
            vertex_index = 0;
        }
        return new Vertex(this.geom,
            new TopoPath(this.path.id, this.path.tt, this.path.ti, this.path.st, vertex_index));
    }
    /**
     * Find the previous vertex in the sequence of vertices in the wire or face.
     * @return The previous vertex object.
     */
    public previous(): ifs.IVertex {
        let vertex_index: number = this.path.si - 1;
        if (vertex_index < 0) {
            if (!this.getWireOrFace().isClosed()) {return null; }
            vertex_index = this.getWireOrFace().numVertices() - 1;
        }
        return new Vertex(this.geom,
            new TopoPath(this.path.id, this.path.tt, this.path.ti, this.path.st, vertex_index));
    }
    /**
     * Within the parent object, find all vertices with the same point.
     * Returns an array containing two sub-arrays.
     * 1) The wire vertices, and 2) the face vertices.
     * @return An array containing the two sub-arrays of vertices.
     */
    public verticesSharedPoint(): ifs.IVertex[][] {
        const point_id: number = this.geom.getObjData(this.path);
        const obj_data: any = this.geom.getObjData(new TopoPath(this.path.id));
        // loop through all wires and extract verts that have same point_id
        const wire_vertices: ifs.IVertex[] = [];
        obj_data[0].forEach((w, w_i) => w.forEach((v, v_i) =>
            (v === point_id) // same point id
                && (!(w_i === this.path.ti && v_i === this.path.si)) // avoid dup
                && wire_vertices.push(new Vertex(this.geom,
                    new TopoPath(this.path.id, EGeomType.wires, w_i, this.path.st, v_i)))));
        // loop through all faces and extract verts that have same point_id
        const face_vertices: ifs.IVertex[] = [];
        obj_data[1].forEach((f, f_i) => f.forEach((v, v_i) =>
            (v === point_id) // same point id
                && (!(f_i === this.path.ti && v_i === this.path.si)) // avoid dup
                && face_vertices.push(new Vertex(this.geom,
                    new TopoPath(this.path.id, EGeomType.faces, f_i, this.path.st, v_i)))));
        return [wire_vertices, face_vertices];
    }
    /**
     * Within the parent object, find all vertices with the same point position.
     * Returns an array containing two sub-arrays.
     * 1) The wire vertices, and 2) the face vertices.
     * @return An array containing the two sub-arrays of vertices.
     */
    public verticesSamePosition(): ifs.IVertex[][] {
        const point_id: number = this.geom.getObjData(this.path);
        const obj_data: any = this.geom.getObjData(new TopoPath(this.path.id));
        // loop through all wires and extract verts that have same position
        const wire_vertices: ifs.IVertex[] = [];
        obj_data[0].forEach((w, w_i) => w.forEach((v, v_i) =>
            (this.geom.getPointData(v)[0] === this.geom.getPointData(point_id)[0]) // same pos
                 &&  (!(w_i === this.path.ti && v_i === this.path.si)) // avoid dup
                 &&  wire_vertices.push(new Vertex(this.geom,
                    new TopoPath(this.path.id, EGeomType.wires, w_i, this.path.st, v_i)))));
        // loop through all faces and extract verts that have same position
        const face_vertices: ifs.IVertex[] = [];
        obj_data[1].forEach((f, f_i) => f.forEach((v, v_i) =>
            (this.geom.getPointData(v)[0] === this.geom.getPointData(point_id)[0]) // same pos
                 &&  (!(f_i === this.path.ti && v_i === this.path.si)) // avoid dup
                 &&  face_vertices.push(new Vertex(this.geom,
                    new TopoPath(this.path.id, EGeomType.faces, f_i, this.path.st, v_i)))));
        return [wire_vertices, face_vertices]; // TODO remove dups
    }
}

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
        let vertex_index: number = this.path.si + 1;
        if (vertex_index > this.getWireOrFace().numVertices() - 1) {
            vertex_index = 0;
        }
        return [
            new Vertex(this.geom,
                new TopoPath(this.path.id, this.path.tt, this.path.ti, EGeomType.vertices, this.path.si)),
            new Vertex(this.geom,
                new TopoPath(this.path.id, this.path.tt, this.path.ti, EGeomType.vertices, vertex_index)),
       ];
    }
    /**
     * Get the wire or face to which this edge belongs.
     * @return The wire or face.
     */
    public getWireOrFace(): ifs.IWire|ifs.IFace {
        switch (this.path.tt) {
            case EGeomType.wires:
                return new Wire(this.geom, new TopoPath(this.path.id, this.path.tt, this.path.ti));
            case EGeomType.faces:
                return new Face(this.geom, new TopoPath(this.path.id, this.path.tt, this.path.ti));
        }
    }
    /**
     * Find the next edge in the sequence of edges in the wire or face.
     * @return The next edge object.
     */
    public next(): ifs.IEdge {
    let edge_index: number = this.path.si + 1;
        if (edge_index > this.getWireOrFace().numEdges() - 1) {

            if (!this.getWireOrFace().isClosed()) {return null;}
            edge_index = 0; 
        }
        return new Edge(this.geom, new TopoPath(this.path.id, this.path.tt, this.path.ti, this.path.st, edge_index));
    }

    /**
     * Find the previous edge in the sequence of edges in the wire or face.
     * @return The previous edge object.
     */
    public previous(): ifs.IEdge {
        let edge_index: number = this.path.si - 1;
        if (edge_index < 0) {
            if (!this.getWireOrFace().isClosed()) {return null; }
            edge_index = this.getWireOrFace().numEdges() - 1;
        }
        return new Edge(this.geom,
            new TopoPath(this.path.id, this.path.tt, this.path.ti, this.path.st, edge_index));
    }
    /**
     * Within the parent object, find all edges with the same two points as this edge.
     * The order of the points is ignored.
     * Returns an array containing two sub-arrays.
     * 1) The wire edges, and 2) the face edges.
     * @return An array containing the two sub-arrays of edges.
     */
    public edgesSharedPoints(): ifs.IEdge[][] {
        const point_id_0: number = this.geom.getObjData(this.path) as number;
        let vertex_index: number = this.path.si + 1;
        if (vertex_index > this.getWireOrFace().numVertices() - 1) {
            vertex_index = 0;
        }
        const point_id_1: number = this.geom.getObjData(
            new TopoPath(this.path.id, this.path.tt, this.path.ti, this.path.st, vertex_index)) as number;
        const points: number[] = [point_id_0, point_id_1].sort();
        const obj_data: any = this.geom.getObjData(new TopoPath(this.path.id));
        // loop through all wires and extract verts that have same point_id
        const wire_edges: ifs.IEdge[] = [];
        obj_data[0].forEach((w, w_i) => w.forEach((v, v_i) =>
            Arr.equal([v, obj_data[v_i + 1]].sort(), points) &&
                wire_edges.push(new Edge(this.geom,
                    new TopoPath(this.path.id, EGeomType.wires, w_i, this.path.st, v_i)))));
        // loop through all faces and extract verts that have same point_id
        const face_edges: ifs.IEdge[] = [];
        obj_data[1].forEach((f, f_i) => f.forEach((v, v_i) =>
            Arr.equal([v, obj_data[v_i + 1]].sort(), points) &&
                face_edges.push(new Edge(this.geom,
                    new TopoPath(this.path.id, EGeomType.faces, f_i, this.path.st, v_i)))));
        return [wire_edges, face_edges]; // TODO remove the edge itdelf from the list
    }
}

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
        return Arr.makeSeq(this.numVertices()).map((v, i) => new Vertex(this.geom,
            new TopoPath(this.path.id, this.path.tt, this.path.ti, EGeomType.vertices, v)));
    }
    /**
     * Get the edges for this wire.
     * @return An array of edges.
     */
    public getEdges(): ifs.IEdge[] {
        return Arr.makeSeq(this.numEdges()).map((v, i) => new Edge(this.geom,
            new TopoPath(this.path.id, this.path.tt, this.path.ti, EGeomType.edges, v)));
    }
    /**
     * Get the number of vertices in this wire.
     * @return The number of vertices.
     */
    public numVertices(): number {
        const points: number[] = this.geom.getObjData(this.path) as number[];
        if (points[points.length - 1] === -1) { // is closed
            return points.length - 1;
        }
        return points.length;
    }
    /**
     * Get the number of edges in this wire.
     * @return The number of edges.
     */
    public numEdges(): number {
        return this.geom.getObjData(this.path).length - 1;
    }
    /**
     * Return true if this wire is closed.
     * @return boolean
     */
    public isClosed(): boolean {
        const points: number[] = this.geom.getObjData(this.path) as number[];
        return (points[points.length - 1] === -1);
    }
}

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
        return Arr.makeSeq(this.numVertices()).map((v, i) => new Vertex(this.geom,
            new TopoPath(this.path.id, this.path.tt, this.path.ti, EGeomType.vertices, v)));
    }
    /**
     * Get the edges for this wire.
     * @return An array of edges.
     */
    public getEdges(): ifs.IEdge[] {
        return Arr.makeSeq(this.numEdges()).map((v, i) => new Edge(this.geom,
            new TopoPath(this.path.id, this.path.tt, this.path.ti, EGeomType.edges, v)));
    }
    /**
     * Get the number of vertices in this face.
     * This is the same as numEdges().
     * @return The number of vertices.
     */
    public numVertices(): number {
        return this.geom.getObjData(this.path).length - 1;
    }
    /**
     * Get the number of edged in this face.
     * This is the same as numVertices().
     * @return The number of edges.
     */
    public numEdges(): number {
        return this.geom.getObjData(this.path).length - 1;
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
        throw new Error ("Method not implemented.");
    }
}

// Path
/**
 * to be completed
 */
export class TopoPath implements ifs.ITopoPath {
    public id: number;                    // obj id
    public tt: EGeomType.faces|EGeomType.wires = null;      // topo type
    public ti: number = null;             // topo index
    public st: EGeomType.vertices|EGeomType.edges = null;   // sub topo-type
    public si: number = null;             // sub topo-index
    // for example, new Path([ifs.ETopoType.obj, 22], )
    /**
     * to be completed
     * @param
     * @return
     */
    constructor(id: number,
                tt?: EGeomType.faces|EGeomType.wires, ti?: number,
                st?: EGeomType.vertices|EGeomType.edges, si?: number) {
        this.id = id;
        if (tt) {
            this.tt = tt;
            this.ti = ti;
            if (st) {
                this.st = st;
                this.si = si;
            }
        }
    }
    public equals(path: ifs.ITopoPath) {
        return this.toString() === path.toString();
    }
    public toString() {
        return "Obj: " + this.id + "/" +
            mapGeomTypeToString.get(this.tt) + ": " + this.ti + "/" +
            mapGeomTypeToString.get(this.st) + ": " + this.si;
    }
}
