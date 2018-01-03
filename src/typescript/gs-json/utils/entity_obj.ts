import {Arr} from "./arr";
import {IObj, IPoint, IVertex, IEdge, IWire, IFace} from "./ifaces_gs";
import {ITopoPathData} from "./ifaces_json";
import {EGeomType, EObjType} from "./enums";
import {Vertex, Edge, Wire, Face} from "./topo_sub";
import {Ent} from "./entity";
import {Point} from "./entity_point";

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
    public getLabelCentroid(): number[] {
        const xyzs: number[][] = this.getPointsSet().map((v) => v.getPosition());
        let centroid: number[] = [0,0,0];
        for (const xyz of xyzs) {
            centroid[0] += xyz[0];
            centroid[1] += xyz[1];
            centroid[2] += xyz[2];
        }
        const num_vertices = xyzs.length;
        return [centroid[0]/num_vertices, centroid[1]/num_vertices, centroid[2]/num_vertices];
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
