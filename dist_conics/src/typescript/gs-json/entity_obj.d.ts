import * as three from "three";
import { XYZ, IObj, IPoint, IVertex, IEdge, IWire, IFace, IGroup } from "./ifaces_gs";
import { EGeomType, EObjType } from "./enums";
import { Ent } from "./entity";
/**
 * Abstract class Obj.
 * The superclass for all geometric objects,
 * including Polyline and Polymesh.
 */
export declare abstract class Obj extends Ent implements IObj {
    /**
     * Get the geometry type.
     * This method overrides the method in the Ent class.
     * @return The geometry type.
     */
    getGeomType(): EGeomType;
    /**
     * Get the object type.
     * This method will be overridden by subclasses.
     * @return The object type.
     */
    getObjType(): EObjType;
    /**
     * Check if this entity exists in the model. (i.e has it been deleted?)
     * @return The entity ID number.
     */
    exists(): boolean;
    /**
     * Get the label for this object.
     * @return The xyz of the centroid.
     */
    getLabel(): string;
    /**
     * Get the label centroid for this object.
     * @return The xyz of the label.
     */
    getLabelCentroid(): XYZ;
    /**
     * Make a copy of this entity.
     * This method must be overridden by the sub-classes.
     * @return The geometry type.
     */
    copy(copy_attribs?: boolean): IObj;
    /**
     * Transform the points for this object.
     * @param matrix The xform matrix.
     */
    xform(matrix: three.Matrix4): void;
    /**
     * Get the points for this object. If the point_type is not specified, then
     * points for both wires and faces are returned.
     * @return A nested array of points, with sub-arrays for wires and faces.
     */
    getPoints(point_type?: EGeomType.wires | EGeomType.faces): IPoint[][][];
    /**
     * Get the points for this object. If the point_type is not specified, then
     * points for both wires and faces are returned.
     * @return A flat array of points.
     */
    getPointsArr(): IPoint[];
    /**
     * Get the set of unique points for this object.
     * @return The array of point IDs.
     */
    getPointsSet(): IPoint[];
    /**
     * Get the vertices for this object. If the vertex_type is not specified, then
     * vertices for both wires and faces are returned.
     * @return The array of vertices.
     */
    getVertices(vertex_type?: EGeomType.wires | EGeomType.faces): IVertex[][][];
    /**
     * Get the edges for this object. If the edge_type is not specified, then
     * edges for both wires and faces are returned.
     * @return The array of edges.
     */
    getEdges(edge_type?: EGeomType.wires | EGeomType.faces): IEdge[][][];
    /**
     * Get the wires for this object.
     * @return The array of wires.
     */
    getWires(): IWire[];
    /**
     * Get the faces for this object.
     * @return The array of faces.
     */
    getFaces(): IFace[];
    /**
     * Get the number of wires for this object.
     * @return The number of wires.
     */
    numWires(): number;
    /**
     * Get the number of faces for this object.
     * @return The number of faces.
     */
    numFaces(): number;
    /**
     * Returns the number of vertices in this polymesh wires.
     * @return Return the number of vertices.
     */
    numWireVertices(): number;
    /**
     * Returns the number of vertices in this polymesh faces.
     * @return Return the number of vertices.
     */
    numFaceVertices(): number;
    /**
     * Returns the number of edges in this polymesh wires.
     * @return Return the number of edges.
     */
    numWireEdges(): number;
    /**
     * Returns the number of edges in this polymesh faces.
     * @return Return the number of edges.
     */
    numFaceEdges(): number;
    /**
     *
     * @return
     */
    getWirePoints(): IPoint[];
    /**
     *
     * @return
     */
    getFacePoints(): IPoint[];
    /**
     * Get the group names for all the groups for which this entity is a member.
     * @return The array of group names.
     */
    getGroups(): IGroup[];
    /**
     * Add this object to a group.
     * @param group The group.
     * @return True if the entity was added, False is the object was already in the group.
     */
    addToGroup(group: IGroup): boolean;
    /**
     * Create s string representation of this object.
     * @return Strig
     */
    toString(): string;
}
