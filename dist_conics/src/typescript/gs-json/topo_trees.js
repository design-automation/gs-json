"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
/**
 * Class for storing Topo in a tree data structure.
 * This class is only used by the Kernel class.
 */
class TopoTree {
    constructor(data) {
        if (data !== undefined) {
            this.fromArray(data);
        }
        else {
            this._faces = new TreeBranch2();
            this._wires = new TreeBranch2();
            this._face_edges = new TreeBranch3();
            this._face_vertices = new TreeBranch3();
            this._wire_edges = new TreeBranch3();
            this._wire_vertices = new TreeBranch3();
        }
    }
    hasTopo(path) {
        const path_tt = enums_1.mapTTPathIndexToGeomType.get(path.tt);
        const path_st = enums_1.mapSTPathIndexToGeomType.get(path.st);
        switch (path_tt) {
            case enums_1.EGeomType.wires:
                if (path_st === enums_1.EGeomType.vertices) {
                    return this._wire_vertices.has(path.id, path.ti, path.si);
                }
                else if (path_st === enums_1.EGeomType.edges) {
                    return this._wire_edges.has(path.id, path.ti, path.si);
                }
                else {
                    return this._wires.has(path.id, path.ti);
                }
            case enums_1.EGeomType.faces:
                if (path_st === enums_1.EGeomType.vertices) {
                    return this._face_vertices.has(path.id, path.ti, path.si);
                }
                else if (path_st === enums_1.EGeomType.edges) {
                    return this._face_edges.has(path.id, path.ti, path.si);
                }
                else {
                    return this._faces.has(path.id, path.ti);
                }
        }
    }
    addTopo(path) {
        const path_tt = enums_1.mapTTPathIndexToGeomType.get(path.tt);
        const path_st = enums_1.mapSTPathIndexToGeomType.get(path.st);
        switch (path_tt) {
            case enums_1.EGeomType.wires:
                if (path_st === enums_1.EGeomType.vertices) {
                    return this._wire_vertices.add(path.id, path.ti, path.si);
                }
                else if (path_st === enums_1.EGeomType.edges) {
                    return this._wire_edges.add(path.id, path.ti, path.si);
                }
                else {
                    return this._wires.add(path.id, path.ti);
                }
            case enums_1.EGeomType.faces:
                if (path_st === enums_1.EGeomType.vertices) {
                    return this._face_vertices.add(path.id, path.ti, path.si);
                }
                else if (path_st === enums_1.EGeomType.edges) {
                    return this._face_edges.add(path.id, path.ti, path.si);
                }
                else {
                    return this._faces.add(path.id, path.ti);
                }
        }
    }
    removeTopo(path) {
        const path_tt = enums_1.mapTTPathIndexToGeomType.get(path.tt);
        const path_st = enums_1.mapSTPathIndexToGeomType.get(path.st);
        switch (path_tt) {
            case enums_1.EGeomType.wires:
                if (path_st === enums_1.EGeomType.vertices) {
                    return this._wire_vertices.remove(path.id, path.ti, path.si);
                }
                else if (path_st === enums_1.EGeomType.edges) {
                    return this._wire_edges.remove(path.id, path.ti, path.si);
                }
                else {
                    return this._wires.remove(path.id, path.ti);
                }
            case enums_1.EGeomType.faces:
                if (path_st === enums_1.EGeomType.vertices) {
                    return this._face_vertices.remove(path.id, path.ti, path.si);
                }
                else if (path_st === enums_1.EGeomType.edges) {
                    return this._face_edges.remove(path.id, path.ti, path.si);
                }
                else {
                    return this._faces.remove(path.id, path.ti);
                }
        }
    }
    removeObj(id) {
        let found = false;
        if (this._faces.remove(id)) {
            found = true;
        }
        if (this._wires.remove(id)) {
            found = true;
        }
        if (this._face_edges.remove(id)) {
            found = true;
        }
        if (this._face_vertices.remove(id)) {
            found = true;
        }
        if (this._wire_edges.remove(id)) {
            found = true;
        }
        if (this._wire_vertices.remove(id)) {
            found = true;
        }
        return found;
    }
    getNumTopos(geom_type) {
        let counter = 0;
        if (!geom_type || geom_type === enums_1.EGeomType.faces) {
            counter += this._faces.flatten().length;
        }
        if (!geom_type || geom_type === enums_1.EGeomType.wires) {
            counter += this._wires.flatten().length;
        }
        if (!geom_type || geom_type === enums_1.EGeomType.edges) {
            counter += this._face_edges.flatten().length;
            counter += this._wire_edges.flatten().length;
        }
        if (!geom_type || geom_type === enums_1.EGeomType.vertices) {
            counter += this._face_vertices.flatten().length;
            counter += this._wire_vertices.flatten().length;
        }
        return counter;
    }
    getTopos(geom_type) {
        let paths = [];
        if (!geom_type || geom_type === enums_1.EGeomType.faces) {
            paths = [...paths, ...this._faces.flatten().map((v) => Object({ id: v[0], tt: 1, ti: v[1] }))];
        }
        if (!geom_type || geom_type === enums_1.EGeomType.wires) {
            paths = [...paths,
                ...this._wires.flatten().map((v) => Object({ id: v[0], tt: 0, ti: v[1] }))];
        }
        if (!geom_type || geom_type === enums_1.EGeomType.edges) {
            paths = [...paths,
                ...this._face_edges.flatten().map((v) => Object({ id: v[0], tt: 1, ti: v[1], st: 1, si: v[2] })),
                ...this._wire_edges.flatten().map((v) => Object({ id: v[0], tt: 0, ti: v[1], st: 1, si: v[2] }))];
        }
        if (!geom_type || geom_type === enums_1.EGeomType.vertices) {
            paths = [...paths,
                ...this._face_vertices.flatten().map((v) => Object({ id: v[0], tt: 1, ti: v[1], st: 0, si: v[2] })),
                ...this._wire_vertices.flatten().map((v) => Object({ id: v[0], tt: 0, ti: v[1], st: 0, si: v[2] }))];
        }
        return paths;
    }
    toArray() {
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
    fromArray(data) {
        if (data === undefined) {
            throw new Error("Data array is undefined.");
        }
        // topo
        this._faces = new TreeBranch2(data[0]);
        this._wires = new TreeBranch2(data[1]);
        // subtopo
        this._face_edges = new TreeBranch3(data[2]);
        this._face_vertices = new TreeBranch3(data[3]);
        this._wire_edges = new TreeBranch3(data[4]);
        this._wire_vertices = new TreeBranch3(data[5]);
    }
}
exports.TopoTree = TopoTree;
// ==========================================================================================
/**
 * Class for tree branches of depth 2.
 * This class is only used internally by the TopoTree class.
 */
class TreeBranch2 {
    constructor(data) {
        if (data !== undefined) {
            this.fromArray(data);
        }
        else {
            this._tree = new Map();
        }
    }
    has(a, b) {
        if (!this._tree.has(a)) {
            return false;
        }
        if (!this._tree.get(a).has(b)) {
            return false;
        }
        return true;
    }
    add(a, b) {
        if (this.has(a, b)) {
            return false;
        }
        if (!this._tree.has(a)) {
            this._tree.set(a, new Set());
        }
        this._tree.get(a).add(b);
        return true;
    }
    remove(a, b) {
        if (!this._tree.has(a)) {
            return false;
        }
        if (b === undefined) {
            return this._tree.delete(a);
        }
        return this._tree.get(a).delete(b);
    }
    flatten() {
        const arr = [];
        this._tree.forEach((set, a) => set.forEach((b) => arr.push([a, b])));
        return arr;
    }
    toArray() {
        const arr = [];
        this._tree.forEach((arr2, obj_id) => arr.push([obj_id, arr2]));
        return arr;
    }
    fromArray(arr) {
        this._tree = new Map();
        arr.forEach((arr2, i) => this._tree.set(arr2[0], new Set(arr2[1])));
    }
}
//  ================================================================================================
/**
 * Class for tree branches of depth 3.
 * This class is only used internally by the TopoTree class.
 */
class TreeBranch3 {
    constructor(data) {
        if (data !== undefined) {
            this.fromArray(data);
        }
        else {
            this._tree = new Map();
        }
    }
    has(a, b, c) {
        if (!this._tree.has(a)) {
            return false;
        }
        return this._tree.get(a).has(b, c);
    }
    add(a, b, c) {
        if (this.has(a, b, c)) {
            return false;
        }
        if (!this._tree.has(a)) {
            this._tree.set(a, new TreeBranch2());
        }
        this._tree.get(a).add(b, c);
        return true;
    }
    remove(a, b, c) {
        if (!this._tree.has(a)) {
            return false;
        }
        if (b === undefined) {
            return this._tree.delete(a);
        }
        return this._tree.get(a).remove(b, c);
    }
    flatten() {
        const arr = [];
        this._tree.forEach((tb2, a) => tb2.flatten().forEach((bc) => arr.push([a, ...bc])));
        return arr;
    }
    toArray() {
        const arr = [];
        this._tree.forEach((branch, obj_id) => arr.push([obj_id, branch.toArray()]));
        return arr;
    }
    fromArray(arr) {
        this._tree = new Map();
        arr.forEach((arr2) => this._tree.set(arr2[0], new TreeBranch2(arr2[1])));
    }
}
// ==================================================================================================
// ==================================================================================================
// ==================================================================================================
// ==================================================================================================
// /**
//  * Class for storing Topo in a tree data structure.
//  * This class is only used by the Group class.
//  */
// export class TopoTree implements ifs.ITopoTree {
//     private _model: ifs.IModel;
//     // topo
//     private _faces: ITreeBranch2;
//     private _wires: ITreeBranch2;
//     // subtopo
//     private _face_edges: ITreeBranch3;
//     private _face_vertices: ITreeBranch3;
//     private _wire_edges: ITreeBranch3;
//     private _wire_vertices: ITreeBranch3;
//     constructor(model: ifs.IModel, data?: TTreeData) {
//         this._model = model;
//         if (data !== undefined) {
//             this.fromArray(data);
//         } else {
//             this._faces =         new TreeBranch2();
//             this._wires =         new TreeBranch2();
//             this._face_edges =    new TreeBranch3();
//             this._face_vertices = new TreeBranch3();
//             this._wire_edges =    new TreeBranch3();
//             this._wire_vertices = new TreeBranch3();
//         }
//     }
//     public hasTopo(topo: ifs.ITopo): boolean {
//         const path: ITopoPathData = topo.getTopoPath();
//         // subtopo
//         if (path.tt === 0) { // wires
//             if (path.st === EGeomType.vertices) {
//                 return this._wire_vertices.has(path.id, path.ti, path.si);
//             } else if (path.st === 1) { // edges
//                 return this._wire_edges.has(path.id, path.ti, path.si);
//             }
//         } else {
//             if (path.st === 0) { // vertices
//                 return this._face_vertices.has(path.id, path.ti, path.si);
//             } else if (path.st === 1) { // edges
//                 return this._face_edges.has(path.id, path.ti, path.si);
//             }
//         }
//         // topo
//         if (path.tt === 0) { // wires
//             return this._wires.has(path.id, path.ti);
//         } else {
//             return this._faces.has(path.id, path.ti);
//         }
//     }
//     public addTopo(topo: ifs.ITopo): void {
//         const path: ITopoPathData = topo.getTopoPath();
//         // subtopo
//         if (path.tt === 0) { // wires
//             if (path.st === 0) { // vertices
//                 this._wire_vertices.add(path.id, path.ti, path.si);
//             } else if (path.st === 1) { // edges
//                 this._wire_edges.add(path.id, path.ti, path.si);
//             }
//         } else {
//             if (path.st === 0) { // vertices
//                 this._face_vertices.add(path.id, path.ti, path.si);
//             } else if (path.st === 1) { // edges
//                 this._face_edges.add(path.id, path.ti, path.si);
//             }
//         }
//         // topo
//         if (path.tt === 0) { // wires
//             return this._wires.add(path.id, path.ti);
//         } else { // faces
//             return this._faces.add(path.id, path.ti);
//         }
//     }
//     public removeTopo(topo: ifs.ITopo): boolean {
//         const path: ifs.ITopoPath = topo.getTopoPath();
//         // subtopo
//         if (path.tt === 0) { // wires
//             if (path.st === 0) { // vertices
//                 return this._wire_vertices.remove(path.id, path.ti, path.si);
//             } else if (path.st === 1) { // edges
//                 return this._wire_edges.remove(path.id, path.ti, path.si);
//             }
//         } else { // faces
//             if (path.st === 0) { // vertices
//                 return this._face_vertices.remove(path.id, path.ti, path.si);
//             } else if (path.st === 1) { // edges
//                 return this._face_edges.remove(path.id, path.ti, path.si);
//             }
//         }
//         // topo
//         if (path.tt === 0) { // wires
//             return this._wires.remove(path.id, path.ti);
//         } else { // faces
//             return this._faces.remove(path.id, path.ti);
//         }
//     }
//     public getTopos(geom_type?: EGeomType): ifs.ITopo[] {
//         let topos: ifs.ITopo[] = [];
//         if (!geom_type || geom_type === EGeomType.faces) {
//             topos = [...topos,
//             ...this._faces.flatten().map((v) =>
//                 new Face(this._model.getGeom(), new TopoPath(v[0], EGeomType.faces, v[1])))];
//         }
//         if (!geom_type || geom_type === EGeomType.wires) {
//             topos = [...topos,
//             ...this._wires.flatten().map((v) =>
//                 new Wire(this._model.getGeom(), new TopoPath(v[0], EGeomType.wires, v[1])))];
//         }
//         if (!geom_type || geom_type === EGeomType.edges) {
//             topos = [...topos,
//             ...this._face_edges.flatten().map((v) =>
//                 new Edge(this._model.getGeom(),
//                     new TopoPath(v[0], EGeomType.faces, v[1], EGeomType.edges, v[2]))),
//             ...this._wire_edges.flatten().map((v) =>
//                 new Edge(this._model.getGeom(),
//                     new TopoPath(v[0], EGeomType.wires, v[1], EGeomType.edges, v[2])))];
//         }
//         if (!geom_type || geom_type === EGeomType.vertices) {
//             topos = [...topos,
//             ...this._face_vertices.flatten().map((v) =>
//                 new Edge(this._model.getGeom(),
//                     new TopoPath(v[0], EGeomType.faces, v[1], EGeomType.vertices, v[2]))),
//             ...this._wire_vertices.flatten().map((v) =>
//                 new Edge(this._model.getGeom(),
//                     new TopoPath(v[0], EGeomType.wires, v[1], EGeomType.vertices, v[2])))];
//         }
//         return topos;
//     }
//     public toArray(): TTreeData {
//         return [
//             // topo
//             this._faces.toArray(),
//             this._wires.toArray(),
//             // subtopo
//             this._face_edges.toArray(),
//             this._face_vertices.toArray(),
//             this._wire_edges.toArray(),
//             this._wire_vertices.toArray(),
//        ];
//     }
//     public fromArray(data: TTreeData): void {
//         if (data === undefined) { throw new Error("Data array is undefined."); }
//         if (data.length !== 6) { throw new Error("Data array is invalid length."); }
//         // topo
//         this._faces = new TreeBranch2(data[0] as TTree2Data);
//         this._wires = new TreeBranch2(data[1] as TTree2Data);
//         // subtopo
//         this._face_edges =    new TreeBranch3(data[2] as TTree3Data);
//         this._face_vertices = new TreeBranch3(data[3] as TTree3Data);
//         this._wire_edges =    new TreeBranch3(data[4] as TTree3Data);
//         this._wire_vertices = new TreeBranch3(data[5] as TTree3Data);
//     }
//     public has(t: EGeomType[], a: number, b: number, c?: number ): boolean {
//         switch (t) {
//             case [EGeomType.faces, null]:
//                 return this._faces.has(a, b);
//             case [EGeomType.wires, null]:
//                 return this._wires.has(a, b);
//             case [EGeomType.faces, EGeomType.edges]:
//                 return this._face_edges.has(a, b, c);
//             case [EGeomType.faces, EGeomType.vertices]:
//                 return this._face_vertices.has(a, b, c);
//             case [EGeomType.wires, EGeomType.edges]:
//                 return this._wire_edges.has(a, b, c);
//             case [EGeomType.wires, EGeomType.vertices]:
//                 return this._wire_vertices.has(a, b, c);
//         }
//     }
//     public add(t: EGeomType[], a: number, b: number, c?: number): void {
//         switch (t) {
//             case [EGeomType.faces, null]:
//                 return this._faces.add(a, b);
//             case [EGeomType.wires, null]:
//                 return this._wires.add(a, b);
//             case [EGeomType.faces, EGeomType.edges]:
//                 return this._face_edges.add(a, b, c);
//             case [EGeomType.faces, EGeomType.vertices]:
//                 return this._face_vertices.add(a, b, c);
//             case [EGeomType.wires, EGeomType.edges]:
//                 return this._wire_edges.add(a, b, c);
//             case [EGeomType.wires, EGeomType.vertices]:
//                 return this._wire_vertices.add(a, b, c);
//         }
//     }
//     public remove(t: EGeomType[], a: number, b: number, c?: number): boolean {
//         switch (t) {
//             case [EGeomType.faces, null]:
//                 return this._faces.remove(a, b);
//             case [EGeomType.wires, null]:
//                 return this._wires.remove(a, b);
//             case [EGeomType.faces, EGeomType.edges]:
//                 return this._face_edges.remove(a, b, c);
//             case [EGeomType.faces, EGeomType.vertices]:
//                 return this._face_vertices.remove(a, b, c);
//             case [EGeomType.wires, EGeomType.edges]:
//                 return this._wire_edges.remove(a, b, c);
//             case [EGeomType.wires, EGeomType.vertices]:
//                 return this._wire_vertices.remove(a, b, c);
//         }
//     }
//     public flatten(t: EGeomType[]): number[][] {
//         switch (t) {
//             case [EGeomType.faces, null]:
//                 return this._faces.flatten();
//             case [EGeomType.wires, null]:
//                 return this._wires.flatten();
//             case [EGeomType.faces, EGeomType.edges]:
//                 return this._face_edges.flatten();
//             case [EGeomType.faces, EGeomType.vertices]:
//                 return this._face_vertices.flatten();
//             case [EGeomType.wires, EGeomType.edges]:
//                 return this._wire_edges.flatten();
//             case [EGeomType.wires, EGeomType.vertices]:
//                 return this._wire_vertices.flatten();
//         }
//     }
//     public toArray_bis(t: EGeomType[]): (TTree2Data | TTree3Data) {
//         switch (t) {
//             case [EGeomType.faces, null]:
//                 return this._faces.toArray();
//             case [EGeomType.wires, null]:
//                 return this._wires.toArray();
//             case [EGeomType.faces, EGeomType.edges]:
//                 return this._face_edges.toArray();
//             case [EGeomType.faces, EGeomType.vertices]:
//                 return this._face_vertices.toArray();
//             case [EGeomType.wires, EGeomType.edges]:
//                 return this._wire_edges.toArray();
//             case [EGeomType.wires, EGeomType.vertices]:
//                 return this._wire_vertices.toArray();
//         }
//     }
//     public fromArray_bis(t: EGeomType[], arr2?: TTree2Data, arr3?: TTree3Data): void {
//         switch (t) {
//             case [EGeomType.faces, null]:
//                 return this._faces.fromArray(arr2);
//             case [EGeomType.wires, null]:
//                 return this._wires.fromArray(arr2);
//             case [EGeomType.faces, EGeomType.edges]:
//                 return this._face_edges.fromArray(arr3);
//             case [EGeomType.faces, EGeomType.vertices]:
//                 return this._face_vertices.fromArray(arr3);
//             case [EGeomType.wires, EGeomType.edges]:
//                 return this._wire_edges.fromArray(arr3);
//             case [EGeomType.wires, EGeomType.vertices]:
//                 return this._wire_vertices.fromArray(arr3);
//         }
//     }
// }
// ==================================================================================================
// ==================================================================================================
// ==================================================================================================
//# sourceMappingURL=topo_trees.js.map