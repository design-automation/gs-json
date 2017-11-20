import {} from 'jasmine';
import * as tests from "../utils/attribs_tests";

describe('Tests for Attrib class', () => {
	    it('test_constructor', () => {
        expect( tests.test_constructor() ).toBe(true);
    });

	    it('test_getName', () => {
        expect( tests.test_getName() ).toBe(true);
    });

	    it('test_setName', () => {
        expect( tests.test_setName() ).toBe(true);
    });

	    it('test_getGeomType', () => {
        expect( tests.test_getGeomType() ).toBe(true);
    });

	    it('test_getDataType', () => {
        expect( tests.test_getDataType() ).toBe(true);
    });

	    it('test_getValue', () => {
        expect( tests.test_getValue() ).toBe(true);
    });

	    it('test_setValue', () => {
        expect( tests.test_setValue() ).toBe(true);
    });

	    it('test_count', () => {
        expect( tests.test_count() ).toBe(true);
    });

});

describe('Tests for Path class', () => {

});