import {} from "jasmine";
import * as attribs_tests from "../_attrib_tests";

describe("Tests for Attrib class", () => {
    it("test_Attrib_constructor", () => {
        expect( attribs_tests.test_Attrib_constructor() ).toBe(true);
    });
    it("test_Attrib_getName", () => {
        expect( attribs_tests.test_Attrib_getName() ).toBe(true);
    });
    it("test_Attrib_setName", () => {
        expect( attribs_tests.test_Attrib_setName() ).toBe(true);
    });
    it("test_Attrib_getGeomType", () => {
        expect( attribs_tests.test_Attrib_getGeomType() ).toBe(true);
    });
    it("test_Attrib_getObjDataType", () => {
        expect( attribs_tests.test_Attrib_getObjDataType() ).toBe(true);
    });
    it("test_Attrib_getValues", () => {
        expect( attribs_tests.test_Attrib_getValues() ).toBe(true);
    });
    it("test_Attrib_getLabels", () => {
        expect( attribs_tests.test_Attrib_getLabels() ).toBe(true);
    });
    it("test_Attrib_count", () => {
        expect( attribs_tests.test_Attrib_count() ).toBe(true);
    });
});
