import * as gs from "./gs-json";
import * as td from "./test_data";
import {mapGeomTypeToString} from "./enums";
import {Arr} from "./arr";

export function test_Topo_constructor(): boolean {
    const m:gs.IModel = new gs.Model(td.open_box());
    const path1: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0);
    const path2: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.vertices, 0);
    const path3: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 0);
    const path4: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.vertices, 0);
    // the Top class is abstract
    const f_e: gs.IEdge = new gs.Edge(m.getGeom(), path1)
    const f_v: gs.IVertex = new gs.Vertex(m.getGeom(), path2)
    const w_e: gs.IEdge = new gs.Edge(m.getGeom(), path3)
    const w_v: gs.IVertex = new gs.Vertex(m.getGeom(), path4)
    return true;
}

export function test_Topo_getObjID(): boolean {
    const m:gs.IModel = new gs.Model(td.open_box());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0);
    const e: gs.IEdge = new gs.Edge(m.getGeom(), path)
    if(e.getObjID() != 0){return false;}
    return true;
}

export function test_Topo_getGeom(): boolean {
    const m:gs.IModel = new gs.Model(td.open_box());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0);
    const e: gs.IEdge = new gs.Edge(m.getGeom(), path)
    if(!Arr.equal(e.getGeom().getPointIDs(),m.getGeom().getPointIDs())){return false;}
    return true;
}

export function test_Topo_getModel(): boolean {
    const m:gs.IModel = new gs.Model(td.open_box());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0);
    const e: gs.IEdge = new gs.Edge(m.getGeom(), path)
    if(!Arr.equal(e.getModel().getGeom().getPointIDs(),m.getGeom().getPointIDs())){return false;}
    return true;
}

export function test_Topo_getAttribNames(): boolean {
    const m: gs.IModel = new gs.Model(td.box_with_attribs());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0);
    const e: gs.IEdge = new gs.Edge(m.getGeom(), path)
    if(!Arr.equal(e.getAttribNames(),["edge_id"])){return false;}
//    const path1: gs.ITopoPath = a1.getWires()[0].getTopoPath() ;
    return true;
}

export function test_Topo_getAttribValue(): boolean {
    const m: gs.IModel = new gs.Model(td.box_with_attribs());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const path1: gs.ITopoPath = a1.getFaces()[0].getTopoPath() ;
    if(!(geom.numTopos(gs.EGeomType.faces) === 6)) {return false;}
    if(!(a1.getFaces()[0].getAttribValue("faces_id") === 0)) {return false;}
    return true;
}

export function test_Topo_setAttribValue(): boolean {
    const m: gs.IModel = new gs.Model(td.box_with_attribs());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const path1: gs.ITopoPath = a1.getFaces()[0].getTopoPath() ;
    if(!(geom.numTopos(gs.EGeomType.faces) === 6)) {return false;}
    if(!(a1.getFaces()[0].getAttribValue("faces_id") === 0)) {return false;}
    a1.getFaces()[0].setAttribValue("faces_id",49);
    if((a1.getFaces()[0].getAttribValue("faces_id") === 0)) {return false;}
    if(!(a1.getFaces()[0].getAttribValue("faces_id") === 49)) {return false;}
    return true;
}

export function test_Topo_getGroups(): boolean {
    let m:gs.IModel = new gs.Model(td.box_with_attribs());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.vertices, 0);
    const v: gs.IVertex = new gs.Vertex(m.getGeom(), path);
    if(v.getGroups() == []){return false;}
    const grp1: gs.IGroup = m.addGroup("test1");
    grp1.addObj(path.id)
    if(!(v.getGroups()[0].getName() == "test1")){return false;}
    return true;
 //    let geom:gs.IGeom = m.getGeom();
 //    let a1:gs.IObj = geom.getObj(0);
 //    let path1:gs.ITopoPath = a1.getFaces()[0].getTopoPath() ;
 //    if(!(geom.numTopos(gs.EGeomType.faces) == 6)){return false;}
 //    if(!(a1.getFaces()[0].getAttribValue("faces_id") == 0)){return false;}
    // a1.getFaces()[0].setAttribValue("faces_id",49)
    // if((a1.getFaces()[0].getAttribValue("faces_id") == 0)){return false;}
    // if(!(a1.getFaces()[0].getAttribValue("faces_id") == 49)){return false;}
}

