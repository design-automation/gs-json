"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topo_trees_tests = require("../_topo_trees_tests");
describe("Tests for Class Topo Tree", () => {
    it("test_TopoTree_constructor", () => {
        expect(topo_trees_tests.test_TopoTree_constructor()).toBe(true);
    });
    it("test_TopoTree_hasTopo", () => {
        expect(topo_trees_tests.test_TopoTree_hasTopo()).toBe(true);
    });
    it("test_TopoTree_addTopo", () => {
        expect(topo_trees_tests.test_TopoTree_addTopo()).toBe(true);
    });
    it("test_TopoTree_removeTopo", () => {
        expect(topo_trees_tests.test_TopoTree_removeTopo()).toBe(true);
    });
    it("test_TopoTree_getTopos", () => {
        expect(topo_trees_tests.test_TopoTree_getTopos()).toBe(true);
    });
});
//# sourceMappingURL=topo_trees.tests.js.map