"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tests = require("../_entity_obj_ellipse_tests");
describe("Tests for Entity Object Ellipse", () => {
    it("test_getObjType", () => {
        expect(tests.test_getObjType()).toBe(true);
    });
    it("test_isClosed", () => {
        expect(tests.test_isClosed()).toBe(true);
    });
    it("test_getOrigin", () => {
        expect(tests.test_getOrigin()).toBe(true);
    });
    it("test_getVectors", () => {
        expect(tests.test_getAxes()).toBe(true);
    });
    it("test_getRadii", () => {
        expect(tests.test_getRadii()).toBe(true);
    });
    it("test_getAngles", () => {
        expect(tests.test_getAngles()).toBe(true);
    });
});
//# sourceMappingURL=entity_obj_ellipse.tests.js.map