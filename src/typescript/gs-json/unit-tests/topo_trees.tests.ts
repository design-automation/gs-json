import {} from 'jasmine';
import * as topo_trees_tests from "../utils/topo_trees_tests";

describe('Tests for Class Topo Tree', () => {
	it('test_TopoTree_constructor', () => {expect(topo_trees_tests.test_TopoTree_constructor()).toBe(true);});
	it('test_TopoTree_hasTopo', () => {expect( topo_trees_tests.test_TopoTree_hasTopo() ).toBe(true);});
	it('test_TopoTree_addTopo', () => {expect( topo_trees_tests.test_TopoTree_addTopo() ).toBe(true);});
	it('test_TopoTree_removeTopo', () => {expect( topo_trees_tests.test_TopoTree_removeTopo() ).toBe(true);});
	it('test_TopoTree_getTopos', () => {expect( topo_trees_tests.test_TopoTree_getTopos() ).toBe(true);});
	it('test_TopoTree_toArray', () => {expect( topo_trees_tests.test_TopoTree_toArray() ).toBe(true);});
	it('test_TopoTree_fromArray', () => {expect( topo_trees_tests.test_TopoTree_fromArray() ).toBe(true);});
});

describe('Tests for Class Topo Tree Branch', () => {
	it('test_TopoTreeBranch_constructor', () => {expect(topo_trees_tests.test_TopoTreeBranch_constructor()).toBe(true);});
	it('test_TopoTreeBranch_has', () => {expect(topo_trees_tests.test_TopoTreeBranch_has()).toBe(true);});
	it('test_TopoTreeBranch_add', () => {expect(topo_trees_tests.test_TopoTreeBranch_add()).toBe(true);});
	it('test_TopoTreeBranch_remove', () => {expect(topo_trees_tests.test_TopoTreeBranch_remove()).toBe(true);});
	it('test_TopoTreeBranch_toPaths', () => {expect(topo_trees_tests.test_TopoTreeBranch_toPaths()).toBe(true);});
	it('test_TopoTreeBranch_toArray', () => {expect(topo_trees_tests.test_TopoTreeBranch_toArray()).toBe(true);});
	it('test_TopoTreeBranch_fromArray', () => {expect(topo_trees_tests.test_TopoTreeBranch_fromArray()).toBe(true);});
});

describe('Tests for Class Subtopo Tree Branch', () => {
	it('test_SubtopoTreeBranch_constructor', () => {expect(topo_trees_tests.test_SubtopoTreeBranch_constructor()).toBe(true);});
	it('test_SubtopoTreeBranch_has', () => {expect(topo_trees_tests.test_SubtopoTreeBranch_has()).toBe(true);});
	it('test_SubtopoTreeBranch_add', () => {expect(topo_trees_tests.test_SubtopoTreeBranch_add()).toBe(true);});
	it('test_SubtopoTreeBranch_remove', () => {expect(topo_trees_tests.test_SubtopoTreeBranch_remove()).toBe(true);});
	it('test_SubtopoTreeBranch_toPaths', () => {expect(topo_trees_tests.test_SubtopoTreeBranch_toPaths()).toBe(true);});
	it('test_SubtopoTreeBranch_toArray', () => {expect(topo_trees_tests.test_SubtopoTreeBranch_toArray()).toBe(true);});
	it('test_SubtopoTreeBranch_fromArray', () => {expect(topo_trees_tests.test_SubtopoTreeBranch_fromArray()).toBe(true);});
});