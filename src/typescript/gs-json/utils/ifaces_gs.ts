import {EGeomType, EDataType, EObjType} from "./enums";
import {TTreeData, TTree2Data, TTree3Data} from "./ifaces_json";

// =================== INTERFACES for Model and Geom classes ===================
// IModel, IGeom
/**
 * Interface, the main model class.
 */
export interface IModel {
    // constructor(data: IModelData)
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
    purgePoints(): number;
    purgeNulls(): number;
    // Runs some check
    validateModel(): boolean;
    //Export the whole model to JSON
    toJSON():string;
}

// Class to hold manipulate geometry arrays
/**
 * Interface, for the Geom class, that stores all the geometry in the model.
 * This has arrays for both point data and object data.
 */
export interface IGeom  {
    // constructor(model: ifs.IModel, point_data?: any[], obj_data?: any[]);
    getModel(): IModel;
    // Creation
    addPoint(xyz: number[]): IPoint;
    addPolyline(wire_points: IPoint[], is_closed: boolean): IPolyline;
    addPolymesh(face_points: IPoint[][]): IPolymesh;
    // Generic method for getting data
    getPointData(id: number): any[];
    getObjData(path?: ITopoPath): any;
    // Points
    getPointIDs(obj_type?: EObjType): number[];
    getPoints(obj_type?: EObjType): IPoint[];
    getPoint(point_id: number): IPoint;
    delPoint(point_id: number): boolean;
    numPoints(obj_type?: EObjType): number;
    setPointPosition(point_id: number, xyz: number[]): number[];
    getPointPosition(point_id: number): number[];
    // Objs
    getObjIDs(obj_type?: EObjType): number[];
    getObjs(obj_type?: EObjType): IObj[];
    getObj(obj_id: number): IObj;
    delObj(obj_id: number, keep_points: boolean): boolean;
    numObjs(obj_type?: EObjType): number;
    setObjPosition(obj_id: number, obj_data: any[]): any[];
    getObjPosition(obj_id: number): any[];
    // Topos
    // getTopos(topo_type: EGeomType): ITopo[];
    getTopos(topo_type: EGeomType): (IVertex[] | IEdge[] | IWire[] | IFace[]);
    numTopos(topo_type: EGeomType): number;
    // Attribs
    getAttribTemplate(attrib_type: EGeomType): any[];
}

// =================== INTERFACES for Ent classes and Subclasses ===================
// IEnt, IPoint, IObj, IPolyline, IPolymesh,

/**
 * Interface, for the abstract Ent class, that represents any geometric entity.
 * The Ent class cannot be instantiated.
 */
export interface IEnt  {
    // constructor(geom: ifs.IGeom, id: number)
    getID(): number;
    getGeom(): IGeom;
    getModel(): IModel;
    getGeomType(): EGeomType;
    // attribs
    getAttribNames(): string[];
    getAttribValue(name: string): any;
    setAttribValue(name: string, value: any): any;
    // groups
    getGroupNames(): string[];
    addToGroup(name: string): boolean;
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
}
/**
 * Interface, for the abstract Obj class, that represents a geometric object.
 * Subclasses such as Polyline and polymesh can be instantiated.
 */
export interface IObj extends IEnt {
    // constructor cannot be used to create a new point
    // use the "add" method in Geom class
    // to be overriden by subclass
    getObjType(): EObjType;
    // points
    getPoints(point_type?: EGeomType.wires|EGeomType.faces): IPoint[][][];
    getPointIDsSet(): Set<number>;
    // topo
    getVertices(vertex_type?: EGeomType.wires|EGeomType.faces): IVertex[][][];
    getEdges(edge_type?: EGeomType.wires|EGeomType.faces): IEdge[][][];
    getWires(): IWire[];
    getFaces(): IFace[];
    //
    numWires(): number;
    numFaces(): number;
}
/**
 * Interface, for a Polyline class.
 */
export interface IPolyline  extends IObj {
    getObjType(): EObjType;
    setPosition(wire_points: IPoint[]): any[];
}

