import {} from "jasmine";
import * as tests from "../export/threejs/_export_threejs_tests";

describe("Tests for exportThreejs functions", () => {
    it("test_exportThreejsUrl", () => {
        expect(tests.test_exportThreejsUrl() ).toBe(true);
    });
});
