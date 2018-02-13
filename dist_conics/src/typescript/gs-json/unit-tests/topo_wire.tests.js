"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topo_wire_tests = require("../_topo_wire_tests");
describe("Tests for Wire class", () => {
    it("test_Wire_getGeomType", () => {
        expect(topo_wire_tests.test_Wire_getGeomType()).toBe(true);
    });
    it("test_Wire_getVertices", () => {
        expect(topo_wire_tests.test_Wire_getVertices()).toBe(true);
    });
    it("test_Wire_getEdges", () => {
        expect(topo_wire_tests.test_Wire_getEdges()).toBe(true);
    });
    it("test_Wire_numVertices", () => {
        expect(topo_wire_tests.test_Wire_numVertices()).toBe(true);
    });
    it("test_Wire_numEdges", () => {
        expect(topo_wire_tests.test_Wire_numEdges()).toBe(true);
    });
    it("test_Wire_isClosed", () => {
        expect(topo_wire_tests.test_Wire_isClosed()).toBe(true);
    });
});
//# sourceMappingURL=topo_wire.tests.js.map