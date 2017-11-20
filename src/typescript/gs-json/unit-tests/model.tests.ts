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
