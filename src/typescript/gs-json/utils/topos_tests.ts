import * as gs from "./gs-json";
import * as td from "./test_data";

export function test_Topo_constructor(): boolean {
    return true;
}

export function test_Topo_getObjID(): boolean {
    return true;
}

export function test_Topo_getGeom(): boolean {
    return true;
}

export function test_Topo_getModel(): boolean {
    return true;
}

// export function test_Topo_getGeomType(): boolean { // This method cannot be tested.
//     return true;
// }

export function test_Topo_getAttribNames(): boolean {
    return true;
}

export function test_Topo_getAttribValue(): boolean {
    return true;
}

export function test_Topo_setAttribValue(): boolean {
    return true;
}

export function test_Topo_getGroupNames(): boolean {
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
    return true;
}
export function test_Edge_getVertices(): boolean {
    return true;
}
export function test_Edge_getWireOrFace(): boolean {
    return true;
}
export function test_Edge_next(): boolean {
    return true;
}
export function test_Edge_previous(): boolean {
    return true;
}
export function test_Edge_edgesSharedPoints(): boolean {
    return true;
}

// Wire
export function test_Wire_getGeomType(): boolean {
    return true;
}
export function test_Wire_getVertices(): boolean {
    return true;
}
export function test_Wire_getEdges(): boolean {
    return true;
}
export function test_Wire_numVertices(): boolean {
    return true;
}
export function test_Wire_numEdges(): boolean {
    return true;
}
export function test_Wire_isClosed(): boolean {
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
