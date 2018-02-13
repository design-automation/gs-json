"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function test_Vertex_getGeomType() {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 1, st: 0, si: 1};
    // // (0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    // const v: gs.IVertex = new gs.Vertex(k, path);
    // if (v.getGeomType() !== gs.EGeomType.vertices) {return false; }
    return true;
}
exports.test_Vertex_getGeomType = test_Vertex_getGeomType;
function test_Vertex_getPoint() {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 1, st: 0, si: 1};
    // // (0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    // const v: gs.IVertex = new gs.Vertex(k, path);
    // if (v.getPoint().getID() !== 6) {return false; }
    return true;
}
exports.test_Vertex_getPoint = test_Vertex_getPoint;
function test_Vertex_next() {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 1, st: 0, si: 1};
    // // (0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    // const v: gs.IVertex = new gs.Vertex(k, path);
    // if (v.next().getPoint().getID() !== 5) {return false; }
    // if (v.next().next().getPoint().getID() !== 1) {return false; }
    // if (v.next().next().next().getPoint().getID() !== 2) {return false; }
    return true;
}
exports.test_Vertex_next = test_Vertex_next;
function test_Vertex_previous() {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 1, st: 0, si: 1};
    // // (0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    // const v: gs.IVertex = new gs.Vertex(k, path);
    // if (v.previous().getPoint().getID() !== 2) {return false; }
    // if (v.previous().previous().getPoint().getID() !== 1) {return false; }
    return true;
}
exports.test_Vertex_previous = test_Vertex_previous;
function test_Vertex_getEdge() {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 1, st: 0, si: 1};
    // // (0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    // const v: gs.IVertex = new gs.Vertex(k, path);
    // const e: gs.IEdge = v.getEdge();
    // if (e.getObjID() !== 0) {return false; }
    // if (e.getGeomType() !== gs.EGeomType.edges) {return false; }
    return true;
}
exports.test_Vertex_getEdge = test_Vertex_getEdge;
function test_Vertex_getWireOrFace() {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 1, st: 0, si: 1};
    // // (0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    // const v: gs.IVertex = new gs.Vertex(k, path);
    // if (v.getWireOrFace().getObjID() !== 0) {return false; }
    // if (v.getWireOrFace().getGeomType() !== gs.EGeomType.faces) {return false; }
    return true;
}
exports.test_Vertex_getWireOrFace = test_Vertex_getWireOrFace;
function test_Vertex_verticesSharedPoint() {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 1, st: 0, si: 1};
    // // (0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    // const v: gs.IVertex = new gs.Vertex(k, path);
    // let w_v: gs.IVertex[]; // vertices that belong to wires
    // let f_v: gs.IVertex[]; // vertices that belong to faces
    // [w_v, f_v] = v.verticesSharedPoint();
    // if (w_v.length !== 0) {return false;}
    // if (f_v.length !== 2) {return false;}
    return true;
}
exports.test_Vertex_verticesSharedPoint = test_Vertex_verticesSharedPoint;
//# sourceMappingURL=_topo_vertex_tests.js.map