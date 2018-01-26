import {} from "jasmine";
import * as entity_obj_polyline_tests from "../utils/_entity_obj_polyline_tests";

describe("Tests for Polyline class", () => {
    it("test_Polyline_getObjType", () => {
        expect( entity_obj_polyline_tests.test_Polyline_getObjType() ).toBe(true);
    });
    it("test_Polyline_setIsClosed", () => {
        expect( entity_obj_polyline_tests.test_Polyline_setIsClosed() ).toBe(true);
    });
    it("test_Polyline_insertVertex", () => {
        expect( entity_obj_polyline_tests.test_Polyline_insertVertex() ).toBe(true);
    });
    it("test_Polyline_toString", () => {
        expect( entity_obj_polyline_tests.test_Polyline_toString() ).toBe(true);
    });
});
