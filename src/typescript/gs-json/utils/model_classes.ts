import * as ifs from "../utils/model_interfaces";
// ========================= Utility functions =========================
//utility functions for number arrays
export function arraysEqual(array1: number[], array2: number[]): boolean {
    if (array1.length != array2.length) {
        return false;
    }
    for (let i:number=0;i<array1.length;i++) {
        if (array1[i] != array2[i]) {
            return false;
        }
    }
    return true;
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
//path to some attrib for a topo in the geometry
export class Path implements ifs.IPath {
    id:number; //obj or point
    topo_type:ifs.ETopoType; //shells, faces, wires, points
    topo_number:number;
    subtopo_type:ifs.ETopoType; //edges, vertices
    subtopo_number:number;
    constructor(id:number,
            topo_type?:ifs.ETopoType, topo_number?:number,
            subtopo_type?:ifs.ETopoType, subtopo_number?:number) {
        this.id = id;
        this.topo_type = topo_type;
        this.topo_number = topo_number;
        this.subtopo_type = subtopo_type;
        this.subtopo_number = subtopo_number;
    }
    public getType():ifs.ETopoType {
        if (this.subtopo_type) {
            return this.subtopo_type;
        } else {
            return this.topo_type;
        }
    }
}
//model class
export class Model implements ifs.IModel{
    private metadata:ifs.IMetadata;
    private geometry_data:any[];
    private attrib_types_dict:ifs.IAttribTypesDict;
    private colls_dict:ifs.ICollsDict;
    constructor() {
        //create default metadata
        this.metadata = {filetype: "mobius", version:  0.1, crs:{"epsg":3857}, location: "+0-0"}
        //create an empty geometry array
        this.geometry_data = [];
        //create one attrib, called "position"
        this.attrib_types_dict = {points:{}, vertices:{}, edges:{}, wires:{}, faces:{}, shells:{}}
        this.attrib_types_dict.points = {
            position: new Attrib(this, "position", ifs.ETopoType.points, ifs.EDataType.type_number_array)
        }
        //create empty colls dict
        this.colls_dict = {};
    }
    // Set data for the model
    public setData(data:ifs.IModelData):void {
        this.geometry_data = data.geometry;
        for (let attrib_data of data.attribs) {
            let topo_type:ifs.ETopoType = ifs.ETopoType[attrib_data.topo_type];
            let data_type:ifs.EDataType = ifs.ETopoType[attrib_data.data_type];
            let attrib:Attrib = new Attrib(this, attrib_data.name, topo_type, data_type);
            this.attrib_types_dict[attrib_data.topo_type][attrib_data.name] = attrib;           
        }
        for (let coll of data.colls) {
            this.attrib_types_dict[coll.name] = null; //TODO
        }
    }
    //Creation
    public createPoint(xyz:number[]):ifs.IPoint {
        let point:Point = new Point(this);
        point.setPosition(xyz);
        return point;
    }
    public createPolyline(wire_points:ifs.IPoint[]):ifs.IObj {
        console.log("not implemented");
        return null;
    }
    public createPolymesh(wire_points:ifs.IPoint[], face_points:ifs.IFace[]):ifs.IObj {
        console.log("not implemented");
        return null;
    }
    //Points
    public getPoint(point_id:number):ifs.IPoint {
        return new Point(this, new Path(point_id, ifs.ETopoType.points));
    }
    public addPoint(point:ifs.IPoint):ifs.IPoint {
        console.log("not implemented");
        return null;
    }
    public delPoint(point_id:number):boolean {
        console.log("not implemented");
        return null;
        //also del anythin that uses this point
    }
    public delPoints(point_ids:number[]):boolean {
        console.log("not implemented");
        return null;
    }
    //Objs
    public getObjIDs(obj_type?:ifs.EObjType):number[] {
        console.log("not implemented");
        return [];
    }
    public getObjs(obj_type?:ifs.EObjType):ifs.IObj[] {
        console.log("not implemented");
        return [];
    }
    public getObj(obj_id:number):ifs.IObj {
        console.log("not implemented");
        return null;
    }
    public addObj(obj: ifs.IObj):ifs.IObj{
        console.log("not implemented");
        return null;
    } 
    public delObj(obj_id:number):boolean{
        return delete this.geometry_data[obj_id];
    }
    //Topo components
    public getVertices(obj_type?:ifs.EObjType):ifs.IVertex[] {
        console.log("not implemented");
        return null;
    }
    public getEdges(obj_type?:ifs.EObjType):ifs.IEdge[] {
        console.log("not implemented");
        return null;
    }
    public getWires(obj_type?:ifs.EObjType):ifs.IWire[] {
        console.log("not implemented");
        return null;
    }
    public getFaces(obj_type?:ifs.EObjType):ifs.IFace[] {
        console.log("not implemented");
        return null;
    }
    public getShells(obj_type?:ifs.EObjType):ifs.IShell[] {
        console.log("not implemented");
        return null;
    }
    //counters
    public numPoints():number {
        return this.attrib_types_dict[ifs.ETopoType.points]["position"].length();
    }
    public numTopos(attrib_type:ifs.ETopoType):number {
        console.log("not implemented");
        return null;
    }
    public numObjs(obj_type:ifs.EObjType):number {
        console.log("not implemented");
        return null;
    }
    //Attribs
    public getAttribs(attrib_type:ifs.ETopoType):ifs.IAttrib[] {
        let attrib_dict:ifs.IAttribDict =  this.attrib_types_dict[attrib_type];
        return Object.keys(attrib_dict).map(key=>attrib_dict[key]);
    }
    public getAttrib(name:string, attrib_type?:ifs.ETopoType):ifs.IAttrib {
        return this.attrib_types_dict[attrib_type][name];
    }
    public addAttrib(name:string, attrib_type:ifs.ETopoType, data_type:ifs.EDataType):ifs.IAttrib{
        let attrib:Attrib = new Attrib(this, name, attrib_type, data_type);
        this.attrib_types_dict[attrib_type][name] = attrib;
        return attrib;
    }
    public delAttrib(name:string, attrib_type:ifs.ETopoType):boolean {
        return delete this.attrib_types_dict[attrib_type][name];
    }
    //Colls
    public getColls():ifs.IColl[] {
        console.log("not implemented");
        return [];
    }
    public getColl(name:string):ifs.IColl {
        console.log("not implemented");
        return null;
    }
    public addColl(name:string):ifs.IColl {
        console.log("not implemented");
        return null;
    }
    public delColl(name:string):boolean {
        console.log("not implemented");
        //for this method, must use 'del' operator, do not use 'splice', 'shift', 'pop'
        //https://bytearcher.com/articles/how-to-del-value-from-array/
        //del this.data.colls[coll_id];
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
// point class
export class Point implements ifs.IPoint{
    private model:ifs.IModel;
    private path: ifs.IPath;
    constructor(model:ifs.IModel, path?: ifs.IPath) {
        this.model = model;
        if (path) {
            this.path = path;
        } else {
            //make the point id equal to the list length
            this.path = new Path(model.numPoints(), ifs.ETopoType.points);
            //add one more item to all point attribs
            for(let attrib of this.model.getAttribs(ifs.ETopoType.points)) {
                attrib.setValue(this.path, null);
            }
        }
    }
    public getPath():ifs.IPath {
        return this.path;
    }
    public setPosition(xyz:number[]):number[] {
        return this.setAttribValue("position", xyz);
    }
    public getPosition():number[] {
        return this.getAttribValue("position");
    }
    public getAttribNames():string[] {
        return this.model.getAttribs(ifs.ETopoType.points).map(attrib=>attrib.getName());
    }
    public setAttribValue(name:string, value:any):any {
        return this.model.getAttrib(name, ifs.ETopoType.points).setValue(this.path, value);
    }
    public getAttribValue(name:string):any {
        return this.model.getAttrib(name, ifs.ETopoType.points).getValue(this.path);
    }
    public getVertices():ifs.IVertex[] {
        console.log("not implemented");
        return null;
    }
}
// obj class
export class Obj implements ifs.IObj{
    private model:ifs.IModel;
    private obj_id:number;
    constructor(model:ifs.IModel, obj_id:number) {
        this.model = model;
        this.obj_id = obj_id; 
    }
    public getID():number {
        console.log("not implemented");
        return this.obj_id;
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
    public getType():ifs.EObjType {
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
export class Polyline  extends Obj implements ifs.IPolyline{} 
export class Polymesh extends Obj implements ifs.IPolymesh{} 
// topo class
export class Topo implements ifs.ITopo{
    private model:ifs.IModel;
    private path:ifs.IPath;
    constructor(model:ifs.IModel, path:ifs.IPath) {
        this.model = model;
        this.path = path;
    }
    public getID():number {
        return this.path.id;
    }
    public getObj():ifs.IObj {
        return new Obj(this.model, this.path.id);
    }
    public getPath():ifs.IPath {
        return this.path;
    }
    public getAttribNames():string[] {
        return this.model.getAttribs(this.path.topo_type).map(attrib=>attrib.getName());
    }
    public setAttribValue(name:string, value:any):any {;
        return this.model.getAttrib(name, this.path.topo_type).setValue(this.path, value);
    }
    public getAttribValue(name:string):any {
        return this.model.getAttrib(name, this.path.topo_type).getValue(this.path);
    }
    public getColls():string[] {
        console.log("not implemented");
        return [];
    }
}
// vertex class 
export class Vertex extends Topo implements ifs.IVertex {
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
export class Edge extends Topo implements ifs.IEdge {
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
    public neighbours():ifs.IEdge[] {
        console.log("not implemented");
        return null;
    }
    public getParent():ifs.IWire|ifs.IFace {
        console.log("not implemented");
        return null;
    }
}
// wire class 
export class Wire extends Topo implements ifs.IWire {
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
export class Face extends Topo implements ifs.IFace {
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
export class Shell extends Topo implements ifs.IShell {
    public getWires():ifs.IWire[] {
        console.log("not implemented");
        return null;
    }
    public getFaces():ifs.IFace[] {
        console.log("not implemented");
        return null;
    }
}

// Attrib class
export class Attrib implements ifs.IAttrib {
    private model:ifs.IModel;
    private name:string;
    private attrib_type:ifs.ETopoType;
    private data_type:ifs.EDataType;
    private values_map:any[];
    private values:any[];
    constructor(model:ifs.IModel, name:string, attrib_type:ifs.ETopoType, data_type:ifs.EDataType, values_map?:any[], values?:any[]) {
        this.model = model;
        this.name = name;
        this.attrib_type = attrib_type;
        this.data_type = data_type;
        if (values_map) {
            this.values_map = values_map;
        } else {
            this.values_map = [];
            //TODO initiaize array, everything points to null
            //Array.from({ length: 5 }, (v,i) => 0);
        }
        if (values) {
            this.values = values;
        } else {
            this.values = [null];
        }
    }
    public getName():string {
        return this.name;
    }
    public setName(name:string):string {
        let old_name:string = this.name;
        this.name = name;
        return old_name;
    }
    public getAttribType():ifs.ETopoType {
        return this.attrib_type;
    }
    public getDataType():ifs.EDataType {
        return this.data_type;
    }
    //Attrib Values
    public getValue(path:ifs.IPath):any {
        return this.values[this._getValueIndex(path)];
    }
    public setValue(path:ifs.IPath, value:any):any {
        //TODO: this implememtation is not correct
        //At the moment it is overwrting values, which might still be used elsewhere
        //Instead the value must be added to the values list
        //Then the map needs to be changed to point to the new value



        // let value_index:number = this._getValueIndex(path);

        // let old_value:any = this.attrib_types_dict[path.getType()][name].values[value_index];
        // this.attrib_types_dict[path.getType()][name].values[value_index] = value; // This is not correct
        // return old_value;
        return null;
    }
    public length():number  {
        return this.values_map.length;
    }
    //Private methods
    private _getValueIndex(path:ifs.IPath):number {
        //points attribs
        if (path.topo_type == ifs.ETopoType.points) {
            return this.values_map[path.id] as number;
        }
        //vertices, edges, attribs 
        if (path.subtopo_type) { // vertices or edges
            return this.values_map[path.id][path.topo_number][path.subtopo_number] as number;
        } 
        //wires, faces, shells attribs
        if (path.topo_type){ //wires or faces
            return this.values_map[path.id][path.topo_number] as number;
        } 
    }
    private _addValue(path:ifs.IPath):void {
        //points attribs
        if (path.topo_type == ifs.ETopoType.points) {
            this.values_map.push(0);
        }
        //vertices, edges, attribs 
        else if (path.subtopo_type) {
            this.values_map[path.id][path.topo_number][path.subtopo_number].push(0);
        } 
        //wires, faces, shells attribs
        else if (path.topo_type){
            this.values_map[path.id][path.topo_number].push(0);
        }
    }
}
//Colls class
export class Coll implements ifs.IColl {
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
    //Colls
    public getParentColls():ifs.IColl[] {
        console.log("not implemented");
        return [];
    }
    public getChildColls():ifs.IColl[] {
        console.log("not implemented");
        return [];
    }
    public addChildColl(obj:ifs.IColl):boolean {
        console.log("not implemented");
        return false;
    }
    public removeChildColl(obj:ifs.IColl):boolean {
        console.log("not implemented");
        return false;
    }
    //Objs
    public getEntitieIDs(obj_type?:ifs.EObjType):number[] {
        console.log("not implemented");
        return [];
    }
    public addObj(obj_id:number):boolean {
        console.log("not implemented");
        return false;
    }
    public addObjs(obj_ids:number[]):boolean {
        console.log("not implemented");
        return false;
    }
    public removeObj(obj_id:number):boolean {
        console.log("not implemented");
        return false;
    }
    public removeObjs(obj_ids:number[]):boolean {
        console.log("not implemented");
        return false;
    }
    //Properties
    public getPropeties():ifs.IDict[] {
        console.log("not implemented");
        return [];
    }
}

