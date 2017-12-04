import {} from "jasmine";
import * as topos_tests from "../utils/topos_tests";

describe("Tests for Topo class", () => {
    it("test_Topo_constructor", () => {
        expect( topos_tests.test_Topo_constructor() ).toBe(true);
    });
    it("test_Topo_getObjID", () => {
        expect( topos_tests.test_Topo_getObjID() ).toBe(true);
    });
    it("test_Topo_getGeom", () => {
        expect( topos_tests.test_Topo_getGeom() ).toBe(true);
    });
    it("test_Topo_getModel", () => {
        expect( topos_tests.test_Topo_getModel() ).toBe(true);
    });
    // it('test_Topo_getGeomType', () => {
    //     expect( topos_tests.test_Topo_getGeomType() ).toBe(true);
    // });
    it("test_Topo_getAttribNames", () => {
        expect( topos_tests.test_Topo_getAttribNames() ).toBe(true);
    });
    it("test_Topo_getAttribValue", () => {
        expect( topos_tests.test_Topo_getAttribValue() ).toBe(true);
    });
    it("test_Topo_setAttribValue", () => {
        expect( topos_tests.test_Topo_setAttribValue() ).toBe(true);
    });
    it("test_Topo_getGroups", () => {
        expect( topos_tests.test_Topo_getGroups() ).toBe(true);
    });
});

describe("Tests for Vertex class", () => {
    it("test_Vertex_getGeomType", () => {
        expect( topos_tests.test_Vertex_getGeomType() ).toBe(true);
    });
    it("test_Vertex_getPoint", () => {
        expect( topos_tests.test_Vertex_getPoint() ).toBe(true);
    });
    it("test_Vertex_getWireOrFace", () => {
        expect( topos_tests.test_Vertex_getWireOrFace() ).toBe(true);
    });
    it("test_Vertex_getEdge", () => {
        expect( topos_tests.test_Vertex_getEdge() ).toBe(true);
    });
    it("test_Vertex_next", () => {
        expect( topos_tests.test_Vertex_next() ).toBe(true);
    });
    it("test_Vertex_previous", () => {
        expect( topos_tests.test_Vertex_previous() ).toBe(true);
    });
    it("test_Vertex_verticesSharedPoint", () => {
        expect( topos_tests.test_Vertex_verticesSharedPoint() ).toBe(true);
    });
    it("test_Vertex_verticesSamePosition", () => {
        expect( topos_tests.test_Vertex_verticesSamePosition() ).toBe(true);
    });
});

describe("Tests for Edge class", () => {
    it("test_Edge_getGeomType", () => {
        expect( topos_tests.test_Edge_getGeomType() ).toBe(true);
    });
    it("test_Edge_getVertices", () => {
        expect( topos_tests.test_Edge_getVertices() ).toBe(true);
    });
    it("test_Edge_getWireOrFace", () => {
        expect( topos_tests.test_Edge_getWireOrFace() ).toBe(true);
    });
    it("test_Edge_next", () => {
        expect( topos_tests.test_Edge_next() ).toBe(true);
    });
    it("test_Edge_previous", () => {
        expect( topos_tests.test_Edge_previous() ).toBe(true);
    });
    it("test_Edge_edgesSharedPoints", () => {
        expect( topos_tests.test_Edge_edgesSharedPoints() ).toBe(true);
    });
});

describe("Tests for Wire class", () => {
    it("test_Wire_getGeomType", () => {
        expect( topos_tests.test_Wire_getGeomType() ).toBe(true);
    });
    it("test_Wire_getVertices", () => {
        expect( topos_tests.test_Wire_getVertices() ).toBe(true);
    });
    it("test_Wire_getEdges", () => {
        expect( topos_tests.test_Wire_getEdges() ).toBe(true);
    });
    it("test_Wire_numVertices", () => {
        expect( topos_tests.test_Wire_numVertices() ).toBe(true);
    });
    it("test_Wire_numEdges", () => {
        expect( topos_tests.test_Wire_numEdges() ).toBe(true);
    });
    it("test_Wire_isClosed", () => {
        expect( topos_tests.test_Wire_isClosed() ).toBe(true);
    });
});

describe("Tests for Face class", () => {
    it("test_Face_getGeomType", () => {
        expect( topos_tests.test_Face_getGeomType() ).toBe(true);
    });
    it("test_Face_getVertices", () => {
        expect( topos_tests.test_Face_getVertices() ).toBe(true);
    });
    it("test_Face_getEdges", () => {
        expect( topos_tests.test_Face_getEdges() ).toBe(true);
    });
    it("test_Face_numVertices", () => {
        expect( topos_tests.test_Face_numVertices() ).toBe(true);
    });
    it("test_Face_numEdges", () => {
        expect( topos_tests.test_Face_numEdges() ).toBe(true);
    });
    it("test_Face_isClosed", () => {
        expect( topos_tests.test_Face_isClosed() ).toBe(true);
    });
    it("test_Face_facesSharedPoints", () => {
        expect( topos_tests.test_Face_facesSharedPoints() ).toBe(true);
    });
});

describe("Tests for TopoPath class", () => {
    it("test_TopoPath_constructor", () => {
        expect( topos_tests.test_TopoPath_constructor() ).toBe(true);
    });
    it("test_TopoPath_equals", () => {
        expect( topos_tests.test_TopoPath_equals() ).toBe(true);
    });
    it("test_TopoPath_equals", () => {
        expect( topos_tests.test_TopoPath_toString() ).toBe(true);
    });
});
