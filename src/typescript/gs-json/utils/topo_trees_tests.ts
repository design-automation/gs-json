import {Arr} from "./arr";
import * as ifs from "./ifaces_gs";
import {TopoTree} from "./topo_trees";
import {ITopoTree} from "./ifaces_trees";
import {Model} from "./model";
import * as td from "./test_data";

// Tests for Class TopoTree
export function test_TopoTree_constructor(): boolean {

    const m: Model = new Model(td.open_box());
    // let grp:ifs.IGroup = m.addGroup("test1");
    // if(!Arr.equal(grp.getTopos(),[])){return false;}
    const t: ITopoTree = new TopoTree();
    const f1: ifs.IFace = m.getGeom().getObj(0).getFaces()[0];
    if(t.hasTopo(f1.getTopoPath()) === true) {return false;}
    t.addTopo(f1.getTopoPath());
    if(!(t.hasTopo(f1.getTopoPath()) === true)) {return false;}
    return true;
}

export function test_TopoTree_hasTopo(): boolean {
    const m: Model = new Model(td.open_box());
    const g: ifs.IGroup = m.addGroup("Box");
    const f1: ifs.IFace = m.getGeom().getObj(0).getFaces()[0];
    const f2: ifs.IFace = m.getGeom().getObj(0).getFaces()[1];
    const f3: ifs.IFace = m.getGeom().getObj(0).getFaces()[2];
    const w1: ifs.IWire = m.getGeom().getObj(0).getWires()[0];
    const t: ITopoTree = new TopoTree();

    if( (t.hasTopo(f1.getTopoPath()) === true || t.hasTopo(f2.getTopoPath()) === true
        || t.hasTopo(f3.getTopoPath()) === true || t.hasTopo(w1.getTopoPath()) === true)) {
        return false;
    }
    [f1,f2,f3,w1].forEach((v) => t.addTopo(v.getTopoPath()));
    if( !(t.hasTopo(f1.getTopoPath()) === true || t.hasTopo(f2.getTopoPath()) === true
        || t.hasTopo(f3.getTopoPath()) === true || t.hasTopo(w1.getTopoPath()) === true)) {
        return false;
    }
    return true;
}

export function test_TopoTree_addTopo(): boolean {
    const m: Model = new Model(td.open_box());
    const g: ifs.IGroup = m.addGroup("Box");
    const t: ITopoTree = new TopoTree();
    const f1: ifs.IFace = m.getGeom().getObj(0).getFaces()[0];
    if(t.hasTopo(f1.getTopoPath()) === true) {return false;}
    t.addTopo(f1.getTopoPath());
    if(!(t.hasTopo(f1.getTopoPath()) === true)) {return false;}
    return true;
}

export function test_TopoTree_removeTopo2(): boolean {
    const m: Model = new Model(td.open_box());
    const g: ifs.IGroup = m.addGroup("Box");
    const t: ITopoTree = new TopoTree();
    const f1: ifs.IFace = m.getGeom().getObj(0).getFaces()[0];
    if(t.hasTopo(f1.getTopoPath()) === true) {return false;}
    t.addTopo(f1.getTopoPath());
    if(!(t.hasTopo(f1.getTopoPath()) === true)) {return false;}
    t.removeTopo(f1.getTopoPath());
    if(t.hasTopo(f1.getTopoPath()) === true) {return false;}
    return true;
}

export function test_TopoTree_getTopos2(): boolean {
    const MD1: Model = new Model(td.open_box());
    const G1: ifs.IGroup = MD1.addGroup("Box");
    const T1: ITopoTree = new TopoTree();
    const MD2: Model = new Model(td.open_box());
    const G2: ifs.IGroup = MD1.addGroup("Box");
    const T2: ITopoTree = new TopoTree();
    const f1: ifs.IFace = MD1.getGeom().getObj(0).getFaces()[0];
    const f2: ifs.IFace = MD1.getGeom().getObj(0).getFaces()[1];
    const f3: ifs.IFace = MD1.getGeom().getObj(0).getFaces()[2];
    const f4: ifs.IFace = MD1.getGeom().getObj(0).getFaces()[3];
    const f5: ifs.IFace = MD1.getGeom().getObj(0).getFaces()[4];
    T1.addTopo(f1.getTopoPath());
    T1.addTopo(f2.getTopoPath());
    T1.addTopo(f3.getTopoPath());
    T1.addTopo(f4.getTopoPath());
    T1.addTopo(f5.getTopoPath());
    for(let k = 0 ; k < T1.getTopos().length ; k++) {T2.addTopo(T1.getTopos()[k]);}
    if( !(
        T2.hasTopo(f1.getTopoPath()) &&
        T2.hasTopo(f2.getTopoPath()) &&
        T2.hasTopo(f3.getTopoPath()) &&
        T2.hasTopo(f4.getTopoPath()) &&
        T2.hasTopo(f5.getTopoPath()))) {
        return false;
    }
    return true;
}

