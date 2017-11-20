import {} from 'jasmine';
import * as topos_tests from "../utils/topos_tests";

describe('Tests for Topo class', () => {
    it('test_Topo_constructor', () => {
        expect( topos_tests.test_Topo_constructor() ).toBe(true);
    });
    it('test_Topo_getObjID', () => {
        expect( topos_tests.test_Topo_getObjID() ).toBe(true);
    });
    it('test_Topo_getGeom', () => {
        expect( topos_tests.test_Topo_getGeom() ).toBe(true);
    });
    it('test_Topo_getModel', () => {
        expect( topos_tests.test_Topo_getModel() ).toBe(true);
    });
    it('test_Topo_getGeomType', () => {
        expect( topos_tests.test_Topo_getGeomType() ).toBe(true);
    });
    it('test_Topo_getAttribNames', () => {
        expect( topos_tests.test_Topo_getAttribNames() ).toBe(true);
    });
    it('test_Topo_getAttribValue', () => {
        expect( topos_tests.test_Topo_getAttribValue() ).toBe(true);
    });
    it('test_Topo_setAttribValue', () => {
        expect( topos_tests.test_Topo_setAttribValue() ).toBe(true);
    });
    it('test_Topo_getGroupNames', () => {
        expect( topos_tests.test_Topo_getGroupNames() ).toBe(true);
    });
});

describe('Tests for Vertex class', () => {
	it('test_Vertex_getGeomType', () => {
        expect( topos_tests.test_Vertex_getGeomType() ).toBe(true);
    });
	it('test_Vertex_getPoint', () => {
        expect( topos_tests.test_Vertex_getPoint() ).toBe(true);
    });
	it('test_Vertex_next', () => {
        expect( topos_tests.test_Vertex_next() ).toBe(true);
    });
	it('test_Vertex_previous', () => {
        expect( topos_tests.test_Vertex_previous() ).toBe(true);
    });
	it('test_Vertex_getEdge', () => {
        expect( topos_tests.test_Vertex_getEdge() ).toBe(true);
    });
});	

describe('Tests for Edge class', () => {
	it('test_Edge_getGeomType', () => {
        expect( topos_tests.test_Edge_getGeomType() ).toBe(true);
    });
	it('test_Edge_getVertices', () => {
        expect( topos_tests.test_Edge_getVertices() ).toBe(true);
    });
	it('test_Edge_next', () => {
        expect( topos_tests.test_Edge_next() ).toBe(true);
    });
	it('test_Edge_previous', () => {
        expect( topos_tests.test_Edge_previous() ).toBe(true);
    });
	it('test_Edge_neighbours', () => {
        expect( topos_tests.test_Edge_neighbours() ).toBe(true);
    });
	it('test_Edge_getParent', () => {
        expect( topos_tests.test_Edge_getParent() ).toBe(true);
    });    
});

describe('Tests for Wire class', () => {
	it('test_Wire_getGeomType', () => {
        expect( topos_tests.test_Wire_getGeomType() ).toBe(true);
    });
	it('test_Wire_getVertices', () => {
        expect( topos_tests.test_Wire_getVertices() ).toBe(true);
    });
	it('test_Wire_getEdges', () => {
        expect( topos_tests.test_Wire_getEdges() ).toBe(true);
    });
});	

describe('Tests for Face class', () => {
	it('test_Face_getGeomType', () => {
        expect( topos_tests.test_Face_getGeomType() ).toBe(true);
    });
	it('test_Face_getVertices', () => {
        expect( topos_tests.test_Face_getVertices() ).toBe(true);
    });
	it('test_Face_getEdges', () => {
        expect( topos_tests.test_Face_getEdges() ).toBe(true);
    });
	it('test_Face_neighbours', () => {
        expect( topos_tests.test_Face_neighbours() ).toBe(true);
    });
});

describe('Tests for Shell class', () => {

});