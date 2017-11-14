//model_interfaces
// ========================= ENUMS =========================
export enum ETopoType {
    points = "points", // this is not a topo, but we still need it in the enum
    vertices = "vertices",
    edges = "edges",
    wires = "wires",
    faces = "faces",
    shells = "shells"
}
export enum EDataType {
    type_str = "string",
    type_num = "number",
    type_bool = "boolean",
    type_str_arr = "string[]",
    type_num_arr = "number[]",
    type_bool_arr = "boolean[]"
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
    topo_num:number;
    topo_subtype:ETopoType; //edges, vertices
    topo_subnum:number;
    getType():ETopoType;
}
// interface for main model
export interface IModel {
    //Creation
    createPoint(xyz:number[]):IPoint;
    createPolyline(wire_points:IPoint[]):IObj;
    createPolymesh(wire_points:IPoint[], face_points:IFace[]):IObj;
    //Geometry
    getGeom():IGeom;
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
//Class to hold manipulate geometry arrays
export interface IGeom  {
    getModel():IModel;
    //Points
    getPointIDs(obj_type?:EObjType):number[];
    getPoints(obj_type?:EObjType):IPoint[];
    getPoint(point_id:number):IPoint;
    delPoint(point_id:number):boolean;
    //Objs
    getObjIDs(obj_type?:EObjType):number[];
    getObjs(obj_type?:EObjType):IObj[];
    getObj(obj_id:number):IObj;
    delObj(obj_id:number):boolean;
    //Topos
    getTopoPaths(topo_type:ETopoType, obj_type?:EObjType):IPath[];
    getTopoTemplate(topo_type:ETopoType):any[];
    //Counters
    numObjs(obj_type?:EObjType):number;
    numPoints(obj_type?:EObjType):number;
    numTopos(topo_type:ETopoType):number;
}
//Superclass for objects and points
export interface IEntity  {
    getGeom():IGeom;
    getModel():IModel;
}
//interfaces for points, that seem to exist somewhere between objs and topos
export interface IPoint extends IEntity {
    getPath():IPath;
    getPosition():number[];
    setPosition(xyz:number[]):number[];
    getAttribNames():string[];
    setAttribValue(name:string, value:any):any;
    getAttribValue(name:string):any;
    getVertices():IVertex[];
}
//interfaces for geometric objs
export interface IObj extends IEntity {
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
    getGeom():IGeom;
    getModel():IModel;
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
    getTopoType():ETopoType;
    getDataType():EDataType;
    //Attrib Values
    getValue(path:IPath):any;
    setValue(path:IPath, value:any):any;
    count():number;
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
