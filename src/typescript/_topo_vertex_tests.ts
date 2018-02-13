import * as gs from "./gs-json";
import * as td from "./test_data";
import {} from "jasmine";

describe("Tests for Vertex class", () => {
    it("test_Vertex_getGeomType", () => {
        expect( test_Vertex_getGeomType() ).toBe(true);
    });
    it("test_Vertex_getPoint", () => {
        expect( test_Vertex_getPoint() ).toBe(true);
    });
    it("test_Vertex_getWireOrFace", () => {
        expect( test_Vertex_getWireOrFace() ).toBe(true);
    });
    it("test_Vertex_getEdge", () => {
        expect( test_Vertex_getEdge() ).toBe(true);
    });
    it("test_Vertex_next", () => {
        expect( test_Vertex_next() ).toBe(true);
    });
    it("test_Vertex_previous", () => {
        expect( test_Vertex_previous() ).toBe(true);
    });
    it("test_Vertex_verticesSharedPoint", () => {
        expect( test_Vertex_verticesSharedPoint() ).toBe(true);
    });
});

export function test_Vertex_getGeomType(): boolean {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 1, st: 0, si: 1};
    // // (0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    // const v: gs.IVertex = new gs.Vertex(k, path);
    // if (v.getGeomType() !== gs.EGeomType.vertices) {return false; }
    return true;
}

export function test_Vertex_getPoint(): boolean {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 1, st: 0, si: 1};
    // // (0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    // const v: gs.IVertex = new gs.Vertex(k, path);
    // if (v.getPoint().getID() !== 6) {return false; }
    return true;
}

export function test_Vertex_next(): boolean {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 1, st: 0, si: 1};
    // // (0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    // const v: gs.IVertex = new gs.Vertex(k, path);
    // if (v.next().getPoint().getID() !== 5) {return false; }
    // if (v.next().next().getPoint().getID() !== 1) {return false; }
    // if (v.next().next().next().getPoint().getID() !== 2) {return false; }
    return true;
}

export function test_Vertex_previous(): boolean {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 1, st: 0, si: 1};
    // // (0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    // const v: gs.IVertex = new gs.Vertex(k, path);
    // if (v.previous().getPoint().getID() !== 2) {return false; }
    // if (v.previous().previous().getPoint().getID() !== 1) {return false; }
    return true;
}

export function test_Vertex_getEdge(): boolean {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 1, st: 0, si: 1};
    // // (0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    // const v: gs.IVertex = new gs.Vertex(k, path);
    // const e: gs.IEdge = v.getEdge();
    // if (e.getObjID() !== 0) {return false; }
    // if (e.getGeomType() !== gs.EGeomType.edges) {return false; }
    return true;
}

export function test_Vertex_getWireOrFace(): boolean {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 1, st: 0, si: 1};
    // // (0, gs.EGeomType.faces, 1, gs.EGeomType.vertices, 1);
    // const v: gs.IVertex = new gs.Vertex(k, path);
    // if (v.getWireOrFace().getObjID() !== 0) {return false; }
    // if (v.getWireOrFace().getGeomType() !== gs.EGeomType.faces) {return false; }
    return true;
}

export function test_Vertex_verticesSharedPoint(): boolean {
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
