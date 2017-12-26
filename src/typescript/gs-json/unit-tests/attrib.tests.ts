import {} from "jasmine";
import * as attribs_tests from "../utils/attrib_tests";

describe("Tests for Attrib class", () => {
    it("test_constructor", () => {
        expect( attribs_tests.test_Attrib_constructor() ).toBe(true);
    });
    it("test_getName", () => {
        expect( attribs_tests.test_Attrib_getName() ).toBe(true);
    });
    it("test_setName", () => {
        expect( attribs_tests.test_Attrib_setName() ).toBe(true);
    });
    it("test_getGeomType", () => {
        expect( attribs_tests.test_Attrib_getGeomType() ).toBe(true);
    });
    it("test_getObjDataType", () => {
        expect( attribs_tests.test_Attrib_getObjDataType() ).toBe(true);
    });
    it("test_count", () => {
        expect( attribs_tests.test_Attrib_count() ).toBe(true);
    });
});
