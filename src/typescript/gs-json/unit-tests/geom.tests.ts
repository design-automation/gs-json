import {} from "jasmine";
import * as geom_tests from "../utils/geom_tests";

describe("Tests for Geom class", () => {
    it("test_createPoint", () => {
        expect( geom_tests.test_createPoint() ).toBe(true);
    });
    it("test_Geom_constructor", () => {
        expect( geom_tests.test_Geom_constructor() ).toBe(true);
    });
    it("test_test_Geom_getModel", () => {
        expect( geom_tests.test_Geom_getModel() ).toBe(true);
    });
    it("test_Geom_addPoint", () => {
        expect( geom_tests.test_Geom_addPoint() ).toBe(true);
    });
    it("test_Geom_addPolyline", () => {
        expect( geom_tests.test_Geom_addPolyline() ).toBe(true);
    });
    it("test_test_Geom_addPolymesh", () => {
        expect( geom_tests.test_Geom_addPolymesh() ).toBe(true);
    });
    it("test_test_Geom_getObjData", () => {
        expect( geom_tests.test_Geom_getPointData() ).toBe(true);
    });
    it("test_test_Geom_getObjData", () => {
        expect( geom_tests.test_Geom_getObjData() ).toBe(true);
    });
    it("test_Geom_getPointIDs", () => {
        expect( geom_tests.test_Geom_getPointIDs() ).toBe(true);
    });
    it("test_Geom_getPoints", () => {
        expect( geom_tests.test_Geom_getPoints() ).toBe(true);
    });
    it("test_Geom_getPoint", () => {
        expect( geom_tests.test_Geom_getPoint() ).toBe(true);
    });
    it("test_Geom_delPoint", () => {
        expect( geom_tests.test_Geom_delPoint() ).toBe(true);
    });
    it("test_Geom_numPoints", () => {
        expect( geom_tests.test_Geom_numPoints() ).toBe(true);
    });
    it("test_Geom_setPointPosition", () => {
        expect( geom_tests.test_Geom_setPointPosition() ).toBe(true);
    });
    it("test_Geom_getPointPosition", () => {
        expect( geom_tests.test_Geom_getPointPosition() ).toBe(true);
    });
    it("test_Geom_getObjIDs", () => {
        expect( geom_tests.test_Geom_getObjIDs() ).toBe(true);
    });
    it("test_Geom_getObjs", () => {
        expect( geom_tests.test_Geom_getObjs() ).toBe(true);
    });
    it("test_Geom_getObj", () => {
        expect( geom_tests.test_Geom_getObj() ).toBe(true);
    });
    it("test_Geom_delObj", () => {
        expect( geom_tests.test_Geom_delObj() ).toBe(true);
    });
    it("test_Geom_numObjs", () => {
        expect( geom_tests.test_Geom_numObjs() ).toBe(true);
    });
    it("test_Geom_getTopos", () => {
        expect( geom_tests.test_Geom_getTopos() ).toBe(true);
    });
    it("test_Geom_numTopos", () => {
        expect( geom_tests.test_Geom_numTopos() ).toBe(true);
    });
    it("test_Geom_getAttribTemplate", () => {
        expect( geom_tests.test_Geom_getAttribTemplate() ).toBe(true);
    });
});
