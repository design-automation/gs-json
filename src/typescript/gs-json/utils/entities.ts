import {Arr} from "./arr";
import * as ifs from "./ifaces_gs";
import {Kernel} from "./kernel";
import {ITopoPathData} from "./ifaces_json";
import {EGeomType, EObjType} from "./enums";
import {Vertex, Edge, Wire, Face} from "./topos";

//  ================================================================================================

/**
 * Class Ent.
 * An abstrcat class that is the superclass for all geometric entities, both Point and Obj.
 * An entity may be part of a group and may have attributes.
 */
export abstract class Ent {
    protected _kernel: Kernel;
    protected _id: number;
    /**
     * Creates an instance of one of the subclasses of Ent.
     * The entity must already exists in the geometry.
     * Do not use this constructor if you want to add a new entity to the geometry.
     * For that, you should use one of the 'add' methods in the geometry class.
     * @param geom The Geom object to which the point belongs.
     * @param id The ID of the entity. This ID must already exist in the geometry.
     * @return The Ent object.
     */
    constructor(kernel: Kernel, id: number) {
        this._kernel = kernel;
        this._id = id;
    }

    //  This Entity --------------------------------------------------------------------------------

    /**
     * Get the ID number of this entity.
     * @return The entity ID number.
     */
    public getID(): number {
        return this._id;
    }

    /**
     * Get the geometry type for this entity.
     * This method mst be overridden by the sub-classes.
     * @return The geometry type.
     */
    public getGeomType(): EGeomType {
        // Do not implement this method.
        throw new Error ("Method to be overridden by subclass.");
    }

    //  Attributes ---------------------------------------------------------------------------------

    /**
     * Get the attribute names for this entity.
     * @return The array of attribute names.
     */
    public getAttribNames(): string[] {
        return this._kernel.attribGetNames(this.getGeomType());
    }

    /**
     * Get an attribute value for this entity.
     * @param name The attribute name.
     * @return The attribute value.
     */
    public getAttribValue(name: string): any {
        return this._kernel.entAttribGetValue(name, this.getGeomType(), this._id);
    }

    /**
     * Set an attribute value for this entity.
     * @param name The attribute name.
     * @param value The new attribute value.
     * @return The old attribute value.
     */
    public setAttribValue(name: string, value: any): any {
        return this._kernel.entAttribSetValue(name, this.getGeomType(), this._id, value);
    }

}

//  ================================================================================================

/**
 * Class Point.
 * A point with x, y, z coordinates.
 * A point may be part of a group and may have attributes.
 */
export class Point extends Ent implements ifs.IPoint {
   /**
    * Get the geometry type for this entity.
    * This method overrides the method in the Ent class.
    * @return The geometry type.
    */
    public getGeomType(): EGeomType {
        return EGeomType.points;
    }

   /**
    * Set the cartesian x,y,z coordinates of a point.
    * @param xyz Cartesian coordinates
    * @return Arrays of pre-defined coordinates
    */
    public setPosition(xyz: number[]): number[] {
        return this._kernel.pointSetPosition(this._id, xyz);
    }

    /**
     * Get the cartesian x, y, z coordinates of a point.
     * @return Returns an array that contains the x, y, z coordinates
     */
    public getPosition(): number[] {
        return this._kernel.pointGetPosition(this._id);
    }

    /**
     * Get all the vertices linked to a point or a set of points.
     * @return Returns the array of vertices.
     */
    public getVertices(): ifs.IVertex[] {
        const paths: ITopoPathData[] = this._kernel.pointGetVertices(this._id);
        return paths.map((path) => new Vertex(this._kernel, path));
    }

    //  Groups -------------------------------------------------------------------------------------

    /**
     * Get the group names for all the groups for which this entity is a member.
     * @return The array of group names.
     */
    public getGroupNames(): string[] {
        return this._kernel.pointGetGroups(this._id);
    }

    /**
     * Add this entity to a group.
     * @param name The group name.
     * @return True if the entity was added, False is the entity was already in the group.
     */
    public addToGroup(name: string): boolean {
        return this._kernel.groupAddPoint(name, this._id);
    }
}

//  ================================================================================================

/**
 * Abstract class Obj.
 * The superclass for all geometric objects,
 * including Polyline and Polymesh.
 */
export abstract class Obj extends Ent implements ifs.IObj {
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

    //  Points -------------------------------------------------------------------------------------

    /**
     * Get the points for this object. If the point_type is not specified, then
     * points for both wires and faces are returned.
     * @return A nested array of points, with sub-arrays for wires and faces.
     */
    public getPoints(point_type?: EGeomType.wires|EGeomType.faces): ifs.IPoint[][][] {
        const ids: number[][][] = this._kernel.objGetPoints(this._id, point_type);
        return [
            ids[0].map((w) => w.map((id) => new Point(this._kernel, id))), // wires
            ids[1].map((f) => f.map((id) => new Point(this._kernel, id))), // faces
        ];
    }

