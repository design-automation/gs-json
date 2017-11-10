import {} from 'jasmine';
import * as model_tests from "../utils/model_tests";


//load an object
describe('Model tests', () => {
    it('test_model_constructor', () => {
        expect( model_tests.test_model_constructor() ).toBe(true);
    });
    it('test_model_create_point', () => {
        expect( model_tests.test_model_create_point() ).toBe(true);
    });
    it('test_model_set_point_position', () => {
        expect( model_tests.test_model_set_point_positions() ).toBe(true);
    });
});	
