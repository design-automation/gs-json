//model_interfaces
// ========================= ENUMS =========================
export enum EComponentType {
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
export enum EEntityType {
    polyline = 100,
    polymesh = 200
}
// ========================= INTERFACES for gsJSON data =========================
export interface IMetadata {
    filetype: "mobius";
    version: number;
    crs: any;
    location: string;
}
export interface IAttributeData {
    name: string;
    component_type: "points" | "vertices" | "edges" | "wires" | "faces" | "shells"; //enum not working
    data_type: "string"|"number"|"boolean"|"string[]"|"number[]"|"boolean[]"; //enum not working
    values: any[];
    map: (number|number[]|number[][])[];
}
export interface ICollectionData {
    name: string;
    entities?: any[];
    collections?: string[];
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
    attributes?: IAttributeData[];
    collections?: ICollectionData[];
    skins?: ISkinData[];
}
// ========================= INTERFACES for classes =========================
export interface IDict { //used for collection properties
    [key: string] : any;
}
export interface IAttributeDataDict {
    [key: string] : IAttributeData; //TODO Should be changed to IAttribute
}
export interface IAttributeTypesDict {
    points: IAttributeDataDict;
    vertices: IAttributeDataDict;
    edges: IAttributeDataDict;
    wires: IAttributeDataDict;
    faces: IAttributeDataDict;
    shells: IAttributeDataDict;
}
export interface ICollectionsDict {
    [key: string] : ICollectionData; //TODO should be changed to ICollection
}
// interface for path to a single component in an attribute array
export interface IPath {
    id:number;  //entity_id or point_id
    component_type:EComponentType; //shells, faces, wires
    component_number:number;
    subcomponent_type:EComponentType; //edges, vertices
    subcomponent_number:number;
    getType():EComponentType;
}
// interface for main model
export interface IModel {
    //Creation
    createPoint(xyz:number[]):IPoint;
    createPolyline(wire_points:IPoint[]):IEntity;
    createPolymesh(wire_points:IPoint[], face_points:IFace[]):IEntity;
    //Points
    getPoint(point_id:number):IPoint;
    addPoint(point:IPoint):IPoint;
    deletePoint(point_id:number):boolean;
    deletePoints(point_ids:number[]):boolean;
    numPoints():number;
    //Entities
    getEntitieIDs(entity_type?:EEntityType):number[];
    getEntity(entity_id:number):IEntity;
    addEntity(entity: IEntity):IEntity;
    deleteEntity(entity_id:number):boolean;
    //Components
    getVertices(entity_type?:EEntityType):IVertex[];
    getEdges(entity_type?:EEntityType):IEdge[];
    getWires(entity_type?:EEntityType):IWire[];
    getFaces(entity_type?:EEntityType):IFace[];
    getShells(entity_type?:EEntityType):IShell[];
    //Attributes
    getAttributes(component_type:EComponentType):IAttribute[];
    getAttribute(name:string, component_type:EComponentType):IAttribute;
    addAttribute(name:string, component_type:EComponentType, data_type:EDataType):IAttribute;
    deleteAttribute(name:string, component_type:EComponentType):boolean;
    //Attribute Values
    getAttributeValue(name:string, path:IPath):any;
    setAttributeValue(name:string, path:IPath, value:any):any;
    addAttributeValue(name:string, path:IPath):void;
    //Collections
    getCollections():ICollection[];
    getCollection(name:string):ICollection;
    addCollection(name:string):ICollection;
    deleteCollection(name:string):boolean;
    //Clean up nulls and unused points
    purgePoints():number;
    purgeNulls():number;
    //Runs some check
    validateModel():boolean;
}
//interfaces for topological components
export interface IComponent {
    getEntity():IEntity;
    getID():number;
    getAttributes():IAttribute[];
    getAttributeNames():string[];
    setAttributeValue(name:string, value:any):any;
    getAttributeValue(name:string):any;
    getCollections():string[];
}
export interface IVertex extends IComponent {
    getPoint(): IPoint;
    next():IVertex;
    previous():IVertex;
    getEdge():IEdge;
}
export interface IEdge extends IComponent {
    getVertices(): IVertex[];
    next():IEdge;
    previous():IEdge;
    getParent():IWire|IFace;
}
export interface IWire extends IComponent {
    getVertices():IVertex[];
    getEdges(): IEdge[];
    getShell():IShell;
}
export interface IFace extends IComponent {
    getVertices():IVertex[];
    getEdges(): IEdge[];
    neighbours():IFace[];
    getShell():IShell;
}
export interface IShell extends IComponent {
    getWires(): IWire[];
    getFaces(): IFace[];
}
//interfaces for points, that seem to exist somewhere between entities and components
export interface IPoint {
    getID():number;
    getPosition():number[];
    setPosition(xyz:number[]):number[];
    getAttributes():IAttribute[];
    getAttributeNames():string[];
    setAttributeValue(name:string, value:any):any;//TODO, name or attribute
    getAttributeValue(name:string):any;//TODO, name or attribute
    getVertices():IVertex[];
}
//interfaces for geometric entities
export interface IEntity {
    getID():number;
    getVertices():IVertex[];
    getEdges():IEdge[];
    getWires():IWire[];
    getFaces():IFace[];
    getShells():IShell[];
    getType():EEntityType;
    isPolyline():boolean;
    isPolymesh():boolean;
}
export interface IPolyline  extends IEntity {
}
export interface IPolymesh extends IEntity {
}
// interfcae for attributes
export interface IAttribute {
    getName():string;
    setName(name:string):string;
    getComponentType():EComponentType;
    getDataType():EDataType;
}
//interface for collection
export interface ICollection {
    getName():string;
    setName(name:string):string;
    //Parent/child collections
    getParentCollections():ICollection[];
    getChildCollections():ICollection[];
    addChildCollection(collection:ICollection):boolean;
    removeChildCollection(collection:ICollection):boolean;
    //Entities in this collection
    getEntitieIDs(entity_type?:EEntityType):number[];
    addEntity(entity_id:number):boolean;
    addEntities(entity_ids:number[]):boolean;
    removeEntity(entity_id:number):boolean;
    removeEntities(entity_ids:number[]):boolean;
    //Properties for this collection (key-value pairs)
    getPropeties():IDict;
}
