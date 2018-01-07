import {IPoint, IVertex, IGroup} from "./ifaces_gs";
import {ITopoPathData} from "./ifaces_json";
import {EGeomType} from "./enums";
import {Vertex} from "./topo_sub";
import {Ent} from "./entity";
import {Group} from "./groups";

/**
 * Class Point.
 * A point with x, y, z coordinates.
 * A point may be part of a group and may have attributes.
 */
export class Point extends Ent implements IPoint {
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
    public getVertices(): IVertex[] {
        const paths: ITopoPathData[] = this._kernel.pointGetVertices(this._id);
        return paths.map((path) => new Vertex(this._kernel, path));
    }

    /**
     * Get the label of this point.
     * @return The xyz of the centroid.
     */
    public getLabel(): string {
        return "p" + this._id;
    }

    /**
     * Get the label centroid of this points.
     * @return The xyz of the label.
     */
    public getLabelCentroid(): number[] {
        return this.getPosition();
    }

    //  Groups -------------------------------------------------------------------------------------

    /**
     * Get the group names for all the groups for which this entity is a member.
     * @return The array of group names.
     */
    public getGroups(): IGroup[] {
        return this._kernel.pointGetGroups(this._id).map((v) => new Group(this._kernel, v));
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
