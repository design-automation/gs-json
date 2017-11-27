import {Arr} from "./arr";
import * as ifs from "./ifaces_gs";
import {IModelData, IAttribData, IGroupData, ISkinData} from "./ifaces_json";
import {EGeomType, EDataType, EObjType, mapGeomTypeToNumber} from "./enums";
import {Geom, GeomPath} from "./geom";
import {Point,Polyline,Polymesh} from "./entities";
import {Vertex, Edge, Wire, Face} from "./topos";
import {Attrib} from "./attribs";
/**
* Class for storing Topo in a tree data structure.
* This class is only used by the Group class. 
*/
export class TopoTree {
    private _model:ifs.IModel;
    //topo
    private _faces:TopoTreeBranch;   
    private _wires:TopoTreeBranch;
    //subtopo
    private _face_edges:SubtopoTreeBranch;
    private _face_vertices:SubtopoTreeBranch;    
    private _wire_edges:SubtopoTreeBranch;
    private _wire_vertices:SubtopoTreeBranch;
    //create tree
    constructor(model:ifs.IModel, data?:(number[][]|number[][][])[]) {
        this._model = model;
        if (data != undefined) {
            this.fromArray(data);
        } else {
            this._faces = new TopoTreeBranch(); 
            this._wires = new TopoTreeBranch();            
            this._face_edges = new SubtopoTreeBranch();
            this._face_vertices = new SubtopoTreeBranch();                       
            this._wire_edges = new SubtopoTreeBranch();
            this._wire_vertices = new SubtopoTreeBranch();
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
        switch (geom_type) {
            case EGeomType.wires:
                return this._wires.toPaths(EGeomType.wires).map((v,i)=>new Wire(this._model.getGeom(), v))
            case EGeomType.faces:
                return this._faces.toPaths(EGeomType.faces).map((v,i)=>new Face(this._model.getGeom(), v))
            case EGeomType.vertices:
                return [
                    ...this._wire_vertices.toPaths(EGeomType.wires, EGeomType.vertices).
                        map((v,i)=>new Vertex(this._model.getGeom(), v)), 
                    ...this._face_vertices.toPaths(EGeomType.faces, EGeomType.vertices).
                        map((v,i)=>new Vertex(this._model.getGeom(), v))
                ];
            case EGeomType.edges:
                return [
                    ...this._wire_edges.toPaths(EGeomType.wires, EGeomType.edges).
                        map((v,i)=>new Edge(this._model.getGeom(), v)),
                    ...this._face_edges.toPaths(EGeomType.faces, EGeomType.edges).
                        map((v,i)=>new Edge(this._model.getGeom(), v))
                ];
        }
        return [
            ...this._wires.toPaths(EGeomType.wires).
                map((v,i)=>new Wire(this._model.getGeom(), v)), 
            ...this._faces.toPaths(EGeomType.faces).
                map((v,i)=>new Face(this._model.getGeom(), v)),
            ...this._wire_vertices.toPaths(EGeomType.wires, EGeomType.vertices).
                map((v,i)=>new Vertex(this._model.getGeom(), v)), 
            ...this._wire_edges.toPaths(EGeomType.wires, EGeomType.edges).
                map((v,i)=>new Edge(this._model.getGeom(), v)),
            ...this._face_vertices.toPaths(EGeomType.faces, EGeomType.vertices).
                map((v,i)=>new Vertex(this._model.getGeom(), v)), 
            ...this._face_edges.toPaths(EGeomType.faces, EGeomType.edges).
                map((v,i)=>new Edge(this._model.getGeom(), v))
        ];
    }
    public toArray():(number[][]|number[][][])[] {
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
    public fromArray(data:(number[][]|number[][][])[]):void {
        if (data == undefined) { throw new Error("Data array is undefined.");}
        if (data.length != 6) { throw new Error("Data array is invalid  length.");}
        //topo
        this._faces = new TopoTreeBranch(data[0] as number[][]);
        this._wires = new TopoTreeBranch(data[1] as number[][]);
        //subtopo
        this._face_edges = new SubtopoTreeBranch(data[2] as number[][][]);
        this._face_vertices = new SubtopoTreeBranch(data[3] as number[][][]);
        this._wire_edges = new SubtopoTreeBranch(data[4] as number[][][]);        
        this._wire_vertices = new SubtopoTreeBranch(data[5] as number[][][]);
    }
}
/**
* Class for storing Topo components (wires and faces) in a tree data structure.
* This class is only used internally by the TopoTree class. 
*/
class TopoTreeBranch {
    private _tree:Map<number, Set<number>>;
    constructor(data?:number[][]) {
        if (data != undefined) {
            this.fromArray(data);
        } else {
            this._tree = new Map();
        }
    }

    public has(id:number, ti:number):boolean {
        if (!this._tree.has(id)) {return false;}
        if (!this._tree.get(id).has(ti)) {return false;}
        return true;
    }

    public add(id:number, ti:number):void {
        if (!this._tree.has(id)) {this._tree.set(id,new Set());}
        this._tree.get(id).add(ti);
    }

    public remove(id:number, ti:number):boolean {
        if (!this._tree.has(id)) {return false;}
        return this._tree.get(id).delete(ti);
    }
    public toPaths(tt:EGeomType.wires|EGeomType.faces):ifs.IGeomPath[] {
        let arr:ifs.IGeomPath[] = [];
        for (let id of Array.from(this._tree.keys())) { //TODO this slow
            for (let ti of Array.from(this._tree.get(id))) { //TODO this slow
                arr.push(new GeomPath(id, tt, ti));
            }
        }
        return arr;
    }
    public toArray():any[] {//TODO, should not be any
        let arr1:any[] = [];
        for (let id of Array.from(this._tree.keys())) {  //TODO this slow
        //for (let id of Object.keys(this._tree.keys())) { 
            let arr2:any[] = [];
            for (let ti of Array.from(this._tree.get(id))) { //TODO this slow
                arr2.push(ti);
            }
            arr1.push([id, arr2])
        }
        return arr1;
    }
    public fromArray(arr1:number[][]):void {
        this._tree = new Map();
        for (let [id, val1] of this._tree) {
            
            for (let ti of val1) {
                this.add(id, ti);
            }
        }
    }
}
/**
* Class for storing SubTopo components (vertices and edges) in a tree data structure.
* This class is only used internally by the TopoTree class. 
*/
class SubtopoTreeBranch {
    private _tree:Map<number, Map<number, Set<number>>>;
    constructor(data?:number[][][]) {
        if (data != undefined) {
            this.fromArray(data);
        } else {
            this._tree = new Map();
        }
    }
    public has(id:number, ti:number, si:number):boolean {
        if (!this._tree.has(id)) {return false;}
        if (!this._tree.get(id).has(ti)) {return false;}
        if (!this._tree.get(id).get(ti).has(si)) {return false;}
        return true;
    }
    public add(id:number, ti:number, si:number):void {
        if (!this._tree.has(id)) {this._tree.set(id,new Map());}
        if (!this._tree.get(id).has(ti)) {this._tree.get(id).set(ti,new Set());}
        this._tree.get(id).get(ti).add(si);
    }
    public remove(id:number, ti:number, si:number):boolean {
        if (!this._tree.has(id)) {return false;}
        if (!this._tree.get(id).has(ti)) {return false;}
        return this._tree.get(id).get(ti).delete(si);
    }
    public toPaths(
        tt:EGeomType.wires|EGeomType.faces, 
        st:EGeomType.vertices|EGeomType.edges):ifs.IGeomPath[] {
        let arr:ifs.IGeomPath[] = [];
        for (let id of Array.from(this._tree.keys())) { //TODO this slow
            for (let ti of Array.from(this._tree.get(id).keys())) { //TODO this slow
                for (let si of Array.from(this._tree.get(id).get(ti))) { //TODO this slow
                    arr.push(new GeomPath(id, tt, ti, st, si));
                }
            }
        }
        return arr;
    }
    public toArray():number[][][] {
        let arr1:number[][][] = [];
        for (let id of Array.from(this._tree.keys())) { //TODO this slow
            let arr2:number[][] = [];
            arr1.push(arr2)
            for (let ti of Array.from(this._tree.get(id).keys())) { //TODO this slow
                let arr3:number[] = [];
                arr2.push(arr3)
                for (let si of Array.from(this._tree.get(id).get(ti))) { //TODO this slow
                    arr3.push(si);
                }
            }
        }
        return arr1;
    }
    public fromArray(arr1:number[][][]):void {
        this._tree = new Map();
        for (let [id, val1] of this._tree) {
            for (let [ti, val2] of val1) {
                for (let si of val2) {
                    this.add(id, ti, si);
                }
            }
        }
    }
}