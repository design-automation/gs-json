import {} from "jasmine";
import * as entity_obj_polymesh_tests from "../_entity_obj_polymesh_tests";

describe("Tests for Polymesh class", () => {
    it("test_Polymesh_getObjType", () => {
        expect( entity_obj_polymesh_tests.test_Polymesh_getObjType() ).toBe(true);
    });
});
