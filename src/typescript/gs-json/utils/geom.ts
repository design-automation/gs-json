import {IGeom, IPoint, IVertex, IEdge, IWire, IFace, IObj, IRay, IPlane, IConicCurve,
        IPolyline, IPolymesh, INurbsCurve, ITopo} from "./ifaces_gs";
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
import {_castToObjType} from "./entity_obj_cast";

/**
 * Class Geom
 */
export class Geom implements IGeom {
    private _kernel: Kernel;

    /**
     * Create a new Geom object from the Kernel.
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
     * @param Origin The origin point.
     * @param x_vec A vector defining the radius in the local x direction.
     * @param y_vec A vector defining the radius in the local y direction, must be orthogonal to x.
     * @param angles The angles, can be undefined, in which case a closed conic is generated.
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
     * @param origin_point The ray origin point.
     * @param ray_vec A vector defining the direction of the ray.
     * @return Object of type Ray
     */
    public addRay(origin_point: IPoint, ray_vec: number[]): IRay {
        const id: number = this._kernel.geomAddRay(origin_point.getID(), ray_vec);
        return new Ray(this._kernel, id);
    }
    /**
     * Adds a new plane to the model.
     * @param origin_point The plane origin point.
     * @param x_vec A vector defining the x axis.
     * @param y_vec A vector defining the y axis, orthogonal to x.
     * @return Object of type Plane
     */
    public addPlane(origin_point: IPoint, x_vec: number[], y_vec: number[]): IPlane {
        const id: number = this._kernel.geomAddPlane(origin_point.getID(), x_vec, y_vec);
        return new Plane(this._kernel, id);
    }

    //  Points -------------------------------------------------------------------------------------

    /**
     * Get all the points in this model.
     * @param
     * @return
     */
    public getAllPoints(): IPoint[] {
        const ids: number[] = this._kernel.geomGetPointIDs();
        return ids.map((id) => new Point(this._kernel, id));
    }

    /**
     * Get a set of points from an array of IDs.
     * @param
     * @return
     */
    public getPoints(ids: number[]): IPoint[] {
        return ids.map((id) => new Point(this._kernel, id));
    }

    /**
     * Get a single point from an ID.
     * @param
     * @return
     */
    public getPoint(id: number): IPoint {
        return new Point(this._kernel, id);
    }

    /**
     * Delete a set of points.
     * @param
     * @return
     */
    public delPoints(points: IPoint[]): boolean {
        return this._kernel.geomDelPoints(points.map((point) => point.getID()));
    }

    /**
     * Delete a single point.
     * @param
     * @return
     */
    public delPoint(point: IPoint): boolean {
        return this._kernel.geomDelPoint(point.getID());
    }

    /**
     * Get the number of points in the model.
     * @param
     * @return
     */
    public numPoints(): number {
        return this._kernel.geomNumPoints();
    }

    //  Objects ------------------------------------------------------------------------------------

    /**
     * Find certain types of objects in the model.
     * @param
     * @return
     */
    public findObjs(obj_type?: EObjType): IObj[] {
        throw new Error("Method not implemented");
    }

    /**
     * Get all the object in the model.
     * @param
     * @return
     */
    public getAllObjs(): IObj[] {
        return this._kernel.geomGetObjIDs().map((id) => _castToObjType(this._kernel, id));
    }

    /**
     * Get an array of objects from an array of IDs.
     * @param
     * @return
     */
    public getObjs(ids: number[]): IObj[] {
        return ids.map((id) => _castToObjType(this._kernel, id));
    }

    /**
     * Get a single object from an ID.
     * @param
     * @return
     */
    public getObj(id: number): IObj {
        return _castToObjType(this._kernel, id);
    }

    /**
     * Delete an array of objects.
     * @param
     * @return
     */
    public delObjs(objs: IObj[], keep_points: boolean = true): boolean {
        return this._kernel.geomDelObjs(objs.map((point) => point.getID()), keep_points);
    }

    /**
     * Delete a single object.
     * @param
     * @return
     */
    public delObj(obj: IObj, keep_points: boolean = true): boolean {
        return this._kernel.geomDelObj(obj.getID(), keep_points);
    }

    /**
     * Get the total number of objects in the model.
     * @param
     * @return
     */
    public numObjs(): number {
        return this._kernel.geomNumObjs();
    }

    //  Topos --------------------------------------------------------------------------------------

    /**
     * Get all the topos in the model for a specific geom type. (Vertices, Edges, Wires, Faces.)
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
     * Get a topo from a topo path. If the topo does not exist, then null is returned.
     * @param
     * @return
     */
    public getTopo(path: ITopoPathData): IVertex|IEdge|IWire|IFace {
        if (!this._kernel.geomHasTopo(path)) {return null;}
        if (path.st === undefined) {
            if (path.tt === 0) {return new Wire(this._kernel, path);}
            if (path.tt === 1) {return new Face(this._kernel, path);}
        } else {
            if (path.st === 0) {return new Vertex(this._kernel, path);}
            if (path.st === 1) {return new Edge(this._kernel, path);}
        }
    }

    /**
     * Get a topo from a topo label.
     * @param
     * @return
     */
    public getTopoFromLabel(path_str: string): IVertex|IEdge|IWire|IFace {
        // o2:f3:e1
        const parts: Array<[string, number]> =
            path_str.split(":").map((v) => [v.slice(0,1), Number.parseInt(v.slice(1))] as [string, number]);
        if (parts.length !== 2 && parts.length !== 3) {return null;}
        if (parts[0][0] !== "o") {return null;}
        if (parts[1][0] !== "w" && parts[1][0] !== "f") {return null;}
        if (Number.isNaN(parts[0][1])) {return null;}
        if (Number.isNaN(parts[1][1])) {return null;}
        const id: number = parts[0][1];
        let tt: 0|1;
        if (parts[1][0] === "w") {tt = 0;} else {tt = 1;}
        const ti: number = parts[1][1];
        const path: ITopoPathData = {id, tt, ti};
        if (parts.length === 3) {
            if (parts[2][0] !== "v" && parts[2][0] !== "e") {return null;}
            if (Number.isNaN(parts[2][1])) {return null;}
            let st: 0|1;
            if (parts[2][0] === "v") {st = 0;} else {st = 1;}
            const si: number = parts[2][1];
            path.st = st;
            path.si = si;
        }
        return this.getTopo(path);
    }

    /**
     * Get the number of topos in the model for a specific geom type. (Vertices, Edges, Wires, Faces.)
     * @param
     * @return
     */
    public numTopos(geom_type: EGeomType): number {
        return this._kernel.geomNumTopos(geom_type);
    }
}