    /**
     * Get the points for this object. If the point_type is not specified, then
     * points for both wires and faces are returned.
     * @return A flat array of points.
     */
    public getPointsArr(): ifs.IPoint[] {
        return Arr.flatten(this.getPoints());
    }

    /**
     * Get the set of unique points for this object.
     * @return The array of point IDs.
     */
    public getPointsSet(): Set<number> {
        return new Set(Arr.flatten(this.getPoints()));
    }

    //  Topos --------------------------------------------------------------------------------------

    /**
     * Get the vertices for this object. If the vertex_type is not specified, then
     * vertices for both wires and faces are returned.
     * @return The array of vertices.
     */
    public getVertices(vertex_type?: EGeomType.wires|EGeomType.faces): ifs.IVertex[][][] {
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
    public getEdges(edge_type?: EGeomType.wires|EGeomType.faces): ifs.IEdge[][][] {
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
    public getWires(): ifs.IWire[] {
        const paths: ITopoPathData[] = this._kernel.objGetWires(this._id);
        return paths.map((path) => new Wire(this._kernel, path));
    }

    /**
     * Get the faces for this object.
     * @return The array of faces.
     */
    public getFaces(): ifs.IFace[] {
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

    //  Groups -------------------------------------------------------------------------------------

    /**
     * Get the group names for all the groups for which this entity is a member.
     * @return The array of group names.
     */
    public getGroupNames(): string[] {
        return this._kernel.objGetGroups(this._id);
    }

    /**
     * Add this entity to a group.
     * @param name The group name.
     * @return True if the entity was added, False is the entity was already in the group.
     */
    public addToGroup(name: string): boolean {
        return this._kernel.groupAddObj(name, this._id);
    }
}

//  ================================================================================================

/**
 * Class Ray.
 * A ray is displayed as one wire and no faces.
 * The wire has two vertices.
 * A ray may be part of a group and may have attributes.
 */
export class Ray extends Obj implements ifs.IRay {
    /**
     * Get the object type: "ray".
     * @return Ray object type.
     */
    public getObjType(): EObjType {
        return EObjType.ray;
    }
}

//  ================================================================================================

/**
 * Class Plane.
 * A plane is displayed as one wire and one square face. TODO
 * The wire has two vertices, the square face has four vertices.
 * A ray may be part of a group and may have attributes.
 */
export class Plane extends Obj implements ifs.IPlane {
    /**
     * Get the object type: "plane".
     * @return Plane object type.
     */
    public getObjType(): EObjType {
        return EObjType.plane;
    }

    public getOrigin(): number[] {
        return this._kernel.objGetParams(this._id)[1];
    }

    public getVectors(): number[][] {
        return this._kernel.objGetParams(this._id).slice(2,3);
    }

    /**
     * Get the 4 cartesian coefficient of a plan, especially usefull for distance calculations.
     * In 3 dimensions, a cartesian equation of a 2D plan is: a.x + b.y + c.z + d = 0 ;
     * @return Returns an array that contains the x, y, z coordinates of a point which belongs to
     * the plan as well as a normal vector
     * @return Array of real numbers: [a,b,c,d] (where a,b,c is a triplet set such as (a,b,c) !=== (0,0,0))
     */
    public getCartesians(): number[] {
        const origin: number[] = this._kernel.objGetParams(this._id)[1];
        const z_vec: number[] = this._kernel.objGetParams(this._id)[4];
        const d: number = -(origin[0] * z_vec[0] + origin[1] * z_vec[1] + origin[2] * z_vec[2]);
        return [z_vec[0], z_vec[1], z_vec[2], d];
    }
}

//  ================================================================================================

/**
 * Class Polyline.
 * A polyline consists of one wire and no faces.
 * The wire has a sequence of vertices.
 * The wire may be open or closed.
 * A polyline may be part of a group and may have attributes.
 */
export class Polyline  extends Obj implements ifs.IPolyline {
    /**
     * Get the object type: "polyline".
     * @return Polyline object type.
     */
    public getObjType(): EObjType {
        return EObjType.polyline;
    }
}

//  ================================================================================================

/**
 * Class NurbsCurve.
 * A Nurbs Curve consists of one wire and no faces.
 * The wire has a sequence of vertices, which ae the cruve control points.
 * The wire may be open or closed.
 * A NurbsCurve may be part of a group and may have attributes.
 */
export class NurbsCurve  extends Obj implements ifs.INurbsCurve {
    /**
     * Get the object type: "polyline".
     * @return Polyline object type.
     */
    public getObjType(): EObjType {
        return EObjType.nurbs_curve;
    }
}

//  ================================================================================================

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
export class Polymesh extends Obj implements ifs.IPolymesh {

    /**
     * Get the object type: "polymesh".
     * @return The polymesh object type.
     */
    public getObjType(): EObjType {
        return EObjType.polymesh;
    }
}
