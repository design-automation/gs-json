import * as three from "three";
import {EGeomType, EDataType, EObjType} from "./enums";
import {ITopoPathData} from "./ifaces_json";

export type XYZ = [number, number, number];

//  INTERFACES for Model and Geom classes ==========================================================
//  IModel, IGeom

/**
 * Interface, the main model class.
 */
export interface IModel {
    // Geometry
    getGeom(): IGeom;
    // Attribs
    findAttribs(attrib_type: EGeomType): IEntAttrib[]|ITopoAttrib[];
    getAllAttribs(): [IEntAttrib[],ITopoAttrib[]];
    getEntAttrib(name: string, attrib_type: EGeomType): IEntAttrib;
    getAllEntAttribs(): IEntAttrib[];
    addEntAttrib(name: string, attrib_type: EGeomType, data_type: EDataType): IEntAttrib;
    getTopoAttrib(name: string, attrib_type: EGeomType): ITopoAttrib;
    getAllTopoAttribs(): ITopoAttrib[];
    addTopoAttrib(name: string, attrib_type: EGeomType, data_type: EDataType): ITopoAttrib;
    delAttrib(attrib: IAttrib): boolean;
    hasAttrib(attrib: IAttrib): boolean;
    setAttribName(attrib: IAttrib, new_name: string): boolean;
    // Groups
    getAllGroups(): IGroup[];
    getGroup(name: string): IGroup;
    addGroup(name: string, parent?: IGroup): IGroup;
    delGroup(group: IGroup): boolean;
    hasGroup(group: IGroup): boolean;
    setGroupName(group: IGroup, new_name: string): boolean;
    // Clean up nulls and unused points
    purge(): void;
    // Runs some check
    validate(): boolean;
    // Export the whole model to JSON
    toJSON(): string;
}

/**
 * Interface, for the Geom class, that gives access to geometry in the model.
 */
export interface IGeom  {
    // Creation
    addPoint(xyz: XYZ): IPoint;
    addPoints(xyz_arr: XYZ[]): IPoint[];
    addRay(origin_point: IPoint, ray_vec: XYZ): IRay;
    addPlane(origin_point: IPoint, x_vec: XYZ, y_vec: XYZ): IPlane;
    addCircle(origin_point: IPoint, x_vec: XYZ, y_vec: XYZ, angles?: [number, number]);
    addEllipse(origin_point: IPoint, x_vec: XYZ, y_vec: XYZ, angles?: [number, number]);
    addPolyline(wire_points: IPoint[], is_closed: boolean): IPolyline;
    addPolymesh(face_points: IPoint[][]): IPolymesh;
    // Points
    getAllPoints(): IPoint[];
    getPoints(point_ids: number[]): IPoint[];
    getPoint(point_id: number): IPoint;
    delPoints(points: IPoint[]): boolean;
    delPoint(point: IPoint): boolean;
    numPoints(): number;
    mergePoints(points: IPoint[], tolerance: number): IPoint[];
    mergeAllPoints(tolerance: number): IPoint[];
    // Objs
    findObjs(obj_type?: EObjType): IObj[];
    getAllObjs(): IObj[];
    getObjs(obj_ids: number[]): IObj[];
    getObj(obj_id: number): IObj;
    delObjs(objs: IObj[], keep_points: boolean): boolean;
    delObj(obj: IObj, keep_points: boolean): boolean;
    numObjs(): number;
    // Topos
    // getTopos(topo_type: EGeomType): ITopo[];
    getTopos(topo_type: EGeomType): (IVertex[] | IEdge[] | IWire[] | IFace[]);
    numTopos(topo_type: EGeomType): number;
    getTopo(path: ITopoPathData): IVertex|IEdge|IWire|IFace;
    getTopoFromLabel(path_str: string): IVertex|IEdge|IWire|IFace;
}

//  INTERFACES for Ent classes and Subclasses ======================================================
//  IEnt, IPoint, IObj, etc

/**
 * Interface, for the abstract Ent class, that represents any geometric entity.
 * The Ent class cannot be instantiated.
 */
