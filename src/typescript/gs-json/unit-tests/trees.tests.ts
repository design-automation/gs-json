import {} from "jasmine";
import * as tree_tests from "../utils/trees_tests";

describe("Tests for Tree class", () => {
    it("test_Tree_constructor", () => {
        expect( tree_tests.test_Tree_constructor() ).toBe(true);
    });
    // paths
    it("test_Tree_addPath", () => {
        expect( tree_tests.test_Tree_addPath() ).toBe(true);
    });
    it("test_Tree_hasPath", () => {
        expect( tree_tests.test_Tree_hasPath() ).toBe(true);
    });
    it("test_Tree_delPath", () => {
        expect( tree_tests.test_Tree_delPath() ).toBe(true);
    });
    // values
    it("test_Tree_addValue", () => {
        expect( tree_tests.test_Tree_addValue() ).toBe(true);
    });
    it("test_Tree_hasValue", () => {
        expect( tree_tests.test_Tree_hasValue() ).toBe(true);
    });
    it("test_Tree_delValue", () => {
        expect( tree_tests.test_Tree_delValue() ).toBe(true);
    });
});
