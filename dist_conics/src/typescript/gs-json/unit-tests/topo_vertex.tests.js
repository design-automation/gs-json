"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topo_vertex_tests = require("../_topo_vertex_tests");
describe("Tests for Vertex class", () => {
    it("test_Vertex_getGeomType", () => {
        expect(topo_vertex_tests.test_Vertex_getGeomType()).toBe(true);
    });
    it("test_Vertex_getPoint", () => {
        expect(topo_vertex_tests.test_Vertex_getPoint()).toBe(true);
    });
    it("test_Vertex_getWireOrFace", () => {
        expect(topo_vertex_tests.test_Vertex_getWireOrFace()).toBe(true);
    });
    it("test_Vertex_getEdge", () => {
        expect(topo_vertex_tests.test_Vertex_getEdge()).toBe(true);
    });
    it("test_Vertex_next", () => {
        expect(topo_vertex_tests.test_Vertex_next()).toBe(true);
    });
    it("test_Vertex_previous", () => {
        expect(topo_vertex_tests.test_Vertex_previous()).toBe(true);
    });
    it("test_Vertex_verticesSharedPoint", () => {
        expect(topo_vertex_tests.test_Vertex_verticesSharedPoint()).toBe(true);
    });
});
//# sourceMappingURL=topo_vertex.tests.js.map