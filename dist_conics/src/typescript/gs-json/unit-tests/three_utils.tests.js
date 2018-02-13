"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _test = require("../libs/threex/threex_tests");
describe("Tests for Three Utils functions", () => {
    it("test_multVectorMatrix", () => {
        expect(_test.test_multVectorMatrix()).toBe(true);
    });
    it("test_multXYZMatrix", () => {
        expect(_test.test_multXYZMatrix()).toBe(true);
    });
    it("test_xformMatrix", () => {
        expect(_test.test_xformMatrix()).toBe(true);
    });
});
//# sourceMappingURL=three_utils.tests.js.map