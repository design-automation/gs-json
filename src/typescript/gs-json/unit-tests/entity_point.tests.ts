import {} from "jasmine";
import * as entity_point_tests from "../utils/entity_point_tests";

describe("Tests for Point class", () => {
    it("test_point_getGeomType", () => {
        expect( entity_point_tests.test_point_getGeomType() ).toBe(true);
    });
    it("test_point_setPosition", () => {
        expect( entity_point_tests.test_point_setPosition() ).toBe(true);
    });
    it("test_point_getPosition", () => {
        expect( entity_point_tests.test_point_getPosition() ).toBe(true);
    });
    it("test_point_getVertices", () => {
    expect( entity_point_tests.test_point_getVertices() ).toBe(true);
    });
});
