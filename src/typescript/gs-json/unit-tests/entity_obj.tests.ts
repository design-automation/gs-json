import {} from "jasmine";
import * as entity_obj_tests from "../utils/entity_obj_tests";

describe("Tests for Obj class", () => {
    it("test_obj_getGeomType", () => {
        expect( entity_obj_tests.test_obj_getGeomType() ).toBe(true);
    });
    it("test_obj_getObjType", () => {
        expect( entity_obj_tests.test_obj_getObjType() ).toBe(true);
    });
    it("test_obj_getPoints", () => {
        expect( entity_obj_tests.test_obj_getPoints() ).toBe(true);
    });
    it("test_obj_getVertices", () => {
        expect( entity_obj_tests.test_obj_getVertices() ).toBe(true);
    });
    it("test_obj_getEdges", () => {
        expect( entity_obj_tests.test_obj_getEdges() ).toBe(true);
    });
    it("test_obj_getWires", () => {
        expect( entity_obj_tests.test_obj_getWires() ).toBe(true);
    });
    it("test_obj_getFaces", () => {
        expect( entity_obj_tests.test_obj_getFaces() ).toBe(true);
    });
});