export interface IEnt  {
    getModel(): IModel;
    getGeom(): IGeom;
    // constructor(geom: ifs.IGeom, id: number)
    getID(): number;
    exists(): boolean; // must be overridden
    getGeomType(): EGeomType; // must be overridden
    getLabel(): string; // must be overridden
    getLabelCentroid(): XYZ; // must be overridden
    copy(copy_attribs?: boolean): IEnt; // must be overridden
    xform(matrix: three.Matrix4): void;
    // attribs
    getAttribs(): IEntAttrib[]|ITopoAttrib[];
    getAttribValue(attrib: IEntAttrib): any;
    setAttribValue(attrib: IEntAttrib, value: any): any;
    // groups
    getGroups(): IGroup[];
    addToGroup(group: IGroup): boolean;
}

/**
 * Interface, for the Point class, that represents a 3D point with xyz coords.
 */
export interface IPoint extends IEnt {
    // constructor cannot be used to create a new point
    // use the "add" method in Geom class
    getPosition(): XYZ;
    setPosition(xyz: XYZ): XYZ;
    getVertices(): IVertex[];
}

/**
 * Interface, for the abstract Obj class, that represents a geometric object.
 * Subclasses such as Polyline and polymesh can be instantiated.
 */
export interface IObj extends IEnt {
    // constructor cannot be used to create a new point
    // use the "add" method in Geom class
    getObjType(): EObjType;
    // points
    getPoints(point_type?: EGeomType.wires|EGeomType.faces): IPoint[][][];
    getPointsArr(): IPoint[];
    getPointsSet(): IPoint[];
    // topo
    getVertices(vertex_type?: EGeomType.wires|EGeomType.faces): IVertex[][][];
    getEdges(edge_type?: EGeomType.wires|EGeomType.faces): IEdge[][][];
    getWires(): IWire[];
    getFaces(): IFace[];
    // nums
    numWires(): number;
    numFaces(): number;
}

/**
 * Interface, for a Ray class.
 */
export interface IRay  extends IObj {
    getObjType(): EObjType;
    getOrigin(): IPoint;
    getVector(): XYZ;
}

/**
 * Interface, for a Plane class.
 */
export interface IPlane  extends IObj {
    getObjType(): EObjType;
    getOrigin(): IPoint;
    getVectors(): XYZ[];
    getCartesians(): number[];
}

/**
 * Interface, for a Circle class.
 */
export interface ICircle  extends IObj {
    getObjType(): EObjType;
    isClosed(): boolean;
    getOrigin(): IPoint;
    getVectors(): XYZ[];
    setVectors(x_vec: XYZ, y_vec: XYZ): void;
    getRadius(): number;
    getAngles(): [number, number];
    setAngles(angles: [number, number]): void;
    length(): number;
    evalParam(t: number): IPoint;
    equiPoints(num_points: number): IPoint[];
}

/**
 * Interface, for a Ellipse class.
 */
export interface IEllipse  extends IObj {
    getObjType(): EObjType;
    isClosed(): boolean;
    getOrigin(): IPoint;
    getVectors(): XYZ[];
    setVectors(x_vec: XYZ, y_vec: XYZ): void;
    getRadii(): [number, number];
    getAngles(): [number, number];
    setAngles(angles: [number, number]): void;
}

/**
 * Interface, for a Polyline class.
 */
export interface IPolyline  extends IObj {
    getObjType(): EObjType;
    isClosed(): boolean;
    setIsClosed(is_closed: boolean): boolean;
    numVertices(): number;
    numEdges(): number;
    insertVertex(edge: IEdge, point: IPoint): IVertex;
    addVertex(point: IPoint, to_start: boolean): IVertex;
    delVertex(vertex: IVertex): IVertex;
}

/**
 * Interface, for a Polymesh class.
 */
export interface IPolymesh extends IObj {
    getObjType(): EObjType;
}

//  INTERFACES for Topo classes and Subclasses =====================================================
//  ITopo, IVertex, IEdge, IWire, IFace

/**
 * Interface, for Topo abstract class, that represents any topological component.
 */
