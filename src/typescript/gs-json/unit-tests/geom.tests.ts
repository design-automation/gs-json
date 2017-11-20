import {} from 'jasmine';
import * as geom_tests from "../utils/geom_tests";

describe('Tests for Geom class', () => {
    it('test_createPoint', () => {
        expect( geom_tests.test_createPoint() ).toBe(true);
    });
});	