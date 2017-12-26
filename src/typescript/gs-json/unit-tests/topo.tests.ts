import {} from "jasmine";
import * as topos_tests from "../utils/topo_tests";

describe("Tests for Topo class", () => {
    it("test_Topo_constructor", () => {
        expect( topos_tests.test_Topo_constructor() ).toBe(true);
    });
    it("test_Topo_getObjID", () => {
        expect( topos_tests.test_Topo_getObjID() ).toBe(true);
    });
    it("test_Topo_getGeom", () => {
        expect( topos_tests.test_Topo_getGeom() ).toBe(true);
    });
    it("test_Topo_getModel", () => {
        expect( topos_tests.test_Topo_getModel() ).toBe(true);
    });
    // it('test_Topo_getGeomType', () => {
    //     expect( topos_tests.test_Topo_getGeomType() ).toBe(true);
    // });
    it("test_Topo_getAttribNames", () => {
        expect( topos_tests.test_Topo_getAttribNames() ).toBe(true);
    });
    it("test_Topo_getAttribValue", () => {
        expect( topos_tests.test_Topo_getAttribValue() ).toBe(true);
    });
    it("test_Topo_setAttribValue", () => {
        expect( topos_tests.test_Topo_setAttribValue() ).toBe(true);
    });
    it("test_Topo_getGroups", () => {
        expect( topos_tests.test_Topo_getGroups() ).toBe(true);
    });
});
