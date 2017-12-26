import {} from "jasmine";
import * as attrib_topoattrib_tests from "../utils/attrib_topoattrib_tests";

describe("Tests for Attrib class", () => {
    it("test_getValue", () => {
        expect( attrib_topoattrib_tests.test_Attrib_getValue() ).toBe(true);
    });
    it("test_setValue", () => {
        expect( attrib_topoattrib_tests.test_Attrib_setValue() ).toBe(true);
    });
});
