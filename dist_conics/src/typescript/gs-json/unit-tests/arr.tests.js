"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tests = require("../libs/arr/arr_tests");
describe("Tests for Arr functions", () => {
    it("test_make", () => {
        expect(tests.test_make()).toBe(true);
    });
    it("test_makeSeq", () => {
        expect(tests.test_makeSeq()).toBe(true);
    });
    it("test_equal", () => {
        expect(tests.test_equal()).toBe(true);
    });
    it("test_indexOf", () => {
        expect(tests.test_indexOf()).toBe(true);
    });
    it("test_flatten", () => {
        expect(tests.test_flatten()).toBe(true);
    });
    it("test_deepCopy", () => {
        expect(tests.test_deepCopy()).toBe(true);
    });
    it("test_deepFill", () => {
        expect(tests.test_deepFill()).toBe(true);
    });
    it("test_deepCount", () => {
        expect(tests.test_deepCount()).toBe(true);
    });
});
//# sourceMappingURL=arr.tests.js.map