import * as gs from "./gs-json";
import * as td from "./test_data";

export function test_Edge_getGeomType(): boolean {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 1, st: 0, si: 1};
    // // (0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    // const v: gs.IVertex = new gs.Vertex(k, path);
    // const e: gs.IEdge = v.getEdge();
    // if(!(e.getGeomType() === gs.EGeomType.edges)) {return false;}
    return true;
}

export function test_Edge_getVertices(): boolean {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 1, st: 0, si: 1};
    // // (0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    // const v: gs.IVertex = new gs.Vertex(k, path);
    // const e: gs.IEdge = v.getEdge();
    // if (e.getVertices().length !== 2) {return false; }
    return true;
}

export function test_Edge_getWireOrFace(): boolean {
    // const k: Kernel = new Kernel(td.open_box());
    // const path1: gs.ITopoPathData = {id: 0, tt: 1, ti: 1, st: 1, si: 0};
    // // (0, gs.EGeomType.faces, 1, gs.EGeomType.edges, 0);
    // const e1: gs.IEdge = new gs.Edge(k, path1);
    // const path2: gs.ITopoPathData = {id: 0, tt: 0, ti: 0, st: 1, si: 0};
    // // (0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 0);
    // const e2: gs.IEdge = new gs.Edge(k, path2);
    // if(gs.mapGeomTypeToString.get(e1.getWireOrFace().getGeomType()) !== "faces") {return false;}
    // if(gs.mapGeomTypeToString.get(e2.getWireOrFace().getGeomType()) !== "wires") {return false;}
    return true;
}

export function test_Edge_next(): boolean {

    // TODO

    // const k: Kernel = new Kernel(td.open_box());
    // const e_f1: gs.IEdge = new gs.Edge(k, new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0)).next()
    // const e_f2: gs.IEdge = new gs.Edge(k, new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 2)).next()
    // const e_f3: gs.IEdge = new gs.Edge(k, new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 3)).next()
    // if(!Arr.equal(m.getGeom().getObjData(e_f1.getTopoPath()),[5,4])){return false;}
    // if(!Arr.equal(m.getGeom().getObjData(e_f2.getTopoPath()),[0,1])){return false;}
    // if(!Arr.equal(m.getGeom().getObjData(e_f3.getTopoPath()),[1,5])){return false;}

    // const e_w1: gs.IEdge = new gs.Edge(k, new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 0)).next()
    // const e_w2: gs.IEdge = new gs.Edge(k, new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 2)).next()
    // const e_w3: gs.IEdge = new gs.Edge(k, new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 3)).next()
    // if(!Arr.equal(m.getGeom().getObjData(e_w1.getTopoPath()),[1,2])){return false;}
    // if(!Arr.equal(m.getGeom().getObjData(e_w2.getTopoPath()),[3,0])){return false;}
    // if(!Arr.equal(m.getGeom().getObjData(e_w3.getTopoPath()),[0,1])){return false;}

    // const k2: Kernel = new Kernel(td.Unclosed_with_groups());
    // const e2_f1: gs.IEdge = new gs.Edge(k2, new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 3)).next()
    // if(!Arr.equal(k2.getObjData(e2_f1.getTopoPath()),[1,5])){return false;}

    // Unclosed Wire, shows error if console.log() is released
    // (although e2_w1 is generated as a non existing edge, by constructor), OK
    // const e2_w1: gs.IEdge = new gs.Edge(k2, new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 4)).next()
    // // console.log(k2.getObjData(e2_w1.getTopoPath()))

    // const geom: gs.IGeom = m.getGeom();
    // const a1: gs.IObj = geom.getObj(0);
    // const path1: gs.ITopoPath = a1.getEdges()[0][0][0].getTopoPath();
    // console.log(geom.numTopos(gs.EGeomType.edges));
    // console.log(a1.getEdges()[0][0][0].getTopoPath());
    // console.log(a1.getEdges()[0][0][1].getTopoPath());
    // console.log(a1.getEdges()[0][0][2].getTopoPath());
    // if (!a1.getEdges()[0][0][1].next().getTopoPath()) {return false;}
    // if (!a1.getEdges()[0][0][0].next().getTopoPath()) {return false;}
    return true;
}

