import * as gs from "./gs-json";
import * as td from "./test_data";
import {mapGeomTypeToString} from "./enums";


export function test_Topo_constructor(): boolean {
    // the class is abstract
    return true;
}

export function test_Topo_getObjID(): boolean {
    //    let m:gs.Model = new gs.Model(td.open_box());
    //    let geom:gs.IGeom = m.getGeom();
    // // geom.getObjID()
    // let Wire1:gs.IWire = geom.getObjData(geom.getTopos(gs.EGeomType.wires)[0].getTopoPath()) ;
    // console.log(Wire1.getObjID());
    // let wire:gs.IWire = new Topo(geom,geom.getObjData(geom.getTopos(gs.EGeomType.wires)[0].getTopoPath()));
    return true;
}

export function test_Topo_getGeom(): boolean {
    return true;
}

export function test_Topo_getModel(): boolean {
    return true;
}

export function test_Topo_getAttribNames(): boolean {
    const m: gs.IModel = new gs.Model(td.open_box());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const path1: gs.ITopoPath = a1.getWires()[0].getTopoPath() ;

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

export function test_Topo_getGroupNames(): boolean {
 //    let m:gs.IModel = new gs.Model(td.box_with_groups());
 //    let geom:gs.IGeom = m.getGeom();
 //    let a1:gs.IObj = geom.getObj(0);
 //    let path1:gs.ITopoPath = a1.getFaces()[0].getTopoPath() ;
 //    if(!(geom.numTopos(gs.EGeomType.faces) == 6)){return false;}
 //    if(!(a1.getFaces()[0].getAttribValue("faces_id") == 0)){return false;}
    // a1.getFaces()[0].setAttribValue("faces_id",49)
    // if((a1.getFaces()[0].getAttribValue("faces_id") == 0)){return false;}
    // if(!(a1.getFaces()[0].getAttribValue("faces_id") == 49)){return false;}
    return true;
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
    if (w_v.length !== 0) {return false; }
    if (f_v.length !== 2) {return false; }
    return true;
}

export function test_Vertex_verticesSamePosition(): boolean {
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
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const path1: gs.ITopoPath = a1.getEdges()[0][0][0].getTopoPath();
    // console.log(geom.numTopos(gs.EGeomType.edges));
    // console.log(a1.getEdges()[0][0][0].getTopoPath());
    // console.log(a1.getEdges()[0][0][1].getTopoPath());
    // console.log(a1.getEdges()[0][0][2].getTopoPath());
    if (!a1.getEdges()[0][0][1].next().getTopoPath()) {return false;}
    if (!a1.getEdges()[0][0][0].next().getTopoPath()) {return false;}
    return true;
}

export function test_Edge_previous(): boolean {
    const m: gs.IModel = new gs.Model(td.open_box());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const path1: gs.ITopoPath = a1.getEdges()[0][0][0].getTopoPath();
    // console.log(geom.numTopos(gs.EGeomType.edges));
    // console.log(a1.getEdges()[0][0][0].getTopoPath());
    // console.log(a1.getEdges()[0][0][1].getTopoPath());
    // console.log(a1.getEdges()[0][0][2].getTopoPath());
    if (!a1.getEdges()[0][0][1].previous().getTopoPath()) {return false;}
    if (!a1.getEdges()[0][0][0].previous().getTopoPath()) {return false;}
    return true;
}

export function test_Edge_edgesSharedPoints(): boolean {
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
    return true;
}
export function test_Wire_getEdges(): boolean {
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
    return true;
}
export function test_Face_getVertices(): boolean {
    return true;
}
export function test_Face_getEdges(): boolean {
    return true;
}
export function test_Face_numVertices(): boolean {
    return true;
}
export function test_Face_numEdges(): boolean {
    return true;
}
export function test_Face_isClosed(): boolean {
    return true;
}
export function test_Face_facesSharedPoints(): boolean {
    return true;
}
export function test_TopoPath_constructor(): boolean {
    return true;
}
export function test_TopoPath_equals(): boolean {
    return true;
}
export function test_TopoPath_toString(): boolean {
    return true;
}
