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
    nurbs_curve = 120,
    bezier_curve = 121,
    polymesh = 200,
    nurbs_surface = 220,
    bezier_surface = 221,
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
    geometry?: any[];
    attribs?: IAttribData[];
    groups?: IGroupData[];
    skins?: ISkinData[];
}
// ========================= INTERFACES for classes =========================
export interface IDict { //used for group properties
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
export interface IGroupsDict {
    [key: string] : IGroup;
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
    getTopos(topo_type:ETopoType, obj_type?:EObjType):ITopo[];
    getTopo(topo_path:IPath):ITopo;
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
    getGroups():string[];
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
// interface for path to a single topo in an attrib array
export interface IPath {
    id:number;  //obj_id or point_id number
    topo_type:ETopoType; //shells, faces, wires, points
    topo_num:number;
    topo_subtype: ETopoType; //ETopoType.vertices | ETopoType.edges; //edges, vertices
    topo_subnum:number;
    getType():ETopoType;
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
//interface for group
export interface IGroup {
    getName():string;
    setName(name:string):string;
    //Parent/child groups
    getParentGroup():IGroup;
    getChildGroups():IGroup[];
    setParentGroup(group:IGroup):boolean;
    removeParentGroup(group:IGroup):boolean;
    //Objs in this group
    getEntitieIDs(obj_type?:EObjType):number[];
    addObj(obj_id:number):boolean;
    addObjs(obj_ids:number[]):boolean;
    removeObj(obj_id:number):boolean;
    removeObjs(obj_ids:number[]):boolean;
    //Properties for this group (key-value pairs)
    getPropeties():IDict;
}