export function test_TopoTree_toArray2(): boolean {
    const m: Model = new Model(td.open_box());
    const g: ifs.IGroup = m.addGroup("Box");
    const t: ITopoTree = new TopoTree();
    const f1: ifs.IFace = m.getGeom().getObj(0).getFaces()[0];
    const f1_e1: ifs.IEdge = f1.getEdges()[0];
    const f1_v1: ifs.IVertex = f1.getVertices()[0];
    const w1: ifs.IWire = m.getGeom().getObj(0).getWires()[0];
    const w1_e1: ifs.IEdge = w1.getEdges()[0];
    const w1_v1: ifs.IVertex = w1.getVertices()[0];
    if(!(Arr.equal(t.toArray()[0],[]) && Arr.equal(t.toArray()[1],[]) && Arr.equal(t.toArray()[2],[])
    && Arr.equal(t.toArray()[3],[]) && Arr.equal(t.toArray()[4],[]) &&Arr.equal(t.toArray()[5],[]))) {
        return false;
    }
    t.addTopo(f1.getTopoPath());
    if(!(!Arr.equal(t.toArray()[0],[]) && Arr.equal(t.toArray()[1],[]) && Arr.equal(t.toArray()[2],[])
    && Arr.equal(t.toArray()[3],[]) && Arr.equal(t.toArray()[4],[]) &&Arr.equal(t.toArray()[5],[]))) {
        return false;
    }
    t.addTopo(w1.getTopoPath());
    if(!(!Arr.equal(t.toArray()[0],[]) && !Arr.equal(t.toArray()[1],[]) && Arr.equal(t.toArray()[2],[])
    && Arr.equal(t.toArray()[3],[]) && Arr.equal(t.toArray()[4],[]) &&Arr.equal(t.toArray()[5],[]))) {
        return false;
    }
    t.addTopo(f1_e1.getTopoPath());
    if(!(!Arr.equal(t.toArray()[0],[]) && !Arr.equal(t.toArray()[1],[]) && !Arr.equal(t.toArray()[2],[])
    && Arr.equal(t.toArray()[3],[]) && Arr.equal(t.toArray()[4],[]) &&Arr.equal(t.toArray()[5],[]))) {
        return false;
    }
    t.addTopo(f1_v1.getTopoPath());
    if(!(!Arr.equal(t.toArray()[0],[]) && !Arr.equal(t.toArray()[1],[]) && !Arr.equal(t.toArray()[2],[])
    && !Arr.equal(t.toArray()[3],[]) && Arr.equal(t.toArray()[4],[]) &&Arr.equal(t.toArray()[5],[]))) {
        return false;
    }
    t.addTopo(w1_e1.getTopoPath());
    if(!(!Arr.equal(t.toArray()[0],[]) && !Arr.equal(t.toArray()[1],[]) && !Arr.equal(t.toArray()[2],[])
    && !Arr.equal(t.toArray()[3],[]) && !Arr.equal(t.toArray()[4],[]) &&Arr.equal(t.toArray()[5],[]))) {
        return false;
    }
    t.addTopo(w1_v1.getTopoPath());
    if((Arr.equal(t.toArray()[0],[]) && Arr.equal(t.toArray()[1],[]) && Arr.equal(t.toArray()[2],[])
    && Arr.equal(t.toArray()[3],[]) && Arr.equal(t.toArray()[4],[]) &&Arr.equal(t.toArray()[5],[]))) {
        return false;
    }
    return true;
}

export function test_TopoTree_fromArray2(): boolean {
    const m: Model = new Model(td.open_box());
    const g: ifs.IGroup = m.addGroup("Box");
    const t: ITopoTree = new TopoTree();
    const f1: ifs.IFace = m.getGeom().getObj(0).getFaces()[0];
    const f1_e1: ifs.IEdge = f1.getEdges()[0];
    const f1_v1: ifs.IVertex = f1.getVertices()[0];
    const w1: ifs.IWire = m.getGeom().getObj(0).getWires()[0];
    const w1_e1: ifs.IEdge = w1.getEdges()[0];
    const w1_v1: ifs.IVertex = w1.getVertices()[0];
    t.addTopo(f1.getTopoPath());
    t.addTopo(w1.getTopoPath());
    t.addTopo(f1_e1.getTopoPath());
    t.addTopo(f1_v1.getTopoPath());
    t.addTopo(w1_e1.getTopoPath());
    t.addTopo(w1_v1.getTopoPath());
    const m2: Model = new Model(td.open_box());
    const g2: ifs.IGroup = m2.addGroup("Box");
    const t2: ITopoTree = new TopoTree();
    t2.fromArray(t.toArray());
    if(!(g2.hasTopo(f1) && g2.hasTopo(w1) &&
        g2.hasTopo(f1_e1) && g2.hasTopo(f1_v1) &&
        g2.hasTopo(w1_e1) && g2.hasTopo(w1_v1)) ) {return false;}
    return true;
}

