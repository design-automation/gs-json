import {EGeomType, EDataType, EObjType} from "./enums";
import {IModelData, IAttribData, IGroupData, ISkinData} from "./ifaces_json";
// ========================= DATA STRUCTURES =========================
// IDict, IAttribDict, IAttribTypesDict, IGroupsDict

/**
* Interface, a general purpose dictionary.
*/
export interface IDict {
    [key: string] : any;
}
/**
* Interface, a dictionary for storing Attrib instances.
* The key is the name of the Attrib, and the value is an instance of class Attrib.
* This is used in the main Model class to store all the attributes in the model.
*/
export interface IAttribDict {
    [key: string] : IAttrib;
}
/**
* Interface, a dictionary for storing Attrib dictionaries.
* This is used in the main Model class to store attributes.
* For each Attrib type, there is a dictionary of attributes.
* This makes finding attributes faster. For example, to find
* a particular point attribute called "xxx", the format is:
* "attrib_types_dict.points.xxx"
*/
export interface IAttribTypesDict {
    objs: IAttribDict;
    points: IAttribDict;
    faces: IAttribDict;
    wires: IAttribDict;
    edges: IAttribDict;
    vertices: IAttribDict;
}
/**
* Interface, a dictionary for storing Group instances.
* The key is the name of the Group, and the value is an instance of class Group.
* This is used in the main Model class to store all teh groups in teh model.
*/
export interface IGroupsDict {
    [key: string] : IGroup;
}
// ========================= INTERFACES for Model and Geom classes =========================
// IModel, IGeom, IGeomPath

/**
* Interface, the main model class.
*/
export interface IModel {
    //constructor()
    //Geometry
    getGeom():IGeom;
    setData(data:IModelData):void;
    //Attribs
    getAttribs(attrib_type?:EGeomType):IAttrib[];
    getAttrib(name:string, attrib_type:EGeomType):IAttrib;
    addAttrib(name:string, attrib_type:EGeomType, data_type:EDataType):IAttrib;
    delAttrib(name:string, attrib_type:EGeomType):boolean;
    //Groups
    getGroups():IGroup[];
    getGroup(name:string):IGroup;
    addGroup(name:string):IGroup;
    delGroup(name:string):boolean;
    //Clean up nulls and unused points
    purgePoints():number;
    purgeNulls():number;
    //Runs some check
    validateModel():boolean;
}
//Class to hold manipulate geometry arrays
/**
* Interface, for the Geom class, that stores all the geometry in the model.
* This has arrays for both point data and object data.
*/
export interface IGeom  {
    //constructor(model:ifs.IModel, point_data?:any[], obj_data?:any[]) 
    getModel():IModel;
    //Creation
    addPoint(xyz:number[]):IPoint;
    addPolyline(wire_points:IPoint[]):IObj;
    addPolymesh(wire_points:IPoint[], face_points:IFace[]):IObj;
    //Generic method for getting data
    getPointData(id:number):any[];
    getObjData(path?:IGeomPath):any;
    //Points
    getPointIDs(obj_type?:EObjType):number[];
    getPoints(obj_type?:EObjType):IPoint[];
    getPoint(point_id:number):IPoint;
    delPoint(point_id:number):boolean;
    numPoints(obj_type?:EObjType):number;
    setPointPosition(point_id:number, xyz:number[]):number[];
    getPointPosition(point_id:number):number[];
    //Objs
    getObjIDs(obj_type?:EObjType):number[];
    getObjs(obj_type?:EObjType):IObj[];
    getObj(obj_id:number):IObj;
    delObj(obj_id:number):boolean;
    numObjs(obj_type?:EObjType):number;
    setObjPosition(obj_id:number, obj_data:any[]):any[];
    getObjPosition(obj_id:number):any[];
    //Topos
    getTopos(topo_type:EGeomType):ITopo[];
    numTopos(topo_type:EGeomType):number;
    //Attribs
    getAttribTemplate(attrib_type:EGeomType):any[];
}
// interface for path to a single topo component
// This is used by:
//     attrib.getValue(path) and attrib.setValue(path, value)
//     ent.getGeomPath()
/**
* Interface, for the GeomPath class. 
* This is used to define a path to a particular geometric element.
* The geometric element could be either an Ent entity (Point or Obj),
* or it could be a Topo component (Vertex, Edge, Wire, or Face).
*/
export interface IGeomPath {
    id:number;             //id, point_id or an obj_id
    tt:EGeomType.wires|EGeomType.faces;          //topo type, wires or faces
    ti:number;             //topo index
    st:EGeomType.vertices|EGeomType.edges        //sub topo-type, vertices or edges
    si:number;             //sub topo-index
    equals(path:IGeomPath):boolean;
    toString():string;
}
// ========================= INTERFACES for Ent classes and Subclasses =========================
// IEnt, IPoint, IObj, IPolyline, IPolymesh, 

