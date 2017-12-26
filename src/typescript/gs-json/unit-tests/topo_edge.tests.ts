import {} from "jasmine";
import * as topo_edge_tests from "../utils/topo_edge_tests";

describe("Tests for Edge class", () => {
    it("test_Edge_getGeomType", () => {
        expect( topo_edge_tests.test_Edge_getGeomType() ).toBe(true);
    });
    it("test_Edge_getVertices", () => {
        expect( topo_edge_tests.test_Edge_getVertices() ).toBe(true);
    });
    it("test_Edge_getWireOrFace", () => {
        expect( topo_edge_tests.test_Edge_getWireOrFace() ).toBe(true);
    });
    it("test_Edge_next", () => {
        expect( topo_edge_tests.test_Edge_next() ).toBe(true);
    });
    it("test_Edge_previous", () => {
        expect( topo_edge_tests.test_Edge_previous() ).toBe(true);
    });
    it("test_Edge_edgesSharedPoints", () => {
        expect( topo_edge_tests.test_Edge_edgesSharedPoints() ).toBe(true);
    });
});