// Vertex
export function test_Vertex_getGeomType(): boolean {
    const m: gs.IModel = new gs.Model(td.open_box());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    const v: gs.IVertex = new gs.Vertex(m.getGeom(), path);
    if (v.getGeomType() !== gs.EGeomType.vertices) {return false; }
    return true;
}

export function test_Vertex_getPoint(): boolean {
    const m: gs.IModel = new gs.Model(td.open_box());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    const v: gs.IVertex = new gs.Vertex(m.getGeom(), path);
    if (v.getPoint().getID() !== 6) {return false; }
    return true;
}

export function test_Vertex_next(): boolean {
    const m: gs.IModel = new gs.Model(td.open_box());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    const v: gs.IVertex = new gs.Vertex(m.getGeom(), path);
    if (v.next().getPoint().getID() !== 5) {return false; }
    if (v.next().next().getPoint().getID() !== 1) {return false; }
    if (v.next().next().next().getPoint().getID() !== 2) {return false; }
    return true;
}

export function test_Vertex_previous(): boolean {
    const m: gs.IModel = new gs.Model(td.open_box());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    const v: gs.IVertex = new gs.Vertex(m.getGeom(), path);
    if (v.previous().getPoint().getID() !== 2) {return false; }
    if (v.previous().previous().getPoint().getID() !== 1) {return false; }
    return true;
}

export function test_Vertex_getEdge(): boolean {
    const m: gs.IModel = new gs.Model(td.open_box());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    const v: gs.IVertex = new gs.Vertex(m.getGeom(), path);
    const e: gs.IEdge = v.getEdge();
    if (e.getObjID() !== 0) {return false; }
    if (e.getGeomType() !== gs.EGeomType.edges) {return false; }
    return true;
}

export function test_Vertex_getWireOrFace(): boolean {
    const m: gs.IModel = new gs.Model(td.open_box());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    const v: gs.IVertex = new gs.Vertex(m.getGeom(), path);
    if (v.getWireOrFace().getObjID() !== 0) {return false; }
    if (v.getWireOrFace().getGeomType() !== gs.EGeomType.faces) {return false; }
    return true;
}

export function test_Vertex_verticesSharedPoint(): boolean {
    const m: gs.IModel = new gs.Model(td.open_box());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    const v: gs.IVertex = new gs.Vertex(m.getGeom(), path);
    let w_v: gs.IVertex[]; // vertices that belong to wires
    let f_v: gs.IVertex[]; // vertices that belong to faces
    [w_v, f_v] = v.verticesSharedPoint();
    if (w_v.length !== 0) {return false;}
    if (f_v.length !== 2) {return false;}
    return true;
}

export function test_Vertex_verticesSamePosition(): boolean {
    const m: gs.IModel = new gs.Model(td.open_box());
    const path0: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.vertices, 0);
    const v0: gs.IVertex = new gs.Vertex(m.getGeom(), path0);
    if((v0.verticesSamePosition().length != 2)){return false;}
    const path1: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.vertices, 1);
    const v1: gs.IVertex = new gs.Vertex(m.getGeom(), path1);
    if((v1.verticesSamePosition().length != 2)){return false;}
    const path2: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.vertices, 2);
    const v2: gs.IVertex = new gs.Vertex(m.getGeom(), path2);
    if((v2.verticesSamePosition().length != 2)){return false;}
    const path3: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.vertices, 3);
    const v3: gs.IVertex = new gs.Vertex(m.getGeom(), path3);
    if((v3.verticesSamePosition().length != 2)){return false;}
    return true;
}

// Edge
export function test_Edge_getGeomType(): boolean {
    const m: gs.IModel = new gs.Model(td.open_box());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    const v: gs.IVertex = new gs.Vertex(m.getGeom(), path);
    const e: gs.IEdge = v.getEdge();
    if(!(e.getGeomType() == gs.EGeomType.edges)) {return false;}
    return true;
}