export function test_Edge_previous(): boolean {

    // TODO

    // const k: Kernel = new Kernel(td.open_box());
    // const e_f1: gs.IEdge = new gs.Edge(k, new gs.TopoPath(0,
    // gs.EGeomType.faces, 0, gs.EGeomType.edges, 0)).previous()
    // const e_f2: gs.IEdge = new gs.Edge(k, new gs.TopoPath(0,
    // gs.EGeomType.faces, 0, gs.EGeomType.edges, 1)).previous()
    // const e_f3: gs.IEdge = new gs.Edge(k, new gs.TopoPath(0,
    // gs.EGeomType.faces, 0, gs.EGeomType.edges, 3)).previous()

    // if(!Arr.equal(m.getGeom().getObjData(e_f1.getTopoPath()),[0,1])){return false;}
    // if(!Arr.equal(m.getGeom().getObjData(e_f2.getTopoPath()),[1,5])){return false;}
    // if(!Arr.equal(m.getGeom().getObjData(e_f3.getTopoPath()),[4,0])){return false;}

    // const e_w1: gs.IEdge = new gs.Edge(k, new gs.TopoPath(0, gs.EGeomType.wires, 0,
    // gs.EGeomType.edges, 0)).previous()
    // const e_w2: gs.IEdge = new gs.Edge(k, new gs.TopoPath(0, gs.EGeomType.wires, 0,
    // gs.EGeomType.edges, 2)).previous()
    // const e_w3: gs.IEdge = new gs.Edge(k, new gs.TopoPath(0, gs.EGeomType.wires, 0,
    // gs.EGeomType.edges, 3)).previous()
    // if(!Arr.equal(m.getGeom().getObjData(e_w1.getTopoPath()),[3,0])){return false;}
    // if(!Arr.equal(m.getGeom().getObjData(e_w2.getTopoPath()),[1,2])){return false;}
    // if(!Arr.equal(m.getGeom().getObjData(e_w3.getTopoPath()),[2,3])){return false;}

    // // Unclosed Wire, shows error if console.log() is released
    // (although e2_w1 is generated as a non existing edge, by constructor), OK
    // const k2: Kernel = new Kernel(td.Unclosed_with_groups());
    // const e2_w1: gs.IEdge = new gs.Edge(k2, new gs.TopoPath(0,
    // gs.EGeomType.wires, 0, gs.EGeomType.edges, 0)).previous()
    // // Console.log(k2.getObjData(e2_w1.getTopoPath()))

    // ////////////////////////
    // const a1: gs.IObj = m.getGeom().getObj(0);
    // const path1: gs.ITopoPath = a1.getEdges()[0][0][0].getTopoPath();

    // // console.log(geom.numTopos(gs.EGeomType.edges));
    // // console.log(a1.getEdges()[0][0][0].getTopoPath());
    // // console.log(a1.getEdges()[0][0][1].getTopoPath());
    // // console.log(a1.getEdges()[0][0][2].getTopoPath());

    // // console.log(a1.getEdges()[0][0][1])
    // // console.log(a1.getEdges()[0][0][1].previous())
    // // console.log(a1.getEdges()[0][0][1].previous().getTopoPath())
    // if (!a1.getEdges()[0][0][1].previous().getTopoPath()) {return false;}
    // if (!a1.getEdges()[0][0][0].previous().getTopoPath()) {return false;}
    return true;
}

export function test_Edge_edgesSharedPoints(): boolean {

    // TODO

    // const E1: gs.IEdge[][] = (new gs.Edge((new gs.Model(td.open_box())).getGeom(),
    // new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0))).edgesSharedPoints() ;
    // const E2: gs.IEdge[][] = (new gs.Edge((new gs.Model(td.open_box())).getGeom(),
    // new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 0))).edgesSharedPoints() ;
    // const E3: gs.IEdge[][] = (new gs.Edge((new gs.Model(td.open_box())).getGeom(),
    // new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 1))).edgesSharedPoints() ;
    // const E4: gs.IEdge[][] = (new gs.Edge((new gs.Model(td.open_box())).getGeom(),
    // new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 1))).edgesSharedPoints() ;

    // const E5: gs.IEdge[][] = (new gs.Edge((new gs.Model(td.Random_Closed())).getGeom(),
    // new gs.TopoPath(0, gs.EGeomType.faces, 4, gs.EGeomType.edges, 0))).edgesSharedPoints() ;
    // const E6: gs.IEdge[][] = (new gs.Edge((new gs.Model(td.Random_Closed())).getGeom(),
    // new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 4))).edgesSharedPoints() ;
    // const E7: gs.IEdge[][] = (new gs.Edge((new gs.Model(td.Random_Closed())).getGeom(),
    // new gs.TopoPath(0, gs.EGeomType.faces, 4, gs.EGeomType.edges, 4))).edgesSharedPoints() ;
    // const E8: gs.IEdge[][] = (new gs.Edge((new gs.Model(td.Random_Closed())).getGeom(),
    // new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 0))).edgesSharedPoints() ;

    // if(!((E1[0].length + E1[1].length) === 2)){return false;};
    // if(!((E2[0].length + E2[1].length) === 2)){return false;};
    // if(!((E3[0].length + E3[1].length) === 2)){return false;};
    // if(!((E4[0].length + E4[1].length) === 2)){return false;};
    // if(!((E5[0].length + E5[1].length) === 5)){return false;};
    // if(!((E6[0].length + E6[1].length) === 7)){return false;};
    // if(!((E7[0].length + E7[1].length) === 7)){return false;};
    // if(!((E8[0].length + E8[1].length) === 1)){return false;};

    return true;
}