export function test_TopoTree_removeTopo(): boolean {
    const m: Model = new Model(td.open_box());
    const g: ifs.IGroup = m.addGroup("Box");
    const t: ITopoTree = new TopoTree();
    const f1: ifs.IFace = m.getGeom().getObj(0).getFaces()[0];
    if (t.hasTopo(f1.getTopoPath()) === true) {return false; }
    t.addTopo(f1.getTopoPath());
    if (!(t.hasTopo(f1.getTopoPath()) === true)) {return false; }
    t.removeTopo(f1.getTopoPath());
    if (t.hasTopo(f1.getTopoPath()) === true) {return false; }
    return true;
}

export function test_TopoTree_getTopos(): boolean {
    const MD1: Model = new Model(td.open_box());
    const G1: ifs.IGroup = MD1.addGroup("Box");
    const T1: ITopoTree = new TopoTree();
    const MD2: Model = new Model(td.open_box());
    const G2: ifs.IGroup = MD1.addGroup("Box");
    const T2: ITopoTree = new TopoTree();
    const f1: ifs.IFace = MD1.getGeom().getObj(0).getFaces()[0];
    const f2: ifs.IFace = MD1.getGeom().getObj(0).getFaces()[1];
    const f3: ifs.IFace = MD1.getGeom().getObj(0).getFaces()[2];
    const f4: ifs.IFace = MD1.getGeom().getObj(0).getFaces()[3];
    const f5: ifs.IFace = MD1.getGeom().getObj(0).getFaces()[4];
    T1.addTopo(f1.getTopoPath());
    T1.addTopo(f2.getTopoPath());
    T1.addTopo(f3.getTopoPath());
    T1.addTopo(f4.getTopoPath());
    T1.addTopo(f5.getTopoPath());
    for (let k = 0; k < T1.getTopos().length; k++) {T2.addTopo(T1.getTopos()[k]);}
    if (!(
        T2.hasTopo(f1.getTopoPath()) &&
        T2.hasTopo(f2.getTopoPath()) &&
        T2.hasTopo(f3.getTopoPath()) &&
        T2.hasTopo(f4.getTopoPath()) &&
        T2.hasTopo(f5.getTopoPath()))) {return false;}
    return true;
}

// export function test_TopoTree_toArray(): boolean {
//     const m: Model = new Model(td.open_box());
//     const g: ifs.IGroup = m.addGroup("Box");
//     const t: ITopoTree = g.getTopoTree();
//     const f1: ifs.IFace = m.getGeom().getObj(0).getFaces()[0];
//     const f1_e1: ifs.IEdge = f1.getEdges()[0];
//     const f1_v1: ifs.IVertex = f1.getVertices()[0];
//     const w1: ifs.IWire = m.getGeom().getObj(0).getWires()[0];
//     const w1_e1: ifs.IEdge = w1.getEdges()[0];
//     const w1_v1: ifs.IVertex = w1.getVertices()[0];
//     if (!( Arr.equal(t.toArray()[0], [])
//         && Arr.equal(t.toArray()[1], [])
//         && Arr.equal(t.toArray()[2], [])
//         && Arr.equal(t.toArray()[3], [])
//         && Arr.equal(t.toArray()[4], [])
//         && Arr.equal(t.toArray()[5], []))) {return false; }
//     t.addTopo(f1);
//     if (!(!Arr.equal(t.toArray()[0], [])
//         && Arr.equal(t.toArray()[1], [])
//         && Arr.equal(t.toArray()[2], [])
//         && Arr.equal(t.toArray()[3], [])
//         && Arr.equal(t.toArray()[4], [])
//         && Arr.equal(t.toArray()[5], []))) {return false; }
//     t.addTopo(w1);
//     if (!( !Arr.equal(t.toArray()[0], [])
//         && !Arr.equal(t.toArray()[1], [])
//         && Arr.equal(t.toArray()[2], [])
//         && Arr.equal(t.toArray()[3], [])
//         && Arr.equal(t.toArray()[4], [])
//         && Arr.equal(t.toArray()[5], []))) {return false; }
//     t.addTopo(f1_e1);
//     if (!( !Arr.equal(t.toArray()[0], [])
//         && !Arr.equal(t.toArray()[1], [])
//         && !Arr.equal(t.toArray()[2], [])
//         && Arr.equal(t.toArray()[3], [])
//         && Arr.equal(t.toArray()[4], [])
//         && Arr.equal(t.toArray()[5], []))) {return false; }
//     t.addTopo(f1_v1);
//     if (!( !Arr.equal(t.toArray()[0], [])
//         && !Arr.equal(t.toArray()[1], [])
//         && !Arr.equal(t.toArray()[2], [])
//         && !Arr.equal(t.toArray()[3], [])
//         && Arr.equal(t.toArray()[4], [])
//         && Arr.equal(t.toArray()[5], []))) {return false; }
//     t.addTopo(w1_e1);
//     if (!( !Arr.equal(t.toArray()[0], [])
//         && !Arr.equal(t.toArray()[1], [])
//         && !Arr.equal(t.toArray()[2], [])
//         && !Arr.equal(t.toArray()[3], [])
//         && !Arr.equal(t.toArray()[4], [])
//         && Arr.equal(t.toArray()[5], []))) {return false; }
//     t.addTopo(w1_v1);
//     if ((  Arr.equal(t.toArray()[0], [])
//         && Arr.equal(t.toArray()[1], [])
//         && Arr.equal(t.toArray()[2], [])
//         && Arr.equal(t.toArray()[3], [])
//         && Arr.equal(t.toArray()[4], [])
//         && Arr.equal(t.toArray()[5], []))) { return false; }
//     return true;
// }

