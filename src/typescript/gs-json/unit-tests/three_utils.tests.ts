import {} from "jasmine";
import * as _test from "../libs/threex/threex_tests";

describe("Tests for Three Utils functions", () => {
    it("test_multVectorMatrix", () => {
        expect( _test.test_multVectorMatrix() ).toBe(true);
    });
    it("test_multXYZMatrix", () => {
        expect( _test.test_multXYZMatrix() ).toBe(true);
    });
    it("test_xformMatrix", () => {
        expect( _test.test_xformMatrix() ).toBe(true);
    });
});
