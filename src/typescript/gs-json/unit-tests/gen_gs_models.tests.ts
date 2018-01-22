import {} from "jasmine";
import * as tests from "../utils/_gen_gs_models_tests";

describe("Tests for gen_models functions", () => {
    it("test_genModelCircles", () => {
        expect( tests.test_genModelCircles() ).toBe(true);
    });
});
