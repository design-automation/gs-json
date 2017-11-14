import {} from 'jasmine';
import * as tests from "../utils/arr_functions_tests";

describe('Arr utility functions', () => {
    it('test_arr_make', () => {
        expect( tests.test_arr_make() ).toBe(true);
    });
    it ('test_arr_equal', () => {
        expect( tests.test_arr_equal() ).toBe(true);    	
    });
    it ('test_arr_indexOf', () => {
        expect( tests.test_arr_indexOf() ).toBe(true);    	
    });
    it ('test_arr_flatten', () => {
        expect( tests.test_arr_flatten() ).toBe(true);    	
    });
    it ('test_arr_deepCopy', () => {
        expect( tests.test_arr_deepCopy() ).toBe(true);    	
    });
    it ('test_arr_deepFill', () => {
        expect( tests.test_arr_deepFill() ).toBe(true);    	
    });
    it ('test_arr_deepCount', () => {
        expect( tests.test_arr_deepCount() ).toBe(true);    	
    });

});