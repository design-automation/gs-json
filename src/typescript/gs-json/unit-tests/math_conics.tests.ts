import {} from "jasmine";
import * as tests from "../utils/_math_conics_tests";

describe("Tests for Math Conics functions", () => {
    it("test_length", () => {
        expect( tests.test_length() ).toBe(true);
    });
    it("test_evaluate", () => {
        expect( tests.test_evaluate() ).toBe(true);
    });
});
