import {} from 'jasmine';
import * as groups_tests from "../utils/groups_tests";

describe('Tests for Group class', () => {
    it('test_group_methods', () => {
        expect( groups_tests.test_group_methods() ).toBe(true);
    });
	it('test_Groups_constructor', () => {
        expect( groups_tests.test_Groups_constructor() ).toBe(true);
    });
	it('test_Groups_getName', () => {
        expect( groups_tests.test_Groups_getName() ).toBe(true);
    });
	it('test_Groups_setName', () => {
        expect( groups_tests.test_Groups_setName() ).toBe(true);
    });
	it('test_Groups_getParentGroup', () => {
        expect( groups_tests.test_Groups_getParentGroup() ).toBe(true);
    });
	it('test_Groups_getChildGroups', () => {
        expect( groups_tests.test_Groups_getChildGroups() ).toBe(true);
    });
	it('test_Groups_setParentGroup', () => {
        expect( groups_tests.test_Groups_setParentGroup() ).toBe(true);
    });
	it('test_Groups_removeParentGroup', () => {
        expect( groups_tests.test_Groups_removeParentGroup() ).toBe(true);
    });
	it('test_Groups_getPointIDs', () => {
        expect( groups_tests.test_Groups_getPointIDs() ).toBe(true);
    });
	it('test_Groups_addPoint', () => {
        expect( groups_tests.test_Groups_addPoint() ).toBe(true);
    });
	it('test_Groups_addPoints', () => {
        expect( groups_tests.test_Groups_addPoints() ).toBe(true);
    });
	it('test_Groups_removePoint', () => {
        expect( groups_tests.test_Groups_removePoint() ).toBe(true);
    });
	it('test_Groups_removePoints', () => {
        expect( groups_tests.test_Groups_removePoints() ).toBe(true);
    });
	it('test_Groups_getObjIDs', () => {
        expect( groups_tests.test_Groups_getObjIDs() ).toBe(true);
    });
	it('test_Groups_addObj', () => {
        expect( groups_tests.test_Groups_addObj() ).toBe(true);
    });
	it('test_Groups_addObjs', () => {
        expect( groups_tests.test_Groups_addObjs() ).toBe(true);
    });
	it('test_Groups_removeObj', () => {
        expect( groups_tests.test_Groups_removeObj() ).toBe(true);
    });
	it('test_Groups_removeObjs', () => {
        expect( groups_tests.test_Groups_removeObjs() ).toBe(true);
    });
	it('test_Groups_getPropeties', () => {
        expect( groups_tests.test_Groups_getPropeties() ).toBe(true);
    });
});