export function test_Edge_getVertices(): boolean {
    const m: gs.IModel = new gs.Model(td.open_box());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    const v: gs.IVertex = new gs.Vertex(m.getGeom(), path);
    const e: gs.IEdge = v.getEdge();
    if (e.getVertices().length !== 2) {return false; }
    return true;
}

export function test_Edge_getWireOrFace(): boolean {
    const m: gs.IModel = new gs.Model(td.open_box());
    const path1: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 1, gs.EGeomType.edges, 0);
    const e1: gs.IEdge = new gs.Edge(m.getGeom(), path1)
    const path2: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 0);
    const e2: gs.IEdge = new gs.Edge(m.getGeom(), path2)
    if(mapGeomTypeToString.get(e1.getWireOrFace().getGeomType()) !== "faces"){return false;}
    if(mapGeomTypeToString.get(e2.getWireOrFace().getGeomType()) !== "wires"){return false;}
    return true;
}

export function test_Edge_next(): boolean {
    const m: gs.IModel = new gs.Model(td.open_box());
    const e_f1: gs.IEdge = new gs.Edge(m.getGeom(), new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0)).next()
    const e_f2: gs.IEdge = new gs.Edge(m.getGeom(), new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 2)).next()
    const e_f3: gs.IEdge = new gs.Edge(m.getGeom(), new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 3)).next()
    if(!Arr.equal(m.getGeom().getObjData(e_f1.getTopoPath()),[5,4])){return false;}
    if(!Arr.equal(m.getGeom().getObjData(e_f2.getTopoPath()),[0,1])){return false;}
    if(!Arr.equal(m.getGeom().getObjData(e_f3.getTopoPath()),[1,5])){return false;}

    const e_w1: gs.IEdge = new gs.Edge(m.getGeom(), new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 0)).next()
    const e_w2: gs.IEdge = new gs.Edge(m.getGeom(), new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 2)).next()
    const e_w3: gs.IEdge = new gs.Edge(m.getGeom(), new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 3)).next()
    if(!Arr.equal(m.getGeom().getObjData(e_w1.getTopoPath()),[1,2])){return false;}
    if(!Arr.equal(m.getGeom().getObjData(e_w2.getTopoPath()),[3,0])){return false;}
    if(!Arr.equal(m.getGeom().getObjData(e_w3.getTopoPath()),[0,1])){return false;}

    const m2: gs.IModel = new gs.Model(td.Unclosed_Face_with_groups());
    const e2_f1: gs.IEdge = new gs.Edge(m2.getGeom(), new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 3)).next()
    if(!Arr.equal(m2.getGeom().getObjData(e2_f1.getTopoPath()),[1,5])){return false;}
    // A face is always closed, even if unspecified in the object face

    // Unclosed Wire, shows error if console.log() is released (although e2_w1 is generated as a non existing edge, by constructor), OK
    const e2_w1: gs.IEdge = new gs.Edge(m2.getGeom(), new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 4)).next()
    // console.log(m2.getGeom().getObjData(e2_w1.getTopoPath()))    




    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const path1: gs.ITopoPath = a1.getEdges()[0][0][0].getTopoPath();
    // console.log(geom.numTopos(gs.EGeomType.edges));
    // console.log(a1.getEdges()[0][0][0].getTopoPath());
    // console.log(a1.getEdges()[0][0][1].getTopoPath());
    // console.log(a1.getEdges()[0][0][2].getTopoPath());
    // if (!a1.getEdges()[0][0][1].next().getTopoPath()) {return false;}
    // if (!a1.getEdges()[0][0][0].next().getTopoPath()) {return false;}
    return true;
}

