import {} from "jasmine";
import * as tests from "../utils/_gen_gs_models_tests";

describe("Tests for gen_models functions", () => {
    it("test_genModelCircles", () => {
        expect( tests.test_genModelCircles() ).toBe(true);
    });
    it("test_genModelOpenPolyline", () => {
        expect( tests.test_genModelOpenPolyline() ).toBe(true);
    });
    it("test_genModelPlanes", () => {
        expect( tests.test_genModelPlanes() ).toBe(true);
    });

});
