// ========================= ENUMS =========================
// EGeomType, EDataType, EObjType

export const enum EGeomType {
    objs,
    faces,
    wires, 
    edges,
    vertices,
    points
}
export const enum EDataType {
    type_str,
    type_num,
    type_bool,
    type_str_arr,
    type_num_arr,
    type_bool_arr,
}
export const enum EObjType {
    polyline = 100,
    nurbs_curve = 120,
    bezier_curve = 121,
    polymesh = 200,
    nurbs_surface = 220,
    bezier_surface = 221,
}
// ========================= MAPS =========================
// mapStringToAttribType, mapStringToDataType
// ========================= MAPS =========================
export let mapStringToAttribType = new Map<string,EGeomType> ([
    ["objs",EGeomType.objs],
    ["faces",EGeomType.faces],
    ["wires",EGeomType.wires],
    ["edges",EGeomType.edges],
    ["vertices",EGeomType.vertices],
    ["points",EGeomType.points]
])
export let mapStringToDataType = new Map<string,EDataType> ([
    ["string",EDataType.type_str],
    ["number",EDataType.type_num],
    ["boolean",EDataType.type_bool],
    ["string[]",EDataType.type_str_arr],
    ["number[]",EDataType.type_num_arr],
    ["boolean[]",EDataType.type_bool_arr]
])
// ========================= INTERFACES for reading gsJSON data =========================
// IMetadata, IAttribData, IGroupData, ISkinData, IModelData
// ========================= INTERFACES for reading gsJSON data =========================
export interface IMetadata {
    filetype: "mobius";
    version: number;
    crs: any;
    location: string;
}
export interface IAttribData {
    name: string;
    geom_type: "points" | "vertices" | "edges" | "wires" | "faces" | "objs"; //enum not working
    data_type: "string"|"number"|"boolean"|"string[]"|"number[]"|"boolean[]"; //enum not working
    values: any[];
    map: (number|number[]|number[][])[]; //values_map
}
export interface IGroupData {
    name: string;
    objs?: any[];
    groups?: string[];
    properties?: { key: string, value: any };
}
export interface ISkinData {
    images: string[];
    textures: string[];
    materials: any[];
}
export interface IModelData {
    metadata: IMetadata;
    points?: [number[],number[][]];
    objects?: any[];
    attribs?: IAttribData[];
    groups?: IGroupData[];
    skins?: ISkinData[];
}
// ========================= DATA STRUCTURES =========================
// IDict, IAttribDict, IAttribTypesDict, IGroupsDict

export interface IDict {
    [key: string] : any;
}
export interface IAttribDict {
    [key: string] : IAttrib;
}
export interface IAttribTypesDict {
    objs: IAttribDict;
    points: IAttribDict;
    faces: IAttribDict;
    wires: IAttribDict;
    edges: IAttribDict;
    vertices: IAttribDict;
}
export interface IGroupsDict {
    [key: string] : IGroup;
}
// ========================= INTERFACES for Model and Geom classes =========================
// IModel, IGeom, IGeomPath

export interface IModel {
    //constructor()
    //Geometry
    getGeom():IGeom;
    setData(data:IModelData):void;
    //Attribs
    getAttribs(attrib_type:EGeomType):IAttrib[];
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
export interface IGeom  {
    //constructor(model:ifs.IModel, point_data?:any[], obj_data?:any[]) 
    getModel():IModel;
    //Creation
    addPoint(xyz:number[]):IPoint;
    addPolyline(wire_points:IPoint[]):IObj;
    addPolymesh(wire_points:IPoint[], face_points:IFace[]):IObj;
    //Points
    getPointIDs(obj_type?:EObjType):number[];
    getPoints(obj_type?:EObjType):IPoint[];
    getPoint(point_id:number):IPoint;
    delPoint(point_id:number):boolean;
    numPoints(obj_type?:EObjType):number;
    setPointPosition(point_id:number, xyz:number[]):number[];
    getPointPosition(point_id:number,):number[];
    //Objs
    getObjIDs(obj_type?:EObjType):number[];
    getObjs(obj_type?:EObjType):IObj[];
    getObj(obj_id:number):IObj;
    delObj(obj_id:number):boolean;
    numObjs(obj_type?:EObjType):number;
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
export interface IGeomPath {
    id:number;             //id, point_id or an obj_id
    tt:EGeomType.wires|EGeomType.faces;          //topo type, wires or faces
    ti:number;             //topo index
    st:EGeomType.vertices|EGeomType.edges        //sub topo-type, vertices or edges
    si:number;             //sub topo-index
}
// ========================= INTERFACES for Ent classes and Subclasses =========================
// IEnt, IPoint, IObj, IPolyline, IPolymesh, 

//interface for ent
//abstract superclass
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
}
//interfaces for points
export interface IPoint extends IEnt {
    //constructor cannot be used to create a new point
    //use the "add" method in Geom class
    getPosition():number[];
    setPosition(xyz:number[]):number[];
    getVertices():IVertex[];
}
//interfaces for objs
export interface IObj extends IEnt {
    //constructor cannot be used to create a new point
    //use the "add" method in Geom class
    getObjType():EObjType;
    getVertices():IVertex[];
    getEdges():IEdge[];
    getWires():IWire[];
    getFaces():IFace[];
}
export interface IPolyline  extends IObj {
}
export interface IPolymesh extends IObj {
}
// ========================= INTERFACES for Topo classes and Subclasses =========================
// ITopo, IVertex, IEdge, IWire, IFace

//interfaces for topo component
//abstract superclass
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
export interface IVertex extends ITopo {
    getPoint(): IPoint;
    next():IVertex;
    previous():IVertex;    
    getEdge():IEdge;
}
export interface IEdge extends ITopo {
    getVertices(): IVertex[];
    next():IEdge;
    previous():IEdge;
    neighbours():IEdge[];
    getParent():IWire|IFace; //getWireOrFace()
}
export interface IWire extends ITopo {
    getVertices():IVertex[];
    getEdges(): IEdge[];
}
export interface IFace extends ITopo {
    getVertices():IVertex[];
    getEdges(): IEdge[];
    neighbours():IFace[];
}
// ========================= INTERFACES for Attrib and Group classes =========================
// IAttrib, IGroup

//interface for attrib
export interface IAttrib {
    //constructor(model:ifs.IModel, 
    //    name:string, attrib_type:ifs.EGeomType, data_type:ifs.EDataType, 
    //    values_map?:any[], values?:any[])
    getName():string;
    setName(name:string):string;
    getGeomType():EGeomType;
    getDataType():EDataType;
    //Attrib Values
    getValue(path:IGeomPath):any;
    setValue(path:IGeomPath, value:any):any;
    count():number;
}
//interface for group
export interface IGroup {
    //constructor(model:ifs.IModel, name:string)
    getName():string;
    setName(name:string):string;
    //Parent/child groups
    getParentGroup():IGroup;
    getChildGroups():IGroup[];
    setParentGroup(group:IGroup):boolean;
    removeParentGroup(group:IGroup):boolean;
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
