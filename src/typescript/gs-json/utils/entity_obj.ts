import * as three from "three";
import {Arr} from "./arr";
import {XYZ, IObj, IPoint, IVertex, IEdge, IWire, IFace, IGroup} from "./ifaces_gs";
import {ITopoPathData} from "./ifaces_json";
import {EGeomType, EObjType, mapObjTypeToString} from "./enums";
import {Vertex, Edge, Wire, Face} from "./topo_sub";
import {Ent} from "./entity";
import {Point} from "./entity_point";
import {Group} from "./groups";
import {_castToObjType} from "./entity_obj_cast";

/**
 * Abstract class Obj.
 * The superclass for all geometric objects,
 * including Polyline and Polymesh.
 */
export abstract class Obj extends Ent implements IObj {
    /**
     * Get the geometry type.
     * This method overrides the method in the Ent class.
     * @return The geometry type.
     */
    public getGeomType(): EGeomType {
        return EGeomType.objs;
    }

    /**
     * Get the object type.
     * This method will be overridden by subclasses.
     * @return The object type.
     */
    public getObjType(): EObjType {
        throw new Error ("Method to be overridden by subclass.");
    }

    /**
     * Check if this entity exists in the model. (i.e has it been deleted?)
     * @return The entity ID number.
     */
    public exists(): boolean {
        return this._kernel.geomHasObj(this._id);
    }

    /**
     * Get the label for this object.
     * @return The xyz of the centroid.
     */
    public getLabel(): string {
        return "o" + this._id;
    }

    /**
     * Get the label centroid for this object.
     * @return The xyz of the label.
     */
    public getLabelCentroid(): XYZ {
        const xyzs: XYZ[] = this.getPointsSet().map((v) => v.getPosition());
        const centroid: XYZ = [0,0,0];
        for (const xyz of xyzs) {
            centroid[0] += xyz[0];
            centroid[1] += xyz[1];
            centroid[2] += xyz[2];
        }
        const num_vertices = xyzs.length;
        return [centroid[0]/num_vertices, centroid[1]/num_vertices, centroid[2]/num_vertices];
    }

    /**
     * Make a copy of this entity.
     * This method must be overridden by the sub-classes.
     * @return The geometry type.
     */
    public copy(copy_attribs?: boolean): IObj {
        return _castToObjType(this._kernel, this._kernel.geomCopyObj(this._id, copy_attribs));
    }

    /**
     * Transform the points for this object.
     * @param matrix The xform matrix.
     */
    public xform(matrix: three.Matrix4): void {
        return this._kernel.objXform(this._id, matrix);
    }

    //  Points -------------------------------------------------------------------------------------

    /**
     * Get the points for this object. If the point_type is not specified, then
     * points for both wires and faces are returned.
     * @return A nested array of points, with sub-arrays for wires and faces.
     */
    public getPoints(point_type?: EGeomType.wires|EGeomType.faces): IPoint[][][] {
        const ids: number[][][] = this._kernel.objGetPointIDs(this._id, point_type);
        switch (point_type) {
            case EGeomType.wires:
                return [
                    ids[0].map((w) => w.map((id) => new Point(this._kernel, id))), // wires
                    [], // faces
                ];
            case EGeomType.faces:
                return [
                    [], // wires
                    ids[1].map((f) => f.map((id) => new Point(this._kernel, id))), // faces
                ];
            default:
                return [
                    ids[0].map((w) => w.map((id) => new Point(this._kernel, id))), // wires
                    ids[1].map((f) => f.map((id) => new Point(this._kernel, id))), // faces
                ];
        }
    }

    /**
     * Get the points for this object. If the point_type is not specified, then
     * points for both wires and faces are returned.
     * @return A flat array of points.
     */
    public getPointsArr(): IPoint[] {
        return Arr.flatten(this.getPoints());
    }

    /**
     * Get the set of unique points for this object.
     * @return The array of point IDs.
     */
    public getPointsSet(): IPoint[] {
        const exclude: number[] = [];
        const unique_points: IPoint[] = [];
        for (const point of this.getPointsArr()) {
            const id: number = point.getID();
            if (exclude.indexOf(id) === -1) {
                exclude.push(id);
                unique_points.push(point);
            }
        }
        return unique_points;
    }

    //  Topos --------------------------------------------------------------------------------------

