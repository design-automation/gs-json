import {} from "jasmine";
import * as entity_obj_plane_tests from "../_entity_obj_plane_tests";

describe("Tests for Plane class", () => {
    it("test_Plane_getCartesians", () => {
        expect( entity_obj_plane_tests.test_Plane_getCartesians() ).toBe(true);
    });
    it("test_Plane_getVectors", () => {
        expect( entity_obj_plane_tests.test_Plane_getAxes() ).toBe(true);
    });
});
