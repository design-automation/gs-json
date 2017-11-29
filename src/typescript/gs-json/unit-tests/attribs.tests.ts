import {} from 'jasmine';
import * as tests from "../utils/attribs_tests";

describe('Tests for Attrib class', () => {
	    it('test_constructor', () => {
        expect( tests.test_Attrib_constructor() ).toBe(true);
    });
	    it('test_getName', () => {
        expect( tests.test_Attrib_getName() ).toBe(true);
    });
	    it('test_setName', () => {
        expect( tests.test_Attrib_setName() ).toBe(true);
    });
	    it('test_getGeomType', () => {
        expect( tests.test_Attrib_getGeomType() ).toBe(true);
    });
	    it('test_getObjDataType', () => {
        expect( tests.test_Attrib_getObjDataType() ).toBe(true);
    });
	    it('test_getValue', () => {
        expect( tests.test_Attrib_getValue() ).toBe(true);
    });
	    it('test_setValue', () => {
        expect( tests.test_Attrib_setValue() ).toBe(true);
    });
	    it('test_count', () => {
        expect( tests.test_Attrib_count() ).toBe(true);
    });
});
