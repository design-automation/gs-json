"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_tests = require("../_entity_tests");
describe("Tests for Entity class", () => {
    it("test_ent_constructor", () => {
        expect(entity_tests.test_ent_constructor()).toBe(true);
    });
    it("test_ent_getGeom", () => {
        expect(entity_tests.test_ent_getGeom()).toBe(true);
    });
    it("test_ent_getID", () => {
        expect(entity_tests.test_ent_getID()).toBe(true);
    });
    it("test_ent_getModel", () => {
        expect(entity_tests.test_ent_getModel()).toBe(true);
    });
    // it('test_ent_getGeomType', () => {
    //     expect( entities_tests.test_ent_getGeomType() ).toBe(true);
    // });
    it("test_ent_getAttribs", () => {
        expect(entity_tests.test_ent_getAttribs()).toBe(true);
    });
    it("test_ent_getAttribValue", () => {
        expect(entity_tests.test_ent_getAttribValue()).toBe(true);
    });
    it("test_ent_setAttribValue", () => {
        expect(entity_tests.test_ent_setAttribValue()).toBe(true);
    });
    it("test_ent_getGroups", () => {
        expect(entity_tests.test_ent_getGroups()).toBe(true);
    });
});
//# sourceMappingURL=entity.tests.js.map