import {} from "jasmine";
import * as tests from "../utils/_entity_obj_circle_tests";

describe("Tests for Entity Object Circle", () => {
    it("test_getObjType", () => {
        expect( tests.test_getObjType() ).toBe(true);
    });
    it("test_getOrigin", () => {
        expect( tests.test_getOrigin() ).toBe(true);
    });
    it("test_getVectors", () => {
        expect( tests.test_getVectors() ).toBe(true);
    });
    it("test_setVectors", () => {
        expect( tests.test_setVectors() ).toBe(true);
    });
    it("test_getAngles", () => {
        expect( tests.test_getAngles() ).toBe(true);
    });
    it("test_setAngles", () => {
        expect( tests.test_setAngles() ).toBe(true);
    });
    it("test_getRadius", () => {
        expect( tests.test_getRadius() ).toBe(true);
    });
    it("test_isClosed", () => {
        expect( tests.test_isClosed() ).toBe(true);
    });
    it("test_length", () => {
        expect( tests.test_length() ).toBe(true);
    });
    it("test_eval", () => {
        expect( tests.test_eval() ).toBe(true);
    });
    it("test_equiPoints", () => {
        expect( tests.test_equiPoints() ).toBe(true);
    });
});