/**
 * Interface, for a Polymesh class.
 */
export interface IPolymesh extends IObj {
    getObjType(): EObjType;
    setPosition(wire_points: IPoint[], face_points: IFace[]): any[];
}

// =================== INTERFACES for Topo classes and Subclasses ===================
// ITopo, IVertex, IEdge, IWire, IFace
/**
 * Interface, for Topo abstract class, that represents any topological component.
 */
export interface ITopo {
    // constructor(geom: ifs.IGeom, path: ifs.ITopoPath)
    getGeom(): IGeom;
    getModel(): IModel;
    getObjID(): number;
    getGeomType(): EGeomType;
    getTopoPath(): ITopoPath;
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
    verticesSamePosition(): IVertex[][];
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
}
/**
 * Interface, for the TopoPath class.
 * This is used to define a path to a topological component.
 * (Vertex, Edge, Wire, or Face).
 */
export interface ITopoPath {
    id: number;             // id, point_id or an obj_id
    tt: EGeomType.wires|EGeomType.faces;          // topo type, wires or faces
    ti: number;             // topo index
    st: EGeomType.vertices|EGeomType.edges;       // sub topo-type, vertices or edges
    si: number;             // sub topo-index
    equals(path: ITopoPath): boolean;
    toString(): string;
}

// =================== INTERFACES for Attrib and Group classes ===================
// IAttrib, IGroup

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
    addValue(id: number): boolean;
    delValue(id: number): any;
    addObjValues(id: number): boolean;
    delObjValues(id: number): boolean;
}

export interface ITopoAttrib extends IAttrib {
    getValue(path: ITopoPath): any;
    setValue(path: ITopoPath, value: any): any;
    addValue(path: ITopoPath): boolean;
    delValue(path: ITopoPath): any;
    addObjValues(id: number): boolean;
    delObjValues(id: number): boolean;
}

/**
 * Interface, for Group class.
 */
export interface IGroup {
    // constructor(model: ifs.IModel, name: string)
    getName(): string;
    setName(name: string): string;
    getTopoTree(): ITopoTree;
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
    topoToArray(): any[];
    // Points in this group
    getPointIDs(): number[];
    addPoint(id: number): boolean;
    addPoints(ids: number[]): boolean;
    removePoint(id: number): boolean;
    removePoints(ids: number[]): boolean;
    hasPoint(id: number): boolean;
    // Properties for this group (key-value pairs)
    getProps(): Map<string, any>;
    setProps(new_Map: Map<string, any>): Map<string, any>;
}

// =================== INTERFACES for TopoTree ===================
// ITopoTree, ITopoTreeBranch, ISubtopoTreeBranch
/**
 * Interface, for TopTree class.
 */

export interface ITopoTree {
// constructor(model: ifs.IModel, data?: (number[][]|number[][][]); []);
    hasTopo(topo: ITopo): boolean ;
    addTopo(topo: ITopo): void ;
    removeTopo(topo: ITopo): boolean ;
    getTopos(geom_type?: EGeomType): ITopo[] ;
    toArray(): TTreeData;
    fromArray(data: TTreeData): void ;
}
/**
 * Interface, for TopoTreeBranch class.
 */
export interface ITreeBranch2 {
  //  constructor(data?: number[][]) {
    has(a: number, b: number): boolean;
    add(a: number, b: number): void;
    remove(a: number, b?: number): boolean;
    flatten(): number[][];
    toArray(): TTree2Data;
    fromArray(arr1: TTree2Data): void;
}
/**
 * Interface, for SubtopoTreeBranch class.
 */
export interface ITreeBranch3 {
//    constructor(data?: number[][][]);
    has(a: number, b: number, c: number): boolean;
    add(a: number, b: number, c: number): void;
    remove(a: number, b?: number, c?: number): boolean;
    flatten(): number[][];
    toArray(): TTree3Data;
    fromArray(arr: TTree3Data): void;
}
