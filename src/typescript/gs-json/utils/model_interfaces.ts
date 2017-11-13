//model_interfaces
// ========================= ENUMS =========================
export enum ETopoType {
    points = "points",
    vertices = "vertices",
    edges = "edges",
    wires = "wires",
    faces = "faces",
    shells = "shells"
}
export enum EDataType {
    type_string = "string",
    type_number = "number",
    type_boolean = "boolean",
    type_string_array = "string[]",
    type_number_array = "number[]",
    type_boolean_array = "boolean[]"
}
export enum EObjType {
    polyline = 100,
    polymesh = 200
}
// ========================= INTERFACES for reading gsJSON data =========================
export interface IMetadata {
    filetype: "mobius";
    version: number;
    crs: any;
    location: string;
}
export interface IAttribData {
    name: string;
    topo_type: "points" | "vertices" | "edges" | "wires" | "faces" | "shells"; //enum not working
    data_type: "string"|"number"|"boolean"|"string[]"|"number[]"|"boolean[]"; //enum not working
    values: any[];
    map: (number|number[]|number[][])[]; //values_map
}
export interface ICollData {
    name: string;
    objs?: any[];
    colls?: string[];
    properties?: { key: string, value: any };
}
export interface ISkinData {
    images: string[];
    textures: string[];
    materials: any[];
}
export interface IModelData {
    metadata: IMetadata;
    geometry?: any[];
    attribs?: IAttribData[];
    colls?: ICollData[];
    skins?: ISkinData[];
}
// ========================= INTERFACES for classes =========================
export interface IDict { //used for coll properties
    [key: string] : any;
}
export interface IAttribDict {
    [key: string] : IAttrib;
}
export interface IAttribTypesDict {
    points: IAttribDict;
    vertices: IAttribDict;
    edges: IAttribDict;
    wires: IAttribDict;
    faces: IAttribDict;
    shells: IAttribDict;
}
export interface ICollsDict {
    [key: string] : IColl;
}
// interface for path to a single topo in an attrib array
export interface IPath {
    id:number;  //obj_id or point_id number
    topo_type:ETopoType; //shells, faces, wires
    topo_number:number;
    subtopo_type:ETopoType; //edges, vertices
    subtopo_number:number;
    getType():ETopoType;
}
// interface for main model
export interface IModel {
    //Creation
    createPoint(xyz:number[]):IPoint;
    createPolyline(wire_points:IPoint[]):IObj;
    createPolymesh(wire_points:IPoint[], face_points:IFace[]):IObj;
    //Points
    getPoint(point_id:number):IPoint;
    addPoint(point:IPoint):IPoint;
    delPoint(point_id:number):boolean;
    delPoints(point_ids:number[]):boolean;
    numPoints():number;
    //Objs
    getObjIDs(obj_type?:EObjType):number[];
    getObj(obj_id:number):IObj;
    addObj(obj: IObj):IObj;
    delObj(obj_id:number):boolean;
    //Topos
    getVertices(obj_type?:EObjType):IVertex[];
    getEdges(obj_type?:EObjType):IEdge[];
    getWires(obj_type?:EObjType):IWire[];
    getFaces(obj_type?:EObjType):IFace[];
    getShells(obj_type?:EObjType):IShell[];
    //Counters
    numPoints():number;
    numTopos(attrib_type:ETopoType):number;
    numObjs(obj_type:EObjType):number;
    //Attribs
    getAttribs(topo_type:ETopoType):IAttrib[];
    getAttrib(name:string, topo_type:ETopoType):IAttrib;
    addAttrib(name:string, topo_type:ETopoType, data_type:EDataType):IAttrib;
    delAttrib(name:string, topo_type:ETopoType):boolean;
    //Colls
    getColls():IColl[];
    getColl(name:string):IColl;
    addColl(name:string):IColl;
    delColl(name:string):boolean;
    //Clean up nulls and unused points
    purgePoints():number;
    purgeNulls():number;
    //Runs some check
    validateModel():boolean;
}
//Geom superclass
export interface IGeometry  {
    
}
//interfaces for points, that seem to exist somewhere between objs and topos
export interface IPoint extends IGeometry {
    getPath():IPath;
    getPosition():number[];
    setPosition(xyz:number[]):number[];
    getAttribNames():string[];
    setAttribValue(name:string, value:any):any;
    getAttribValue(name:string):any;
    getVertices():IVertex[];
}
//interfaces for geometric objs
export interface IObj extends IGeometry {
    getID():number;
    getVertices():IVertex[];
    getEdges():IEdge[];
    getWires():IWire[];
    getFaces():IFace[];
    getShells():IShell[];
    getType():EObjType;
    isPolyline():boolean;
    isPolymesh():boolean;
}
export interface IPolyline  extends IObj {
}
export interface IPolymesh extends IObj {
}
//interfaces for topological topos
export interface ITopo {
    getObj():IObj;
    getID():number;
    getAttribNames():string[];
    setAttribValue(name:string, value:any):any;
    getAttribValue(name:string):any;
    getColls():string[];
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
    getShell():IShell;
}
export interface IFace extends ITopo {
    getVertices():IVertex[];
    getEdges(): IEdge[];
    neighbours():IFace[];
    getShell():IShell;
}
export interface IShell extends ITopo {
    getWires(): IWire[];
    getFaces(): IFace[];
}
// interfcae for attribs
export interface IAttrib {
    getName():string;
    setName(name:string):string;
    getAttribType():ETopoType;
    getDataType():EDataType;
    //Attrib Values
    getValue(path:IPath):any;
    setValue(path:IPath, value:any):any;
    length():number;
}
//interface for coll
export interface IColl {
    getName():string;
    setName(name:string):string;
    //Parent/child colls
    getParentColls():IColl[];
    getChildColls():IColl[];
    addChildColl(coll:IColl):boolean;
    removeChildColl(coll:IColl):boolean;
    //Objs in this coll
    getEntitieIDs(obj_type?:EObjType):number[];
    addObj(obj_id:number):boolean;
    addObjs(obj_ids:number[]):boolean;
    removeObj(obj_id:number):boolean;
    removeObjs(obj_ids:number[]):boolean;
    //Properties for this coll (key-value pairs)
    getPropeties():IDict;
}
