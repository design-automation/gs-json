import {EGeomType, EDataType, EObjType} from "./enums";
import {ITopoPathData} from "./ifaces_json";

//  INTERFACES for Model and Geom classes ==========================================================
//  IModel, IGeom

/**
 * Interface, the main model class.
 */
export interface IModel {
    // Geometry
    getGeom(): IGeom;
    // Attribs
    getAttribs(attrib_type?: EGeomType): Array<IEntAttrib|ITopoAttrib>;
    getAttrib(name: string, attrib_type: EGeomType): IEntAttrib|ITopoAttrib;
    addAttrib(name: string, attrib_type: EGeomType, data_type: EDataType): IEntAttrib|ITopoAttrib;
    delAttrib(name: string, attrib_type: EGeomType): boolean;
    setAttribName(old_name, new_name, geom_type: EGeomType): boolean;
    // Groups
    getGroups(): IGroup[];
    getGroup(name: string): IGroup;
    addGroup(name: string): IGroup;
    delGroup(name: string): boolean;
    hasGroup(name: string): boolean;
    setGroupName(old_name, new_name): boolean;
    // Clean up nulls and unused points
    purge(): number;
    // Runs some check
    validate(): boolean;
    //Export the whole model to JSON
    toJSON(): string;
}

/**
 * Interface, for the Geom class, that gives access to geometry in the model.
 */
export interface IGeom  {
    // Creation
    addPoint(xyz: number[]): IPoint;
    addPolyline(wire_points: IPoint[], is_closed: boolean): IPolyline;
    addPolymesh(face_points: IPoint[][]): IPolymesh;
    // Points
    getPointIDs(): number[];
    getPoints(obj_type?: EObjType): IPoint[];
    getPoint(point_id: number): IPoint;
    delPoints(point_ids: number[]): boolean;
    delPoint(point_id: number): boolean;
    numPoints(): number;
    setPointPosition(point_id: number, xyz: number[]): number[];
    getPointPosition(point_id: number): number[];
    // Objs
    getObjIDs(): number[];
    getObjs(obj_type?: EObjType): IObj[];
    getObj(obj_id: number): IObj;
    delObj(obj_id: number, keep_points: boolean): boolean;
    numObjs(): number;
    // Topos
    // getTopos(topo_type: EGeomType): ITopo[];
    getTopos(topo_type: EGeomType): (IVertex[] | IEdge[] | IWire[] | IFace[]);
    numTopos(topo_type: EGeomType): number;
}

//  INTERFACES for Ent classes and Subclasses ======================================================
//  IEnt, IPoint, IObj, IPolyline, IPolymesh,

/**
 * Interface, for the abstract Ent class, that represents any geometric entity.
 * The Ent class cannot be instantiated.
 */
export interface IEnt  {
    // constructor(geom: ifs.IGeom, id: number)
    getID(): number;
    getGeomType(): EGeomType;
    // attribs
    getAttribNames(): string[];
    getAttribValue(name: string): any;
    setAttribValue(name: string, value: any): any;
}

/**
 * Interface, for the Point class, that represents a 3D point with xyz coords.
 */
export interface IPoint extends IEnt {
    // constructor cannot be used to create a new point
    // use the "add" method in Geom class
    getPosition(): number[];
    setPosition(xyz: number[]): number[];
    getVertices(): IVertex[];
    // groups
    getGroupNames(): string[];
    addToGroup(name: string): boolean;
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
    getPointIDsSet(): Set<number>;
    // topo
    getVertices(vertex_type?: EGeomType.wires|EGeomType.faces): IVertex[][][];
    getEdges(edge_type?: EGeomType.wires|EGeomType.faces): IEdge[][][];
    getWires(): IWire[];
    getFaces(): IFace[];
    // nums
    numWires(): number;
    numFaces(): number;
    // groups
    getGroupNames(): string[];
    addToGroup(name: string): boolean;
}

/**
 * Interface, for a Polyline class.
 */
export interface IPolyline  extends IObj {
    getObjType(): EObjType;
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
    getObjID(): number;
    getGeomType(): EGeomType;
    getTopoPath(): ITopoPathData;
    // attribs
    getAttribNames(): string[];
    setAttribValue(name: string, value: any): any;
    getAttribValue(name: string): any;
    // groups
    getGroups(): IGroup[];
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
    //verticesSamePosition(): IVertex[][]; leave this out for now
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
    facesSharedPoints(num_shared_points?: number): IFace[];
    isClosed(): boolean;
    facesSharedPoints(): IFace[];
}

/**
 * Interface, for the TopoPath class.
 * This is used to define a path to a topological component.
 * (Vertex, Edge, Wire, or Face).
 */
// export interface ITopoPath {
//     id: number;             // id, point_id or an obj_id
//     tt: EGeomType.wires|EGeomType.faces;          // topo type, wires or faces
//     ti: number;             // topo index
//     st: EGeomType.vertices|EGeomType.edges;       // sub topo-type, vertices or edges
//     si: number;             // sub topo-index
//     data(): ITopoPathData;
//     equals(path: ITopoPath): boolean;
//     toString(): string;
// }

//  INTERFACES for Attrib and Group classes ========================================================
//  IAttrib, IGroup

/**
 * Interface, for Attrib class.
 */
export interface IAttrib {
    // constructor(model: ifs.IModel, data: IAttribData)
    getName(): string;
    setName(name: string): string;
    getGeomType(): EGeomType;
    getDataType(): EDataType;
    count(): number;
}

export interface IEntAttrib extends IAttrib {
    getValue(id: number): any;
    setValue(id: number, value: any): any;
}

export interface ITopoAttrib extends IAttrib {
    getValue(path: ITopoPathData): any;
    setValue(path: ITopoPathData, value: any): any;
}

/**
 * Interface, for Group class.
 */
export interface IGroup {
    // constructor(model: ifs.IModel, name: string)
    getName(): string;
    setName(name: string): string;

    // Parent/child groups
    getParentGroup(): string;
    getChildGroups(): string[];
    setParentGroup(name: string): string;
    removeParentGroup(): string;

    // Objs in this group
    getObjIDs(obj_type?: EObjType): number[];
    addObj(id: number): boolean;
    addObjs(ids: number[]): boolean;
    removeObj(id: number): boolean;
    removeObjs(ids: number[]): boolean;
    hasObj(id: number): boolean;

    // Topos in this group
    getTopos(geom_type?: EGeomType): ITopo[];
    addTopo(path: ITopo): void;
    addTopos(paths: ITopo[]): void;
    removeTopo(path: ITopo): boolean;
    removeTopos(paths: ITopo[]): boolean;
    hasTopo(path: ITopo): boolean;

    // Points in this group
    getPointIDs(): number[];
    addPoint(id: number): boolean;
    addPoints(ids: number[]): boolean;
    removePoint(id: number): boolean;
    removePoints(ids: number[]): boolean;
    hasPoint(id: number): boolean;

    // Properties for this group (key-value pairs)
    getProps(): Array<[string, any]>; //TODO
    setProps(new_Map: Array<[string, any]>): Array<[string, any]>; //TODO
}
