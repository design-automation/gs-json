import {} from 'jasmine';
import * as model_tests from "../utils/model_tests";


//load an object
describe('Creating models', () => {
    it('create a new model using constructor', () => {
        expect( model_tests.test_model_constructor() ).toBe(true);
    });
});