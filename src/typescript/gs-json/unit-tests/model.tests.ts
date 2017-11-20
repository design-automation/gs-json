import {} from 'jasmine';
import * as model_tests from "../utils/model_tests";

describe('Tests loading data for Model class', () => {
    it('test_setData1', () => {
        expect( model_tests.test_setData1() ).toBe(true);
    });
	// let names:string[] = ["box", "box_split_points", "box_with_attribs", "grid", "mixed", "pig", "polyline", "torus"];
	// //tests
	// for (let name of names) {
	//     it("test_setData2 " + name + ".gs", () => {
	//         expect( model_tests.test_setData2("./base/assets/gs-json/" + name +".gs") ).toBe(true);
	//     });
	// }
});	

describe('Tests for Model class', () => {
    it('test_constructor', () => {
        expect( model_tests.test_constructor() ).toBe(true);
    });
});	

describe('test_Model_constructor', () => {
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