/**
* Interface, for the abstract Ent class, that represents any geometric entity.
* The Ent class cannot be instantiated. 
*/
export interface IEnt  {
    //constructor(geom:ifs.IGeom, id:number) 
    getID():number;
    getGeom():IGeom;
    getModel():IModel;
    getGeomType():EGeomType;
    //attribs
    getAttribNames():string[];
    getAttribValue(name:string):any;
    setAttribValue(name:string, value:any):any;
    //groups
    getGroupNames():string[];
    addToGroup(name:string):boolean;
}
/**
* Interface, for the Point class, that represents a 3D point with xyz coords.
*/
export interface IPoint extends IEnt {
    //constructor cannot be used to create a new point
    //use the "add" method in Geom class
    getPosition():number[];
    setPosition(xyz:number[]):number[];
    getVertices():IVertex[];
}
/**
* Interface, for the abstract Obj class, that represents a geometric object.
* Subclasses such as Polyline and polymesh can be instantiated.
*/
export interface IObj extends IEnt {
    //constructor cannot be used to create a new point
    //use the "add" method in Geom class
    //
    getWires():IWire[];
    getFaces():IFace[];
    //
    numWires():number;
    numFaces():number;
}
/**
* Interface, for a Polyline class.
*/
export interface IPolyline  extends IObj {
    getObjType():EObjType;
    setPosition(wire_points:IPoint[]):any[];
}

/**
* Interface, for a Polymesh class.
*/
export interface IPolymesh extends IObj {
    getObjType():EObjType;
    setPosition(wire_points:IPoint[], face_points:IFace[]):any[]

}
// ========================= INTERFACES for Topo classes and Subclasses =========================
// ITopo, IVertex, IEdge, IWire, IFace


/**
* Interface, for Topo abstract class, that represents any topological component.
*/
export interface ITopo {
    //constructor(geom:ifs.IGeom, geom_path:ifs.IGeomPath)
    getGeom():IGeom;
    getModel():IModel;
    getObjID():number;
    getGeomType():EGeomType;
    //attribs
    getAttribNames():string[];
    setAttribValue(name:string, value:any):any;
    getAttribValue(name:string):any;
    //groups
    getGroupNames():string[];
}
/**
* Interface, for Vertex class.
*/
export interface IVertex extends ITopo {
    getPoint(): IPoint;
    getEdge():IEdge;
    getWireOrFace():IWire|IFace; 
    next():IVertex;
    previous():IVertex;    
    verticesSharedPoint():IVertex[][];
    verticesSamePosition():IVertex[][];
}
/**
* Interface, for Edge class.
*/
export interface IEdge extends ITopo {
    getVertices(): IVertex[];
    getWireOrFace():IWire|IFace;
    next():IEdge;
    previous():IEdge;
    edgesSharedPoints():IEdge[][];
}
/**
* Interface, for Wire class.
*/
export interface IWire extends ITopo {
    getVertices():IVertex[];
    getEdges(): IEdge[];
    numVertices():number;
    numEdges():number;
    isClosed():boolean;
}
/**
* Interface, for Face class.
*/
export interface IFace extends ITopo {
    getVertices():IVertex[];
    getEdges(): IEdge[];
    numVertices():number;
    numEdges():number;
    facesSharedPoints(num_shared_points?:number):IFace[];
    isClosed():boolean;
}
// ========================= INTERFACES for Attrib and Group classes =========================
// IAttrib, IGroup

/**
* Interface, for Attrib class.
*/
export interface IAttrib {
    //constructor(model:ifs.IModel, 
    //    name:string, attrib_type:EGeomType, data_type:EDataType, 
    //    values_map?:any[], values?:any[])
    getName():string;
    setName(name:string):string;
    getGeomType():EGeomType;
    getObjDataType():EDataType;
    //Attrib Values
    getValue(path:IGeomPath):any;
    setValue(path:IGeomPath, value:any):any;
    count():number;
}
/**
* Interface, for Group class.
*/
export interface IGroup {
    //constructor(model:ifs.IModel, name:string)
    getName():string;
    setName(name:string):string;
    //Parent/child groups
    getParentGroup():string;
    getChildGroups():string[];
    setParentGroup(name:string):string;
    //Points in this group
    getPointIDs():number[];
    addPoint(point_id:number):boolean;
    addPoints(point_ids:number[]):boolean;
    removePoint(point_id:number):boolean;
    removePoints(point_ids:number[]):boolean;
    //Objs in this group
    getObjIDs(obj_type?:EObjType):number[];
    addObj(obj_id:number):boolean;
    addObjs(obj_ids:number[]):boolean;
    removeObj(obj_id:number):boolean;
    removeObjs(obj_ids:number[]):boolean;
    //Properties for this group (key-value pairs)
    getPropeties():IDict;
}
