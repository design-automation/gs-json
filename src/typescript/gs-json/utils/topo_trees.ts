import {Arr} from "./arr";
import * as ifs from "./ifaces_gs";
import {TTreeData, TTree2Data, TTree3Data, IModelData, IAttribData, IGroupData, ISkinData} from "./ifaces_json";
import {EGeomType, EDataType, EObjType, mapGeomTypeToNumber} from "./enums";
import {Geom, GeomPath} from "./geom";
import {Point,Polyline,Polymesh} from "./entities";
import {Vertex, Edge, Wire, Face} from "./topos";
import {Attrib} from "./attribs";
/**
* Class for storing Topo in a tree data structure.
* This class is only used by the Group class. 
*/
export class TopoTree implements ifs.ITopoTree {
    private _model:ifs.IModel;
    //topo
    private _faces:ifs.ITreeBranch2;   
    private _wires:ifs.ITreeBranch2;
    //subtopo
    private _face_edges:ifs.ITreeBranch3;
    private _face_vertices:ifs.ITreeBranch3;    
    private _wire_edges:ifs.ITreeBranch3;
    private _wire_vertices:ifs.ITreeBranch3;
    //create tree
    constructor(model:ifs.IModel, data?:TTreeData) {
        this._model = model;
        if (data != undefined) {
            this.fromArray(data);
        } else {
            this._faces =         new TreeBranch2(); 
            this._wires =         new TreeBranch2();            
            this._face_edges =    new TreeBranch3();
            this._face_vertices = new TreeBranch3();                       
            this._wire_edges =    new TreeBranch3();
            this._wire_vertices = new TreeBranch3();
        }
    }
    public hasTopo(topo:ifs.ITopo): boolean {
        let path:ifs.IGeomPath = topo.getGeomPath();
        //subtopo
        if (path.tt == EGeomType.wires) {
            if (path.st == EGeomType.vertices) {
                return this._wire_vertices.has(path.id, path.ti, path.si);
            } else if (path.st == EGeomType.edges) {
                return this._wire_edges.has(path.id, path.ti, path.si);
            }
        } else {
            if (path.st == EGeomType.vertices) {
                return this._face_vertices.has(path.id, path.ti, path.si);
            } else if (path.st == EGeomType.edges) {
                return this._face_edges.has(path.id, path.ti, path.si);
            }
        }
        //topo
        if (path.tt == EGeomType.wires) {
            return this._wires.has(path.id, path.ti);
        } else {
            return this._faces.has(path.id, path.ti);
        }
    }
    public addTopo(topo:ifs.ITopo): void {
        let path:ifs.IGeomPath = topo.getGeomPath();
        //subtopo
        if (path.tt == EGeomType.wires) {
            if (path.st == EGeomType.vertices) {
                this._wire_vertices.add(path.id, path.ti, path.si);
            } else if (path.st == EGeomType.edges) {
                this._wire_edges.add(path.id, path.ti, path.si);
            }
        } else {
            if (path.st == EGeomType.vertices) {
                this._face_vertices.add(path.id, path.ti, path.si);
            } else if (path.st == EGeomType.edges) {
                this._face_edges.add(path.id, path.ti, path.si);
            }
        }
        //topo
        if (path.tt == EGeomType.wires) {
            return this._wires.add(path.id, path.ti);
        } else {
            return this._faces.add(path.id, path.ti);
        }
        
    }
    public removeTopo(topo:ifs.ITopo): boolean {
        let path:ifs.IGeomPath = topo.getGeomPath();
        //subtopo
        if (path.tt == EGeomType.wires) {
            if (path.st == EGeomType.vertices) {
                return this._wire_vertices.remove(path.id, path.ti, path.si);
            } else if (path.st == EGeomType.edges) {
                return this._wire_edges.remove(path.id, path.ti, path.si);
            }
        } else {
            if (path.st == EGeomType.vertices) {
                return this._face_vertices.remove(path.id, path.ti, path.si);
            } else if (path.st == EGeomType.edges) {
                return this._face_edges.remove(path.id, path.ti, path.si);
            }
        }
        //topo
        if (path.tt == EGeomType.wires) {
            return this._wires.remove(path.id, path.ti);
        } else {
            return this._faces.remove(path.id, path.ti);
        }
    }
    public getTopos(geom_type?:EGeomType):ifs.ITopo[] {
        let topos:ifs.ITopo[] = [];
        if (!geom_type || geom_type == EGeomType.faces) {
            topos = [...topos, 
            ...this._faces.flatten().map((v)=>
                new Face(this._model.getGeom(), new GeomPath(v[0], EGeomType.faces, v[1])))];
        }
        if (!geom_type || geom_type == EGeomType.wires) {
            topos = [...topos, 
            ...this._wires.flatten().map((v)=>
                new Wire(this._model.getGeom(), new GeomPath(v[0], EGeomType.wires, v[1])))];
        }
        if (!geom_type || geom_type == EGeomType.edges) {
            topos = [...topos, 
            ...this._face_edges.flatten().map((v)=>
                new Edge(this._model.getGeom(), new GeomPath(v[0], EGeomType.faces, v[1], EGeomType.edges, v[2]))), 
            ...this._wire_edges.flatten().map((v)=>
                new Edge(this._model.getGeom(), new GeomPath(v[0], EGeomType.wires, v[1], EGeomType.edges, v[2])))];
        }
        if (!geom_type || geom_type == EGeomType.vertices) {
            topos = [...topos, 
            ...this._face_vertices.flatten().map((v)=>
                new Edge(this._model.getGeom(), new GeomPath(v[0], EGeomType.faces, v[1], EGeomType.vertices, v[2]))), 
            ...this._wire_vertices.flatten().map((v)=>
                new Edge(this._model.getGeom(), new GeomPath(v[0], EGeomType.wires, v[1], EGeomType.vertices, v[2])))];
        }
        return topos;
    }
    public toArray():TTreeData {
        return [
            //topo
            this._faces.toArray(),
            this._wires.toArray(), 
            //subtopo
            this._face_edges.toArray(),
            this._face_vertices.toArray(), 
            this._wire_edges.toArray(),
            this._wire_vertices.toArray()
        ];
    }
    public fromArray(data:TTreeData):void {
        if (data == undefined) { throw new Error("Data array is undefined.");}
        if (data.length != 6) { throw new Error("Data array is invalid length.");}
        //topo
        this._faces = new TreeBranch2(data[0] as TTree2Data);
        this._wires = new TreeBranch2(data[1] as TTree2Data);
        //subtopo
        this._face_edges =    new TreeBranch3(data[2] as TTree3Data);
        this._face_vertices = new TreeBranch3(data[3] as TTree3Data);
        this._wire_edges =    new TreeBranch3(data[4] as TTree3Data);        
        this._wire_vertices = new TreeBranch3(data[5] as TTree3Data);
    }
}
/**
* Class for tree branches of depth 2.
* This class is only used internally by the TopoTree class. 
*/
class TreeBranch2 implements ifs.ITreeBranch2{
    private _tree:Map<number, Set<number>>;
    constructor(data?:TTree2Data) {
        if (data != undefined) {
            this.fromArray(data);
        } else {
            this._tree = new Map();
        }
    }
    public has(a:number, b:number):boolean {
        if (!this._tree.has(a)) {return false;}
        if (!this._tree.get(a).has(b)) {return false;}
        return true;
    }
    public add(a:number, b:number):void {
        if (!this._tree.has(a)) {this._tree.set(a,new Set());}
        this._tree.get(a).add(b);
    }
    public remove(a:number, b:number):boolean {
        if (!this._tree.has(a)) {return false;}
        return this._tree.get(a).delete(b);
    }
    public flatten():number[][] {
        let arr:number[][] = [];
        this._tree.forEach((set,a)=>set.forEach((b)=>arr.push([a, b])));
        return arr;
    }
    public toArray():TTree2Data {
        let arr = [];
        this._tree.forEach((arr2,obj_id)=>arr.push([obj_id, arr2]));
        return arr as TTree2Data;
    }
    public fromArray(arr:TTree2Data):void {
        this._tree = new Map();
        arr.forEach((arr2, i)=>this._tree.set(arr2[0] as number, new Set(arr2[1] as number[])));
    }
}
/**
* Class for tree branches of depth 3.
* This class is only used internally by the TopoTree class. 
*/
class TreeBranch3 implements ifs.ITreeBranch3 {
    private _tree:Map<number, ifs.ITreeBranch2>;
    constructor(data?:TTree3Data) {
        if (data != undefined) {
            this.fromArray(data);
        } else {
            this._tree = new Map();
        }
    }
    public has(a:number, b:number, c:number):boolean {
        if (!this._tree.has(a)) {return false;}
        return this._tree.get(a).has(b, c);
    }
    public add(a:number, b:number, c:number):void {
        if (!this._tree.has(a)) {this._tree.set(a,new TreeBranch2());}
        this._tree.get(a).add(b, c);
    }
    public remove(a:number, b:number, c:number):boolean {
        if (!this._tree.has(a)) {return false;}
        return this._tree.get(a).remove(b, c);
    }
    public flatten():number[][] {
        let arr:number[][] = [];
        this._tree.forEach((tb2,a)=>tb2.flatten().forEach((bc)=>arr.push([a, ...bc])));
        return arr;
    }
    public toArray():TTree3Data {
        let arr = [];
        this._tree.forEach((branch,obj_id)=>arr.push([obj_id, branch.toArray()]));
        return arr as TTree3Data;
    }
    public fromArray(arr:TTree3Data):void {
        this._tree = new Map();
        arr.forEach((arr2)=>this._tree.set(arr2[0], new TreeBranch2(arr2[1])));
    }
}