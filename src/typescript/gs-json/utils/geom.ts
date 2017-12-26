import {IGeom, IPoint, IVertex, IEdge, IWire, IFace, IObj, IRay, IPlane, IConicCurve,
        IPolyline, IPolymesh, INurbsCurve} from "./ifaces_gs";
import {Kernel} from "./kernel";
import {ITopoPathData} from "./ifaces_json";
import {EGeomType, EObjType} from "./enums";
import {Point} from "./entity_point";
import {Polyline} from "./entity_obj_polyline";
import {ConicCurve} from "./entity_obj_coniccurve";
import {NurbsCurve} from "./entity_obj_nurbscurve";
import {Polymesh} from "./entity_obj_polymesh";
import {Plane} from "./entity_obj_plane";
import {Ray} from "./entity_obj_ray";
import {Vertex, Edge, Wire, Face} from "./topo_sub";

/**
 * Class Geom
 */
export class Geom implements IGeom {
    private _kernel: Kernel;

    /**
     * to be completed
     * @param
     * @return
     */
    constructor(kernel: Kernel) {
        this._kernel = kernel;
    }

    //  Creation -----------------------------------------------------------------------------------

    /**
     * Adds a new point to the model at position xyz.
     * @param xyz xyz coordinates are required to create a point
     * @return A point instance.
     */
    public addPoint(xyz: number[]): IPoint {
        const id: number = this._kernel.geomAddPoint(xyz);
        return new Point(this._kernel, id);
    }

    /**
     * Adds a set of new points to the model, from an array of xyz coordinates.
     * @param xyz An array of xyz coordinates.
     * @return An array Point instances.
     */
    public addPoints(xyz_arr: number[][]): IPoint[] {
        return xyz_arr.map((xyz) => this.addPoint(xyz));
    }

    /**
     * Adds a new polyline to the model.
     * @param points A collection of Points.
     * @param is_closed True if the polyline is closed.
     * @return Object of type Polyline
     */
    public addPolyline(points: IPoint[], is_closed: boolean): IPolyline {
        const point_ids: number[] = points.map((p) => p.getID());
        const id: number = this._kernel.geomAddPolyline(point_ids, is_closed);
        return new Polyline(this._kernel, id);
    }

    /**
     * Adds a new conic curve to the model.
     * @param Origin:
     * @return Object of type Plane
     */
    public addConicCurve(origin_point: IPoint, x_vec: number[], y_vec: number[],
                         angles: [number, number]):
                    IConicCurve {
        const id: number = this._kernel.geomAddConicCurve(origin_point.getID(),
            x_vec, y_vec, angles);
        return new ConicCurve(this._kernel, id);
    }

    /**
     * Adds a new nurbs curve to the model.
     * @param points A collection of Points, which are the curve control points
     * @param is_closed True if the polyline is closed.
     * @return Object of type Polyline
     */
    public addNurbsCurve(points: IPoint[], is_closed: boolean, order: number): INurbsCurve {
        const point_ids: number[] = points.map((p) => p.getID());
        const id: number = this._kernel.geomAddNurbsCurve(point_ids, is_closed, order);
        return new NurbsCurve(this._kernel, id);
    }

    /**
     * Adds a new polymesh to the model.
     * @param face_points An array of arrays of points.
     * @return Object of type Polymesh
     */
    public addPolymesh(face_points: IPoint[][]): IPolymesh {
        const point_ids: number[][] = face_points.map((f) => f.map((p) => p.getID()));
        const id: number = this._kernel.geomAddPolymesh(point_ids);
        return new Polymesh(this._kernel, id);
    }
    /**
     * Adds a new ray to the model.
     * @param origin_point An array of arrays of points.
     * @return Object of type Ray
     */
    public addRay(origin_point: IPoint, ray_point: IPoint): IRay {
        const id: number = this._kernel.geomAddRay(origin_point.getID(), ray_point.getID());
        return new Ray(this._kernel, id);
    }
    /**
     * Adds a new plane to the model.
     * @param Origin:
     * @return Object of type Plane
     */
    public addPlane(origin_point: IPoint, xaxis_point: IPoint, yaxis_point: IPoint):
                    IPlane {
        const id: number = this._kernel.geomAddPlane(origin_point.getID(), xaxis_point.getID(),
            yaxis_point.getID());
        return new Plane(this._kernel, id);
    }

