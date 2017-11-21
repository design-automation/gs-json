import {} from 'jasmine';
import * as model_tests from "../utils/model_tests";

describe('test_Model', () => {
    it('test_Model_constructor', () => {
        expect( model_tests.test_Model_constructor() ).toBe(true);
    });
    it('test_Model_getGeom', () => {
        expect( model_tests.test_Model_getGeom() ).toBe(true);
    });
    it('test_Model_setData', () => {
        expect( model_tests.test_Model_setData() ).toBe(true);
    });
    it('test_Model_getAttribs', () => {
        expect( model_tests.test_Model_getAttribs() ).toBe(true);
    });
    it('test_Model_getAttrib', () => {
        expect( model_tests.test_Model_getAttrib() ).toBe(true);
    });
    it('test_Model_addAttrib', () => {
        expect( model_tests.test_Model_addAttrib() ).toBe(true);
    });
    it('test_Model_delAttrib', () => {
        expect( model_tests.test_Model_delAttrib() ).toBe(true);
    });
    it('test_Model_getGroups', () => {
        expect( model_tests.test_Model_getGroups() ).toBe(true);
    });
    it('test_Model_getGroup', () => {
        expect( model_tests.test_Model_getGroup() ).toBe(true);
    });
    it('test_Model_addGroup', () => {
        expect( model_tests.test_Model_addGroup() ).toBe(true);
    });
    it('test_Model_delGroup', () => {
        expect( model_tests.test_Model_delGroup() ).toBe(true);
    });
    it('test_Model_purgePoints', () => {
        expect( model_tests.test_Model_purgePoints() ).toBe(true);
    });
    it('test_Model_purgeNulls', () => {
        expect( model_tests.test_Model_purgeNulls() ).toBe(true);
    });
    it('test_Model_validateModel', () => {
        expect( model_tests.test_Model_validateModel() ).toBe(true);
    });
});