export function test_Edge_previous(): boolean {
    const m: gs.IModel = new gs.Model(td.open_box());
    const geom: gs.IGeom = m.getGeom();
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 0);
    const e1: gs.IEdge = new gs.Edge(m.getGeom(),path);
    const e2: gs.IEdge = e1.previous();
    const e3: gs.IEdge = e2.previous();
    const e4: gs.IEdge = e3.previous();
    const e5: gs.IEdge = e4.previous();
    const e6: gs.IEdge = e5.previous();
    const e7: gs.IEdge = e6.previous();
    const e8: gs.IEdge = e7.previous();
    const e9: gs.IEdge = e8.previous();

    // console.log(e1.getTopoPath());
    // console.log(e2.getTopoPath());
    // console.log(e3.getTopoPath());
    // console.log(e4.getTopoPath());
    // console.log(e5.getTopoPath());
    // console.log(e6.getTopoPath());
    // console.log(e7.getTopoPath());
    // console.log(e8.getTopoPath());
    // console.log(e9.getTopoPath());

    const a1: gs.IObj = geom.getObj(0);
    const path1: gs.ITopoPath = a1.getEdges()[0][0][0].getTopoPath();

    // console.log(geom.numTopos(gs.EGeomType.edges));
    // console.log(a1.getEdges()[0][0][0].getTopoPath());
    // console.log(a1.getEdges()[0][0][1].getTopoPath());
    // console.log(a1.getEdges()[0][0][2].getTopoPath());

    // console.log(a1.getEdges()[0][0][1])
    // console.log(a1.getEdges()[0][0][1].previous())
    // console.log(a1.getEdges()[0][0][1].previous().getTopoPath())
    if (!a1.getEdges()[0][0][1].previous().getTopoPath()) {return false;}
    if (!a1.getEdges()[0][0][0].previous().getTopoPath()) {return false;}
    return true;
}

export function test_Edge_edgesSharedPoints(): boolean { // To Do

    const m: gs.IModel = new gs.Model(td.open_box());
    const path0: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 0);
    const path1: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 1);
    const path2: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 2);
    const path3: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 3);

    // const e0: gs.IEdge = new gs.Edge(m.getGeom(), path0)
    // const e1: gs.IEdge = new gs.Edge(m.getGeom(), path1)
    // const e2: gs.IEdge = new gs.Edge(m.getGeom(), path2)
    // const e3: gs.IEdge = new gs.Edge(m.getGeom(), path3)

    const e: gs.ITopo[] = m.getGeom().getTopos(gs.EGeomType.edges)
    // console.log(e[0]);

    for (let k:number = 0 ; k<24 ; k++){
        let e1:gs.IEdge = e[0] ;
        // console.log(e[k].edgesSharedPoints())
    }

    // console.log(e0.edgesSharedPoints())
    // console.log(e1.edgesSharedPoints())
    // console.log(e2.edgesSharedPoints())
    // console.log(e3.edgesSharedPoints())

    // const path1: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0);
    // const path2: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 1, gs.EGeomType.edges, 0);
    // const path3: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 1);
    return true;
}

// Wire
export function test_Wire_getGeomType(): boolean {
    const m: gs.IModel = new gs.Model(td.open_box());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.wires, 0);
    const w: gs.IWire = new gs.Wire(m.getGeom(), path)
    if(mapGeomTypeToString.get(w.getGeomType()) !== "wires"){return false;}
    return true;
}
export function test_Wire_getVertices(): boolean {
    const m:gs.IModel = new gs.Model(td.open_box());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.wires, 0);
    const w: gs.IWire = new gs.Wire(m.getGeom(), path)
    const v: gs.IVertex[] = w.getVertices();
    const w2: gs.IWire = v[0].getWireOrFace();
    if(!w2.isClosed()){return false;}
    return true;
}
export function test_Wire_getEdges(): boolean {
    const m:gs.IModel = new gs.Model(td.open_box());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.wires, 0);
    const w: gs.IWire = new gs.Wire(m.getGeom(), path)
    const e: gs.IEdge[] = w.getEdges();
    const w2: gs.IWire = e[0].getWireOrFace();
    if(!w2.isClosed()){return false;}
    return true;
}
export function test_Wire_numVertices(): boolean {
    const m: gs.IModel = new gs.Model(td.open_box());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.wires, 0);
    const w: gs.IWire = new gs.Wire(m.getGeom(), path)
    if(w.numVertices() != 4){return false;}
    return true;
}
export function test_Wire_numEdges(): boolean {
    const m: gs.IModel = new gs.Model(td.open_box());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.wires, 0);
    const w: gs.IWire = new gs.Wire(m.getGeom(), path)
    if(w.numEdges() != 4){return false;}
    return true;
}
export function test_Wire_isClosed(): boolean {
    const m: gs.IModel = new gs.Model(td.open_box());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.wires, 0);
    const w: gs.IWire = new gs.Wire(m.getGeom(), path)
    if(!w.isClosed()){return false;}
    return true;
}

