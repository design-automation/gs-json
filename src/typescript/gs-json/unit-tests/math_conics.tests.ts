import {} from "jasmine";
import * as tests from "../utils/_math_conics_tests";

describe("Tests for Math Conics functions", () => {
    it("test_circleLength", () => {
        expect( tests.test_circleLength() ).toBe(true);
    });
    it("test_circleEvaluate", () => {
        expect( tests.test_circleEvaluate() ).toBe(true);
    });
    it("test_circleGetRenderXYZs", () => {
        expect( tests.test_circleGetRenderXYZs() ).toBe(true);
    });
    it("test_ellipseLength", () => {
        expect( tests.test_ellipseLength() ).toBe(true);
    });
    it("test_ellipseEvaluate", () => {
        expect( tests.test_ellipseEvaluate() ).toBe(true);
    });
    it("test_ellipseGetRenderXYZs", () => {
        expect( tests.test_ellipseGetRenderXYZs() ).toBe(true);
    });
});
