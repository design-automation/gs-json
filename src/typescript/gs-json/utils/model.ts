// ========================= ENUMS =========================
enum EComponentType {
    points = "points",
    vertices = "vertices",
    edges = "edges",
    wires = "wires",
    faces = "faces",
    shells = "shells"
}
enum EDataType {
    type_string = "string",
    type_number = "number",
    type_boolean = "boolean",
    type_string_array = "string[]",
    type_number_array = "number[]",
    type_boolean_array = "boolean[]"
}
enum EEntityType {
    polyline = 100,
    polymesh = 200
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
    component: "points" | "vertices" | "edges" | "wires" | "faces" | "shells"; //enum not working
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
    data:IgsData;
    //Entities
    getEntities(entity_type?:EEntityType):IEntity[];
    getEntity(id:number):IEntity;
    addEntity(entity: IEntity):boolean; //TODO how to create this new geometric entity
    deleteEntity(index:number):boolean;
    //Attributes
    getAttributes(component_type?:EComponentType):IAttribute[];
    getAttribute(name:string):IAttribute;
    addAttribute(name:string, component:EComponentType, type:EDataType):boolean;
    deleteAttribute(name:string):boolean;
    //Collections
    getCollections():ICollection[];
    getCollection(name:string):ICollection;
    addCollection(name:string):boolean;
    deleteCollection(name:string):boolean;
    //Clean up nulls and unused points
    purgePoints():number;
    purgeNulls():number;
}
//interfaces for topological components
export interface IComponent {
    getEntity():IEntity;
    getID():number;
    setAttribValue(name:string, value:any):any;
    getAttribValue(name:string):any;
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
    getComponentType():EComponentType;
    getDataType():EDataType;
}
//interface for collection
export interface ICollection {
    getID():number;
    getName():string;
    setName(name:string):string;
    //Collections
    getParentCollections():ICollection[];
    getChildCollections():ICollection[];
    addChildCollection(entity:ICollection):boolean;
    removeChildCollection(entity:ICollection):boolean;
    //Entities
    getEntities(entity_type?:EEntityType):IEntity[];
    addEntity(entity:IEntity):boolean;
    removeEntity(entity:IEntity):boolean;
    //Properties
    addProperty(name:string):boolean;
    deleteProperty(name:string):boolean;
    getPropetieNames():string[];
    getPropertyValue(name:string):any;
    setPropertyValue(name:string, value:any):any;
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
    //Entities
    getEntities(entity_type?:EEntityType):IEntity[] {
        console.log("not implemented");
        return [];
    }
    getEntity(entity_id:number):IEntity {
        console.log("not implemented");
        return null;
    }
    addEntity(entity: IEntity):boolean{
        console.log("not implemented");
        return false;
    } 
    deleteEntity(entity_id:number):boolean{
        //for this method, must use 'delete' operator, do not use 'splice', 'shift', 'pop'
        //https://bytearcher.com/articles/how-to-delete-value-from-array/
        return this.data.geometry[entity_id];
    }
    //Attributes
    getAttributes(component_type?:EComponentType):IAttribute[]{
        console.log("not implemented");
        return [];
    }
    getAttribute(name:string):IAttribute{
        console.log("not implemented");
        return null;
    }
    addAttribute(name:string, component:EComponentType, type:EDataType):boolean{
        console.log("not implemented");
        return false;
    }
    deleteAttribute(name:string):boolean{
        console.log("not implemented");
        //for this method, must use 'delete' operator, do not use 'splice', 'shift', 'pop'
        //https://bytearcher.com/articles/how-to-delete-value-from-array/
        //delete this.data.attributes[attribute_id];
        return false;
    }
    //Collections
    getCollections():ICollection[]{
        console.log("not implemented");
        return [];
    }
    getCollection(name:string):ICollection{
        console.log("not implemented");
        return null;
    }
    addCollection(name:string):boolean{
        console.log("not implemented");
        return false;
    }
    deleteCollection(name:string):boolean{
        console.log("not implemented");
        //for this method, must use 'delete' operator, do not use 'splice', 'shift', 'pop'
        //https://bytearcher.com/articles/how-to-delete-value-from-array/
        //delete this.data.collections[collection_id];
        return false;
    }
    //Clean up nulls and unused points
    purgePoints():number{
        console.log("not implemented");
        return -1;
    }
    purgeNulls():number{
        console.log("not implemented");
        return -1;
    }
}
// component class
export class Component implements IComponent{
    private data:IgsData;
    private entity_id:number;
    private component_path:IComponentPath;
    constructor(data: IgsData, component_path:IComponentPath) {
        this.data = data;
        this.component_path = component_path;
    }
    public getID():number {
        console.log("not implemented");
        return this.entity_id;
    }
    public getEntity():IEntity {
        console.log("getEntity not implemented");
        return null
    }
    public setAttribValue(name:string, value:any):any {
        console.log("setAttribValue not implemented");
        return null;
    }
    public getAttribValue(name:string):any {
        console.log("getAttribValue not implemented");
        return null;
    }
    public getCollections():ICollection[] {
        console.log("getCollections not implemented");
        return [];
    }
}
// vertex class 
export class Vertex extends Component implements IVertex {
    public getPoint():IPoint {
        console.log("getPoint not implemented");
        return null;
    }
    public next():IVertex {
        console.log("next not implemented");
        return null;
    }
    public previous():IVertex {
        console.log("previous not implemented");
        return null;
    }
}
// edge class 
export class Edge extends Component implements IEdge {
    public getVertices():IVertex[] {
        console.log("getVertices not implemented");
        return null;
    }
    public next():IEdge {
        console.log("next not implemented");
        return null;
    }
    public previous():IEdge {
        console.log("previous not implemented");
        return null;
    }
}
// wire class 
export class Wire extends Component implements IWire {
    public getVertices():IVertex[] {
        console.log("getVertices not implemented");
        return null;
    }
    public getEdges():IEdge[] {
        console.log("getEdges not implemented");
        return null;
    }
}
// face class 
export class Face extends Component implements IFace {
    public getVertices():IVertex[] {
        console.log("getVertices not implemented");
        return null;
    }
    public getEdges():IEdge[] {
        console.log("getEdges not implemented");
        return null;
    }
}
// shell class 
export class Shell extends Component implements IShell {
    public getWires():IWire[] {
        console.log("getWires not implemented");
        return null;
    }
    public getFaces():IFace[] {
        console.log("getFaces not implemented");
        return null;
    }
}
// point class
export class Point implements IPoint{
    private data:IgsData;
    private point_id: number;
    constructor(data:IgsData,point_id: number) {
        this.data = data;
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
    private data:IgsData;
    private entity_id:number;
    constructor(data:IgsData, entity_id:number) {
        this.data = data;
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
export class Polyline  extends Entity implements IPolyline{} // TODO Constructor to make new Polyline
export class Polymesh extends Entity implements IPolymesh{} //TODO Constructor to make new Polymesh
export class Attribute implements IAttribute {
    private data:IgsData;
    private attribute_id:number;
    constructor(data:IgsData, attribute_id:number) {
        this.data = data;
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
    public getComponentType():EComponentType {
        console.log("not implemented");
        return null;
    }
    public getDataType():EDataType {
        console.log("not implemented");
        return null;
    }
}
export class Collection implements ICollection {
    private data:IgsData;
    private collection_id:number;
    constructor(data:IgsData, collection_id:number) {
        this.data = data;
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
    public getEntities(entity_type?:EEntityType):IEntity[] {
        console.log("not implemented");
        return [];
    }
    public addEntity(entity:IEntity):boolean {
        console.log("not implemented");
        return false;
    }
    public removeEntity(entity:IEntity):boolean {
        console.log("not implemented");
        return false;
    }
    //Properties
    public addProperty(name:string):boolean {
        console.log("not implemented");
        return false;
    }
    public deleteProperty(name:string):boolean {
        console.log("not implemented");
        return false;
    }
    public getPropetieNames():string[] {
        console.log("not implemented");
        return [];
    }
    public getPropertyValue(name:string):any {
        console.log("not implemented");
        return null;
    }
    public setPropertyValue(name:string, value:any):any {
        console.log("not implemented");
        return null;
    }
}
