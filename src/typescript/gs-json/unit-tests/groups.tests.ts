import {} from 'jasmine';
import * as groups_tests from "../utils/groups_tests";

describe('Tests for Group class', () => {

    it('test_group_methods', () => {
        expect( groups_tests.test_group_methods() ).toBe(true);
    });

});	