export interface ITopo {
    exists(): boolean;
    getModel(): IModel;
    getGeom(): IGeom;
    //
    getObjID(): number;
    getObj(): IObj;
    getGeomType(): EGeomType;
    getTopoPath(): ITopoPathData;
    getTopoPathStr(): string;
    getLabel(): string;
    getLabelCentroid(): XYZ;
    // attribs
    getAttribs(): ITopoAttrib[];
    setAttribValue(attrib: ITopoAttrib, value: any): any;
    getAttribValue(attrib: ITopoAttrib): any;
    // groups
    getGroups(): IGroup[];
    addToGroup(group: IGroup): boolean;
}

/**
 * Interface, for Vertex class.
 */
export interface IVertex extends ITopo {
    getPoint(): IPoint;
    getEdge(): IEdge;
    getWireOrFace(): IWire|IFace;
    next(): IVertex;
    previous(): IVertex;
    verticesSharedPoint(): IVertex[][];
    // verticesSamePosition(): IVertex[][]; leave this out for now
}

/**
 * Interface, for Edge class.
 */
export interface IEdge extends ITopo {
    getVertices(): IVertex[];
    getWireOrFace(): IWire|IFace;
    next(): IEdge;
    previous(): IEdge;
    edgesSharedPoints(): IEdge[][];
}

/**
 * Interface, for Wire class.
 */
export interface IWire extends ITopo {
    getVertices(): IVertex[];
    getEdges(): IEdge[];
    numVertices(): number;
    numEdges(): number;
    isClosed(): boolean;
    wiresSharedPoints(): IWire[];
}

/**
 * Interface, for Face class.
 */
export interface IFace extends ITopo {
    getVertices(): IVertex[];
    getEdges(): IEdge[];
    numVertices(): number;
    numEdges(): number;
    isClosed(): boolean;
    facesSharedPoints(num_shared_points?: number): IFace[];
}

//  INTERFACES for Attrib and Group classes ========================================================
//  IAttrib, IGroup

/**
 * Interface, for Attrib class.
 */
export interface IAttrib {
    exists(): boolean;
    getModel(): IModel;
    getGeom(): IGeom;
    // constructor(model: ifs.IModel, data: IAttribData)
    getName(): string;
    setName(name: string): string;
    getGeomType(): EGeomType;
    getDataType(): EDataType;
    count(): number;
    getValues(): any[];
    getLabels(): string[];
}

export interface IEntAttrib extends IAttrib {
    getIDs(): number[];
    getEnts(): IPoint[]|IObj[];
}

export interface ITopoAttrib extends IAttrib {
    getPaths(): ITopoPathData[];
    getTopos(): IVertex[]|IEdge[]|IWire[]|IFace[];
}

/**
 * Interface, for Group class.
 */
export interface IGroup {
    exists(): boolean;
    getModel(): IModel;
    getGeom(): IGeom;
    // constructor(model: ifs.IModel, name: string)
    getName(): string;
    setName(name: string): string;
    // Parent/child groups
    getParentGroup(): IGroup;
    getChildGroups(): IGroup[];
    setParentGroup(group: IGroup): IGroup;
    removeParentGroup(): IGroup;

    // Objs in this group
    getObjs(obj_type?: EObjType): IObj[];
    addObj(obj: IObj): boolean;
    addObjs(objs: IObj[]): boolean;
    removeObj(obj: IObj): boolean;
    removeObjs(objs: IObj[]): boolean;
    hasObj(obj: IObj): boolean;

    // Topos in this group
    getTopos(geom_type?: EGeomType): ITopo[];
    addTopo(path: ITopo): boolean;
    addTopos(paths: ITopo[]): boolean;
    removeTopo(path: ITopo): boolean;
    removeTopos(paths: ITopo[]): boolean;
    hasTopo(path: ITopo): boolean;

    // Points in this group
    getPoints(): IPoint[];
    addPoint(point: IPoint): boolean;
    addPoints(points: IPoint[]): boolean;
    removePoint(point: IPoint): boolean;
    removePoints(points: IPoint[]): boolean;
    hasPoint(point: IPoint): boolean;

    // Properties for this group (key-value pairs)
    getProps(): Array<[string, any]>; // TODO
    setProps(new_Map: Array<[string, any]>): Array<[string, any]>; // TODO
}
