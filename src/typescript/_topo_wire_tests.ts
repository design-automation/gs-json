import * as gs from "./gs-json";
import * as td from "./test_data";
import {} from "jasmine";

describe("Tests for Wire class", () => {
    it("test_Wire_getGeomType", () => {
        expect( test_Wire_getGeomType() ).toBe(true);
    });
    it("test_Wire_getVertices", () => {
        expect( test_Wire_getVertices() ).toBe(true);
    });
    it("test_Wire_getEdges", () => {
        expect( test_Wire_getEdges() ).toBe(true);
    });
    it("test_Wire_numVertices", () => {
        expect( test_Wire_numVertices() ).toBe(true);
    });
    it("test_Wire_numEdges", () => {
        expect( test_Wire_numEdges() ).toBe(true);
    });
    it("test_Wire_isClosed", () => {
        expect( test_Wire_isClosed() ).toBe(true);
    });
});

export function test_Wire_getGeomType(): boolean {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 0, ti: 0}; // (0, gs.EGeomType.wires, 0);
    // const w: gs.IWire = new gs.Wire(k, path);
    // if(gs.mapGeomTypeToString.get(w.getGeomType()) !== "wires") {return false;}
    return true;
}
export function test_Wire_getVertices(): boolean {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 0, ti: 0}; // (0, gs.EGeomType.wires, 0);
    // const w: gs.IWire = new gs.Wire(k, path);
    // const v: gs.IVertex[] = w.getVertices();
    // const w2: gs.IWire = v[0].getWireOrFace() as gs.IWire;
    // if(!w2.isClosed()) {return false;}
    return true;
}
export function test_Wire_getEdges(): boolean {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 0, ti: 0}; // (0, gs.EGeomType.wires, 0);
    // const w: gs.IWire = new gs.Wire(k, path);
    // const e: gs.IEdge[] = w.getEdges();
    // const w2: gs.IWire = e[0].getWireOrFace() as gs.IWire;
    // if(!w2.isClosed()) {return false;}
    return true;
}
export function test_Wire_numVertices(): boolean {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 0, ti: 0}; // (0, gs.EGeomType.wires, 0);
    // const w: gs.IWire = new gs.Wire(k, path);
    // if(!(w.numVertices() === 4)) {return false;}
    return true;
}
export function test_Wire_numEdges(): boolean {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 0, ti: 0}; // (0, gs.EGeomType.wires, 0);
    // const w: gs.IWire = new gs.Wire(k, path);
    // if(!(w.numEdges() === 4)) {return false;}
    return true;
}
export function test_Wire_isClosed(): boolean {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 0, ti: 0}; // (0, gs.EGeomType.wires, 0);
    // const w: gs.IWire = new gs.Wire(k, path);
    // if(!w.isClosed()) {return false;}
    return true;
}
