import * as model from "../utils/model_interfaces";
// ========================= CLASSES =========================
//model class
export class Model {
    private data:model.IgsData;
    constructor(data:model.IgsData) {
        this.data = data;
    }
    //Creation
    public createPoint(x:number, y:number, z:number):model.IPoint {
        console.log("not implemented");
        return null;
    }
    public createPolyline(wire_points:model.IPoint[]):model.IEntity {
        console.log("not implemented");
        return null;
    }
    public createPolymesh(wire_points:model.IPoint[], face_points:model.IFace[]):model.IEntity {
        console.log("not implemented");
        return null;
    }
    //Points
    public getPoints():model.IPoint[] {
        console.log("not implemented");
        return [];
    }
    public getPoint(point_id:number):model.IPoint {
        console.log("not implemented");
        return null;
    }
    //Entities
    public getEntities(entity_type?:model.EEntityType):model.IEntity[] {
        console.log("not implemented");
        return [];
    }
    public getEntity(entity_id:number):model.IEntity {
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
    public getAttributes(component_type?:model.EAttributeType):model.IAttribute[]{
        console.log("not implemented");
        return [];
    }
    public getAttribute(name:string):model.IAttribute{
        console.log("not implemented");
        return null;
    }
    public addAttribute(name:string, component:model.EAttributeType, type:model.EDataType):boolean{
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
    public getCollections():model.ICollection[]{
        console.log("not implemented");
        return [];
    }
    public getCollection(name:string):model.ICollection{
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
    private model:model.IgsModel;
    private entity_id:number;
    private component_path:model.IComponentPath;
    constructor(model:model.IgsModel, component_path:model.IComponentPath) {
        this.model = model;
        this.component_path = component_path;
    }
    public getID():number {
        console.log("not implemented");
        return this.entity_id;
    }
    public getEntity():model.IEntity {
        console.log("not implemented");
        return null;
    }
    public getPath():model.IComponentPath {
        console.log("not implemented");
        return null;
    }
    public getAttributes():model.IAttribute[] {
        console.log("not implemented");
        return null;
    }
    public setAttributeValue(attribute:model.IAttribute | string, value:any):any {
        console.log("not implemented");
        return null;
    }
    public getAttributeValue(attribute :model.IAttribute | string):any {
        console.log("not implemented");
        return null;
    }
    public getCollections():model.ICollection[] {
        console.log("not implemented");
        return [];
    }
}
// vertex class 
export class Vertex extends Component implements IVertex {
    public getPoint():model.IPoint {
        console.log("not implemented");
        return null;
    }
    public next():model.IVertex {
        console.log("not implemented");
        return null;
    }
    public previous():model.IVertex {
        console.log("not implemented");
        return null;
    }
}
// edge class 
export class Edge extends Component implements IEdge {
    public getVertices():model.IVertex[] {
        console.log("not implemented");
        return null;
    }
    public next():model.IEdge {
        console.log("not implemented");
        return null;
    }
    public previous():model.IEdge {
        console.log("not implemented");
        return null;
    }
}
// wire class 
export class Wire extends Component implements IWire {
    public getVertices():model.IVertex[] {
        console.log("not implemented");
        return null;
    }
    public getEdges():model.IEdge[] {
        console.log("not implemented");
        return null;
    }
}
// face class 
export class Face extends Component implements IFace {
    public getVertices():model.IVertex[] {
        console.log("not implemented");
        return null;
    }
    public getEdges():model.IEdge[] {
        console.log("not implemented");
        return null;
    }
}
// shell class 
export class Shell extends Component implements IShell {
    public getWires():model.IWire[] {
        console.log("not implemented");
        return null;
    }
    public getFaces():model.IFace[] {
        console.log("not implemented");
        return null;
    }
}
// point class
export class Point implements IPoint{
    private model:model.IgsModel;
    private point_id: number;
    constructor(model:model.IgsModel,point_id: number) {
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
    private model:model.IgsModel;
    private entity_id:number;
    constructor(model:model.IgsModel, entity_id:number) {
        this.model = model;
        this.entity_id = entity_id; 
    }
    public getID():number {
        console.log("not implemented");
        return this.entity_id;
    }
    public getVertices():model.IVertex[] {
        console.log("not implemented");
        return [];
    }
    public getEdges():model.IEdge[] {
        console.log("not implemented");
        return [];
    }
    public getWires():model.IWire[] {
        console.log("not implemented");
        return [];
    }
    public getFaces():model.IFace[] {
        console.log("not implemented");
        return [];
    }
    public getShells():model.IShell[] {
        console.log("not implemented");
        return [];
    }
    public getType():model.EEntityType {
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
    private model:model.IgsModel;
    private attribute_id:number;
    constructor(model:model.IgsModel, attribute_id:number) {
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
    public getAttributeType():model.EAttributeType {
        console.log("not implemented");
        return null;
    }
    public getDataType():model.EDataType {
        console.log("not implemented");
        return null;
    }
}
export class Collection implements ICollection {
    private model:model.IgsModel;
    private collection_id:number;
    constructor(model:model.IgsModel, collection_id:number) {
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
    public getParentCollections():model.ICollection[] {
        console.log("not implemented");
        return [];
    }
    public getChildCollections():model.ICollection[] {
        console.log("not implemented");
        return [];
    }
    public addChildCollection(entity:model.ICollection):boolean {
        console.log("not implemented");
        return false;
    }
    public removeChildCollection(entity:model.ICollection):boolean {
        console.log("not implemented");
        return false;
    }
    //Entities
    public getEntitieIDs(entity_type?:model.EEntityType):number[] {
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
    public addProperty(property:model.IProperty):boolean {
        console.log("not implemented");
        return false;
    }
    public deleteProperty(property:model.IProperty):boolean {
        console.log("not implemented");
        return false;
    }
    public getPropeties():model.IProperty[] {
        console.log("not implemented");
        return [];
    }
    //Type
    public getCollectionType():model.ECollectionType {
        console.log("not implemented");
        return null;
    }
}

