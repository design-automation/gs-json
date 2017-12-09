import * as ifs from "./ifaces_gs";
import {TTreeData, TTree2Data, TTree3Data, ITopoPathData} from "./ifaces_json";
import {EGeomType} from "./enums";
import {Edge, Wire, Face, TopoPath} from "./topos";

/**
 * Class for storing Topo in a tree data structure.
 * This class is only used by the Kernel class.
 */
export class TopoTree2 {
    // topo
    private _faces: ifs.ITreeBranch2;
    private _wires: ifs.ITreeBranch2;
    // subtopo
    private _face_edges: ifs.ITreeBranch3;
    private _face_vertices: ifs.ITreeBranch3;
    private _wire_edges: ifs.ITreeBranch3;
    private _wire_vertices: ifs.ITreeBranch3;

    constructor(data?: TTreeData) {
        if (data !== undefined) {
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

    public hasTopo(path: ITopoPathData): boolean {
        switch (path.tt) {
            case EGeomType.wires:
                if (path.st === EGeomType.vertices) {
                    return this._wire_vertices.has(path.id, path.ti, path.si);
                } else if (path.st === EGeomType.edges) {
                    return this._wire_edges.has(path.id, path.ti, path.si);
                } else {
                    return this._wires.has(path.id, path.ti);
                }
            case EGeomType.faces:
                if (path.st === EGeomType.vertices) {
                    return this._face_vertices.has(path.id, path.ti, path.si);
                } else if (path.st === EGeomType.edges) {
                    return this._face_edges.has(path.id, path.ti, path.si);
                } else {
                    return this._faces.has(path.id, path.ti);
                }
        }
    }

    public addTopo(path: ITopoPathData): void {
        switch (path.tt) {
            case EGeomType.wires:
                if (path.st === EGeomType.vertices) {
                    this._wire_vertices.add(path.id, path.ti, path.si);
                } else if (path.st === EGeomType.edges) {
                    this._wire_edges.add(path.id, path.ti, path.si);
                } else {
                    return this._wires.add(path.id, path.ti);
                }
            case EGeomType.faces:
                if (path.st === EGeomType.vertices) {
                    this._face_vertices.add(path.id, path.ti, path.si);
                } else if (path.st === EGeomType.edges) {
                    this._face_edges.add(path.id, path.ti, path.si);
                } else {
                    return this._faces.add(path.id, path.ti);
                }
        }
    }

    public removeTopo(path: ITopoPathData): boolean {
        switch (path.tt) {
            case EGeomType.wires:
                if (path.st === EGeomType.vertices) {
                    return this._wire_vertices.remove(path.id, path.ti, path.si);
                } else if (path.st === EGeomType.edges) {
                    return this._wire_edges.remove(path.id, path.ti, path.si);
                } else {
                    return this._wires.remove(path.id, path.ti);
                }
            case EGeomType.faces:
                if (path.st === EGeomType.vertices) {
                    return this._face_vertices.remove(path.id, path.ti, path.si);
                } else if (path.st === EGeomType.edges) {
                    return this._face_edges.remove(path.id, path.ti, path.si);
                } else {
                    return this._faces.remove(path.id, path.ti);
                }
        }
    }

    public removeObj(id: number): boolean {
        let found: boolean = false;
        if (this._faces.remove(id)) {found = true};
        if (this._wires.remove(id)) {found = true};
        if (this._face_edges.remove(id)) {found = true};
        if (this._face_vertices.remove(id)) {found = true};
        if (this._wire_edges.remove(id)) {found = true};
        if (this._wire_vertices.remove(id)) {found = true};
        return found;
    }

    public getTopos(geom_type?: EGeomType): ITopoPathData[] {
        let paths: ITopoPathData[] = [];
        if (!geom_type || geom_type === EGeomType.faces) {
            paths = [...paths,...this._faces.flatten().map((v) =>
                Object({id: v[0], tt: 1, ti: v[1]}))];
        }
        if (!geom_type || geom_type === EGeomType.wires) {
            paths = [...paths,
            ...this._wires.flatten().map((v) =>
                Object({id: v[0], tt: 0, ti: v[1]}))];
        }
        if (!geom_type || geom_type === EGeomType.edges) {
            paths = [...paths,
            ...this._face_edges.flatten().map((v) =>
                Object({id: v[0], tt: 1, ti: v[1], st: 1, si: v[2]})),
            ...this._wire_edges.flatten().map((v) =>
                Object({id: v[0], tt: 0, ti: v[1], st: 1, si: v[2]}))];
        }
        if (!geom_type || geom_type === EGeomType.vertices) {
            paths = [...paths,
            ...this._face_vertices.flatten().map((v) =>
                Object({id: v[0], tt: 1, ti: v[1], st: 0, si: v[2]})),
            ...this._wire_vertices.flatten().map((v) =>
                Object({id: v[0], tt: 0, ti: v[1], st: 0, si: v[2]}))];
        }
        return paths;
    }

    public toArray(): TTreeData {
        return [
            // topo
            this._faces.toArray(),
            this._wires.toArray(),
            // subtopo
            this._face_edges.toArray(),
            this._face_vertices.toArray(),
            this._wire_edges.toArray(),
            this._wire_vertices.toArray(),
       ];
    }

    public fromArray(data: TTreeData): void {
        if (data === undefined) { throw new Error("Data array is undefined."); }
        if (data.length !== 6) { throw new Error("Data array is invalid length."); }
        // topo
        this._faces = new TreeBranch2(data[0] as TTree2Data);
        this._wires = new TreeBranch2(data[1] as TTree2Data);
        // subtopo
        this._face_edges =    new TreeBranch3(data[2] as TTree3Data);
        this._face_vertices = new TreeBranch3(data[3] as TTree3Data);
        this._wire_edges =    new TreeBranch3(data[4] as TTree3Data);
        this._wire_vertices = new TreeBranch3(data[5] as TTree3Data);
    }
}

//==================================================================================================
//==================================================================================================
//==================================================================================================
//==================================================================================================


/**
 * Class for storing Topo in a tree data structure.
 * This class is only used by the Group class.
 */
export class TopoTree implements ifs.ITopoTree {
    private _model: ifs.IModel;
    // topo
    private _faces: ifs.ITreeBranch2;
    private _wires: ifs.ITreeBranch2;
    // subtopo
    private _face_edges: ifs.ITreeBranch3;
    private _face_vertices: ifs.ITreeBranch3;
    private _wire_edges: ifs.ITreeBranch3;
    private _wire_vertices: ifs.ITreeBranch3;

    constructor(model: ifs.IModel, data?: TTreeData) {
        this._model = model;
        if (data !== undefined) {
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

    public hasTopo(topo: ifs.ITopo): boolean {
        const path: ifs.ITopoPath = topo.getTopoPath();
        // subtopo
        if (path.tt === EGeomType.wires) {
            if (path.st === EGeomType.vertices) {
                return this._wire_vertices.has(path.id, path.ti, path.si);
            } else if (path.st === EGeomType.edges) {
                return this._wire_edges.has(path.id, path.ti, path.si);
            }
        } else {
            if (path.st === EGeomType.vertices) {
                return this._face_vertices.has(path.id, path.ti, path.si);
            } else if (path.st === EGeomType.edges) {
                return this._face_edges.has(path.id, path.ti, path.si);
            }
        }
        // topo
        if (path.tt === EGeomType.wires) {
            return this._wires.has(path.id, path.ti);
        } else {
            return this._faces.has(path.id, path.ti);
        }
    }

    public addTopo(topo: ifs.ITopo): void {
        const path: ifs.ITopoPath = topo.getTopoPath();
        // subtopo
        if (path.tt === EGeomType.wires) {
            if (path.st === EGeomType.vertices) {
                this._wire_vertices.add(path.id, path.ti, path.si);
            } else if (path.st === EGeomType.edges) {
                this._wire_edges.add(path.id, path.ti, path.si);
            }
        } else {
            if (path.st === EGeomType.vertices) {
                this._face_vertices.add(path.id, path.ti, path.si);
            } else if (path.st === EGeomType.edges) {
                this._face_edges.add(path.id, path.ti, path.si);
            }
        }
        // topo
        if (path.tt === EGeomType.wires) {
            return this._wires.add(path.id, path.ti);
        } else {
            return this._faces.add(path.id, path.ti);
        }
    }

    public removeTopo(topo: ifs.ITopo): boolean {
        const path: ifs.ITopoPath = topo.getTopoPath();
        // subtopo
        if (path.tt === EGeomType.wires) {
            if (path.st === EGeomType.vertices) {
                return this._wire_vertices.remove(path.id, path.ti, path.si);
            } else if (path.st === EGeomType.edges) {
                return this._wire_edges.remove(path.id, path.ti, path.si);
            }
        } else {
            if (path.st === EGeomType.vertices) {
                return this._face_vertices.remove(path.id, path.ti, path.si);
            } else if (path.st === EGeomType.edges) {
                return this._face_edges.remove(path.id, path.ti, path.si);
            }
        }
        // topo
        if (path.tt === EGeomType.wires) {
            return this._wires.remove(path.id, path.ti);
        } else {
            return this._faces.remove(path.id, path.ti);
        }
    }

    public getTopos(geom_type?: EGeomType): ifs.ITopo[] {
        let topos: ifs.ITopo[] = [];
        if (!geom_type || geom_type === EGeomType.faces) {
            topos = [...topos,
            ...this._faces.flatten().map((v) =>
                new Face(this._model.getGeom(), new TopoPath(v[0], EGeomType.faces, v[1])))];
        }
        if (!geom_type || geom_type === EGeomType.wires) {
            topos = [...topos,
            ...this._wires.flatten().map((v) =>
                new Wire(this._model.getGeom(), new TopoPath(v[0], EGeomType.wires, v[1])))];
        }
        if (!geom_type || geom_type === EGeomType.edges) {
            topos = [...topos,
            ...this._face_edges.flatten().map((v) =>
                new Edge(this._model.getGeom(),
                    new TopoPath(v[0], EGeomType.faces, v[1], EGeomType.edges, v[2]))),
            ...this._wire_edges.flatten().map((v) =>
                new Edge(this._model.getGeom(),
                    new TopoPath(v[0], EGeomType.wires, v[1], EGeomType.edges, v[2])))];
        }
        if (!geom_type || geom_type === EGeomType.vertices) {
            topos = [...topos,
            ...this._face_vertices.flatten().map((v) =>
                new Edge(this._model.getGeom(),
                    new TopoPath(v[0], EGeomType.faces, v[1], EGeomType.vertices, v[2]))),
            ...this._wire_vertices.flatten().map((v) =>
                new Edge(this._model.getGeom(),
                    new TopoPath(v[0], EGeomType.wires, v[1], EGeomType.vertices, v[2])))];
        }
        return topos;
    }

    public toArray(): TTreeData {
        return [
            // topo
            this._faces.toArray(),
            this._wires.toArray(),
            // subtopo
            this._face_edges.toArray(),
            this._face_vertices.toArray(),
            this._wire_edges.toArray(),
            this._wire_vertices.toArray(),
       ];
    }

    public fromArray(data: TTreeData): void {
        if (data === undefined) { throw new Error("Data array is undefined."); }
        if (data.length !== 6) { throw new Error("Data array is invalid length."); }
        // topo
        this._faces = new TreeBranch2(data[0] as TTree2Data);
        this._wires = new TreeBranch2(data[1] as TTree2Data);
        // subtopo
        this._face_edges =    new TreeBranch3(data[2] as TTree3Data);
        this._face_vertices = new TreeBranch3(data[3] as TTree3Data);
        this._wire_edges =    new TreeBranch3(data[4] as TTree3Data);
        this._wire_vertices = new TreeBranch3(data[5] as TTree3Data);
    }

    public has(t: EGeomType[], a: number, b: number, c?: number ): boolean {
        switch (t) {
            case [EGeomType.faces, null]:
                return this._faces.has(a, b);
            case [EGeomType.wires, null]:
                return this._wires.has(a, b);
            case [EGeomType.faces, EGeomType.edges]:
                return this._face_edges.has(a, b, c);
            case [EGeomType.faces, EGeomType.vertices]:
                return this._face_vertices.has(a, b, c);
            case [EGeomType.wires, EGeomType.edges]:
                return this._wire_edges.has(a, b, c);
            case [EGeomType.wires, EGeomType.vertices]:
                return this._wire_vertices.has(a, b, c);
        }
    }

    public add(t: EGeomType[], a: number, b: number, c?: number): void {
        switch (t) {
            case [EGeomType.faces, null]:
                return this._faces.add(a, b);
            case [EGeomType.wires, null]:
                return this._wires.add(a, b);
            case [EGeomType.faces, EGeomType.edges]:
                return this._face_edges.add(a, b, c);
            case [EGeomType.faces, EGeomType.vertices]:
                return this._face_vertices.add(a, b, c);
            case [EGeomType.wires, EGeomType.edges]:
                return this._wire_edges.add(a, b, c);
            case [EGeomType.wires, EGeomType.vertices]:
                return this._wire_vertices.add(a, b, c);
        }
    }

    public remove(t: EGeomType[], a: number, b: number, c?: number): boolean {
        switch (t) {
            case [EGeomType.faces, null]:
                return this._faces.remove(a, b);
            case [EGeomType.wires, null]:
                return this._wires.remove(a, b);
            case [EGeomType.faces, EGeomType.edges]:
                return this._face_edges.remove(a, b, c);
            case [EGeomType.faces, EGeomType.vertices]:
                return this._face_vertices.remove(a, b, c);
            case [EGeomType.wires, EGeomType.edges]:
                return this._wire_edges.remove(a, b, c);
            case [EGeomType.wires, EGeomType.vertices]:
                return this._wire_vertices.remove(a, b, c);
        }
    }

    public flatten(t: EGeomType[]): number[][] {
        switch (t) {
            case [EGeomType.faces, null]:
                return this._faces.flatten();
            case [EGeomType.wires, null]:
                return this._wires.flatten();
            case [EGeomType.faces, EGeomType.edges]:
                return this._face_edges.flatten();
            case [EGeomType.faces, EGeomType.vertices]:
                return this._face_vertices.flatten();
            case [EGeomType.wires, EGeomType.edges]:
                return this._wire_edges.flatten();
            case [EGeomType.wires, EGeomType.vertices]:
                return this._wire_vertices.flatten();
        }
    }

    public toArray_bis(t: EGeomType[]): (TTree2Data | TTree3Data) {
        switch (t) {
            case [EGeomType.faces, null]:
                return this._faces.toArray();
            case [EGeomType.wires, null]:
                return this._wires.toArray();
            case [EGeomType.faces, EGeomType.edges]:
                return this._face_edges.toArray();
            case [EGeomType.faces, EGeomType.vertices]:
                return this._face_vertices.toArray();
            case [EGeomType.wires, EGeomType.edges]:
                return this._wire_edges.toArray();
            case [EGeomType.wires, EGeomType.vertices]:
                return this._wire_vertices.toArray();
        }
    }

    public fromArray_bis(t: EGeomType[], arr2?: TTree2Data, arr3?: TTree3Data): void {
        switch (t) {
            case [EGeomType.faces, null]:
                return this._faces.fromArray(arr2);
            case [EGeomType.wires, null]:
                return this._wires.fromArray(arr2);
            case [EGeomType.faces, EGeomType.edges]:
                return this._face_edges.fromArray(arr3);
            case [EGeomType.faces, EGeomType.vertices]:
                return this._face_vertices.fromArray(arr3);
            case [EGeomType.wires, EGeomType.edges]:
                return this._wire_edges.fromArray(arr3);
            case [EGeomType.wires, EGeomType.vertices]:
                return this._wire_vertices.fromArray(arr3);
        }
    }
}

//==================================================================================================
//==================================================================================================
//==================================================================================================
//==================================================================================================

/**
 * Class for tree branches of depth 2.
 * This class is only used internally by the TopoTree class.
 */
class TreeBranch2 implements ifs.ITreeBranch2 {
    private _tree: Map<number, Set<number>>;

    constructor(data?: TTree2Data) {
        if (data !== undefined) {
            this.fromArray(data);
        } else {
            this._tree = new Map();
        }
    }

    public has(a: number, b: number): boolean {
        if (!this._tree.has(a)) {return false; }
        if (!this._tree.get(a).has(b)) {return false; }
        return true;
    }

    public add(a: number, b: number): void {
        if (!this._tree.has(a)) {this._tree.set(a, new Set()); }
        this._tree.get(a).add(b);
    }

    public remove(a: number, b?: number): boolean {
        if (!this._tree.has(a)) {return false; }
        if (b === undefined) {return this._tree.delete(a);}
        return this._tree.get(a).delete(b);
    }

    public flatten(): number[][] {
        const arr: number[][] = [];
        this._tree.forEach((set, a) => set.forEach((b) => arr.push([a, b])));
        return arr;
    }

    public toArray(): TTree2Data {
        const arr = [];
        this._tree.forEach((arr2, obj_id) => arr.push([obj_id, arr2]));
        return arr as TTree2Data;
    }

    public fromArray(arr: TTree2Data): void {
        this._tree = new Map();
        arr.forEach((arr2, i) => this._tree.set(arr2[0] as number, new Set(arr2[1] as number[])));
    }
}
/**
 * Class for tree branches of depth 3.
 * This class is only used internally by the TopoTree class.
 */
class TreeBranch3 implements ifs.ITreeBranch3 {
    private _tree: Map<number, ifs.ITreeBranch2>;

    constructor(data?: TTree3Data) {
        if (data !== undefined) {
            this.fromArray(data);
        } else {
            this._tree = new Map();
        }
    }

    public has(a: number, b: number, c: number): boolean {
        if (!this._tree.has(a)) {return false; }
        return this._tree.get(a).has(b, c);
    }

    public add(a: number, b: number, c: number): void {
        if (!this._tree.has(a)) {this._tree.set(a, new TreeBranch2()); }
        this._tree.get(a).add(b, c);
    }

    public remove(a: number, b?: number, c?: number): boolean {
        if (!this._tree.has(a)) {return false; }
        if (b === undefined) {return this._tree.delete(a);}
        return this._tree.get(a).remove(b, c);
    }

    public flatten(): number[][] {
        const arr: number[][] = [];
        this._tree.forEach((tb2, a) => tb2.flatten().forEach((bc) => arr.push([a, ...bc])));
        return arr;
    }

    public toArray(): TTree3Data {
        const arr = [];
        this._tree.forEach((branch, obj_id) => arr.push([obj_id, branch.toArray()]));
        return arr as TTree3Data;
    }

    public fromArray(arr: TTree3Data): void {
        this._tree = new Map();
        arr.forEach((arr2) => this._tree.set(arr2[0], new TreeBranch2(arr2[1])));
    }
}
