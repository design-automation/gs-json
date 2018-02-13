import { XYZ, IGeom, IPoint, IVertex, IEdge, IHyperbola, IWire, IFace, IObj, IRay, IRayTwo, IPlane, ICircle, IEllipse, IParabola, IPolyline, IPolymesh } from "./ifaces_gs";
import { Kernel } from "./kernel";
import { ITopoPathData } from "./ifaces_json";
import { EGeomType, EObjType } from "./enums";
/**
 * Class Geom
 */
export declare class Geom implements IGeom {
    private _kernel;
    /**
     * Create a new Geom object from the Kernel.
     * @param
     * @return
     */
    constructor(kernel: Kernel);
    /**
     * Copies a point from another model to thid model.
     * @param point The point to copy
     * @return A new point.
     */
    copyPointFromModel(point: IPoint): IPoint;
    /**
     * Copies a set of new points to the model, from an array of xyz coordinates.
     * @param points An array of points to copy.
     * @return An array of new points.
     */
    copyPointsFromModel(points: IPoint[]): IPoint[];
    /**
     * Copies a ray to the model.
     * @param ray The ray to copy.
     * @param ray_vec A vector defining the direction of the ray.
     * @return Object of type Ray
     */
    copyRayFromModel(ray: IRay): IRay;
    /**
     * Copies a plane to the model.
     * @param plane The plane to copy.
     * @return Object of type Plane
     */
    copyPlaneFromModel(plane: IPlane): IPlane;
    /**
     * Copies a circle to the model.
     * @param circle The circle to copy.
     * @return Object of type Circle
     */
    copyCircleFromModel(circle: ICircle): ICircle;
    /**
     * Copies a polyline to the model.
     * @param circle The polyline to copy.
     * @return Object of type Polyline
     */
    copyPlineFromModel(pline: IPolyline): IPolyline;
    /**
     * Copies a polyline to the model.
     * @param circle The polyline to copy.
     * @return Object of type Polyline
     */
    copyPmeshFromModel(pline: IPolymesh): IPolymesh;
    /**
     * Copies an obj to the model.
     * @param obj The obj to copy.
     * @return Object
     */
    copyObjFromModel(obj: IObj): IObj;
    /**
     * Copies an array of objs to the model.
     * @param objs The objs to copy.
     * @return Object
     */
    copyObjsFromModel(objs: IObj[]): IObj[];
    /**
     * Adds a new point to the model at position xyz.
     * @param xyz xyz coordinates are required to create a point
     * @return A point instance.
     */
    addPoint(xyz: XYZ): IPoint;
    /**
     * Adds a set of new points to the model, from an array of xyz coordinates.
     * @param xyz An array of xyz coordinates.
     * @return An array Point instances.
     */
    addPoints(xyz_arr: XYZ[]): IPoint[];
    /**
     * Adds a new ray to the model.
     * @param origin_point The ray origin point.
     * @param ray_vec A vector defining the direction of the ray.
     * @return Object of type Ray
     */
    addRay(origin_point: IPoint, ray_vec: XYZ): IRay;
    /**
     * Adds a new rayTwo to the model.
     * @param origin_point The rayTwo origin point.
     * @param ray_vec A vector defining the direction of the ray.
     * @return Object of type RayTwo, which is a ray that is defined in the two directions of the Ray.
     */
    addRayTwo(origin_point: IPoint, ray_vec: XYZ): IRayTwo;
    /**
     * Adds a new plane to the model.
     * @param origin_point The plane origin point.
     * @param x_vec A vector defining the x axis.
     * @param vec A vector in the plane.
     * @return Object of type Plane
     */
    addPlane(origin_point: IPoint, x_vec: XYZ, vec: XYZ): IPlane;
    /**
     * Adds a new circle to the model.
     * @param Origin The origin point.
     * @param x_vec A vector in the local x direction, also defines the raidus.
     * @param vec A vector in the plane
     * @param angles The angles, can be undefined, in which case a closed conic is generated.
     * @return Object of type Circle
     */
    addCircle(origin_point: IPoint, x_vec: XYZ, vec: XYZ, angles?: [number, number]): ICircle;
    /**
     * Adds a new ellipse to the model.
     * @param Origin The origin point.
     * @param x_vec A vector defining the radius in the local x direction.
     * @param y_vec A vector defining the radius in the local y direction, must be orthogonal to x.
     * @param angles The angles, can be undefined, in which case a closed conic is generated.
     * @return Object of type Ellipse
     */
    addEllipse(origin_point: IPoint, x_vec: XYZ, vec: XYZ, angles?: [number, number]): IEllipse;
    /**
     * Adds a new Parabola to the model.
     * @param Origin The origin point.
     * @param x_vec A vector defining the length in the local x direction.
     * @param y_vec A vector defining the length in the local y direction, must be orthogonal to x.
     * @param angles The angles, can be undefined, in which case a closed conic is generated.
     * @return Object of type Parabola
     */
    addParabola(origin_point: IPoint, x_vec: XYZ, vec: XYZ, angles: [number, number]): IParabola;
    /**
     * Adds a new Hyperbola to the model.
     * @param Origin The origin point.
     * @param x_vec A vector defining the radius in the local x direction.
     * @param y_vec A vector defining the radius in the local y direction, must be orthogonal to x.
     * @param angles The angles, can be undefined, in which case a closed conic is generated.
     * @return Object of type Hyperbola
     */
    addHyperbola(origin_point: IPoint, x_vec: XYZ, vec: XYZ, angles: [number, number]): IHyperbola;
    /**
     * Adds a new polyline to the model.
     * @param points A collection of Points.
     * @param is_closed True if the polyline is closed.
     * @return Object of type Polyline
     */
    addPolyline(points: IPoint[], is_closed: boolean): IPolyline;
    /**
     * Adds a new polymesh to the model.
     * @param face_points An array of arrays of points.
     * @return Object of type Polymesh
     */
    addPolymesh(face_points: IPoint[][]): IPolymesh;
    /**
     * Get all the points in this model.
     * @param
     * @return
     */
    getAllPoints(): IPoint[];
    /**
     * Get a set of points from an array of IDs.
     * @param
     * @return
     */
    getPoints(ids: number[]): IPoint[];
    /**
     * Get a single point from an ID.
     * @param
     * @return
     */
    getPoint(id: number): IPoint;
    /**
     * Delete a set of points.
     * @param
     * @return
     */
    delPoints(points: IPoint[]): boolean;
    /**
     * Delete a single point.
     * @param
     * @return
     */
    delPoint(point: IPoint): boolean;
    /**
     * Get the number of points in the model.
     * @param
     * @return
     */
    numPoints(): number;
    /**
     * Merge points.
     * @param
     * @return
     */
    mergePoints(points: IPoint[], tolerance?: number): IPoint[];
    /**
     * Merge all points.
     * @param
     * @return
     */
    mergeAllPoints(tolerance: number): IPoint[];
    /**
     * Find certain types of objects in the model.
     * @param
     * @return
     */
    findObjs(obj_type?: EObjType): IObj[];
    /**
     * Get all the object in the model.
     * @param
     * @return
     */
    getAllObjs(): IObj[];
    /**
     * Get an array of objects from an array of IDs.
     * @param
     * @return
     */
    getObjs(ids: number[]): IObj[];
    /**
     * Get a single object from an ID.
     * @param
     * @return
     */
    getObj(id: number): IObj;
    /**
     * Delete an array of objects.
     * @param
     * @return
     */
    delObjs(objs: IObj[], keep_points?: boolean): boolean;
    /**
     * Delete a single object.
     * @param
     * @return
     */
    delObj(obj: IObj, keep_points?: boolean): boolean;
    /**
     * Get the total number of objects in the model.
     * @param
     * @return
     */
    numObjs(): number;
    /**
     * Get all the topos in the model for a specific geom type. (Vertices, Edges, Wires, Faces.)
     * @param
     * @return
     */
    getTopos(geom_type: EGeomType): (IVertex[] | IEdge[] | IWire[] | IFace[]);
    /**
     * Get a topo from a topo path. If the topo does not exist, then null is returned.
     * @param
     * @return
     */
    getTopo(path: ITopoPathData): IVertex | IEdge | IWire | IFace;
    /**
     * Get a topo from a topo label.
     * @param
     * @return
     */
    getTopoFromLabel(path_str: string): IVertex | IEdge | IWire | IFace;
    /**
     * Get the number of topos in the model for a specific geom type. (Vertices, Edges, Wires, Faces.)
     * @param
     * @return
     */
    numTopos(geom_type: EGeomType): number;
}
