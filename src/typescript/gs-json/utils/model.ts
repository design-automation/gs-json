// ========================= ENUMS =========================
enum EAttributeType {
    points,   // = "points",
    vertices, // = "vertices",
    edges,    // = "edges",
    wires,    // = "wires",
    faces,    // = "faces",
    shells,   // = "shells"
}
enum EDataType {
    type_string,        // = "string",
    type_number,        // = "number",
    type_boolean,       // = "boolean",
    type_string_array,  // = "string[]",
    type_number_array,  // = "number[]",
    type_boolean_array, // = "boolean[]"
}
enum EEntityType {
    polyline = 100,
    polymesh = 200
}
enum ECollectionType {  //not too sure about this enum
    root,
    leaf
}
// ========================= INTERFACES for gsJSON data =========================
export interface IgsMetadata {
    filetype: "mobius";
    version: number;
    crs: any;
    location: string;
}
export interface IgsAttributeData {
    name: string;
    attribute_type: "points" | "vertices" | "edges" | "wires" | "faces" | "shells"; //enum not working
    data_type: "string"|"number"|"boolean"|"string[]"|"number[]"|"boolean[]"; //enum not working
    values: any[];
    map: (number|number[]|number[][])[];
}
export interface IgsCollectionData {
    name: string;
    entities?: any[];
    collections?: string[];
    properties?: { key: string, value: any };
}
export interface IgsSkinData {
    images: string[];
    textures: string[];
    materials: any[];
}
export interface IgsData {
    metadata: IgsMetadata;
    geometry?: any[];
    attributes?: IgsAttributeData[];
    collections?: IgsCollectionData[];
    skins?: IgsSkinData[];
}
// ========================= INTERFACES for classes =========================
// interface for main model
export interface IgsModel {
    //Creation
    createPoint(xyz:number[]):IPoint;
    createPolyline(wire_points:IPoint[]):IEntity;
    createPolymesh(wire_points:IPoint[], face_points:IFace[]):IEntity;
    //Points
    getPointIDs(num_vertices?:number):number[];
    getPoint(point_id:number):IPoint;
    addPoint(point:IPoint):boolean;
    deletePoint(point_id:number):boolean;
    deletePoints(point_ids:number[]):boolean;
    //Entities
    getEntitieIDs(entity_type?:EEntityType):number[];
    getEntity(entity_id:number):IEntity;
    addEntity(entity: IEntity):boolean;
    deleteEntity(entity_id:number):boolean;
    deleteEntities(entity_ids:number[]):boolean;
    //Components
    getVertices(entity_type?:EEntityType):IVertex[];
    getEdges(entity_type?:EEntityType):IEdge[];
    getWires(entity_type?:EEntityType):IWire[];
    getFaces(entity_type?:EEntityType):IFace[];
    getShells(entity_type?:EEntityType):IShell[];
    //Attributes
    getAttributes(attribute_type?:EAttributeType):IAttribute[];
    getAttribute(name:string):IAttribute;
    addAttribute(name:string, attribute_type:EAttributeType, data_type:EDataType):IAttribute;
    deleteAttribute(attribute:IAttribute):boolean;
    //Collections
    getCollections(collection_type?:ECollectionType):ICollection[];
    getCollection(name:string):ICollection;
    addCollection(name:string):ICollection;
    deleteCollection(collection:ICollection):boolean;
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
    getPath():IComponentPath;
    getAttributes():IAttribute[];
    setAttributeValue(attribute:IAttribute | string, value:any):any;//TODO, name or attribute
    getAttributeValue(attribute:IAttribute | string):any;//TODO, name or attribute
    getCollections():ICollection[];
}
export interface IVertex extends IComponent {
    getPoint(): IPoint;
    next():IVertex;
    previous():IVertex;
}
export interface IEdge extends IComponent {
    getVertices(): IVertex[];
    next():IEdge;
    previous():IEdge;
}
export interface IWire extends IComponent {
    getVertices():IVertex[];
    getEdges(): IEdge[];
}
export interface IFace extends IComponent {
    getVertices():IVertex[];
    getEdges(): IEdge[];
}
export interface IShell extends IComponent {
    getWires(): IWire[];
    getFaces(): IFace[];
}
//interfaces for geometric entities
export interface IPoint {
    getID():number;
    getPosition():number[];
    setPosition(xyz:number[]):number[];
}
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
    getID():number;
    getName():string;
    setName(name:string):string;
    getAttributeType():EAttributeType;
    getDataType():EDataType;
}
//interface for property
export interface IProperty {
    getName():string;
    setName(name:string):string;
    getValue():any;
    setValue(value:any):any;
}
//interface for collection
export interface ICollection {
    getID():number;
    getName():string;
    setName(name:string):string;
    //Collections
    getParentCollections():ICollection[];
    getChildCollections():ICollection[];
    addChildCollection(collection:ICollection):boolean;
    removeChildCollection(collection:ICollection):boolean;
    //Entities
    getEntitieIDs(entity_type?:EEntityType):number[];
    addEntity(entity_id:number):boolean;
    addEntities(entity_ids:number[]):boolean;
    removeEntity(entity_id:number):boolean;
    removeEntities(entity_ids:number[]):boolean;
    //Properties
    addProperty(property:IProperty):boolean;
    deleteProperty(property:IProperty):boolean;
    getPropeties():IProperty[];
    //Type
    getCollectionType():ECollectionType;
}
// interface for component path
export interface IComponentPath {
    component_type:0|1; //wires or faces
    component_number:number; //wire or face number
    sub_component_number:number; //vertex or edge number
}
// ========================= CLASSES =========================
//model class
export class Model {
    private data:IgsData;
    constructor(data:IgsData) {
        this.data = data;
    }
    //Creation
    public createPoint(x:number, y:number, z:number):IPoint {
        console.log("not implemented");
        return null;
    }
    public createPolyline(wire_points:IPoint[]):IEntity {
        console.log("not implemented");
        return null;
    }
    public createPolymesh(wire_points:IPoint[], face_points:IFace[]):IEntity {
        console.log("not implemented");
        return null;
    }
    //Points
    public getPoints():IPoint[] {
        console.log("not implemented");
        return [];
    }
    public getPoint(point_id:number):IPoint {
        console.log("not implemented");
        return null;
    }
    //Entities
    public getEntities(entity_type?:EEntityType):IEntity[] {
        console.log("not implemented");
        return [];
    }
    public getEntity(entity_id:number):IEntity {
        console.log("not implemented");
        return null;
    }
    public addEntity(entity: IEntity):boolean{
        console.log("not implemented");
        return false;
    } 
    public deleteEntity(entity_id:number):boolean{
        //for this method, must use 'delete' operator, do not use 'splice', 'shift', 'pop'
        //https://bytearcher.com/articles/how-to-delete-value-from-array/
        return this.data.geometry[entity_id];
    }
    //Attributes
    public getAttributes(component_type?:EAttributeType):IAttribute[]{
        console.log("not implemented");
        return [];
    }
    public getAttribute(name:string):IAttribute{
        console.log("not implemented");
        return null;
    }
    public addAttribute(name:string, component:EAttributeType, type:EDataType):boolean{
        console.log("not implemented");
        return false;
    }
    public deleteAttribute(name:string):boolean{
        console.log("not implemented");
        //for this method, must use 'delete' operator, do not use 'splice', 'shift', 'pop'
        //https://bytearcher.com/articles/how-to-delete-value-from-array/
        //delete this.data.attributes[attribute_id];
        return false;
    }
    //Collections
    public getCollections():ICollection[]{
        console.log("not implemented");
        return [];
    }
    public getCollection(name:string):ICollection{
        console.log("not implemented");
        return null;
    }
    public addCollection(name:string):boolean{
        console.log("not implemented");
        return false;
    }
    public deleteCollection(name:string):boolean{
        console.log("not implemented");
        //for this method, must use 'delete' operator, do not use 'splice', 'shift', 'pop'
        //https://bytearcher.com/articles/how-to-delete-value-from-array/
        //delete this.data.collections[collection_id];
        return false;
    }
    //Clean up nulls and unused points
    public purgePoints():number{
        console.log("not implemented");
        return -1;
    }
    public purgeNulls():number{
        console.log("not implemented");
        return -1;
    }
}
// component class
export class Component implements IComponent{
    private model:IgsModel;
    private entity_id:number;
    private component_path:IComponentPath;
    constructor(model:IgsModel, component_path:IComponentPath) {
        this.model = model;
        this.component_path = component_path;
    }
    public getID():number {
        console.log("not implemented");
        return this.entity_id;
    }
    public getEntity():IEntity {
        console.log("not implemented");
        return null;
    }
    public getPath():IComponentPath {
        console.log("not implemented");
        return null;
    }
    public getAttributes():IAttribute[] {
        console.log("not implemented");
        return null;
    }
    public setAttributeValue(attribute:IAttribute | string, value:any):any {
        console.log("not implemented");
        return null;
    }
    public getAttributeValue(attribute :IAttribute | string):any {
        console.log("not implemented");
        return null;
    }
    public getCollections():ICollection[] {
        console.log("not implemented");
        return [];
    }
}
// vertex class 
export class Vertex extends Component implements IVertex {
    public getPoint():IPoint {
        console.log("not implemented");
        return null;
    }
    public next():IVertex {
        console.log("not implemented");
        return null;
    }
    public previous():IVertex {
        console.log("not implemented");
        return null;
    }
}
// edge class 
export class Edge extends Component implements IEdge {
    public getVertices():IVertex[] {
        console.log("not implemented");
        return null;
    }
    public next():IEdge {
        console.log("not implemented");
        return null;
    }
    public previous():IEdge {
        console.log("not implemented");
        return null;
    }
}
// wire class 
export class Wire extends Component implements IWire {
    public getVertices():IVertex[] {
        console.log("not implemented");
        return null;
    }
    public getEdges():IEdge[] {
        console.log("not implemented");
        return null;
    }
}
// face class 
export class Face extends Component implements IFace {
    public getVertices():IVertex[] {
        console.log("not implemented");
        return null;
    }
    public getEdges():IEdge[] {
        console.log("not implemented");
        return null;
    }
}
// shell class 
export class Shell extends Component implements IShell {
    public getWires():IWire[] {
        console.log("not implemented");
        return null;
    }
    public getFaces():IFace[] {
        console.log("not implemented");
        return null;
    }
}
// point class
export class Point implements IPoint{
    private model:IgsModel;
    private point_id: number;
    constructor(model:IgsModel,point_id: number) {
        this.model = model;
        this.point_id = point_id;
    }
    public getID():number {
        console.log("not implemented");
        return this.point_id;
    }
    public setPosition(xyz:number[]):number[] {
        console.log("not implemented");
        return [];
    }
    public getPosition():number[] {
        console.log("not implemented");
        return [];
    }
}
// entity class
export class Entity implements IEntity{
    private model:IgsModel;
    private entity_id:number;
    constructor(model:IgsModel, entity_id:number) {
        this.model = model;
        this.entity_id = entity_id; 
    }
    public getID():number {
        console.log("not implemented");
        return this.entity_id;
    }
    public getVertices():IVertex[] {
        console.log("not implemented");
        return [];
    }
    public getEdges():IEdge[] {
        console.log("not implemented");
        return [];
    }
    public getWires():IWire[] {
        console.log("not implemented");
        return [];
    }
    public getFaces():IFace[] {
        console.log("not implemented");
        return [];
    }
    public getShells():IShell[] {
        console.log("not implemented");
        return [];
    }
    public getType():EEntityType {
        console.log("not implemented");
        return null;
    }
    public isPolyline():boolean {
        console.log("not implemented");
        return false;
    }
    public isPolymesh():boolean {
        console.log("not implemented");
        return false;
    }
}
export class Polyline  extends Entity implements IPolyline{} 
export class Polymesh extends Entity implements IPolymesh{} 
export class Attribute implements IAttribute {
    private model:IgsModel;
    private attribute_id:number;
    constructor(model:IgsModel, attribute_id:number) {
        this.model = model;
        this.attribute_id = attribute_id; 
    }
    public getID():number {
        console.log("not implemented");
        return this.attribute_id;
    }
    public getName():string {
        console.log("not implemented");
        return null;
    }
    public setName(name:string):string {
        console.log("not implemented");
        return null;
    }
    public getAttributeType():EAttributeType {
        console.log("not implemented");
        return null;
    }
    public getDataType():EDataType {
        console.log("not implemented");
        return null;
    }
}
export class Collection implements ICollection {
    private model:IgsModel;
    private collection_id:number;
    constructor(model:IgsModel, collection_id:number) {
        this.model = model;
        this.collection_id = collection_id;
    }
    public getID():number {
        console.log("not implemented");
        return this.collection_id;
    }
    public getName():string {
        console.log("not implemented");
        return null;
    }
    public setName(name:string):string {
        console.log("not implemented");
        return null;
    }
    //Collections
    public getParentCollections():ICollection[] {
        console.log("not implemented");
        return [];
    }
    public getChildCollections():ICollection[] {
        console.log("not implemented");
        return [];
    }
    public addChildCollection(entity:ICollection):boolean {
        console.log("not implemented");
        return false;
    }
    public removeChildCollection(entity:ICollection):boolean {
        console.log("not implemented");
        return false;
    }
    //Entities
    public getEntitieIDs(entity_type?:EEntityType):number[] {
        console.log("not implemented");
        return [];
    }
    public addEntity(entity_id:number):boolean {
        console.log("not implemented");
        return false;
    }
    public addEntities(entity_ids:number[]):boolean {
        console.log("not implemented");
        return false;
    }
    public removeEntity(entity_id:number):boolean {
        console.log("not implemented");
        return false;
    }
    public removeEntities(entity_ids:number[]):boolean {
        console.log("not implemented");
        return false;
    }
    //Properties
    public addProperty(property:IProperty):boolean {
        console.log("not implemented");
        return false;
    }
    public deleteProperty(property:IProperty):boolean {
        console.log("not implemented");
        return false;
    }
    public getPropeties():IProperty[] {
        console.log("not implemented");
        return [];
    }
    //Type
    public getCollectionType():ECollectionType {
        console.log("not implemented");
        return null;
    }
}

