import * as ifaces from "../utils/model_interfaces";
// ========================= CLASSES =========================
export class Position implements ifaces.IPosition {
    xyz: number[];
    constructor(xyz:number[]) {
        this.xyz = xyz;
    }
    public equal(p: ifaces.IPosition): boolean {
        if (this.xyz[0] != p.xyz[0]) {
            return false;
        } else if (this.xyz[1] != p.xyz[1]) {
            return false;
        } else if (this.xyz[2] != p.xyz[2]) {
            return false;
        }
        return true;
    }
}
//model class
export class Model implements ifaces.IModel{
    public geometryData:any[];
    public attributesData:ifaces.IAttributeDict = {};
    public collectionsData:ifaces.ICollectionDict = {};
    constructor() {
        let data:ifaces.IModelData = {
        "metadata": {
            "filetype":"mobius",
            "version": 0.1,
            "crs": {"epsg":3857},
            "location": "+0-0" 
        },
        "geometry":[],
        "attributes":[
            {
                "name":"position",
                "attribute_type":"points",
                "data_type":"number[]",
                "map": [],
                "values":[]
            }
        }
        this.geometryData = data.geometry;
        this.attributesData = {"position": data.attributes[0]};
    }
    // Set data for the model
    public setData(data:ifaces.IModelData):void {
        this.geometryData = data.geometry;
        for (let attribute of data.attributes) {
            this.attributesData[attribute.name] = attribute;
        }
        for (let collection of data.collections) {
            this.collectionsData[collection.name] = collection;
        }
    }
    //Creation
    public createPoint(xyz:number[]):ifaces.IPoint {
        let point:Point = new Point(this, this.numPoints());
        let value_index:number = this.addAttributeValue("position", xyz);
        this.attributesData["position"].map.push(value_index);
        return point;
    }
    public createPolyline(wire_points:ifaces.IPoint[]):ifaces.IEntity {
        console.log("not implemented");
        return null;
    }
    public createPolymesh(wire_points:ifaces.IPoint[], face_points:ifaces.IFace[]):ifaces.IEntity {
        console.log("not implemented");
        return null;
    }
    //Points
    public getPointIDs(num_vertices?:number):number[] { //This is confusing?
        console.log("not implemented");
        return [];
    }
    public getPoint(point_id:number):ifaces.IPoint {
        return new Point(this, point_id);
    }
    public addPoint(point:ifaces.IPoint):boolean {
        console.log("not implemented");
        return false;
    }
    public deletePoint(point_id:number):boolean {
        console.log("not implemented");
        return false;
    }
    public deletePoints(point_ids:number[]):boolean {
        console.log("not implemented");
        return false;
    }
    public numPoints():number {
        return this.attributesData["position"].map.length;
    }
    //Entities
    public getEntitieIDs(entity_type?:ifaces.EEntityType):number[] {
        console.log("not implemented");
        return [];
    }
    public getEntities(entity_type?:ifaces.EEntityType):ifaces.IEntity[] {
        console.log("not implemented");
        return [];
    }
    public getEntity(entity_id:number):ifaces.IEntity {
        console.log("not implemented");
        return null;
    }
    public addEntity(entity: ifaces.IEntity):boolean{
        console.log("not implemented");
        return false;
    } 
    public deleteEntity(entity_id:number):boolean{
        //for this method, must use 'delete' operator, do not use 'splice', 'shift', 'pop'
        //https://bytearcher.com/articles/how-to-delete-value-from-array/
        return this.data.geometry[entity_id];
    }
    public deleteEntities(entity_ids:number[]):boolean {
        console.log("not implemented");
        return false;
    }
    //Components
    public getVertices(entity_type?:ifaces.EEntityType):ifaces.IVertex[] {
        console.log("not implemented");
        return null;
    }
    public getEdges(entity_type?:ifaces.EEntityType):ifaces.IEdge[] {
        console.log("not implemented");
        return null;
    }
    public getWires(entity_type?:ifaces.EEntityType):ifaces.IWire[] {
        console.log("not implemented");
        return null;
    }
    public getFaces(entity_type?:ifaces.EEntityType):ifaces.IFace[] {
        console.log("not implemented");
        return null;
    }
    public getShells(entity_type?:ifaces.EEntityType):ifaces.IShell[] {
        console.log("not implemented");
        return null;
    }
    //Attributes
    public getAttributes(component_type?:ifaces.EAttributeType):ifaces.IAttribute[] {
        console.log("not implemented");
        return [];
    }
    public getAttribute(name:string):ifaces.IAttribute {
        let i:number;
        for (i=0, i < this.data.attributes.length; i++) {
            let att:ifaces.IAttributeData = this.data.attributes[i];
            if (att.name == name) {
                return new Attribute(this, i);
            }
        }
        return null;  //TODO throw exception
    }
    public addAttribute(name:string, component:ifaces.EAttributeType, type:ifaces.EDataType):ifaces.IAttribute{
        console.log("not implemented");
        return null;
    }
    public deleteAttribute(attribute:ifaces.IAttribute):boolean {
        console.log("not implemented");
        //for this method, must use 'delete' operator, do not use 'splice', 'shift', 'pop'
        //https://bytearcher.com/articles/how-to-delete-value-from-array/
        //delete this.data.attributes[attribute_id];
        return false;
    }
    public addAttributeValue(name:string, value:any) {
        let attribute_data:ifaces.IAttributeData = this.attributesData[name];
        let pos:number = attribute_data.values.indexOf(value); //TODO: this does not work  in javascript
        if (pos >= 0) {
            return pos;
        }
        attribute_data.values.push(value);
        return attribute_data.values.length - 1;
    }
    //Collections
    public getCollections(collection_type?:ifaces.ECollectionType):ifaces.ICollection[] {
        console.log("not implemented");
        return [];
    }
    public getCollection(name:string):ifaces.ICollection {
        console.log("not implemented");
        return null;
    }
    public addCollection(name:string):ifaces.ICollection {
        console.log("not implemented");
        return null;
    }
    public deleteCollection(collection:ifaces.ICollection):boolean {
        console.log("not implemented");
        //for this method, must use 'delete' operator, do not use 'splice', 'shift', 'pop'
        //https://bytearcher.com/articles/how-to-delete-value-from-array/
        //delete this.data.collections[collection_id];
        return false;
    }
    //Clean up nulls and unused points
    public purgePoints():number {
        console.log("not implemented");
        return -1;
    }
    public purgeNulls():number {
        console.log("not implemented");
        return -1;
    }
    //Runs some checks
    public validateModel():boolean {
        console.log("not implemented");
        return false;
    }
}
// component class
export class Component implements ifaces.IComponent{
    private model:ifaces.IModel;
    private entity_id:number;
    private component_path:ifaces.IComponentPath;
    constructor(model:ifaces.IModel, component_path:ifaces.IComponentPath) {
        this.model = model;
        this.component_path = component_path;
    }
    public getID():number {
        console.log("not implemented");
        return this.entity_id;
    }
    public getEntity():ifaces.IEntity {
        console.log("not implemented");
        return null;
    }
    public getPath():ifaces.IComponentPath {
        console.log("not implemented");
        return null;
    }
    public getAttributes():string[] {
        console.log("not implemented");
        return null;
    }
    public setAttributeValue(name:string, value:any):any {
        console.log("not implemented");
        return null;
    }
    public getAttributeValue(name:string):any {
        console.log("not implemented");
        return null;
    }
    public getCollections():string[] {
        console.log("not implemented");
        return [];
    }
}
// vertex class 
export class Vertex extends Component implements ifaces.IVertex {
    public getPoint():ifaces.IPoint {
        console.log("not implemented");
        return null;
    }
    public next():ifaces.IVertex {
        console.log("not implemented");
        return null;
    }
    public previous():ifaces.IVertex {
        console.log("not implemented");
        return null;
    }
}
// edge class 
export class Edge extends Component implements ifaces.IEdge {
    public getVertices():ifaces.IVertex[] {
        console.log("not implemented");
        return null;
    }
    public next():ifaces.IEdge {
        console.log("not implemented");
        return null;
    }
    public previous():ifaces.IEdge {
        console.log("not implemented");
        return null;
    }
}
// wire class 
export class Wire extends Component implements ifaces.IWire {
    public getVertices():ifaces.IVertex[] {
        console.log("not implemented");
        return null;
    }
    public getEdges():ifaces.IEdge[] {
        console.log("not implemented");
        return null;
    }
}
// face class 
export class Face extends Component implements ifaces.IFace {
    public getVertices():ifaces.IVertex[] {
        console.log("not implemented");
        return null;
    }
    public getEdges():ifaces.IEdge[] {
        console.log("not implemented");
        return null;
    }
}
// shell class 
export class Shell extends Component implements ifaces.IShell {
    public getWires():ifaces.IWire[] {
        console.log("not implemented");
        return null;
    }
    public getFaces():ifaces.IFace[] {
        console.log("not implemented");
        return null;
    }
}
// point class
export class Point implements ifaces.IPoint{
    private model:ifaces.IModel;
    private point_id: number;
    constructor(model:ifaces.IModel, point_id: number) {
        this.model = model;
        this.point_id = point_id;
    }
    public getID():number {
        console.log("not implemented");
        return this.point_id;
    }
    public setPosition(xyz:number[]):number[] {
        let old_xyz:number[] = this.getPosition();
        let value_index:number = this.model.addAttributeValue("position", xyz);
        this.model.attributesData["position"].map[this.point_id] = value_index;
        return old_xyz;
    }
    public getPosition():number[] {
        let value_index:number = this.model.attributesData["position"].map[this.point_id] as number;
        let xyz:number[] = this.model.attributesData["position"].values[value_index];
        return xyz;
    }
    public getAttributes():string[] {
        console.log("not implemented");
        return null;
    }
    public setAttributeValue(name:string, value:any):any {
        console.log("not implemented");
        return null;
    }
    public getAttributeValue(name:string):any {
        console.log("not implemented");
        return null;
    }
}
// entity class
export class Entity implements ifaces.IEntity{
    private model:ifaces.IModel;
    private entity_id:number;
    constructor(model:ifaces.IModel, entity_id:number) {
        this.model = model;
        this.entity_id = entity_id; 
    }
    public getID():number {
        console.log("not implemented");
        return this.entity_id;
    }
    public getVertices():ifaces.IVertex[] {
        console.log("not implemented");
        return [];
    }
    public getEdges():ifaces.IEdge[] {
        console.log("not implemented");
        return [];
    }
    public getWires():ifaces.IWire[] {
        console.log("not implemented");
        return [];
    }
    public getFaces():ifaces.IFace[] {
        console.log("not implemented");
        return [];
    }
    public getShells():ifaces.IShell[] {
        console.log("not implemented");
        return [];
    }
    public getType():ifaces.EEntityType {
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
export class Polyline  extends Entity implements ifaces.IPolyline{} 
export class Polymesh extends Entity implements ifaces.IPolymesh{} 
export class Attribute implements ifaces.IAttribute {
    private model:ifaces.IModel;
    private attribute_id:number;
    constructor(model:ifaces.IModel, attribute_id:number) {
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
    public getAttributeType():ifaces.EAttributeType {
        console.log("not implemented");
        return null;
    }
    public getDataType():ifaces.EDataType {
        console.log("not implemented");
        return null;
    }
}
export class Collection implements ifaces.ICollection {
    private model:ifaces.IModel;
    private collection_id:number;
    constructor(model:ifaces.IModel, collection_id:number) {
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
    public getParentCollections():ifaces.ICollection[] {
        console.log("not implemented");
        return [];
    }
    public getChildCollections():ifaces.ICollection[] {
        console.log("not implemented");
        return [];
    }
    public addChildCollection(entity:ifaces.ICollection):boolean {
        console.log("not implemented");
        return false;
    }
    public removeChildCollection(entity:ifaces.ICollection):boolean {
        console.log("not implemented");
        return false;
    }
    //Entities
    public getEntitieIDs(entity_type?:ifaces.EEntityType):number[] {
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
    public addProperty(property:ifaces.IProperty):boolean {
        console.log("not implemented");
        return false;
    }
    public deleteProperty(property:ifaces.IProperty):boolean {
        console.log("not implemented");
        return false;
    }
    public getPropeties():ifaces.IProperty[] {
        console.log("not implemented");
        return [];
    }
    //Type
    public getCollectionType():ifaces.ECollectionType {
        console.log("not implemented");
        return null;
    }
}