    /**
     * Get the vertices for this object. If the vertex_type is not specified, then
     * vertices for both wires and faces are returned.
     * @return The array of vertices.
     */
    public getVertices(vertex_type?: EGeomType.wires|EGeomType.faces): IVertex[][][] {
        const paths: ITopoPathData[][][] = this._kernel.objGetVertices(this._id, vertex_type);
        return [
            paths[0].map((w) => w.map((path) => new Vertex(this._kernel, path))), // wires
            paths[1].map((f) => f.map((path) => new Vertex(this._kernel, path))), // faces
        ];
    }

    /**
     * Get the edges for this object. If the edge_type is not specified, then
     * edges for both wires and faces are returned.
     * @return The array of edges.
     */
    public getEdges(edge_type?: EGeomType.wires|EGeomType.faces): IEdge[][][] {
        const paths: ITopoPathData[][][] = this._kernel.objGetEdges(this._id, edge_type);
        return [
            paths[0].map((w) => w.map((path) => new Edge(this._kernel, path))), // wires
            paths[1].map((f) => f.map((path) => new Edge(this._kernel, path))), // faces
        ];
    }

    /**
     * Get the wires for this object.
     * @return The array of wires.
     */
    public getWires(): IWire[] {
        const paths: ITopoPathData[] = this._kernel.objGetWires(this._id);
        return paths.map((path) => new Wire(this._kernel, path));
    }

    /**
     * Get the faces for this object.
     * @return The array of faces.
     */
    public getFaces(): IFace[] {
        const paths: ITopoPathData[] = this._kernel.objGetFaces(this._id);
        return paths.map((path) => new Face(this._kernel, path));
    }

    /**
     * Get the number of wires for this object.
     * @return The number of wires.
     */
    public numWires(): number {
        return this._kernel.objNumWires(this._id);
    }

    /**
     * Get the number of faces for this object.
     * @return The number of faces.
     */
    public numFaces(): number {
        return this._kernel.objNumFaces(this._id);
    }



    /**
     * Returns the number of vertices in this polymesh wires.
     * @return Return the number of vertices.
     */
    public numWireVertices(): number {
        let count: number = 0;
        for (const wire of this.getWires()) {count += wire.numVertices();}
        return count;
    }

    /**
     * Returns the number of vertices in this polymesh faces.
     * @return Return the number of vertices.
     */
    public numFaceVertices(): number {
        let count: number = 0;
        for (const face of this.getFaces()) {count += face.numVertices();}
        return count;
    }

    /**
     * Returns the number of edges in this polymesh wires.
     * @return Return the number of edges.
     */
    public numWireEdges(): number {
        let count: number = 0;
        for (const wire of this.getWires()) {count += wire.numEdges();}
        return count;
    }

    /**
     * Returns the number of edges in this polymesh faces.
     * @return Return the number of edges.
     */
    public numFaceEdges(): number {
        let count: number = 0;
        for (const face of this.getFaces()) {count += face.numEdges();}
        return count;
    }

    /**
     *
     * @return
     */
    public getWirePoints(): IPoint[] {
        const points: IPoint[] = [];
        for (const wire of this.getWires()) {points.push(...wire.getVertices().map((v) => v.getPoint()));}
        return points;
    }

    /**
     *
     * @return
     */
    public getFacePoints(): IPoint[] {
        const points: IPoint[] = [];
        for (const face of this.getFaces()) {points.push(...face.getVertices().map((v) => v.getPoint()));}
        return points;
    }
    //  Groups -------------------------------------------------------------------------------------

    /**
     * Get the group names for all the groups for which this entity is a member.
     * @return The array of group names.
     */
    public getGroups(): IGroup[] {
        return this._kernel.objGetGroups(this._id).map((v) => new Group(this._kernel, v));
    }

    /**
     * Add this object to a group.
     * @param group The group.
     * @return True if the entity was added, False is the object was already in the group.
     */
    public addToGroup(group: IGroup): boolean {
        return this._kernel.groupAddObj(group.getName(), this._id);
    }

    //  toString -------------------------------------------------------------------------------------

    /**
     * Create s string representation of this object.
     * @return Strig
     */
    public toString(): string {
        return "Obj('"+ this.getLabel() +"', "+ mapObjTypeToString.get(this.getObjType()) +
            ", faces:" + this.numFaces() + ", wires:" + this.numWires() +
            ", edges:" + (this.numFaceEdges() + this.numWireEdges()) +
            ", vertices:" + (this.numFaceVertices() + this.numWireVertices()) + ")";
    }
}
