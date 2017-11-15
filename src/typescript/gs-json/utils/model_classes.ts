import * as ifs from "../utils/model_interfaces";
import {Arr} from "./arr_functions";

// ========================= CLASSES =========================
// Path to some attrib attached to a topo in the geometry
export class Path implements ifs.IPath {
    id:number; //obj or point
    topo_type:ifs.ETopoType; //shells, faces, wires, points
    topo_num:number;
    topo_subtype:ifs.ETopoType; //edges, vertices
    topo_subnum:number;
    constructor(id:number,
            topo_type?:ifs.ETopoType, topo_num?:number,
            topo_subtype?:ifs.ETopoType, topo_subnum?:number) {
        this.id = id;
        this.topo_type = topo_type;
        this.topo_num = topo_num;
        this.topo_subtype = topo_subtype;
        this.topo_subnum = topo_subnum;
    }
    public getType():ifs.ETopoType {
        if (this.topo_subtype) {
            return this.topo_subtype;
        } else {
            return this.topo_type;
        }
    }
}
//model class
export class Model implements ifs.IModel{
    private metadata:ifs.IMetadata;
    private geom:ifs.IGeom;
    private attrib_types_dict:ifs.IAttribTypesDict;
    private colls_dict:ifs.ICollsDict;
    constructor() {
        //create default metadata
        this.metadata = {filetype: "mobius", version:  0.1, crs:{"epsg":3857}, location: "+0-0"}
        //create an empty geometry array
        this.geom = new Geom(this);
        //create one attrib, called "position"
        this.attrib_types_dict = {points:{}, vertices:{}, edges:{}, wires:{}, faces:{}, shells:{}}
        this.attrib_types_dict.points = {
            position: new Attrib(this, "position", ifs.ETopoType.points, ifs.EDataType.type_num_arr)
        }
        //create empty colls dict
        this.colls_dict = {};
    }
    // Set data for the model
    public setData(data:ifs.IModelData):void {
        this.geom = new Geom(this, data.geometry);
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
        let point:Point = new Point(this.geom);
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
    //Geom
    public getGeom():ifs.IGeom {
        return this.geom;
    }
    //Attribs
    public getAttribs(topo_type:ifs.ETopoType):ifs.IAttrib[] {
        let attrib_dict:ifs.IAttribDict =  this.attrib_types_dict[topo_type];
        return Object.keys(attrib_dict).map(key=>attrib_dict[key]);
    }
    public getAttrib(name:string, topo_type?:ifs.ETopoType):ifs.IAttrib {
        return this.attrib_types_dict[topo_type][name];
    }
    public addAttrib(name:string, topo_type:ifs.ETopoType, data_type:ifs.EDataType):ifs.IAttrib {
        let attrib:Attrib = new Attrib(this, name, topo_type, data_type);
        this.attrib_types_dict[topo_type][name] = attrib;
        return attrib;
    }
    public delAttrib(name:string, topo_type:ifs.ETopoType):boolean {
        return delete this.attrib_types_dict[topo_type][name];
    }
    //Colls
    public getColls():ifs.IColl[] {
        return Object.keys(this.colls_dict).map(key=>this.colls_dict[key]);
    }
    public getColl(name:string):ifs.IColl {;
        return this.colls_dict[name];
    }
    public addColl(name:string):ifs.IColl {
        this.colls_dict[name] = new Coll(this, name);
        return this.colls_dict[name];
    }
    public delColl(name:string):boolean {
        return delete this.colls_dict[name];
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
// Geometry 
class Geom implements ifs.IGeom {
    private model:ifs.IModel;
    private geometry_data:any[];
    constructor(model:ifs.IModel, geometry_data?:any[]) {
        this.model = model;
        if (geometry_data) {
            this.geometry_data = geometry_data;
        } else {
            this.geometry_data = [];
        }
    }
    public getModel():ifs.IModel {
        return this.model;
    }
    //Points
    public getPointIDs(obj_type?:ifs.EObjType):number[] {
        let geom_filtered:any[] = this.geometry_data.filter((n)=>n!=undefined);
        if (obj_type) {
            geom_filtered = geom_filtered.filter((n)=>n[2][0]==obj_type);
        }
        return Arr.flatten(geom_filtered);
    }
    public getPoints(obj_type?:ifs.EObjType):ifs.IPoint[] {
        return this.getPointIDs(obj_type).map((v,i)=>this.getPoint(v));
    }
    public getPoint(point_id:number):ifs.IPoint {
        return new Point(this, new Path(point_id, ifs.ETopoType.points));
    }
    public delPoint(point_id:number):boolean {
        console.log("not implemented");
        return null;
        //this is actually a rather complex method
        //del anythin that uses this point
        //for the point attributes, we need to del the attribute in the values_map
        //this all has to be done very carefully so that our array pointers do not get out of sync
    }
    //Objs
    public getObjIDs(obj_type?:ifs.EObjType):number[] {
        let geom_filtered:any[] = this.geometry_data.filter((n)=>n!=undefined);
        if (obj_type) {
            geom_filtered = geom_filtered.filter((n)=>n[2][0]==obj_type);
        }
        return geom_filtered.map((v,i)=>i);
    }
    public getObjs(obj_type?:ifs.EObjType):ifs.IObj[] {
        return this.getObjIDs(obj_type).map((v,i)=>this.getObj(v));
    }
    public getObj(obj_id:number):ifs.IObj {
        let obj:ifs.IObj = new Obj(this, obj_id);
        switch (obj.getType()) {
            case ifs.EObjType.polyline:
                return obj as ifs.IPolyline
            case ifs.EObjType.polymesh:
                return obj as ifs.IPolymesh
        }
    }
    public delObj(obj_id:number):boolean{
        return delete this.geometry_data[obj_id];
    }
    //Topo components, get a list of paths point to specific topo components in teh geometry
    public getTopoPaths(topo_type:ifs.ETopoType, obj_type?:ifs.EObjType):ifs.IPath[] {
        let geom_filtered:any[] = this.geometry_data.filter((n)=>n!=undefined);
        if (obj_type) {
            geom_filtered = geom_filtered.filter((n)=>n[2][0]==obj_type);
        }
        let path_arr:ifs.IPath[] = [];
        switch (topo_type) {
            case ifs.ETopoType.vertices:
                for (let i=0;i<geom_filtered.length;i++) {
                    let wires_data:number[][] = geom_filtered[i][0];
                    
                    for (let j=0;j<wires_data.length;j++) {
                        let wire_data:number[] = geom_filtered[j];
                        for (let k=0;k<wire_data.length;k++) {
                            path_arr.push(new Path(i, ifs.ETopoType.wires, j, topo_type, k));
                        }
                    }
                    let faces_data:number[][] = geom_filtered[i][1];
                    for (let j=0;j<faces_data.length;j++) {
                        let face_data:number[] = geom_filtered[j];
                        for (let k=0;k<face_data.length;k++) {
                            path_arr.push(new Path(i, ifs.ETopoType.faces, j, topo_type, k));
                        }
                    }
                }
                break;
            case ifs.ETopoType.edges:
                for (let i=0;i<geom_filtered.length;i++) {
                    let wires_data:number[][] = geom_filtered[i][0];
                    
                    for (let j=0;j<wires_data.length;j++) {
                        let wire_data:number[] = geom_filtered[j];
                        for (let k=0;k<wire_data.length - 1;k++) {
                            path_arr.push(new Path(i, ifs.ETopoType.wires, j, topo_type, k));
                        }
                    }
                    let faces_data:number[][] = geom_filtered[i][1];
                    for (let j=0;j<faces_data.length;j++) {
                        let face_data:number[] = geom_filtered[j];
                        for (let k=0;k<face_data.length - 1;k++) {
                            path_arr.push(new Path(i, ifs.ETopoType.faces, j, topo_type, k));
                        }
                    }
                }
                break;
            case ifs.ETopoType.wires:
                for (let i=0;i<geom_filtered.length;i++) {
                    let wires_data:number[][] = geom_filtered[i][0];
                    for (let j=0;j<wires_data.length;j++) {
                        path_arr.push(new Path(i, topo_type, j));
                    }
                }
                break;
            case ifs.ETopoType.faces:
                for (let i=0;i<geom_filtered.length;i++) {
                    let faces_data:number[][] = geom_filtered[i][1];
                    for (let j=0;j<faces_data.length;j++) {
                        path_arr.push(new Path(i, topo_type, j));
                    }
                }
                break;
            case ifs.ETopoType.shells:
                geom_filtered = geom_filtered.filter((n)=>n[1].length > 0);
                for (let i=0;i<geom_filtered.length;i++) {
                    path_arr.push(new Path(i, topo_type));
                }
                break;
        }
        return path_arr;
    }
    //Template is an array full of zeros, but with the right structure for teh attribute data
    public getTopoTemplate(topo_type:ifs.ETopoType):any[] {
        switch (topo_type) {
            case ifs.ETopoType.vertices:
                return this.geometry_data.
                    map((v,i)=>[
                        [v[0].map((v2,i2)=>Arr.make(v2.length, 0))],
                        [v[1].map((v2,i2)=>Arr.make(v2.length, 0))]]);
            case ifs.ETopoType.edges:
                return this.geometry_data.
                    map((v,i)=>[
                        [v[0].map((v2,i2)=>Arr.make(v2.length-1, 0))],
                        [v[1].map((v2,i2)=>Arr.make(v2.length-1, 0))]]);
            case ifs.ETopoType.wires:
                return this.geometry_data.
                    map((v,i)=>
                        [v[0].map((v2,i2)=>Arr.make(v2.length, 0))]);
            case ifs.ETopoType.faces:
                return this.geometry_data.
                    map((v,i)=>
                        [v[1].map((v2,i2)=>Arr.make(v2.length, 0))]);
            case ifs.ETopoType.shells:
                console.log("not implemented"); //TODO
                return null;
        }
    }
    //Counters
    public numObjs(obj_type?:ifs.EObjType):number {
        return this.getObjIDs(obj_type).length;
    }
    public numPoints(obj_type?:ifs.EObjType):number {
        if (obj_type) {return this.getPointIDs(obj_type).length;} 
        return this.getModel().getAttrib("position", ifs.ETopoType.points).count();
    }
    public numTopos(topo_type:ifs.ETopoType):number {
        return this.getTopoPaths(topo_type).length; //TODO, may be faster to use template
    }
}
//Entity, superclass of points and objects
export class Entity {
    protected geom:ifs.IGeom;
    constructor(geom:ifs.IGeom) {
        this.geom = geom;
    }
    public getGeom():ifs.IGeom {
        return this.geom;
    }
    public getModel():ifs.IModel {
        return this.geom.getModel();
    }
}
// Point class
export class Point extends Entity implements ifs.IPoint{
    private path: ifs.IPath;
    constructor(geom:ifs.IGeom, path?: ifs.IPath) {
        super(geom);
        if (path) {
            this.path = path;
        } else {
            //make the point id equal to the list length
            this.path = new Path(geom.numPoints(), ifs.ETopoType.points);
            //add one more item to all point attribs
            for(let attrib of this.getModel().getAttribs(ifs.ETopoType.points)) {
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
        return this.getModel().getAttribs(ifs.ETopoType.points).map(attrib=>attrib.getName());
    }
    public setAttribValue(name:string, value:any):any {
        return this.getModel().getAttrib(name, ifs.ETopoType.points).setValue(this.path, value);
    }
    public getAttribValue(name:string):any {
        return this.getModel().getAttrib(name, ifs.ETopoType.points).getValue(this.path);
    }
    public getVertices():ifs.IVertex[] {
        console.log("not implemented");
        return null;
    }
}
// Obj class
export class Obj extends Entity implements ifs.IObj{
    private obj_id:number;
    constructor(geom:ifs.IGeom, obj_id:number) {
        super(geom);
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
    private geom:ifs.IGeom;
    private path:ifs.IPath;
    constructor(geom:ifs.IGeom, path:ifs.IPath) {
        this.geom = geom;
        this.path = path;
    }
    public getGeom():ifs.IGeom {
        return this.geom;
    }
    public getModel():ifs.IModel {
        return this.geom.getModel();
    }
    public getID():number {
        return this.path.id;
    }
    public getObj():ifs.IObj {
        return new Obj(this.geom, this.path.id);
    }
    public getPath():ifs.IPath {
        return this.path;
    }
    public getAttribNames():string[] {
        return this.getModel().getAttribs(this.path.topo_type).map(attrib=>attrib.getName());
    }
    public setAttribValue(name:string, value:any):any {;
        return this.getModel().getAttrib(name, this.path.topo_type).setValue(this.path, value);
    }
    public getAttribValue(name:string):any {
        return this.getModel().getAttrib(name, this.path.topo_type).getValue(this.path);
    }
    public getColls():string[] {
        console.log("not implemented");
        return [];
    }
}
// Vertex class 
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
// Edge class 
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
// Wire class 
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
// Face class 
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
// Shell class 
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
    private topo_type:ifs.ETopoType;
    private data_type:ifs.EDataType;
    private values_map:any[];
    private values:any[];
    constructor(model:ifs.IModel, name:string, topo_type:ifs.ETopoType, data_type:ifs.EDataType, values_map?:any[], values?:any[]) {
        this.model = model;
        this.name = name;
        this.topo_type = topo_type;
        this.data_type = data_type;
        if (values_map) {
            this.values_map = values_map;
        } else {
            if (this.topo_type == ifs.ETopoType.points) {
                this.values_map = Arr.make(this.model.getGeom().numPoints(), 0);
            } else {
                this.values_map = Arr.deepCopy(this.model.getGeom().getTopoTemplate(this.topo_type));
            }
        }
        if (values) {
            this.values = values;
        } else {
            this.values = [null];//first value is always null
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
    public getTopoType():ifs.ETopoType {
        return this.topo_type;
    }
    public getDataType():ifs.EDataType {
        return this.data_type;
    }
    //Attrib Values
    public getValue(path:ifs.IPath):any {
        let index:number;
        if (this.topo_type == ifs.ETopoType.points || this.topo_type == ifs.ETopoType.shells) {
            index = this.values_map[path.id] as number;
        } else if (this.topo_type == ifs.ETopoType.vertices || this.topo_type == ifs.ETopoType.edges) { 
            index = this.values_map[path.id][path.topo_num][path.topo_subnum] as number; 
        } else if (this.topo_type == ifs.ETopoType.wires || this.topo_type == ifs.ETopoType.faces){
            index = this.values_map[path.id][path.topo_num] as number;
        } 
        return this.values[index];
    }
    public setValue(path:ifs.IPath, value:any):any {
        let index:number = Arr.indexOf(value, this.values);
        if (index == -1) {
            index = this.values.push(value) - 1;
        }
        let old_value:any;
        if (this.topo_type == ifs.ETopoType.points || this.topo_type == ifs.ETopoType.shells) {
            old_value = this.values_map[path.id];
            this.values_map[path.id] = index;
        } else if (this.topo_type == ifs.ETopoType.vertices || this.topo_type == ifs.ETopoType.edges) { 
            old_value = this.values_map[path.id][path.topo_num][path.topo_subnum]
            this.values_map[path.id][path.topo_num][path.topo_subnum] = index;
        } else if (this.topo_type == ifs.ETopoType.wires || this.topo_type == ifs.ETopoType.faces){
            old_value = this.values_map[path.id][path.topo_num];
            this.values_map[path.id][path.topo_num] = index;
        }
        return old_value;
    }
    public count():number  {
        return this.values_map.length;
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