// export function test_TopoTree_fromArray(): boolean {
//     const m: Model = new Model(td.open_box());
//     const g: ifs.IGroup = m.addGroup("Box");
//     const t: ITopoTree = g.getTopoTree();
//     const f1: ifs.IFace = m.getGeom().getObj(0).getFaces()[0];
//     const f1_e1: ifs.IEdge = f1.getEdges()[0];
//     const f1_v1: ifs.IVertex = f1.getVertices()[0];
//     const w1: ifs.IWire = m.getGeom().getObj(0).getWires()[0];
//     const w1_e1: ifs.IEdge = w1.getEdges()[0];
//     const w1_v1: ifs.IVertex = w1.getVertices()[0];
//     t.addTopo(f1);
//     t.addTopo(w1);
//     t.addTopo(f1_e1);
//     t.addTopo(f1_v1);
//     t.addTopo(w1_e1);
//     t.addTopo(w1_v1);
//     const m2: Model = new Model(td.open_box());
//     const g2: ifs.IGroup = m2.addGroup("Box");
//     g2.getTopoTree().fromArray(t.toArray());
//     if ( !(g2.hasTopo(f1) && g2.hasTopo(w1) && g2.hasTopo(f1_e1) && g2.hasTopo(f1_v1)
//         && g2.hasTopo(w1_e1) && g2.hasTopo(w1_v1)) ) {return false; }
//     return true;
// }

// Branch not tested for now
// // Tests for Class TopoTreeBranch
// export function test_TopoTreeBranch_constructor(): boolean {
//         let m: Model = new Model(td.open_box());
//             let g: ifs.IGroup = m.addGroup("Box");
//                 let t: ITopoTree = g.getTopoTree();
//         let f1: ifs.IFace = m.getGeom().getObj(0).getFaces()[0];
//             let f1_e1: ifs.IEdge = f1.getEdges()[0];
//                 let f1_v1: ifs.IVertex = f1.getVertices()[0];
//         let w1: ifs.IWire = m.getGeom().getObj(0).getWires()[0];
//             let w1_e1: ifs.IEdge = w1.getEdges()[0];
//                 let w1_v1: ifs.IVertex = w1.getVertices()[0];
//         t.addTopo(f1);
//             t.addTopo(w1);
//         // let TB1: TTree2Data = t.getTreeBranch2(t.toArray()[0]);

//                 // t.addTopo(f1_e1);
//                 //     t.addTopo(f1_v1);
//                 //         t.addTopo(w1_e1);
//                 //             t.addTopo(w1_v1);
// //         console.log(t.toArray()[0]);
//     return true; }

// // No testing for Branch2
// export function test_TopoTreeBranch_has(): boolean {return true; }
// export function test_TopoTreeBranch_add(): boolean {return true; }
// export function test_TopoTreeBranch_remove(): boolean {return true; }
// export function test_TopoTreeBranch_toPaths(): boolean {return true; }
// export function test_TopoTreeBranch_toArray(): boolean {return true; }
// export function test_TopoTreeBranch_fromArray(): boolean {return true; }

// // Tests for Class Branch3
// export function test_SubtopoTreeBranch_constructor(): boolean {return true; }
// export function test_SubtopoTreeBranch_has(): boolean {return true; }
// export function test_SubtopoTreeBranch_add(): boolean {return true; }
// export function test_SubtopoTreeBranch_remove(): boolean {return true; }
// export function test_SubtopoTreeBranch_toPaths(): boolean {return true; }
// export function test_SubtopoTreeBranch_toArray(): boolean {return true; }
// export function test_SubtopoTreeBranch_fromArray(): boolean {return true; }
