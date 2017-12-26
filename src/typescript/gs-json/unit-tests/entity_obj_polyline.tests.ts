import {} from "jasmine";
import * as entity_obj_polyline_tests from "../utils/entity_obj_polyline_tests";

describe("Tests for Polyline class", () => {
    it("test_Pline_getObjType", () => {
        expect( entity_obj_polyline_tests.test_Polyline_getObjType() ).toBe(true);
    });
});
