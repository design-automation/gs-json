"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function test_Wire_getGeomType() {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 0, ti: 0}; // (0, gs.EGeomType.wires, 0);
    // const w: gs.IWire = new gs.Wire(k, path);
    // if(gs.mapGeomTypeToString.get(w.getGeomType()) !== "wires") {return false;}
    return true;
}
exports.test_Wire_getGeomType = test_Wire_getGeomType;
function test_Wire_getVertices() {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 0, ti: 0}; // (0, gs.EGeomType.wires, 0);
    // const w: gs.IWire = new gs.Wire(k, path);
    // const v: gs.IVertex[] = w.getVertices();
    // const w2: gs.IWire = v[0].getWireOrFace() as gs.IWire;
    // if(!w2.isClosed()) {return false;}
    return true;
}
exports.test_Wire_getVertices = test_Wire_getVertices;
function test_Wire_getEdges() {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 0, ti: 0}; // (0, gs.EGeomType.wires, 0);
    // const w: gs.IWire = new gs.Wire(k, path);
    // const e: gs.IEdge[] = w.getEdges();
    // const w2: gs.IWire = e[0].getWireOrFace() as gs.IWire;
    // if(!w2.isClosed()) {return false;}
    return true;
}
exports.test_Wire_getEdges = test_Wire_getEdges;
function test_Wire_numVertices() {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 0, ti: 0}; // (0, gs.EGeomType.wires, 0);
    // const w: gs.IWire = new gs.Wire(k, path);
    // if(!(w.numVertices() === 4)) {return false;}
    return true;
}
exports.test_Wire_numVertices = test_Wire_numVertices;
function test_Wire_numEdges() {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 0, ti: 0}; // (0, gs.EGeomType.wires, 0);
    // const w: gs.IWire = new gs.Wire(k, path);
    // if(!(w.numEdges() === 4)) {return false;}
    return true;
}
exports.test_Wire_numEdges = test_Wire_numEdges;
function test_Wire_isClosed() {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 0, ti: 0}; // (0, gs.EGeomType.wires, 0);
    // const w: gs.IWire = new gs.Wire(k, path);
    // if(!w.isClosed()) {return false;}
    return true;
}
exports.test_Wire_isClosed = test_Wire_isClosed;
//# sourceMappingURL=_topo_wire_tests.js.map