    //  Points -------------------------------------------------------------------------------------

    /**
     * to be completed
     * @param
     * @return
     */
    public getPointIDs(): number[] {
        return this._kernel.geomGetPointIDs();
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public getPoints(): IPoint[] {
        const ids: number[] = this._kernel.geomGetPointIDs();
        return ids.map((id) => new Point(this._kernel, id));
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public getPoint(id: number): IPoint {
        return new Point(this._kernel, id);
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public delPoints(ids: number[]): boolean {
        return this._kernel.geomDelPoints(ids);
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public delPoint(id: number): boolean {
        return this._kernel.geomDelPoint(id);
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public numPoints(): number {
        return this._kernel.geomNumPoints();
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public setPointPosition(id: number, xyz: number[]): number[] {
        return this._kernel.pointSetPosition(id, xyz);
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public getPointPosition(id: number): number[] {
        return this._kernel.pointGetPosition(id);
    }

    //  Objects ------------------------------------------------------------------------------------

    /**
     * to be completed
     * @param
     * @return
     */
    public getObjIDs(): number[] {
        return this._kernel.geomGetObjIDs();
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public getObjs(): IObj[] {
        const ids: number[] = this._kernel.geomGetObjIDs();
        const objs: IObj[] = [];
        for (const id of ids) {
            const obj_type = this._kernel.objGetType(id);
            switch (obj_type) {
                case EObjType.ray:
                    objs.push(new Ray(this._kernel, id));
                    break;
                case EObjType.plane:
                    objs.push(new Plane(this._kernel, id));
                    break;
                case EObjType.polyline:
                    objs.push(new Polyline(this._kernel, id));
                    break;
                case EObjType.polymesh:
                    objs.push(new Polymesh(this._kernel, id));
                    break;
                case EObjType.nurbs_curve:
                    objs.push(new NurbsCurve(this._kernel, id));
                    break;
                default:
                    throw new Error("Object type does not exist.");
                // TODO add more here
            }
        }
        return objs;
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public getObj(id: number): IObj {
        const obj_type = this._kernel.objGetType(id);
        switch (obj_type) {
            case EObjType.ray:
                return new Ray(this._kernel, id);
            case EObjType.plane:
                return new Plane(this._kernel, id);
            case EObjType.polyline:
                return new Polyline(this._kernel, id);
            case EObjType.polymesh:
                return new Polymesh(this._kernel, id);
            case EObjType.nurbs_curve:
                return new NurbsCurve(this._kernel, id);
            default:
                throw new Error("Object type does not exist.");
            // TODO add more here
        }
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public delObj(id: number, keep_points: boolean = true): boolean {
        return this._kernel.geomDelObj(id, keep_points);
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public numObjs(): number {
        return this._kernel.geomNumObjs();
    }

    //  Topos --------------------------------------------------------------------------------------

    /**
     * to be completed
     * @param
     * @return
     */
    // public getTopos(geom_type: EGeomType): ITopo[] {
    public getTopos(geom_type: EGeomType): (IVertex[] | IEdge[] | IWire[] | IFace[])  {
        const paths: ITopoPathData[] = this._kernel.geomGetTopoPaths(geom_type);
        switch (geom_type) {
            case EGeomType.vertices:
                return paths.map((p) => new Vertex(this._kernel, p));
            case EGeomType.edges:
                return paths.map((p) => new Edge(this._kernel, p));
            case EGeomType.wires:
                return paths.map((p) => new Wire(this._kernel, p));
            case EGeomType.faces:
                return paths.map((p) => new Face(this._kernel, p));
        }
    }

    /**
     * to be completed
     * @param
     * @return
     */
    public numTopos(geom_type: EGeomType): number {
        return this._kernel.geomNumTopos(geom_type);
    }
}
