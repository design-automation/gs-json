import * as ifs from "../utils/model_interfaces";
// ========================= Utility functions =========================
//utility functions for number arrays
export function arraysEqual(array1: number[], array2: number[]): boolean {
        if (array1.length != array2.length) {
            return false;
        }
        let i:number;
        for (i=0;i<array1.length;i++) {
            if (array1[i] != array2[i]) {
                return false;
            }
        }
        return true;
    }
}
export function indexOfArray(array1:number[], array2: number[][]):number {
    let i:number;
    for (i=0;i<array2.length;i++) { //can use forEach
        if (array1 != array2[i]) {
            return i;
        }
    }
    return -1;
}

// ========================= CLASSES =========================
//path to some attribute for a component in the geometry
export class Path implements ifs.IPath {
    id:number; //entity or point
    component_type:ifs.EComponentType; //shells, faces, wires, points
    component_number:number;
    subcomponent_type:ifs.EComponentType; //edges, vertices
    subcomponent_number:number;
    constructor(id:number,
            component_type?:ifs.EComponentType, component_number?:number,
            subcomponent_type?:ifs.EComponentType, subcomponent_number?:number) {
        this.id = id;
        this.component_type = component_type;
        this.component_number = component_number;
        this.subcomponent_type = subcomponent_type;
        this.subcomponent_number = subcomponent_number;
    }
    public getType():ifs.EComponentType {
        if (this.subcomponent_type) {
            return this.subcomponent_type;
        } else {
            return this.component_type;
        }
    }
}
//model class
export class Model implements ifs.IModel{
    private metadata:ifs.IMetadata;
    private geometry_data:any[];
    private attribute_types_dict:ifs.IAttributeTypesDict;
    private collections_dict:ifs.ICollectionsDict;
    constructor() {
        //create default metadata
        this.metadata = {
            filetype: "mobius",
            version:  0.1,
            crs:      {"epsg":3857},
            location: "+0-0" 
        }
        //create an empty geometry array
        this.geometry_data = [];
        //create one attribute, called "position"
        this.attribute_types_dict = {
            points:   {},
            vertices: {},
            edges:    {},
            wires:    {},
            faces:    {},
            shells:   {}
        }
        this.attribute_types_dict.points = {
            "position": {
                "name":"position",
                "component_type":"points",
                "data_type":"number[]",
                "map": [],
                "values":[]
            }
        };
        this.collections_dict = {};
    }
    // Set data for the model
    public setData(data:ifs.IModelData):void {
        this.geometry_data = data.geometry;
        for (let attribute of data.attributes) {
            this.attribute_types_dict[attribute.component_type][attribute.name] = attribute;           
        }
        for (let collection of data.collections) {
            this.attribute_types_dict[collection.name] = collection;
        }
    }
    //Creation
    public createPoint(xyz:number[]):ifs.IPoint {
        let point:Point = new Point(this);
        point.setPosition(xyz);
        return point;
    }
    public createPolyline(wire_points:ifs.IPoint[]):ifs.IEntity {
        console.log("not implemented");
        return null;
    }
    public createPolymesh(wire_points:ifs.IPoint[], face_points:ifs.IFace[]):ifs.IEntity {
        console.log("not implemented");
        return null;
    }
    //Points
    public getPoint(point_id:number):ifs.IPoint {
        return new Point(this, point_id);
    }
    public addPoint(point:ifs.IPoint):ifs.IPoint {
        console.log("not implemented");
        return null;
    }
    public deletePoint(point_id:number):boolean {
        console.log("not implemented");
        return null;
        //also delete anythin that uses this point
    }
    public deletePoints(point_ids:number[]):boolean {
        console.log("not implemented");
        return null;
    }
    public numPoints():number {
        return this.attribute_types_dict[ifs.EComponentType.points]["position"].map.length;
    }
    //Entities
    public getEntitieIDs(entity_type?:ifs.EEntityType):number[] {
        console.log("not implemented");
        return [];
    }
    public getEntities(entity_type?:ifs.EEntityType):ifs.IEntity[] {
        console.log("not implemented");
        return [];
    }
    public getEntity(entity_id:number):ifs.IEntity {
        console.log("not implemented");
        return null;
    }
    public addEntity(entity: ifs.IEntity):ifs.IEntity{
        console.log("not implemented");
        return null;
    } 
    public deleteEntity(entity_id:number):boolean{
        return delete this.geometry_data[entity_id];
    }
    //Components
    public getVertices(entity_type?:ifs.EEntityType):ifs.IVertex[] {
        console.log("not implemented");
        return null;
    }
    public getEdges(entity_type?:ifs.EEntityType):ifs.IEdge[] {
        console.log("not implemented");
        return null;
    }
    public getWires(entity_type?:ifs.EEntityType):ifs.IWire[] {
        console.log("not implemented");
        return null;
    }
    public getFaces(entity_type?:ifs.EEntityType):ifs.IFace[] {
        console.log("not implemented");
        return null;
    }
    public getShells(entity_type?:ifs.EEntityType):ifs.IShell[] {
        console.log("not implemented");
        return null;
    }
    //Attributes
    public getAttributes(component_type:ifs.EComponentType):ifs.IAttribute[] {
        let attributes_array:ifs.IAttribute[] = [];
        let attribute_data:ifs.IAttributeData;
        let attribute_name:string;
        for(attribute_name in this.attribute_types_dict[component_type]) {
            let attribute_data:ifs.IAttributeData = this.attribute_types_dict[component_type][attribute_name];
            attributes_array.push(
                new Attribute(this, attribute_name, component_type, ifs.EComponentType[attribute_data.data_type])
            );
        }
        return attributes_array;
    }
    public getAttribute(name:string, component_type?:ifs.EComponentType):ifs.IAttribute {
        let attribute_data:ifs.IAttributeData = this.attribute_types_dict[component_type][name];
        return new Attribute(this, attribute_data.name, component_type, ifs.EComponentType[attribute_data.data_type]); 
    }
    public addAttribute(name:string, component:ifs.EComponentType, type:ifs.EDataType):ifs.IAttribute{
        console.log("not implemented");
        return null;
    }
    public deleteAttribute(name:string, component_type:ifs.EComponentType):boolean {
        console.log("not implemented");
        //for this method, must use 'delete' operator, do not use 'splice', 'shift', 'pop'
        //https://bytearcher.com/articles/how-to-delete-value-from-array/
        //delete this.data.attributes[attribute_id];
        return false;
    }
    //Attribute Values
    private _getAttributeValueIndex(name:string, path:ifs.IPath):number {
        let attribute_map:any[] = this.attribute_types_dict[path.getType()][name].map;
        //points attributes
        if (path.component_type == ifs.EComponentType.points) {
            return attribute_map[path.id] as number;
        }
        //vertices, edges, attributes 
        if (path.subcomponent_type) { // vertices or edges
            return attribute_map[path.id][path.component_number][path.subcomponent_number] as number;
        } 
        //wires, faces, shells attributes
        if (path.component_type){ //wires or faces
            return attribute_map[path.id][path.component_number] as number;
        } 
    }
    public getAttributeValue(name:string, path:ifs.IPath):any {
        let value_index:number = this._getAttributeValueIndex(name, path);
        return this.attribute_types_dict[path.getType()][name].values[value_index];
    }
    public setAttributeValue(name:string, path:ifs.IPath, value:any):any {
        //TODO: this implememtation is not correct
        //At the moment it is overwrting values, which might still be used elsewhere
        //Instead the value must be added to the values list
        //Then the map needs to be changed to point to the new value



        let value_index:number = this._getAttributeValueIndex(name, path);
        let old_value:any = this.attribute_types_dict[path.getType()][name].values[value_index];
        this.attribute_types_dict[path.getType()][name].values[value_index] = value; // This is not correct
        return old_value;
    }
    public addAttributeValue(name:string, path:ifs.IPath):void {
        let attribute_map:any[] = this.attribute_types_dict[path.getType()][name].map;
                                
        //points attributes
        if (path.component_type == ifs.EComponentType.points) {
            attribute_map.push(0);
        }
        //vertices, edges, attributes 
        else if (path.subcomponent_type) {
            attribute_map[path.id][path.component_number][path.subcomponent_number].push(0);
        } 
        //wires, faces, shells attributes
        else if (path.component_type){
            attribute_map[path.id][path.component_number].push(0);
        }
    }
    //Collections
    public getCollections():ifs.ICollection[] {
        console.log("not implemented");
        return [];
    }
    public getCollection(name:string):ifs.ICollection {
        console.log("not implemented");
        return null;
    }
    public addCollection(name:string):ifs.ICollection {
        console.log("not implemented");
        return null;
    }
    public deleteCollection(name:string):boolean {
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
export class Component implements ifs.IComponent{
    private model:ifs.IModel;
    private path:ifs.IPath;
    constructor(model:ifs.IModel, path:ifs.IPath) {
        this.model = model;
        this.path = path;
    }
    public getID():number {
        return this.path.id;
    }
    public getEntity():ifs.IEntity {
        console.log("not implemented");
        return null;
    }
    public getPath():ifs.IPath {
        return this.path;
    }
    public getAttributes():ifs.IAttribute[] {
        return this.model.getAttributes(this.path.getType());
    }
    public getAttributeNames():string[] {
        let names:string[] = [];
        let attribute:ifs.IAttribute;
        for(attribute of this.model.getAttributes(this.path.getType())) {
            names.push(attribute.getName());
        }
        return names;
    }
    public setAttributeValue(name:string, value:any):any {
        return this.model.setAttributeValue(name, this.path, value);
    }
    public getAttributeValue(name:string):any {
        return this.model.getAttributeValue(name, this.path);
    }
    public getCollections():string[] {
        console.log("not implemented");
        return [];
    }
}
// vertex class 
export class Vertex extends Component implements ifs.IVertex {
    public getPoint():ifs.IPoint {
        console.log("not implemented");
        return null;
    }
    public next():ifs.IVertex {
        console.log("not implemented");
        return null;
    }
    public previous():ifs.IVertex {
        console.log("not implemented");
        return null;
    }
    public getEdge():ifs.IEdge {
        console.log("not implemented");
        return null;
    }
}
// edge class 
export class Edge extends Component implements ifs.IEdge {
    public getVertices():ifs.IVertex[] {
        console.log("not implemented");
        return null;
    }
    public next():ifs.IEdge {
        console.log("not implemented");
        return null;
    }
    public previous():ifs.IEdge {
        console.log("not implemented");
        return null;
    }
    public getParent():ifs.IWire|ifs.IFace {
        console.log("not implemented");
        return null;
    }
}
// wire class 
export class Wire extends Component implements ifs.IWire {
    public getVertices():ifs.IVertex[] {
        console.log("not implemented");
        return null;
    }
    public getEdges():ifs.IEdge[] {
        console.log("not implemented");
        return null;
    }
    public getShell():ifs.IShell {
        console.log("not implemented");
        return null;
    }
}
// face class 
export class Face extends Component implements ifs.IFace {
    public getVertices():ifs.IVertex[] {
        console.log("not implemented");
        return null;
    }
    public getEdges():ifs.IEdge[] {
        console.log("not implemented");
        return null;
    }
    public neighbours():ifs.IFace[] {
        console.log("not implemented");
        return null;
    }
    public getShell():ifs.IShell {
        console.log("not implemented");
        return null;
    }
}
// shell class 
export class Shell extends Component implements ifs.IShell {
    public getWires():ifs.IWire[] {
        console.log("not implemented");
        return null;
    }
    public getFaces():ifs.IFace[] {
        console.log("not implemented");
        return null;
    }
}
// point class
export class Point implements ifs.IPoint{
    private model:ifs.IModel;
    private point_id: number;
    constructor(model:ifs.IModel, point_id?: number) {
        this.model = model;
        if (point_id) {
            this.point_id = point_id;
        } else {
            //make the point number equal to the list length
            this.point_id = model.numPoints();
            //add one more item to all point attributes
            let attribute:ifs.IAttribute;
            let path:ifs.IPath = new Path(this.point_id, ifs.EComponentType.points);
            for(attribute of this.model.getAttributes(ifs.EComponentType.points)) {
                this.model.addAttributeValue(attribute.getName(), path);
            }
        }
    }
    public getID():number {
        return this.point_id;
    }
    public setPosition(xyz:number[]):number[] {
        return this.setAttributeValue("position", xyz);
    }
    public getPosition():number[] {
        return this.getAttributeValue("position");
    }
    public getAttributes():ifs.IAttribute[] {
        return this.model.getAttributes(ifs.EComponentType.points);
    }
    public getAttributeNames():string[] {
        let names:string[] = [];
        let attribute:ifs.IAttribute;
        for(attribute of this.model.getAttributes(ifs.EComponentType.points)) {
            names.push(attribute.getName());
        }
        return names;
    }
    public setAttributeValue(name:string, value:any):any {
        let path:ifs.IPath = new Path(this.point_id, ifs.EComponentType.points);
        return this.model.setAttributeValue(name, path, value);
    }
    public getAttributeValue(name:string):any {
        let path:ifs.IPath = new Path(this.point_id, ifs.EComponentType.points);
        return this.model.getAttributeValue(name, path);
    }
    public getVertices():ifs.IVertex[] {
        console.log("not implemented");
        return null;
    }
}
// entity class
export class Entity implements ifs.IEntity{
    private model:ifs.IModel;
    private entity_id:number;
    constructor(model:ifs.IModel, entity_id:number) {
        this.model = model;
        this.entity_id = entity_id; 
    }
    public getID():number {
        console.log("not implemented");
        return this.entity_id;
    }
    public getVertices():ifs.IVertex[] {
        console.log("not implemented");
        return [];
    }
    public getEdges():ifs.IEdge[] {
        console.log("not implemented");
        return [];
    }
    public getWires():ifs.IWire[] {
        console.log("not implemented");
        return [];
    }
    public getFaces():ifs.IFace[] {
        console.log("not implemented");
        return [];
    }
    public getShells():ifs.IShell[] {
        console.log("not implemented");
        return [];
    }
    public getType():ifs.EEntityType {
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
export class Polyline  extends Entity implements ifs.IPolyline{} 
export class Polymesh extends Entity implements ifs.IPolymesh{} 


// Attribute class
export class Attribute implements ifs.IAttribute {
    private model:ifs.IModel;
    private name:string;
    private component_type:ifs.EComponentType;
    private data_type:ifs.EDataType;
    constructor(model:ifs.IModel, name:string, component_type:ifs.EComponentType, data_type:ifs.EDataType) {
        this.model = model;
        this.name = name;
        this.component_type = component_type;
        this.data_type = data_type;
    }
    public getName():string {
        return this.name;
    }
    public setName(name:string):string {
        let old_name:string = this.name;
        this.name = name;
        return old_name;
    }
    public getComponentType():ifs.EComponentType {
        return this.component_type;
    }
    public getDataType():ifs.EDataType {
        return this.data_type;
    }
}
//Collections class
export class Collection implements ifs.ICollection {
    private model:ifs.IModel;
    private name:string;
    constructor(model:ifs.IModel, name:string) {
        this.model = model;
        this.name = name;
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
    public getParentCollections():ifs.ICollection[] {
        console.log("not implemented");
        return [];
    }
    public getChildCollections():ifs.ICollection[] {
        console.log("not implemented");
        return [];
    }
    public addChildCollection(entity:ifs.ICollection):boolean {
        console.log("not implemented");
        return false;
    }
    public removeChildCollection(entity:ifs.ICollection):boolean {
        console.log("not implemented");
        return false;
    }
    //Entities
    public getEntitieIDs(entity_type?:ifs.EEntityType):number[] {
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
    public getPropeties():ifs.IDict[] {
        console.log("not implemented");
        return [];
    }
}

