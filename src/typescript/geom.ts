import {XYZ, IGeom, IPoint, IVertex, IEdge, IWire, IFace, IObj, IRay, IPlane, ICircle, IEllipse,
        IPolyline, IPolymesh, ITopo} from "./ifaces_gs";
import {Kernel} from "./kernel";
import {ITopoPathData} from "./ifaces_json";
import {EGeomType, EObjType} from "./enums";
import {Point} from "./entity_point";
import {Polyline} from "./entity_obj_polyline";
import {Circle} from "./entity_obj_circle";
import {Polymesh} from "./entity_obj_polymesh";
import {Plane} from "./entity_obj_plane";
import {Ray} from "./entity_obj_ray";
import {Vertex, Edge, Wire, Face} from "./topo_sub";
import {_castToObjType} from "./entity_obj_cast";
import * as three from "three";
import * as threex from "./libs/threex/threex";
import * as util from "./_utils";

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

    //  Copy from model -----------------------------------------------------------------------------------

    /**
     * Copies a point from another model to thid model.
     * @param point The point to copy
     * @return A new point.
     */
    public copyPointFromModel(point: IPoint): IPoint {
        const id: number = this._kernel.geomAddPoint(point.getPosition());
        return new Point(this._kernel, id);
    }

    /**
     * Copies a set of new points to the model, from an array of xyz coordinates.
     * @param points An array of points to copy.
     * @return An array of new points.
     */
    public copyPointsFromModel(points: IPoint[]): IPoint[] {
        return points.map((point) => this.addPoint(point.getPosition()));
    }

    /**
     * Copies a ray to the model.
     * @param ray The ray to copy.
     * @param ray_vec A vector defining the direction of the ray.
     * @return Object of type Ray
     */
    public copyRayFromModel(ray: IRay): IRay {
        // get the data
        const origin: IPoint = ray.getOrigin();
        const vec: XYZ = ray.getVector();
        // create the points
        const origin_id: number = this._kernel.geomAddPoint(origin.getPosition());
        // create the obj
        const id: number = this._kernel.geomAddRay(origin_id, vec);
        return new Ray(this._kernel, id);
    }

    /**
     * Copies a plane to the model.
     * @param plane The plane to copy.
     * @return Object of type Plane
     */
    public copyPlaneFromModel(plane: IPlane): IPlane {
        // get the data
        const origin: IPoint = plane.getOrigin();
        const axes: [XYZ,XYZ,XYZ] = plane.getAxes();
        // create the points
        const origin_id: number = this._kernel.geomAddPoint(origin.getPosition());
        // create the obj
        const id: number = this._kernel.geomAddPlane(origin_id, axes);
        return new Plane(this._kernel, id);
    }

    /**
     * Copies a circle to the model.
     * @param circle The circle to copy.
     * @return Object of type Circle
     */
    public copyCircleFromModel(circle: ICircle): ICircle {
        // get the data
        const origin: IPoint = circle.getOrigin();
        const axes: [XYZ,XYZ,XYZ] = circle.getAxes();
        const angles: [number, number] = circle.getAngles();
        // create the points
        const origin_id: number = this._kernel.geomAddPoint(origin.getPosition());
        // create the obj
        const id: number = this._kernel.geomAddCircle(origin_id, axes, angles);
        return new Circle(this._kernel, id);
    }

    /**
     * Copies a polyline to the model.
     * @param circle The polyline to copy.
     * @return Object of type Polyline
     */
    public copyPlineFromModel(pline: IPolyline): IPolyline {
        //TODO copy polylines
        throw new Error("Method not implemented");
    }

    /**
     * Copies a polyline to the model.
     * @param circle The polyline to copy.
     * @return Object of type Polyline
     */
    public copyPmeshFromModel(pline: IPolymesh): IPolymesh {
        //TODO copy polymeshes
        throw new Error("Method not implemented");
    }

    /**
     * Copies an obj to the model.
     * @param obj The obj to copy.
     * @return Object
     */
    public copyObjFromModel(obj: IObj): IObj {
        switch (obj.getObjType()) {
            case EObjType.ray:
                return this.copyRayFromModel(obj as IRay);
            case EObjType.plane:
                return this.copyPlaneFromModel(obj as IPlane);
            case EObjType.circle:
                return this.copyCircleFromModel(obj as ICircle);
            case EObjType.polyline:
                return this.copyPlineFromModel(obj as IPolyline);
            case EObjType.polymesh:
                return this.copyPmeshFromModel(obj as IPolymesh);
            default:
                throw new Error("Object type not found:" + obj.getObjType());
        }
    }

    /**
     * Copies an array of objs to the model.
     * @param objs The objs to copy.
     * @return Object
     */
    public copyObjsFromModel(objs: IObj[]): IObj[] {
        //TODO copy objects with the shared points
        // The rtick here is tomake sure that points are still shared between the objects
        throw new Error("Method not implemented");
    }

    //  Creation -----------------------------------------------------------------------------------

    /**
     * Adds a new point to the model at position xyz.
     * @param xyz xyz coordinates are required to create a point
     * @return A point instance.
     */
    public addPoint(xyz: XYZ): IPoint {
        const id: number = this._kernel.geomAddPoint(xyz);
        return new Point(this._kernel, id);
    }

    /**
     * Adds a set of new points to the model, from an array of xyz coordinates.
     * @param xyz An array of xyz coordinates.
     * @return An array Point instances.
     */
    public addPoints(xyz_arr: XYZ[]): IPoint[] {
        return xyz_arr.map((xyz) => this.addPoint(xyz));
    }

    /**
     * Adds a new ray to the model.
     * @param origin_point The ray origin point.
     * @param ray_vec A vector defining the direction of the ray.
     * @return Object of type Ray
     */
    public addRay(origin_point: IPoint, ray_vec: XYZ): IRay {
        const id: number = this._kernel.geomAddRay(origin_point.getID(), ray_vec);
        return new Ray(this._kernel, id);
    }

    /**
     * Adds a new plane to the model.
     * @param origin_point The plane origin point.
     * @param x_vec A vector defining the x axis.
     * @param vec A vector in the plane.
     * @return Object of type Plane
     */
    public addPlane(origin_point: IPoint, x_vec: XYZ, vec: XYZ): IPlane {
        // make three ortho vectors
        const axes: [XYZ,XYZ,XYZ] = threex.makeXYZOrthogonal(x_vec, vec, false);
        if (axes === null) {throw new Error("Vectors cannot be parallel.");}
        // make the circle
        const id: number = this._kernel.geomAddPlane(origin_point.getID(), axes);
        return new Plane(this._kernel, id);
    }

    /**
     * Adds a new circle to the model.
     * @param Origin The origin point.
     * @param x_vec A vector in the local x direction, also defines the raidus.
     * @param vec A vector in the plane
     * @param angles The angles, can be undefined, in which case a closed conic is generated.
     * @return Object of type Circle
     */
    public addCircle(origin_point: IPoint, x_vec: XYZ, vec: XYZ, angles?: [number, number]): ICircle {
        // make the angles correct
        angles = util.checkCircleAngles(angles);
        // make three ortho vectors
        const axes: [XYZ,XYZ,XYZ] = threex.makeXYZOrthogonal(x_vec, vec, false);
        if (axes === null) {throw new Error("Vectors cannot be parallel.");}
        // make the circle
        const id: number = this._kernel.geomAddCircle(origin_point.getID(), axes, angles);
        return new Circle(this._kernel, id);
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
     * Adds a new polymesh to the model.
     * @param face_points An array of arrays of points.
     * @return Object of type Polymesh
     */
    public addPolymesh(face_points: IPoint[][]): IPolymesh {
        const point_ids: number[][] = face_points.map((f) => f.map((p) => p.getID()));
        const id: number = this._kernel.geomAddPolymesh(point_ids);
        return new Polymesh(this._kernel, id);
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

    /**
     * Merge points.
     * @param
     * @return
     */
    public mergePoints(points: IPoint[], tolerance?: number): IPoint[] {
        if (tolerance === undefined) {
            const id: number = this._kernel.geomMergePoints(points.map((point) => point.getID()));
            return [new Point(this._kernel, id)];
        }
        return this._kernel.geomMergePointsByTol(points.map((point) => point.getID()), tolerance)
            .map((id) => new Point(this._kernel, id));
    }

    /**
     * Merge all points.
     * @param
     * @return
     */
    public mergeAllPoints(tolerance: number): IPoint[] {
        return this._kernel.geomMergeAllPoints(tolerance).map((id) => new Point(this._kernel, id));
    }

    /**
     * Copy the points.
     */
    public copyPoints(points: IPoint[], copy_attribs: boolean = true):  IPoint[] {
        return this._kernel.geomCopyPoints(points.map((point) => point.getID()), copy_attribs)
            .map((id) => new Point(this._kernel, id));
    }

    /**
     * Transform the points.
     */
    public xformPoints(points: IPoint[], matrix: three.Matrix4): void {
        return this._kernel.geomXformPoints(points.map((point) => point.getID()), matrix);
    }

    //  Objects ------------------------------------------------------------------------------------

    /**
     * Find certain types of objects in the model.
     * @param
     * @return
     */
    public findObjs(obj_type?: EObjType): IObj[] {
        return this._kernel.geomFindObjIDs(obj_type).map((id) => _castToObjType(this._kernel, id));
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

    /**
     * Unweld the objects so that they all have unique points.
     */
    public unweldObjs(objs: IObj[]): IPoint[] {
        return this._kernel.geomUnweldObjs(objs.map((obj) => obj.getID()))
            .map((id) => new Point(this._kernel, id));
    }

    /**
     * Copy the array of object.
     */
    public copyObjs(objs: IObj[], copy_attribs: boolean = true): IObj[] {
        return this._kernel.geomCopyObjs(objs.map((obj) => obj.getID()), copy_attribs)
            .map((id) => _castToObjType(this._kernel, id));
    }

    /**
     * Transform all the points for this array of object.
     */
    public xformObjs(objs: IObj[], matrix: three.Matrix4): void {
        return this._kernel.geomXformObjs(objs.map((point) => point.getID()), matrix);
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
