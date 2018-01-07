import {} from "jasmine";
import * as entity_obj_plane_tests from "../utils/_entity_obj_plane_tests";

describe("Tests for Plane class", () => {
    it("test_Plane_getCartesians", () => {
        expect( entity_obj_plane_tests.test_Plane_getCartesians() ).toBe(true);
    });
});