// Face
export function test_Face_getGeomType(): boolean {
    const m: gs.IModel = new gs.Model(td.open_box());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0);
    const f: gs.IFace = new gs.Face(m.getGeom(), path)
    if(mapGeomTypeToString.get(f.getGeomType()) !== "faces"){return false;}
    return true;
}
export function test_Face_getVertices(): boolean {
    const m: gs.IModel = new gs.Model(td.open_box());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0);
    const f: gs.IFace = new gs.Face(m.getGeom(), path)
    const v: gs.IVertex[] = f.getVertices();
    if(mapGeomTypeToString.get(v[0].getWireOrFace().getGeomType()) !== "faces"){return false;}
    if(mapGeomTypeToString.get(v[1].getWireOrFace().getGeomType()) !== "faces"){return false;}
    if(mapGeomTypeToString.get(v[2].getWireOrFace().getGeomType()) !== "faces"){return false;}
    if(mapGeomTypeToString.get(v[3].getWireOrFace().getGeomType()) !== "faces"){return false;}
    return true;
}
export function test_Face_getEdges(): boolean {
    const m: gs.IModel = new gs.Model(td.open_box());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0);
    const f: gs.IFace = new gs.Face(m.getGeom(), path)
    const e: gs.IEdge[] = f.getEdges();
    if(mapGeomTypeToString.get(e[0].getWireOrFace().getGeomType()) !== "faces"){return false;}
    if(mapGeomTypeToString.get(e[1].getWireOrFace().getGeomType()) !== "faces"){return false;}
    if(mapGeomTypeToString.get(e[2].getWireOrFace().getGeomType()) !== "faces"){return false;}
    if(mapGeomTypeToString.get(e[3].getWireOrFace().getGeomType()) !== "faces"){return false;}
    return true;
}
export function test_Face_numVertices(): boolean {
    const m: gs.IModel = new gs.Model(td.open_box());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0);
    const f: gs.IFace = new gs.Face(m.getGeom(), path)
    if(f.numVertices() != 4){return false;}
    return true;
}
export function test_Face_numEdges(): boolean {
    const m: gs.IModel = new gs.Model(td.open_box());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0);
    const f: gs.IFace = new gs.Face(m.getGeom(), path)
    if(f.numEdges() != 4){return false;}
    return true;
}
export function test_Face_isClosed(): boolean {
    const m: gs.IModel = new gs.Model(td.open_box());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0);
    const f: gs.IFace = new gs.Face(m.getGeom(), path)
    if(!f.isClosed()){return false;}    
    return true;
}
export function test_Face_facesSharedPoints(): boolean { // To Do
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0);
    if(path.toString() != "Obj: 0/faces: 0/edges: 0"){return false;}
    return true;
}

//////////////////////////////////////////////////////
export function test_TopoPath_constructor(): boolean {
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0);
    if(path.toString() != "Obj: 0/faces: 0/edges: 0"){return false;}
    return true;
}
export function test_TopoPath_equals(): boolean {
    const m: gs.IModel = new gs.Model(td.open_box());
    const path: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0);
    const e: gs.IEdge = new gs.Edge(m.getGeom(), path)
    const path1: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0);
    const path2: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 1, gs.EGeomType.edges, 0);
    const path3: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 1);
    const path4: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 1);
    if(!e.getTopoPath().equals(path1)){return false;}
    if(e.getTopoPath().equals(path2)){return false;}
    if(e.getTopoPath().equals(path3)){return false;}
    if(e.getTopoPath().equals(path4)){return false;}
    return true;
}
export function test_TopoPath_toString(): boolean {
    const path1: gs.ITopoPath = new gs.TopoPath(0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0);
    const path2: gs.ITopoPath = new gs.TopoPath(1, gs.EGeomType.wires, 4, gs.EGeomType.vertices, 9);
    if(path1.toString() != "Obj: 0/faces: 0/edges: 0"){return false;}
    if(path2.toString() != "Obj: 1/wires: 4/vertices: 9"){return false;}
    return true;
}