import * as gs from "./gs-json";
import * as td from "./test_data";
import {} from "jasmine";

describe("Tests for Topo class", () => {
    it("test_Topo_constructor", () => {
        expect( test_Topo_constructor() ).toBe(true);
    });
    it("test_Topo_getObjID", () => {
        expect( test_Topo_getObjID() ).toBe(true);
    });
    it("test_Topo_getGeom", () => {
        expect( test_Topo_getGeom() ).toBe(true);
    });
    it("test_Topo_getModel", () => {
        expect( test_Topo_getModel() ).toBe(true);
    });
    // it('test_Topo_getGeomType', () => {
    //     expect( test_Topo_getGeomType() ).toBe(true);
    // });
    it("test_Topo_getAttribNames", () => {
        expect( test_Topo_getAttribNames() ).toBe(true);
    });
    it("test_Topo_getAttribValue", () => {
        expect( test_Topo_getAttribValue() ).toBe(true);
    });
    it("test_Topo_setAttribValue", () => {
        expect( test_Topo_setAttribValue() ).toBe(true);
    });
    it("test_Topo_getGroups", () => {
        expect( test_Topo_getGroups() ).toBe(true);
    });
});

export function test_Topo_constructor(): boolean {
    // const k: Kernel = new Kernel(td.open_box());
    // const path1: gs.ITopoPathData = {id: 0, tt: 1, ti: 0, st: 1, si: 0};
    // // (0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0);
    // const path2: gs.ITopoPathData = {id: 0, tt: 1, ti: 0, st: 0, si: 0};
    // // (0, gs.EGeomType.faces, 0, gs.EGeomType.vertices, 0);
    // const path3: gs.ITopoPathData = {id: 0, tt: 0, ti: 0, st: 1, si: 0};
    // // (0, gs.EGeomType.wires, 0, gs.EGeomType.edges, 0);
    // const path4: gs.ITopoPathData = {id: 0, tt: 0, ti: 0, st: 0, si: 0};
    // // (0, gs.EGeomType.wires, 0, gs.EGeomType.vertices, 0);
    // // the Top class is abstract
    // const f_e: gs.IEdge = new gs.Edge(k, path1);
    // const f_v: gs.IVertex = new gs.Vertex(k, path2);
    // const w_e: gs.IEdge = new gs.Edge(k, path3);
    // const w_v: gs.IVertex = new gs.Vertex(k, path4);
    return true;
}

export function test_Topo_getObjID(): boolean {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 0, st: 1, si: 0};
    // // (0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0);
    // const e: gs.IEdge = new gs.Edge(k, path);
    // if(!(e.getObjID() === 0)) {return false;}
    return true;
}

export function test_Topo_getGeom(): boolean {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 0, st: 1, si: 0};
    // // (0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0);
    // const e: gs.IEdge = new gs.Edge(k, path);
    // // if(!Arr.equal(e.getGeom().getPointIDs(), m.getGeom().getPointIDs())){return false;}
    return true;
}

export function test_Topo_getModel(): boolean {
    // const k: Kernel = new Kernel(td.open_box());
    // const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 0, st: 1, si: 0};
    // // (0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0);
    // const e: gs.IEdge = new gs.Edge(k, path);
    // // if(!Arr.equal(e.getModel().getGeom().getPointIDs(), m.getGeom().getPointIDs())){return false;}
    return true;
}

export function test_Topo_getAttribNames(): boolean {
    // const k: Kernel = new Kernel(td.box_with_attribs());
    // const path: gs.ITopoPathData = {id: 0, tt: 1, ti: 0, st: 1, si: 0};
    // // (0, gs.EGeomType.faces, 0, gs.EGeomType.edges, 0);
    // const e: gs.IEdge = new gs.Edge(k, path);
    // if(!Arr.equal(e.getAttribNames(),["edge_id"])) {return false;}
    // // const path1: gs.ITopoPath = a1.getWires()[0].getTopoPath() ;
    return true;
}

export function test_Topo_getAttribValue(): boolean {
    const m: gs.IModel = new gs.Model(td.box_with_attribs());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const path1: gs.ITopoPathData = a1.getFaces()[0].getTopoPath() ;
    if(!(geom.numTopos(gs.EGeomType.faces) === 6)) {return false;}
    const faces_id: gs.ITopoAttrib = m.getTopoAttrib("faces_id", gs.EGeomType.faces);
    if(!(a1.getFaces()[0].getAttribValue(faces_id) === 0)) {return false;}
    return true;
}

export function test_Topo_setAttribValue(): boolean {
    const m: gs.IModel = new gs.Model(td.box_with_attribs());
    const geom: gs.IGeom = m.getGeom();
    const a1: gs.IObj = geom.getObj(0);
    const path1: gs.ITopoPathData = a1.getFaces()[0].getTopoPath() ;
    if(!(geom.numTopos(gs.EGeomType.faces) === 6)) {return false;}
    const faces_id: gs.ITopoAttrib = m.getTopoAttrib("faces_id", gs.EGeomType.faces);
    if(!(a1.getFaces()[0].getAttribValue(faces_id) === 0)) {return false;}
    a1.getFaces()[0].setAttribValue(faces_id,49);
    if((a1.getFaces()[0].getAttribValue(faces_id) === 0)) {return false;}
    if(!(a1.getFaces()[0].getAttribValue(faces_id) === 49)) {return false;}
    return true;
}

export function test_Topo_getGroups(): boolean {
    const m: gs.IModel = new gs.Model(td.box_with_attribs());
    const g: gs.IGeom = m.getGeom();
    const p: gs.IPolymesh = g.getObj(0) as gs.IPolymesh;

    // TODO

    return true;

}
